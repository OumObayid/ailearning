'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif de périmètre et droits d'intervention
  const [selectedFile, setSelectedFile] = useState<string>('backend');

  const filePerimeters: Record<string, {
    path: string;
    description: string;
    allowedOwner: string;
    readOnlyRoles: string[];
    forbiddenRoles: string[];
    risk: string;
    rule: string;
  }> = {
    backend: {
      path: 'backend/src/controllers/taskController.ts',
      description: 'Code source de la logique serveur et routes Express de TaskFlow.',
      allowedOwner: 'Agent Backend (Écriture autorisée)',
      readOnlyRoles: ['QA (pour comprendre le code)', 'Reviewer (pour auditer)', 'Architect'],
      forbiddenRoles: ['Agent Frontend (Strictement interdit en écriture)'],
      risk: 'Si le Frontend modifie ce fichier, il risque de casser la gestion des statuts en mémoire ou d\'introduire des erreurs de syntaxe côté serveur.',
      rule: 'Seul l\'Agent Backend a le droit d\'éditer les fichiers sous backend/src/.'
    },
    frontend: {
      path: 'frontend/src/components/TaskCard.tsx',
      description: 'Composant visuel React affichant le statut et les actions d\'une tâche.',
      allowedOwner: 'Agent Frontend (Écriture autorisée)',
      readOnlyRoles: ['QA (pour préparer les tests d\'UI)', 'Reviewer (pour auditer)', 'Architect'],
      forbiddenRoles: ['Agent Backend (Strictement interdit en écriture)'],
      risk: 'Si le Backend modifie ce composant, il risque de perturber le style Tailwind ou les hooks React d\'état.',
      rule: 'Seul l\'Agent Frontend a le droit d\'éditer les fichiers sous frontend/src/.'
    },
    contract: {
      path: 'docs/API_CONTRACT.md',
      description: 'Spécification normative des endpoints, formats JSON et codes de statut HTTP.',
      allowedOwner: 'Agent Architect (Sous arbitrage Team Leader / PM)',
      readOnlyRoles: ['Backend (Applique)', 'Frontend (Consomme)', 'QA (Vérifie)', 'Reviewer'],
      forbiddenRoles: ['Backend & Frontend (Interdiction formelle de modifier unilatéralement)'],
      risk: 'Un changement non concerté désynchronise immédiatement le frontend et le backend.',
      rule: 'Toute modification du contrat d\'API doit être soumise au Team Leader et validée par le PM.'
    },
    tests: {
      path: 'tests/integration/tasks.test.ts',
      description: 'Scénarios automatisés Vitest & Supertest vérifiant le comportement de l\'API.',
      allowedOwner: 'Agent QA (Écriture autorisée)',
      readOnlyRoles: ['Backend', 'Reviewer', 'Team Leader'],
      forbiddenRoles: ['Frontend (Pas de modification des suites de tests d\'intégration)'],
      risk: 'Le développeur backend ne doit pas modifier les tests du QA pour dissimuler un bug de son code.',
      rule: 'Indépendance des tests : le QA rédige et maintient les scénarios de vérification.'
    },
    gitBranch: {
      path: 'Opération : git merge feat/tasks-api sur main',
      description: 'Fusion de code dans la branche de production protégée.',
      allowedOwner: 'Project Manager humain exclusivement',
      readOnlyRoles: ['Tous les agents peuvent consulter git status et git diff'],
      forbiddenRoles: ['Team Leader et tous les agents IA (Interdiction absolue de merge/push)'],
      risk: 'Déploiement non supervisé d\'un code comportant des régressions ou des conflits.',
      rule: 'Monopole de sécurité : aucun merge, rebase ou push sans accord explicite écrit du PM.'
    }
  };

  const curr = filePerimeters[selectedFile];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="shield-check" className="w-4 h-4 text-indigo-800" />
            <span>Organisation d&apos;Équipe • Module 2</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 5 — Organiser les responsabilités et les limites de chaque agent
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Définir les frontières strictes d&apos;intervention pour prévenir les chevauchements de code, distinguer responsabilité fonctionnelle et permission technique, et encadrer les dépassements de périmètre.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Définir les périmètres et limites d&apos;action de chaque profil</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Prévenir les chevauchements et conflits de modification de fichiers</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Structurer les fiches de mission et la gestion des escalades hors périmètre</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : NOTIONS DE RESPONSABILITÉ, PÉRIMÈTRE ET LIMITES
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Les 4 concepts clés de l&apos;encadrement d&apos;agent</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Attribuer un rôle à un agent ne suffit pas : sans barrières strictes, un agent backend peut modifier un composant React pour « aller plus vite », pendant que le frontend tente de corriger une route Express. Ce désordre engendre des réécritures contradictoires et détruit la cohérence du projet TaskFlow.
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-2">
          {/* Concept 1 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">1</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  La Responsabilité
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Objectif
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le domaine technique ou le livrable précis dont l&apos;agent doit répondre (ex: l&apos;Agent Backend est responsable du fonctionnement du serveur et de l&apos;API).
            </p>
          </div>

          {/* Concept 2 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">2</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Le Périmètre d&apos;Intervention
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Zone Autorisée
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              La liste explicite des fichiers et répertoires sur lesquels l&apos;agent a le droit d&apos;effectuer des modifications (ex: <code>backend/src/</code> uniquement).
            </p>
          </div>

          {/* Concept 3 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">3</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Les Limites d&apos;Action
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Interdits
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Ce que l&apos;agent ne doit jamais faire sans autorisation expresse (ex: modifier le contrat d&apos;API, ajouter une bibliothèque tierce, altérer les composants d&apos;un autre rôle).
            </p>
          </div>

          {/* Concept 4 */}
          <div className="w-full min-w-0 max-w-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black shrink-0">4</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  L&apos;Autonomie Encadrée
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Règle d&apos;Or
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Être responsable d&apos;une tâche ne donne pas le droit de décider de tout. L&apos;agent code en autonomie à l&apos;intérieur de son couloir, mais s&apos;arrête dès qu&apos;une frontière est atteinte.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : SIMULATEUR DE PÉRIMÈTRE ET GOUVERNANCE FICHIER
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Simulateur : Contrôle d&apos;accès et périmètres de fichiers</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Sélectionnez un fichier ou une opération clé de TaskFlow pour visualiser qui détient l&apos;autorisation d&apos;écriture, qui est en lecture seule et quels risques sont prévenus :
        </p>

        {/* Simulateur */}
        <div className="p-5 sm:p-7 rounded-3xl border-2 border-slate-300 bg-white shadow-sm space-y-6">
          <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Choisissez une ressource ou action :</span>
            <div className="flex flex-col gap-2 w-full min-w-0 max-w-full">
              {[
                { id: 'backend', label: 'backend/src/controllers/taskController.ts' },
                { id: 'frontend', label: 'frontend/src/components/TaskCard.tsx' },
                { id: 'contract', label: 'docs/API_CONTRACT.md (Contrat d\'API)' },
                { id: 'tests', label: 'tests/integration/tasks.test.ts' },
                { id: 'gitBranch', label: 'Opération Git : git merge feat/api sur main' },
              ].map((item) => {
                const isSelected = selectedFile === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedFile(item.id)}
                    className={`w-full p-3 rounded-xl border-2 text-left transition cursor-pointer font-mono text-xs sm:text-sm font-bold ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Résultat du périmètre */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 space-y-3.5 w-full min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-indigo-200/80">
              <span className="font-mono text-xs sm:text-sm font-black text-indigo-950">
                {curr.path}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200 shrink-0">
                Audit de Périmètre
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              {curr.description}
            </p>

            <div className="flex flex-col gap-2.5 w-full min-w-0 max-w-full text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-0.5">
                <div className="font-bold">Détenteur des droits d&apos;écriture :</div>
                <div>{curr.allowedOwner}</div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-0.5">
                <div className="font-bold">Accès en consultation (Lecture seule) :</div>
                <div>{curr.readOnlyRoles.join(', ')}</div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 space-y-0.5">
                <div className="font-bold">Interdictions formelles :</div>
                <div>{curr.forbiddenRoles.join(', ')}</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 space-y-0.5">
                <div className="font-bold text-slate-900">Risque prévenu par cette règle :</div>
                <div>{curr.risk}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : GÉRER LES SITUATIONS QUI DÉPASSENT LE PÉRIMÈTRE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Protocole d&apos;escalade : Que faire hors périmètre ?</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Si l&apos;Agent Backend découvre qu&apos;un champ manque dans l&apos;interface React ou que le contrat d&apos;API est incomplet, <strong>il ne doit jamais tenter de corriger lui-même le fichier d&apos;un autre agent</strong>. Il applique le tableau d&apos;escalade suivant :
        </p>

        {/* Tableau d'escalade */}
        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Situation rencontrée</th>
                <th className="p-3.5">Intervenant à solliciter</th>
                <th className="p-3.5">Action attendue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-bold">Contrat de l&apos;API incomplet ou ambigu</td>
                <td className="p-3.5 text-cyan-700 font-bold">Agent Architect</td>
                <td className="p-3.5">Précise la spécification et met à jour le schéma TypeScript commun.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Anomalie ou bug dans une route backend</td>
                <td className="p-3.5 text-emerald-700 font-bold">Agent Backend</td>
                <td className="p-3.5">Corrige le contrôleur ou le service sous son périmètre de code.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Problème d&apos;affichage ou interaction React</td>
                <td className="p-3.5 text-blue-700 font-bold">Agent Frontend</td>
                <td className="p-3.5">Ajuste le composant d&apos;interface sans toucher au serveur.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Test en échec ou comportement non conforme</td>
                <td className="p-3.5 text-purple-700 font-bold">Agent QA & Agent responsable</td>
                <td className="p-3.5">Le QA fournit les étapes de reproduction ; le responsable corrige son code.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Problème de qualité, sécurité ou doublon</td>
                <td className="p-3.5 text-rose-700 font-bold">Agent Reviewer</td>
                <td className="p-3.5">Rédige ses observations pour que l&apos;auteur effectue le refactoring.</td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="p-3.5 font-bold text-amber-950">Changement d&apos;architecture majeur ou base SQL</td>
                <td className="p-3.5 text-amber-800 font-bold">Project Manager humain</td>
                <td className="p-3.5">Arbitrage souverain indispensable avant tout engagement technique.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>5.11 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Une équipe multi-agents n&apos;est performante que si ses membres respectent des couloirs de nage étanches. Chaque agent dispose d&apos;un périmètre de fichiers précis et s&apos;interdit formellement d&apos;altérer le travail d&apos;un autre rôle. En cas de blocage ou de besoin hors périmètre, l&apos;agent escalade au Team Leader plutôt que d&apos;improviser. <strong>Les opérations Git critiques (merge, push) demeurent le domaine exclusif du Project Manager humain</strong>.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de validation des connaissances (10 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Organiser les responsabilités et les limites de chaque agent"
          questions={[
            {
              id: 1,
              question: "Que représente la responsabilité d'un agent ?",
              options: [
                "L'ensemble des permissions techniques de son environnement",
                "Le domaine de travail ou le résultat dont il doit s'occuper",
                "Le pouvoir de modifier toutes les parties du projet sans concertation",
                "Le droit de faire des merges sur la branche principale"
              ],
              correctIndex: 1,
              explanation: "La responsabilité correspond au domaine de travail ou au livrable confié à un agent."
            },
            {
              id: 2,
              question: "Que définit le périmètre d'intervention ?",
              options: [
                "Les éléments (fichiers, fonctions, répertoires) sur lesquels l'agent peut travailler dans le cadre de sa mission",
                "Le nombre total d'agents dans l'équipe",
                "Le temps estimé pour achever le sprint",
                "La vitesse de compilation de TypeScript"
              ],
              correctIndex: 0,
              explanation: "Le périmètre précise les éléments concernés par la mission, notamment les fichiers et les modifications autorisées."
            },
            {
              id: 3,
              question: "Pourquoi faut-il définir un responsable principal pour chaque domaine ?",
              options: [
                "Pour empêcher les agents de communiquer",
                "Pour supprimer le besoin de coordination du Team Leader",
                "Pour clarifier les responsabilités, savoir qui produit quoi et limiter les chevauchements",
                "Pour empêcher le PM de poser des questions"
              ],
              correctIndex: 2,
              explanation: "Identifier un responsable principal clarifie qui traite quel sujet et élimine les risques de doublons ou de réécritures contradictoires."
            },
            {
              id: 4,
              question: "L'Agent Backend découvre qu'une modification du composant React frontend est nécessaire. Que doit-il faire ?",
              options: [
                "Modifier directement tous les fichiers frontend lui-même",
                "Signaler le besoin au Team Leader pour organiser une mission vers l'Agent Frontend",
                "Ignorer le problème et abandonner la mission",
                "Supprimer le composant React"
              ],
              correctIndex: 1,
              explanation: "L'Agent Backend signale la dépendance. Le Team Leader orchestre ensuite la tâche auprès du Frontend, garantissant le respect des périmètres."
            },
            {
              id: 5,
              question: "Quelle différence existe entre responsabilité et permission ?",
              options: [
                "Il n'existe aucune différence",
                "La responsabilité définit les actions techniquement possibles dans le shell",
                "La responsabilité définit ce que l'agent doit accomplir, tandis que la permission définit ce qu'il peut techniquement exécuter",
                "La permission remplace la validation humaine"
              ],
              correctIndex: 2,
              explanation: "La responsabilité décrit la mission confiée. La permission définit les actions que ses outils lui permettent techniquement d'exécuter."
            },
            {
              id: 6,
              question: "Deux agents doivent modifier le même fichier. Quelle est la meilleure démarche ?",
              options: [
                "Laisser les deux agents travailler sans coordination sur la même branche",
                "Examiner les dépendances et ordonnancer les modifications (ou isoler les branches) pour éviter les conflits",
                "Demander aux deux agents de remplacer entièrement le fichier",
                "Supprimer le fichier du dépôt"
              ],
              correctIndex: 1,
              explanation: "Les modifications concurrentes non coordonnées provoquent des conflits destructeurs : le Team Leader doit séquencer ou isoler les espaces de travail."
            },
            {
              id: 7,
              question: "Que doit faire un agent lorsqu'une situation dépasse son périmètre d'intervention ?",
              options: [
                "Signaler la situation et attendre les instructions ou la délégation appropriée",
                "Élargir automatiquement sa mission sans en avertir l'équipe",
                "Modifier les objectifs du projet",
                "Désactiver le linter et les tests"
              ],
              correctIndex: 0,
              explanation: "Un agent ne doit jamais étendre son périmètre de sa propre initiative : il documente la situation et alerte son Team Leader."
            },
            {
              id: 8,
              question: "Quel est l'objectif d'une fiche de mission ?",
              options: [
                "Remplacer les tests unitaires",
                "Donner une autonomie illimitée à l'agent",
                "Préciser l'objectif, le périmètre, les contraintes, les livrables et les limites de l'intervention",
                "Bloquer toute exécution du terminal"
              ],
              correctIndex: 2,
              explanation: "La fiche de mission formalise le cadre de travail et élimine les interprétations hasardeuses."
            },
            {
              id: 9,
              question: "Qui coordonne les conflits de mission ou de dépendances entre les agents ?",
              options: [
                "Le QA uniquement",
                "Le Team Leader IA",
                "Le Reviewer uniquement",
                "Chaque agent de façon autonome"
              ],
              correctIndex: 1,
              explanation: "Le Team Leader coordonne les flux de travail, gère les dépendances et arbitre les conflits opérationnels."
            },
            {
              id: 10,
              question: "Dans notre organisation, qui doit autoriser explicitement un merge, un rebase ou un push sur Git ?",
              options: [
                "Le Project Manager humain exclusivement",
                "N'importe quel agent spécialisé",
                "Le Reviewer automatiquement après son audit",
                "Le Team Leader IA sans intervention humaine"
              ],
              correctIndex: 0,
              explanation: "Le PM humain conserve le monopole absolu sur les opérations Git sensibles : aucun merge, rebase ou push sans son approbation expresse."
            }
          ]}
        />
      </section>
    </div>
  );
};
