'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur interactif : Console de Test d'API REST & Validation des Statuts
  const [selectedApiCase, setSelectedApiCase] = useState<'create_201' | 'create_bad_400' | 'patch_valid_200' | 'patch_invalid_400' | 'get_404' | 'delete_204'>('patch_valid_200');

  const apiCases = {
    create_201: {
      title: 'POST /api/tasks — Création d\'une nouvelle tâche',
      method: 'POST',
      url: '/api/tasks',
      curlCmd: `curl -i -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Écrire les tests d\\'API"}'`,
      supertestCode: `const res = await request(app)
  .post('/api/tasks')
  .send({ title: "Écrire les tests d'API" });
expect(res.status).toBe(201);
expect(res.body).toHaveProperty('id');
expect(res.body.status).toBe('todo');`,
      status: '201 Created',
      headers: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Content-Length: 78`,
      responseBody: `{
  "id": 4,
  "title": "Écrire les tests d'API",
  "status": "todo",
  "createdAt": "2026-11-12T23:59:00.000Z"
}`,
      rule: 'Selon la RFC HTTP et la convention TaskFlow, toute création réussie de ressource DOIT retourner 201 Created avec l\'entité créée et son identifiant attribué.'
    },
    create_bad_400: {
      title: 'POST /api/tasks — Validation du titre requis',
      method: 'POST',
      url: '/api/tasks',
      curlCmd: `curl -i -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title": ""}'`,
      supertestCode: `const res = await request(app)
  .post('/api/tasks')
  .send({ title: "" });
expect(res.status).toBe(400);
expect(res.body.error).toBe('Title is required');`,
      status: '400 Bad Request',
      headers: `HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 42`,
      responseBody: `{
  "error": "Bad Request",
  "message": "Title is required and cannot be empty"
}`,
      rule: 'Le client transmet des données invalides. Le serveur ne doit pas créer d\'enregistrement fantôme et doit expliciter l\'erreur avec 400.'
    },
    patch_valid_200: {
      title: 'PATCH /api/tasks/:id — Mutation nominale de statut',
      method: 'PATCH',
      url: '/api/tasks/1',
      curlCmd: `curl -i -X PATCH http://localhost:3000/api/tasks/1 \\
  -H "Content-Type: application/json" \\
  -d '{"status": "done"}'`,
      supertestCode: `const res = await request(app)
  .patch('/api/tasks/1')
  .send({ status: 'done' });
expect(res.status).toBe(200);
expect(res.body.status).toBe('done');`,
      status: '200 OK',
      headers: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 64`,
      responseBody: `{
  "id": 1,
  "title": "Initialiser le dépôt",
  "status": "done"
}`,
      rule: 'La mise à jour partielle réussie retourne 200 OK avec la ressource modifiée.'
    },
    patch_invalid_400: {
      title: 'PATCH /api/tasks/:id — Rejet d\'un statut non autorisé',
      method: 'PATCH',
      url: '/api/tasks/1',
      curlCmd: `curl -i -X PATCH http://localhost:3000/api/tasks/1 \\
  -H "Content-Type: application/json" \\
  -d '{"status": "random_status"}'`,
      supertestCode: `const res = await request(app)
  .patch('/api/tasks/1')
  .send({ status: 'random_status' });
expect(res.status).toBe(400);
expect(res.body.error).toBe('Invalid status');`,
      status: '400 Bad Request',
      headers: `HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
Content-Length: 85`,
      responseBody: `{
  "error": "Bad Request",
  "message": "Invalid status. Allowed values: 'todo', 'in_progress', 'done'"
}`,
      rule: 'Le contrat technique n\'autorise qu\'une liste blanche stricte. Tout autre terme doit être formellement rejeté avec 400 sans altérer l\'état persistant.'
    },
    get_404: {
      title: 'GET /api/tasks/:id — Recherche d\'un ID inexistant',
      method: 'GET',
      url: '/api/tasks/9999',
      curlCmd: `curl -i -X GET http://localhost:3000/api/tasks/9999`,
      supertestCode: `const res = await request(app)
  .get('/api/tasks/9999');
expect(res.status).toBe(404);
expect(res.body.error).toBe('Task not found');`,
      status: '404 Not Found',
      headers: `HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 38`,
      responseBody: `{
  "error": "Not Found",
  "message": "Task not found"
}`,
      rule: 'L\'accès à un identifiant inconnu doit retourner 404 Not Found et non pas 500 (erreur interne) ou 200 avec une valeur nulle.'
    },
    delete_204: {
      title: 'DELETE /api/tasks/:id — Suppression réussie sans corps',
      method: 'DELETE',
      url: '/api/tasks/2',
      curlCmd: `curl -i -X DELETE http://localhost:3000/api/tasks/2`,
      supertestCode: `const res = await request(app)
  .delete('/api/tasks/2');
expect(res.status).toBe(204);
expect(res.body).toEqual({});`,
      status: '204 No Content',
      headers: `HTTP/1.1 204 No Content
Content-Length: 0`,
      responseBody: `(Corps vide — Aucun contenu)`,
      rule: 'La suppression réussie d\'une ressource retourne 204 No Content sans corps de réponse.'
    }
  };

  const current = apiCases[selectedApiCase];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 7
          </span>
          <span className="text-xs text-muted-foreground">1 h de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Vérifier le fonctionnement des API
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          L'interface HTTP constitue le contrat technique entre le backend et le frontend. Une réponse avec un code 200 ne suffit pas à prouver qu'une opération est réussie. Maîtrisez la validation exhaustive des API REST : verbes HTTP, codes de statut normés (201, 204, 400, 404), structure des en-têtes et tests négatifs avec Supertest et curl.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & contrats d'interface</p>
        <p className="text-sm leading-relaxed">
          Aucun agent développeur ne peut modifier unilatéralement un contrat d'API (codes de réponse, noms de champs JSON, routes) sous prétexte de simplifier son implémentation. Toute divergence entre le code et la spécification technique constitue une <strong>anomalie majeure</strong> qui doit être corrigée côté code.
        </p>
      </Callout>

      {/* Section 1 : Le contrat REST et les statuts HTTP */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="globe" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>7.1 & 7.2 — Le contrat d'API REST de TaskFlow</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Les verbes et codes de statut applicables
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pour éviter les ambiguïtés entre l'agent Frontend et l'agent Backend, chaque opération est soumise à un contrat strict :
            </p>
            <div className="grid grid-cols-1 gap-2.5 mt-2 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-sky-400">GET /api/tasks</span>
                  <p className="text-muted-foreground mt-0.5">Consultation de la liste des tâches</p>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">200 OK</span>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-emerald-400">POST /api/tasks</span>
                  <p className="text-muted-foreground mt-0.5">Création d'une nouvelle tâche</p>
                </div>
                <div className="flex gap-1.5 font-mono text-[11px] font-bold">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">201 Created</span>
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400">400 Bad Req</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-amber-400">PATCH /api/tasks/:id</span>
                  <p className="text-muted-foreground mt-0.5">Modification partielle (statut : todo, in_progress, done)</p>
                </div>
                <div className="flex gap-1.5 font-mono text-[11px] font-bold">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">200 OK</span>
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400">400</span>
                  <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400">404 Not Found</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-rose-400">DELETE /api/tasks/:id</span>
                  <p className="text-muted-foreground mt-0.5">Suppression définitive d'une tâche</p>
                </div>
                <div className="flex gap-1.5 font-mono text-[11px] font-bold">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">204 No Content</span>
                  <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400">404</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Que vérifier dans une réponse HTTP ? */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-square" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>7.3 & 7.10 — Les 4 composantes à vérifier obligatoirement</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-emerald-400">1. Le Code de Statut HTTP</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vérifier que le statut correspond exactement à l'action. Renvoyer 200 lors d'une création au lieu de 201, ou 200 avec <code>{`{ error: "not found" }`}</code> au lieu d'un vrai 404, casse le comportement standard des clients HTTP comme Axios ou Fetch.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-sky-400">2. Les En-têtes (Headers)</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Contrôler la présence de <code>Content-Type: application/json; charset=utf-8</code>. Une réponse sans bon en-tête empêche le parsing automatique côté frontend.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-amber-400">3. Le Corps (Payload JSON)</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vérifier les types de données : un identifiant doit être conservé dans son format prévu (numérique ou chaîne UUID), les dates sérialisées en ISO-8601, et les objets imbriqués présents.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-1.5">
            <span className="text-xs font-bold text-purple-400">4. Les Tests Négatifs et Chemins d'Erreur</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Une API robuste se juge à sa gestion des entrées malveillantes ou erronées : corps JSON vide, types incompatibles, injection de chaînes inconnues. Le serveur ne doit jamais lever une exception 500 non gérée.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Vérification manuelle avec curl */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>7.13 — L'outil curl en ligne de commande pour l'audit direct</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <code>curl</code> est l'outil indispensable du QA et du Team Leader pour inspecter les réponses brutes d'une API sans passer par l'interface graphique :
          </p>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <code className="text-emerald-400 font-mono font-bold">curl -i</code>
              <span className="text-muted-foreground">Affiche les en-têtes HTTP de réponse (statut, Content-Type, etc.)</span>
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <code className="text-emerald-400 font-mono font-bold">curl -X &lt;METHOD&gt;</code>
              <span className="text-muted-foreground">Spécifie la méthode (POST, PATCH, DELETE, PUT)</span>
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <code className="text-emerald-400 font-mono font-bold">-H "Content-Type: application/json"</code>
              <span className="text-muted-foreground">Informe le serveur du format du corps envoyé</span>
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <code className="text-emerald-400 font-mono font-bold">-d '&#123; "key": "val" &#125;'</code>
              <span className="text-muted-foreground">Transmet le corps (payload) JSON</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Atelier Interactif — Console d'Audit d'API REST (curl & Supertest)</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sélectionnez un scénario d'appel d'API. Examinez la commande <code>curl</code> équivalente, le test automatisé <code>Supertest</code> et le paquet HTTP complet retourné par le serveur.
          </p>

          {/* Boutons scénarios */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedApiCase('patch_valid_200')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                selectedApiCase === 'patch_valid_200'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              PATCH /api/tasks/1 (statut: "done") &rarr; 200 OK
            </button>

            <button
              onClick={() => setSelectedApiCase('create_201')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                selectedApiCase === 'create_201'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              POST /api/tasks (titre valide) &rarr; 201 Created
            </button>

            <button
              onClick={() => setSelectedApiCase('patch_invalid_400')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                selectedApiCase === 'patch_invalid_400'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              PATCH /api/tasks/1 (statut inconnu) &rarr; 400 Bad Request
            </button>

            <button
              onClick={() => setSelectedApiCase('create_bad_400')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                selectedApiCase === 'create_bad_400'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              POST /api/tasks (titre vide) &rarr; 400 Bad Request
            </button>

            <button
              onClick={() => setSelectedApiCase('get_404')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                selectedApiCase === 'get_404'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              GET /api/tasks/9999 (ID inconnu) &rarr; 404 Not Found
            </button>

            <button
              onClick={() => setSelectedApiCase('delete_204')}
              className={`text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                selectedApiCase === 'delete_204'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              DELETE /api/tasks/2 &rarr; 204 No Content
            </button>
          </div>

          {/* Affichage des détails */}
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-lg bg-black/40 border border-border flex flex-col gap-1.5">
              <span className="text-[11px] font-mono text-muted-foreground font-semibold">Commande curl correspondante :</span>
              <pre className="font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed">
                {current.curlCmd}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-border flex flex-col gap-1.5">
              <span className="text-[11px] font-mono text-muted-foreground font-semibold">Test Supertest équivalent :</span>
              <pre className="font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {current.supertestCode}
              </pre>
            </div>

            {/* Réponse brute */}
            <div className="p-3.5 rounded-lg bg-black/70 border border-border flex flex-col gap-2 font-mono text-xs">
              <span className="text-[11px] text-muted-foreground font-semibold">En-têtes HTTP & Réponse du Serveur :</span>
              <pre className="text-amber-300/90 overflow-x-auto whitespace-pre-wrap leading-relaxed text-[11px]">
                {current.headers}
              </pre>
              <pre className="text-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed text-xs border-t border-border/40 pt-2">
                {current.responseBody}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground font-sans">
              <strong className="text-foreground">Règle de conformité contractuelle :</strong> {current.rule}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>7.18 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 7 : Vérifier le fonctionnement des API"
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal d'une API REST ?",
              options: [
                "Gérer directement les commits Git.",
                "Remplacer le langage TypeScript.",
                "Permettre à des applications de communiquer à travers des échanges HTTP.",
                "Compiler automatiquement le frontend."
              ],
              correctIndex: 2,
              explanation: "Une API REST standardise la communication entre applications ou composants au moyen des requêtes et réponses HTTP."
            },
            {
              id: 2,
              question: "Quelle méthode HTTP est adaptée à la création d'une nouvelle tâche ?",
              options: [
                "GET",
                "POST",
                "DELETE",
                "PATCH"
              ],
              correctIndex: 1,
              explanation: "POST est la méthode conventionnelle pour créer une nouvelle ressource dans une architecture REST."
            },
            {
              id: 3,
              question: "Dans le contrat proposé pour TaskFlow, quel code HTTP indique une création réussie ?",
              options: [
                "201",
                "204",
                "400",
                "404"
              ],
              correctIndex: 0,
              explanation: "Le code 201 Created indique que la création de la ressource a réussi et qu'un nouvel identifiant lui a été attribué."
            },
            {
              id: 4,
              question: "Quel code HTTP correspond à une ressource inexistante dans le contrat proposé ?",
              options: [
                "200",
                "201",
                "400",
                "404"
              ],
              correctIndex: 3,
              explanation: "Le code 404 Not Found signale au client que la ressource demandée (ex: ID de tâche inexistant) est introuvable."
            },
            {
              id: 5,
              question: "Quel élément permet au Backend de recevoir les données JSON d'une requête POST ?",
              options: [
                "Le message de log du serveur.",
                "Le corps de la requête.",
                "Le nom du fichier TypeScript.",
                "L'historique Git."
              ],
              correctIndex: 1,
              explanation: "Les données transmises lors d'une requête POST transitent dans le corps (body) de la requête HTTP, analysé par express.json()."
            },
            {
              id: 6,
              question: "Pourquoi faut-il vérifier le corps de la réponse et pas seulement son code HTTP ?",
              options: [
                "Parce qu'un code HTTP réussi ne garantit pas que les données retournées sont correctes.",
                "Parce que le code HTTP ne peut jamais être utilisé dans les tests.",
                "Parce que le corps de réponse contient toujours les erreurs du serveur.",
                "Parce que les réponses HTTP ne possèdent pas de statut."
              ],
              correctIndex: 0,
              explanation: "Un code 200 indique simplement que le serveur a répondu sans crash. Il faut inspecter le corps JSON pour s'assurer que les données sont exactes."
            },
            {
              id: 7,
              question: "Quelles vérifications sont pertinentes pour tester une route API ?",
              options: [
                "Vérifier le code HTTP retourné, le corps de la réponse et les effets de bord sur les données.",
                "Modifier les attentes du test sans examiner le comportement réel.",
                "Vérifier uniquement le nom du fichier contrôleur.",
                "Supprimer les vérifications d'erreur 4xx."
              ],
              correctIndex: 0,
              explanation: "Un test complet d'API vérifie le statut HTTP, le format et le contenu du JSON retourné, ainsi que la persistance effective des modifications."
            },
            {
              id: 8,
              question: "Quel est l'intérêt de curl ?",
              options: [
                "Remplacer le service métier.",
                "Compiler automatiquement une application React.",
                "Envoyer des requêtes HTTP depuis la ligne de commande.",
                "Réinitialiser automatiquement le stockage en mémoire."
              ],
              correctIndex: 2,
              explanation: "curl permet d'émettre directement des requêtes HTTP depuis un terminal pour auditer les réponses brutes d'une API."
            },
            {
              id: 9,
              question: "Une requête PATCH transmet un statut invalide. Quel comportement est attendu selon le contrat proposé ?",
              options: [
                "Modifier la tâche avec une valeur inconnue.",
                "Refuser la requête avec le statut 400 et ne pas modifier la tâche.",
                "Retourner systématiquement 200.",
                "Supprimer automatiquement la tâche."
              ],
              correctIndex: 1,
              explanation: "Le contrat impose de refuser toute valeur non autorisée avec un code 400 Bad Request, sans effectuer de mutation sur la tâche."
            },
            {
              id: 10,
              question: "Un test automatisé vérifie avec succès la route GET /api/tasks. Quelle conclusion peut-on tirer ?",
              options: [
                "Toutes les opérations CRUD sont nécessairement correctes.",
                "L'ensemble du Backend est validé.",
                "Toutes les routes sont accessibles et conformes.",
                "Le scénario vérifié satisfait les assertions définies, mais les autres comportements doivent être testés séparément."
              ],
              correctIndex: 3,
              explanation: "La validation d'une route spécifique ne préjuge en rien de la validité des autres routes (POST, PATCH, DELETE) qui doivent être testées indépendamment."
            }
          ]}
        />
      </div>
    </div>
  );
};
