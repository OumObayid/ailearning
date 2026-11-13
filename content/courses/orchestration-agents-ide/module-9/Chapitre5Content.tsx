'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif : Campagne de Tests Post-Intégration & Non-Régression
  const [testFilter, setTestFilter] = useState<'all' | 'unit' | 'integration' | 'regression'>('all');

  const testResults = [
    {
      id: 'T-UNIT-01',
      type: 'unit',
      name: 'TaskService.filterByStatus()',
      command: 'npx vitest run tests/unit/filter.test.ts',
      status: 'PASS',
      duration: '4 ms',
      details: 'Vérifie l\'isolation de la fonction de filtrage par statut (todo, in_progress, done).'
    },
    {
      id: 'T-INT-02',
      type: 'integration',
      name: 'Supertest : PATCH /api/tasks/:id/status (Nominal)',
      command: 'npx vitest run tests/integration/statusPatch.test.ts',
      status: 'PASS',
      duration: '42 ms',
      details: 'Vérifie la traversée Route &rarr; Contrôleur &rarr; Service &rarr; Store avec réponse HTTP 200.'
    },
    {
      id: 'T-INT-03',
      type: 'integration',
      name: 'Supertest : PATCH /api/tasks/:id/status (Invalide)',
      command: 'npx vitest run tests/integration/statusValidation.test.ts',
      status: 'PASS',
      duration: '38 ms',
      details: 'Rejette les statuts inconnus avec HTTP 400 Bad Request et message explicite.'
    },
    {
      id: 'T-REG-04',
      type: 'regression',
      name: 'Non-Régression : POST /api/tasks (Création de tâche)',
      command: 'npx vitest run tests/regression/taskCreation.test.ts',
      status: 'PASS',
      duration: '29 ms',
      details: 'Confirme que l\'ajout du statut n\'a pas altéré la création initiale d\'une tâche avec HTTP 201.'
    },
    {
      id: 'T-REG-05',
      type: 'regression',
      name: 'Non-Régression : DELETE /api/tasks/:id (Suppression)',
      command: 'npx vitest run tests/regression/taskDeletion.test.ts',
      status: 'PASS',
      duration: '31 ms',
      details: 'Confirme que la suppression fonctionne toujours avec HTTP 204 et actualisation des compteurs.'
    }
  ];

  const filteredTests = testFilter === 'all' ? testResults : testResults.filter(t => t.type === testFilter);

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 5
          </span>
          <span className="text-xs text-muted-foreground">1 h de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Exécuter les tests après intégration
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          La fusion terminée ne garantit pas la santé du projet assemblé. Découvrez comment concevoir et lancer une campagne de tests post-intégration : tests unitaires, tests de traversée Express/Supertest, tests d'API et suites exhaustives de non-régression pour s'assurer que les acquis applicatifs sont préservés.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & preuve d'exécution</p>
        <p className="text-sm leading-relaxed">
          Après toute opération d'intégration, <strong>l'ensemble de la suite de tests automatisés doit être réexécuté</strong>. Aucun livrable ne peut être déclaré validé si le rapport ne présente pas les logs réels d'exécution issus de <code>npx vitest run</code>. Un test non exécuté ne doit jamais être présenté comme réussi.
        </p>
      </Callout>

      {/* Section 1 : Pourquoi tester après intégration ? */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.5.1 & 9.5.2 — Les 5 niveaux de tests de la campagne post-intégration</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Comprendre la pyramide de validation après fusion
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Une fois les branches réunies sur <code>develop</code>, la campagne de tests doit couvrir la totalité des couches applicatives :
            </p>
            <div className="grid grid-cols-1 gap-2.5 mt-2 text-xs">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
                <span className="font-bold text-blue-400">1. Tests Unitaires :</span>
                <p className="text-muted-foreground">Vérifient chaque fonction, validateur ou utilitaire de manière isolée sans réseau.</p>
              </div>

              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex flex-col gap-1">
                <span className="font-bold text-indigo-400">2. Tests d'Intégration (Express + Supertest) :</span>
                <p className="text-muted-foreground">Contrôlent la traversée réelle entre les routes HTTP, les middlewares et la mémoire.</p>
              </div>

              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
                <span className="font-bold text-purple-400">3. Tests de Contrat d'API :</span>
                <p className="text-muted-foreground">Valident la conformité stricte des statuts HTTP (200, 201, 204, 400, 404) et des schémas JSON.</p>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col gap-1">
                <span className="font-bold text-amber-400">4. Tests de Non-Régression :</span>
                <p className="text-muted-foreground">Garantissent que les fonctionnalités développées antérieurement (création, consultation, suppression) fonctionnent toujours.</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
                <span className="font-bold text-emerald-400">5. Scénario Fonctionnel Complet (End-to-End) :</span>
                <p className="text-muted-foreground">Simule le cycle de vie utilisateur complet : Créer &rarr; Afficher &rarr; Modifier statut &rarr; Contrôler compteur &rarr; Supprimer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Organisation de la campagne et exécution */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.5.4 & 9.5.5 — Commandes d'exécution et analyse des échecs</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-indigo-400">npx vitest run</code>
              <span className="text-[10px] text-muted-foreground">Exécution unique (CI ready)</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Exécute l'ensemble des suites sans laisser de processus d'écoute actif. C'est la commande standard à invoquer dans les pipelines d'intégration.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-foreground">Démarche d'analyse en cas d'échec post-intégration :</span>
            <ul className="list-disc list-inside space-y-0.5 text-xs text-muted-foreground ml-2">
              <li><strong>Étape 1 :</strong> Isoler le test échoué et le composant concerné.</li>
              <li><strong>Étape 2 :</strong> Identifier s'il s'agit d'une régression causée par la fusion ou d'un défaut préexistant.</li>
              <li><strong>Étape 3 :</strong> Formuler un prompt de correction chirurgical et confiné à l'agent responsable.</li>
              <li><strong>Étape 4 :</strong> Relancer le test ciblé ET l'intégralité de la suite pour certifier l'absence d'effet de bord.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Atelier Interactif — Console d'Exécution & Non-Régression</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Consultez les résultats de la campagne de tests exécutée sur la version commune de TaskFlow après l'intégration du changement de statut. Filtrez par niveau de test.
          </p>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setTestFilter('all')}
              className={`py-1.5 px-3 rounded font-semibold transition-all ${
                testFilter === 'all' ? 'bg-indigo-600 text-white shadow' : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Tous les tests (5)
            </button>
            <button
              onClick={() => setTestFilter('unit')}
              className={`py-1.5 px-3 rounded font-semibold transition-all ${
                testFilter === 'unit' ? 'bg-indigo-600 text-white shadow' : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Unitaires (1)
            </button>
            <button
              onClick={() => setTestFilter('integration')}
              className={`py-1.5 px-3 rounded font-semibold transition-all ${
                testFilter === 'integration' ? 'bg-indigo-600 text-white shadow' : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Intégration API (2)
            </button>
            <button
              onClick={() => setTestFilter('regression')}
              className={`py-1.5 px-3 rounded font-semibold transition-all ${
                testFilter === 'regression' ? 'bg-indigo-600 text-white shadow' : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Non-Régression (2)
            </button>
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            {filteredTests.map((test) => (
              <div key={test.id} className="p-3.5 rounded-lg border border-border bg-card flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-foreground">{test.id}</span>
                    <span className="font-semibold text-foreground">{test.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[10px] text-muted-foreground">{test.duration}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {test.status}
                    </span>
                  </div>
                </div>

                <code className="text-[11px] font-mono text-sky-400 bg-black/30 p-1.5 rounded">{test.command}</code>
                <p className="text-muted-foreground text-[11px]">{test.details}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-400">Bilan de la campagne post-intégration :</span>
            <span className="font-mono text-emerald-300 font-semibold">5 passés, 0 échec, 0 régression</span>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>9.5.12 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 5 : Tests après intégration"
          questions={[
            {
              id: 1,
              question: "Pourquoi faut-il relancer des tests après l'intégration de plusieurs contributions ?",
              options: [
                "Pour supprimer les tests réalisés par les agents.",
                "Pour vérifier que les contributions fonctionnent correctement ensemble.",
                "Pour remplacer la revue de code.",
                "Pour garantir automatiquement l'absence de tout défaut."
              ],
              correctIndex: 1,
              explanation: "Des briques fonctionnant parfaitement en isolation peuvent entrer en collision lors de leur assemblage dans le projet commun."
            },
            {
              id: 2,
              question: "Quel type de test vérifie principalement le comportement d'une fonction isolée ?",
              options: [
                "Test fonctionnel.",
                "Test de non-régression.",
                "Test unitaire.",
                "Test de déploiement."
              ],
              correctIndex: 2,
              explanation: "Le test unitaire valide une unité de code élémentaire (fonction, classe, service) isolée de tout environnement externe."
            },
            {
              id: 3,
              question: "Quel est l'objectif principal d'un test d'intégration ?",
              options: [
                "Vérifier les interactions entre plusieurs éléments du système.",
                "Vérifier uniquement la présentation visuelle de l'application.",
                "Mesurer le temps de développement d'un agent.",
                "Remplacer tous les tests unitaires."
              ],
              correctIndex: 0,
              explanation: "Le test d'intégration contrôle la chaîne de collaboration entre plusieurs briques réelles (ex: route, middleware, contrôleur, stockage)."
            },
            {
              id: 4,
              question: "À quoi servent les tests de non-régression ?",
              options: [
                "À vérifier uniquement les nouvelles fonctionnalités.",
                "À supprimer les fonctionnalités qui ne sont plus utilisées.",
                "À vérifier le nombre de commits après une fusion.",
                "À s'assurer que les fonctionnalités existantes continuent de fonctionner après les modifications."
              ],
              correctIndex: 3,
              explanation: "Les tests de non-régression vérifient qu'aucun effet de bord n'a détérioré les fonctionnalités précédemment développées."
            },
            {
              id: 5,
              question: "Quelle commande lance Vitest en exécution unique ?",
              options: [
                "npm run build",
                "npx vitest run",
                "git status",
                "npm install"
              ],
              correctIndex: 1,
              explanation: "npx vitest run exécute l'ensemble de la suite une seule fois et termine le processus sans rester en mode écoute."
            },
            {
              id: 6,
              question: "Quel est le rôle de Supertest dans TaskFlow ?",
              options: [
                "Créer automatiquement les composants React.",
                "Gérer les branches Git.",
                "Envoyer des requêtes HTTP à l'application pour tester les API.",
                "Remplacer TypeScript par JavaScript."
              ],
              correctIndex: 2,
              explanation: "Supertest permet de simuler des requêtes HTTP complètes contre une application Express sans ouvrir de socket TCP réel."
            },
            {
              id: 7,
              question: "Un test API échoue après intégration. Quelle démarche est la plus appropriée ?",
              options: [
                "Identifier le test, analyser le message d'erreur, rechercher la cause et organiser une correction.",
                "Supprimer immédiatement le test.",
                "Considérer que l'API est correcte puisque le Backend avait terminé sa mission.",
                "Fusionner une nouvelle branche sans examiner l'anomalie."
              ],
              correctIndex: 0,
              explanation: "Tout échec doit être diagnostiqué méthodiquement à la racine pour attribuer une reprise ciblée à l'agent responsable."
            },
            {
              id: 8,
              question: "Quelles vérifications peuvent faire partie d'une campagne de tests après intégration ?",
              options: [
                "Les tests unitaires, d'intégration, de non-régression et fonctionnels.",
                "Uniquement l'examen du README.",
                "Uniquement la compilation du frontend.",
                "La suppression des logs d'erreurs."
              ],
              correctIndex: 0,
              explanation: "Une campagne complète combine tous ces niveaux pour garantir la robustesse technique et l'exactitude métier."
            },
            {
              id: 9,
              question: "Si tous les tests unitaires du Backend et du Frontend réussissent séparément, cela garantit que les deux composants fonctionnent correctement ensemble après intégration.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : des tests unitaires isolés ne prouvent pas l'alignement des routes, des méthodes HTTP et des formats JSON lors des échanges réels."
            },
            {
              id: 10,
              question: "Après une correction, il faut relancer les tests concernés afin de vérifier que le problème est résolu et que la modification n'a pas introduit une nouvelle anomalie.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : le re-test ciblé valide la correction du bug et la suite globale protège contre l'apparition de nouveaux effets de bord."
            }
          ]}
        />
      </div>
    </div>
  );
};
