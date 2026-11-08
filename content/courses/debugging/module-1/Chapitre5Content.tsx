'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Comprendre le cycle de vie d&apos;une erreur
        </h1>
      </div>

      {/* 1. Définition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce que le cycle de vie d&apos;une erreur (Defect Life Cycle) ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Le <strong>cycle de vie d&apos;une erreur</strong> (<em>Bug Life Cycle</em>) représente l&apos;ensemble ordonné des étapes par lesquelles transite un défaut logiciel au sein d&apos;une organisation, depuis son introduction dans le code ou l&apos;architecture jusqu&apos;à sa clôture définitive après confirmation de sa correction.
        </p>
        <Callout type="info" title="Une erreur ne disparaît pas magiquement">
          Une anomalie n&apos;est pas résolue simplement parce qu&apos;un développeur a modifié une ligne de code en local. Elle exige une reproduction documentée, une isolation de cause racine, des tests de non-régression et une validation sur l&apos;environnement cible.
        </Callout>
      </section>

      {/* 2. Les étapes clés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les étapes chronologiques du cycle de vie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 1</span>
            <h3 className="font-black text-base text-slate-950">Introduction du défaut</h3>
            <p className="text-xs text-slate-700">Le défaut est inséré dans le code (ex: <code>&gt;</code> au lieu de <code>&gt;=</code>).</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 2</span>
            <h3 className="font-black text-base text-slate-950">Détection</h3>
            <p className="text-xs text-slate-700">Un utilisateur ou un test automatisé signale un comportement inattendu.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 3</span>
            <h3 className="font-black text-base text-slate-950">Déclaration (Ticket)</h3>
            <p className="text-xs text-slate-700">Création d&apos;un ticket formalisé dans Jira ou GitHub Issues avec sa sévérité.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 4</span>
            <h3 className="font-black text-base text-slate-950">Reproduction</h3>
            <p className="text-xs text-slate-700">Le développeur reproduit le problème de manière systématique en local.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 5</span>
            <h3 className="font-black text-base text-slate-950">Investigation &amp; Diagnostic</h3>
            <p className="text-xs text-slate-700">Analyse des traces d&apos;exécution et des logs pour identifier la cause racine.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 6</span>
            <h3 className="font-black text-base text-slate-950">Correction (Commit Git)</h3>
            <p className="text-xs text-slate-700">Application du correctif minimal avec un message de commit traçable.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 7</span>
            <h3 className="font-black text-base text-slate-950">Tests &amp; Vérification</h3>
            <p className="text-xs text-slate-700">Validation fonctionnelle et exécution des tests de non-régression.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase">Étape 8</span>
            <h3 className="font-black text-base text-slate-950">Déploiement &amp; Monitoring</h3>
            <p className="text-xs text-slate-700">Livraison en staging puis production avec surveillance active des logs.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300 bg-emerald-50/40 space-y-1.5">
            <span className="text-xs font-black text-emerald-700 uppercase">Étape 9</span>
            <h3 className="font-black text-base text-emerald-900">Clôture (Closed)</h3>
            <p className="text-xs text-emerald-900 font-bold">Confirmation formelle que l&apos;anomalie est définitivement éliminée.</p>
          </div>
        </div>
      </section>

      {/* 3. Les statuts de ticket */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. États et transitions d&apos;un ticket d&apos;anomalie
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200 font-black">
              <tr>
                <th className="p-3">Statut</th>
                <th className="p-3">Signification professionnelle</th>
                <th className="p-3">Rôle responsable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800 text-xs sm:text-sm">
              <tr>
                <td className="p-3 font-bold text-blue-900 bg-blue-50/30">New / Open</td>
                <td className="p-3">Le problème vient d&apos;être créé et doit être qualifié.</td>
                <td className="p-3">QA / Support / Utilisateur</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-900 bg-indigo-50/30">In Progress</td>
                <td className="p-3">L&apos;analyse ou la reproduction technique est en cours.</td>
                <td className="p-3">Développeur assigné</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-900 bg-amber-50/30">Fixed / Resolved</td>
                <td className="p-3">Le correctif a été soumis mais n&apos;a pas encore été testé.</td>
                <td className="p-3">Développeur</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-purple-900 bg-purple-50/30">Retest / In QA</td>
                <td className="p-3">La correction est déployée sur l&apos;environnement de test pour validation.</td>
                <td className="p-3">Ingénieur QA / Testeur</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900 bg-emerald-50/30">Verified / Closed</td>
                <td className="p-3">Le bug est confirmé résolu sans régression : ticket officiellement fermé.</td>
                <td className="p-3">Lead Dev / Responsable QA</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-900 bg-rose-50/30">Reopened</td>
                <td className="p-3">Le test a échoué ou le bug est réapparu après déploiement.</td>
                <td className="p-3">Testeur / Développeur</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="Confusion critique : Fixed n'est pas Closed">
          Un développeur marque un ticket à <strong>Fixed</strong> lorsqu&apos;il a terminé sa modification de code. Seul le processus de validation formelle par les tests permet de passer le ticket au statut <strong>Closed</strong>.
        </Callout>
      </section>

      {/* 4. Les outils professionnels avec les images 5, 6, 7, 8 */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. L&apos;écosystème d&apos;outillage en environnement professionnel
        </h2>

        {/* Jira - Image 5 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 font-black text-xs">JIRA</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Suivi des tickets et tableaux Kanban d&apos;équipe</h3>
          </div>
          <p className="text-sm text-slate-700 font-medium">
            Jira permet d&apos;affecter les anomalies, de fixer les niveaux de sévérité (P0 Bloquant, P1 Majeur, P2 Mineur) et de suivre les transitions d&apos;états :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image5.jpeg"
              alt="Tableau Kanban de suivi des tickets d'anomalies sous Jira"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.5 — Organisation des colonnes de traitement des anomalies dans un tableau Jira professionnel.
            </div>
          </div>
        </div>

        {/* GitHub Issues - Image 6 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-black text-xs">GITHUB</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Traçabilité avec GitHub Issues et Pull Requests</h3>
          </div>
          <p className="text-sm text-slate-700 font-medium">
            Dans l&apos;écosystème GitHub, chaque signalement est relié aux branches, aux commits Git et aux revues de code (Pull Requests) :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image6.jpeg"
              alt="Gestion des cycles d'anomalies et pull requests dans GitHub Issues"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.6 — Cycle de triage et suivi des issues techniques dans GitHub.
            </div>
          </div>
        </div>

        {/* VS Code - Image 7 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-black text-xs">VS CODE</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">La barre d&apos;outils de débogage et l&apos;inspection mémoire</h3>
          </div>
          <p className="text-sm text-slate-700 font-medium">
            L&apos;IDE est le centre névralgique de l&apos;investigation : navigation dans la Call Stack, pause sur exception, et console de débogage interactive :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image7.jpeg"
              alt="Barre de contrôle du débogueur et pile d'appels dans Visual Studio Code"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.7 — Les 4 volets essentiels de VS Code Debugger : Variables, Watch, Call Stack et Breakpoints.
            </div>
          </div>
        </div>

        {/* Postman - Image 8 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-600 text-white font-black text-xs">POSTMAN</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Reproduction et validation des endpoints HTTP</h3>
          </div>
          <p className="text-sm text-slate-700 font-medium">
            Isoler le backend pour tester des requêtes avec des en-têtes et des payloads spécifiques sans passer par l&apos;interface frontend :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image8.jpeg"
              alt="Interface Postman pour l'envoi et l'analyse de requêtes HTTP"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.8 — Reproduction contrôlée d&apos;un appel API REST dans Postman avec inspection des en-têtes de réponse.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Synthèse & Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Cycle de Vie d'un Bug"
          questions={[
            {
              id: 1,
              question: "À quoi correspond exactement le cycle de vie d'un bug (Defect Life Cycle) ?",
              options: [
                "À la durée d'exécution du compilateur.",
                "À l'ensemble des étapes entre l'introduction du défaut et sa clôture confirmée.",
                "Au temps passé à écrire les tests.",
              ],
              correctIndex: 1,
              explanation: "Le cycle de vie retrace toute l'histoire de l'anomalie jusqu'à sa validation.",
            },
            {
              id: 2,
              question: "Quelle est la différence fondamentale entre détection et diagnostic ?",
              options: [
                "La détection constate le symptôme, tandis que le diagnostic recherche la cause racine.",
                "Ce sont deux termes strictement synonymes.",
                "Le diagnostic intervient toujours avant la détection.",
              ],
              correctIndex: 0,
              explanation: "La détection signale un comportement anormal, le diagnostic en démontre la raison.",
            },
            {
              id: 3,
              question: "Un développeur a modifié le code et passe le ticket à 'Fixed'. Peut-il le considérer comme définitivement clos ?",
              options: [
                "Oui, immédiatement.",
                "Non, le correctif doit être vérifié, testé et contrôlé contre les régressions.",
                "Oui, si le serveur a redémarré.",
              ],
              correctIndex: 1,
              explanation: "Le statut Fixed indique simplement que le code est prêt pour la phase de test et de validation.",
            },
            {
              id: 4,
              question: "Que signifie le statut 'Reopened' sur un ticket ?",
              options: [
                "Le ticket vient tout juste d'être créé.",
                "L'anomalie persiste ou a réapparu après une tentative de correction infructueuse.",
                "La fonctionnalité a été validée par le client.",
              ],
              correctIndex: 1,
              explanation: "Reopened signale l'échec de la correction ou la réapparition du symptôme.",
            },
            {
              id: 5,
              question: "Quel est l'objectif d'un test de non-régression ?",
              options: [
                "S'assurer que la correction appliquée n'a pas cassé d'autres fonctionnalités existantes.",
                "Supprimer les anciennes fonctionnalités obsolètes.",
                "Accélérer le temps de compilation du projet.",
              ],
              correctIndex: 0,
              explanation: "Le test de non-régression protège l'intégrité de l'ensemble de l'application.",
            },
          ]}
        />
      </section>
    </div>
  );
};

