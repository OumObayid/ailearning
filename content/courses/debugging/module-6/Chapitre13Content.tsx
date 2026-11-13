'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface TestCase {
  id: string;
  name: string;
  category: 'unitaire' | 'integration' | 'edge_case';
  prePatchStatus: 'FAIL' | 'PASS';
  postPatchStatus: 'PASS';
  durationMs: number;
  assertion: string;
  failureLog?: string;
}

const TEST_SUITE: TestCase[] = [
  {
    id: 't1',
    name: 'GET /api/users/:id - retourne 200 pour un utilisateur existant',
    category: 'integration',
    prePatchStatus: 'PASS',
    postPatchStatus: 'PASS',
    durationMs: 14,
    assertion: 'expect(res.status).toBe(200)'
  },
  {
    id: 't2',
    name: 'GET /api/users/:id - retourne 404 propre si l\'utilisateur est absent',
    category: 'integration',
    prePatchStatus: 'FAIL',
    postPatchStatus: 'PASS',
    durationMs: 19,
    assertion: 'expect(res.status).toBe(404) & expect(res.body.error).toBeDefined()',
    failureLog: 'Expected: 404, Received: 500 (TypeError: Cannot read properties of undefined reading "email")'
  },
  {
    id: 't3',
    name: 'GET /api/users/:id - rejette les identifiants non numériques avec 400',
    category: 'edge_case',
    prePatchStatus: 'FAIL',
    postPatchStatus: 'PASS',
    durationMs: 8,
    assertion: 'expect(res.status).toBe(400)',
    failureLog: 'Expected: 400, Received: 500 (DatabaseError: invalid input syntax for type integer: "abc")'
  },
  {
    id: 't4',
    name: 'sanitizeUserPayload() - filtre strictement les données sensibles (passwordHash)',
    category: 'unitaire',
    prePatchStatus: 'PASS',
    postPatchStatus: 'PASS',
    durationMs: 3,
    assertion: 'expect(sanitized.passwordHash).toBeUndefined()'
  }
];

