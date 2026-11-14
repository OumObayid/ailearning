'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface TestCase {
  id: string;
  suite: 'Backend HTTP' | 'Frontend Unit';
  name: string;
  expected: string;
  status: 'passed' | 'failed' | 'idle';
}

const INITIAL_TEST_CASES: TestCase[] = [
  {
    id: 'TC-01',
    suite: 'Backend HTTP',
    name: 'POST /api/tasks : Création nominale (titre + desc valides)',
    expected: 'Status 201, id généré, status: "todo"',
    status: 'idle'
  },
  {
    id: 'TC-02',
    suite: 'Backend HTTP',
    name: 'POST /api/tasks : Rejet si titre vide ou absent',
    expected: 'Status 400 Bad Request',
    status: 'idle'
  },
  {
    id: 'TC-03',
    suite: 'Backend HTTP',
    name: 'POST /api/tasks : Rejet si titre composé uniquement d\'espaces ("   ")',
    expected: 'Status 400 Bad Request via value.trim().length > 0',
    status: 'idle'
  },
  {
    id: 'TC-04',
    suite: 'Backend HTTP',
    name: 'GET /api/tasks/:id : Retourne 404 si identifiant inconnu',
    expected: 'Status 404 Not Found',
    status: 'idle'
  },
  {
    id: 'TC-05',
    suite: 'Backend HTTP',
    name: 'PATCH /api/tasks/:id/status : Rejet si statut invalide ("pending")',
    expected: 'Status 400 Bad Request (seuls todo, in_progress, done admis)',
    status: 'idle'
  },
  {
    id: 'TC-06',
    suite: 'Frontend Unit',
    name: 'statusLabels : Traduction correcte des libellés français',
    expected: 'todo -> "À faire", in_progress -> "En cours", done -> "Terminée"',
    status: 'idle'
  }
];

export function Chapitre12Content() {
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedBugTab, setSelectedBugTab] = useState<'bug-001' | 'bug-002'>('bug-001');

  const handleRunAllTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestCases((prev) =>
        prev.map((tc) => ({
          ...tc,
          status: 'passed'
        }))
      );
      setIsRunning(false);
    }, 700);
  };

  const handleResetTests = () => {
    setTestCases(INITIAL_TEST_CASES);
  };

  const passedCount = testCases.filter((t) => t.status === 'passed').length;
  const totalCount = testCases.length;

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.12
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Mettre en place les tests avec l&apos;agent QA
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Stratégie d&apos;assurance qualité avec Vitest et Supertest : isolation des tests via <code>beforeEach(clearTasks)</code>, tests négatifs des cas d&apos;erreurs, qualification formelle des anomalies (BUG) et non-régression.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : Un test non exécuté n'est jamais un test réussi">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Il est formellement interdit à un agent d&apos;affirmer que <em>&quot;tous les tests passent&quot;</em> sur la base d&apos;une intuition. <strong>Chaque résultat doit provenir d&apos;une commande réelle exécutée dans le terminal</strong>. De plus, <strong>aucun agent ni Team Leader n&apos;est autorisé à exécuter un merge ou push sans accord explicite et écrit du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Stratégie de tests et isolation */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="bug" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Isolation impérative des tests avec beforeEach(clearTasks)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Comme le backend de TaskFlow stocke les données dans une <code>Map</code> en mémoire, chaque test risque de polluer le test suivant si le stockage n&apos;est pas réinitialisé :
          </p>

          <div className="p-3 rounded-lg bg-black border border-slate-800 font-mono text-xs text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`// backend/tests/task.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { clearTasks } from '../src/repositories/task.repository.js';

