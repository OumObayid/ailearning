'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface ExecutionMetric {
  suiteName: string;
  type: 'Unitaire (Vitest)' | 'Intégration (Supertest)';
  passed: number;
  failed: number;
  executionTimeMs: number;
  coveragePercent: number;
  testFile: string;
}

const TEST_METRICS: Record<'unit' | 'integration', ExecutionMetric> = {
  unit: {
    suiteName: 'Services Métier Purs & Calculateur de Taxe',
    type: 'Unitaire (Vitest)',
    passed: 12,
    failed: 0,
    executionTimeMs: 18,
    coveragePercent: 96.4,
    testFile: 'test/unit/taxCalculator.test.ts'
  },
  integration: {
    suiteName: 'Cycle HTTP Express & Contrôle d\'Accès IDOR',
    type: 'Intégration (Supertest)',
    passed: 8,
    failed: 0,
    executionTimeMs: 142,
    coveragePercent: 91.8,
    testFile: 'test/integration/orderAuthorization.test.ts'
  }
};

export const Chapitre8Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'unit' | 'integration'>('unit');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedRun, setCompletedRun] = useState<boolean>(false);

  const handleRun = () => {
    setIsRunning(true);
    setCompletedRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setCompletedRun(true);
    }, 400);
  };

  const metric = TEST_METRICS[activeTab];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.8</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Automatisation des Tests Unitaires (Vitest) et d&apos;Intégration (Supertest)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Un correctif sans tests automatisés est une bombe à retardement. Découvrez comment architecturer l&apos;attelage d&apos;homologation du projet Capstone : <strong>Vitest</strong> pour éprouver les fonctions pures en millisecondes, et <strong>Supertest</strong> pour valider les middlewares d&apos;authentification et les codes HTTP de bout en bout.
        </p>
      </div>

      {/* Section 1: La Pyramide de Test Appliquée au Débogage */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Architecture de Test</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Complémentarité des Tests Unitaires et d&apos;Intégration
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Chaque typologie de test remplit une mission chirurgicale distincte dans la validation d&apos;un patch d&apos;ingénierie :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Vitest</span>
                <span className="text-xs font-mono text-emerald-700 font-bold">&lt; 5 ms / test</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Tests Unitaires (Fonctions Pures & Calculs)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                Éprouvent une fonction isolée de toute base de données ou réseau. Idéal pour tester les algorithmes de calcul de taxes, le formatage des devises, ou la validation de schémas Zod.
              </p>
            </div>
            <div className="p-2.5 bg-slate-100 rounded-lg text-xs font-mono text-slate-800">
              Vérifie : exactitude mathématique et cas limites (null, undefined, 0).
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">Supertest + Express</span>
                <span className="text-xs font-mono text-indigo-700 font-bold">&lt; 50 ms / test</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Tests d&apos;Intégration (Routes HTTP & Sécurité)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                Simulent une vraie requête HTTP virtuelle à travers toute la pile Express : middlewares d&apos;authentification JWT, parsing JSON, contrôleurs et interception d&apos;erreurs.
              </p>
            </div>
            <div className="p-2.5 bg-slate-100 rounded-lg text-xs font-mono text-slate-800">
              Vérifie : codes HTTP (200, 401, 403, 404), headers et corps de réponse.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Implémentation Concrète des Deux Suites */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Code de Production</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Les deux suites automatisées officielles du Capstone
          </h2>
        </div>

        <Callout type="info" title="Isolation des bases de données lors des tests d'intégration">
          Pour éviter de polluer votre base MySQL de développement, configurez Supertest pour cibler une base de données de test éphémère (ex: <code className="text-xs font-mono">capstone_test</code>) ou encapsulez chaque scénario de test dans une transaction annulée automatiquement (<code className="text-xs font-mono">afterEach(async () =&gt; await conn.rollback())</code>).
        </Callout>

        {/* Sélecteur d'onglet */}
        <div className="flex gap-2.5">
          <button
            onClick={() => { setActiveTab('unit'); setCompletedRun(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'unit'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            1. Suite Unitaire : taxCalculator.test.ts
          </button>
          <button
            onClick={() => { setActiveTab('integration'); setCompletedRun(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'integration'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            2. Suite d&apos;Intégration : orderAuthorization.test.ts
          </button>
        </div>

        {activeTab === 'unit' ? (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600">
              Test unitaire avec Vitest validant le calcul fiscal B2B et rejetant les taux aberrants :
            </p>
            <CodeBlock language="typescript">{`import { describe, it, expect } from 'vitest';
import { calculateTax } from '@/backend/services/taxCalculator';

describe('calculateTax - Validation fiscale Capstone', () => {
  it('applique 20% de TVA pour un client résident français', () => {
    const tax = calculateTax(1000, false, 'FR');
    expect(tax).toBe(200);
  });

  it('applique 0% (auto-liquidation) pour un client B2B européen hors France', () => {
    const tax = calculateTax(1000, true, 'DE');
    expect(tax).toBe(0);
  });

  it('lève une exception InvalidRateError si le montant est négatif', () => {
    expect(() => calculateTax(-50, false, 'FR')).toThrowError(/Montant invalide/);
  });
});`}</CodeBlock>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600">
              Test d&apos;intégration avec Supertest prouvant que la faille IDOR est colmatée par un code 403 :
            </p>
            <CodeBlock language="typescript">{`import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '@/backend/server';

describe('GET /api/orders/:id - Sécurité IDOR', () => {
  it('renvoie HTTP 403 Forbidden quand un utilisateur tente de lire la commande d\\'un tiers', async () => {
    // Token de l'utilisateur #99 (non propriétaire de la commande #1042)
    const attackerToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

    const response = await request(app)
      .get('/api/orders/1042')
      .set('Authorization', attackerToken)
      .expect('Content-Type', /json/);

    expect(response.status).toBe(403);
    expect(response.body.error).toContain('Accès refusé');
  });

  it('renvoie HTTP 404 propre lorsque la commande n\\'existe pas en base', async () => {
    const validToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

    const response = await request(app)
      .get('/api/orders/999999')
      .set('Authorization', validToken);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Commande introuvable');
  });
});`}</CodeBlock>
          </div>
        )}
      </section>

      {/* Section 3: Banc d'Exécution Interactif */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Simulateur d&apos;Exécution</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Exécution Virtuelle du Runner de Tests
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Lancez l&apos;exécution de la suite sélectionnée ({metric.type}) pour observer la télémétrie de couverture et la confirmation de passage au vert :
        </p>

        <div className="rounded-2xl bg-white border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">Suite de tests active :</div>
              <div className="text-sm font-bold text-slate-900">{metric.suiteName}</div>
              <div className="text-xs font-mono text-emerald-800">{metric.testFile}</div>
            </div>
            <button
              disabled={isRunning}
              onClick={handleRun}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs disabled:opacity-40"
            >
              {isRunning ? '⏳ Exécution en cours...' : '▶ Lancer les tests dans la console'}
            </button>
          </div>

          {completedRun && (
            <div className="p-4 rounded-xl bg-slate-950 text-white font-mono text-xs space-y-2 border border-slate-800">
              <div className="text-emerald-400 font-bold">
                 Test Files: 1 passed (1) | Tests: {metric.passed} passed ({metric.passed})
              </div>
              <div className="text-slate-300">
                Temps d&apos;exécution : {metric.executionTimeMs} ms | Couverture de branches : {metric.coveragePercent}%
              </div>
              <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-800">
                Vérification TypeScript : 0 erreur (npx tsc --noEmit validé)
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Tests unitaires, d&apos;intégration et mocking
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.8 — Automatisation des Tests et Validation Robuste"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il indispensable d'utiliser Supertest plutôt que de simples tests unitaires pour valider un correctif d'autorisation IDOR ?",
              options: [
                "Parce que Supertest coûte moins cher en licences logicielles.",
                "Parce que l'IDOR implique la chaîne complète de transport HTTP (en-têtes Authorization Bearer, middleware JWT, parsing de req.params et code statut 403), ce qu'un test unitaire isolé ne peut pas simuler fidèlement.",
                "Parce que Vitest refuse de tester des fonctions asynchrones.",
                "Pour obliger le serveur à redémarrer automatiquement."
              ],
              correctIndex: 1,
              explanation: "Supertest éprouve la réalité du cycle de requête Express : il vérifie que les middlewares de sécurité s'exécutent dans le bon ordre avant d'atteindre le contrôleur."
            },
            {
              id: 2,
              question: "Quelle est la caractéristique fondamentale d'un bon test unitaire sous Vitest ?",
              options: [
                "Il doit durer au moins 5 secondes pour être considéré comme sérieux.",
                "Il est ultra-rapide (<10ms), déterministe, indépendant de tout réseau ou base de données, et focalisé sur une seule fonction pure ou un seul composant isolé.",
                "Il doit impérativement écrire un fichier de logs sur le bureau.",
                "Il nécessite la présence d'une connexion Internet active."
              ],
              correctIndex: 1,
              explanation: "La rapidité et l'isolation des tests unitaires permettent aux développeurs d'exécuter des milliers de tests à chaque sauvegarde sans ralentir le cycle de feedback."
            },
            {
              id: 3,
              question: "Lorsqu'on teste un service appelant l'API Google Gemini, comment éviter de consommer son quota d'API payant et de dépendre du réseau ?",
              options: [
                "En débranchant la prise réseau de l'ordinateur.",
                "En utilisant les utilitaires de simulation (Mocking) de Vitest (ex: vi.spyOn) pour simuler la réponse textuelle de Gemini ou simuler une erreur de timeout réseau.",
                "En ne testant jamais les fonctions qui utilisent de l'IA.",
                "En demandant à l'agent IA d'écrire le test à la main."
              ],
              correctIndex: 1,
              explanation: "Le mock permet d'émuler tous les cas de figure (réponse nominale, erreur 429 quota dépassé, timeout 504) de manière déterministe et gratuite."
            },
            {
              id: 4,
              question: "Quelle assertion Jest/Vitest permet de vérifier qu'une fonction lève bien l'exception attendue lors de la transmission d'une valeur négative ?",
              options: [
                "expect(result).toBe(true);",
                "expect(() => calculateTax(-10, false, 'FR')).toThrowError();",
                "console.log('Erreur détectée');",
                "assert.equals(1, 1);"
              ],
              correctIndex: 1,
              explanation: "Pour intercepter une exception sans faire crasher le runner de test, la fonction testée doit être enveloppée dans une fonction fléchée transmise à 'expect()'."
            },
            {
              id: 5,
              question: "Que mesure le taux de couverture de code (Code Coverage) calculé par @vitest/coverage-v8 ?",
              options: [
                "Le pourcentage de lignes, branches, fonctions et instructions de code source exécutées par la suite de tests automatisés.",
                "La surface occupée par l'IDE sur l'écran de l'ordinateur.",
                "Le nombre de développeurs ayant relu le code.",
                "La vitesse de téléchargement des dépendances npm."
              ],
              correctIndex: 0,
              explanation: "La couverture de branches indique si tous les chemins logiques (notamment les clauses 'if / else' de gestion d'erreur) sont effectivement traversés par les tests."
            },
            {
              id: 6,
              question: "Quelle est la définition d'un test de non-régression ?",
              options: [
                "Un test qu'on exécute une seule fois puis qu'on supprime.",
                "Un test rédigé spécifiquement pour reproduire un bug résolu, conservé de façon permanente dans la suite automatisée pour s'assurer que ce bug ne réapparaîtra jamais.",
                "Un test qui vérifie que l'ordinateur ne surchauffe pas.",
                "Un questionnaire de satisfaction client."
              ],
              correctIndex: 1,
              explanation: "Chaque bug corrigé donne naissance à un test de non-régression pérenne qui s'exécute à chaque commit dans l'intégration continue (CI)."
            }
          ]}
        />
      </section>
    </div>
  );
};