export const Chapitre13Content: React.FC = () => {
  const [suiteState, setSuiteState] = useState<'initial' | 'testing_broken' | 'patched' | 'testing_success'>('initial');
  const [activeTab, setActiveTab] = useState<'vitest' | 'supertest'>('vitest');

  const runPrePatchTests = () => {
    setSuiteState('testing_broken');
  };

  const applyPatch = () => {
    setSuiteState('testing_success');
  };

  const resetSuite = () => {
    setSuiteState('initial');
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 6 — Diagnostic assisté par IA & Agents Autonomes • Section 6.13 (Certification Finale)</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Vérifier Automatiquement les Corrections avec des Tests (Vitest & Supertest)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          En ingénierie logicielle d&apos;élite, un bug n&apos;est pas &laquo; corrigé &raquo; parce qu&apos;une IA l&apos;affirme avec aplomb : il est corrigé lorsque son mécanisme de défaillance a été falsifié par un test rouge (Red), puis pérennisé par un test vert (Green). Découvrez comment orchestrer la suite de non-régression automatisée.
        </p>
      </div>

      {/* Section 1: Le Dogme de la Falsification Empirique */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Rigueur Scientifique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Le cycle de falsification Red-Green : le seul juge de paix
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          La complaisance des LLMs les pousse à déclarer triomphalement : <em>&laquo; J&apos;ai corrigé le bug, tout fonctionne parfaitement ! &raquo;</em> sans avoir jamais exécuté la moindre ligne de code. L&apos;ingénieur sérieux impose un cycle de vérification en trois temps rigoureux :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase tracking-wide mb-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-xs">1</span>
                <span>Phase Red (Falsification)</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Prouver le bug avant de toucher au code</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rédiger un test automatisé qui simule le scénario d&apos;erreur. <strong>Ce test DOIT impérativement échouer</strong> sur le code actuel. Si le test passe déjà, il ne teste pas le vrai bug !
              </p>
            </div>
            <div className="mt-4 p-2.5 bg-rose-50 text-rose-900 text-xs font-mono rounded-lg">
              Statut : RED (Échec attendu et documenté)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-wide mb-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">2</span>
                <span>Phase Green (Validation)</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Appliquer le patch chirurgical</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Appliquer le correctif minimaliste validé lors de la revue. Relancer le test ciblé : il doit désormais passer avec succès sans altérer les autres scénarios.
              </p>
            </div>
            <div className="mt-4 p-2.5 bg-emerald-50 text-emerald-900 text-xs font-mono rounded-lg">
              Statut : GREEN (Succès prouvé)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-indigo-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase tracking-wide mb-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">3</span>
                <span>Phase Regression Suite</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Contrôle de non-régression global</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lancer l&apos;intégralité de la suite de tests du projet (<code className="text-xs font-mono">vitest run</code>) et la compilation TypeScript (<code className="text-xs font-mono">tsc --noEmit</code>) pour garantir qu&apos;aucun effet de bord n&apos;a été introduit.
              </p>
            </div>
            <div className="mt-4 p-2.5 bg-indigo-50 text-indigo-900 text-xs font-mono rounded-lg">
              Statut : ZERO REGRESSION
            </div>
          </div>
        </div>

        <Callout type="danger" title="Le piège des tests tautologiques générés par l'IA">
          Méfiez-vous des tests rédigés par un LLM qui mockent excessivement la logique interne. Si l&apos;IA écrit un test où <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">userService.findById</code> est mocké pour retourner directement le résultat attendu sans traverser la logique du contrôleur, le test est une coquille vide qui passera toujours, même avec un contrôleur totalement buggé !
        </Callout>
      </section>

      {/* Section 2: Stack d'outils modernes (Vitest + Supertest) */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Stack Moderne</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. L&apos;attelage d&apos;ingénierie : Vitest pour l&apos;unitaire, Supertest pour l&apos;intégration
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans l&apos;écosystème Node.js / TypeScript contemporain, Vitest et Supertest constituent la combinaison de référence pour vérifier les correctifs :
        </p>

        {/* Onglets de code */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('vitest')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'vitest'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            1. Test Unitaire de Fonction Métier (Vitest)
          </button>
          <button
            onClick={() => setActiveTab('supertest')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'supertest'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            2. Test d&apos;Intégration HTTP Réel (Supertest)
          </button>
        </div>

        {activeTab === 'vitest' ? (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600">
              Test unitaire ultra-rapide vérifiant le comportement de la fonction de filtrage de données utilisateur :
            </p>
            <CodeBlock language="typescript">{`import { describe, it, expect } from 'vitest';
import { sanitizeUserPayload } from '@/services/userService';

describe('userService.sanitizeUserPayload', () => {
  it('supprime formellement passwordHash et token de réinitialisation', () => {
    const rawUser = {
      id: 42,
      email: 'engineer@corp.com',
      passwordHash: 'argon2$hash_secret_string',
      resetToken: 'temp_secret_token',
      role: 'ADMIN'
    };

    const sanitized = sanitizeUserPayload(rawUser);

    expect(sanitized).toEqual({
      id: 42,
      email: 'engineer@corp.com',
      role: 'ADMIN'
    });
    expect((sanitized as Record<string, unknown>).passwordHash).toBeUndefined();
  });
});`}</CodeBlock>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600">
              Test d&apos;intégration simulant une vraie requête HTTP avec validation du code statut 404 :
            </p>
            <CodeBlock language="typescript">{`import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '@/server';

describe('GET /api/users/:id - Scénarios de robustesse', () => {
  it('retourne HTTP 404 lorsque l\\'identifiant n\\'existe pas dans la base', async () => {
    const response = await request(app)
      .get('/api/users/999999')
      .expect('Content-Type', /json/);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'Utilisateur introuvable',
      code: 'USER_NOT_FOUND'
    });
  });

  it('retourne HTTP 400 lorsque l\\'identifiant est invalide (non numérique)', async () => {
    const response = await request(app).get('/api/users/invalide_id');
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Identifiant invalide');
  });
});`}</CodeBlock>
          </div>
        )}
      </section>

      {/* Section 3: Simulateur Interactif Red-Green Runner */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Banc d&apos;Essai Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Exécuter la Suite de Falsification Red-Green en Temps Réel
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Mettez en pratique le protocole de vérification sur une anomalie d&apos;API Express (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">GET /api/users/:id</code> qui plante en 500 sur utilisateur manquant). Lancez la suite pour observer l&apos;échec Red, appliquez le patch d&apos;ingénierie, puis observez la transition vers Green.
        </p>

        {/* Contrôles du runner */}
        <div className="flex flex-wrap items-center gap-3">
          {suiteState === 'initial' && (
            <button
              onClick={runPrePatchTests}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>1. Lancer la suite de tests de reproduction (Red Phase)</span>
            </button>
          )}

          {suiteState === 'testing_broken' && (
            <button
              onClick={applyPatch}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>2. Appliquer le Patch Chirurgical & Valider (Green Phase)</span>
            </button>
          )}

          {suiteState === 'testing_success' && (
            <button
              onClick={resetSuite}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all"
            >
              ↻ Réinitialiser l&apos;atelier
            </button>
          )}
        </div>

        {/* Console de test interactif */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 text-white overflow-hidden shadow-lg">
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs font-mono border-b border-slate-800">
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                suiteState === 'testing_success'
                  ? 'bg-emerald-500'
                  : suiteState === 'testing_broken'
                  ? 'bg-rose-500 animate-pulse'
                  : 'bg-slate-500'
              }`} />
              <span>terminal — vitest run test/api/users.test.ts</span>
            </span>
            <span className="text-slate-400 font-bold">
              {suiteState === 'initial'
                ? 'Prêt à exécuter'
                : suiteState === 'testing_broken'
                ? 'FAIL (2/4 échouent)'
                : 'PASS (4/4 réussis)'}
            </span>
          </div>

          <div className="p-5 font-mono text-xs space-y-3">
            {suiteState === 'initial' && (
              <div className="text-slate-500 italic">
                Cliquez sur &laquo; Lancer la suite de tests de reproduction &raquo; pour démarrer l&apos;exécution Vitest...
              </div>
            )}

            {suiteState !== 'initial' && (
              <div className="space-y-2.5">
                {TEST_SUITE.map((test) => {
                  const isFail = suiteState === 'testing_broken' && test.prePatchStatus === 'FAIL';
                  return (
                    <div
                      key={test.id}
                      className={`p-3 rounded-xl border ${
                        isFail
                          ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                          : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className={`font-black ${isFail ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {isFail ? '❌ FAIL' : ' PASS'}
                          </span>
                          <span className="text-slate-200 font-semibold">{test.name}</span>
                        </span>
                        <span className="text-slate-400 text-[11px]">{test.durationMs}ms</span>
                      </div>

                      {isFail && test.failureLog && (
                        <div className="mt-2 p-2 bg-black/60 rounded text-rose-300 text-[11px]">
                          AssertionError : {test.failureLog}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {suiteState === 'testing_success' && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-900/30 border border-emerald-700/60 text-emerald-300">
                <div className="font-bold text-sm"> Test Suites: 1 passed, 1 total | Tests: 4 passed, 4 total</div>
                <div className="text-xs text-slate-300 mt-1">
                  Snapshots: 0 | Time: 44ms | Compilation: 0 errors (npx tsc --noEmit validé)
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Template de Prompt pour Génération de Tests de Régression */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Standard Opérationnel</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Comment prompter l&apos;IA pour générer un test de reproduction impitoyable
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Utilisez ce modèle de prompt d&apos;ingénierie pour obliger votre agent à créer un test qui vérifie réellement la défaillance sans tricherie de mocks :
        </p>

        <CodeBlock language="markdown">{`Tu es un QA Automation & Reliability Engineer d'élite.
Je viens d'identifier l'anomalie suivante dans mon service :
[DÉCRIRE LE BUG OU COLLER LA STACK TRACE]

Voici le code source du fichier concerné :
[COLLER LE FICHIER CONCERNÉ]

Ta mission :
1. Rédige un test Vitest (ou Supertest si route HTTP) qui reproduit STRICTEMENT ce bug.
2. RÈGLE ABSOLUE : Le test doit échouer avec l'erreur exacte ci-dessus si je l'exécute sur le code actuel.
3. INTERDICTION de mocker la logique interne que nous cherchons à éprouver : utilise les vraies dépendances ou des mocks minimaux stricts.
4. Inclure au moins 2 scénarios limites (edge cases) : paramètre null/invalide et identifiant inexistant.
5. Indique la commande exacte pour exécuter ce test unitairement dans le terminal.`}</CodeBlock>
      </section>

      {/* Section 5: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Épreuve Certifiante</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            5. Quiz de Clôture du Module 6 : Validation Automatisée et Non-Régression
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 6.13 — Tests Automatisés, Falsification et Cycle de Livraison"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il impératif qu'un test de reproduction de bug échoue (RED) avant d'appliquer le correctif ?",
              options: [
                "Pour prouver que le compilateur est bien installé sur la machine.",
                "Pour s'assurer empiriquement que le test cible bel et bien le mécanisme de défaillance réel et non un faux positif ou une assertion triviale toujours vraie.",
                "Pour afficher des couleurs rouges dans le terminal de l'IDE.",
                "Parce que Vitest refuse d'exécuter des tests qui passent du premier coup."
              ],
              correctIndex: 1,
              explanation: "Si le test passe avant même d'avoir touché au code défaillant, il est mal conçu et ne teste pas le bug ! L'échec initial est la preuve que le test détecte le problème."
            },
            {
              id: 2,
              question: "Qu'est-ce qu'un 'test tautologique' fréquemment produit par un LLM lorsqu'on lui demande de tester un correctif ?",
              options: [
                "Un test rédigé en langage binaire 0 et 1.",
                "Un test qui mocke tellement l'environnement et les valeurs de retour qu'il valide ses propres mocks sans jamais traverser ni éprouver la logique réelle du code.",
                "Un test qui prend plus de 10 minutes à s'exécuter.",
                "Un test qui vérifie l'orthographe des noms d'auteurs."
              ],
              correctIndex: 1,
              explanation: "Un test tautologique donne une fausse illusion de sécurité : il teste la structure du mock lui-même et réussira toujours, même si le code de production sous-jacent est complètement cassé."
            },
            {
              id: 3,
              question: "Quelle est la responsabilité essentielle de Supertest dans le débogage d'une API Node.js / Express ?",
              options: [
                "Remplacer la base de données SQL par un fichier Excel.",
                "Envoyer de vraies requêtes HTTP virtuelles sur l'application Express pour tester le statut HTTP, les en-têtes et le corps de réponse JSON sans avoir besoin de déployer un serveur physique.",
                "Chiffrer le disque dur du serveur en AES-256.",
                "Créer des maquettes graphiques pour les designers."
              ],
              correctIndex: 1,
              explanation: "Supertest permet de tester le cycle de requête/réponse HTTP complet (middlewares, parsing JSON, gestion des statuts 404/400/500) en mémoire de façon déterministe et ultra-rapide."
            },
            {
              id: 4,
              question: "Après qu'un test ciblé soit passé avec succès au vert (Green), quelle étape est indispensable avant de commiter ?",
              options: [
                "Éteindre l'ordinateur et le rallumer.",
                "Exécuter l'intégralité de la suite de tests de régression du projet et vérifier la compilation stricte TypeScript (npx tsc --noEmit).",
                "Supprimer tous les tests pour alléger le dépôt Git.",
                "Envoyer un message de remerciement au modèle d'IA."
              ],
              correctIndex: 1,
              explanation: "Un patch peut réparer le bug ciblé tout en cassant silencieusement un autre service. La suite de régression globale et la vérification TypeScript garantissent l'absence d'effets de bord."
            },
            {
              id: 5,
              question: "Dans le cadre d'un pipeline CI/CD (GitHub Actions / GitLab CI), quel rôle jouent les tests de non-régression ajoutés lors des résolutions de bugs ?",
              options: [
                "Ralentir le déploiement pour permettre aux développeurs de se reposer.",
                "Agir comme une mémoire infaillible du système : ils s'exécutent à chaque pull request pour empêcher mathématiquement tout retour futur d'un bug déjà résolu.",
                "Archiver le code sur des bandes magnétiques.",
                "Générer automatiquement des factures pour les clients."
              ],
              correctIndex: 1,
              explanation: "Chaque test de non-régression enrichit le patrimoine de tests du projet, sanctuarisant la base de code contre toute résurgence future de la même anomalie."
            },
            {
              id: 6,
              question: "Quelle est la définition de la réussite pour le Module 6 (Diagnostic assisté par IA) ?",
              options: [
                "Avoir fait confiance aveuglément à la première réponse de ChatGPT.",
                "Savoir piloter l'IA comme un copilote d'investigation sous contrôle strict : analyser les logs sans corriger à la hâte, déceler les hallucinations, encadrer les permissions, auditer le git diff et prouver la correction par des tests automatisés.",
                "Avoir désactivé TypeScript pour coder plus vite.",
                "Avoir remplacé tous les ingénieurs de l'équipe par un unique script bash."
              ],
              correctIndex: 1,
              explanation: "L'ingénieur augmenté par l'IA maîtrise la boucle d'investigation, garde un esprit critique intransigeant (Zero Trust AI) et s'appuie sur des vérifications déterministes (tests, typage, diffs) pour livrer du code fiable en production."
            }
          ]}
        />
      </section>
    </div>
  );
};
