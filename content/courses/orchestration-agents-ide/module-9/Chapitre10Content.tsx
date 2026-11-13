'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  // Simulateur interactif : Banc d'Intégration & Release Finale (11 Missions)
  const [activeMission, setActiveMission] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du TP */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400 shrink-0">
            Module 9 • TP Final Pratique
          </span>
          <span className="text-xs text-muted-foreground">1 h 30 d'atelier pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          TP — Organiser l'intégration contrôlée et préparer la livraison de TaskFlow
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          En tant que <strong>Team Leader IA</strong>, vous devez orchestrer la phase finale de TaskFlow : auditer l'état initial des branches, ordonnancer les Pull Requests, arbitrer un conflit sur les types partagés, exécuter les suites de tests post-intégration, contrôler les permissions de sécurité et soumettre le dossier de release au Project Manager humain.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance absolue pour le TP</p>
        <p className="text-sm leading-relaxed">
          Dans le cadre de ce TP, <strong>aucun merge, rebase ou push vers la branche de référence ou le dépôt distant ne doit être réalisé sans l'accord écrit explicite du Project Manager humain</strong>. Préparer une intégration consiste à réunir les preuves et à proposer une décision, sans jamais outrepasser son mandat.
        </p>
      </Callout>

      {/* Présentation du contexte et de l'équipe */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="briefcase" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Mise en situation : L'équipe TaskFlow et les 4 livrables candidats</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            TaskFlow est une application fullstack développée en React, Vite, Node.js, Express et TypeScript, utilisant un stockage en mémoire et testée via Vitest et Supertest. Quatre contributions ont été soumises pour clôturer la version 1.0.0 :
          </p>
          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
              <span className="font-bold text-blue-400 font-mono">1. Contribution Backend (feature/backend-tasks)</span>
              <p className="text-muted-foreground">Routes REST complètes (CRUD + statut) et logique métier.</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
              <span className="font-bold text-purple-400 font-mono">2. Contribution Frontend (feature/frontend-tasks)</span>
              <p className="text-muted-foreground">Composants de cartes, listes, formulaires et compteurs dynamiques.</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
              <span className="font-bold text-emerald-400 font-mono">3. Contribution QA (test/qa-tasks)</span>
              <p className="text-muted-foreground">Suites automatisées Vitest et scénarios de non-régression Supertest.</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col gap-1">
              <span className="font-bold text-amber-400 font-mono">4. Contribution Documentation (docs/taskflow)</span>
              <p className="text-muted-foreground">Guide d'installation <code>npm ci</code>, scripts de démarrage et limites mémoire.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Déroulé guidé des 11 missions */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="list" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Atelier Interactif — Déroulé des 11 Missions de Clôture</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          {/* Navigation flexible entre les 11 missions */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-xs font-semibold text-muted-foreground">Sélectionnez une mission du TP :</span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMission(m)}
                  className={`py-2 px-3 text-center rounded font-semibold text-xs transition-all ${
                    activeMission === m
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-muted/40 text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Mission {m}
                </button>
              ))}
            </div>
          </div>

          {/* Détails de la mission active */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs leading-relaxed">
            {activeMission === 1 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 1 — Examiner l'état initial du dépôt</span>
                <p className="text-muted-foreground">
                  Établissez la situation de référence sans modifier le dépôt. Utilisez <code>git status</code>, <code>git branch -vv</code>, <code>git log --oneline --graph --decorate --all</code> et <code>git fetch</code>.
                </p>
                <div className="p-3 rounded bg-black/60 font-mono text-[11px] text-sky-300">
                  $ git status<br />
                  On branch develop (Branche cible confirmée)<br />
                  Your branch is up to date with 'origin/develop'.<br />
                  nothing to commit, working tree clean
                </div>
              </div>
            )}

            {activeMission === 2 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 2 — Examiner les contributions et leurs dépendances</span>
                <p className="text-muted-foreground">
                  Analysez les diffs avec <code>git diff develop...feature/xxx</code>. Déterminez l'ordre logique d'intégration :
                </p>
                <div className="p-3 rounded bg-black/60 font-mono text-[11px] text-emerald-400">
                  Séquencement retenu :<br />
                  1. Backend (Fournit le contrat REST)<br />
                  2. Frontend (Consomme l'API)<br />
                  3. QA (Valide les interactions combinées)<br />
                  4. Documentation (Finalise le README sur la base stabilisée)
                </div>
              </div>
            )}

            {activeMission === 3 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 3 — Organiser les demandes de fusion</span>
                <p className="text-muted-foreground">
                  Formalisez les fiches de Pull Request avec le rapport de relecture de l'agent Reviewer et le procès-verbal de test de l'agent QA.
                </p>
              </div>
            )}

            {activeMission === 4 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 4 — Gérer le conflit d'intégration sur src/types/task.ts</span>
                <p className="text-muted-foreground">
                  Les deux branches modifient la définition de <code>TaskStatus</code>. Vous arbitrez en faveur du contrat officiel de TaskFlow : <code>"todo" | "in_progress" | "done"</code>. Vous nettoyez les marqueurs et vérifiez avec <code>{"git grep -n -E '^(<<<<<<<|=======|>>>>>>>)'"}</code>.
                </p>
              </div>
            )}

            {activeMission === 5 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 5 — Contrôler le dépôt après intégration</span>
                <p className="text-muted-foreground">
                  Vérifiez la structure du dépôt post-merge avec <code>git log -10 --oneline --graph</code> et <code>git diff --check</code> pour écarter tout artefact parasite.
                </p>
              </div>
            )}

            {activeMission === 6 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 6 — Exécuter les tests techniques et fonctionnels</span>
                <p className="text-muted-foreground">
                  Lancez la vérification complète : <code>npx tsc --noEmit</code>, <code>npm run lint</code>, <code>npx vitest run</code> et parcourez les 6 fonctionnalités TaskFlow (Création, Affichage, Modification, Suppression, Statut, Comptage).
                </p>
              </div>
            )}

            {activeMission === 7 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 7 — Contrôler les permissions et les secrets</span>
                <p className="text-muted-foreground">
                  Auditez les règles <code>.gitignore</code> (présence de <code>.env*</code>), vérifiez qu'aucun token d'API n'a fuité dans l'historique et verrouillez les branches protégées.
                </p>
              </div>
            )}

            {activeMission === 8 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 8 — Identifier la version à livrer</span>
                <p className="text-muted-foreground">
                  Capturez le hash SHA du commit de tête avec <code>git rev-parse HEAD</code> et préparez la proposition de tag annoté <code>v1.0.0</code>.
                </p>
              </div>
            )}

            {activeMission === 9 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 9 — Préparer le dossier de livraison</span>
                <p className="text-muted-foreground">
                  Rédigez le <code>README.md</code> exhaustif : commandes d'installation <code>npm ci</code>, démarrage en parallèle, et avertissement explicite sur le stockage mémoire volatile.
                </p>
              </div>
            )}

            {activeMission === 10 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 10 — Organiser la rétrospective d'équipe</span>
                <p className="text-muted-foreground">
                  Identifiez les points forts et difficultés, remontez aux causes racines et formulez le plan d'amélioration pour le sprint suivant.
                </p>
              </div>
            )}

            {activeMission === 11 && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground text-sm">Mission 11 — Préparer la décision de livraison pour le PM</span>
                <p className="text-muted-foreground">
                  Consolidez l'ensemble des 10 fiches de preuves et soumettez la recommandation formelle d'arbitrage au Project Manager humain.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grille d'évaluation officielle sur 100 points */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="award" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Barème & Grille d'évaluation officielle (100 Points)</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">1. Analyse de l'état initial et préparation Git</strong>
                <p className="text-muted-foreground">Vérification du dépôt, des branches et de la synchronisation distante</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">2. Analyse des contributions et des dépendances</strong>
                <p className="text-muted-foreground">Examen des diffs et justification rationnelle de l'ordre d'intégration</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">3. Organisation des revues et validations</strong>
                <p className="text-muted-foreground">Qualité des dossiers de Pull Request et articulation Reviewer/QA</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">4. Analyse et résolution des conflits</strong>
                <p className="text-muted-foreground">Arbitrage conforme au contrat, nettoyage des marqueurs et contrôle</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">5. Vérifications post-intégration</strong>
                <p className="text-muted-foreground">Inspection du dépôt commun et absence d'artefacts non maîtrisés</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">6. Tests techniques et fonctionnels</strong>
                <p className="text-muted-foreground">Exécution réelle de Vitest/Supertest et validation des 6 parcours TaskFlow</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">15 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">7. Gestion des permissions et des risques</strong>
                <p className="text-muted-foreground">Moindre privilège, protection des branches et étanchéité des secrets</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">8. Préparation de la version et dossier de livraison</strong>
                <p className="text-muted-foreground">Tag sémantique, README complet et mention des limites mémoire</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">9. Rétrospective et plan d'amélioration</strong>
                <p className="text-muted-foreground">Analyse causale des 5 Pourquoi et actions correctives assignées</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">10 pts</span>
            </div>

            <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <strong className="text-foreground">10. Qualité du rapport final et traçabilité</strong>
                <p className="text-muted-foreground">Clarté, rigueur factuelle et respect souverain du Project Manager</p>
              </div>
              <span className="font-bold text-indigo-400 shrink-0">5 pts</span>
            </div>
          </div>

          <div className="mt-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex flex-col gap-1 text-xs">
            <span className="font-bold text-rose-400">⚠️ Fautes éliminatoires directes :</span>
            <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
              <li>Exécuter un merge, rebase ou push sauvage sans autorisation du PM</li>
              <li>Inventer des résultats de tests non exécutés</li>
              <li>Laisser des marqueurs de conflit dans le code livré</li>
              <li>Exposer des clés secrètes ou identifiants dans le dépôt public</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Corrigé type complet dépliable */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all text-left"
        >
          <span className="font-bold text-foreground text-sm flex items-center gap-2">
            <Icon name="file-text" className="w-5 h-5 text-indigo-500 shrink-0" />
            Consulter le Corrigé Détaillé de Référence du TP
          </span>
          <span className="text-xs text-indigo-400 font-semibold">{showSolution ? 'Masquer le corrigé' : 'Afficher le corrigé'}</span>
        </button>

        {showSolution && (
          <div className="p-5 rounded-xl border border-indigo-500/30 bg-card flex flex-col gap-4 text-xs leading-relaxed">
            <h3 className="font-bold text-base text-foreground">Dossier de Recette Final — Recommandation du Team Leader pour TaskFlow v1.0.0</h3>

            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">1. État d'intégration des branches</span>
                <p className="text-muted-foreground">
                  Les contributions Backend (API) et Frontend (UI) ont été réunies sur la branche <code>develop</code> selon l'ordonnancement validé. Le conflit sur <code>src/types/task.ts</code> a été résolu conformément au contrat officiel (<code>todo | in_progress | done</code>).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">2. Preuves de vérification post-intégration</span>
                <p className="text-muted-foreground">
                  - <strong>TypeScript :</strong> <code>npx tsc --noEmit</code> &rarr; 0 erreur.<br />
                  - <strong>Vitest :</strong> 100% de succès sur les suites unitaires, d'intégration et de non-régression (0 échec).<br />
                  - <strong>Sécurité :</strong> Contrôle <code>.gitignore</code> validé, 0 secret commité.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="font-bold text-foreground">3. Version et documentation</span>
                <p className="text-muted-foreground">
                  Commit de référence identifié : SHA figé. Tag proposé : <code>v1.0.0</code>.<br />
                  Fichier <code>README.md</code> rédigé avec mention explicite du stockage volatil en mémoire.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1 text-emerald-300">
                <span className="font-bold">4. Proposition de décision souveraine</span>
                <p className="leading-relaxed">
                  <strong>Recommandation du Team Leader :</strong> Avis Favorable pour la livraison de la version 1.0.0 de TaskFlow. Le dossier de recette est transmis pour décision finale et signature au <strong>Project Manager humain</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz de synthèse du TP */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Évaluation de synthèse du TP</span>
        </h2>
        <QuickQuiz
          title="Évaluation des compétences — TP Module 9 : Intégration et livraison"
          questions={[
            {
              id: 1,
              question: "Quelle commande permet d'actualiser les références distantes du dépôt sans modifier les fichiers de travail ?",
              options: [
                "git pull --all",
                "git fetch",
                "git merge origin/main",
                "git reset --hard"
              ],
              correctIndex: 1,
              explanation: "git fetch met à jour les informations distantes sans toucher aux fichiers locaux ni déclencher de fusion automatique."
            },
            {
              id: 2,
              question: "Pourquoi est-il crucial d'intégrer la contribution Backend avant la contribution Frontend dans TaskFlow ?",
              options: [
                "Parce que le backend met toujours moins de temps à compiler.",
                "Parce que le frontend consomme les routes et formats de données définis par le contrat d'API backend.",
                "Parce que Git refuse de fusionner le frontend en premier.",
                "Parce que l'agent Frontend est hiérarchiquement subordonné à l'agent Backend."
              ],
              correctIndex: 1,
              explanation: "La relation client-serveur impose de stabiliser le contrat de données en premier pour que le client s'y conforme."
            },
            {
              id: 3,
              question: "Dans un conflit de fusion Git, que délimite le bloc entre <<<<<<< HEAD et ======= ?",
              options: [
                "Les modifications apportées par la branche en cours de fusion.",
                "La version présente dans la branche courante locale.",
                "Le code de la prochaine version majeure.",
                "Une suggestion automatique générée par l'IDE."
              ],
              correctIndex: 1,
              explanation: "Le premier segment délimite le code de la branche locale courante (HEAD) avant le séparateur d'égalité."
            },
            {
              id: 4,
              question: "Quelle commande permet de vérifier qu'aucun marqueur de conflit n'est resté dans le code source ?",
              options: [
                "git grep -n -E '^(<<<<<<<|=======|>>>>>>>)'",
                "git diff --stat",
                "git branch --show-current",
                "git merge --abort"
              ],
              correctIndex: 0,
              explanation: "Cette expression régulière recherche les marqueurs de conflit textuels dans tous les fichiers suivis."
            },
            {
              id: 5,
              question: "Dans le cadre de la sécurité de TaskFlow, que doit-on faire si une clé d'API a été accidentellement commitée ?",
              options: [
                "Ajouter le fichier à .gitignore et faire un nouveau commit.",
                "Supprimer le fichier avec git rm et penser que c'est réglé.",
                "Révoquer immédiatement le secret auprès du fournisseur d'API et le renouveler.",
                "Désactiver les tests de sécurité."
              ],
              correctIndex: 2,
              explanation: "Un secret présent dans l'historique Git doit être révoqué immédiatement car il est considéré comme compromis."
            },
            {
              id: 6,
              question: "Quelle commande npm permet d'installer les dépendances en respectant strictement le fichier package-lock.json ?",
              options: [
                "npm install --save-dev",
                "npm update",
                "npm ci",
                "npm publish"
              ],
              correctIndex: 2,
              explanation: "npm ci (Clean Install) garantit une installation déterministe et reproductible basée exclusivement sur le lockfile."
            },
            {
              id: 7,
              question: "Pourquoi le README de TaskFlow doit-il obligatoirement mentionner le stockage des données en mémoire ?",
              options: [
                "Pour expliquer que les données disparaissent au redémarrage du serveur et éviter les malentendus de persistance.",
                "Pour inciter l'utilisateur à ne jamais éteindre son ordinateur.",
                "Parce que c'est interdit par la licence open source.",
                "Pour cacher un bug de l'agent Backend."
              ],
              correctIndex: 0,
              explanation: "La transparence technique impose d'avertir le destinataire sur la nature volatile des données enregistrées en mémoire."
            },
            {
              id: 8,
              question: "Quel outil est utilisé dans la rétrospective pour remonter d'un symptôme à la cause racine organisationnelle ?",
              options: [
                "La méthode des 5 Pourquoi.",
                "Le terminal bash.",
                "Le compilateur TypeScript.",
                "L'outil git merge --abort."
              ],
              correctIndex: 0,
              explanation: "La méthode des 5 Pourquoi permet de creuser sous les symptômes visibles pour identifier le défaut de processus d'équipe."
            },
            {
              id: 9,
              question: "Un apprenant décide de tagger et déployer TaskFlow sur le cloud sans l'autorisation du Project Manager. Quel est le verdict ?",
              options: [
                "Une excellente prise d'initiative autonome.",
                "Une faute éliminatoire de gouvernance et de sécurité.",
                "Toléré si les tests sont passés avec succès.",
                "Recommandé en mode agile DevOps."
              ],
              correctIndex: 1,
              explanation: "Déployer ou publier sans accord formel viole la séparation des pouvoirs et constitue une faute éliminatoire."
            },
            {
              id: 10,
              question: "Que conclut un rapport de recette approuvé par le Project Manager humain ?",
              options: [
                "Que l'ensemble des livrables a été contrôlé sur des preuves objectives et que la version est autorisée à la remise.",
                "Que le code ne comportera plus jamais aucune anomalie dans le futur.",
                "Que l'on peut supprimer le dépôt Git.",
                "Que les agents n'auront plus besoin de consignes au prochain sprint."
              ],
              correctIndex: 0,
              explanation: "L'approbation du PM atteste que les critères de recette ont été vérifiés et autorise formellement la diffusion de la version."
            }
          ]}
        />
      </div>
    </div>
  );
};
