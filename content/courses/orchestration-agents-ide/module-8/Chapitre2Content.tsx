'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur interactif : Matrice de Scénarios QA & Gestion des Anomalies
  const [selectedScenario, setSelectedScenario] = useState<'qa01' | 'qa02' | 'qa03' | 'qa04'>('qa02');
  const [testStatus, setTestStatus] = useState<Record<string, 'pending' | 'success' | 'failed' | 'verified'>>({
    qa01: 'success',
    qa02: 'failed',
    qa03: 'success',
    qa04: 'failed'
  });

  const scenarios = {
    qa01: {
      id: 'QA-01',
      title: 'Modification nominale du statut en "in_progress"',
      type: 'Test d\'API (Cas nominal)',
      tool: 'Supertest + Vitest',
      target: 'PATCH /api/tasks/1',
      payload: '{ "status": "in_progress" }',
      expected: 'HTTP 200 + { "id": 1, "status": "in_progress", ... }',
      actual: 'HTTP 200 OK — Tâche mise à jour avec statut "in_progress"',
      status: testStatus.qa01,
      anomaly: null,
      notes: 'Le comportement nominal est conforme au contrat d\'API.'
    },
    qa02: {
      id: 'QA-02',
      title: 'Rejet d\'un statut invalide ou inconnu',
      type: 'Test d\'API (Cas d\'erreur / Limite)',
      tool: 'Supertest + Vitest',
      target: 'PATCH /api/tasks/1',
      payload: '{ "status": "archived_unknown" }',
      expected: 'HTTP 400 Bad Request + { "error": "Invalid status value" }',
      actual: 'HTTP 200 OK — Le serveur accepte n\'importe quelle chaîne sans validation !',
      status: testStatus.qa02,
      anomaly: {
        id: 'ANO-QA-02',
        title: 'Absence de validation des valeurs autorisées pour le statut',
        severity: 'Majeure',
        priority: 'Haute',
        responsible: 'Agent Backend',
        reproduction: '1. Envoyer PATCH /api/tasks/1 avec body {"status": "xyz"}\n2. Constater la réponse HTTP 200 au lieu de 400',
        impact: 'Corruption potentielle de l\'état des tâches en base de données.'
      },
      notes: 'L\'agent Backend n\'a pas implémenté de liste blanche (todo, in_progress, done).'
    },
    qa03: {
      id: 'QA-03',
      title: 'Tentative de modification sur un ID inexistant',
      type: 'Test d\'API (Cas d\'erreur)',
      tool: 'Supertest + Vitest',
      target: 'PATCH /api/tasks/9999',
      payload: '{ "status": "done" }',
      expected: 'HTTP 404 Not Found + { "error": "Task not found" }',
      actual: 'HTTP 404 Not Found — Gestion correcte de l\'absence de ressource',
      status: testStatus.qa03,
      anomaly: null,
      notes: 'Le contrôleur retourne bien 404 lorsque findById() renvoie undefined.'
    },
    qa04: {
      id: 'QA-04',
      title: 'Préservation des autres champs de la tâche',
      type: 'Test de non-régression',
      tool: 'Vitest unitaire',
      target: 'taskService.updateStatus(id, "done")',
      payload: 'Objet tâche préexistant avec title, description, priority',
      expected: 'Tâche renvoyée avec le même titre, description et priority initiaux',
      actual: 'Tâche renvoyée avec title et description écrasés à undefined !',
      status: testStatus.qa04,
      anomaly: {
        id: 'ANO-QA-04',
        title: 'Écrasement accidentel des champs non modifiés lors du patch',
        severity: 'Critique / Bloquante',
        priority: 'Haute',
        responsible: 'Agent Backend',
        reproduction: '1. Créer une tâche avec titre et description\n2. Appeler updateStatus(id, "done")\n3. Relire la tâche : titre est vide',
        impact: 'Perte irréversible de données lors des mises à jour de statut.'
      },
      notes: 'L\'agent a fait un remplacement complet au lieu d\'une fusion partielle (spread {...task, status}).'
    }
  };

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 2
          </span>
          <span className="text-xs text-muted-foreground">55 min de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Définir le rôle de l'agent QA
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Dans une équipe d'agents IA, le développeur a une tendance naturelle à ne tester que les cas nominaux qui confirment son code. Découvrez la mission, la posture méthodologique et l'outillage de l'agent QA : concevoir des scénarios critiques, exécuter des tests automatisés, documenter des anomalies reproductibles et vérifier rigoureusement les corrections.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance impérative</p>
        <p className="text-sm leading-relaxed">
          L'agent QA est un vérificateur dynamique et méthodique : <strong>il n'a pas le droit de modifier le code de production</strong> pour corriger les bugs qu'il découvre, ni d'exécuter des opérations Git sensibles (<code>git merge</code>, <code>git push</code>). Son rôle est d'apporter des <strong>preuves factuelles</strong> de bon ou mauvais fonctionnement. Seul le <strong>Project Manager humain</strong> arbitre les anomalies critiques et valide les livrables.
        </p>
      </Callout>

      {/* Section 1 : Assurance Qualité vs Contrôle Qualité */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2.1 & 2.2 — Assurance Qualité (QA) vs Contrôle Qualité (QC)</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Comprendre la distinction fondamentale
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dans l'industrie logicielle comme dans l'orchestration multi-agents, les termes <strong>QA</strong> (Quality Assurance) et <strong>QC</strong> (Quality Control) sont souvent confondus bien qu'ils désignent deux démarches complémentaires :
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <div className="p-4 rounded-lg bg-muted/40 border border-border flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                    Assurance Qualité (QA)
                  </span>
                  <span className="text-sm font-semibold text-foreground">Démarche préventive orientée processus</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  L'assurance qualité vise à <strong>prévenir</strong> l'apparition des défauts en amont. Elle établit les critères d'acceptation, définit les conventions de test, organise les matrices de vérification et s'assure que les exigences techniques sont clarifiées dès le cadrage de la tâche.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/40 border border-border flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                    Contrôle Qualité (QC)
                  </span>
                  <span className="text-sm font-semibold text-foreground">Démarche de détection orientée produit / livrable</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Le contrôle qualité intervient <strong>après</strong> la production du code. Il consiste à exécuter concrètement les tests, simuler les requêtes HTTP, traquer les erreurs d'exécution et vérifier que le livrable fini correspond aux attentes.
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic mt-1">
              Dans une équipe d'agents légers (comme TaskFlow), l'agent QA cumule ces deux volets : il structure les plans de tests en amont et exécute les vérifications en aval.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 : Les Responsabilités de l'Agent QA */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2.3 — Les 6 responsabilités majeures de l'agent QA</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <h3 className="text-sm font-bold text-foreground">Analyser les exigences et lever les ambiguïtés</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Le QA lit les spécifications fonctionnelles et techniques. Si une exigence est incomplète (par exemple : « quel statut HTTP renvoyer si l'ID n'existe pas ? »), il ne devine pas : il signale immédiatement l'ambiguïté au Team Leader ou au PM.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <h3 className="text-sm font-bold text-foreground">Concevoir des scénarios de test exhaustifs</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pour chaque fonctionnalité, le QA formalise 3 types de scénarios : le <strong>chemin nominal</strong> (données valides), les <strong>cas d'erreurs anticipés</strong> (valeur interdite, ressource inexistante) et les <strong>cas aux limites</strong> (chaîne vide, charge inattendue, injection).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <h3 className="text-sm font-bold text-foreground">Écrire et exécuter les tests automatisés</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Le QA rédige des scripts de test avec <strong>Vitest</strong> et <strong>Supertest</strong> dans le dossier dédié (ex. <code>backend/tests/</code>). Il lance les commandes réelles et capture les journaux de sortie bruts.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <h3 className="text-sm font-bold text-foreground">Analyser méthodiquement les résultats</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Un test qui échoue n'est pas juste un échec : le QA analyse le code d'erreur, le payload JSON reçu, l'en-tête HTTP et détermine si le problème vient du test lui-même ou d'une défaillance réelle du code produit.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">5</span>
              <h3 className="text-sm font-bold text-foreground">Documenter les anomalies de manière actionnable</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Il rédige un rapport précis contenant : identifiant unique, titre, gravité, étapes pas-à-pas de reproduction, résultat attendu vs obtenu, et traces d'exécution.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center shrink-0">6</span>
              <h3 className="text-sm font-bold text-foreground">Vérifier les corrections (Re-test & Non-régression)</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Lorsque le développeur annonce avoir corrigé le bug, le QA relance le test qui avait échoué ET l'ensemble de la suite de tests existante pour s'assurer qu'aucun effet de bord n'a été introduit.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Ce que le QA ne doit pas faire & Différenciation */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="shield" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2.4 & 2.5 — Périmètre strict et distinction QA vs Reviewer</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">Ce que le QA NE DOIT PAS faire</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-rose-500 font-bold shrink-0">❌</span>
                <span><strong>Ne jamais modifier le code de production</strong> : le QA rédige des tests et rapporte des bugs, mais ne corrige pas lui-même le code Backend ou Frontend pour préserver la séparation des responsabilités.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-rose-500 font-bold shrink-0">❌</span>
                <span><strong>Ne jamais inventer les règles métier</strong> : face à une question non tranchée dans le contrat, il fait remonter l'interrogation au Team Leader / PM.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-rose-500 font-bold shrink-0">❌</span>
                <span><strong>Ne pas valider sur parole</strong> : un test n'est jamais déclaré « réussi » sans trace d'exécution réelle. Si un test n'a pas pu être exécuté, il est explicitement qualifié de <em>Non exécuté</em> avec la cause du blocage.</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">Distinction clé : Agent QA vs Agent Reviewer</h3>
            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-emerald-500">Agent QA &rarr; Vérification Dynamique du Comportement</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Le QA exécute le programme, manipule les entrées/sorties, vérifie les codes HTTP, mesure les performances et s'assure que le logiciel fait ce qui est attendu en situation réelle.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border flex flex-col gap-1">
                <span className="text-xs font-bold text-blue-500">Agent Reviewer &rarr; Vérification Statique de la Structure</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Le Reviewer lit le code source et le <code>git diff</code>, inspecte la typographie TypeScript, vérifie l'absence de code mort ou dupliqué, contrôle la sécurité, les conventions d'architecture et la maintenabilité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Atelier Interactif — Matrice de Tests QA & Fiche d'Anomalie</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sélectionnez un scénario de test préparé par l'agent QA pour la fonctionnalité TaskFlow <em>« Mise à jour du statut d'une tâche »</em>. Observez le résultat de l'exécution et la fiche d'anomalie générée en cas d'échec.
          </p>

          {/* Boutons de sélection */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedScenario('qa01')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedScenario === 'qa01'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>QA-01 : Cas nominal valide (PATCH &rarr; 200)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0">SUCCÈS</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedScenario('qa02')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedScenario === 'qa02'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>QA-02 : Statut interdit ou inconnu (PATCH &rarr; 400 attendu)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold shrink-0">ÉCHEC / BUG DÉTECTÉ</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedScenario('qa03')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedScenario === 'qa03'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>QA-03 : ID inexistant (PATCH 9999 &rarr; 404 attendu)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0">SUCCÈS</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedScenario('qa04')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedScenario === 'qa04'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>QA-04 : Test de non-régression (Intégrité des autres champs)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold shrink-0">ÉCHEC / RÉGRESSION</span>
              </div>
            </button>
          </div>

          {/* Détails du scénario */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-foreground">{currentScenario.id} — {currentScenario.title}</span>
              <span className="text-[10px] text-muted-foreground uppercase">{currentScenario.type}</span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Cible & Outil :</span>
                <code className="text-emerald-400 font-mono text-[11px]">{currentScenario.target} ({currentScenario.tool})</code>
              </div>
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Payload envoyé :</span>
                <code className="text-sky-300 font-mono text-[11px]">{currentScenario.payload}</code>
              </div>
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Résultat attendu :</span>
                <span className="text-foreground">{currentScenario.expected}</span>
              </div>
              <div className="p-2.5 rounded bg-background border border-border flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Résultat obtenu lors du test :</span>
                <span className={`font-mono ${currentScenario.anomaly ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}`}>
                  {currentScenario.actual}
                </span>
              </div>
            </div>

            {/* Fiche d'anomalie si échec */}
            {currentScenario.anomaly && (
              <div className="mt-2 p-3.5 rounded-lg border border-rose-500/30 bg-rose-500/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <Icon name="alert-triangle" className="w-4 h-4 shrink-0" />
                    Fiche d'Anomalie QA : {currentScenario.anomaly.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                      Gravité : {currentScenario.anomaly.severity}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                      Priorité : {currentScenario.anomaly.priority}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-foreground">{currentScenario.anomaly.title}</p>
                <div className="p-2 rounded bg-black/30 font-mono text-[11px] text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {currentScenario.anomaly.reproduction}
                </div>
                <p className="text-[11px] text-rose-300/90 leading-relaxed">
                  <strong>Impact :</strong> {currentScenario.anomaly.impact} (Assigné à : {currentScenario.anomaly.responsible})
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 5 : Modèle de Prompt pour l'Agent QA */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="file-text" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2.11 — Modèle de mission pour l'Agent QA</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pour cadrer rigoureusement un agent QA dans un IDE, utilisez une fiche d'instruction structurée empêchant les dérives :
          </p>
          <pre className="p-4 rounded-lg bg-muted font-mono text-xs text-foreground overflow-x-auto leading-relaxed border border-border">
{`Tu es l'agent QA de l'équipe TaskFlow.
Ta mission :
1. Lire les spécifications dans docs/specs/task-status.md
2. Rédiger les scénarios de test dans backend/tests/taskStatus.test.ts (Vitest + Supertest)
3. Couvrir les cas nominaux, les cas d'erreur (statut invalide -> 400, ID inexistant -> 404) et les régressions
4. Exécuter la suite : npm run test
5. Rédiger le rapport d'exécution avec les logs bruts

Règles strictes :
- Ne modifie JAMAIS les fichiers du dossier backend/src/ (code de production)
- Si un test échoue, documente une fiche d'anomalie complète et assigne-la au développeur
- Tu n'es pas autorisé à exécuter git merge, git rebase ou git push sans accord du PM humain.`}
          </pre>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2.14 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 2 : Rôle de l'agent QA"
          questions={[
            {
              id: 1,
              question: "Que signifie QA dans le développement logiciel ?",
              options: [
                "Quality Architecture.",
                "Quality Assurance.",
                "Quick Application.",
                "Query Analysis."
              ],
              correctIndex: 1,
              explanation: "QA signifie Quality Assurance (assurance qualité). Cette activité vise à prévenir les problèmes et à organiser les pratiques de vérification."
            },
            {
              id: 2,
              question: "Quelle est la responsabilité principale de l'agent QA dans l'équipe TaskFlow ?",
              options: [
                "Développer toutes les fonctionnalités du Backend.",
                "Définir seul les règles métier.",
                "Préparer et réaliser les vérifications adaptées aux exigences.",
                "Autoriser l'intégration des branches Git."
              ],
              correctIndex: 2,
              explanation: "L'agent QA conçoit et exécute les vérifications adaptées aux exigences, analyse les résultats et documente les anomalies."
            },
            {
              id: 3,
              question: "Quelle activité relève de l'assurance qualité ?",
              options: [
                "Définir les pratiques et critères permettant de prévenir les problèmes.",
                "Corriger automatiquement tous les fichiers du projet.",
                "Remplacer les tests par une inspection visuelle.",
                "Déclarer le projet terminé."
              ],
              correctIndex: 0,
              explanation: "L'assurance qualité est une démarche préventive qui organise les processus, les critères d'acceptation et les bonnes pratiques."
            },
            {
              id: 4,
              question: "Que doit faire le QA lorsqu'une exigence est ambiguë ?",
              options: [
                "Inventer une règle pour poursuivre les tests.",
                "Ignorer l'exigence.",
                "Signaler l'ambiguïté et demander une clarification.",
                "Modifier le contrat technique sans concertation."
              ],
              correctIndex: 2,
              explanation: "Une exigence floue doit être signalée immédiatement pour clarification par le Team Leader ou le PM, sans extrapolation arbitraire."
            },
            {
              id: 5,
              question: "Quel est le rôle principal d'un test unitaire ?",
              options: [
                "Vérifier le fonctionnement d'une unité de code de manière isolée.",
                "Vérifier uniquement l'interface complète.",
                "Contrôler l'autorisation d'un push.",
                "Vérifier uniquement la documentation."
              ],
              correctIndex: 0,
              explanation: "Le test unitaire valide une fonction ou un composant de façon isolée du reste du système et de l'environnement externe."
            },
            {
              id: 6,
              question: "À quoi sert Supertest dans un projet Express ?",
              options: [
                "À créer les composants React.",
                "À tester les échanges HTTP avec l'application.",
                "À compiler les fichiers TypeScript.",
                "À gérer les branches Git."
              ],
              correctIndex: 1,
              explanation: "Supertest permet de simuler des requêtes HTTP (GET, POST, PATCH...) contre une application Express sans avoir à démarrer un serveur réseau réel."
            },
            {
              id: 7,
              question: "Que doit contenir un rapport d'anomalie exploitable ?",
              options: [
                "Uniquement le nom de l'agent responsable.",
                "Uniquement une capture d'écran.",
                "Les étapes de reproduction, le résultat attendu et le résultat obtenu.",
                "Une demande générale de réécriture du code."
              ],
              correctIndex: 2,
              explanation: "Un rapport d'anomalie exploitable doit obligatoirement fournir les étapes de reproduction, le résultat attendu et le résultat constaté avec preuves."
            },
            {
              id: 8,
              question: "Après une correction du Backend, que doit faire le QA ?",
              options: [
                "Considérer automatiquement l'anomalie comme résolue.",
                "Reproduire le scénario initial et vérifier la correction.",
                "Supprimer le test qui avait échoué.",
                "Valider l'ensemble du projet."
              ],
              correctIndex: 1,
              explanation: "Le QA doit obligatoirement re-tester le scénario d'origine et lancer la suite de non-régression pour valider la résolution effective."
            },
            {
              id: 9,
              question: "Quelle est la différence principale entre le QA et le Reviewer ?",
              options: [
                "Le QA examine les comportements par les tests ; le Reviewer examine notamment la qualité et la cohérence des modifications.",
                "Le QA est responsable du Backend et le Reviewer du Frontend.",
                "Le Reviewer exécute tous les tests à la place du QA.",
                "Les deux agents possèdent exactement les mêmes responsabilités."
              ],
              correctIndex: 0,
              explanation: "Le QA assure la vérification dynamique (exécution, tests comportementaux) tandis que le Reviewer assure la vérification statique (lecture du diff, architecture, typage)."
            },
            {
              id: 10,
              question: "Que doit faire le QA lorsqu'un test n'a pas pu être exécuté ?",
              options: [
                "Le déclarer réussi si le code semble correct.",
                "Le supprimer du rapport.",
                "Signaler qu'il n'a pas été exécuté et préciser la raison.",
                "Demander au Reviewer de le considérer comme validé."
              ],
              correctIndex: 2,
              explanation: "Aucun test ne doit être validé par présomption : un test non exécuté doit être consigné avec sa raison précise (ex: blocage environnemental)."
            }
          ]}
        />
      </div>
    </div>
  );
};
