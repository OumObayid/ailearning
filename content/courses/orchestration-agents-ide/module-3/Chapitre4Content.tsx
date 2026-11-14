'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  // Simulateur interactif d'ordonnancement des branches et dépendances
  const [isContractReady, setIsContractReady] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'backend' | 'frontend' | 'qa' | 'pr'>('backend');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800 border border-indigo-300">
            Module 3 — Maîtrise de Git pour le multi-agents
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-600" />
            Temps de lecture estimé : 25 min
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Chapitre 4 — Organiser les branches d'une équipe
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Dans un projet individuel, le développeur est libre de nommer et créer ses branches à sa guise. Dans une équipe composée de plusieurs agents IA et d'humains, cette anarchie mène rapidement au chaos. Une <strong>stratégie de branches rigoureuse</strong> permet d'attribuer chaque mission à une branche éphémère, d'anticiper les dépendances et de verrouiller l'intégration sur la branche principale.
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
              1. Structurer une convention de nommage claire
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standardiser les préfixes de branches (<code>feature/</code>, <code>fix/</code>, <code>test/</code>, <code>docs/</code>) pour identifier immédiatement la nature de chaque tâche.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              2. Associer les branches aux missions (et non aux agents)
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprendre pourquoi une branche est dédiée à un livrable fonctionnel précis et non à un agent permanent (qui peut réaliser plusieurs missions successives).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              3. Maîtriser les dépendances et le sas de contrôle PM
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organiser le passage de relais (contrat d'API &rarr; UI &rarr; tests QA) et sanctuariser la branche <code>main</code> sous l'autorité souveraine du PM humain.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4.4 & 4.5 : CONVENTION DE NOMMAGE ET BRANCHES PAR MISSION
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 1 </span>
            Règles de nommage et branches par mission
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Des intitulés explicites pour naviguer sans ambiguïté dans l'arbre Git
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Une bonne convention de nommage permet à n'importe quel membre de l'équipe (ou agent de revue) de comprendre instantanément l'objectif d'une branche sans avoir à ouvrir le code :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 text-slate-900 font-bold">
                <tr>
                  <th className="pb-3 pr-4">Préfixe</th>
                  <th className="pb-3 pr-4">Usage</th>
                  <th className="pb-3">Exemple TaskFlow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-bold text-indigo-700">feature/</td>
                  <td className="py-2.5 pr-4">Nouvelle fonctionnalité technique ou produit</td>
                  <td className="py-2.5 font-mono text-xs">feature/task-creation-api</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-bold text-rose-700">fix/</td>
                  <td className="py-2.5 pr-4">Correction d'une anomalie ou d'un bug</td>
                  <td className="py-2.5 font-mono text-xs">fix/task-display-error</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-bold text-purple-700">test/</td>
                  <td className="py-2.5 pr-4">Ajout ou mise à jour de la suite de tests</td>
                  <td className="py-2.5 font-mono text-xs">test/task-api-integration</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-bold text-amber-700">docs/</td>
                  <td className="py-2.5 pr-4">Documentation technique ou d'architecture</td>
                  <td className="py-2.5 font-mono text-xs">docs/api-routes-spec</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-bold text-slate-700">refactor/</td>
                  <td className="py-2.5 pr-4">Nettoyage de code sans impact fonctionnel</td>
                  <td className="py-2.5 font-mono text-xs">refactor/task-service-map</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Règle d'or : Une branche par mission, pas par agent
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ne nommez jamais une branche <code>agent-backend</code> ou <code>jean-work</code>. L'Agent Backend peut réaliser trois missions successives au cours du sprint (création d'API, filtrage, suppression). Chaque mission possède sa propre branche éphémère qui est supprimée après validation et fusion.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4.7 & 4.10 : SIMULATEUR D'ORDONNANCEMENT ET SAS DE CONTRÔLE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold"> 2 </span>
            Gérer les dépendances entre branches et organiser le contrôle
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Comment coordonner le développement parallèle sans bloquer les agents
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Toutes les missions ne peuvent pas démarrer simultanément à l'aveugle. Si l'Agent Frontend démarre l'intégration UI du formulaire sans connaître le format exact des données envoyées par l'API, son code sera obligatoirement à réécrire. L'ordonnancement par contrat résout ce problème :
        </p>

        {/* WORKBENCH INTERACTIF D'ORDONNANCEMENT */}
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-indigo-100">
                Simulateur — Workflow Collaboratif TaskFlow
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-3 py-1 rounded-full font-bold border ${isContractReady
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-amber-950 text-amber-300 border-amber-700'
                }`}>
                {isContractReady ? "✓ Contrat d'API validé" : "⏳ En attente du contrat"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-indigo-300 block mb-1">
                Jalon Clé : Contrat d'Interface TypeScript (POST /api/tasks)
              </span>
              <p className="text-xs text-slate-300">
                L'Architecte ou le Backend doit publier les types partagés avant que le Frontend ne puisse finaliser ses formulaires.
              </p>
            </div>
            <button
              onClick={() => setIsContractReady(!isContractReady)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
            >
              {isContractReady ? "Révoquer le contrat (Simuler retard)" : "Publier le contrat d'API"}
            </button>
          </div>

          {/* Onglets de navigation dans le sprint */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'backend' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              1. feature/task-creation-api
            </button>
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'frontend' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              2. feature/task-creation-ui
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'qa' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              3. test/task-creation-api
            </button>
            <button
              onClick={() => setActiveTab('pr')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'pr' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
            >
              4. Pull Request & Cadenas PM
            </button>
          </div>

          {/* Contenu de l'onglet actif */}
          <div className="rounded-2xl border border-slate-700 bg-slate-800/90 p-5 space-y-3">
            {activeTab === 'backend' && (
              <>
                <h4 className="text-base font-bold text-white">Branche Backend : feature/task-creation-api</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  L'Agent Backend développe la route Express, le contrôleur et la persistance en mémoire. Il exporte les types TypeScript partagés dans <code>types/task.ts</code>.
                </p>
                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300">
                  Status : Travail autonome, 0 dépendance bloquante.
                </div>
              </>
            )}

            {activeTab === 'frontend' && (
              <>
                <h4 className="text-base font-bold text-white">Branche Frontend : feature/task-creation-ui</h4>
                {isContractReady ? (
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-emerald-300 font-semibold">
                      ✓ Contrat disponible ! L'Agent Frontend développe le formulaire React avec auto-complétion et validation Zod calquée sur le backend.
                    </p>
                    <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300">
                      Branche prête pour audit QA et revue de code.
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-200 text-xs sm:text-sm space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <Icon name="alert-triangle" className="w-4 h-4 text-amber-400" />
                      Mission bloquée en attente de dépendance
                    </div>
                    <p>
                      L'Agent Frontend ne doit pas inventer sa propre structure de données ! Il reste au statut <em>En attente</em> jusqu'à publication du contrat d'API.
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'qa' && (
              <>
                <h4 className="text-base font-bold text-white">Branche QA : test/task-creation-api</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  L'Agent QA conçoit la suite de tests Supertest pour valider les codes HTTP (201 Created, 400 Bad Request en cas de titre manquant).
                </p>
                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-purple-300">
                  Critères d'acceptation vérifiés : validation des cas nominaux et d'erreur.
                </div>
              </>
            )}

            {activeTab === 'pr' && (
              <>
                <h4 className="text-base font-bold text-white">Sas d'Audit et Verrouillage PM</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Une Pull Request est ouverte. L'Agent Reviewer audite le code et le QA valide les tests.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/40 text-xs text-rose-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-white">
                    <Icon name="lock" className="w-4 h-4 text-rose-400" />
                    Verrou Git Actif sur main :
                  </div>
                  <div>Aucune fusion n'est permise sans la signature explicite du Project Manager humain.</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4.14 : QUIZ OFFICIEL (10 QUESTIONS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icon name="help-circle" className="w-6 h-6 text-indigo-600" />
            Quiz d'évaluation — Chapitre 4
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Testez votre compréhension de l'organisation des branches d'une équipe (10 questions)
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi une équipe multi-agents doit-elle impérativement définir une stratégie de branches ?",
              options: [
                "Pour supprimer le besoin de faire des tests automatisés",
                "Pour organiser les contributions, éviter les collisions de fichiers et faciliter le contrôle des modifications",
                "Pour empêcher les agents de travailler en parallèle",
                "Pour remplacer complètement le dépôt Git local"
              ],
              correctIndex: 1,
              explanation: "Une stratégie de branches fixe des règles communes pour que chaque mission soit clairement tracée et contrôlée avant d'être intégrée."
            },
            {
              id: 2,
              question: "Quel est le rôle de la branche main dans l'organisation de TaskFlow ?",
              options: [
                "Servir de zone d'expérimentation ouverte à tous les agents",
                "Servir de branche principale protégée et de base commune stable au projet",
                "Remplacer toutes les branches de missions",
                "Exécuter automatiquement les tests à chaque frappe de clavier"
              ],
              correctIndex: 1,
              explanation: "Dans notre organisation, main représente la base commune maîtrisée. Aucun agent n'y commite directement sans autorisation."
            },
            {
              id: 3,
              question: "Quel nom de branche respecte le mieux les conventions de nommage pour l'API de création des tâches ?",
              options: [
                "test2",
                "agent-backend",
                "feature/task-creation-api",
                "nouvelle-branche"
              ],
              correctIndex: 2,
              explanation: "feature/task-creation-api indique explicitement la nature du travail (feature) et l'objectif fonctionnel précis."
            },
            {
              id: 4,
              question: "Une branche Git doit-elle obligatoirement être attachée de manière permanente à un agent particulier ?",
              options: [
                "Oui, chaque agent possède une seule et unique branche à vie",
                "Non, une branche est associée à une mission éphémère, et un même agent peut réaliser plusieurs missions successives",
                "Oui, Git impose cette restriction stricte",
                "Non, les branches ne peuvent être associées qu'au Project Manager"
              ],
              correctIndex: 1,
              explanation: "Les branches représentent des missions fonctionnelles. Une fois la mission terminée et fusionnée, la branche est archivée ou supprimée."
            },
            {
              id: 5,
              question: "Deux agents travaillent sur des branches distinctes mais modifient le même fichier partagé. Quel risque apparaît ?",
              options: [
                "Aucun risque, les branches empêchent mathématiquement les conflits",
                "Git fusionne automatiquement sans aucun risque d'erreur",
                "Des conflits de fusion ou des incompatibilités sémantiques peuvent surgir lors de l'intégration",
                "Git efface automatiquement le code du dernier commit"
              ],
              correctIndex: 2,
              explanation: "Travailler sur deux branches n'empêche pas les conflits si les agents modifient les mêmes lignes de code."
            },
            {
              id: 6,
              question: "Pourquoi est-il crucial d'identifier les dépendances entre les missions avant de distribuer les tâches ?",
              options: [
                "Pour savoir quelles missions peuvent avancer en parallèle et quelles spécifications (contrat d'API) doivent être livrées en premier",
                "Pour supprimer immédiatement les branches inutiles",
                "Pour éviter d'avoir à créer des commits",
                "Pour dispenser le PM de surveiller le projet"
              ],
              correctIndex: 0,
              explanation: "Identifier les dépendances évite qu'un agent Frontend ne code une interface sur des suppositions erronées d'API."
            },
            {
              id: 7,
              question: "Quel est le rôle d'une demande de fusion (Pull Request ou Merge Request) ?",
              options: [
                "Supprimer automatiquement une branche distante",
                "Présenter les modifications proposées pour examen et audit de code avant leur intégration",
                "Garantir qu'un code ne contient aucun bug",
                "Remplacer l'exécution des tests unitaires"
              ],
              correctIndex: 1,
              explanation: "La Pull Request est le sas d'audit où le Reviewer et le QA vérifient la conformité avant la décision d'intégration."
            },
            {
              id: 8,
              question: "Qui détient le pouvoir exclusif d'autoriser la fusion d'une branche dans main dans notre organisation ?",
              options: [
                "L'Agent Backend",
                "L'Agent Reviewer",
                "Le Project Manager humain",
                "Le compilateur TypeScript"
              ],
              correctIndex: 2,
              explanation: "Le PM humain est souverain. Les agents peuvent préparer et recommander, mais seul l'humain valide la livraison définitive."
            },
            {
              id: 9,
              question: "Peut-on supprimer une branche de mission dès qu'elle n'est plus active ?",
              options: [
                "Oui, sans aucune vérification préalable",
                "Non, il faut d'abord s'assurer que ses commits utiles ont bien été fusionnés et archivés",
                "Oui, même si elle contient l'unique exemplaire de certains commits critiques",
                "Non, Git interdit toute suppression de branche"
              ],
              correctIndex: 1,
              explanation: "Avant de supprimer une branche avec 'git branch -d', on s'assure que son travail a été intégré dans la branche principale."
            },
            {
              id: 10,
              question: "Quelle affirmation est rigoureusement exacte ?",
              options: [
                "Une stratégie de branches élimine à 100% tous les conflits possibles",
                "Le Team Leader IA peut fusionner sur main sans avertir le PM",
                "Une branche par mission facilite le suivi mais ne remplace ni la coordination technique ni le contrôle humain",
                "Toutes les missions doivent obligatoirement être développées en même temps"
              ],
              correctIndex: 2,
              explanation: "Les branches organisent les flux de code, mais ne remplacent pas la coordination fonctionnelle et le contrôle de qualité."
            }
          ]}
        />
      </section>
    </div>
  );
};
