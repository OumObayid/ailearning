'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif de matrice des permissions par rôle d'agent
  const [selectedAgent, setSelectedAgent] = useState<'architect' | 'backend' | 'frontend' | 'qa' | 'reviewer'>('backend');

  const agentPermissions = {
    architect: {
      name: "Agent Architect",
      role: "Conception & Spécification technique",
      color: "border-blue-300 bg-blue-50/80 text-blue-950",
      icon: "cpu",
      read: true,
      write: false,
      terminal: false,
      gitConsult: true,
      gitMutate: false,
      notes: "Accès en lecture et recherche pour analyser les architectures existantes. Ne modifie pas le code d'implémentation."
    },
    backend: {
      name: "Agent Backend",
      role: "Développement API & Logique serveur",
      color: "border-emerald-300 bg-emerald-50/80 text-emerald-950",
      icon: "server",
      read: true,
      write: true,
      terminal: true,
      gitConsult: true,
      gitMutate: false,
      notes: "Peut éditer les fichiers sous backend/ et exécuter npm test dans le terminal. Pas d'autorisation de merge/push Git."
    },
    frontend: {
      name: "Agent Frontend",
      role: "Développement Composants & Interface React",
      color: "border-indigo-300 bg-indigo-50/80 text-indigo-950",
      icon: "layout",
      read: true,
      write: true,
      terminal: true,
      gitConsult: true,
      gitMutate: false,
      notes: "Peut éditer les fichiers sous frontend/ et exécuter le linter/tests UI. Cloisonné à son sous-répertoire."
    },
    qa: {
      name: "Agent QA",
      role: "Validation, Tests d'intégration & Régression",
      color: "border-purple-300 bg-purple-50/80 text-purple-950",
      icon: "check-circle",
      read: true,
      write: true, // sur les dossiers tests/
      terminal: true,
      gitConsult: true,
      gitMutate: false,
      notes: "Rédige et exécute les suites de tests (Vitest, Supertest). N'intervient pas directement sur le code métier de production."
    },
    reviewer: {
      name: "Agent Reviewer",
      role: "Audit de code, respect des normes & sécurité",
      color: "border-amber-300 bg-amber-50/80 text-amber-950",
      icon: "shield-check",
      read: true,
      write: false,
      terminal: false,
      gitConsult: true,
      gitMutate: false,
      notes: "Lecture seule, recherche globale et inspection de `git diff`. Émet des recommandations d'amélioration sans modifier le code."
    }
  };

  const curr = agentPermissions[selectedAgent];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="users" className="w-4 h-4 text-indigo-800" />
            <span>Orchestration Multi-Agents • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 5 — Découvrir les outils accessibles aux agents
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Explorer la panoplie d&apos;outils à disposition d&apos;un agent IA dans son IDE (système de fichiers, terminal shell, recherche, vérification, Git) et comprendre la gestion rigoureuse des permissions d&apos;accès.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Cartographier les 6 catégories d&apos;outils</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Distinguer capacité technique et autorisation</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Appliquer le principe de moindre privilège</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : QU'EST-CE QU'UN OUTIL ?
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">1</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            5.1 & 5.2 — Qu&apos;est-ce qu&apos;un outil pour un agent IA ?
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Un modèle d&apos;IA est un moteur de traitement pur : il ne peut pas ouvrir un fichier ni exécuter une commande par magie. Pour interagir avec le monde réel, l&apos;environnement lui expose des <strong>outils</strong> (ou <em>tools / function calls</em>).
        </p>
        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Lorsque l&apos;agent décide qu&apos;il doit lire un fichier, il émet un appel structuré (ex: <code>read_file(path: &quot;backend/src/routes.ts&quot;)</code>). Le runtime de l&apos;IDE intercepte la demande, vérifie les permissions, lit le fichier sur le disque dur et renvoie son contenu dans le contexte de l&apos;agent.
        </p>
      </section>

      {/* =========================================================================
          SECTION 2 : LES 6 FAMILLES D'OUTILS FONDAMENTALES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">2</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            5.3 & 5.4 — Les 6 grandes familles d&apos;outils dans l&apos;IDE
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Famille 1 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Système de fichiers (Lecture & Arborescence)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Lecture Seule
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Permet à l&apos;agent d&apos;explorer la structure des dossiers et de lire le contenu des fichiers (ex: <code>read_file</code>, <code>list_directory</code>). C&apos;est la base indispensable pour qu&apos;un agent comprenne le code existant avant toute intervention.
            </p>
          </div>

          {/* Famille 2 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Édition & Modification de code
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Écriture Ciblée
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Création de nouveaux fichiers (<code>write_file</code>) ou remplacement chirurgical de fragments existants (<code>edit_file</code>). L&apos;agent applique ses modifications sans écraser le reste du projet.
            </p>
          </div>

          {/* Famille 3 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Recherche & Navigation de symboles
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Indexation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Recherche textuelle (grep), repérage des références de types TypeScript et localisation instantanée des définitions de fonctions à travers des centaines de fichiers.
            </p>
          </div>

          {/* Famille 4 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">4</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Terminal & Commandes Shell
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                Sensible (Sandbox)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Lancement de commandes système (<code>run_command</code>) : installer des dépendances avec npm, compiler le code ou exécuter des scripts Node.js dans un environnement sécurisé.
            </p>
          </div>

          {/* Famille 5 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">5</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Tests Automatisés & Linters
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                Validation Continue
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Exécution des tests unitaires Vitest/Jest et diagnostic TypeScript (<code>tsc --noEmit</code>). Permet à l&apos;agent de s&apos;auto-vérifier en continu pour livrer un code fonctionnel.
            </p>
          </div>

          {/* Famille 6 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">6</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Outils de Versioning Git (VCS)
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Traçabilité
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Consultation de l&apos;état du dépôt (<code>git status</code>, <code>git diff</code>), commit local sur branche isolée. Les opérations critiques (merge/push) restant réservées au PM humain.
            </p>
          </div>
        </div>

        <Callout type="warning" title="Opérations Git : Consultation vs Mutation">
          Il est vital de scinder Git en deux catégories d&apos;outils :
          <br />• <strong>Consultation</strong> (status, diff, log) : accessible aux agents pour auditer leur propre travail.
          <br />• <strong>Mutation critique</strong> (merge, rebase, push, suppression de branche) : <strong>strictement réservé au Project Manager humain</strong> pour garantir l&apos;intégrité du dépôt.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 3 : SIMULATEUR INTERACTIF - MATRICE DE PERMISSIONS PAR RÔLE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">3</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            5.5 & 5.6 — Matrice de permissions : Le moindre privilège en pratique
          </h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Donner tous les droits à tous les agents est la première cause de régressions catastrophiques sur un projet multi-agents. Chaque agent ne doit disposer que des outils strictement indispensables à sa mission. Explorez la matrice ci-dessous :
        </p>

        {/* Simulateur interactif de permissions */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sélectionnez un profil d&apos;agent :</span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(['architect', 'backend', 'frontend', 'qa', 'reviewer'] as const).map((key) => {
                const item = agentPermissions[key];
                const isSel = selectedAgent === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedAgent(key)}
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

          {/* Fiche d'autorisation active */}
          <div className={`p-5 rounded-2xl border-2 ${curr.color} space-y-4`}>
            <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
              <div className="flex items-center gap-2.5">
                <Icon name={curr.icon} className="w-5 h-5 text-indigo-700" />
                <h3 className="text-lg font-black">{curr.name}</h3>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white/90 px-3 py-1 rounded-full border border-slate-300">
                {curr.role}
              </span>
            </div>

            {/* Liste des permissions */}
            <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full text-xs sm:text-sm">
              <div className={`flex items-center justify-between p-3 rounded-xl border ${curr.read ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="folder" className="w-4 h-4 shrink-0 text-slate-600" />
                  <span className="font-bold">Lecture de fichiers sources</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black shrink-0 ${curr.read ? 'bg-emerald-200/80 text-emerald-900' : 'bg-slate-200 text-slate-600'}`}>
                  {curr.read ? '✓ Autorisé' : '✕ Bloqué'}
                </span>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-xl border ${curr.write ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="file-code" className="w-4 h-4 shrink-0 text-slate-600" />
                  <span className="font-bold">Écriture / Édition de code</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black shrink-0 ${curr.write ? 'bg-emerald-200/80 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {curr.write ? '✓ Autorisé' : '✕ Verrouillé'}
                </span>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-xl border ${curr.terminal ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="terminal" className="w-4 h-4 shrink-0 text-slate-600" />
                  <span className="font-bold">Terminal Shell & Exécution</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black shrink-0 ${curr.terminal ? 'bg-emerald-200/80 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {curr.terminal ? '✓ Autorisé' : '✕ Verrouillé'}
                </span>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-xl border ${curr.gitConsult ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="git-branch" className="w-4 h-4 shrink-0 text-slate-600" />
                  <span className="font-bold">Git Consultation (Diff / Status)</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black shrink-0 ${curr.gitConsult ? 'bg-emerald-200/80 text-emerald-900' : 'bg-slate-200 text-slate-600'}`}>
                  {curr.gitConsult ? '✓ Autorisé' : '✕ Bloqué'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border bg-rose-50 border-rose-200 text-rose-900">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="shield-check" className="w-4 h-4 shrink-0 text-rose-700" />
                  <span className="font-bold">Git Mutation (Merge / Push)</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black shrink-0 bg-rose-200 text-rose-900">
                  ✕ Réservé au PM
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800 pt-1">
              <strong>Justification de sécurité :</strong> {curr.notes}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>5.9 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Les outils confèrent aux agents le pouvoir d&apos;agir sur l&apos;environnement de développement. Pour maintenir une sécurité irréprochable sur TaskFlow, ce pouvoir doit être rigoureusement bridé : <strong>un agent ne doit jamais recevoir plus de permissions que celles requises par son rôle immédiat</strong>. Les actions sensibles (commandes destructives, modifications hors périmètre, fusion de branches Git) doivent être soumises à la validation humaine explicite.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            5.10 — Quiz de compréhension (9 questions)
          </h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Les outils accessibles aux agents IA"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal des outils (tools) mis à la disposition des agents IA ?",
              options: [
                "Remplacer intégralement le modèle d'intelligence artificielle",
                "Permettre aux agents d'interagir concrètement avec leur environnement logiciel",
                "Garantir mathématiquement que le code sera toujours exempt de bugs",
                "Remplacer le rôle du Project Manager humain"
              ],
              correctIndex: 1,
              explanation: "Les outils permettent à l'agent de passer de l'analyse pure à l'action concrète sur le projet."
            },
            {
              id: 2,
              question: "Quel outil permet à un agent d'explorer les dossiers et de consulter le code d'un projet ?",
              options: [
                "Le système de fichiers (outils de lecture / arborescence)",
                "Le gestionnaire de paquets en ligne uniquement",
                "Le navigateur Web de l'utilisateur",
                "Le compilateur JavaScript uniquement"
              ],
              correctIndex: 0,
              explanation: "Le système de fichiers donne accès à la structure des dossiers et au contenu des fichiers."
            },
            {
              id: 3,
              question: "À quoi sert principalement le terminal pour un agent IA autorisé ?",
              options: [
                "À stocker de façon permanente les historiques de chat",
                "À afficher uniquement le code source des fichiers",
                "À exécuter des commandes système (npm test, build, installation)",
                "À attribuer des pseudonymes aux autres agents"
              ],
              correctIndex: 2,
              explanation: "Le terminal permet d'exécuter des scripts, de tester le code et de vérifier la compilation."
            },
            {
              id: 4,
              question: "Quel outil est le plus adapté pour repérer toutes les occurrences d'une fonction dans le projet ?",
              options: [
                "Un outil de recherche textuelle globale (Grep / Symbole)",
                "Un outil de suppression de fichiers",
                "Un outil de publication sur serveur de production",
                "Un gestionnaire de comptes utilisateurs"
              ],
              correctIndex: 0,
              explanation: "Les outils de recherche permettent d'identifier tous les appels d'une fonction dans tout le code."
            },
            {
              id: 5,
              question: "Quel est l'objectif premier des outils de test et de vérification (Vitest, Linter) ?",
              options: [
                "Supprimer définitivement le besoin de relire le code",
                "Contrôler différents aspects du comportement et de la conformité du travail réalisé",
                "Modifier automatiquement les permissions de l'IDE",
                "Supprimer les fichiers qui ne compilent pas"
              ],
              correctIndex: 1,
              explanation: "Les tests vérifient la conformité comportementale et protègent contre les régressions."
            },
            {
              id: 6,
              question: "À quoi sert Git dans le cadre du pilotage d'une équipe d'agents IA ?",
              options: [
                "À gérer les conversations audio des agents",
                "À générer tout le code métier de manière autonome",
                "À suivre l'évolution des fichiers, isoler les chantiers et conserver un historique traçable",
                "À remplacer l'explorateur de fichiers de Windows"
              ],
              correctIndex: 2,
              explanation: "Git assure la traçabilité complète des modifications et isole les travaux par branche."
            },
            {
              id: 7,
              question: "Pourquoi est-il crucial d'adapter strictement les outils et permissions aux responsabilités des agents ?",
              options: [
                "Pour donner les pleins pouvoirs à tous les agents par souci d'égalité",
                "Pour limiter les risques de suppression ou de modification accidentelle (moindre privilège)",
                "Pour empêcher les agents d'accéder au contexte",
                "Pour supprimer toute intervention humaine"
              ],
              correctIndex: 1,
              explanation: "Le principe de moindre privilège réduit drastiquement les risques de fausses manipulations."
            },
            {
              id: 8,
              question: "Que signifie un accès restreint en « lecture seule » pour un agent ?",
              options: [
                "L'agent peut consulter les fichiers et informations sans pouvoir les modifier ou les supprimer",
                "L'agent peut effacer tous les fichiers sans confirmation",
                "L'agent a le droit d'effectuer tous les merges Git sur main",
                "L'agent peut changer les mots de passe de l'IDE"
              ],
              correctIndex: 0,
              explanation: "La lecture seule permet l'analyse et la revue sans risque d'altération du code source."
            },
            {
              id: 9,
              question: "Dans le projet TaskFlow, qui a le pouvoir exclusif d'autoriser un merge, un rebase ou un push Git ?",
              options: [
                "L'agent Backend",
                "L'agent QA",
                "Le Project Manager humain",
                "Le terminal d'exécution automatique"
              ],
              correctIndex: 2,
              explanation: "Les opérations Git sensibles sont l'apanage exclusif du Project Manager humain."
            }
          ]}
        />
      </section>
    </div>
  );
};
