'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif de délégation : Agent Principal vs Sous-Agents
  const [selectedRole, setSelectedRole] = useState<'assistant' | 'agent' | 'subagent'>('agent');

  const rolesData = {
    assistant: {
      title: "Assistant IA (Conseil & Support)",
      badge: "Dialogue Interactif",
      icon: "help-circle",
      color: "border-blue-300 bg-blue-50/80 text-blue-950",
      target: "L'utilisateur humain (Développeur / PM)",
      trigger: "Une question ou une demande d'explication ponctuelle",
      mode: "Échange conversationnel questions-réponses",
      tools: "Capacités de lecture ou de suggestion (souvent sans écriture autonome)",
      example: "Développeur : « Pourquoi cette promesse TypeScript rejette-t-elle avec TypeError ? »\nAssistant : « L'objet task est undefined au moment de l'accès à task.id. Ajoutez un guard if (!task) return... »",
      summary: "Idéal pour clarifier une notion, débloquer une erreur de syntaxe ou explorer une idée sans modifier les fichiers."
    },
    agent: {
      title: "Agent IA (Exécution d'une Mission)",
      badge: "Mission & Autonomie",
      icon: "bot",
      color: "border-indigo-300 bg-indigo-50/80 text-indigo-950",
      target: "Un objectif logiciel précis",
      trigger: "Un prompt de mission structuré avec critères d'acceptation",
      mode: "Boucle fermée (Analyse -> Plan -> Édition -> Tests -> Rapport)",
      tools: "Accès complet aux fichiers et au terminal selon son périmètre",
      example: "Team Leader : « Implémente la route GET /api/tasks avec filtrage par statut dans TaskFlow. »\nAgent Backend : Explore le routeur, modifie le contrôleur, ajoute le test Vitest et livre son compte rendu.",
      summary: "Pilier opérationnel du développement : il assume la responsabilité d'un livrable vérifiable."
    },
    subagent: {
      title: "Sous-Agent (Délégation Spécialisée)",
      badge: "Sous-Tâche Délimitée",
      icon: "git-branch",
      color: "border-purple-300 bg-purple-50/80 text-purple-950",
      target: "L'agent principal qui l'a invoqué",
      trigger: "Une délégation ciblée pour décharger l'agent principal",
      mode: "Exécution autonome d'un sous-problème isolé puis retour au parent",
      tools: "Outils restreints à sa sous-mission (ex: lecture seule des tests)",
      example: "Agent Backend -> Invoque @SubAgent-Tests :\n« Analyse les tests existants et dresse la liste des statuts non couverts. »\n@SubAgent-Tests -> Renvoie son rapport d'analyse à l'Agent Backend qui continue son code.",
      summary: "Permet de diviser pour régner sans saturer la mémoire et le contexte de l'agent principal."
    }
  };

  const active = rolesData[selectedRole];

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

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 3 — Distinguer assistant IA, agent IA et sous-agent
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Clarifier avec rigueur les rôles fonctionnels de chaque intervenant IA, comprendre la mécanique de délégation par sous-agents et savoir quand mobiliser chaque profil sur un projet comme TaskFlow.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Distinguer les 3 statuts IA</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Comprendre la mécanique de sous-agent</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Maîtriser la matrice de décision d&apos;usage</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LES TROIS INTERVENANTS
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 1 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Les trois statuts fonctionnels dans l&apos;IDE</h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dans la documentation et les outils d&apos;IA, les termes « assistant », « agent » et « sous-agent » sont souvent employés de façon confuse. Pourtant, sur le plan organisationnel, ils répondent à des besoins diamétralement différents.
        </p>

        {/* Sélecteur interactif des rôles : 1 bouton sur ligne (petite largeur), 2 boutons sur ligne (sidebar repliée), 3 boutons sur ligne (écran plein) */}
        <div className="@container w-full min-w-0 max-w-full pt-2">
          <div className="grid grid-cols-1 @[480px]:grid-cols-2 @[760px]:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3 items-stretch">
            {(['assistant', 'agent', 'subagent'] as const).map((r) => {
              const isSel = selectedRole === r;
              const data = rolesData[r];
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`group p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between h-full w-full min-w-0 ${
                    isSel
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                      : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800 shadow-2xs'
                  }`}
                >
                  {/* En-tête : Icône et Badge alignés */}
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        isSel
                          ? 'bg-indigo-700/90 text-white'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                      }`}
                    >
                      <Icon name={data.icon} className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                        isSel
                          ? 'bg-indigo-700 border-indigo-500 text-indigo-100'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {data.badge}
                    </span>
                  </div>

                  {/* Titre du rôle & Flèche indicatrice */}
                  <div className="pt-2 w-full flex items-center justify-between gap-2">
                    <div className="font-black text-sm sm:text-base leading-tight tracking-tight">
                      {data.title.split('(')[0].trim()}
                    </div>
                    <span
                      className={`text-sm sm:text-base font-black transition-transform group-hover:translate-x-1 shrink-0 ${
                        isSel ? 'text-white' : 'text-indigo-600'
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fiche détaillée du rôle sélectionné */}
        <div className={`p-5 sm:p-6 rounded-2xl border-2 ${active.color} space-y-4 w-full min-w-0 max-w-full overflow-hidden`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-300/60 min-w-0 max-w-full">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-white/80 shadow-xs text-indigo-700 shrink-0">
                <Icon name={active.icon} className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                {active.title}
              </h3>
            </div>
            <div className="inline-flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-700 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-300 whitespace-normal break-words [overflow-wrap:anywhere] max-w-full">
              <span className="text-slate-500 font-semibold shrink-0">Interlocuteur direct :</span>
              <span className="text-slate-900 font-bold whitespace-normal break-words [overflow-wrap:anywhere]">{active.target}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Déclencheur :</span>
              <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{active.trigger}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Mode de travail :</span>
              <p className="text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">{active.mode}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase text-slate-600">Exemple d&apos;interaction :</span>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full border border-slate-800">
              {active.example}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-white/70 border border-slate-300/80 text-xs sm:text-sm font-semibold text-slate-800">
            <strong>Synthèse d&apos;usage :</strong> {active.summary}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LA DÉLÉGATION PAR SOUS-AGENT
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 2 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Comment fonctionne la délégation par sous-agents ?</h2>
        </div>

        <p className="text-base text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Lorsqu&apos;un agent principal reçoit une mission de grande envergure (par exemple concevoir l&apos;API complète de TaskFlow), il risque de saturer sa fenêtre de contexte en voulant tout faire lui-même. La solution consiste à <strong>déléguer des sous-missions autonomes à des sous-agents</strong>.
        </p>

        {/* Schéma fonctionnel de délégation */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white border-2 border-slate-800 space-y-5">
          <div className="text-center font-bold text-sm text-indigo-300 uppercase tracking-wider">
            Architecture de délégation dans Google Antigravity
          </div>

          <div className="flex flex-col items-center gap-3">
            {/* Agent Parent */}
            <div className="w-full max-w-md p-3.5 rounded-xl bg-indigo-600 text-white text-center border-2 border-indigo-400 shadow-sm space-y-1">
              <div className="text-xs font-black uppercase text-indigo-200">Agent Principal Responsable</div>
              <div className="font-extrabold text-sm sm:text-base">Agent Backend (Mission Globale API)</div>
              <div className="text-xs text-indigo-100">Coordonne, intègre et répond au Team Leader</div>
            </div>

            <Icon name="arrow-down" className="w-5 h-5 text-indigo-400" />

            {/* Branchement sous-agents */}
            <div className="flex flex-col gap-3 w-full max-w-xl">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                  <Icon name="git-branch" className="w-3.5 h-3.5" />
                  <span>Sous-Agent 1 : Analyse Code</span>
                </div>
                <p className="text-xs text-slate-300">
                  Scanne les contrôleurs existants et dresse la liste des routes déjà présentes.
                </p>
                <div className="text-[11px] font-mono text-emerald-400">&gt; Retourne son rapport et s&apos;arrête</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                  <Icon name="git-branch" className="w-3.5 h-3.5" />
                  <span>Sous-Agent 2 : Analyse Tests</span>
                </div>
                <p className="text-xs text-slate-300">
                  Vérifie la couverture Vitest et repère les tests manquants sur les cas d&apos;erreur.
                </p>
                <div className="text-[11px] font-mono text-emerald-400">&gt; Retourne son rapport et s&apos;arrête</div>
              </div>
            </div>

            <Icon name="arrow-down" className="w-5 h-5 text-indigo-400" />

            {/* Intégration */}
            <div className="w-full max-w-md p-3 rounded-xl bg-slate-800 text-center border border-slate-700 text-xs text-slate-300">
              <strong className="text-white">L&apos;Agent Backend</strong> agrège les 2 synthèses, rédige le code final, valide avec Vitest et rédige son compte rendu final.
            </div>
          </div>
        </div>

        <Callout type="info" title="Règle d'or : Le sous-agent n'est pas un modèle différent">
          Un sous-agent peut utiliser exactement le même modèle d&apos;intelligence artificielle que son parent. Le préfixe « sous- » désigne <strong>une relation hiérarchique de délégation temporaire</strong>, et non une technologie inférieure.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 3 : QUAND UTILISER QUEL INTERVENANT ?
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm"> 3 </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Matrice de décision : Quel intervenant mobiliser ?</h2>
        </div>

        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Nature de votre besoin</th>
                <th className="p-3.5">Profil recommandé</th>
                <th className="p-3.5">Pourquoi ce choix ?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-bold">Comprendre une erreur TypeScript obscure</td>
                <td className="p-3.5 text-blue-700 font-bold">Assistant IA</td>
                <td className="p-3.5 text-slate-600">Besoin d&apos;explication pédagogique immédiate sans modifier de fichiers.</td>
              </tr>
              <tr className="bg-indigo-50/20">
                <td className="p-3.5 font-bold">Créer la route de suppression de tâche avec ses tests</td>
                <td className="p-3.5 text-indigo-700 font-bold">Agent IA (Backend)</td>
                <td className="p-3.5 text-slate-600">Nécessite lecture, édition de plusieurs fichiers et auto-vérification terminal.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Cartographier 50 composants React avant refactorisation</td>
                <td className="p-3.5 text-purple-700 font-bold">Sous-Agent délégué</td>
                <td className="p-3.5 text-slate-600">Isole la lecture lourde pour ne pas encombrer le contexte de l&apos;agent principal.</td>
              </tr>
              <tr className="bg-amber-50/20">
                <td className="p-3.5 font-bold">Valider la fusion de la branche backend vers main</td>
                <td className="p-3.5 text-amber-900 font-bold">Project Manager humain</td>
                <td className="p-3.5 text-slate-600">Opération stratégique et irréversible : l&apos;humain conserve l&apos;autorité exclusive.</td>
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
          <span>3.9 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          L&apos;<strong>Assistant</strong> conseille l&apos;humain, l&apos;<strong>Agent</strong> exécute une mission outillée de bout en bout, et le <strong>Sous-agent</strong> soulage l&apos;agent en prenant en charge une sous-tâche spécialisée. Une équipe multi-agents performante ne multiplie pas les agents inutilement : elle combine ces trois dynamiques en préservant le leadership du Project Manager humain.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">Quiz de compréhension (8 questions)</h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Distinguer assistant IA, agent IA et sous-agent"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'un assistant IA dans le flux de travail ?",
              options: [
                "Aider l'utilisateur en répondant à ses questions et en l'accompagnant dans sa réflexion",
                "Superviser obligatoirement une équipe d'agents autonomes",
                "Gérer seul toutes les décisions d'architecture d'un projet",
                "Exécuter des merges Git automatiques"
              ],
              correctIndex: 0,
              explanation: "L'assistant IA apporte une aide ponctuelle, répond aux demandes et explique le code."
            },
            {
              id: 2,
              question: "Qu'est-ce qui caractérise principalement un agent IA par rapport à un assistant ?",
              options: [
                "Il répond uniquement à des questions théoriques",
                "Il réalise une mission à partir d'un objectif et d'instructions en utilisant des outils",
                "Il ne peut jamais utiliser d'outils informatiques",
                "Il remplace le Project Manager pour les validations stratégiques"
              ],
              correctIndex: 1,
              explanation: "L'agent organise son travail autour d'une mission et dispose d'outils pour agir sur son environnement."
            },
            {
              id: 3,
              question: "Qu'est-ce qu'un sous-agent dans une organisation multi-agents ?",
              options: [
                "Un assistant qui ne sait pas analyser de code",
                "Un agent auquel une partie d'une mission a été déléguée par un agent principal",
                "Un agent qui utilise obligatoirement un modèle d'IA inférieur",
                "Un bot de notification par email"
              ],
              correctIndex: 1,
              explanation: "Le sous-agent reçoit une tâche délimitée transmise par un agent principal pour soulager ce dernier."
            },
            {
              id: 4,
              question: "Un assistant IA peut-il disposer d'outils dans certains environnements ?",
              options: [
                "Non, c'est techniquement impossible",
                "Oui, selon les capacités et la configuration de l'environnement utilisé",
                "Uniquement s'il est transformé en sous-agent",
                "Seulement s'il n'y a pas d'accès Internet"
              ],
              correctIndex: 1,
              explanation: "La frontière technique est poreuse : certains assistants modernes intègrent des capacités outillées sans être des agents autonomes."
            },
            {
              id: 5,
              question: "Pourquoi un agent principal a-t-il intérêt à invoquer un sous-agent ?",
              options: [
                "Pour lui déléguer une partie ciblée de son travail et préserver son propre contexte",
                "Pour éviter d'avoir à vérifier les résultats produits",
                "Pour transférer toutes ses responsabilités au Project Manager",
                "Pour supprimer le besoin d'écrire des tests"
              ],
              correctIndex: 0,
              explanation: "La délégation permet de diviser une tâche lourde et d'éviter d'encombrer la fenêtre de contexte de l'agent principal."
            },
            {
              id: 6,
              question: "Qui doit examiner et intégrer les résultats produits par un sous-agent ?",
              options: [
                "Personne, car les réponses d'un sous-agent sont parfaites par défaut",
                "L'agent principal qui lui a confié la sous-mission",
                "Uniquement l'utilisateur final du site TaskFlow",
                "Le terminal d'exécution"
              ],
              correctIndex: 1,
              explanation: "L'agent principal qui a mandaté le sous-agent doit contrôler les résultats reçus avant de poursuivre."
            },
            {
              id: 7,
              question: "Faut-il systématiquement mobiliser plusieurs agents pour chaque tâche d'un projet ?",
              options: [
                "Oui, quelle que soit la simplicité de la tâche",
                "Non, un seul agent suffit amplement pour une mission simple",
                "Oui, car un agent ne sait jamais travailler seul",
                "Non, car le multi-agents est formellement interdit sur les petits projets"
              ],
              correctIndex: 1,
              explanation: "Invoquer trop d'agents engendre des coûts et une complexité de synchronisation inutiles pour les tâches simples."
            },
            {
              id: 8,
              question: "Quelle est la responsabilité centrale de l'agent principal vis-à-vis de ses sous-agents ?",
              options: [
                "Le sous-agent décide seul de l'objectif global du projet",
                "L'agent principal coordonne sa mission et intègre les résultats des tâches déléguées sous l'autorité du PM",
                "Le sous-agent supervise obligatoirement le Team Leader IA",
                "L'agent principal démissionne dès que le sous-agent est créé"
              ],
              correctIndex: 1,
              explanation: "L'agent principal conserve le lead opérationnel sur sa mission et rend des comptes au Team Leader ou au PM."
            }
          ]}
        />
      </section>
    </div>
  );
};
