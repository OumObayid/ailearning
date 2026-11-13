'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

interface FeTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
}

const STATUS_LABELS: Record<'todo' | 'in_progress' | 'done', string> = {
  todo: 'À faire',
  in_progress: 'En cours',
  done: 'Terminée'
};

export function Chapitre11Content() {
  const [tasks, setTasks] = useState<FeTask[]>([
    {
      id: 'task-101',
      title: 'Concevoir TaskForm.tsx',
      description: 'Gérer la saisie du titre et de la description',
      status: 'done'
    },
    {
      id: 'task-102',
      title: 'Créer le service taskApi.ts',
      description: 'Centraliser les requêtes fetch vers /api/tasks',
      status: 'in_progress'
    },
    {
      id: 'task-103',
      title: 'Implémenter TaskCounters.tsx',
      description: 'Afficher les compteurs dynamiques en temps réel',
      status: 'todo'
    }
  ]);

  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [networkSimulation, setNetworkSimulation] = useState<'nominal' | 'loading' | 'error'>('nominal');
  const [clientError, setClientError] = useState<string | null>(null);

  const counts = {
    todo: tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    if (networkSimulation === 'error') {
      setClientError('Erreur HTTP 500 : Impossible de joindre l\'API TaskFlow.');
      return;
    }

    if (!inputTitle.trim() || !inputDesc.trim()) {
      setClientError('Le titre et la description ne peuvent pas être vides.');
      return;
    }

    const newTask: FeTask = {
      id: `task-${Date.now().toString().slice(-3)}`,
      title: inputTitle.trim(),
      description: inputDesc.trim(),
      status: 'todo'
    };

    setTasks([newTask, ...tasks]);
    setInputTitle('');
    setInputDesc('');
  };

  const handleCycleStatus = (id: string) => {
    if (networkSimulation === 'error') {
      setClientError('Échec de mise à jour : serveur backend injoignable.');
      return;
    }
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next =
          t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'todo';
        return { ...t, status: next };
      })
    );
  };

  const handleDelete = (id: string) => {
    if (networkSimulation === 'error') {
      setClientError('Échec de suppression : serveur backend injoignable.');
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));
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
            Chapitre 10.11
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Développer le frontend avec les agents
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Construction de l&apos;interface React avec Vite et TypeScript : composant d&apos;orchestration <code>TasksPage</code>, formulaires, affichage des libellés français avec statuts techniques et service client HTTP <code>taskApi.ts</code>.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance : Les libellés d'affichage vs Données techniques">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Le frontend affiche des libellés conviviaux en français (<em>&quot;À faire&quot;</em>, <em>&quot;En cours&quot;</em>, <em>&quot;Terminée&quot;</em>) mais doit impérativement <strong>transmettre les clés techniques (<code>todo</code>, <code>in_progress</code>, <code>done</code>) au backend</strong>. De plus, <strong>aucun agent ni Team Leader n&apos;est autorisé à exécuter un merge ou push sans accord explicite et écrit du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Organisation des composants React */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              11.4. Hiérarchie et responsabilités des composants React
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Pour garantir la maintenabilité, chaque composant de TaskFlow a un rôle strictement délimité :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="layout" className="h-4 w-4 text-primary shrink-0" />
                <code>src/pages/TasksPage.tsx</code> — Coordinateur de la vue
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Maintient l&apos;état global de la page (<code>tasks</code>, <code>loading</code>, <code>error</code>, <code>counts</code>), déclenche les appels via <code>taskApi.ts</code> et distribue les props aux composants enfants.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-emerald-500 shrink-0" />
                <code>src/components/TaskCounters.tsx</code> — Compteurs dynamiques
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Affiche les totaux par statut calculés par le serveur. Reçoit directement l&apos;objet <code>&#123; todo, in_progress, done &#125;</code> sans refaire de calculs locaux erratiques.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="code" className="h-4 w-4 text-amber-500 shrink-0" />
                <code>src/components/TaskForm.tsx</code> — Formulaire de saisie
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Gère les inputs de titre et description. Valide que les champs ne sont pas vides avant de soumettre la demande au composant parent.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="layout" className="h-4 w-4 text-purple-500 shrink-0" />
                <code>src/components/TaskList.tsx</code> & <code>TaskItem.tsx</code> — Affichage des tâches
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Affiche la liste ou un message d&apos;état vide (<em>&quot;Aucune tâche pour le moment&quot;</em>) et les boutons d&apos;action (changer statut, modifier, supprimer).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Le service API client */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="server" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              11.6. Centralisation réseau avec taskApi.ts
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Au lieu d&apos;éparpiller des appels <code>fetch()</code> dans les composants, toutes les requêtes sont isolées dans un service dédié :
          </p>

          <pre className="p-3 rounded-lg bg-muted/30 font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap break-all">
{`// frontend/src/services/taskApi.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(\`\${API_URL}/api/tasks\`);
  if (!res.ok) throw new Error('Échec du chargement des tâches');
  return res.json();
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const res = await fetch(\`\${API_URL}/api/tasks\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error('Échec de la création');
  return res.json();
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const res = await fetch(\`\${API_URL}/api/tasks/\${id}/status\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Échec du changement de statut');
  return res.json();
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de l'interface React */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="layout" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
              Simulateur interactif : Application React TaskFlow en direct
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Testez la création, la modification de statut et observez comment l&apos;interface réagit face à une coupure réseau ou un état de chargement.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Sélecteur de condition réseau */}
          <div className="p-3 rounded-lg border border-border/40 bg-muted/20 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Icon name="server" className="h-4 w-4 text-primary shrink-0" />
              État de la connexion API :
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Button
                size="sm"
                variant={networkSimulation === 'nominal' ? 'default' : 'outline'}
                onClick={() => {
                  setNetworkSimulation('nominal');
                  setClientError(null);
                }}
                className="h-7 text-xs shrink-0"
              >
                Nominal (200 OK)
              </Button>
              <Button
                size="sm"
                variant={networkSimulation === 'loading' ? 'default' : 'outline'}
                onClick={() => {
                  setNetworkSimulation('loading');
                  setClientError(null);
                }}
                className="h-7 text-xs shrink-0"
              >
                Chargement (Loading)
              </Button>
              <Button
                size="sm"
                variant={networkSimulation === 'error' ? 'default' : 'outline'}
                onClick={() => {
                  setNetworkSimulation('error');
                  setClientError('Erreur de connexion au serveur backend.');
                }}
                className="h-7 text-xs shrink-0 text-rose-500"
              >
                Erreur Réseau (500)
              </Button>
            </div>
          </div>

          {/* Bannière d'erreur si présente */}
          {clientError && (
            <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-center gap-2 text-xs">
              <Icon name="info" className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{clientError}</span>
            </div>
          )}

          {/* Rendu simulé de TasksPage */}
          <div className="p-4 rounded-xl border border-primary/20 bg-background flex flex-col gap-4 shadow-sm">
            {/* Header + TaskCounters */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-foreground">TaskFlow</span>
                <Badge variant="outline" className="text-[10px]">React + TS</Badge>
              </div>

              {/* Compteurs dynamiques */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                  À faire : {counts.todo}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                  En cours : {counts.in_progress}
                </Badge>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                  Terminées : {counts.done}
                </Badge>
              </div>
            </div>

            {/* TaskForm */}
            <form onSubmit={handleCreate} className="flex flex-col gap-2 p-3 rounded-lg bg-muted/20 border border-border/40">
              <span className="text-xs font-semibold text-foreground">Créer une nouvelle tâche :</span>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Titre de la tâche..."
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  className="p-2 rounded bg-background border border-border/40 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Description..."
                  value={inputDesc}
                  onChange={(e) => setInputDesc(e.target.value)}
                  className="p-2 rounded bg-background border border-border/40 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end">
                <Button size="sm" type="submit" className="h-8 text-xs shrink-0 flex items-center gap-1">
                  <Icon name="sparkles" className="h-3.5 w-3.5 shrink-0" />
                  <span>Ajouter la tâche</span>
                </Button>
              </div>
            </form>

            {/* TaskList */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Liste des tâches :
              </span>

              {networkSimulation === 'loading' ? (
                <div className="p-6 rounded-lg border border-dashed border-border/50 text-center flex flex-col items-center gap-2 text-muted-foreground text-xs">
                  <Icon name="refresh" className="h-5 w-5 animate-spin text-primary" />
                  <span>Chargement des tâches depuis le backend...</span>
                </div>
              ) : tasks.length === 0 ? (
                <div className="p-6 rounded-lg border border-dashed border-border/50 text-center text-muted-foreground text-xs">
                  Aucune tâche pour le moment.
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg border border-border/50 bg-card flex flex-wrap items-center justify-between gap-2 shadow-xs"
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{task.title}</span>
                        <Badge
                          variant="secondary"
                          className={
                            task.status === 'done'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]'
                              : task.status === 'in_progress'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px]'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px]'
                          }
                        >
                          {STATUS_LABELS[task.status]} ({task.status})
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{task.description}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCycleStatus(task.id)}
                        className="h-7 text-[11px] px-2 flex items-center gap-1"
                      >
                        <Icon name="refresh" className="h-3 w-3 shrink-0" />
                        <span>Changer statut</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(task.id)}
                        className="h-7 text-[11px] px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                      >
                        <Icon name="trash" className="h-3 w-3 shrink-0" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
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
                question: "Quel est le rôle principal du service API dans le frontend TaskFlow ?",
                options: [
                  "Stocker définitivement les tâches.",
                  "Centraliser les communications HTTP avec le backend.",
                  "Remplacer les composants React.",
                  "Définir les règles métier du serveur."
                ],
                correctIndex: 1,
                explanation: "Le service API (taskApi.ts) centralise tous les appels HTTP fetch vers le serveur, évitant de disperser des requêtes réseau dans chaque composant."
              },
              {
                id: 2,
                question: "Pourquoi faut-il définir des types TypeScript pour les tâches ?",
                options: [
                  "Pour remplacer les réponses JSON du backend.",
                  "Pour éviter toutes les erreurs possibles à l'exécution.",
                  "Pour décrire la structure des données et faciliter leur utilisation dans le frontend.",
                  "Pour empêcher React de modifier son état."
                ],
                correctIndex: 2,
                explanation: "Les types TypeScript décrivent rigoureusement les données échangées et reçues, apportant de l'autocomplétion et la détection d'erreurs à la compilation."
              },
              {
                id: 3,
                question: "Lorsqu'une requête de création de tâche échoue, quel comportement est le plus approprié ?",
                options: [
                  "Afficher immédiatement un message de réussite et supprimer le formulaire.",
                  "Ajouter la tâche à la liste même si le backend a refusé la demande.",
                  "Informer l'utilisateur de l'erreur et conserver un état cohérent de l'interface.",
                  "Redémarrer automatiquement le backend."
                ],
                correctIndex: 2,
                explanation: "L'interface ne doit jamais prétendre qu'une tâche est créée sans confirmation serveur. Elle doit afficher un message d'erreur clair et laisser l'utilisateur réagir."
              },
              {
                id: 4,
                question: "Quelle est la responsabilité du composant TaskCounters ?",
                options: [
                  "Calculer les règles métier du backend.",
                  "Afficher les compteurs reçus du backend.",
                  "Enregistrer les tâches dans une base de données.",
                  "Modifier les endpoints REST."
                ],
                correctIndex: 1,
                explanation: "TaskCounters a pour unique responsabilité d'afficher les compteurs calculés et renvoyés par l'API backend."
              },
              {
                id: 5,
                question: "Quelles pratiques contribuent à une bonne organisation du frontend ? (Sélectionnez la proposition exacte)",
                options: [
                  "Regrouper les appels HTTP dans un service API et séparer les composants selon leurs responsabilités.",
                  "Placer tous les appels fetch et toute la logique métier dans un seul composant monolithique.",
                  "Envoyer directement les libellés français au backend sans mapping technique.",
                  "Désactiver TypeScript pour accélérer le développement."
                ],
                correctIndex: 0,
                explanation: "Une bonne architecture isole la communication HTTP dans un service API et découpe l'UI en composants aux responsabilités précises."
              },
              {
                id: 6,
                question: "Pourquoi faut-il coordonner la configuration CORS ou le proxy Vite avec Backend ?",
                options: [
                  "Pour permettre au navigateur d'effectuer les échanges entre des origines différentes selon la configuration choisie.",
                  "Pour remplacer les méthodes HTTP par des fonctions React.",
                  "Pour enregistrer les tâches directement dans Vite.",
                  "Pour supprimer le besoin de contrat API."
                ],
                correctIndex: 0,
                explanation: "Le navigateur bloque par défaut les requêtes entre deux ports différents (ex: localhost:5173 vers localhost:3001). Un proxy Vite ou des en-têtes CORS Express sont requis."
              },
              {
                id: 7,
                question: "Dans TaskFlow, les valeurs techniques todo, in_progress et done doivent être conservées pour les échanges avec le backend, même si l'interface affiche des libellés français.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Le contrat d'API attend les clés normalisées (todo, in_progress, done). Le frontend applique la traduction uniquement pour l'affichage humain."
              },
              {
                id: 8,
                question: "Un frontend qui affiche correctement les composants est nécessairement compatible avec le backend, même si les chemins et les formats des requêtes sont différents.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. L'apparence visuelle d'un composant ne prouve pas sa compatibilité réseau. Si les chemins d'API ou les formats JSON diffèrent, l'application échouera dès le premier échange."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
