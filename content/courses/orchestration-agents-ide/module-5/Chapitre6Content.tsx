'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur de barrière de périmètre et escalade
  const [activeScenario, setActiveScenario] = useState<'backend_crossing' | 'frontend_bug' | 'git_override'>('backend_crossing');

  const scenarios = {
    backend_crossing: {
      title: "1. Tentative d'intervention hors périmètre (Backend &rarr; UI)",
      action: "L'Agent Backend veut modifier directement 'frontend/src/TaskList.tsx' pour afficher le nouveau champ de priorité qu'il vient de créer dans l'API.",
      verdict: "🛑 INTERVENTION BLOQUÉE PAR LA CHARTE",
      ruleApplied: "Règle de Périmètre : L'Agent Backend intervient exclusivement dans backend/. Toute modification de l'interface doit être confiée à l'Agent Frontend.",
      resolution: "L'Agent Backend documente le nouveau champ dans le contrat d'API et émet une demande de mission UI transmise au Team Leader."
    },
    frontend_bug: {
      title: "2. Anomalie API détectée par l'interface (Frontend &rarr; API)",
      action: "L'Agent Frontend constate que la route POST /api/tasks renvoie un format inattendu. Il est tenté d'ouvrir le contrôleur Express pour corriger le code serveur.",
      verdict: "🛑 MODIFICATION DIRECTE INTERDITE",
      ruleApplied: "Règle d'Étanchéité : Un agent ne doit pas modifier la logique métier d'un autre rôle pour contourner une difficulté d'intégration.",
      resolution: "L'Agent Frontend rédige un rapport d'anomalie structuré avec payload et code HTTP observé, puis alerte le Team Leader pour correction par le Backend."
    },
    git_override: {
      title: "3. Tentative de livraison directe sans autorisation (Push main)",
      action: "L'Agent Backend a validé ses tests unitaires et s'apprête à lancer 'git push origin main' pour livrer la fonctionnalité.",
      verdict: "🔒 VERROU GIT SOUVERAIN ACTIF",
      ruleApplied: "Règle Fondamentale : Aucun agent IA n'a la permission d'effectuer de merge ou de push vers la branche protégée main.",
      resolution: "Le push est suspendu. L'agent prépare une Pull Request et transmet son compte rendu au Reviewer et au PM humain pour arbitrage."
    }
  };

  const curr = scenarios[activeScenario];

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
          Chapitre 6 — Définir les responsabilités et les limites des agents
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Pour qu'une équipe multi-agents fonctionne sans frictions, il ne suffit pas de dire à chacun ce qu'il doit faire : il faut lui énoncer avec la même force <strong>ce qu'il ne doit JAMAIS faire</strong>. Définir des frontières strictes empêche les agents de modifier le code de leurs pairs, de casser les contrats partagés ou de s'octroyer des privilèges d'intégration réservés au leadership humain.
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
              1. Distinguer Rôle, Responsabilité et Autorisation
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Le rôle est la fonction générale, la responsabilité est le résultat précis attendu, et l'autorisation est le droit effectif d'exécuter une action.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Ériger des barrières de périmètres étanches
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Limiter les agents Backend à <code>backend/</code> et Frontend à <code>frontend/</code>, et formaliser le protocole pour les fichiers communs.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Sanctuariser les décisions souveraines humaines
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Réserver les choix architecturaux majeurs, l'ajout de dépendances et les opérations Git sensibles (merge, push) au Project Manager.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 6.8 : LA MATRICE DES ACTIVITÉS TASKFLOW
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">
              6.8
            </span>
            Matrice des responsabilités et de gouvernance de TaskFlow
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Qui décide, qui produit, qui audite et qui valide
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 text-slate-900 font-bold">
              <tr>
                <th className="pb-3 pr-4">Activité</th>
                <th className="pb-3 pr-4">Responsable principal</th>
                <th className="pb-3">Autorité de validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Découpage & Assignation des tâches</td>
                <td className="py-2.5 pr-4">Team Leader IA</td>
                <td className="py-2.5">Supervisé par le PM humain</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Conception des contrats d'API</td>
                <td className="py-2.5 pr-4">Agent Architect</td>
                <td className="py-2.5">Team Leader IA & PM humain</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Développement de l'API REST</td>
                <td className="py-2.5 pr-4">Agent Backend</td>
                <td className="py-2.5">Vérifié par QA & Reviewer</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Développement de l'interface UI</td>
                <td className="py-2.5 pr-4">Agent Frontend</td>
                <td className="py-2.5">Vérifié par QA & Reviewer</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Validation des scénarios de test</td>
                <td className="py-2.5 pr-4">Agent QA</td>
                <td className="py-2.5">Team Leader IA</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-indigo-700">Revue de code & audit sécurité</td>
                <td className="py-2.5 pr-4">Agent Reviewer</td>
                <td className="py-2.5">Avis consultatif au PM humain</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-rose-700">Opérations Git sensibles (merge, push)</td>
                <td className="py-2.5 pr-4">Interdit à tous les agents IA</td>
                <td className="py-2.5 font-bold text-rose-700">SOUVERAINETÉ EXCLUSIVE DU PM HUMAIN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SIMULATEUR INTERACTIF DE BARRIÈRE DE PÉRIMÈTRE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur — Gardien de Périmètre et Résolution d'Incidents
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">
              Protocoles d'Escalade
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Testez les trois situations typiques de dépassement de périmètre pour observer la réaction exigée :
          </p>

          {/* Sélecteurs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveScenario('backend_crossing')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeScenario === 'backend_crossing' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              1. Backend voulant éditer l'UI
            </button>
            <button
              onClick={() => setActiveScenario('frontend_bug')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeScenario === 'frontend_bug' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              2. Frontend voulant corriger l'API
            </button>
            <button
              onClick={() => setActiveScenario('git_override')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeScenario === 'git_override' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
              }`}
            >
              3. Tentative de git push sauvage
            </button>
          </div>

          {/* Rendu dynamique */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-xs text-slate-300 space-y-4">
            <div>
              <span className="text-indigo-400 font-bold block mb-1">Scénario : {curr.title}</span>
              <p className="font-sans text-xs text-slate-300">{curr.action}</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-rose-500/40 text-rose-300 font-bold">
              {curr.verdict}
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 font-sans text-xs space-y-1">
              <span className="text-amber-300 font-bold block mb-1">Règle de gouvernance appliquée :</span>
              <div className="text-slate-300">{curr.ruleApplied}</div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/40 font-sans text-xs space-y-1">
              <span className="text-emerald-400 font-bold block mb-1">Comportement attendu & Résolution :</span>
              <div className="text-slate-200">{curr.resolution}</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6.11 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz officiel d'évaluation — Chapitre 6
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Validez votre maîtrise de la répartition des responsabilités et des limites (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle différence distingue un rôle d'une responsabilité ?",
              options: [
                "Le rôle définit la fonction globale de l'agent, tandis que la responsabilité précise les livrables concrets dont il est garant",
                "Le rôle est un fichier et la responsabilité est une conversation",
                "Les deux notions sont rigoureusement identiques",
                "Le rôle ne concerne que le chef de projet"
              ],
              correctIndex: 0,
              explanation: "Rôle = vocation générale (ex: Développeur Backend) ; Responsabilité = activités précises (ex: implémenter la route POST /api/tasks)."
            },
            {
              id: 2,
              question: "Que définit précisément une autorisation pour un agent IA ?",
              options: [
                "La couleur de l'icône dans l'IDE",
                "L'ensemble des actions techniques ou organisationnelles qu'il est habilité à exécuter",
                "Le titre du livre de formation",
                "Le mot de passe de sa session"
              ],
              correctIndex: 1,
              explanation: "Une autorisation habilite l'agent à effectuer une opération sur le système ou le dépôt."
            },
            {
              id: 3,
              question: "Pourquoi est-il primordial de délimiter un périmètre d'intervention physique par dossiers ?",
              options: [
                "Pour empêcher les agents de communiquer entre eux",
                "Pour supprimer définitivement les tests unitaires",
                "Pour éviter les interventions non coordonnées, les réécritures sauvages et les chevauchements de code",
                "Pour masquer les fichiers du projet"
              ],
              correctIndex: 2,
              explanation: "Le confinement à un sous-répertoire protège l'intégrité des autres modules de l'application."
            },
            {
              id: 4,
              question: "L'Agent Backend doit modifier un fichier partagé avec le Frontend (shared/types.ts). Quelle est la démarche réglementaire ?",
              options: [
                "Modifier le fichier en douce sans rien dire",
                "Supprimer le fichier pour éviter tout conflit",
                "Identifier les agents impactés et coordonner la modification via l'Architect et le Team Leader",
                "Exiger que le Frontend s'adapte sans avertissement"
              ],
              correctIndex: 2,
              explanation: "Les contrats partagés imposent une concertation préalable obligatoire."
            },
            {
              id: 5,
              question: "Quelle est la responsabilité exclusive de l'Agent QA ?",
              options: [
                "Coordonner le budget de l'équipe",
                "Vérifier le comportement fonctionnel de l'application, tester les cas limites et documenter les anomalies",
                "Redéfinir seul l'architecture de la base de données",
                "Valider et exécuter les git push sur GitHub"
              ],
              correctIndex: 1,
              explanation: "L'assurance qualité vérifie la conformité par rapport au cahier des charges et rédige les bug reports."
            },
            {
              id: 6,
              question: "Quelle affirmation concernant les consignes écrites et les permissions réelles est exacte ?",
              options: [
                "Une consigne écrite bloque physiquement toute commande au niveau système",
                "Les instructions écrites encadrent le devoir de conduite attendu, tandis que les permissions contrôlent les capacités réelles disponibles",
                "Les permissions n'ont aucune utilité",
                "Seul l'agent Backend a besoin de permissions"
              ],
              correctIndex: 1,
              explanation: "L'instruction pose le cadre moral/organisationnel, la permission applique la barrière technique."
            },
            {
              id: 7,
              question: "L'Agent Frontend constate que l'API renvoie une erreur 500. Que doit-il faire ?",
              options: [
                "Ouvrir le code du serveur Express et le modifier lui-même",
                "Inventer de fausses données en mémoire dans React",
                "Signaler formellement l'anomalie au Team Leader avec les détails du payload pour correction par le Backend",
                "Ignorer l'erreur"
              ],
              correctIndex: 2,
              explanation: "Chaque spécialiste reste dans son périmètre : le Frontend signale l'anomalie sans bidouiller le backend."
            },
            {
              id: 8,
              question: "Quel type de décision doit obligatoirement rester sous le contrôle souverain du Project Manager humain ?",
              options: [
                "Le nom d'une variable locale dans une boucle",
                "L'organisation interne d'une fonction privée",
                "L'ajout d'une assertion dans un test existant",
                "La modification de la stack technique ou l'autorisation de merge/push sur les branches principales"
              ],
              correctIndex: 3,
              explanation: "Les décisions stratégiques et les actes de livraison sont le domaine exclusif du PM humain."
            },
            {
              id: 9,
              question: "Un agent termine sa tâche et ses tests sont tous au vert. Peut-il pousser sur main sans l'accord du PM ?",
              options: [
                "Oui, car son code est vérifié",
                "Non, le push sur une branche protégée requiert toujours l'accord explicite et formel du PM humain",
                "Oui, si le Team Leader est d'accord",
                "Oui, s'il a fait un commit conventionnel"
              ],
              correctIndex: 1,
              explanation: "Le verrou Git s'applique à tous : aucun push sans feu vert écrit du leadership humain."
            },
            {
              id: 10,
              question: "Que doit faire un agent lorsqu'une tâche qui lui est assignée dépasse manifestement son périmètre technique ?",
              options: [
                "Modifier quand même tous les fichiers sans rien dire",
                "Abandonner son travail et s'éteindre",
                "Signaler immédiatement le dépassement de périmètre au Team Leader et demander une clarification d'organisation",
                "Transférer la tâche à un collègue sans avertir personne"
              ],
              correctIndex: 2,
              explanation: "L'escalade vers le Team Leader permet de réattribuer le chantier au spécialiste compétent."
            }
          ]}
        />
      </section>
    </div>
  );
};
