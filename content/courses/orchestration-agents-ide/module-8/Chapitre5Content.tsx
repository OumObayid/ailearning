'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // Simulateur interactif : Banc d'Exécution & Assertions Vitest
  const [selectedTestCase, setSelectedTestCase] = useState<'status_validator' | 'object_matcher' | 'exception_throw' | 'mock_store'>('status_validator');
  const [implementationVariant, setImplementationVariant] = useState<'buggy' | 'fixed'>('buggy');

  const testCases = {
    status_validator: {
      name: 'isValidStatus("done")',
      assertionType: 'expect().toBe(true)',
      description: 'Validation unitaire de la fonction de filtrage des statuts autorisés',
      testCode: `import { describe, it, expect } from 'vitest';
import { isValidStatus } from '../src/utils/statusValidator';

describe('isValidStatus()', () => {
  it('accepte le statut nominal "done"', () => {
    // Arrange
    const input = 'done';
    // Act
    const result = isValidStatus(input);
    // Assert
    expect(result).toBe(true);
  });
});`,
      buggyImpl: `// Implémentation incomplète produite par l'agent :
export function isValidStatus(status: string): boolean {
  // ⚠️ L'agent n'a géré que 'todo' et 'in_progress' !
  return ['todo', 'in_progress'].includes(status);
}`,
      fixedImpl: `// Implémentation corrigée :
export function isValidStatus(status: string): boolean {
  return ['todo', 'in_progress', 'done'].includes(status);
}`,
      buggyResult: {
        status: 'FAIL',
        error: `AssertionError: expected false to be true // toBe()
- Expected: true
+ Received: false
  at tests/statusValidator.test.ts:10:20`
      },
      fixedResult: {
        status: 'PASS',
        output: `✓ tests/statusValidator.test.ts (1 test)
  ✓ isValidStatus() > accepte le statut nominal "done" (2 ms)`
      }
    },
    object_matcher: {
      name: 'createTask() — Structure d\'objet',
      assertionType: 'expect().toEqual(expectedObject)',
      description: 'Comparaison structurelle profonde avec toEqual() vs comparaison d\'identité avec toBe()',
      testCode: `describe('createTask()', () => {
  it('retourne un objet tâche complet avec ses champs par défaut', () => {
    // Arrange
    const title = 'Rédiger tests';
    // Act
    const task = createTask(title);
    // Assert : toEqual compare les propriétés, pas la référence mémoire
    expect(task).toEqual({
      id: expect.any(String),
      title: 'Rédiger tests',
      status: 'todo'
    });
  });
});`,
      buggyImpl: `export function createTask(title: string) {
  // L'agent utilise toBe() dans son test au lieu de toEqual() :
  // expect(task).toBe({ id: '1', title, status: 'todo' }); // ❌ Faux !
  return { id: 'uuid-1', title, status: 'todo' };
}`,
      fixedImpl: `export function createTask(title: string) {
  return { id: 'uuid-1', title, status: 'todo' };
}`,
      buggyResult: {
        status: 'FAIL',
        error: `AssertionError: expected { id: 'uuid-1', ... } to be { id: 'uuid-1', ... }
// toBe compare par référence mémoire (Object.is) : deux instances séparées ne sont jamais égales !
Utilisez toEqual() pour une comparaison structurelle en profondeur.`
      },
      fixedResult: {
        status: 'PASS',
        output: `✓ tests/taskFactory.test.ts (1 test)
  ✓ createTask() > retourne un objet tâche complet avec ses champs par défaut (1 ms)`
      }
    },
    exception_throw: {
      name: 'updateStatus() — Gestion d\'erreur avec toThrow()',
      assertionType: 'expect(() => fn()).toThrow()',
      description: 'Vérification du rejet d\'exception lors d\'un appel invalide',
      testCode: `describe('updateStatus() exceptions', () => {
  it('lève une exception BadRequestError si le statut est vide', () => {
    // Assert : la fonction doit être encapsulée dans une fonction fléchée
    expect(() => {
      updateStatus('task-1', '');
    }).toThrow('Statut requis');
  });
});`,
      buggyImpl: `export function updateStatus(id: string, status: string) {
  // ⚠️ L'agent retourne null silencieusement au lieu de throw !
  if (!status) return null;
  return { id, status };
}`,
      fixedImpl: `export function updateStatus(id: string, status: string) {
  if (!status) {
    throw new Error('Statut requis');
  }
  return { id, status };
}`,
      buggyResult: {
        status: 'FAIL',
        error: `AssertionError: expected [Function] to throw an error, but it did not throw
  at tests/updateStatus.test.ts:5:8`
      },
      fixedResult: {
        status: 'PASS',
        output: `✓ tests/updateStatus.test.ts (1 test)
  ✓ updateStatus() exceptions > lève une exception BadRequestError (3 ms)`
      }
    },
    mock_store: {
      name: 'taskService.setStatus() avec vi.fn()',
      assertionType: 'expect(mockStore.save).toHaveBeenCalledWith()',
      description: 'Isolation d\'une unité avec simulation de dépendance (Mock Vitest)',
      testCode: `import { vi, describe, it, expect } from 'vitest';

describe('taskService avec Mock Store', () => {
  it('met à jour le statut et appelle store.save() une seule fois', async () => {
    // Arrange : simulation du store avec vi.fn()
    const mockSave = vi.fn().mockResolvedValue({ id: '1', status: 'done' });
    const service = new TaskService({ save: mockSave });

    // Act
    await service.setStatus('1', 'done');

    // Assert
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith('1', 'done');
  });
});`,
      buggyImpl: `export class TaskService {
  constructor(private store: any) {}
  async setStatus(id: string, status: string) {
    // ⚠️ L'agent appelle deux fois le store par mégarde !
    await this.store.save(id, status);
    return await this.store.save(id, status);
  }
}`,
      fixedImpl: `export class TaskService {
  constructor(private store: any) {}
  async setStatus(id: string, status: string) {
    return await this.store.save(id, status);
  }
}`,
      buggyResult: {
        status: 'FAIL',
        error: `AssertionError: expected "spy" to be called 1 times, but got 2 times
  at tests/taskService.test.ts:14:24`
      },
      fixedResult: {
        status: 'PASS',
        output: `✓ tests/taskService.test.ts (1 test)
  ✓ taskService avec Mock Store > met à jour le statut et appelle store.save() une seule fois (4 ms)`
      }
    }
  };

  const current = testCases[selectedTestCase];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 5
          </span>
          <span className="text-xs text-muted-foreground">1 h de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Comprendre et exécuter les tests unitaires
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Le test unitaire est la première ligne de défense de la qualité logicielle. Avec Vitest, apprenez à structurer vos tests selon le modèle AAA (Arrange, Act, Assert), à manier les assertions appropriées (<code>toBe</code> vs <code>toEqual</code>), à isoler vos composants grâce aux mocks (<code>vi.fn</code>) et à interpréter avec discernement les taux de couverture de code.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & exécution des tests</p>
        <p className="text-sm leading-relaxed">
          La présence de suites de tests unitaires dans le dépôt ne constitue pas une validation. Un test n'est prouvé que par <strong>son exécution réelle</strong> (<code>npx vitest run</code>) et la production d'un compte-rendu d'assertions sans échec. L'agent ne doit jamais masquer un échec en commentant un test.
        </p>
      </Callout>

      {/* Section 1 : Qu'est-ce qu'un test unitaire et pourquoi Vitest ? */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>5.1 à 5.4 — Le rôle fondamental du test unitaire et Vitest</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Définition & Bénéfices dans une équipe d'agents
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un <strong>test unitaire</strong> valide le comportement d'une brique élémentaire de code (une fonction utilitaire, un validateur, un calcul de règle métier) de manière totalement <strong>isolée</strong> de son environnement externe (pas de serveur HTTP, pas de base de données réelle, pas d'appels réseau).
            </p>
            <div className="grid grid-cols-1 gap-2.5 mt-2">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">1. Rétroaction instantanée (Fast Feedback)</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  S'exécutant en quelques millisecondes, ils permettent à l'agent Backend de savoir immédiatement si son algorithme est fonctionnel sans attendre le déploiement.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">2. Protection contre les régressions</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Lorsqu'un agent retouche un fichier pour ajouter un champ, la suite de tests unitaires garantit qu'aucune règle métier antérieure n'a été cassée.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">3. Pourquoi Vitest ?</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Vitest s'intègre nativement à l'écosystème TypeScript/ESM sans configuration complexe, supporte le mode watch ultra-rapide et propose une API compatible avec Jest (<code>describe</code>, <code>it</code>, <code>expect</code>, <code>vi</code>).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Le pattern Arrange - Act - Assert (AAA) */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>5.5 — Le modèle Arrange, Act, Assert (AAA)</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tout test unitaire professionnel doit suivre ce découpage en 3 temps :
          </p>
          <div className="flex flex-col gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400">1. Arrange (Préparer)</span>
                <span className="text-xs font-bold text-foreground">Mise en place de l'environnement de test</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Définition des variables d'entrée, instanciation des objets et configuration des mocks ou simulations de dépendances.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">2. Act (Agir)</span>
                <span className="text-xs font-bold text-foreground">Exécution de l'action à tester</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Appel direct de la fonction cible avec les paramètres préparés. Une seule action majeure par test.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">3. Assert (Vérifier)</span>
                <span className="text-xs font-bold text-foreground">Contrôle des résultats par assertions</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Comparaison du résultat obtenu avec la valeur attendue via les méthodes <code>expect()</code> de Vitest.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 : Les assertions fondamentales et pièges */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>5.6 — toBe() vs toEqual() : Éviter le piège classique des agents IA</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1.5">
              <span className="font-mono font-bold text-emerald-400">expect(val).toBe(expected)</span>
              <p className="text-muted-foreground">
                Utilise <code>Object.is()</code> pour une <strong>égalité stricte de valeur ou de référence</strong>. Parfait pour les types primitifs (nombres, chaînes, booléens) : <code>expect(status).toBe('done')</code>. En revanche, échouera systématiquement sur deux objets distincts même s'ils ont les mêmes propriétés !
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1.5">
              <span className="font-mono font-bold text-sky-400">expect(obj).toEqual(expected)</span>
              <p className="text-muted-foreground">
                Effectue une <strong>égalité structurelle profonde (deep equality)</strong>. Indispensable pour comparer des objets, tableaux et payloads complexes : <code>expect(task).toEqual(&#123; id: 1, title: 'Test' &#125;)</code>.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1.5">
              <span className="font-mono font-bold text-purple-400">expect(() =&gt; fn()).toThrow()</span>
              <p className="text-muted-foreground">
                Vérifie qu'une fonction lance bien une exception lorsqu'une erreur survient. Attention : la fonction cible doit être enveloppée dans une fonction fléchée, sinon l'exception sera levée avant l'appel à expect !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Atelier Interactif — Banc d'Exécution & Assertions Vitest</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Testez différentes assertions Vitest. Basculez entre l'implémentation buggée produite par l'agent et l'implémentation corrigée pour voir la sortie console exacte de Vitest.
          </p>

          {/* Choix du scénario */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedTestCase('status_validator')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedTestCase === 'status_validator'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              1. Validation d'un statut simple avec toBe()
            </button>

            <button
              onClick={() => setSelectedTestCase('object_matcher')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedTestCase === 'object_matcher'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              2. Comparaison d'objet avec toEqual() vs toBe()
            </button>

            <button
              onClick={() => setSelectedTestCase('exception_throw')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedTestCase === 'exception_throw'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              3. Gestion d'exception avec toThrow()
            </button>

            <button
              onClick={() => setSelectedTestCase('mock_store')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedTestCase === 'mock_store'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              4. Simulation de dépendance avec mock vi.fn()
            </button>
          </div>

          {/* Toggle Buggy vs Fixed */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground font-semibold">État du code sous test :</span>
            <div className="flex gap-2">
              <button
                onClick={() => setImplementationVariant('buggy')}
                className={`px-3 py-1 text-xs rounded font-medium transition-all ${
                  implementationVariant === 'buggy'
                    ? 'bg-rose-500 text-white font-bold'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Code avec bug agent
              </button>
              <button
                onClick={() => setImplementationVariant('fixed')}
                className={`px-3 py-1 text-xs rounded font-medium transition-all ${
                  implementationVariant === 'fixed'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Code corrigé et conforme
              </button>
            </div>
          </div>

          {/* Affichage du test et du code */}
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-lg bg-black/40 border border-border flex flex-col gap-1.5">
              <span className="text-[11px] font-mono text-muted-foreground font-semibold">Fichier de test Vitest :</span>
              <pre className="font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed">
                {current.testCode}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-border flex flex-col gap-1.5">
              <span className="text-[11px] font-mono text-muted-foreground font-semibold">Implémentation exécutée :</span>
              <pre className="font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
                {implementationVariant === 'buggy' ? current.buggyImpl : current.fixedImpl}
              </pre>
            </div>
          </div>

          {/* Terminal Vitest */}
          <div className="p-4 rounded-xl border border-border bg-black/80 font-mono text-xs flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground border-b border-border/40 pb-1.5">
              <span>Résultat Vitest (npx vitest run)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                implementationVariant === 'buggy' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {implementationVariant === 'buggy' ? current.buggyResult.status : current.fixedResult.status}
              </span>
            </div>
            <pre className={`whitespace-pre-wrap leading-relaxed ${
              implementationVariant === 'buggy' ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {implementationVariant === 'buggy' ? current.buggyResult.error : current.fixedResult.output}
            </pre>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>5.18 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 5 : Tests unitaires"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'un test unitaire ?",
              options: [
                "Un test qui vérifie l'ensemble de l'application dans son environnement final.",
                "Un test qui vérifie une unité de code de manière isolée.",
                "Un test qui vérifie uniquement les échanges entre deux serveurs.",
                "Un test qui contrôle les opérations Git."
              ],
              correctIndex: 1,
              explanation: "Un test unitaire valide une unité élémentaire de code de manière isolée sans dépendre de l'infrastructure globale."
            },
            {
              id: 2,
              question: "Quel est l'objectif principal de Vitest ?",
              options: [
                "Gérer les branches Git.",
                "Construire les composants React.",
                "Organiser et exécuter des tests JavaScript et TypeScript.",
                "Héberger l'API Express."
              ],
              correctIndex: 2,
              explanation: "Vitest est un framework moderne conçu pour structurer, exécuter et surveiller les tests en JavaScript et TypeScript."
            },
            {
              id: 3,
              question: "Dans la structure Arrange, Act, Assert, que signifie Assert ?",
              options: [
                "Vérifier que le résultat correspond à ce qui est attendu.",
                "Préparer les données du test.",
                "Exécuter la fonction à tester.",
                "Installer les dépendances."
              ],
              correctIndex: 0,
              explanation: "Assert est l'étape de validation où l'on compare le résultat obtenu à la valeur de référence attendue."
            },
            {
              id: 4,
              question: "Quelle fonction de Vitest permet de vérifier un résultat ?",
              options: [
                "describe",
                "beforeEach",
                "vi.fn",
                "expect"
              ],
              correctIndex: 3,
              explanation: "expect() permet de construire des assertions combinées à des matchers comme toBe() ou toEqual()."
            },
            {
              id: 5,
              question: "Quelle est la différence principale entre toBe() et toEqual() ?",
              options: [
                "toBe() exécute une fonction et toEqual() crée un mock.",
                "toBe() vérifie une égalité stricte et toEqual() compare notamment les structures et valeurs d'objets.",
                "toBe() prépare les données et toEqual() lance Vitest.",
                "Les deux méthodes servent uniquement à vérifier les exceptions."
              ],
              correctIndex: 1,
              explanation: "toBe() teste l'identité stricte (parfait pour les primitifs), tandis que toEqual() teste l'égalité en profondeur des structures d'objets."
            },
            {
              id: 6,
              question: "Quelle commande permet d'exécuter les tests Vitest une seule fois ?",
              options: [
                "git diff",
                "npm run build",
                "npx vitest run",
                "git status"
              ],
              correctIndex: 2,
              explanation: "npx vitest run exécute l'intégralité de la suite une seule fois et rend la main sans laisser de processus actif en écoute."
            },
            {
              id: 7,
              question: "Que signifie un test échoué ?",
              options: [
                "Le projet entier est nécessairement inutilisable.",
                "Le test doit être supprimé.",
                "Le code contient obligatoirement une erreur de programmation.",
                "Le résultat obtenu ne correspond pas à ce que le test attend ou son exécution a rencontré une erreur."
              ],
              correctIndex: 3,
              explanation: "Un échec indique un décalage entre le résultat produit et l'attente du test, ou une exception imprévue survenue lors de l'exécution."
            },
            {
              id: 8,
              question: "À quoi sert un mock dans un test unitaire ?",
              options: [
                "À simuler une fonction ou une dépendance pour contrôler son comportement pendant le test.",
                "À remplacer définitivement le code de production.",
                "À fusionner plusieurs branches Git.",
                "À mesurer automatiquement la qualité de l'architecture."
              ],
              correctIndex: 0,
              explanation: "Un mock permet de substituer une dépendance externe pour isoler l'unité testée et vérifier comment elle interagit avec elle."
            },
            {
              id: 9,
              question: "Que mesure principalement la couverture des tests ?",
              options: [
                "Le nombre de développeurs ayant participé au projet.",
                "La partie du code exécutée pendant les tests.",
                "Le nombre de commits dans Git.",
                "Le nombre de fonctionnalités présentes dans l'application."
              ],
              correctIndex: 1,
              explanation: "La couverture mesure le pourcentage d'instructions, de lignes, de fonctions ou de branches logiques traversées lors de l'exécution des tests."
            },
            {
              id: 10,
              question: "Un rapport indique une couverture de code de 95 %. Quelle conclusion est correcte ?",
              options: [
                "Le logiciel ne contient plus aucune erreur.",
                "Tous les comportements sont correctement vérifiés.",
                "Une grande partie du code a été exécutée pendant les tests, mais la pertinence des assertions doit encore être examinée.",
                "Tous les tests d'intégration et fonctionnels ont réussi."
              ],
              correctIndex: 2,
              explanation: "Une couverture élevée signifie que le code a été parcouru, mais ne prouve pas que les assertions vérifient efficacement la logique métier et les cas limites."
            }
          ]}
        />
      </div>
    </div>
  );
};
