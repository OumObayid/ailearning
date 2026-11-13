'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur interactif : Banc d'Intégration Express & Supertest
  const [activeRequest, setActiveRequest] = useState<'get_tasks' | 'patch_valid' | 'patch_invalid' | 'patch_not_found'>('patch_valid');

  const requestFlows = {
    get_tasks: {
      method: 'GET',
      path: '/api/tasks',
      body: null,
      statusCode: 200,
      controllerAction: 'taskController.getAllTasks()',
      serviceAction: 'taskService.findAll()',
      storeAction: 'taskStore.getAll() &rarr; 3 tâches en mémoire',
      responsePayload: `[
  { "id": 1, "title": "Initialiser le dépôt", "status": "done" },
  { "id": 2, "title": "Créer la route PATCH", "status": "in_progress" },
  { "id": 3, "title": "Rédiger les tests", "status": "todo" }
]`,
      diagnostic: 'Intégration nominale : le contrôleur interroge le service, lit le store et formate le flux JSON avec succès.'
    },
    patch_valid: {
      method: 'PATCH',
      path: '/api/tasks/2',
      body: '{ "status": "done" }',
      statusCode: 200,
      controllerAction: 'taskController.updateStatus(req, res)',
      serviceAction: 'taskService.updateStatus(2, "done")',
      storeAction: 'taskStore.update(2, { status: "done" })',
      responsePayload: `{
  "id": 2,
  "title": "Créer la route PATCH",
  "status": "done",
  "updatedAt": "2026-11-12T23:55:00.000Z"
}`,
      diagnostic: 'Test d\'intégration réussi : mutation effectuée en mémoire et renvoi de l\'objet mis à jour avec HTTP 200.'
    },
    patch_invalid: {
      method: 'PATCH',
      path: '/api/tasks/2',
      body: '{ "status": "statut_interdit" }',
      statusCode: 400,
      controllerAction: 'taskController.updateStatus() &rarr; Détection entrée invalide',
      serviceAction: 'Interrompu avant appel au service',
      storeAction: 'Aucune mutation en mémoire',
      responsePayload: `{
  "error": "Bad Request",
  "message": "Le statut 'statut_interdit' n'est pas autorisé. Valeurs acceptées: todo, in_progress, done"
}`,
      diagnostic: 'Intégration défensive : la couche contrôleur intercepte la mauvaise requête et protège le service et le store.'
    },
    patch_not_found: {
      method: 'PATCH',
      path: '/api/tasks/999',
      body: '{ "status": "done" }',
      statusCode: 404,
      controllerAction: 'taskController.updateStatus() &rarr; Reçoit null du service',
      serviceAction: 'taskService.updateStatus(999, "done") &rarr; store.findById(999) === undefined',
      storeAction: 'Recherche infructueuse dans le store',
      responsePayload: `{
  "error": "Not Found",
  "message": "Tâche avec l'ID 999 introuvable"
}`,
      diagnostic: 'Intégration d\'absence : la chaîne propage correctement le statut 404 sans lever d\'exception non gérée.'
    }
  };

  const currentFlow = requestFlows[activeRequest];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 6
          </span>
          <span className="text-xs text-muted-foreground">1 h 10 de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Comprendre et exécuter les tests d'intégration
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Tandis que le test unitaire valide une fonction isolée, le test d'intégration vérifie la collaboration effective entre les couches : route Express, middleware, contrôleur, service métier et persistance de données. Découvrez comment orchestrer ces tests avec Supertest et Vitest sans polluer votre réseau.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & isolation des données</p>
        <p className="text-sm leading-relaxed">
          Un test d'intégration doit être strictement <strong>indépendant et reproductible</strong>. L'usage du hook <code>beforeEach</code> pour réinitialiser le magasin de données avant chaque scénario est impératif. Aucun test d'intégration ne doit dépendre de l'ordre d'exécution ou d'une modification réalisée par un autre test.
        </p>
      </Callout>

      {/* Section 1 : Tests unitaires vs Tests d'intégration */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="git-merge" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>6.1 à 6.3 — De l'unité isolée à la chaîne complète</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Pourquoi les tests unitaires ne suffisent pas
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Une fonction peut être irréprochable prise isolément, mais échouer lamentablement lorsqu'elle est branchée dans l'application : paramètre mal extrait par Express (ex: <code>req.params.id</code> reçu en <code>string</code> au lieu de <code>number</code>), middleware d'authentification mal configuré, ou mauvaise sérialisation JSON.
            </p>
            <div className="grid grid-cols-1 gap-3 mt-2">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
                <span className="text-xs font-bold text-blue-400">Test Unitaire</span>
                <p className="text-xs text-muted-foreground">
                  Vérifie une fonction ou méthode unique. Toutes les dépendances externes sont remplacées par des simulations (mocks). Temps d'exécution : &lt; 5 ms.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
                <span className="text-xs font-bold text-emerald-400">Test d'Intégration</span>
                <p className="text-xs text-muted-foreground">
                  Vérifie la traversée réelle entre plusieurs composants connectés : Route HTTP &rarr; Contrôleur &rarr; Service &rarr; Magasin de données. Les composants collaborent réellement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Architecture Express testable (app.ts vs server.ts) */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>6.5 — Règle d'architecture : Séparer app.ts et server.ts</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            C'est l'erreur la plus fréquente des agents juniors : regrouper la création de l'application Express et l'appel à <code>app.listen(PORT)</code> dans le même fichier.
          </p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-black/40 border border-border flex flex-col gap-1.5">
              <span className="font-mono font-bold text-sky-400">backend/src/app.ts (Exportation de l'application)</span>
              <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto leading-relaxed">
{`import express from 'express';
import { taskRouter } from './routes/taskRoutes';

export const app = express();
app.use(express.json());
app.use('/api/tasks', taskRouter);
// ⚠️ Pas de app.listen ici !`}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-border flex flex-col gap-1.5">
              <span className="font-mono font-bold text-emerald-400">backend/src/server.ts (Point d'entrée de production)</span>
              <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto leading-relaxed">
{`import { app } from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`TaskFlow Backend écoute sur http://localhost:\${PORT}\`);
});`}
              </pre>
            </div>
          </div>
          <p className="text-xs text-emerald-400/90 font-medium mt-1">
            🎯 <strong>Avantage décisif :</strong> Supertest peut importer directement <code>app</code> et envoyer des requêtes virtuelles en mémoire sans jamais occuper un port réseau réel. Aucun risque de conflit <code>EADDRINUSE</code> lors des tests en parallèle !
          </p>
        </div>
      </div>

      {/* Section 3 : Écrire un test d'intégration avec Supertest */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>6.7 — Structure d'un test d'intégration avec Supertest & Vitest</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <pre className="p-4 rounded-lg bg-muted font-mono text-xs text-foreground overflow-x-auto leading-relaxed border border-border">
{`import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { resetTaskStore } from '../src/store/taskStore';

describe('Tests d\\'intégration : PATCH /api/tasks/:id', () => {
  // Isolation stricte : réinitialisation de l'état mémoire avant chaque test
  beforeEach(() => {
    resetTaskStore();
  });

  it('met à jour le statut en "done" et retourne HTTP 200', async () => {
    const response = await request(app)
      .patch('/api/tasks/1')
      .send({ status: 'done' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.status).toBe('done');
  });

  it('rejette un statut invalide avec HTTP 400', async () => {
    const response = await request(app)
      .patch('/api/tasks/1')
      .send({ status: 'archived_invalid' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});`}
          </pre>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Atelier Interactif — Banc d'Intégration Express & Supertest</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Simulez l'exécution d'un test Supertest traversant l'application complète. Observez chaque palier de la chaîne d'exécution (Route &rarr; Contrôleur &rarr; Service &rarr; Magasin) et la réponse HTTP renvoyée.
          </p>

          {/* Boutons requêtes */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setActiveRequest('patch_valid')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeRequest === 'patch_valid'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              PATCH /api/tasks/2 &#123; "status": "done" &#125; &rarr; 200 OK
            </button>

            <button
              onClick={() => setActiveRequest('patch_invalid')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeRequest === 'patch_invalid'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              PATCH /api/tasks/2 &#123; "status": "statut_interdit" &#125; &rarr; 400 Bad Request
            </button>

            <button
              onClick={() => setActiveRequest('patch_not_found')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeRequest === 'patch_not_found'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              PATCH /api/tasks/999 &#123; "status": "done" &#125; &rarr; 404 Not Found
            </button>

            <button
              onClick={() => setActiveRequest('get_tasks')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                activeRequest === 'get_tasks'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              GET /api/tasks &rarr; 200 OK
            </button>
          </div>

          {/* Visualisation de la chaîne de traversée */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="font-bold text-foreground">Traversée des couches applicatives</span>
              <span className="font-mono text-emerald-400 font-bold">{currentFlow.method} {currentFlow.path}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">1. Couche Contrôleur Express :</span>
                <span className="font-mono text-sky-300">{currentFlow.controllerAction}</span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">2. Couche Service Métier :</span>
                <span className="font-mono text-purple-300">{currentFlow.serviceAction}</span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">3. Couche Magasin / Données :</span>
                <span className="font-mono text-amber-300">{currentFlow.storeAction}</span>
              </div>
            </div>

            {/* Réponse Supertest */}
            <div className="p-3 rounded-lg bg-black/60 border border-border flex flex-col gap-1.5 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Réponse Supertest reçue :</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  currentFlow.statusCode === 200 ? 'bg-emerald-500/20 text-emerald-400' :
                  currentFlow.statusCode === 400 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  HTTP {currentFlow.statusCode}
                </span>
              </div>
              <pre className="text-[11px] text-foreground overflow-x-auto leading-relaxed">
                {currentFlow.responsePayload}
              </pre>
            </div>

            <div className="p-2.5 rounded bg-muted/40 text-muted-foreground text-xs font-sans">
              <strong>Bilan d'intégration :</strong> {currentFlow.diagnostic}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>6.17 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 6 : Tests d'intégration"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal d'un test d'intégration ?",
              options: [
                "Vérifier uniquement une fonction isolée.",
                "Vérifier que plusieurs composants fonctionnent correctement ensemble.",
                "Vérifier les commits réalisés dans Git.",
                "Vérifier uniquement la mise en forme du code."
              ],
              correctIndex: 1,
              explanation: "Le test d'intégration vérifie la collaboration effective entre plusieurs composants du système (ex. route, contrôleur, service, stockage)."
            },
            {
              id: 2,
              question: "Quelle est la différence principale entre un test unitaire et un test d'intégration ?",
              options: [
                "Le test unitaire vérifie une unité isolée, tandis que le test d'intégration vérifie les interactions entre plusieurs composants.",
                "Le test unitaire utilise toujours une base de données, contrairement au test d'intégration.",
                "Le test d'intégration ne peut jamais utiliser Vitest.",
                "Le test unitaire vérifie uniquement les API HTTP."
              ],
              correctIndex: 0,
              explanation: "L'unitaire s'intéresse à une fonction isolée avec des mocks ; l'intégration vérifie la synergie et les échanges de données entre plusieurs couches réelles."
            },
            {
              id: 3,
              question: "Quel est le rôle principal de Supertest dans un projet Express ?",
              options: [
                "Compiler le code TypeScript.",
                "Gérer les branches du dépôt Git.",
                "Envoyer des requêtes HTTP à une application et examiner ses réponses.",
                "Remplacer le serveur Express."
              ],
              correctIndex: 2,
              explanation: "Supertest permet de forger des requêtes HTTP virtuelles contre une application Express et d'auditer les en-têtes, statuts et corps reçus."
            },
            {
              id: 4,
              question: "Pourquoi séparer la création de l'application Express du démarrage du serveur ?",
              options: [
                "Pour supprimer automatiquement les routes pendant les tests.",
                "Pour éviter d'utiliser Express dans les tests.",
                "Pour empêcher les tests de transmettre des requêtes HTTP.",
                "Pour pouvoir réutiliser l'application dans les tests sans démarrer manuellement un serveur sur un port."
              ],
              correctIndex: 3,
              explanation: "La séparation permet d'injecter directement l'objet app dans Supertest sans devoir ouvrir un socket TCP réel ni gérer de conflits de ports."
            },
            {
              id: 5,
              question: "Dans un test d'intégration, pourquoi faut-il préparer les données avant chaque scénario ?",
              options: [
                "Pour garantir que les tests commencent dans un état connu et ne dépendent pas les uns des autres.",
                "Pour augmenter automatiquement le nombre de tests.",
                "Pour éviter d'utiliser des assertions.",
                "Pour empêcher Vitest d'exécuter les tests en parallèle."
              ],
              correctIndex: 0,
              explanation: "L'isolation de l'état garantit la reproductibilité : un test ne doit jamais échouer parce qu'un test précédent a modifié ou supprimé une donnée."
            },
            {
              id: 6,
              question: "Quel est le rôle de beforeEach dans Vitest ?",
              options: [
                "Fermer définitivement le serveur Express.",
                "Exécuter une préparation avant chaque test concerné.",
                "Afficher le résultat de tous les tests.",
                "Fusionner les résultats des différents fichiers."
              ],
              correctIndex: 1,
              explanation: "beforeEach exécute une fonction de rappel avant chaque test individuel d'un bloc describe, typiquement pour réinitialiser les données."
            },
            {
              id: 7,
              question: "Une route Express retourne une erreur parce qu'elle appelle incorrectement un service métier. Quel type de problème un test d'intégration peut-il révéler ?",
              options: [
                "Un problème de compilation uniquement.",
                "Un problème de gestion de branches Git.",
                "Un problème d'interaction entre composants.",
                "Un problème de mise en forme CSS."
              ],
              correctIndex: 2,
              explanation: "Ce type de dysfonctionnement traduit un défaut d'interaction ou de contrat d'appel entre la couche HTTP et la couche métier."
            },
            {
              id: 8,
              question: "Pourquoi faut-il nettoyer les ressources utilisées par les tests ?",
              options: [
                "Pour supprimer les fichiers source après chaque test.",
                "Pour rendre les assertions facultatives.",
                "Pour éviter que les résultats des tests soient affichés.",
                "Pour éviter les ressources ouvertes ou les états résiduels qui perturbent les autres tests."
              ],
              correctIndex: 3,
              explanation: "Les descripteurs ouverts (connexions, timers, serveurs) peuvent empêcher le processus de test de se terminer ou parasiter les tests suivants."
            },
            {
              id: 9,
              question: "Quelles pratiques contribuent à rendre les tests d'intégration fiables ?",
              options: [
                "Préparer des données indépendantes pour chaque scénario.",
                "Utiliser systématiquement des mocks pour tous les composants internes.",
                "Modifier les assertions dès qu'un test échoue afin d'obtenir un résultat positif.",
                "Faire dépendre chaque test de l'état créé par le test précédent."
              ],
              correctIndex: 0,
              explanation: "L'indépendance des données par scénario est indispensable. Remplacer tous les composants internes par des mocks dénaturerait le principe d'intégration."
            },
            {
              id: 10,
              question: "Un test d'intégration utilisant Supertest réussit pour la route GET /api/tasks. Quelle conclusion est correcte ?",
              options: [
                "Toutes les routes de l'application fonctionnent correctement.",
                "Le comportement vérifié par ce scénario a satisfait les assertions, mais les autres fonctionnalités doivent être contrôlées séparément.",
                "L'ensemble de l'application est validé.",
                "Tous les tests unitaires et fonctionnels ont nécessairement réussi."
              ],
              correctIndex: 1,
              explanation: "Le succès prouve uniquement la validité du scénario testé sur la route GET /api/tasks. Il ne préjuge pas du bon fonctionnement des routes POST, PATCH ou DELETE."
            }
          ]}
        />
      </div>
    </div>
  );
};
