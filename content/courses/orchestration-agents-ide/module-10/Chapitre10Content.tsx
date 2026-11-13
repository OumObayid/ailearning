'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
}

export function Chapitre10Content() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'task-1',
      title: 'Initialiser la structure TaskFlow',
      description: 'Créer les répertoires frontend et backend',
      status: 'done'
    },
    {
      id: 'task-2',
      title: 'Configurer Express et TypeScript',
      description: 'Installer les packages et paramétrer NodeNext',
      status: 'in_progress'
    }
  ]);

  const [inputTitle, setInputTitle] = useState<string>('Écrire les tests Supertest');
  const [inputDesc, setInputDesc] = useState<string>('Couvrir les cas nominaux et d\'erreur');
  const [httpLog, setHttpLog] = useState<{
    method: string;
    route: string;
    status: number;
    response: string;
  }>({
    method: 'GET',
    route: '/api/tasks',
    status: 200,
    response: JSON.stringify(tasks, null, 2)
  });

  const handleCreateTask = () => {
    // Validation règle métier : chaîne non vide et pas que des espaces
    if (!inputTitle || inputTitle.trim().length === 0 || !inputDesc || inputDesc.trim().length === 0) {
      setHttpLog({
        method: 'POST',
        route: '/api/tasks',
        status: 400,
        response: JSON.stringify(
          { error: 'Bad Request', message: 'Le titre et la description ne peuvent être vides' },
          null,
          2
        )
      });
      return;
    }

    const newTask: TaskItem = {
      id: `task-${Date.now().toString().slice(-4)}`,
      title: inputTitle.trim(),
      description: inputDesc.trim(),
      status: 'todo' // Statut initial forcé par la règle métier
    };

    const nextList = [...tasks, newTask];
    setTasks(nextList);
    setHttpLog({
      method: 'POST',
      route: '/api/tasks',
      status: 201,
      response: JSON.stringify(newTask, null, 2)
    });
  };

  const handleToggleStatus = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) {
      setHttpLog({
        method: 'PATCH',
        route: `/api/tasks/${id}/status`,
        status: 404,
        response: JSON.stringify({ error: 'Not Found', message: 'Tâche introuvable' }, null, 2)
      });
      return;
    }

    const nextStatus: 'todo' | 'in_progress' | 'done' =
      target.status === 'todo'
        ? 'in_progress'
        : target.status === 'in_progress'
        ? 'done'
        : 'todo';

    const nextList = tasks.map((t) => (t.id === id ? { ...t, status: nextStatus } : t));
    setTasks(nextList);
    setHttpLog({
      method: 'PATCH',
      route: `/api/tasks/${id}/status`,
      status: 200,
      response: JSON.stringify({ id, status: nextStatus }, null, 2)
    });
  };

  const handleDeleteTask = (id: string) => {
    const nextList = tasks.filter((t) => t.id !== id);
    setTasks(nextList);
    setHttpLog({
      method: 'DELETE',
      route: `/api/tasks/${id}`,
      status: 204,
      response: '/* 204 No Content */'
    });
  };

  const handleGetCounters = () => {
    const counters = {
      todo: tasks.filter((t) => t.status === 'todo').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      done: tasks.filter((t) => t.status === 'done').length
    };
    setHttpLog({
      method: 'GET',
      route: '/api/tasks/counters',
      status: 200,
      response: JSON.stringify(counters, null, 2)
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.10
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Développer le backend avec les agents
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Implémentation de l&apos;API REST Node.js/Express en 4 couches (Routes, Contrôleurs, Services, Repository Map), validation stricte des règles métier et tests Supertest sans socket.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : La compilation ne prouve pas la justesse fonctionnelle">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Une compilation TypeScript réussie avec zéro erreur (<code>npm run build</code>) prouve la cohérence des types, mais <strong>ne garantit absolument pas que les règles métier ou les codes HTTP répondent aux critères d&apos;acceptation</strong>. De plus, <strong>aucun agent ni Team Leader n&apos;est autorisé à exécuter un merge ou push sans accord explicite et écrit du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : L'architecture en 4 couches backend */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              10.3. Les quatre responsabilités de l&apos;architecture Backend
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Pour éviter les contrôleurs tentaculaires et rendre le code testable unitairement, le backend sépare strictement le flux d&apos;une requête HTTP :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-primary shrink-0" />
                1. Routes (<code>backend/src/routes/task.routes.ts</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Associent chaque méthode HTTP et chemin à une fonction de contrôleur. Exemple : <code>router.post(&apos;/api/tasks&apos;, createTask)</code>. Ne contiennent aucune logique métier.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="cpu" className="h-4 w-4 text-emerald-500 shrink-0" />
                2. Contrôleurs (<code>backend/src/controllers/task.controller.ts</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Réceptionnent <code>req.body</code> et <code>req.params</code>, transmettent les données au service, et renvoient les codes de statut HTTP normalisés (200, 201, 204, 400, 404).
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="shield-check" className="h-4 w-4 text-amber-500 shrink-0" />
                3. Services (<code>backend/src/services/task.service.ts</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Le cœur des règles métier. Vérifient que le titre n&apos;est pas composé uniquement d&apos;espaces (<code>value.trim().length &gt; 0</code>), imposent le statut initial <code>todo</code>, et isolent le changement de statut de la modification textuelle.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="database" className="h-4 w-4 text-purple-500 shrink-0" />
                4. Repository (<code>backend/src/repositories/task.repository.ts</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Persistance en mémoire via une <code>Map&lt;string, Task&gt;</code>. Fournit <code>findAll</code>, <code>findById</code>, <code>save</code>, <code>delete</code>, <code>countByStatus</code> et <code>clearTasks</code> (réservé aux tests).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Les règles de validation */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              10.5 & 10.6. Typage TypeScript et règles de validation
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Le modèle et les règles de validation garantissent l&apos;intégrité de l&apos;état sans base de données :
          </p>

          <pre className="p-3 rounded-lg bg-muted/30 font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`// backend/src/types/task.ts
export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// Règle de validation du texte non vide (rejette "   ")
export function isValidText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

// Règle de validation des statuts autorisés
export function isValidStatus(value: unknown): value is TaskStatus {
  return ['todo', 'in_progress', 'done'].includes(value as TaskStatus);
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de l'API REST */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="server" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Simulateur interactif : Banc d&apos;Essai REST & Repository en Mémoire
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Exécutez des opérations sur l&apos;API Express simulée, observez la validation des règles métier et inspectez le payload JSON retourné avec son code HTTP.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Formulaire de création */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-3 w-full min-w-0 max-w-full">
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              Simuler <code>POST /api/tasks</code> :
            </span>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Titre de la tâche (ne peut être vide)..."
                className="p-2 rounded bg-muted/20 border border-border/40 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <input
                type="text"
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)}
                placeholder="Description..."
                className="p-2 rounded bg-muted/20 border border-border/40 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={handleCreateTask}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                <Icon name="sparkles" className="h-3.5 w-3.5 shrink-0" />
                <span>Envoyer POST /api/tasks (Créer)</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGetCounters}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                <Icon name="refresh" className="h-3.5 w-3.5 shrink-0" />
                <span>GET /api/tasks/counters</span>
              </Button>
            </div>
          </div>

          {/* Liste des tâches en mémoire */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                État actuel du Repository (<code>Map&lt;string, Task&gt;</code>) :
              </span>
              <Badge variant="outline" className="text-xs">
                {tasks.length} tâche(s)
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="p-2.5 rounded border border-border/40 bg-muted/10 flex flex-wrap items-center justify-between gap-2"
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">{t.id}</span>
                      <span className="text-xs font-semibold text-foreground">{t.title}</span>
                      <Badge
                        variant="secondary"
                        className={
                          t.status === 'done'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]'
                            : t.status === 'in_progress'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px]'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px]'
                        }
                      >
                        {t.status}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{t.description}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(t.id)}
                      className="h-7 text-[11px] px-2 flex items-center gap-1"
                    >
                      <Icon name="refresh" className="h-3 w-3 shrink-0" />
                      <span>Statut</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTask(t.id)}
                      className="h-7 text-[11px] px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                    >
                      <Icon name="trash" className="h-3 w-3 shrink-0" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Console de réponse HTTP */}
          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-primary shrink-0" />
                Journal des Échanges HTTP Express :
              </span>
              <Badge
                variant="outline"
                className={
                  httpLog.status === 201 || httpLog.status === 200 || httpLog.status === 204
                    ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs'
                    : 'border-rose-500/40 text-rose-600 dark:text-rose-400 text-xs'
                }
              >
                HTTP {httpLog.status} ({httpLog.method} {httpLog.route})
              </Badge>
            </div>
            <pre className="p-2.5 rounded bg-background/80 font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap break-all">
              {httpLog.response}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Section 4 : Quiz */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Vérifier les connaissances — Quiz officiel
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <QuickQuiz
            questions={[
              {
                id: 1,
                question: "Dans l'architecture backend présentée, quelle responsabilité appartient principalement au service ?",
                options: [
                  "Associer les chemins HTTP aux contrôleurs.",
                  "Appliquer les règles métier de TaskFlow.",
                  "Démarrer le serveur HTTP.",
                  "Afficher les composants React."
                ],
                correctIndex: 1,
                explanation: "Le service héberge la logique métier (validation des chaînes non-vides, vérification des statuts valides, respect des critères d'acceptation)."
              },
              {
                id: 2,
                question: "Quel est le comportement attendu lors de la création d'une tâche dans TaskFlow ?",
                options: [
                  "Le frontend doit obligatoirement fournir l'identifiant et le statut.",
                  "Le backend doit attribuer un identifiant automatiquement et définir le statut initial à todo.",
                  "Le backend doit choisir aléatoirement un statut autorisé.",
                  "Le statut initial doit toujours être done."
                ],
                correctIndex: 1,
                explanation: "L'identifiant est généré automatiquement par le backend et le statut initial est obligatoirement todo."
              },
              {
                id: 3,
                question: "Quel code HTTP correspond à une tâche inexistante lors d'une demande de modification ?",
                options: [
                  "200",
                  "201",
                  "404",
                  "500"
                ],
                correctIndex: 2,
                explanation: "Le code HTTP 404 Not Found est le standard REST renvoyé lorsque la ressource ciblée par l'identifiant n'existe pas."
              },
              {
                id: 4,
                question: "Pourquoi séparer app.ts et server.ts dans l'organisation du backend ?",
                options: [
                  "Pour séparer la configuration de l'application du démarrage du serveur HTTP et faciliter les tests.",
                  "Pour stocker les tâches dans deux collections différentes.",
                  "Pour exécuter deux serveurs indépendants.",
                  "Pour remplacer Express par Vitest."
                ],
                correctIndex: 0,
                explanation: "app.ts exporte l'application Express configurée sans appeler listen(). Supertest peut ainsi l'injecter directement lors des tests d'intégration sans ouvrir de socket TCP réel."
              },
              {
                id: 5,
                question: "Quelles affirmations décrivent correctement le stockage en mémoire prévu pour TaskFlow ? (Sélectionnez la proposition exacte)",
                options: [
                  "Les données sont conservées dans une Map et le repository centralise les lectures/écritures.",
                  "Les données sont automatiquement persistées sur disque après arrêt du serveur.",
                  "Une base de données PostgreSQL externe est obligatoire pour le fonctionnement.",
                  "Le stockage en mémoire efface les tâches après chaque requête HTTP."
                ],
                correctIndex: 0,
                explanation: "TaskFlow utilise une collection Map<string, Task> en mémoire dans le repository. Les données disparaissent au redémarrage du processus, ce qui est le comportement voulu."
              },
              {
                id: 6,
                question: "Quelle est la différence entre Vitest et Supertest dans les exemples du chapitre ?",
                options: [
                  "Vitest définit les routes et Supertest compile TypeScript.",
                  "Vitest exécute les tests et Supertest facilite les requêtes HTTP de test vers l'application.",
                  "Vitest stocke les données et Supertest crée les identifiants.",
                  "Les deux outils ont exactement la même responsabilité."
                ],
                correctIndex: 1,
                explanation: "Vitest est le lanceur de tests (test runner). Supertest est le client de simulation HTTP permettant d'envoyer des requêtes à l'instance app Express."
              },
              {
                id: 7,
                question: "Dans TaskFlow, le changement de statut d'une tâche est une opération distincte de la modification de son titre et de sa description.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. La modification textuelle (PUT /api/tasks/:id) et le changement de statut (PATCH /api/tasks/:id/status) sont scindés pour éviter d'écraser involontairement l'état d'avancement."
              },
              {
                id: 8,
                question: "Une compilation TypeScript réussie suffit à démontrer que les six fonctionnalités du backend sont correctes.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. La compilation TypeScript garantit seulement la validité syntaxique et typée du code. Seuls des tests d'intégration réels permettent de prouver la conformité fonctionnelle."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
