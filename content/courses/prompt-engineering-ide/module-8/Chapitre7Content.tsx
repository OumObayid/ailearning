'use client';

import React from 'react';
import { Icon } from '@/components/common/Icon';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>MODULE 8 — PROJET FINAL &amp; SYSTÈME MULTI-AGENTS</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 7 — Organiser le cycle de développement React + Node.js
        </h1>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          Maîtriser les 6 phases d&apos;ingénierie d&apos;une fonctionnalité, du cadrage initial à la documentation finale, en respectant les règles de parallélisme et de séquençage dans une escouade multi-agents.
        </p>
      </div>

      {/* 1. Analogie intro — La chaîne d'assemblage automobile */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Analogie : La chaîne d&apos;assemblage automobile
        </h2>
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3 text-sm text-slate-700">
          <p>
            Imaginez une <strong>usine automobile</strong> dotée de six stations d&apos;assemblage. Chaque voiture avance de poste en poste dans un ordre immuable : carrosserie → moteur → câblage → inspection qualité → peinture → livraison. <strong>Aucune voiture ne saute une station.</strong>
          </p>
          <p>
            À la station 4 (inspection qualité) se tient un <strong>inspecteur humain</strong> qui appose son tampon avant l&apos;expédition. Sans ce tampon, la chaîne s&apos;arrête. C&apos;est exactement le rôle du <strong>HITL (Human-in-the-Loop)</strong> dans votre escouade d&apos;agents IA.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li><strong>Stations 1–2</strong> → Cadrage &amp; préparation technique (conception sans écriture)</li>
            <li><strong>Station 3</strong> → Inspection HITL (l&apos;inspecteur humain valide le diff)</li>
            <li><strong>Station 4</strong> → Développement autorisé (écriture sur disque)</li>
            <li><strong>Station 5</strong> → Contrôle anti-défaut (tests &amp; vérification sécurité)</li>
            <li><strong>Station 6</strong> → Documentation &amp; livraison (rapport final)</li>
          </ul>
          <p className="text-amber-800 font-semibold">
            Aucun agent ne court-circuite la chaîne. L&apos;ordre est gravé dans les protocoles, comme les stations d&apos;assemblage sont gravées dans le plan d&apos;usine.
          </p>
        </div>
      </section>

      {/* 2. Les 6 phases */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 6 phases d&apos;ingénierie d&apos;une fonctionnalité
        </h2>
        <p className="text-slate-700">
          Pour développer une fonctionnalité complète (par exemple, la création d&apos;un projet avec persistance MySQL), l&apos;escouade applique un cycle méthodique en 6 temps :
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 1 — Analyse du besoin (Cadrage)</span>
              <span className="text-xs font-mono font-bold text-purple-700">Coordinateur</span>
            </div>
            <p className="text-slate-600">Comprendre les exigences, identifier les composants nécessaires et délimiter les contours du CRUD. Aucun code n&apos;est écrit à ce stade.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 2 — Préparation technique &amp; Audits préalables</span>
              <span className="text-xs font-mono font-bold text-purple-700">Développeur + Sécurité + QA</span>
            </div>
            <p className="text-slate-600">Le développeur prépare le diff en texte ; l&apos;agent sécurité scrute les risques (SQLi, XSS) et le testeur bâtit les scénarios de test. Ces trois actions s&apos;effectuent <strong>en parallèle</strong>.</p>
          </div>

          <div className="p-4 bg-purple-50/20 border-2 border-purple-300 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-950">⏸ PHASE 3 — Validation Humaine Souveraine (HITL)</span>
              <span className="text-xs font-mono font-bold text-purple-800">Développeur Humain</span>
            </div>
            <p className="text-slate-700">Examen du diff, des risques et du plan de test. <strong>Accord formel d&apos;écriture</strong> accordé par l&apos;utilisateur. Sans ce feu vert, le développeur reste en attente.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 4 — Développement autorisé</span>
              <span className="text-xs font-mono font-bold text-purple-700">Développeur</span>
            </div>
            <p className="text-slate-600">Application du diff unifié sur le disque (formulaire React et route Express). <strong>Aucun autre agent n&apos;écrit de fichier en parallèle.</strong></p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 5 — Contrôle de recette &amp; Vérification factuelle</span>
              <span className="text-xs font-mono font-bold text-purple-700">Testeur + Sécurité</span>
            </div>
            <p className="text-slate-600">Exécution des tests autorisés, collecte des preuves matérielles et confirmation de non-régression. Les deux agents peuvent opérer <strong>en parallèle</strong> sur leurs périmètres respectifs.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">PHASE 6 — Documentation finale &amp; Synthèse</span>
              <span className="text-xs font-mono font-bold text-purple-700">Documentaliste + Coordinateur</span>
            </div>
            <p className="text-slate-600">Rédaction des spécifications OpenAPI confirmées et rapport d&apos;achèvement remis à l&apos;utilisateur.</p>
          </div>
        </div>
      </section>

      {/* 3. Tableau comparatif responsive */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Parallélisme sélectif vs Séquençage strict
        </h2>
        <p className="text-slate-700">
          Certaines activités gagnent à être menées en parallèle, tandis que d&apos;autres exigent un ordre séquentiel absolu :
        </p>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-slate-800 text-slate-100">
                <th className="p-3 text-left font-bold">Activité</th>
                <th className="p-3 text-left font-bold">Mode</th>
                <th className="p-3 text-left font-bold">Explication</th>
                <th className="p-3 text-left font-bold">Raison</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-50 border-b border-emerald-100">
                <td className="p-3 font-semibold text-emerald-900">Audit sécurité + préparation tests</td>
                <td className="p-3"><span className="bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full text-xs">Parallèle ✓</span></td>
                <td className="p-3 text-slate-700">Sécurité &amp; QA travaillent simultanément sur le diff en lecture seule</td>
                <td className="p-3 text-slate-600">Aucun conflit d&apos;écriture, gain de temps</td>
              </tr>
              <tr className="bg-emerald-50 border-b border-emerald-100">
                <td className="p-3 font-semibold text-emerald-900">Tests recette + vérification sécurité</td>
                <td className="p-3"><span className="bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full text-xs">Parallèle ✓</span></td>
                <td className="p-3 text-slate-700">Testeur &amp; Sécurité opèrent sur le code déjà écrit, périmètres distincts</td>
                <td className="p-3 text-slate-600">Pas d&apos;édition, lecture + exécution seulement</td>
              </tr>
              <tr className="bg-rose-50 border-b border-rose-100">
                <td className="p-3 font-semibold text-rose-900">Écriture code avant HITL</td>
                <td className="p-3"><span className="bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full text-xs">Séquentiel ✗</span></td>
                <td className="p-3 text-slate-700">Aucun fichier ne peut être modifié avant l&apos;accord humain formel</td>
                <td className="p-3 text-slate-600">Principe de souveraineté humaine</td>
              </tr>
              <tr className="bg-rose-50 border-b border-rose-100">
                <td className="p-3 font-semibold text-rose-900">Tests finaux avant écriture code</td>
                <td className="p-3"><span className="bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full text-xs">Séquentiel ✗</span></td>
                <td className="p-3 text-slate-700">Impossible de valider un code qui n&apos;existe pas encore sur le disque</td>
                <td className="p-3 text-slate-600">Dépendance fonctionnelle stricte</td>
              </tr>
              <tr className="bg-rose-50">
                <td className="p-3 font-semibold text-rose-900">Deux agents éditent le même fichier</td>
                <td className="p-3"><span className="bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full text-xs">Séquentiel ✗</span></td>
                <td className="p-3 text-slate-700">Conflits Git garantis, risque de régression élevé</td>
                <td className="p-3 text-slate-600">Unicité de responsabilité d&apos;écriture</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3 text-xs">
          <p className="font-bold text-emerald-700 uppercase tracking-wide">Parallélisme autorisé ✓</p>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <p className="font-semibold text-emerald-900">Audit sécurité + préparation tests</p>
            <p className="text-slate-600">Sécurité &amp; QA travaillent simultanément sur le diff en lecture seule. Aucun conflit d&apos;écriture.</p>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <p className="font-semibold text-emerald-900">Tests recette + vérification sécurité</p>
            <p className="text-slate-600">Testeur &amp; Sécurité sur le code déjà écrit, périmètres distincts. Lecture + exécution seulement.</p>
          </div>

          <p className="font-bold text-rose-700 uppercase tracking-wide mt-4">Séquençage obligatoire ✗</p>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
            <p className="font-semibold text-rose-900">Écriture code avant HITL</p>
            <p className="text-slate-600">Aucun fichier ne peut être modifié avant l&apos;accord humain formel. Principe de souveraineté.</p>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
            <p className="font-semibold text-rose-900">Tests finaux avant écriture code</p>
            <p className="text-slate-600">Impossible de valider un code qui n&apos;existe pas encore sur le disque.</p>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
            <p className="font-semibold text-rose-900">Deux agents éditent le même fichier</p>
            <p className="text-slate-600">Conflits Git garantis, risque de régression élevé. Un seul auteur habilité.</p>
          </div>
        </div>
      </section>

      {/* 4. Bloc de code stylisé — Séquence des ordres de mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Exemple : Séquence des ordres de mission
        </h2>
        <p className="text-slate-700">
          Voici la séquence complète des ordres de mission pour le développement d&apos;une fonctionnalité CRUD &laquo;&nbsp;Projets&nbsp;&raquo; :
        </p>
        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
          <p className="text-purple-400 font-bold border-b border-slate-800 pb-1"># SÉQUENCE DES ORDRES DE MISSION — FONCTIONNALITÉ CRUD PROJETS</p>
          <p className="text-slate-400">─────────────────────────────────────────────────────</p>
          <p><span className="text-emerald-400">COORDINATEUR</span> → DEV-CRUD-001 : Concevoir la route POST /projets</p>
          <p><span className="text-blue-400">SÉCURITÉ</span>    → SEC-CRUD-001 : Auditer les risques SQLi sur le body</p>
          <p><span className="text-yellow-400">TESTEUR</span>     → TEST-CRUD-001 : Préparer les scénarios (nominal + erreur)</p>
          <p className="text-slate-400">─────────────────────────────────────────────────────</p>
          <p className="text-purple-300 font-bold">⏸ ARRÊT HITL — VALIDATION HUMAINE REQUISE</p>
          <p className="text-slate-400">─────────────────────────────────────────────────────</p>
          <p><span className="text-emerald-400">DÉVELOPPEUR</span> → Écriture autorisée sur src/routes/projets.ts</p>
          <p><span className="text-yellow-400">TESTEUR</span>     → Exécution et collecte des preuves matérielles</p>
          <p><span className="text-cyan-400">DOCUMENTALISTE</span> → DOC-CRUD-001 : Spécification OpenAPI confirmée</p>
        </div>
      </section>

      {/* 5. Callout — Unicité de responsabilité */}
      <Callout type="warning" title="Unicité de responsabilité d&apos;écriture">
        Si deux agents tentent d&apos;éditer simultanément le même fichier (par exemple, l&apos;agent sécurité qui corrige une ligne pendant que le développeur refactorise la fonction), le risque de conflit Git et de régression est maximal. <strong>Le développeur est le seul auteur habilité à écrire sur le disque</strong>. Les autres agents proposent, examinent, testent — mais n&apos;écrivent jamais de code source.
      </Callout>

      {/* 6. QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Cycle de développement
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'agent testeur ne peut-il pas valider la fonctionnalité avant que le développement soit terminé ?",
              options: [
                "Parce qu'il n'a pas accès au serveur",
                "Parce que la fonctionnalité n'a pas encore été écrite sur le disque ni testée avec des preuves d'exécution réelles",
                "Parce que le coordinateur doit l'autoriser en premier",
                "Parce que les tests automatiques ne sont pas encore configurés"
              ],
              correctIndex: 1,
              explanation: "Le testeur peut préparer ses scénarios en amont (Phase 2), mais la validation définitive — avec preuves matérielles d'exécution — exige que le code soit réellement écrit sur le disque (Phase 4). Valider avant, c'est valider du vide."
            },
            {
              id: 2,
              question: "Quelle phase s'intercale obligatoirement entre la proposition de code du développeur et son application effective sur le disque ?",
              options: [
                "La suppression des logs de développement",
                "La validation humaine explicite (Phase 3 — HITL)",
                "Le redémarrage du serveur de base de données",
                "La génération automatique de la documentation"
              ],
              correctIndex: 1,
              explanation: "Toute écriture sur le disque requiert l'examen préalable du diff par le développeur humain et son accord formel. C'est le principe HITL : Human-in-the-Loop. L'agent ne peut pas auto-valider son propre travail."
            },
            {
              id: 3,
              question: "Pourquoi deux agents ne peuvent-ils pas éditer le même fichier en parallèle ?",
              options: [
                "Parce que les agents n'ont pas de droits d'accès simultanés",
                "Parce que le système de fichiers ne le supporte pas techniquement",
                "Parce que cela crée des conflits Git et des régressions, violant le principe d'unicité de responsabilité d'écriture",
                "Parce que le coordinateur doit approuver chaque modification individuellement"
              ],
              correctIndex: 2,
              explanation: "L'unicité de responsabilité d'écriture est un principe fondamental du cycle. Si deux agents modifient le même fichier simultanément, les changements se chevauchent, les conflits Git sont inévitables et les régressions impossibles à tracer. Un seul auteur habilité par fichier, à la fois."
            }
          ]}
        />
      </section>
    </div>
  );
};
