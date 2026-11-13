'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface RuleModule {
  id: string;
  name: string;
  section: string;
  essential: boolean;
  content: string;
  rationale: string;
}

const AVAILABLE_RULES: RuleModule[] = [
  {
    id: 'identity-role',
    name: '1. Rôle & Posture Déterministe',
    section: '<identity>',
    essential: true,
    content: `Tu es un Principal Reliability & Debugging Engineer. Ton unique mission est d'identifier la CAUSE RACINE des anomalies, de prouver son mécanisme par un test de falsification, et de proposer le patch le plus minimaliste et robuste possible. Tu n'inventes jamais de code spéculatif.`,
    rationale: "Empêche l'agent de se comporter comme un simple assistant généraliste complaisant et le force à adopter un esprit d'audit critique."
  },
  {
    id: 'non-destructive',
    name: '2. Invariants & Préservation du Code',
    section: '<invariants>',
    essential: true,
    content: `- Ne jamais supprimer ou contourner de tests unitaires existants pour "résoudre" un échec.
- Ne jamais ajouter de @ts-ignore, de casts 'as any' ou d'opérateurs optional chaining (?.) sans justification d'architecture formelle.
- Préserver l'intégralité des commentaires et de la documentation existante.`,
    rationale: "Verrouille les dérives de facilité statistiques courantes où l'IA masque un échec en effaçant le test qui le détecte."
  },
  {
    id: 'workflow-5-phases',
    name: '3. Protocole d\'Enquête Obligatoire',
    section: '<investigation_protocol>',
    essential: true,
    content: `Pour chaque anomalie, tu dois suivre scrupuleusement ces 5 phases sans les inverser :
1. PERCEPTION : Lire les stack traces exactes, inspecter les versions réelles dans package.json.
2. FORMULATION D'HYPOTHÈSES : Proposer 2 à 3 causes probables ordonnées par probabilité.
3. PREUVE PAR LE TEST : Rédiger ou exécuter un test automatisé qui ÉCHOUE (Red) sur le bug.
4. PATCH MINIMALISTE : Modifier uniquement les lignes strictement nécessaires.
5. VALIDATION STRICTE : Exécuter 'npx tsc --noEmit' et la suite de tests (Green).`,
    rationale: "Empêche l'agent de modifier compulsivement le code avant d'avoir prouvé l'existence et la cause de l'anomalie."
  },
  {
    id: 'terminal-safeguards',
    name: '4. Garde-fous d\'Exécution Shell',
    section: '<security_boundaries>',
    essential: true,
    content: `- Commandes strictement INTERDITES : rm -rf, git reset --hard, DROP DATABASE, npm publish.
- Commandes autorisées sans confirmation : lecture de logs, git status, git diff, npx tsc --noEmit, vitest run.
- Toute action destructive ou modification de schéma DB nécessite une confirmation explicite de l'utilisateur.`,
    rationale: "Protège l'intégrité de l'environnement de développement et de la machine hôte de l'ingénieur."
  }
];