describe('API TaskFlow - Tests d\\'intégration', () => {
  // Réinitialiser la Map avant chaque test pour garantir l'indépendance
  beforeEach(() => {
    clearTasks();
  });

  it('refuse la création si le titre n\\'est composé que d\\'espaces', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '   ', description: 'Description valide' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});`}
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Fiche d'anomalie BUG */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="bug" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Modèle de rapport d&apos;anomalie (Fiche BUG)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Lorsqu&apos;un test échoue, l&apos;agent QA ne modifie pas le code source lui-même : il formalise un rapport d&apos;anomalie précis pour l&apos;agent développeur :
          </p>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <Button
              size="sm"
              variant={selectedBugTab === 'bug-001' ? 'default' : 'outline'}
              onClick={() => setSelectedBugTab('bug-001')}
              className="h-8 text-xs shrink-0 font-mono"
            >
              BUG-001 (Espaces blancs)
            </Button>
            <Button
              size="sm"
              variant={selectedBugTab === 'bug-002' ? 'default' : 'outline'}
              onClick={() => setSelectedBugTab('bug-002')}
              className="h-8 text-xs shrink-0 font-mono"
            >
              BUG-002 (Statut 404 manquant)
            </Button>
          </div>

          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-2 text-xs font-mono">
            {selectedBugTab === 'bug-001' ? (
              <>
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <span className="font-bold text-foreground">Identifiant : BUG-001</span>
                  <Badge variant="destructive" className="text-[10px]">Priorité : Haute</Badge>
                </div>
                <div><strong>Titre :</strong> Le backend accepte un titre composé uniquement d&apos;espaces (&quot;   &quot;)</div>
                <div><strong>Composant :</strong> Backend (<code>src/services/task.service.ts</code>)</div>
                <div><strong>Scénario :</strong> POST /api/tasks avec <code>&#123; title: &quot;   &quot; &#125;</code></div>
                <div><strong>Résultat attendu :</strong> HTTP 400 Bad Request</div>
                <div><strong>Résultat observé :</strong> HTTP 201 Created</div>
                <div><strong>Correctif requis :</strong> Remplacer <code>value.length &gt; 0</code> par <code>value.trim().length &gt; 0</code></div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <span className="font-bold text-foreground">Identifiant : BUG-002</span>
                  <Badge variant="secondary" className="text-[10px]">Priorité : Moyenne</Badge>
                </div>
                <div><strong>Titre :</strong> GET /api/tasks/:id renvoie 500 au lieu de 404 sur un ID inexistant</div>
                <div><strong>Composant :</strong> Backend (<code>src/controllers/task.controller.ts</code>)</div>
                <div><strong>Scénario :</strong> GET /api/tasks/unknown-999</div>
                <div><strong>Résultat attendu :</strong> HTTP 404 Not Found</div>
                <div><strong>Résultat observé :</strong> HTTP 500 Internal Server Error</div>
                <div><strong>Correctif requis :</strong> Vérifier <code>if (!task) return res.status(404).json(...)</code></div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de tests QA */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="bug" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Console d&apos;Exécution Vitest & Supertest</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Lancez la suite de tests automatisés pour observer le comportement des assertions de cas limites et d&apos;erreurs.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Barre d'action */}
          <div className="p-3 rounded-lg border border-border/40 bg-muted/20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">
                Suite de validation globale :
              </span>
              <Badge variant="outline" className="text-xs">
                {passedCount} / {totalCount} validé(s)
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={handleRunAllTests}
                disabled={isRunning}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                {isRunning ? (
                  <>
                    <Icon name="refresh" className="h-3.5 w-3.5 animate-spin shrink-0" />
                    <span>Exécution en cours...</span>
                  </>
                ) : (
                  <>
                    <Icon name="arrow-right" className="h-3.5 w-3.5 shrink-0" />
                    <span>Lancer &quot;npm run test&quot;</span>
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleResetTests}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                <Icon name="rotate-ccw" className="h-3.5 w-3.5 shrink-0" />
                <span>Réinitialiser</span>
              </Button>
            </div>
          </div>

          {/* Liste des cas de test */}
          <div className="flex flex-col gap-2">
            {testCases.map((tc) => (
              <div
                key={tc.id}
                className="p-3 rounded-lg border border-border/40 bg-card flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{tc.id}</span>
                    <Badge variant="secondary" className="text-[10px]">{tc.suite}</Badge>
                    <span className="font-semibold text-foreground">{tc.name}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">Attendu : {tc.expected}</span>
                </div>

                <div className="shrink-0">
                  {tc.status === 'idle' && (
                    <Badge variant="outline" className="text-muted-foreground text-[11px]">
                      En attente
                    </Badge>
                  )}
                  {tc.status === 'passed' && (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] flex items-center gap-1">
                      <Icon name="check-circle" className="h-3 w-3 shrink-0" />
                      <span>PASSED</span>
                    </Badge>
                  )}
                  {tc.status === 'failed' && (
                    <Badge variant="destructive" className="text-[11px] flex items-center gap-1">
                      <Icon name="x" className="h-3 w-3 shrink-0" />
                      <span>FAILED</span>
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4 : Quiz */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">4. Vérifier les connaissances — Quiz officiel</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <QuickQuiz
            questions={[
              {
                id: 1,
                question: "Quel est le rôle principal de l'agent QA dans TaskFlow ?",
                options: [
                  "Développer toutes les fonctionnalités de l'application.",
                  "Préparer et vérifier les scénarios de test.",
                  "Autoriser les opérations Git de l'équipe.",
                  "Remplacer le Team Leader."
                ],
                correctIndex: 1,
                explanation: "L'agent QA est chargé de concevoir la matrice de couverture, préparer les scénarios de test et documenter objectivement les anomalies."
              },
              {
                id: 2,
                question: "Quel outil permet d'envoyer des requêtes HTTP à une application Express pendant les tests ?",
                options: [
                  "Vite.",
                  "React.",
                  "Supertest.",
                  "TypeScript."
                ],
                correctIndex: 2,
                explanation: "Supertest permet d'injecter des requêtes HTTP simulées directement dans l'instance de l'application Express sans avoir à démarrer un serveur sur un port réel."
              },
              {
                id: 3,
                question: "Pourquoi faut-il réinitialiser le stockage en mémoire entre les tests concernés ?",
                options: [
                  "Pour éviter que les données d'un test influencent les autres.",
                  "Pour accélérer automatiquement la compilation TypeScript.",
                  "Pour remplacer le backend par le frontend.",
                  "Pour empêcher Vitest d'exécuter plusieurs tests."
                ],
                correctIndex: 0,
                explanation: "Sans réinitialisation (beforeEach(clearTasks)), les données créées par un test précédent faussent les assertions des tests suivants (ex: compteurs de tâches)."
              },
              {
                id: 4,
                question: "Quelle est la différence principale entre un test unitaire et un test d'intégration ?",
                options: [
                  "Un test unitaire vérifie uniquement l'interface, tandis qu'un test d'intégration vérifie uniquement le serveur.",
                  "Un test unitaire vérifie un élément isolé, tandis qu'un test d'intégration vérifie les interactions entre plusieurs éléments.",
                  "Un test unitaire est toujours manuel, tandis qu'un test d'intégration est toujours automatisé.",
                  "Un test unitaire vérifie les performances, tandis qu'un test d'intégration vérifie uniquement le design."
                ],
                correctIndex: 1,
                explanation: "Le test unitaire teste une fonction ou classe isolée. Le test d'intégration vérifie la collaboration de plusieurs composants (ex: Route Express + Contrôleur + Service + Repository)."
              },
              {
                id: 5,
                question: "Quelles informations doivent figurer dans un rapport d'anomalie utile ? (Sélectionnez la proposition exacte)",
                options: [
                  "Le résultat attendu, le résultat observé et les étapes permettant de reproduire le problème.",
                  "Une simple affirmation que tout fonctionne sans aucune donnée de reproduction.",
                  "L'historique complet des commits Git de l'année précédente.",
                  "Le mot de passe de la machine hôte."
                ],
                correctIndex: 0,
                explanation: "Un rapport d'anomalie rigoureux doit permettre la reproduction immédiate : préconditions, étapes, résultat attendu vs résultat observé."
              },
              {
                id: 6,
                question: "Un test a été ignoré par le moteur de test. Comment doit-il être comptabilisé ?",
                options: [
                  "Comme un test réussi.",
                  "Comme un test exécuté sans erreur.",
                  "Comme un test non exécuté.",
                  "Comme une anomalie automatiquement corrigée."
                ],
                correctIndex: 2,
                explanation: "Un test ignoré (skipped) n'a fourni aucune vérification. Il doit impérativement être consigné comme non exécuté et ne peut en aucun cas être compté comme un succès."
              },
              {
                id: 7,
                question: "Dans TaskFlow, QA peut vérifier une correction en relançant le test concerné et les tests associés qui pourraient être affectés.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. C'est le principe du test de non-régression : vérifier que la correction résout le bug sans dégrader les autres fonctionnalités existantes."
              },
              {
                id: 8,
                question: "Une couverture de code de 100 % garantit que toutes les fonctionnalités de l'application sont correctes.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. La couverture de code indique quelles lignes ont été traversées, mais ne prouve pas que les assertions vérifient les bonnes règles métier ou gèrent tous les cas d'erreur."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
