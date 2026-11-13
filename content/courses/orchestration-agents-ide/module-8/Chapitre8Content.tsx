'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif : Générateur de Demandes de Correction & Diagnostic
  const [selectedAnomaly, setSelectedAnomaly] = useState<'ano_status' | 'ano_crash' | 'ano_leak'>('ano_status');
  const [promptView, setPromptView] = useState<'vague' | 'structured'>('structured');

  const anomalyCases = {
    ano_status: {
      id: 'ANO-01',
      title: 'Statuts non autorisés acceptés par l\'API',
      symptom: 'Le client peut envoyer {"status": "en_pause"} et l\'API répond HTTP 200 en enregistrant la valeur en base.',
      rootCause: 'Absence de garde de validation (whitelist) dans le contrôleur ou le service avant la mutation.',
      severity: 'Majeure',
      priority: 'Haute (P1)',
      vaguePrompt: `Corrige le bug du statut dans l'API, ça ne marche pas comme prévu.`,
      vagueResult: `⚠️ Résultat avec prompt vague :
L'agent Backend a réécrit entièrement taskController.ts, a supprimé des middlewares d'authentification et a modifié les noms des champs en 'taskStatus' au lieu de 'status', créant 4 nouvelles régressions majeures !`,
      structuredPrompt: `[DEMANDE DE CORRECTION CIBLÉE]
Contexte : Fonctionnalité de mise à jour du statut (PATCH /api/tasks/:id)
Anomalie constatée : L'API accepte des statuts arbitraires et renvoie HTTP 200.
Comportement attendu : Seuls 'todo', 'in_progress' et 'done' sont autorisés. Toute autre valeur doit immédiatement renvoyer HTTP 400 Bad Request avec {"error": "Invalid status"}.
Périmètre autorisé : Modifier UNIQUEMENT backend/src/controllers/taskController.ts. Ne touche à aucun autre fichier.
Critère d'acceptation : Le test "npx vitest run tests/taskStatus.test.ts" doit passer avec 100% de succès.
Ne tente aucun git merge ni git push.`,
      structuredResult: `✅ Résultat avec prompt structuré :
L'agent a ajouté un test strict if (!['todo', 'in_progress', 'done'].includes(status)) return res.status(400)... dans le fichier désigné. Aucun fichier annexe touché. 100% des tests au vert sans régression.`
    },
    ano_crash: {
      id: 'ANO-02',
      title: 'Crash du serveur sur ID de tâche inexistant (Cannot read properties of undefined)',
      symptom: 'Une requête PATCH /api/tasks/9999 fait planter le processus avec une erreur non gérée au lieu d\'un code 404.',
      rootCause: 'Le contrôleur tente d\'accéder à task.status alors que findById(id) a renvoyé undefined.',
      severity: 'Critique / Bloquante',
      priority: 'Urgente (P0)',
      vaguePrompt: `L'API plante quand l'id n'existe pas. Règle ça vite.`,
      vagueResult: `⚠️ Résultat avec prompt vague :
L'agent a entouré tout le serveur d'un try/catch global silencieux qui renvoie HTTP 200 avec {"message": "ok"} même quand la tâche n'existe pas, masquant complètement le problème !`,
      structuredPrompt: `[DEMANDE DE CORRECTION CIBLÉE]
Contexte : Gestion des ressources inexistantes sur PATCH /api/tasks/:id
Anomalie : Sur un ID inconnu (ex: 9999), le serveur lève une TypeError non interceptée.
Comportement attendu : Vérifier si l'objet retourné par findById() est nul. Si oui, renvoyer HTTP 404 avec {"error": "Task not found"} sans lever d'exception.
Fichier concerné : backend/src/services/taskService.ts uniquement.
Validation : Relancer le scénario Supertest QA-03. Le code HTTP 404 doit être confirmé.`,
      structuredResult: `✅ Résultat avec prompt structuré :
L'agent a inséré une vérification de nullité propre renvoyant 404. Le test de non-régression confirme le traitement propre des erreurs 404 sans effet de bord.`
    },
    ano_leak: {
      id: 'ANO-03',
      title: 'Écrasement accidentel des champs non modifiés',
      symptom: 'Après un PATCH de statut, le titre et la description de la tâche sont effacés ou deviennent undefined.',
      rootCause: 'L\'agent a fait un remplacement complet (new Task) au lieu de fusionner les champs (...existingTask).',
      severity: 'Majeure (Perte de données)',
      priority: 'Haute (P1)',
      vaguePrompt: `Les tâches perdent leur titre quand on change le statut, répare ça.`,
      vagueResult: `⚠️ Résultat avec prompt vague :
L'agent a rendu le titre obligatoire dans le body du PATCH, obligeant le frontend à renvoyer tout l'objet et violant le principe d'un PATCH partiel.`,
      structuredPrompt: `[DEMANDE DE CORRECTION CIBLÉE]
Contexte : Intégrité des données lors du PATCH partiel.
Anomalie : La modification du statut écrase les autres attributs existants (title, description).
Comportement attendu : Préservation stricte de tous les champs existants. Seul 'status' et 'updatedAt' doivent être mis à jour.
Fichier concerné : backend/src/store/taskStore.ts
Instruction : Utiliser l'opérateur de décomposition ({ ...existingTask, status, updatedAt: new Date() }).`,
      structuredResult: `✅ Résultat avec prompt structuré :
La mutation en mémoire fusionne correctement l'objet existant. Le test d'intégrité QA-04 passe au vert sans exiger de modifications sur le frontend.`
    }
  };

  const currentAno = anomalyCases[selectedAnomaly];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 8 • Chapitre 8
          </span>
          <span className="text-xs text-muted-foreground">1 h de lecture & pratique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Identifier les erreurs et demander des corrections
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Lorsqu'une anomalie est découverte, le pire réflexe consiste à renvoyer un prompt flou à l'agent IA. Apprenez à isoler la cause racine, à classer l'anomalie selon sa gravité et sa priorité, à rédiger des consignes de correction chirurgicales et à piloter le cycle de vérification sans régressions.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & encadrement des reprises</p>
        <p className="text-sm leading-relaxed">
          Une demande de correction adressée à un agent IA doit être <strong>strictement bornée</strong> : fichiers autorisés, comportements proscrits, tests de vérification à exécuter. Aucun agent n'est autorisé à contourner un bug en affaiblissant les assertions des tests ou en altérant les contrats techniques convenus.
        </p>
      </Callout>

      {/* Section 1 : Symptôme vs Cause Racine */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="search" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>8.1 & 8.2 — Symptôme vs Cause racine : Ne pas soigner le thermomètre</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Comprendre la différence d'analyse
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dans le développement assisté par IA, la confusion entre symptôme et cause engendre des cascades de corrections défectueuses :
            </p>
            <div className="grid grid-cols-1 gap-3 mt-2">
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border flex flex-col gap-1.5">
                <span className="text-xs font-bold text-amber-400">Le Symptôme (Ce qui est observable)</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  C'est la conséquence visible : une requête renvoie HTTP 500, un écran devient blanc, une valeur reste vide. Un agent guidé par le seul symptôme aura tendance à le « masquer » (par exemple en ajoutant un fallback vide ou un try/catch aveugle).
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-muted/40 border border-border flex flex-col gap-1.5">
                <span className="text-xs font-bold text-emerald-400">La Cause Racine (Pourquoi cela se produit)</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  C'est le défaut d'implémentation d'origine : une variable non initialisée, l'absence de validation des paramètres d'entrée, ou une promesse asynchrone non attendue avec <code>await</code>. Seul le traitement de la cause racine élimine durablement le problème.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Gravité vs Priorité */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>8.5 — Gravité (Sévérité) vs Priorité : Ne pas confondre impact et urgence</span>
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Gravité (Impact sur le logiciel)</span>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground">Mesure intrinsèque</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Évalue l'ampleur des dégâts techniques : <strong>Critique/Bloquante</strong> (crash serveur, corruption de base), <strong>Majeure</strong> (fonctionnalité principale inaccessible sans solution de contournement), <strong>Modérée</strong> (défaut partiel avec contournement possible), <strong>Mineure</strong> (cosmétique, coquille textuelle).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Priorité (Ordre de traitement dans le sprint)</span>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground">Décision de planning</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Détermine quand l'anomalie doit être traitée par rapport aux dépendances de l'équipe : <strong>P0 (Immédiate)</strong>, <strong>P1 (Haute)</strong>, <strong>P2 (Normale)</strong>. Une anomalie très grave sur une fonctionnalité peu utilisée peut parfois avoir une priorité moyenne, tandis qu'une anomalie mineure bloquant une démonstration client urgente peut devenir P0.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Anatomie d'une demande de correction */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="file-text" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>8.8 — Les 6 composantes d'un prompt de correction actionnable</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-1 gap-2">
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">1. Contexte :</strong> la tâche, la branche, la fonctionnalité ciblée.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">2. Description factuelle :</strong> étapes précises de reproduction avec inputs exacts.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">3. Comportement attendu vs observé :</strong> le contrat enfreint et la réponse erronée reçue.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">4. Preuves matérielles :</strong> code HTTP, stack trace d'erreur ou assertion Vitest en échec.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">5. Confinement du périmètre :</strong> liste blanche des fichiers modifiables (aucun autre fichier ne doit être touché).
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">6. Critère de validation :</strong> commande exacte de test que l'agent doit exécuter pour prouver la résolution.
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Atelier Interactif — Générateur de Prompts de Correction Ciblée</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Observez l'impact direct du prompt de cadrage sur le comportement de l'agent développeur : une demande floue provoque la dérive du code, tandis qu'une demande structurée résout la cause racine sans effet de bord.
          </p>

          {/* Choix anomalie */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedAnomaly('ano_status')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedAnomaly === 'ano_status'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              ANO-01 : Validation absente sur statuts non autorisés
            </button>

            <button
              onClick={() => setSelectedAnomaly('ano_crash')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedAnomaly === 'ano_crash'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              ANO-02 : Crash sur ID inexistant (Cannot read properties of undefined)
            </button>

            <button
              onClick={() => setSelectedAnomaly('ano_leak')}
              className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                selectedAnomaly === 'ano_leak'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              ANO-03 : Écrasement accidentel des champs non modifiés
            </button>
          </div>

          {/* Toggle vue Vague vs Structurée */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground font-semibold px-2">Type de prompt :</span>
            <button
              onClick={() => setPromptView('vague')}
              className={`px-3 py-1 text-xs rounded font-medium transition-all ${
                promptView === 'vague' ? 'bg-rose-500 text-white font-bold' : 'bg-muted text-muted-foreground'
              }`}
            >
              Prompt Vague (« Corrige le bug »)
            </button>
            <button
              onClick={() => setPromptView('structured')}
              className={`px-3 py-1 text-xs rounded font-medium transition-all ${
                promptView === 'structured' ? 'bg-emerald-600 text-white font-bold' : 'bg-muted text-muted-foreground'
              }`}
            >
              Prompt Cadré & Structuré
            </button>
          </div>

          {/* Fiche anomalie */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="font-bold text-foreground">{currentAno.id} — {currentAno.title}</span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">{currentAno.severity}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">{currentAno.priority}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Symptôme constaté :</span>
                <p className="text-muted-foreground mt-0.5">{currentAno.symptom}</p>
              </div>
              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-[10px] text-muted-foreground font-semibold">Cause racine identifiée :</span>
                <p className="text-emerald-400 mt-0.5 font-medium">{currentAno.rootCause}</p>
              </div>
            </div>

            {/* Prompt et résultat */}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-[11px] text-muted-foreground font-semibold">
                {promptView === 'vague' ? 'Prompt soumis (Vague) :' : 'Prompt soumis (Structuré & Confiné) :'}
              </span>
              <pre className="p-3 rounded-lg bg-black/60 border border-border font-mono text-xs text-sky-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {promptView === 'vague' ? currentAno.vaguePrompt : currentAno.structuredPrompt}
              </pre>

              <div className={`p-3 rounded-lg border font-mono text-xs whitespace-pre-wrap leading-relaxed ${
                promptView === 'vague' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}>
                {promptView === 'vague' ? currentAno.vagueResult : currentAno.structuredResult}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>8.16 — Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 8 : Identifier les erreurs et demander des corrections"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'une anomalie dans un projet logiciel ?",
              options: [
                "Une modification de fichier réalisée dans Git.",
                "Un écart entre le comportement observé et le comportement attendu.",
                "Une nouvelle fonctionnalité demandée par le Project Manager.",
                "Un test automatisé qui a réussi."
              ],
              correctIndex: 1,
              explanation: "Une anomalie désigne tout décalage entre les exigences contractuelles attendues et le résultat réel produit par le système."
            },
            {
              id: 2,
              question: "Quelle différence existe entre un symptôme et une cause ?",
              options: [
                "Le symptôme est un signe observable, tandis que la cause explique pourquoi le problème se produit.",
                "Le symptôme est toujours une erreur de compilation, tandis que la cause est toujours une erreur métier.",
                "Les deux termes désignent exactement la même chose.",
                "La cause est toujours connue dès la première observation."
              ],
              correctIndex: 0,
              explanation: "Le symptôme est la conséquence visible du bug, tandis que la cause racine est le défaut de conception ou de logique sous-jacent."
            },
            {
              id: 3,
              question: "Pourquoi faut-il collecter des preuves avant de demander une correction ?",
              options: [
                "Pour éviter d'exécuter les tests.",
                "Pour permettre à l'agent de modifier tous les fichiers.",
                "Pour faciliter la compréhension et la reproduction de l'anomalie.",
                "Pour supprimer les hypothèses de diagnostic sans analyse."
              ],
              correctIndex: 2,
              explanation: "Des preuves matérielles (logs, stack traces, requêtes exactes) évitent les approximations et permettent à l'agent de cibler sa correction."
            },
            {
              id: 4,
              question: "Quelle est la différence entre gravité et priorité ?",
              options: [
                "La gravité correspond à l'ordre de traitement et la priorité au nombre de fichiers modifiés.",
                "La gravité et la priorité sont toujours identiques.",
                "La gravité mesure la durée de correction et la priorité le nombre de tests.",
                "La gravité mesure l'impact du problème, tandis que la priorité détermine l'ordre de traitement."
              ],
              correctIndex: 3,
              explanation: "La gravité évalue l'ampleur de la défaillance technique ; la priorité planifie le moment où le problème doit être résolu."
            },
            {
              id: 5,
              question: "Quel agent est principalement chargé de vérifier les comportements et les scénarios de test ?",
              options: [
                "QA",
                "Frontend",
                "Project Manager",
                "Architect"
              ],
              correctIndex: 0,
              explanation: "L'agent QA est le spécialiste dédié à la conception, l'exécution et la validation des scénarios comportementaux."
            },
            {
              id: 6,
              question: "Que doit contenir une demande de correction efficace ?",
              options: [
                "Uniquement le nom du fichier à modifier.",
                "Le contexte, l'anomalie, le comportement attendu, les preuves et les critères d'acceptation.",
                "Uniquement la phrase « corrige le problème ».",
                "Une autorisation générale de modifier toute l'application."
              ],
              correctIndex: 1,
              explanation: "Un prompt de reprise performant doit borner précisément le contexte, le dysfonctionnement, l'attendu, les preuves et les critères d'acceptation."
            },
            {
              id: 7,
              question: "Quelles actions permettent de vérifier une correction ?",
              options: [
                "Examiner les fichiers modifiés (git diff), exécuter les tests ciblés et lancer les tests de non-régression.",
                "Accepter automatiquement la correction sur la simple déclaration de l'agent.",
                "Supprimer les tests qui échouent pour faire passer la suite.",
                "Modifier les contrats d'API sans avertir les autres agents."
              ],
              correctIndex: 0,
              explanation: "La vérification d'une correction repose sur l'audit du diff Git, la validation du test spécifique et le passage au vert de la suite de non-régression."
            },
            {
              id: 8,
              question: "Que faut-il faire lorsqu'une première correction ne résout pas l'anomalie ?",
              options: [
                "Supprimer le test qui échoue.",
                "Répéter la même modification sans examiner les résultats.",
                "Réexaminer les observations et réviser le diagnostic si nécessaire.",
                "Considérer automatiquement que le problème est résolu."
              ],
              correctIndex: 2,
              explanation: "En cas d'échec de la correction, il faut réanalyser les traces pour affiner l'hypothèse de cause racine plutôt que d'insister à l'aveugle."
            },
            {
              id: 9,
              question: "Quel est le rôle du Reviewer lors d'une correction ?",
              options: [
                "Remplacer systématiquement le QA.",
                "Valider seul toutes les décisions du projet.",
                "Exécuter toutes les missions du Backend.",
                "Examiner la qualité technique, la cohérence et les effets possibles de la modification."
              ],
              correctIndex: 3,
              explanation: "Le Reviewer s'assure que le correctif n'introduit pas de dette technique, respecte les conventions et ne crée pas d'effets secondaires indésirables."
            },
            {
              id: 10,
              question: "Une correction a été réalisée et les tests ciblés ont réussi. Quelle conclusion est correcte ?",
              options: [
                "La correction a été vérifiée pour les scénarios exécutés, mais sa validation dépend encore des contrôles et décisions nécessaires.",
                "L'ensemble de l'application est automatiquement validé.",
                "Toutes les régressions sont nécessairement exclues.",
                "Il n'est plus nécessaire d'examiner les fichiers modifiés."
              ],
              correctIndex: 0,
              explanation: "La réussite des tests ciblés apporte une preuve factuelle pour ces scénarios précis, mais la validation finale reste souverainement entre les mains du PM."
            }
          ]}
        />
      </div>
    </div>
  );
};
