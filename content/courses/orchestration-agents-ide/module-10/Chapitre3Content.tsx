'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  // Simulateur interactif : Flux d'Architecture en Couches TaskFlow
  const [activeLayer, setActiveLayer] = useState<'frontend' | 'route' | 'controller' | 'service' | 'repository'>('service');

  const layerDetails = {
    frontend: {
      name: '1. Couche Frontend (React + TypeScript)',
      file: 'frontend/src/services/taskApi.ts',
      role: 'Interactions utilisateur et appels HTTP avec fetch.',
      snippet: `export function updateStatus(id: string, status: TaskStatus) {
  return fetch(\`/api/tasks/\${id}/status\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  }).then(r => r.json());
}`,
      notes: 'Centralise les appels réseau. Aucun composant React ne fait d\'appel fetch direct.'
    },
    route: {
      name: '2. Couche Routes Express (Points d\'entrée HTTP)',
      file: 'backend/src/routes/taskRoutes.ts',
      role: 'Associe la méthode HTTP et le chemin au contrôleur correspondant.',
      snippet: `import { Router } from 'express';
import { updateStatusController } from '../controllers/taskController.js';

export const taskRouter = Router();
taskRouter.patch('/:id/status', updateStatusController);`,
      notes: 'Ne contient AUCUNE règle métier : uniquement le routage d\'URL.'
    },
    controller: {
      name: '3. Couche Contrôleurs (Adaptateur HTTP & DTO)',
      file: 'backend/src/controllers/taskController.ts',
      role: 'Extrait les paramètres de requête, valide le format et prépare la réponse HTTP.',
      snippet: `export async function updateStatusController(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await taskService.updateStatus(id, status);
  if (!updated) return res.status(404).json({ error: "Task not found" });
  return res.status(200).json(updated);
}`,
      notes: 'Gère les codes de statut HTTP (200, 400, 404, 500) et le format JSON.'
    },
    service: {
      name: '4. Couche Service Métier (Logique Fonctionnelle)',
      file: 'backend/src/services/taskService.ts',
      role: 'Applique strictement les règles de gestion (statuts autorisés, titres non vides).',
      snippet: `export function updateStatus(id: string, status: unknown): Task | null {
  if (!['todo', 'in_progress', 'done'].includes(status as string)) {
    throw new BadRequestError("Statut invalide");
  }
  return taskRepository.updateStatus(id, status as TaskStatus);
}`,
      notes: 'Totalement indépendant du protocole HTTP. Peut être testé unitairement sans serveur.'
    },
    repository: {
      name: '5. Couche Repository (Stockage en Mémoire)',
      file: 'backend/src/repositories/taskRepository.ts',
      role: 'Accès direct et manipulation des données dans la Map JavaScript en mémoire.',
      snippet: `const tasks = new Map<string, Task>();

export const taskRepository = {
  findById: (id: string) => tasks.get(id) || null,
  save: (task: Task) => { tasks.set(task.id, task); return task; },
  clear: () => tasks.clear() // Utilisé pour isoler les tests
};`,
      notes: 'Ne prend aucune décision fonctionnelle. Fournit les méthodes CRUD de base.'
    }
  };

  const current = layerDetails[activeLayer];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 10 • Chapitre 3
          </span>
          <span className="text-xs text-muted-foreground">1 h de lecture & architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Définir l'architecture technique de TaskFlow
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Une architecture saine évite que les agents Backend et Frontend se marchent sur les pieds. Découvrez le découpage en couches de TaskFlow : séparation de l'interface React et du serveur Express, organisation en 4 responsabilités (Routes, Contrôleurs, Services, Repository) et contrat d'API REST standardisé.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & contrats d'interface</p>
        <p className="text-sm leading-relaxed">
          Le contrat d'API REST (routes, verbes, codes HTTP et schémas JSON) est une décision architecturale engageant l'ensemble de l'équipe. <strong>Aucun agent ne peut modifier un endpoint de son propre chef</strong>. Tout changement d'interface doit être validé par l'Agent Architecte et approuvé par le <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Le modèle client-serveur et les 2 blocs */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>10.3.1 à 10.3.4 — L'organisation Client-Serveur et le contrat REST</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Séparation stricte des deux univers
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pour permettre à l'agent Frontend et à l'agent Backend de travailler en parallèle dans des répertoires étanches (worktrees), l'application est découpée en deux paquets autonomes dialoguant exclusivement via HTTP/JSON :
            </p>
            <div className="grid grid-cols-1 gap-2.5 mt-2 text-xs">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
                <span className="font-bold text-blue-400">Frontend (Client React + Vite) :</span>
                <p className="text-muted-foreground">Présentation graphique, réactivité utilisateur et formulaires. Isole ses appels réseau dans un dossier <code>services/taskApi.ts</code>.</p>
              </div>

              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
                <span className="font-bold text-purple-400">Backend (Serveur Express + Node.js) :</span>
                <p className="text-muted-foreground">Vérification des entrées, garant des règles métier et stockage volatile en mémoire (Map). Isole la configuration dans <code>app.ts</code> du démarrage réseau dans <code>server.ts</code>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Les 6 endpoints officiels */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="globe" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>10.3.6 — Les 6 routes officielles de l'API REST TaskFlow</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 text-xs leading-relaxed">
          <div className="grid grid-cols-1 gap-2">
            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <code className="text-sky-400 font-bold font-mono">GET /api/tasks</code>
                <p className="text-muted-foreground">Récupère toutes les tâches</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">200 OK</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <code className="text-emerald-400 font-bold font-mono">POST /api/tasks</code>
                <p className="text-muted-foreground">Créer une tâche avec titre et description</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">201 Created</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <code className="text-amber-400 font-bold font-mono">PUT /api/tasks/:id</code>
                <p className="text-muted-foreground">Modifier titre et description (ne modifie pas le statut)</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">200 OK</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <code className="text-indigo-400 font-bold font-mono">PATCH /api/tasks/:id/status</code>
                <p className="text-muted-foreground">Changer le statut vers todo, in_progress ou done</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">200 OK</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <code className="text-rose-400 font-bold font-mono">DELETE /api/tasks/:id</code>
                <p className="text-muted-foreground">Supprimer une tâche existante</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">204 No Content</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <code className="text-purple-400 font-bold font-mono">GET /api/tasks/counts</code>
                <p className="text-muted-foreground">Récupère les compteurs par statut (todo, in_progress, done)</p>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">200 OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Atelier Interactif — Découpage Architectural en 5 Couches</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Cliquez sur l'une des couches logiques de TaskFlow pour visualiser son rôle, son fichier d'implémentation et ses responsabilités strictes.
          </p>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {(['frontend', 'route', 'controller', 'service', 'repository'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`py-1.5 px-3 rounded font-semibold transition-all ${
                  activeLayer === layer ? 'bg-emerald-600 text-white shadow' : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {layerDetails[layer].name.split('(')[0]}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="font-bold text-foreground text-sm">{current.name}</span>
              <code className="text-[11px] font-mono text-sky-400">{current.file}</code>
            </div>

            <p className="text-foreground font-medium">{current.role}</p>

            <pre className="p-3 rounded bg-black/60 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {current.snippet}
            </pre>

            <div className="p-2.5 rounded bg-muted/40 border border-border text-xs text-muted-foreground font-sans">
              <strong>Règle d'architecture :</strong> {current.notes}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel du chapitre 3 */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Quiz d'évaluation — Chapitre 3</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 3 : Architecture technique"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de l'architecture technique ?",
              options: [
                "Décrire l'organisation technique des composants de l'application.",
                "Définir uniquement les besoins des utilisateurs.",
                "Remplacer les spécifications fonctionnelles.",
                "Décrire uniquement les scénarios de test."
              ],
              correctIndex: 0,
              explanation: "L'architecture décrit l'assemblage technique, les responsabilités des modules et les protocoles de communication."
            },
            {
              id: 2,
              question: "Dans l'architecture proposée pour TaskFlow, quelle technologie est utilisée pour développer le frontend ?",
              options: [
                "Express.",
                "React.",
                "Supertest.",
                "Node.js uniquement."
              ],
              correctIndex: 1,
              explanation: "React (avec Vite et TypeScript) est la bibliothèque choisie pour construire l'interface client de TaskFlow."
            },
            {
              id: 3,
              question: "Quel est le rôle principal du backend dans TaskFlow ?",
              options: [
                "Afficher directement les formulaires à l'utilisateur.",
                "Appliquer les règles métier et traiter les demandes reçues.",
                "Remplacer le navigateur de l'utilisateur.",
                "Stocker les données uniquement dans les composants React."
              ],
              correctIndex: 1,
              explanation: "Le backend applique les règles métier, valide les données, gère le stockage en mémoire et répond aux requêtes HTTP."
            },
            {
              id: 4,
              question: "Comment le frontend et le backend communiquent-ils dans l'architecture proposée ?",
              options: [
                "Par des fichiers texte échangés manuellement.",
                "Par des requêtes HTTP et des réponses contenant des données JSON.",
                "Par des captures d'écran.",
                "Par des modifications directes des fichiers TypeScript de l'autre partie."
              ],
              correctIndex: 1,
              explanation: "Les deux briques communiquent via une API REST en échangeant des requêtes et réponses au format standard JSON."
            },
            {
              id: 5,
              question: "Quel composant doit principalement appliquer les règles métier dans l'organisation proposée du backend ?",
              options: [
                "Le service.",
                "La route.",
                "Le fichier de configuration Vite.",
                "Le composant React."
              ],
              correctIndex: 0,
              explanation: "La couche Service regroupe l'ensemble des règles métier, isolée du routage HTTP et du stockage brut."
            },
            {
              id: 6,
              question: "Quelles responsabilités correspondent au repository dans l'architecture proposée ?",
              options: [
                "Fournir les opérations d'accès aux données (lecture, écriture, recherche) au service.",
                "Définir les règles d'affichage des formulaires React.",
                "Gérer les sessions utilisateurs sur les réseaux sociaux.",
                "Remplacer le compilateur TypeScript."
              ],
              correctIndex: 0,
              explanation: "Le repository encapsule le stockage (ici en mémoire) et fournit des fonctions simples de persistance au service."
            },
            {
              id: 7,
              question: "Dans TaskFlow, le stockage en mémoire garantit que les tâches restent disponibles après chaque redémarrage du backend.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : le stockage en mémoire est volatile. Tout redémarrage du serveur réinitialise la collection des tâches."
            },
            {
              id: 8,
              question: "Supertest peut être utilisé pour vérifier les réponses HTTP de l'application Express.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : Supertest permet d'émettre des requêtes HTTP de test contre l'application Express sans ouvrir de socket réel."
            }
          ]}
        />
      </div>
    </div>
  );
};
