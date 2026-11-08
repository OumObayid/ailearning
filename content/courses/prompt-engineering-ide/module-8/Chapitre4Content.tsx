'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Créer les quatre agents spécialisés
        </h1>
      </div>

      {/* 1. Règle : Un agent, une responsabilité majeure */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Le principe cardinal : Un agent, un mandat exclusif
        </h2>
        <p className="text-slate-700">
          Un agent généraliste finit inévitablement par mélanger les rôles, écrire du code sans l&apos;auditer ou déclarer des tests réussis sans les lancer. La spécialisation stricte garantit des contrôles croisés indépendants :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-blue-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-blue-800 uppercase tracking-wide text-xs">1. Développeur</span>
            <p className="text-slate-600">Seul agent habilité à concevoir l&apos;architecture applicative et à proposer des diffs d&apos;écriture (React, Node.js, Express, requêtes MySQL).</p>
          </div>
          <div className="p-4 bg-white border border-rose-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-rose-800 uppercase tracking-wide text-xs">2. Sécurité</span>
            <p className="text-slate-600">Examine les vulnérabilités (SQLi, XSS, authentification, secrets). Interdiction formelle de modifier le code : il émet uniquement des recommandations.</p>
          </div>
          <div className="p-4 bg-white border border-amber-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">3. Testeur (QA)</span>
            <p className="text-slate-600">Bâtit les scénarios de test et vérifie les résultats. Ne modifie aucun fichier pour faire passer un test et distingue tests préparés de tests exécutés.</p>
          </div>
          <div className="p-4 bg-white border border-emerald-200 rounded-xl space-y-2 shadow-xs">
            <span className="font-bold text-emerald-800 uppercase tracking-wide text-xs">4. Documentaliste</span>
            <p className="text-slate-600">Rédige les spécifications OpenAPI et documentations d&apos;architecture. Interdiction absolue d&apos;inventer une route qui n&apos;est pas matériellement confirmée.</p>
          </div>
        </div>
      </section>

      {/* 2. Les Prompts des 4 Agents Spécialisés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Fiches d&apos;instructions des 4 agents spécialisés
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
            <span className="text-blue-400 font-bold">{'// AGENT 1 : DÉVELOPPEUR FULLSTACK'}</span>
            <p className="text-slate-300">RÔLE : Développeur React / Node.js Express / MySQL.</p>
            <p className="text-slate-300">MISSION : Réaliser les fonctionnalités confiées par le coordinateur sous forme de diffs unifiés.</p>
            <p className="text-rose-400">RESTRICTION : Aucune écriture directe sur le disque sans approbation humaine explicite.</p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
            <span className="text-rose-400 font-bold">{'// AGENT 2 : AUDITEUR SÉCURITÉ'}</span>
            <p className="text-slate-300">RÔLE : Auditeur cybersécurité applicative Web &amp; API.</p>
            <p className="text-slate-300">MISSION : Identifier les failles (injections SQL, validation d&apos;entrées, auth, fuites de secrets).</p>
            <p className="text-rose-400">RESTRICTION : Mode lecture seule exclusif. Aucune modification de code ni exécution de commande intrusive.</p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
            <span className="text-amber-400 font-bold">{'// AGENT 3 : INGÉNIEUR TESTEUR (QA)'}</span>
            <p className="text-slate-300">RÔLE : Ingénieur de test et validation fonctionnelle.</p>
            <p className="text-slate-300">MISSION : Préparer les cas limites, exécuter les tests autorisés et relever les anomalies avec preuves.</p>
            <p className="text-rose-400">RESTRICTION : Ne jamais déclarer un test réussi sans exécution matérielle vérifiée.</p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
            <span className="text-emerald-400 font-bold">{'// AGENT 4 : DOCUMENTALISTE TECHNIQUE'}</span>
            <p className="text-slate-300">RÔLE : Rédacteur technique et documentaliste d&apos;API.</p>
            <p className="text-slate-300">MISSION : Documenter les routes OpenAPI, payloads et composants validés.</p>
            <p className="text-rose-400">RESTRICTION : N&apos;inventer aucun endpoint, paramètre ou comportement non confirmé par les tests.</p>
          </div>
        </div>
      </section>

      {/* 3. Procédure de résolution des failles sans conflit */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Résolution d&apos;une anomalie de sécurité sans conflit d&apos;écriture
        </h2>
        <p className="text-slate-700 text-sm">
          Lorsque l&apos;agent sécurité repère une vulnérabilité critique (ex: requête SQL vulnérable), la chaîne de résolution est scrupuleusement cadencée :
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs sm:text-sm">
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 font-medium">
            <li><strong>L&apos;agent sécurité</strong> isole la ligne vulnérable, détaille la menace et rédige une recommandation technique.</li>
            <li><strong>Le coordinateur</strong> réceptionne le rapport, crée l&apos;ordre de mission correctif <code>DEV-FIX-001</code> et le transmet au développeur.</li>
            <li><strong>L&apos;agent développeur</strong> prépare le diff avec une requête paramétrée sécurisée.</li>
            <li><strong>Le développeur humain</strong> examine le diff et valide l&apos;écriture.</li>
            <li><strong>L&apos;agent testeur</strong> vérifie la non-régression et confirme la robustesse du correctif.</li>
          </ol>
        </div>

        <Callout type="note" title="Pas d'empiétement de compétences">
          Si l&apos;agent sécurité modifiait lui-même le code en direct, le développeur risquerait de perdre ses travaux en cours et l&apos;architecture globale du projet serait désynchronisée.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Rôles des 4 spécialistes
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si l'agent testeur prépare un jeu de 8 cas de test mais que le backend n'a pas encore été lancé dans le terminal, quel statut doit-il déclarer ?",
              options: [
                "RÉUSSI (car les tests sont bien écrits)",
                "PRÉPARÉ / NON EXÉCUTÉ",
                "ÉCHOUÉ",
                "VALIDÉ"
              ],
              correctIndex: 1,
              explanation: "Tant qu'une commande de test n'a pas été matériellement exécutée dans l'environnement, le test ne peut avoir que le statut PRÉPARÉ."
            },
            {
              id: 2,
              question: "Sur quelles informations l'agent documentaliste a-t-il le droit d'appuyer sa documentation d'API ?",
              options: [
                "Uniquement sur des routes et fonctionnalités confirmées et validées par le développeur et le testeur",
                "Sur des idées de fonctionnalités futures qui semblent intéressantes",
                "Sur la documentation d'un autre projet trouvé sur Google",
                "Sur des suppositions plausibles"
              ],
              correctIndex: 0,
              explanation: "La documentation technique est un contrat : elle ne doit refléter que la réalité concrète et vérifiée de l'application."
            }
          ]}
        />
      </section>
    </div>
  );
};