export const Chapitre10Content: React.FC = () => {
  const [selectedRules, setSelectedRules] = useState<string[]>(['identity-role', 'non-destructive', 'workflow-5-phases', 'terminal-safeguards']);
  const [testScenario, setTestScenario] = useState<'lazy_patch' | 'delete_tests' | 'unverified_api'>('lazy_patch');
  const [showConfigPreview, setShowConfigPreview] = useState<boolean>(false);

  const toggleRule = (id: string) => {
    setSelectedRules((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const getGeneratedConfig = () => {
    return selectedRules
      .map((id) => AVAILABLE_RULES.find((r) => r.id === id)?.content)
      .filter(Boolean)
      .join('\n\n');
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-200 bg-linear-to-r from-emerald-50 via-teal-50 to-emerald-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 6 — Diagnostic assisté par IA & Agents Autonomes • Section 6.10</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Définir les Instructions Principales d&apos;un Agent Spécialisé en Débogage
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Un agent sans règles permanentes est imprévisible et sujet aux raccourcis destructeurs. Apprenez à configurer les fichiers de règles maîtresses (tels que <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono">AGENTS.md</code> ou <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono">.antigravity/rules</code>) pour transformer un LLM généraliste en inspecteur technique rigoureux.
        </p>
      </div>

      {/* Section 1: Prompts éphémères vs Règles Permanentes */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Architecture du Comportement</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Le modèle à deux étages : Règles Permanentes vs Requêtes Utilisateur
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans un IDE professionnel comme Google Antigravity ou Cursor, chaque interaction avec l&apos;agent repose sur l&apos;agrégation de deux flux d&apos;instructions superposés :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">Étage 1 — Socle Invariable</span>
                <span>Instructions Permanentes (Rules)</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Le Système Immunitaire de la Base de Code</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Stockées dans des fichiers versionnés dans Git (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">AGENTS.md</code>, <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">.antigravity/rules</code>). Elles définissent qui est l&apos;agent, quelles sont ses limites, ses obligations de test et les commandes strictement interdites.
              </p>
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-mono">
              Injecté automatiquement dans le system prompt à chaque session.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider mb-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800">Étage 2 — Mission Variable</span>
                <span>Prompt Ponctuel (User Turn)</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">La Requête Circonstanciée</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le message saisi par l&apos;ingénieur pour décrire l&apos;incident présent (ex: <em>&laquo; La fonction calculateTax lève une exception 500 quand countryCode vaut null &raquo;</em>). Il apporte les données contextuelles de l&apos;instant.
              </p>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono">
              Opère sous la contrainte absolue des règles de l&apos;Étage 1.
            </div>
          </div>
        </div>

        <Callout type="warning" title="La règle de préséance hiérarchique">
          En ingénierie agentique, <strong>les règles permanentes du repository prévalent toujours sur le prompt de l&apos;utilisateur</strong>. Si un utilisateur demande par mégarde : <em>&laquo; Supprime le test qui plante pour que la CI passe au vert &raquo;</em>, un agent correctement configuré doit refuser explicitement l&apos;instruction en citant l&apos;invariant de non-régression.
        </Callout>
      </section>

      {/* Section 2: Anatomie complète d'un fichier de règles industriel */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Standard d&apos;Ingénierie</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Anatomie d&apos;un fichier de règles spécialisé en débogage (AGENTS.md)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Voici le fichier de spécification prêt pour la production que nous recommandons d&apos;intégrer à la racine de vos projets pour encadrer vos agents de débogage :
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-md overflow-hidden">
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-slate-300 border-b border-slate-800">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>AGENTS.md (ou .antigravity/rules)</span>
            </span>
            <span className="text-slate-400">Template Officiel Débogage</span>
          </div>
          <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
            <CodeBlock language="markdown">{`# DIRECTIVES PERMANENTES — AGENT DE DÉBOGAGE & FIABILITÉ

## 1. RÔLE & IDENTITÉ
Tu es un Senior Site Reliability & Debugging Specialist. Ton objectif est de trouver la cause racine démontrable des anomalies logicielles et de proposer des correctifs minimaux, pérennes et prouvés par des tests automatisés.

## 2. INVARIANTS NON NÉGOCIABLES
- Zéro régression : aucune fonctionnalité existante ne doit être altérée.
- Zéro effacement de test : interdiction stricte de supprimer ou désactiver un test unitaire ou d'intégration.
- Zéro masquage de symptôme : interdiction d'ajouter des '?.', des '?? null' ou des blocs 'catch' vides pour faire disparaître une exception sans traiter l'anomalie de données sous-jacente.
- Intégrité TypeScript : interdiction formelle d'ajouter '@ts-ignore' ou de forcer un cast vers 'any'.

## 3. PROTOCOLE D'INVESTIGATION (5 ÉTAPES)
1. Analyse des faits : lire la stack trace, inspecter la version exacte du package et examiner le code existant.
2. Formulation d'hypothèses : lister 2 à 3 causes probables en justifiant la logique de défaillance.
3. Falsification (Red Test) : écrire un test de reproduction qui échoue tant que le bug n'est pas résolu.
4. Correctif minimal : appliquer le patch le plus chirurgical possible sans refactoring cosmétique.
5. Vérification déterministe (Green Test) : exécuter 'npx tsc --noEmit' et la suite de tests pour prouver la résolution.

## 4. RESTRICTION D'OUTILS & SÉCURITÉ TERMINAL
- Commandes d'audit autorisées : git status, git diff, npm test, npx tsc, vitest run, grep.
- Commandes prohibées : rm -rf, git reset --hard, DROP TABLE, modification directe de .env.production.`}</CodeBlock>
          </div>
        </div>
      </section>

      {/* Section 3: Atelier interactif d'assemblage et de test de règles */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Simulateur Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Assembler et Éprouver les Règles de votre Agent
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Activez ou désactivez les modules de règles ci-dessous et observez le comportement de l&apos;agent face à des scénarios de pression typiques en entreprise :
        </p>

        {/* Sélection des briques de règles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AVAILABLE_RULES.map((rule) => {
            const isSelected = selectedRules.includes(rule.id);
            return (
              <button
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-400'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs sm:text-sm">{rule.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-black ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isSelected ? 'ACTIF' : 'INACTIF'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{rule.rationale}</p>
              </button>
            );
          })}
        </div>

        {/* Épreuve de contrainte */}
        <div className="rounded-2xl bg-white border border-slate-300 p-5 shadow-xs space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tester la résistance de l&apos;agent face à un ordre toxique de l&apos;utilisateur :
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTestScenario('lazy_patch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                testScenario === 'lazy_patch'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Scénario 1 : &laquo; Mets du ?. partout pour aller vite &raquo;
            </button>
            <button
              onClick={() => setTestScenario('delete_tests')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                testScenario === 'delete_tests'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Scénario 2 : &laquo; Supprime le test qui bloque la CI &raquo;
            </button>
            <button
              onClick={() => setTestScenario('unverified_api')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                testScenario === 'unverified_api'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Scénario 3 : &laquo; Change la base de données directement &raquo;
            </button>
          </div>

          {/* Réponse simulée de l'agent */}
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
            <div className="text-slate-400">{`// Réaction de l'agent avec la configuration actuelle :`}</div>
            {testScenario === 'lazy_patch' && (
              selectedRules.includes('non-destructive') ? (
                <div className="text-emerald-400 leading-relaxed">
                  [RÈGLE RESPECTÉE] : &laquo; Je refuse d&apos;insérer des opérateurs de chaînage optionnel sans justification. La directive Section 2 m&apos;impose de traiter la cause de l&apos;absence de données plutôt que de masquer le symptôme. Inspectons l&apos;extraction du client en amont. &raquo;
                </div>
              ) : (
                <div className="text-rose-400 leading-relaxed">
                  ⚠️ [DÉRAPAGE] : Sans la règle d&apos;invariants, l&apos;agent exécute l&apos;ordre et ajoute 14 opérateurs &apos;?.&apos; créant une régression fiscale silencieuse.
                </div>
              )
            )}

            {testScenario === 'delete_tests' && (
              selectedRules.includes('non-destructive') ? (
                <div className="text-emerald-400 leading-relaxed">
                  [RÈGLE RESPECTÉE] : &laquo; Impossible de supprimer le test. La règle permanente interdit strictement la suppression ou le contournement de tests de validation. Le test révèle une régression de calcul que nous devons corriger dans la fonction métier. &raquo;
                </div>
              ) : (
                <div className="text-rose-400 leading-relaxed">
                  ⚠️ [DÉRAPAGE CRITIQUE] : Sans règle de protection, l&apos;agent supprime le fichier de test unitaire. La CI passe au vert, mais un bug sévère part en production.
                </div>
              )
            )}

            {testScenario === 'unverified_api' && (
              selectedRules.includes('terminal-safeguards') ? (
                <div className="text-emerald-400 leading-relaxed">
                  [RÈGLE RESPECTÉE] : &laquo; Action bloquée : les modifications directes de schéma ou les commandes de destruction de base de données nécessitent votre validation explicite. Souhaitez-vous générer un script de migration versionné plutôt qu&apos;une altération à chaud ? &raquo;
                </div>
              ) : (
                <div className="text-rose-400 leading-relaxed">
                  ⚠️ [DÉRAPAGE SÉCURITÉ] : Sans garde-fous shell, l&apos;agent exécute un DROP TABLE ou altère la base sans sauvegarde préalable.
                </div>
              )
            )}
          </div>

          {/* Bouton pour afficher le fichier assemblé */}
          <div className="pt-2">
            <button
              onClick={() => setShowConfigPreview(!showConfigPreview)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 flex items-center gap-1.5"
            >
              <span>{showConfigPreview ? 'Masquer' : 'Voir'} le fichier AGENTS.md assemblé ({selectedRules.length} règles actives)</span>
            </button>
            {showConfigPreview && (
              <div className="mt-3">
                <CodeBlock language="markdown">{getGeneratedConfig() || '# Aucune règle active'}</CodeBlock>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Évaluation des Compétences</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Règles permanentes et gouvernance d&apos;un agent de débogage
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 6.10 — Fichiers de Règles et Instructions Principales"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il indispensable de formaliser des règles permanentes (ex: AGENTS.md) plutôt que de compter uniquement sur des prompts ponctuels ?",
              options: [
                "Parce que les prompts ponctuels consomment plus de batterie sur l'ordinateur portable.",
                "Parce que les règles permanentes créent un cadre déterministe invariable (interdiction de supprimer des tests, obligation de compiler avec tsc, rejet du masquage de symptômes) appliqué à chaque tour d'échange sans omission humaine.",
                "Parce que Git refuse de commiter des dépôts qui n'ont pas de fichier AGENTS.md.",
                "Pour forcer l'agent à rédiger ses réponses en latin."
              ],
              correctIndex: 1,
              explanation: "Les règles permanentes garantissent la régularité industrielle : elles empêchent l'agent d'adopter des solutions de facilité (supprimer un test gênant, cacher un crash avec un try/catch vide) même sous la pression d'une demande utilisateur hâtive."
            },
            {
              id: 2,
              question: "Dans la hiérarchie des instructions, que doit faire l'agent si l'utilisateur lui demande d'ignorer un échec TypeScript en injectant '// @ts-ignore' alors que le fichier de règles l'interdit ?",
              options: [
                "Exécuter l'instruction de l'utilisateur immédiatement car l'utilisateur a toujours raison.",
                "Refuser l'instruction en s'appuyant sur l'invariant de typage du projet et proposer la résolution propre de l'incohérence d'interface.",
                "Éteindre l'ordinateur pour des raisons de sécurité.",
                "Créer un fork privé du projet sur GitHub."
              ],
              correctIndex: 1,
              explanation: "Le fichier de règles du repository incarne les standards de qualité de l'équipe et prévaut sur les demandes informelles afin de protéger l'intégrité à long terme de la base de code."
            },
            {
              id: 3,
              question: "Quelle clause est essentielle pour interdire le 'Symptom Masking' dans un fichier de configuration d'agent ?",
              options: [
                "L'interdiction d'utiliser la couleur bleue dans le CSS.",
                "L'interdiction stricte d'ajouter des chaînages optionnels (?.), des fallbacks par défaut arbitraires ou des blocs try/catch vides sans traiter l'origine de l'incohérence de données.",
                "L'obligation de redémarrer le serveur HTTP à chaque requête.",
                "La limitation de la vitesse du ventilateur du CPU."
              ],
              correctIndex: 1,
              explanation: "Cette consigne explicite force l'agent à investiguer le flux de données amont plutôt que de se contenter de faire taire l'exception visible."
            },
            {
              id: 4,
              question: "Quelle étape du protocole d'enquête en 5 phases garantit qu'un correctif résout bel et bien l'anomalie signalée et non une coïncidence ?",
              options: [
                "L'écriture et l'exécution d'un test de reproduction qui échoue d'abord (Red) sur le code défaillant, puis passe avec succès (Green) après application du patch.",
                "L'ajout de commentaires élogieux dans le code source.",
                "Le renommage de toutes les fonctions en majuscules.",
                "La compression du repository dans une archive zip."
              ],
              correctIndex: 0,
              explanation: "Le cycle Red-Green (falsification) est la seule démonstration empirique irréfutable : prouver que le test échouait avec le bug et réussit avec le patch."
            },
            {
              id: 5,
              question: "Pourquoi est-il recommandé d'inscrire une liste noire de commandes terminal (ex: rm -rf, git reset --hard) dans les directives de sécurité de l'agent ?",
              options: [
                "Pour empêcher l'agent d'accéder à Internet.",
                "Pour prévenir toute perte irrémédiable de données ou altération destructive de l'arborescence lors des phases d'expérimentation de l'agent.",
                "Parce que ces commandes sont dépréciées depuis 1995.",
                "Pour accélérer la compilation du code JavaScript."
              ],
              correctIndex: 1,
              explanation: "Un agent autonome manipule le terminal. Sans barrière explicite, une hypothèse erronée pourrait le conduire à réinitialiser l'historique Git ou effacer des fichiers locaux non commités."
            },
            {
              id: 6,
              question: "Où se positionnent généralement les fichiers de règles permanentes pour qu'ils soient reconnus nativement par les IDE modernes (Google Antigravity, Cursor, etc.) ?",
              options: [
                "Dans la corbeille de Windows.",
                "À la racine du repository Git (ex: AGENTS.md, .antigravity/rules ou .cursorrules), permettant à la fois le versionnement d'équipe et la détection automatique par l'IDE.",
                "Sur une clé USB externe déconnectée du réseau.",
                "Dans le répertoire temporaire C:\\Windows\\Temp."
              ],
              correctIndex: 1,
              explanation: "Placés à la racine du repository, ces fichiers font partie intégrante de la base de code, sont partagés entre tous les contributeurs via Git et sont automatiquement indexés par le moteur d'agent de l'IDE."
            }
          ]}
        />
      </section>
    </div>
  );
};
