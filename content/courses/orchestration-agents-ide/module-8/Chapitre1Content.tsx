'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  // Simulateur interactif : Plausible vs Conforme vs Validé
  const [activeCodeCase, setActiveCodeCase] = useState<'nominal_only' | 'scope_drift' | 'regression_risk' | 'verified_clean'>('nominal_only');

  const cases = {
    nominal_only: {
      title: "1. Code Plausible mais Vérification Incomplète",
      codeSnippet: `// backend/src/controllers/taskController.ts
export function updateTaskStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const task = store.find(t => t.id === id);
  task.status = status; // ⚠️ Aucun contrôle si 'task' est undefined !
  return res.status(200).json(task);
}`,
      diagnostic: "⚠️ APPAREMMENT FONCTIONNEL MAIS FRAGILE",
      analysis: "Dans le cas nominal (tâche existante et statut valide), le code marche. Mais sur une tâche inexistante (id inconnu), le serveur crash avec un TypeError 'Cannot set properties of undefined' au lieu de renvoyer HTTP 404.",
      verdict: "Plausible en apparence &rarr; Non conforme aux exigences de robustesse &rarr; Non validé."
    },
    scope_drift: {
      title: "2. Code Plausible avec Dérive de Périmètre (Scope Creep)",
      codeSnippet: `// backend/src/controllers/taskController.ts
export function updateTask(req, res) {
  const { id } = req.params;
  const { status, title, description } = req.body;
  // Modifie le statut ET réécrit aussi le titre et la description
  const updated = store.update(id, { status, title, description });
  return res.status(200).json(updated);
}`,
      diagnostic: "⚠️ TRANSGRESSION DU PÉRIMÈTRE DE LA MISSION",
      analysis: "La mission imposait de modifier UNIQUEMENT le champ 'status'. L'agent a utilisé une mutation globale qui écrase le titre si le payload ne le fournit pas.",
      verdict: "Plausible en apparence &rarr; Non conforme à la charte &rarr; Rejeté pour correction."
    },
    regression_risk: {
      title: "3. Modification Générant une Régression Cachée",
      codeSnippet: `// backend/src/store/taskStore.ts
export function saveTask(task) {
  // L'agent remplace la liste par la nouvelle tâche au lieu de mettre à jour !
  tasks = [task]; // ❌ Supprime toutes les autres tâches en mémoire !
  return task;
}`,
      diagnostic: "🛑 RÉGRESSION CRITIQUE ENTRAÎNANT UNE PERTE DE DONNÉES",
      analysis: "Le test unitaire de la mise à jour passe (la tâche renvoyée est correcte), mais la consultation générale 'GET /api/tasks' ne renvoie plus qu'une seule tâche : tout l'historique a été écrasé !",
      verdict: "Test unitaire passant &rarr; Régression majeure &rarr; Blocage immédiat."
    },
    verified_clean: {
      title: "4. Code Conforme, Audité et Couvert par les Tests",
      codeSnippet: `// backend/src/controllers/taskController.ts
export function updateStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  if (!isValidStatus(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const task = store.findById(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.status = status;
  return res.status(200).json(task);
}`,
      diagnostic: "✅ CODE CONFORME, ROBUSTE ET AUDITÉ",
      analysis: "Validation stricte des statuts autorisés (400), vérification d'existence (404), préservation des autres champs, et tests d'intégration Vitest au vert.",
      verdict: "Conforme & Vérifié &rarr; Éligible à la validation par le Project Manager humain."
    }
  };

  const currentCase = cases[activeCodeCase];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 8 &bull; Chapitre 1
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Contrôle Qualité & Prévention des Risques
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          8.1 — Comprendre pourquoi le travail des agents doit être vérifié
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Les modèles d'IA générative sont capables de produire du code à une vitesse impressionnante. Cependant, un code généré avec assurance n'est pas nécessairement un code correct, robuste ou conforme. Un agent peut oublier des cas limites, dériver du périmètre ou introduire des régressions invisibles. Découvrez pourquoi la vérification systématique est le cœur de voûte de l'orchestration.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle fondamentale d'auditabilité :</p>
        <p>
          Ne confondez jamais une déclaration de complétion avec une preuve de conformité. Une affirmation d'un agent comme « J'ai terminé, tout est conforme » ne constitue qu'un signal de fin de tâche, jamais une validation. De plus, <strong>aucun agent ni le Team Leader ne peut effectuer de <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans autorisation formelle du Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1.2 : Les 5 Risques Majeurs du Code Produit par Agents */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="exclamation-triangle" className="w-5 h-5 text-amber-600 shrink-0" />
          1.2 — Les 5 Risques Majeurs du Travail Non Vérifié des Agents
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Même avec des prompts détaillés, le travail des agents peut être affecté par cinq défaillances typiques :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Erreurs de Compréhension & Dérive de Périmètre</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent extrapole la consigne : invité à modifier le statut, il réécrit également le titre et la description, ou ajoute spontanément un système de session non demandé.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Erreurs Techniques & Cas Limites Oubliés</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'implémentation traite le cas nominal mais crash dès qu'un identifiant inexistant est passé en URL ou qu'un statut non autorisé est envoyé en payload.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Problèmes de Compatibilité Inter-Agents</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le Backend et le Frontend fonctionnent chacun isolément, mais divergent sur le nom d'une clé JSON (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">status</code> vs <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskStatus</code>), brisant l'intégration.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">4. Régressions Cachées</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              En ajoutant une route ou un middleware, l'agent modifie sans le vouloir la route de consultation générale des tâches, cassant une fonctionnalité antérieurement au vert.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">5. Vérifications Incomplètes & Illusion de Succès</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent n'exécute qu'un seul test unitaire trivial et affirme que « tous les tests passent », masquant l'absence totale de tests d'intégration réels.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1.4 : Réalisation vs Vérification vs Validation */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="check-badge" className="w-5 h-5 text-indigo-600 shrink-0" />
          1.4 — Distinguer Réalisation, Vérification et Validation
        </h2>
        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">1. La Réalisation (L'agent produit le travail)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent Backend a écrit la route Express ou l'agent Frontend a codé le composant. Le livrable existe physiquement, mais son exactitude reste à démontrer.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">2. La Vérification (Le contrôle factuel par les preuves)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le QA exécute les tests Vitest et Supertest ; le Reviewer audite le code et le diff Git. Les résultats observables sont consignés dans des rapports.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">3. La Validation (L'acceptation formelle souveraine)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Le responsable habilité (Project Manager humain) examine le dossier de contrôle et prononce la recette définitive avant intégration dans la branche principale.
            </p>
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Banc d'Audit Qualité &bull; Détection de Failles Cachées
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur de Diagnostic : Plausible vs Conforme vs Validé
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez un extrait de code produit par un agent pour analyser pourquoi une apparence de fonctionnement ne vaut pas validation.
          </p>
        </div>

        {/* Boutons de sélection */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Exemple de code à auditer :</span>
          {(Object.keys(cases) as Array<keyof typeof cases>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCodeCase(key as keyof typeof cases)}
              className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                activeCodeCase === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {cases[key].title}
            </button>
          ))}
        </div>

        {/* Diagnostic du cas */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="overflow-x-auto font-mono text-xs text-slate-100 bg-slate-900 p-3 rounded-lg max-w-full min-w-0">
            <pre>{currentCase.codeSnippet}</pre>
          </div>

          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {currentCase.diagnostic}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            {currentCase.analysis}
          </p>

          <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>Verdict qualité :</strong> {currentCase.verdict}
          </div>
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz de validation du Chapitre 8.1
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Testez votre compréhension de la nécessité du contrôle qualité, des régressions et de la séparation réalisation/vérification/validation.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi faut-il vérifier le travail produit par un agent IA ?",
              options: [
                "Parce qu'un agent ne peut jamais produire de code correct.",
                "Parce qu'un agent peut mal comprendre une consigne ou produire un résultat incomplet.",
                "Parce que tous les agents utilisent des technologies différentes.",
                "Parce que les tests automatisés sont inutiles."
              ],
              correctIndex: 1,
              explanation: "Un agent peut mal interpréter une consigne, oublier une contrainte ou produire un résultat incomplet. Le contrôle permet de vérifier que le travail correspond réellement aux attentes."
            },
            {
              id: 2,
              question: "Quelle situation correspond à une régression ?",
              options: [
                "Une nouvelle fonctionnalité est ajoutée sans modifier les autres comportements.",
                "Un test est ajouté pour vérifier une route existante.",
                "Une modification provoque un dysfonctionnement dans une fonctionnalité qui fonctionnait auparavant.",
                "Un agent ajoute un commentaire dans un fichier."
              ],
              correctIndex: 2,
              explanation: "Une régression apparaît lorsqu'une modification nouvelle casse ou dégrade un comportement qui fonctionnait antérieurement."
            },
            {
              id: 3,
              question: "Que signifie la réalisation d'une mission ?",
              options: [
                "Le résultat a été accepté par le Project Manager.",
                "Le résultat a été vérifié par le QA.",
                "Le travail demandé a été produit par l'agent.",
                "Le projet est prêt à être intégré."
              ],
              correctIndex: 2,
              explanation: "La réalisation correspond au fait que l'agent a terminé la production de son code ou artefact. Cela ne prouve pas encore sa conformité."
            },
            {
              id: 4,
              question: "Quel est le rôle principal de la vérification ?",
              options: [
                "Examiner le résultat pour déterminer s'il respecte les exigences.",
                "Remplacer les critères d'acceptation par l'avis de l'agent.",
                "Autoriser automatiquement les modifications Git.",
                "Confier la validation finale à l'agent qui a produit le code."
              ],
              correctIndex: 0,
              explanation: "La vérification consiste à examiner factuellement le livrable par rapport aux exigences et critères définis à l'aide de tests et d'audits."
            },
            {
              id: 5,
              question: "Quelle différence existe entre vérification et validation ?",
              options: [
                "Il s'agit de deux termes strictement identiques.",
                "La vérification examine la conformité du résultat ; la validation correspond à son acceptation par le responsable habilité.",
                "La vérification concerne uniquement le Frontend ; la validation uniquement le Backend.",
                "La validation consiste uniquement à exécuter les tests."
              ],
              correctIndex: 1,
              explanation: "La vérification apporte les preuves objectives de fonctionnement. La validation est l'acte décisionnel d'acceptation par le responsable compétent."
            },
            {
              id: 6,
              question: "Quels éléments peuvent faire partie d'un contrôle qualité ?",
              options: [
                "Le code source uniquement.",
                "Les tests uniquement.",
                "Le code, les tests, les contrats techniques et la documentation.",
                "Les conversations des agents uniquement."
              ],
              correctIndex: 2,
              explanation: "Le contrôle qualité est multidimensionnel : il audite le code source, les tests automatisés, les contrats d'API et la documentation technique."
            },
            {
              id: 7,
              question: "Quel est le rôle principal de l'agent QA ?",
              options: [
                "Décider seul des changements de périmètre.",
                "Préparer et exécuter des tests pour vérifier les comportements attendus.",
                "Remplacer le Reviewer dans toutes ses responsabilités.",
                "Autoriser les opérations Git sensibles."
              ],
              correctIndex: 1,
              explanation: "L'Agent QA vérifie le comportement dynamique du logiciel à l'aide de scénarios de tests couvrant les cas normaux et les cas d'erreur."
            },
            {
              id: 8,
              question: "Un agent annonce que tous ses tests sont réussis, mais ne fournit aucune preuve d'exécution. Quelle est la bonne réaction ?",
              options: [
                "Accepter immédiatement le résultat.",
                "Considérer que le code est validé.",
                "Demander les résultats vérifiables et examiner les tests concernés.",
                "Supprimer les tests pour éviter toute ambiguïté."
              ],
              correctIndex: 2,
              explanation: "Une parole d'agent ne vaut pas preuve : il faut exiger la commande exécutée, le rapport d'exécution et examiner les assertions."
            },
            {
              id: 9,
              question: "Pourquoi une revue de code reste-t-elle utile lorsque les tests réussissent ?",
              options: [
                "Parce que les tests ne remplacent pas l'examen de la structure, de la cohérence et de la maintenabilité du code.",
                "Parce que les tests ne peuvent jamais détecter une erreur.",
                "Parce que le Reviewer doit toujours réécrire le code.",
                "Parce qu'une revue rend inutile toute vérification fonctionnelle."
              ],
              correctIndex: 0,
              explanation: "Des tests au vert n'empêchent pas un code d'être mal structuré, non sécurisé, dupliqué ou truffé de types permissifs ('any')."
            },
            {
              id: 10,
              question: "Qui conserve les décisions et validations importantes dans l'organisation TaskFlow ?",
              options: [
                "L'agent Backend.",
                "L'agent QA.",
                "L'agent Reviewer.",
                "Le Project Manager humain."
              ],
              correctIndex: 3,
              explanation: "Dans TaskFlow, la gouvernance repose sur le monopole souverain du Project Manager humain pour toutes les décisions critiques."
            }
          ]}
        />
      </div>
    </div>
  );
};
