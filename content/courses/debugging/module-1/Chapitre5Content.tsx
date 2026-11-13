'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

export const Chapitre5Content: React.FC = () => {
  // Simulateur de parcours de ticket (Cycle de vie interactif)
  const [ticketStatus, setTicketStatus] = useState<'open' | 'in_progress' | 'fixed' | 'qa' | 'closed' | 'reopened'>('open');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-lime-200 bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider bg-lime-100/80 px-3 py-1 rounded-full border border-lime-300">
            <Icon name="bug" className="w-4 h-4 text-lime-800" />
            <span>Ingénierie du Débogage • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Lecture accessible : ~12 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere] mb-3">
          Chapitre 5 — Comprendre le cycle de vie d&apos;une erreur
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          De la première alerte d&apos;un utilisateur jusqu&apos;à la validation finale en production : découvrez comment les équipes professionnelles traitent les bugs sans chaos ni oublis.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Comprendre le parcours d&apos;un ticket</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Distinguer Fixed et Closed</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Maîtriser Jira, GitHub, VS Code et Postman</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : POURQUOI UN CYCLE FORMEL ? L'ANALOGIE DU DOSSIER PATIENT
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            Pourquoi formaliser le cycle de vie d&apos;un bug ?
          </h2>
        </div>

        <p className="text-base text-slate-800 font-medium">
          Quand on code seul dans sa chambre, corriger un bug paraît simple : on repère l&apos;erreur, on change la ligne, on enregistre, et c&apos;est fini.
        </p>

        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 space-y-4">
          <div className="flex items-center gap-2 text-amber-950 font-black text-base">
            <Icon name="sparkles" className="w-5 h-5 text-amber-700" />
            <span>L&apos;analogie médicale : Le dossier médical aux urgences</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            Imaginez un patient qui arrive aux urgences d&apos;un grand hôpital. Un infirmier l&apos;enregistre (<em>Signalement</em>), un interne pose un premier diagnostic, un chirurgien opère (<em>Correction</em>), puis une équipe de surveillance contrôle son réveil (<em>Validation/QA</em>) avant de signer son bon de sortie officiel (<em>Clôture</em>).
          </p>
          <div className="p-3.5 rounded-xl bg-white/90 border border-amber-300 text-xs sm:text-sm text-slate-800 font-medium">
            Si le chirurgien disait simplement : <em>« J&apos;ai fini mon opération, le patient peut rentrer chez lui tout seul sans contrôle »</em>, ce serait dangereux ! En informatique, c&apos;est la même chose : <strong>un développeur ne peut pas déclarer à lui seul qu&apos;un bug est terminé</strong>. Il doit être vérifié et validé dans des conditions réelles.
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : SIMULATEUR INTERACTIF DU PARCOURS D'UN TICKET
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Simulateur Interactif : Suivez la vie d&apos;un ticket d&apos;anomalie
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Mettez-vous dans la peau d&apos;une équipe technique. Cliquez sur les boutons ci-dessous pour faire progresser le ticket de l&apos;incident : <strong>« Le panier e-commerce se bloque lors du clic sur Payer »</strong>.
        </p>

        {/* Interactive Kanban Workflow Card */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-white overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">Ticket #BUG-1042 : Blocage paiement</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Projet : Boutique Web</span>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-6 border-b border-slate-800 text-xs font-bold divide-x divide-slate-800 bg-slate-900">
            <button
              onClick={() => setTicketStatus('open')}
              className={`p-2.5 text-center transition-colors ${
                ticketStatus === 'open' ? 'bg-blue-600/40 text-blue-300 border-b-2 border-blue-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              1. Open
            </button>
            <button
              onClick={() => setTicketStatus('in_progress')}
              className={`p-2.5 text-center transition-colors ${
                ticketStatus === 'in_progress' ? 'bg-indigo-600/40 text-indigo-300 border-b-2 border-indigo-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              2. In Progress
            </button>
            <button
              onClick={() => setTicketStatus('fixed')}
              className={`p-2.5 text-center transition-colors ${
                ticketStatus === 'fixed' ? 'bg-amber-600/40 text-amber-300 border-b-2 border-amber-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              3. Fixed
            </button>
            <button
              onClick={() => setTicketStatus('qa')}
              className={`p-2.5 text-center transition-colors ${
                ticketStatus === 'qa' ? 'bg-purple-600/40 text-purple-300 border-b-2 border-purple-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              4. In QA
            </button>
            <button
              onClick={() => setTicketStatus('closed')}
              className={`p-2.5 text-center transition-colors ${
                ticketStatus === 'closed' ? 'bg-emerald-600/40 text-emerald-300 border-b-2 border-emerald-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              5. Closed
            </button>
            <button
              onClick={() => setTicketStatus('reopened')}
              className={`p-2.5 text-center transition-colors ${
                ticketStatus === 'reopened' ? 'bg-rose-600/40 text-rose-300 border-b-2 border-rose-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              Reopened ⚠️
            </button>
          </div>

          {/* Dynamic Content */}
          <div className="p-5 sm:p-6 space-y-4">
            {ticketStatus === 'open' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Icon name="document-text" className="w-4 h-4" />
                  <span>Statut : OPEN / NEW (Création du ticket)</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
                  <p className="text-slate-400"><strong className="text-white">Créé par :</strong> Support client suite à 3 appels d&apos;utilisateurs.</p>
                  <p className="text-slate-400"><strong className="text-white">Symptôme :</strong> Le bouton &quot;Payer 45 €&quot; tourne sans fin sur Safari iOS.</p>
                  <p className="text-slate-400"><strong className="text-white">Sévérité :</strong> P0 (Bloquant) — Empêche les encaissements.</p>
                </div>
                <p className="text-xs text-slate-400">
                  🎯 <strong>Action requise :</strong> Le Lead Développeur attribue le ticket à un ingénieur backend ou frontend.
                </p>
              </div>
            )}

            {ticketStatus === 'in_progress' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Icon name="search" className="w-4 h-4" />
                  <span>Statut : IN PROGRESS (Le développeur enquête)</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
                  <p className="text-slate-400"><strong className="text-white">Développeur assigné :</strong> Maxime (Dev Fullstack).</p>
                  <p className="text-slate-400"><strong className="text-white">Reproduction locale :</strong> Réussie avec l&apos;émulateur iPhone dans DevTools.</p>
                  <p className="text-slate-400"><strong className="text-white">Cause racine démasquée :</strong> Une expression régulière (Regex Lookbehind) non supportée par les anciennes versions du moteur WebKit Safari !</p>
                </div>
                <p className="text-xs text-slate-400">
                  🎯 <strong>Action requise :</strong> Le développeur prépare le correctif sans casser la compatibilité avec Chrome et Firefox.
                </p>
              </div>
            )}

            {ticketStatus === 'fixed' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Icon name="check" className="w-4 h-4" />
                  <span>Statut : FIXED / RESOLVED (Le code est modifié)</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
                  <p className="text-slate-400"><strong className="text-white">Branche Git :</strong> <code className="text-amber-300">fix/safari-payment-regex</code></p>
                  <p className="text-slate-400"><strong className="text-white">Pull Request :</strong> PR #128 fusionnée vers la branche de staging.</p>
                  <p className="text-slate-400"><strong className="text-white">Tests unitaires :</strong> 100% au vert sur la suite de tests automatisés.</p>
                </div>
                <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200">
                  ⚠️ <strong>ATTENTION :</strong> Le ticket n&apos;est PAS fermé ! Le code fonctionne sur l&apos;ordinateur du développeur, mais il doit être testé par un tiers sur l&apos;environnement de pré-production.
                </div>
              </div>
            )}

            {ticketStatus === 'qa' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Icon name="shield-check" className="w-4 h-4" />
                  <span>Statut : IN QA / RETEST (La vérification indépendante)</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
                  <p className="text-slate-400"><strong className="text-white">Testeur responsable :</strong> Sarah (Ingénieure QA).</p>
                  <p className="text-slate-400"><strong className="text-white">Environnement de test :</strong> Serveur de Staging (réplique exacte de la production).</p>
                  <p className="text-slate-400"><strong className="text-white">Matériel testé :</strong> iPhone 12 physique (iOS 15), iPad et smartphone Android.</p>
                </div>
                <p className="text-xs text-slate-400">
                  🎯 <strong>Action requise :</strong> Si le paiement passe sans erreur, le testeur valide la mise en production.
                </p>
              </div>
            )}

            {ticketStatus === 'closed' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Icon name="check-circle" className="w-4 h-4" />
                  <span>Statut : VERIFIED / CLOSED (Fin de mission !)</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
                  <p className="text-emerald-400 font-bold">✓ DÉPLOIEMENT RÉUSSI EN PRODUCTION</p>
                  <p className="text-slate-400"><strong className="text-white">Non-régression :</strong> Les paiements par carte, Apple Pay et PayPal fonctionnent sans accroc.</p>
                  <p className="text-slate-400"><strong className="text-white">Monitoring :</strong> Taux d&apos;erreurs 500 = 0% sur les dernières 24h.</p>
                </div>
                <p className="text-xs text-emerald-300">
                  🏆 Le ticket est officiellement archivé. Le problème est résolu durablement et documenté dans l&apos;historique du projet.
                </p>
              </div>
            )}

            {ticketStatus === 'reopened' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Icon name="x" className="w-4 h-4" />
                  <span>Statut : REOPENED (Le correctif a échoué !)</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
                  <p className="text-rose-400 font-bold">❌ ÉCHEC LORS DU CONTRÔLE QA</p>
                  <p className="text-slate-400"><strong className="text-white">Constat :</strong> Le bouton fonctionne maintenant sur Safari, mais plante désormais sur Firefox Android !</p>
                  <p className="text-slate-400"><strong className="text-white">Régression détectée :</strong> Le nouveau code a introduit un comportement imprévu.</p>
                </div>
                <p className="text-xs text-rose-300">
                  🔄 Le ticket retourne automatiquement au développeur à l&apos;étape <em>In Progress</em> pour une nouvelle passe d&apos;investigation.
                </p>
              </div>
            )}
          </div>
        </div>

        <Callout type="warning" title="La règle d'or en équipe">
          <strong>« Fixed » n&apos;est jamais « Closed ».</strong> Dire <em>« Ça marche sur ma machine »</em> n&apos;a aucune valeur en production. Tant qu&apos;une personne tierce ou des tests automatisés indépendants n&apos;ont pas validé le fonctionnement sur l&apos;environnement cible, le ticket reste ouvert.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 3 : SÉVÉRITÉ VS PRIORITÉ (LA QUESTION PIÈGE D'ENTRETIEN)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            Sévérité vs Priorité : Le grand piège des entretiens d&apos;embauche
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans tous les outils professionnels (Jira, Linear, Bugzilla), chaque anomalie possède deux attributs distincts que les débutants confondent systématiquement :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-base text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">1</span>
              <span>La Sévérité (Impact Technique)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Mesure à quel point le système informatique est endommagé ou bloqué (Crash total du serveur, perte de données, écran blanc irréversible).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-base text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">2</span>
              <span>La Priorité (Urgence Métier)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Mesure à quelle vitesse le problème doit être résolu d&apos;un point de vue commercial, légal ou d&apos;image de marque pour l&apos;entreprise.
            </p>
          </div>
        </div>

        {/* Deux exemples frappants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-rose-700">Cas 1 : Sévérité Élevée mais Priorité Basse</span>
            <p className="text-xs text-slate-700 font-medium">
              Le serveur plante complètement si un utilisateur clique sur un lien obscur au fin fond des mentions légales en langue espéranto.
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Le crash est total (haute sévérité), mais personne ne visite cette page : la priorité de correction est faible.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-amber-700">Cas 2 : Faible Sévérité mais Priorité Très Haute</span>
            <p className="text-xs text-slate-700 font-medium">
              Sur la page d&apos;accueil d&apos;une banque, le logo officiel est flou et le slogan comporte une énorme faute d&apos;orthographe : <em>« Vôtre argant en sécuriter »</em>.
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Aucun crash technique, aucune perte de données (faible sévérité), mais désastre immédiat pour la réputation : correction immédiate dans l&apos;heure !
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : L'ÉCOSYSTÈME D'OUTILS PROFESSIONNELS (IMAGES DU COURS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;écosystème d&apos;outillage en entreprise
          </h2>
        </div>

        {/* Outil 1 : Jira */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-black text-xs">JIRA</span>
              <h3 className="text-base font-bold text-slate-950">Le tableau Kanban d&apos;équipe</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Gestion de projet &amp; Tickets</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Jira permet à toute l&apos;entreprise (développeurs, testeurs, chefs de projet, support) de voir en temps réel où en est la résolution de chaque problème :
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

        {/* Outil 2 : GitHub Issues */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-black text-xs">GITHUB</span>
              <h3 className="text-base font-bold text-slate-950">Traçabilité avec GitHub Issues et Pull Requests</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Gestion du code source</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Chaque correctif est directement lié à une branche Git et à une revue de code (Pull Request) avant d&apos;être accepté dans la version principale :
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

        {/* Outil 3 : VS Code Debugger */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-black text-xs">VS CODE</span>
              <h3 className="text-base font-bold text-slate-950">L&apos;inspection chirurgicale en direct</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Environnement de développement</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Visual Studio Code permet d&apos;exécuter le programme au ralenti, ligne par ligne, en surveillant l&apos;évolution de chaque variable dans la mémoire :
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
              Figure 1.7 — Les 4 panneaux essentiels du débogueur VS Code : Variables, Watch, Call Stack et Breakpoints.
            </div>
          </div>
        </div>

        {/* Outil 4 : Postman */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-600 text-white font-black text-xs">POSTMAN</span>
              <h3 className="text-base font-bold text-slate-950">Isoler le backend sans l&apos;interface frontend</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Tests d&apos;API HTTP</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Permet d&apos;envoyer directement des requêtes HTTP personnalisées avec des en-têtes et des payloads pour tester le serveur en laboratoire :
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
              Figure 1.8 — Reproduction contrôlée d&apos;un appel API REST dans Postman avec inspection des en-têtes et du JSON retourné.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : COMMENT RÉDIGER UN TICKET MODÈLE (LE GUIDE PRATIQUE)
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le modèle parfait de ticket de bug
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Voici le format exact utilisé dans les meilleures entreprises tech pour déclarer une anomalie :
        </p>

        <CodeBlock
          language="markdown"
          filename="bug-report-template.md"
          code={`### [BUG] Le panier affiche un montant de 250 € au lieu de 350 €

**Environnement :**
- Navigateur : Chrome v122 (Desktop) & Safari iOS 17
- URL : https://boutique.demo/panier
- Compte de test : user_id = 42

**Étapes pour reproduire :**
1. Se connecter avec le compte de test.
2. Ajouter le produit "Clavier mécanique" (150 €) au panier.
3. Ajouter le produit "Écran 4K" (200 €) au panier.
4. Consulter la page du panier.

**Résultat attendu :**
Le montant total doit afficher "350,00 €".

**Résultat observé :**
Le montant total affiche "250,00 €" sans aucun coupon saisi.

**Traces techniques :**
Réponse API GET /api/cart : { "items": 2, "total": 250 }
Capture d'écran jointe : ecran-panier-erreur.png`}
        />
      </section>

      {/* =========================================================================
          SECTION 6 : SYNTHÈSE DES POINTS CLÉS
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">6</span>
          <h2 className="text-xl font-bold text-slate-950">
            Synthèse du Chapitre 5
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-teal-500/10 border-2 border-emerald-300 space-y-2 text-sm sm:text-base font-medium text-slate-900">
          <p>• <strong>Un bug ne disparaît pas magiquement :</strong> Il doit suivre un cycle formel (Open ➔ In Progress ➔ Fixed ➔ In QA ➔ Closed).</p>
          <p>• <strong>Fixed ≠ Closed :</strong> Le statut <em>Fixed</em> signifie que le développeur a modifié le code ; seul un testeur ou un contrôle de non-régression permet de le passer à <em>Closed</em>.</p>
          <p>• <strong>Reopened :</strong> Si le bug réapparaît lors des tests QA, le ticket repart à l&apos;analyse sans être clôturé.</p>
          <p>• <strong>Sévérité vs Priorité :</strong> La sévérité mesure l&apos;impact technique (crash du système) ; la priorité mesure l&apos;urgence commerciale ou réputationnelle.</p>
          <p>• <strong>L&apos;outillage professionnel :</strong> Jira pour le flux d&apos;équipe, GitHub pour le code, VS Code pour le diagnostic mémoire, et Postman pour tester les API.</p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — Le Cycle de Vie d'un Bug en Entreprise"
          questions={[
            {
              id: 1,
              question: "Pourquoi un développeur ne doit-il JAMAIS fermer directement un ticket au statut 'Closed' dès qu'il a fini de coder ?",
              options: [
                "Parce qu'il doit d'abord demander l'autorisation au président de la République.",
                "Parce que le correctif doit être vérifié sur un environnement cible indépendant (Staging/QA) pour valider l'absence de régression.",
                "Parce que fermer un ticket supprime automatiquement le projet sur GitHub.",
                "Il a parfaitement le droit de le fermer immédiatement sans aucun test.",
              ],
              correctIndex: 1,
              explanation: "Exactement ! Le statut 'Fixed' indique que le code est prêt à être testé. Seule la validation par les tests ou l'équipe QA autorise le passage au statut 'Closed'.",
            },
            {
              id: 2,
              question: "Que signifie le statut 'Reopened' dans un outil comme Jira ou GitHub ?",
              options: [
                "Le projet a été racheté par une autre entreprise.",
                "Le correctif appliqué a échoué lors des tests ou l'anomalie est réapparue sous une autre forme.",
                "Le développeur a pris sa pause déjeuner.",
                "Le mot de passe du serveur a expiré.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! 'Reopened' indique que le défaut n'est pas résolu et retourne à l'étape 'In Progress' pour une nouvelle passe d'investigation.",
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre la Sévérité et la Priorité d'une anomalie ?",
              options: [
                "Ce sont deux mots strictement identiques.",
                "La sévérité mesure l'impact technique (gravité du crash), tandis que la priorité mesure l'urgence commerciale ou métier de la résolution.",
                "La sévérité concerne le design et la priorité concerne la base de données.",
                "La priorité se calcule en kilos et la sévérité en secondes.",
              ],
              correctIndex: 1,
              explanation: "Bravo ! Une faute d'orthographe sur le logo officiel a une sévérité faible (pas de crash) mais une priorité très haute (urgence d'image de marque).",
            },
            {
              id: 4,
              question: "À quoi sert un outil comme Postman lors du débogage d'une application Web ?",
              options: [
                "À remplacer le système d'exploitation Windows.",
                "À tester et reproduire des requêtes API isolées sans dépendre de l'interface graphique du frontend.",
                "À dessiner les maquettes graphiques de l'application.",
                "À nettoyer le disque dur du serveur.",
              ],
              correctIndex: 1,
              explanation: "Bien joué ! Postman permet d'envoyer des requêtes brutes au serveur backend pour savoir si le bug vient de l'API ou de l'affichage frontend.",
            },
            {
              id: 5,
              question: "Quel élément est INDISPENSABLE dans un rapport d'anomalie professionnel ?",
              options: [
                "La couleur préférée du développeur.",
                "Les étapes précises pour reproduire le bug, le résultat attendu et le résultat observé.",
                "Le nombre de lignes total du fichier.",
                "Un poème d'excuse.",
              ],
              correctIndex: 1,
              explanation: "Excellente réponse ! Des étapes de reproduction claires permettent à n'importe quel membre de l'équipe de constater le bug en 2 minutes.",
            },
          ]}
        />
      </section>
    </div>
  );
};
