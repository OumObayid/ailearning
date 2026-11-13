'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif des 4 modes de déclenchement de Rules
  const [selectedTrigger, setSelectedTrigger] = useState<'always_on' | 'model_decision' | 'glob' | 'manual'>('always_on');

  const triggersConfig = {
    always_on: {
      name: "always_on (Toujours Actif)",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description: "La règle est injectée en permanence dans le contexte de l'agent pour chaque échange dans le projet.",
      yaml: `---
trigger: always_on
---
# Directives Fondamentales TaskFlow
- Langage imposé : TypeScript avec typage strict.
- Persistance en mémoire (Map locale).
- Interdiction stricte de merge ou push sans accord PM.`,
      usage: "Idéal pour les contraintes architecturales et éthiques non négociables."
    },
    model_decision: {
      name: "model_decision (Décision Intelligente)",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      description: "L'agent évalue la description de la règle pour déterminer si elle est pertinente pour la mission courante.",
      yaml: `---
trigger: model_decision
description: "À activer lors de la création ou modification des endpoints d'API REST Backend."
---
# Conventions API REST Backend
- Valider le payload avec Zod.
- Retourner 201 Created pour un ajout, 404 pour ressource introuvable.
- Ajouter les tests Supertest correspondants.`,
      usage: "Idéal pour les règles spécialisées qui ne doivent pas surcharger le contexte inutilement."
    },
    glob: {
      name: "glob (Filtrage par Extension de Fichier)",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      description: "La règle s'active automatiquement dès que l'agent manipule ou inspecte un fichier correspondant au motif.",
      yaml: `---
trigger: glob
globs: "*.tsx, *.jsx"
description: "Standards des composants d'interface React."
---
# Conventions Composants React
- Découper les composants volumineux en sous-composants réutilisables.
- Utiliser Tailwind CSS pour le style sans classes personnalisées inline.
- Gérer les états de chargement (loading skeleton).`,
      usage: "Idéal pour les règles de syntaxe et de style propres à un écosystème de fichiers."
    },
    manual: {
      name: "manual (Invocation Explicite)",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description: "La règle ne s'active que lorsque l'utilisateur ou le prompt l'appelle explicitement via sa mention @.",
      yaml: `---
trigger: manual
description: "Checklist d'audit de sécurité et de pré-livraison."
---
# Checklist de Revue de Sprint
- Vérifier l'absence totale de clés privées hardcodées (.env).
- Contrôler que la couverture de tests dépasse 80%.
- Valider le rapport de non-régression du QA.`,
      usage: "Idéal pour les grilles d'audit, revues de fin de sprint et procédures de déploiement."
    }
  };

  const curr = triggersConfig[selectedTrigger];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 5 — Configuration des agents et instructions
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 5 — Distinguer les instructions permanentes et ponctuelles
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour maintenir un contexte de travail fluide et éviter que vos agents ne se perdent dans des instructions de 50 pages, il est impératif de séparer les <strong>instructions permanentes</strong> (qui fixent le cadre durable dans <code>AGENTS.md</code> ou les <code>Rules</code>) des <strong>consignes ponctuelles</strong> (qui définissent la tâche éphémère du sprint dans la conversation).
        </p>
      </div>

      {/* =========================================================================
          OBJECTIFS D'APPRENTISSAGE
         ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="target" className="w-5 h-5 text-indigo-600" />
          Objectifs d'apprentissage du chapitre
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              1. Distinguer le cadre durable de la mission ponctuelle
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Les règles permanentes définissent <em>comment</em> travailler ; les consignes ponctuelles définissent <em>ce qu'il faut accomplir</em> aujourd'hui.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Maîtriser les 4 modes de déclenchement des Rules
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configurer les modes d'activation Antigravity : <code>always_on</code>, <code>model_decision</code>, <code>glob</code> et <code>manual</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Dissocier Rules, Workflows et Skills
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Règles (contraintes), Workflows (procédures séquentielles) et Skills (connaissances et outils spécialisés).
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5.2 & 5.7 : TABLEAU COMPARATIF PERMANENT VS PONCTUEL
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              5.2
            </span>
            Comparatif : Instructions permanentes vs Instructions ponctuelles
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Critère</th>
                <th className="pb-3 pr-4">Instructions permanentes</th>
                <th className="pb-3">Instructions ponctuelles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Durée de vie</td>
                <td className="py-2.5 pr-4">Durable sur toute la vie du projet</td>
                <td className="py-2.5">Éphémère (la durée d'un ticket ou d'un sprint)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Support</td>
                <td className="py-2.5 pr-4"><code>AGENTS.md</code> ou <code>.agents/rules/</code></td>
                <td className="py-2.5">Message utilisateur dans la conversation</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Contenu type</td>
                <td className="py-2.5 pr-4">Stack technique, conventions, règles de sécurité</td>
                <td className="py-2.5">Développer la route PATCH /api/tasks/:id/status</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Exemple TaskFlow</td>
                <td className="py-2.5 pr-4">"Toujours utiliser TypeScript avec validation Zod"</td>
                <td className="py-2.5">"Corrige le bug de re-render sur le composant TaskCard"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DES 4 MODES D'ACTIVATION DES RULES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur — Les 4 Modes de Déclenchement de Rules
              </h3>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${curr.badgeColor}`}>
              {curr.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Sélectionnez un mode d'activation pour examiner sa structure YAML frontmatter et son cas d'usage recommandé :
          </p>

          {/* Sélecteurs de mode */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedTrigger('always_on')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTrigger === 'always_on' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              1. always_on
            </button>
            <button
              onClick={() => setSelectedTrigger('model_decision')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTrigger === 'model_decision' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              2. model_decision
            </button>
            <button
              onClick={() => setSelectedTrigger('glob')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTrigger === 'glob' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              3. glob
            </button>
            <button
              onClick={() => setSelectedTrigger('manual')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTrigger === 'manual' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              4. manual
            </button>
          </div>

          {/* Détails du mode */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800/90 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Fonctionnement : {curr.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">{curr.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block mb-1">Structure YAML frontmatter attendue :</span>
              <pre className="whitespace-pre-wrap">{curr.yaml}</pre>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-emerald-300">
              💡 <strong>Recommandation : </strong>{curr.usage}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5.11 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 5
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez votre maîtrise de l'organisation des instructions et de leurs déclencheurs (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la fonction principale des instructions permanentes ?",
              options: [
                "Décrire une tâche unique à réaliser immédiatement",
                "Définir le cadre durable, les conventions et les limites du travail de l'agent",
                "Remplacer les comptes rendus de mission",
                "Formater les commits de la journée"
              ],
              correctIndex: 1,
              explanation: "Les instructions permanentes posent les règles durables du projet applicables à toutes les tâches."
            },
            {
              id: 2,
              question: "Parmi les propositions suivantes, laquelle correspond à une instruction ponctuelle ?",
              options: [
                "Respecter les conventions TypeScript du projet",
                "Ne jamais ajouter de base de données externe SQL",
                "Développer la route permettant de récupérer la liste des tâches (GET /api/tasks)",
                "Signaler les tests qui n'ont pas été exécutés"
              ],
              correctIndex: 2,
              explanation: "Développer une route précise est une mission circonscrite dans le temps."
            },
            {
              id: 3,
              question: "Dans Google Antigravity, quel mécanisme permet de sceller des règles durables dans .agents/rules/ ?",
              options: [
                "Rules",
                "Workflows",
                "Missions ponctuelles",
                "Comptes rendus"
              ],
              correctIndex: 0,
              explanation: "Le dossier .agents/rules/ accueille les fichiers de Rules avec frontmatter YAML."
            },
            {
              id: 4,
              question: "Quel mode d'activation (trigger) maintient une Rule active en permanence dans son périmètre ?",
              options: [
                "manual",
                "glob",
                "model_decision",
                "always_on"
              ],
              correctIndex: 3,
              explanation: "always_on injecte systématiquement la règle dans chaque tour d'agent."
            },
            {
              id: 5,
              question: "Quel mode permet à l'agent d'évaluer la pertinence d'une règle spécialisée selon le prompt soumis ?",
              options: [
                "always_on",
                "model_decision",
                "manual",
                "glob"
              ],
              correctIndex: 1,
              explanation: "model_decision active la règle lorsque sa description correspond à la tâche demandée."
            },
            {
              id: 6,
              question: "Quel est le rôle premier d'un Workflow par rapport à une Rule ?",
              options: [
                "Définir une procédure séquentielle réutilisable déclenchée à la demande",
                "Remplacer toutes les règles générales d'architecture",
                "Accorder des droits root sur le système",
                "Créer une nouvelle branche Git"
              ],
              correctIndex: 0,
              explanation: "Un Workflow guide l'exécution pas-à-pas d'une opération complexe (ex: audit, release)."
            },
            {
              id: 7,
              question: "Une mission ponctuelle contredit directement une règle permanente d'AGENTS.md. Que doit faire l'agent ?",
              options: [
                "Ignorer la règle permanente et obéir aveuglément",
                "Exécuter uniquement ce qui lui plaît",
                "Signaler explicitement la contradiction et suspendre l'action pour demander un arbitrage formel",
                "Effacer le fichier AGENTS.md"
              ],
              correctIndex: 2,
              explanation: "L'agent ne doit jamais contourner une règle sans clarification et validation explicite."
            },
            {
              id: 8,
              question: "Où doit-on placer une règle qui concerne exclusivement l'application TaskFlow ?",
              options: [
                "Dans les préférences globales de tous les projets de l'ordinateur",
                "Dans la configuration propre au projet TaskFlow (.agents/rules/ ou AGENTS.md)",
                "Dans un post-it sur le bureau",
                "Dans un commit Git annulé"
              ],
              correctIndex: 1,
              explanation: "L'isolation au niveau projet évite d'imposer les règles de TaskFlow à d'autres projets."
            },
            {
              id: 9,
              question: "Une règle est écrite dans .agents/rules/ mais son frontmatter YAML contient une erreur de syntaxe. Que se passe-t-il ?",
              options: [
                "Elle est forcément active à 100%",
                "Elle risque d'être ignorée par Antigravity : il faut vérifier sa configuration avant de compter sur son application",
                "Elle détruit le projet",
                "Elle est convertie en code source"
              ],
              correctIndex: 1,
              explanation: "Un déclencheur mal formé empêche le chargement de la règle par l'environnement."
            },
            {
              id: 10,
              question: "Une mission ponctuelle demande de 'préparer les modifications pour intégration'. L'agent peut-il pusher sur main ?",
              options: [
                "Oui, car la mission parle d'intégration",
                "Oui, si le build compile",
                "Oui, si tous les tests passent",
                "Non, la préparation n'est pas une autorisation : aucun push sur main n'est permis sans l'accord écrit du PM humain"
              ],
              correctIndex: 3,
              explanation: "Préparer une livraison n'est pas publier. Le push reste soumis à l'autorisation formelle du PM."
            }
          ]}
        />
      </section>
    </div>
  );
};
