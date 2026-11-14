'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  // Simulateur interactif : Banc de Validation des Règles Métier de Spécification
  const [titleInput, setTitleInput] = useState<string>('Préparer la recette');
  const [descInput, setDescInput] = useState<string>('Vérifier tous les critères d\'acceptation');
  const [statusInput, setStatusInput] = useState<'todo' | 'in_progress' | 'done' | 'invalid'>('todo');

  const isTitleValid = titleInput.trim().length > 0;
  const isDescValid = descInput.trim().length > 0;
  const isStatusValid = ['todo', 'in_progress', 'done'].includes(statusInput);
  const isValidTask = isTitleValid && isDescValid && isStatusValid;

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400 shrink-0">
            Module 10 • Chapitre 2
          </span>
          <span className="text-xs text-muted-foreground">50 min de lecture & spécifications</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Préparer les spécifications fonctionnelles
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Une consigne vague donnée à un agent d'IA (« développe une gestion de tâches ») conduit inévitablement à des incompatibilités. Découvrez comment transformer les besoins utilisateurs en spécifications fonctionnelles précises, définir les 4 attributs d'une tâche, verrouiller les règles métier et formaliser les critères d'acceptation.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & immuabilité des règles métier</p>
        <p className="text-sm leading-relaxed">
          Les règles fonctionnelles et critères d'acceptation constituent le <strong>contrat de référence absolu</strong> de toute l'équipe d'agents. Aucun agent (qu'il soit Backend, Frontend ou Architecte) ne peut modifier unilatéralement un comportement métier ou un format de données sans validation préalable du <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Besoin vs Spécification vs Choix technique */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="file-text" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>1. Besoin, Spécification fonctionnelle et Choix technique</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Comprendre la distinction des 3 niveaux
            </h3>
            <div className="grid grid-cols-1 gap-2.5 mt-1 text-xs">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
                <span className="font-bold text-blue-400">1. Le Besoin (Pourquoi ?) :</span>
                <p className="text-muted-foreground">L'utilisateur veut organiser son travail et savoir combien de tâches sont en cours.</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
                <span className="font-bold text-emerald-400">2. La Spécification Fonctionnelle (Quoi ?) :</span>
                <p className="text-muted-foreground">L'utilisateur peut créer une tâche avec titre et description obligatoires. Le statut initial est obligatoirement "todo". La modification de titre/description ne modifie jamais le statut.</p>
              </div>

              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col gap-1">
                <span className="font-bold text-purple-400">3. Le Choix Technique (Comment ?) :</span>
                <p className="text-muted-foreground">Une API REST Express en TypeScript stockant les tâches dans une collection Map en mémoire, consommée par React via fetch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Les données et les règles métier */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="layers" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>2. Les 4 attributs d'une tâche et les règles métier clés</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 text-xs leading-relaxed">
          <div className="grid grid-cols-1 gap-2">
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">id (Identifiant unique) :</strong> Généré automatiquement côté backend (ex. UUID ou chaîne task-001). Immuable, jamais réattribué.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">title (Titre) :</strong> Obligatoire. Rejet strict si vide ou constitué uniquement d'espaces blancs (<code>trim().length === 0</code>).
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">description (Description) :</strong> Obligatoire. Même règle de validation stricte que le titre.
            </div>
            <div className="p-2.5 rounded bg-muted/40 border border-border">
              <strong className="text-foreground">status (Statut) :</strong> Initialisé à <code>"todo"</code> à la création. Seules valeurs valides : <code>"todo" | "in_progress" | "done"</code>.
            </div>
          </div>

          <p className="text-emerald-400 font-semibold mt-1">
            ⚡ Règle d'or de séparation : La modification du titre/description (PUT) et le changement d'avancement (PATCH status) sont deux opérations fonctionnelles rigoureusement distinctes.
          </p>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="check-square" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>3. Atelier Interactif — Banc de Validation des Critères de Spécification</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Testez la conformité d'une tâche par rapport aux critères d'acceptation fonctionnels de TaskFlow. Essayez de saisir des espaces seuls ou un statut non autorisé.
          </p>

          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <label className="text-muted-foreground font-semibold">Titre de la tâche (obligatoire, non vide) :</label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className={`p-2 rounded border font-mono text-xs text-foreground bg-background ${
                  isTitleValid ? 'border-border' : 'border-rose-500 bg-rose-500/10'
                }`}
                placeholder="Ex: Préparer la recette"
              />
              {!isTitleValid && <span className="text-[10px] text-rose-400">Le titre ne peut pas être vide ni composé d'espaces seuls.</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-muted-foreground font-semibold">Description (obligatoire, non vide) :</label>
              <input
                type="text"
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                className={`p-2 rounded border font-mono text-xs text-foreground bg-background ${
                  isDescValid ? 'border-border' : 'border-rose-500 bg-rose-500/10'
                }`}
                placeholder="Ex: Description précise"
              />
              {!isDescValid && <span className="text-[10px] text-rose-400">La description est requise et ne peut être vide.</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-muted-foreground font-semibold">Statut sélectionné :</label>
              <div className="flex flex-wrap gap-2">
                {(['todo', 'in_progress', 'done', 'invalid'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusInput(st)}
                    className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                      statusInput === st
                        ? (st === 'invalid' ? 'bg-rose-500 text-white font-bold' : 'bg-emerald-600 text-white font-bold')
                        : 'bg-muted/40 text-muted-foreground'
                    }`}
                  >
                    {st === 'invalid' ? 'status: "pending_fake"' : `status: "${st}"`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-xs flex flex-col gap-1 ${
            isValidTask ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <span className="font-bold text-sm">
              {isValidTask ? '✅ TÂCHE CONFORME AUX SPÉCIFICATIONS FONCTIONNELLES' : '🛑 TÂCHE REJETÉE : INFRACTION AUX CRITÈRES D\'ACCEPTATION'}
            </span>
            <p className="text-muted-foreground leading-relaxed">
              {isValidTask
                ? 'L\'objet tâche respecte le contrat : id généré, titre et description renseignés, statut appartenant à la liste blanche.'
                : 'L\'application doit rejeter cette requête HTTP avec un code 400 Bad Request et expliciter la cause du refus.'}
            </p>
          </div>
        </div>
      </div>

      {/* Quiz officiel du chapitre 2 */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Quiz d'évaluation — Chapitre 2</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 2 : Spécifications fonctionnelles"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal des spécifications fonctionnelles ?",
              options: [
                "Décrire précisément les comportements attendus du logiciel.",
                "Définir uniquement les langages de programmation.",
                "Décrire exclusivement l'organisation des fichiers.",
                "Déterminer les branches Git du projet."
              ],
              correctIndex: 0,
              explanation: "Les spécifications décrivent ce que le logiciel doit faire, ses règles de gestion et les résultats attendus par l'utilisateur."
            },
            {
              id: 2,
              question: "Quelle différence existe entre un besoin et une spécification fonctionnelle ?",
              options: [
                "Le besoin décrit le résultat recherché, tandis que la spécification précise le comportement attendu.",
                "Le besoin décrit le code, tandis que la spécification décrit les tests.",
                "Le besoin concerne uniquement le frontend, tandis que la spécification concerne le backend.",
                "Les deux notions désignent exactement la même chose."
              ],
              correctIndex: 0,
              explanation: "Le besoin est l'objectif métier ; la spécification formalise le comportement précis attendu pour combler ce besoin."
            },
            {
              id: 3,
              question: "Quels sont les champs retenus pour représenter une tâche dans TaskFlow ?",
              options: [
                "id, title, description, status.",
                "name, date, priority, user.",
                "id, category, price, status.",
                "title, author, password, status."
              ],
              correctIndex: 0,
              explanation: "TaskFlow structure chaque tâche autour de id, title, description et status."
            },
            {
              id: 4,
              question: "Quel est le statut initial d'une nouvelle tâche ?",
              options: [
                "done",
                "in_progress",
                "todo",
                "pending"
              ],
              correctIndex: 2,
              explanation: "Toute tâche créée se voit automatiquement attribuer le statut todo ('À faire')."
            },
            {
              id: 5,
              question: "Que doit-il se passer lorsqu'un utilisateur tente de créer une tâche avec un titre vide ?",
              options: [
                "La tâche doit être créée sans titre.",
                "La création doit être refusée.",
                "Le backend doit attribuer un titre aléatoire.",
                "Le statut doit automatiquement passer à done."
              ],
              correctIndex: 1,
              explanation: "Le titre est obligatoire. Une valeur vide ou composée uniquement d'espaces doit être formellement rejetée."
            },
            {
              id: 6,
              question: "Quelles sont les informations modifiables avec la fonctionnalité de modification d'une tâche ?",
              options: [
                "L'identifiant et le statut.",
                "Le titre et la description.",
                "L'identifiant uniquement.",
                "Le statut uniquement."
              ],
              correctIndex: 1,
              explanation: "La modification générale ne touche qu'au titre et à la description ; le statut fait l'objet d'une opération dédiée."
            },
            {
              id: 7,
              question: "Un statut ne contient aucune tâche. Quelle valeur son compteur doit-il afficher ?",
              options: [
                "Une valeur négative.",
                "Une valeur indéterminée.",
                "Zéro.",
                "Le nombre total de tâches."
              ],
              correctIndex: 2,
              explanation: "Tout statut sans tâche doit explicitement afficher 0, et la somme des 3 compteurs doit égaler le total des tâches."
            },
            {
              id: 8,
              question: "Qui conserve la responsabilité de valider les décisions importantes du projet ?",
              options: [
                "L'agent Backend.",
                "L'agent QA.",
                "Le Team Leader IA.",
                "Le Project Manager humain."
              ],
              correctIndex: 3,
              explanation: "Le Project Manager humain conserve le pouvoir souverain pour arbitrer les spécifications et autoriser les opérations sensibles."
            }
          ]}
        />
      </div>
    </div>
  );
};
