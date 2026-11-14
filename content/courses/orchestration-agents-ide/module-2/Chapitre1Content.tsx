'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif des membres de l'équipe
  const [selectedMember, setSelectedMember] = useState<'pm' | 'leader' | 'architect' | 'backend' | 'frontend' | 'qa' | 'reviewer'>('leader');

  const teamMembers = {
    pm: {
      name: 'Project Manager humain',
      role: 'Direction & Arbitrage Stratégique',
      color: 'border-amber-300 bg-amber-50/70 text-amber-950',
      badge: 'Supervision Humaine',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: 'user',
      domain: 'Gouvernance globale, cadrage fonctionnel et validation finale des livrables.',
      taskflowRole: 'Définit les besoins de TaskFlow (ex: gestion des priorités et statuts). Il arbitre les choix techniques critiques et détient le monopole absolu sur les opérations Git sensibles (merge, rebase, push).',
      deliverables: 'Cahier des charges, priorités de sprint, validations formelles, autorisations Git.',
      interactions: 'Dialogue directement avec le Team Leader IA pour transmettre les directives et recevoir les comptes rendus consolidés.'
    },
    leader: {
      name: 'Team Leader IA',
      role: 'Orchestration & Coordination Opérationnelle',
      color: 'border-indigo-300 bg-indigo-50/70 text-indigo-950',
      badge: 'Coordination Centrale',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      icon: 'bot',
      domain: 'Décomposition des objectifs, ordonnancement des dépendances et suivi d\'avancement.',
      taskflowRole: 'Reçoit l\'objectif TaskFlow du PM, le découpe en missions pour l\'Architect, le Backend et le Frontend. Il veille aux contrats d\'API et consolide les rapports de QA et de Review avant de rendre compte au PM.',
      deliverables: 'Plans de mission, fiches de consignes, matrice de dépendances, rapports de synthèse.',
      interactions: 'Pivot central : reçoit les objectifs du PM, mandate les 5 agents spécialisés et regroupe leurs résultats.'
    },
    architect: {
      name: 'Agent Architect',
      role: 'Conception Technique & Contrats',
      color: 'border-cyan-300 bg-cyan-50/70 text-cyan-950',
      badge: 'Spécification Technique',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      icon: 'cpu',
      domain: 'Analyse d\'architecture, contrats d\'échange et cohérence des composants.',
      taskflowRole: 'Définit les interfaces TypeScript de TaskFlow (modèle Task : id, title, status, priority), formalise le contrat REST et structure les répertoires frontend et backend.',
      deliverables: 'Contrats d\'API OpenAPI/TypeScript, schéma de base de code, conventions de nommage.',
      interactions: 'Intervient en amont pour fournir au Backend, au Frontend et au QA les spécifications de référence.'
    },
    backend: {
      name: 'Agent Backend',
      role: 'Développement Serveur & Logique Métier',
      color: 'border-emerald-300 bg-emerald-50/70 text-emerald-950',
      badge: 'Production Serveur',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: 'server',
      domain: 'API REST, logique métier, validation de données et stockage.',
      taskflowRole: 'Développe les routes Express de TaskFlow (POST /api/tasks, PATCH /api/tasks/:id/status), implémente la validation Zod et assure la persistance en mémoire.',
      deliverables: 'Contrôleurs Express, middleware de validation, routes REST, tests unitaires backend.',
      interactions: 'Applique le contrat d\'API de l\'Architect et transmet ses livrables au QA et au Reviewer.'
    },
    frontend: {
      name: 'Agent Frontend',
      role: 'Interface Utilisateur & Expérience',
      color: 'border-blue-300 bg-blue-50/70 text-blue-950',
      badge: 'Production Interface',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: 'layout',
      domain: 'Composants React, rendu d\'état, accessibilité et interactions.',
      taskflowRole: 'Crée les formulaires de saisie TaskFlow, la liste filtrable des tâches, les indicateurs visuels de statut et gère les appels HTTP asynchrones vers l\'API.',
      deliverables: 'Composants React 19, hooks de fetch, formulaires Tailwind CSS, tests d\'interface.',
      interactions: 'Consomme l\'API backend selon le contrat de l\'Architect et fournit ses vues au Reviewer et au QA.'
    },
    qa: {
      name: 'Agent QA (Quality Assurance)',
      role: 'Tests Automatisés & Validation Comportementale',
      color: 'border-purple-300 bg-purple-50/70 text-purple-950',
      badge: 'Validation Fonctionnelle',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: 'check-circle',
      domain: 'Scénarios de test, injection de cas limites et détection d\'anomalies.',
      taskflowRole: 'Rédige et exécute les suites Vitest et Supertest pour TaskFlow : teste les créations valides, les valeurs vides, les statuts non autorisés et les erreurs 404/500.',
      deliverables: 'Suites de tests automatisés, rapports d\'exécution Vitest, fiches d\'anomalies détectées.',
      interactions: 'Prépare ses tests dès la publication des spécifications et vérifie le code livré par Backend et Frontend.'
    },
    reviewer: {
      name: 'Agent Reviewer',
      role: 'Revue de Code & Conformité Technique',
      color: 'border-rose-300 bg-rose-50/70 text-rose-950',
      badge: 'Qualité du Code',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: 'shield-check',
      domain: 'Lisibilité, détection d\'incohérences, sécurité et respect des conventions.',
      taskflowRole: 'Audite chaque diff sur TaskFlow : s\'assure qu\'aucun agent n\'a modifié de fichiers hors périmètre, vérifie l\'absence de fuites mémoire ou de promesses non catchées et émet des recommandations.',
      deliverables: 'Rapports d\'audit de code, listes de risques techniques, avis de conformité avant validation.',
      interactions: 'Complémentaire du QA : le QA teste le fonctionnement dynamique, le Reviewer inspecte la qualité statique du code.'
    }
  };

  const active = teamMembers[selectedMember];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="bot" className="w-4 h-4 text-indigo-800" />
            <span>Organisation d&apos;Équipe • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 1 — Comprendre le principe d&apos;une équipe d&apos;agents IA
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Découvrir les principes fondamentaux qui permettent à plusieurs agents spécialisés de collaborer efficacement sur un projet logiciel commun : organisation des responsabilités, circuit d&apos;échange et supervision humaine.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Comprendre le fonctionnement général d&apos;une équipe d&apos;agents IA</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Identifier les 7 intervenants clés du projet TaskFlow</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser les 5 conditions d&apos;efficacité et anticiper les 8 limites majeures</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : INTRODUCTION & DÉFINITION D'UNE ÉQUIPE MULTI-AGENTS
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Qu&apos;est-ce qu&apos;une équipe d&apos;agents IA ?</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Un agent IA individuel peut réaliser des tâches très variées dans un projet logiciel : analyser une spécification, concevoir une architecture, coder un contrôleur ou lancer des tests. Cependant, dès que l&apos;application grandit, confier l&apos;intégralité du projet à un seul agent provoque rapidement une <strong>saturation de contexte</strong>, des confusions de périmètre et des erreurs en cascade.
        </p>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          La solution consiste à structurer le travail sous la forme d&apos;une <strong>équipe multi-agents</strong> : un ensemble d&apos;agents configurés pour collaborer vers un objectif commun, où chacun intervient dans un domaine précis pendant qu&apos;un coordinateur pilote les flux.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Carte 1 : Limites de l'agent solo */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-slate-200 text-slate-700 shrink-0">
                  <Icon name="bot" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Pourquoi l&apos;agent solo montre rapidement ses limites
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200 shrink-0">
                Agent Unique
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Lorsqu&apos;un seul agent doit tout gérer en continu dans une session unique :
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Saturation de tokens : </strong>
                  <span>Le contexte se remplit d&apos;anciens messages, diluant les contraintes techniques initiales.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Dispersion cognitive : </strong>
                  <span>Alterner entre CSS React, routes Node.js et commandes shell augmente le risque de régressions.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-xs font-black shrink-0 mt-0.5">•</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-slate-900 font-bold">Absence de contre-pouvoir : </strong>
                  <span>L&apos;agent relit et teste son propre code sans regard critique externe indépendant.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Carte 2 : La force de l'équipe multi-agents */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                  <Icon name="sparkles" className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-indigo-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  L&apos;approche équipe : Organisation & Complémentarité
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shrink-0">
                Équipe Structurée
              </span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
              Une organisation collective où chaque agent a un rôle borné et auditable :
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Cadre étanche : </strong>
                  <span>Chaque agent ne reçoit que les informations utiles à sa spécialité immédiate.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Coordination opérationnelle : </strong>
                  <span>Le Team Leader IA orchestre les dépendances et prépare les rapports pour le PM humain.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-black shrink-0 mt-0.5">✓</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-indigo-950 font-bold">Vérification croisée : </strong>
                  <span>Le code produit par un développeur est examiné par le Reviewer et testé par le QA avant validation.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : POURQUOI UTILISER PLUSIEURS AGENTS IA ?
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Les 4 avantages majeurs d&apos;une organisation multi-agents</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Diviser le travail d&apos;un projet entre plusieurs agents apporte quatre bénéfices structurants :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Avantage 1 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La spécialisation des missions
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Expertise Ciblée
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Chaque agent est configuré avec des instructions et des outils taillés sur mesure : l&apos;Architect structure, le Backend crée les API, le Frontend gère React, le QA prépare les tests et le Reviewer traque les anomalies.
            </p>
          </div>

          {/* Avantage 2 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La répartition du travail & le parallélisme
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Productivité
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Dès lors qu&apos;un contrat d&apos;interface ou un schéma TypeScript est validé par l&apos;Architect, le Backend et le Frontend peuvent avancer simultanément sans attendre la fin des développements respectifs.
            </p>
          </div>

          {/* Avantage 3 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La clarification formelle des responsabilités
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Gouvernance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              On sait exactement qui produit quoi, quel fichier appartient à quel périmètre, quelles vérifications doivent être menées et qui a l&apos;autorité pour valider les étapes charnières.
            </p>
          </div>

          {/* Avantage 4 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">4</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La vérification et le contrôle qualité croisé
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Fiabilité
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le QA exécute des suites de tests automatisés (Vitest/Supertest) pendant que le Reviewer audite la lisibilité et la sécurité du code, assurant un double filtre de contrôle avant la remise au PM humain.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : SIMULATEUR INTERACTIF DES MEMBRES DE L'ÉQUIPE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Les 7 intervenants clés du projet TaskFlow</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Cliquez sur chaque membre de l&apos;équipe pour examiner son rôle, son domaine d&apos;intervention, sa mission dans TaskFlow et ses interactions :
        </p>

        {/* Simulateur interactif */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sélectionnez un rôle pour explorer sa fiche :</span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(['pm', 'leader', 'architect', 'backend', 'frontend', 'qa', 'reviewer'] as const).map((key) => {
                const item = teamMembers[key];
                const isSel = selectedMember === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedMember(key)}
                    className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black transition cursor-pointer ${
                      isSel
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {item.name.replace('Agent ', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche détaillée du rôle actif */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 ${active.color} space-y-4 w-full min-w-0 max-w-full`}>
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-current/20">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-white shadow-xs text-indigo-700 shrink-0">
                  <Icon name={active.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                    {active.name}
                  </h3>
                  <div className="text-xs font-bold opacity-80">{active.role}</div>
                </div>
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${active.badgeColor}`}>
                {active.badge}
              </span>
            </div>

            <div className="flex flex-col gap-3 w-full min-w-0 max-w-full text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Domaine d&apos;intervention :</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{active.domain}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Rôle concret dans TaskFlow :</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{active.taskflowRole}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Livrables attendus :</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{active.deliverables}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Interactions avec l&apos;équipe :</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{active.interactions}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : PROCESSUS TASKFLOW EN 5 ÉTAPES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 4 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Déroulement d&apos;une fonctionnalité dans TaskFlow</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Voyons comment s&apos;organise la réalisation d&apos;une fonctionnalité (par exemple la création d&apos;une tâche avec statut et priorité) à travers les 5 étapes du cycle collaboratif :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Étape 1 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-100 text-cyan-800 text-xs font-black shrink-0">1</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Étape 1 — Analyse & Conception Technique
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 shrink-0">
                Architect
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le PM présente le besoin au Team Leader. L&apos;Architect formalise le modèle TypeScript de la tâche, définit les routes REST (POST /api/tasks) et spécifie le format des réponses d&apos;erreur. Le contrat est validé avant tout code.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Étape 2 — Préparation des Missions & Scénarios
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Team Leader & QA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le Team Leader transmet les fiches de mission au Backend et au Frontend. Simultanément, le QA prépare les scénarios de test Vitest et Supertest basés sur les exigences validées.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">3</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Étape 3 — Développement en Parallèle
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                Backend & Frontend
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le Backend code la route POST avec validation Zod et stockage en mémoire. En parallèle, le Frontend conçoit le formulaire React 19 et ses retours visuels, aligné sur le contrat d&apos;API partagé.
            </p>
          </div>

          {/* Étape 4 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100 text-purple-800 text-xs font-black shrink-0">4</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Étape 4 — Vérifications Croisées & Audit
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 shrink-0">
                QA & Reviewer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le QA exécute la suite de tests et valide le comportement dynamique. Le Reviewer inspecte les diffs, vérifie la lisibilité et s&apos;assure de l&apos;absence de modifications hors périmètre.
            </p>
          </div>

          {/* Étape 5 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-800 text-xs font-black shrink-0">5</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Étape 5 — Compte Rendu & Décision Humaine
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                Team Leader & PM
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le Team Leader rassemble les livrables et présente la synthèse au PM humain. Le Project Manager analyse les résultats et réalise la validation formelle avant d&apos;autoriser l&apos;intégration Git.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : CONDITIONS D'EFFICACITÉ & LIMITES CRITIQUES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 5 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Conditions d&apos;efficacité et limites à anticiper</h2>
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0 max-w-full">
          {/* Les 5 conditions */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-emerald-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les 5 conditions d&apos;une collaboration multi-agents réussie
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-200 shrink-0">
                Facteurs Clés
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">1</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Un objectif commun explicite : </strong>
                  <span>Tous les agents doivent converger vers une finalité mesurable, sans consignes vagues.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">2</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Des rôles et périmètres étanches : </strong>
                  <span>Chaque agent sait ce qu&apos;il doit coder et ce qu&apos;il lui est interdit de toucher.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">3</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Un contexte partagé et stabilisé : </strong>
                  <span>Les contrats techniques validés sont diffusés à tous les agents concernés.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">4</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Des comptes rendus formalisés : </strong>
                  <span>Transmission systématique des fichiers modifiés, des tests passés et des blocages.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0 mt-0.5">5</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-emerald-950 font-bold">Supervision et validation humaine : </strong>
                  <span>Le PM humain garde le monopole des arbitrages majeurs et des opérations Git critiques.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Les 8 limites */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-rose-50/70 border-2 border-rose-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800 shrink-0">
                  <Icon name="shield-check" className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les 8 limites et risques majeurs à surveiller
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Vigilance Requise
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Complexité de coordination : </strong>
                  <span>Plus le nombre d&apos;agents augmente, plus les échanges et les dépendances deviennent délicats à synchroniser.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Incompatibilités entre livrables : </strong>
                  <span>Risque de désynchronisation entre la signature d&apos;API backend et l&apos;appel HTTP frontend si le contrat n&apos;est pas figé.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Perte ou dérive de contexte : </strong>
                  <span>Un agent peut perdre de vue les décisions prises par d&apos;autres si les synthèses écrites ne lui sont pas transmises.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Conflits d&apos;écriture concurrente : </strong>
                  <span>Deux agents modifiant les mêmes fichiers s&apos;écrasent mutuellement si l&apos;isolation des branches n&apos;est pas assurée.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Propagation rapide des erreurs : </strong>
                  <span>Une anomalie dans le contrat d&apos;architecture se répercute immédiatement sur le backend, le frontend et les tests.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Risques de fuite de données sensibles : </strong>
                  <span>Interdiction formelle d&apos;injecter des clés d&apos;API, secrets de production ou mots de passe dans les invites d&apos;agents.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Multiplication inutile des agents : </strong>
                  <span>Multiplier les agents sans besoin réel augmente les coûts de tokens et la lenteur sans gain qualitatif mesurable.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-black shrink-0 mt-0.5">!</span>
                <div className="min-w-0 flex-1 whitespace-normal break-words [overflow-wrap:anywhere]">
                  <strong className="text-rose-950 font-bold">Nécessité de supervision humaine : </strong>
                  <span>Les agents n&apos;ont aucune responsabilité légale. Le développeur humain reste l&apos;unique garant des résultats finaux.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Callout type="warning" title="Règle d'or : Distinguer permission technique et autorisation organisationnelle">
          Un agent peut techniquement disposer des droits shell pour exécuter des commandes Git dans l&apos;IDE. <strong>Pourtant, sur le plan organisationnel, aucun agent n&apos;a le droit d&apos;exécuter un merge, un rebase ou un push sans l&apos;accord écrit et explicite du Project Manager humain</strong>.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 6 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>1.10 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Une équipe d&apos;agents IA ne fonctionne pas comme un agrégat d&apos;assistants isolés. Son succès repose sur une hiérarchie claire : <strong>le Project Manager humain conserve les décisions stratégiques et la validation finale des livrables</strong>, le <strong>Team Leader IA</strong> coordonne les missions et synchronise les dépendances, tandis que les <strong>agents spécialisés</strong> (Architect, Backend, Frontend, QA, Reviewer) exécutent leurs tâches dans un périmètre rigoureusement délimité.
        </p>
      </section>

      {/* =========================================================================
          SECTION 7 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de validation des connaissances (9 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Comprendre le principe d'une équipe d'agents IA"
          questions={[
            {
              id: 1,
              question: "Quel est le principal objectif d'une équipe d'agents IA ?",
              options: [
                "Remplacer complètement le Project Manager humain",
                "Répartir les missions entre plusieurs agents qui collaborent vers un objectif commun",
                "Permettre à chaque agent de travailler sans coordination",
                "Multiplier les agents pour accélérer automatiquement le projet"
              ],
              correctIndex: 1,
              explanation: "Une équipe d'agents IA répartit les missions entre plusieurs agents spécialisés qui collaborent vers un objectif commun."
            },
            {
              id: 2,
              question: "Quel est le rôle principal du Team Leader IA ?",
              options: [
                "Prendre toutes les décisions à la place du Project Manager",
                "Développer lui-même toutes les fonctionnalités",
                "Organiser les missions et coordonner les agents spécialisés",
                "Remplacer les tests et les revues de code"
              ],
              correctIndex: 2,
              explanation: "Le Team Leader organise les missions, transmet les informations et coordonne les agents spécialisés."
            },
            {
              id: 3,
              question: "Quel agent intervient principalement dans l'analyse et la conception technique ?",
              options: [
                "Backend",
                "QA",
                "Reviewer",
                "Architect"
              ],
              correctIndex: 3,
              explanation: "L'Architect intervient principalement dans l'analyse des besoins, la conception technique et la définition des contrats d'API."
            },
            {
              id: 4,
              question: "Quelle est la principale différence entre QA et Reviewer ?",
              options: [
                "Le QA se concentre sur les tests et les vérifications, tandis que le Reviewer examine les modifications et leur qualité technique",
                "Le QA développe le frontend et le Reviewer développe le backend",
                "Le Reviewer remplace le Project Manager",
                "Les deux agents ont exactement le même rôle"
              ],
              correctIndex: 0,
              explanation: "Le QA prépare et exécute les tests dynamiques, tandis que le Reviewer examine la qualité statique, la lisibilité et la sécurité des modifications."
            },
            {
              id: 5,
              question: "Dans quelles conditions Backend et Frontend peuvent-ils travailler en parallèle ?",
              options: [
                "Dès que les agents sont disponibles, sans autre condition",
                "Lorsque les exigences, les décisions d'architecture et les contrats techniques nécessaires sont suffisamment définis",
                "Uniquement lorsque le développement backend est entièrement terminé",
                "Uniquement après la validation finale du projet"
              ],
              correctIndex: 1,
              explanation: "Le travail en parallèle nécessite des exigences et des contrats techniques suffisamment définis pour limiter les risques d'incompatibilité."
            },
            {
              id: 6,
              question: "Pourquoi faut-il transmettre les décisions et les contrats techniques aux agents concernés ?",
              options: [
                "Pour leur permettre de modifier librement l'architecture",
                "Pour éviter qu'ils aient besoin de réaliser des tests",
                "Pour leur donner les informations nécessaires à des travaux cohérents et compatibles",
                "Pour supprimer le rôle du Team Leader"
              ],
              correctIndex: 2,
              explanation: "La transmission des décisions et des contrats permet aux agents de travailler à partir d'informations cohérentes et partagées."
            },
            {
              id: 7,
              question: "Un agent dispose techniquement d'un accès à Git. Peut-il automatiquement effectuer un push ?",
              options: [
                "Oui, car l'accès technique vaut autorisation",
                "Oui, si le Team Leader le demande",
                "Non, une autorisation organisationnelle explicite du Project Manager reste nécessaire",
                "Non, aucun agent ne peut utiliser Git"
              ],
              correctIndex: 2,
              explanation: "Une permission technique ne constitue pas une autorisation organisationnelle. Le push nécessite une autorisation explicite du Project Manager humain."
            },
            {
              id: 8,
              question: "Quel risque peut apparaître lorsqu'on ajoute trop d'agents à un projet ?",
              options: [
                "Une diminution automatique des coûts",
                "Une complexité accrue de coordination et des échanges",
                "La disparition des conflits entre modifications",
                "Une garantie de meilleure qualité"
              ],
              correctIndex: 1,
              explanation: "Un nombre excessif d'agents augmente la consommation de tokens, les échanges superflus, les dépendances et la complexité de coordination."
            },
            {
              id: 9,
              question: "Quel rôle le Project Manager humain doit-il conserver ?",
              options: [
                "Réaliser toutes les missions techniques",
                "Écrire lui-même tous les comptes rendus des agents",
                "Superviser les décisions et conserver les validations importantes",
                "Exécuter systématiquement tous les tests"
              ],
              correctIndex: 2,
              explanation: "Le Project Manager humain conserve la supervision des décisions stratégiques et les validations formelles importantes."
            }
          ]}
        />
      </section>
    </div>
  );
};
