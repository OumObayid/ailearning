'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface DiffProposal {
  id: string;
  title: string;
  fileTarget: string;
  linesChanged: string;
  diffContent: string;
  quality: 'perfect' | 'scope_creep' | 'toxic_regression';
  verdictLabel: string;
  explanation: string;
  recommendedAction: string;
}

const DIFF_PROPOSALS: DiffProposal[] = [
  {
    id: 'clean-surgical',
    title: 'Proposition A : Correctif Chirurgical & Minimaliste',
    fileTarget: 'src/services/currencyConverter.ts',
    linesChanged: '+3 / -1',
    diffContent: `--- a/src/services/currencyConverter.ts
+++ b/src/services/currencyConverter.ts
@@ -42,7 +42,9 @@ export function convertAmount(amount: number, fromRate: number, toRate: number):
-  return amount * (toRate / fromRate);
+  if (fromRate <= 0) {
+    throw new InvalidExchangeRateError(\`Taux d'origine invalide ou nul: \${fromRate}\`);
+  }
+  return Number((amount * (toRate / fromRate)).toFixed(4));`,
    quality: 'perfect',
    verdictLabel: 'APPROBATION RECOMMANDÉE (Clean Diff)',
    explanation: 'Le diff traite strictement la cause racine (division par zéro ou taux négatif), lève une exception métier explicite et arrondit proprement sans altérer aucune autre partie du fichier. Zéro pollution de style, zéro modification collatérale.',
    recommendedAction: 'Accepter le patch et exécuter la suite de tests unitaires.'
  },
  {
    id: 'scope-creep',
    title: 'Proposition B : Dérive de Périmètre (Scope Creep & Refactoring)',
    fileTarget: 'src/services/currencyConverter.ts',
    linesChanged: '+48 / -25',
    diffContent: `--- a/src/services/currencyConverter.ts
+++ b/src/services/currencyConverter.ts
@@ -1,30 +1,53 @@
-// Service de conversion hérité
-import { ExchangeAPI } from './api';
+import { z } from 'zod';
+import type { CurrencyCode } from '@/types/currency';
 
-export function convertAmount(amount: number, fromRate: number, toRate: number): number {
-  return amount * (toRate / fromRate);
-}
+// Refonte complète par l'IA sous forme de classe Singleton moderne
+export class AdvancedCurrencyExchangeManager {
+  private static instance: AdvancedCurrencyExchangeManager;
+  private cache: Map<string, number> = new Map();
+
+  private constructor() {}
+
+  public static getInstance(): AdvancedCurrencyExchangeManager {
+    if (!AdvancedCurrencyExchangeManager.instance) {
+      AdvancedCurrencyExchangeManager.instance = new AdvancedCurrencyExchangeManager();
+    }
+    return AdvancedCurrencyExchangeManager.instance;
+  }
+
+  public executeConversion(amount: number, fromRate: number, toRate: number): number {
+    if (fromRate === 0) return 0;
+    return amount * (toRate / fromRate);
+  }
+}`,
    quality: 'scope_creep',
    verdictLabel: 'REJET CATÉGORIQUE (Scope Creep)',
    explanation: "L'IA a profité de l'ordre de corriger une division par zéro pour transformer une simple fonction exportée en Singleton orienté objet, rompant l'API publique utilisée par 18 autres fichiers du projet. Ce genre d'initiative non sollicitée est une source majeure de régressions massives.",
    recommendedAction: 'Rejeter immédiatement (git checkout) et ordonner à l\'agent un correctif chirurgical sans refactoring.'
  },
  {
    id: 'toxic-suppression',
    title: 'Proposition C : Masquage Toxique & Silençage',
    fileTarget: 'src/services/currencyConverter.ts',
    linesChanged: '+5 / -1',
    diffContent: `--- a/src/services/currencyConverter.ts
+++ b/src/services/currencyConverter.ts
@@ -42,7 +42,11 @@ export function convertAmount(amount: number, fromRate: number, toRate: number):
-  return amount * (toRate / fromRate);
+  try {
+    return amount * (toRate / (fromRate || 1));
+  } catch {
+    return 0; // Pour éviter tout plantage utilisateur
+  }`,
    quality: 'toxic_regression',
    verdictLabel: 'REJET CATÉGORIQUE (Symptom Masking)',
    explanation: "Si fromRate vaut 0, l'IA force un fallback arbitraire à 1 (faussant lourdement le taux de change réel) et enveloppe le tout dans un try/catch qui renvoie 0. Une transaction bancaire sera alors enregistrée à 0€ sans lever d'alerte, provoquant un préjudice financier silencieux.",
    recommendedAction: 'Rejeter le patch et exiger la validation du contrat d\'échange.'
  }
];

export const Chapitre12Content: React.FC = () => {
  const [selectedProposal, setSelectedProposal] = useState<DiffProposal>(DIFF_PROPOSALS[0]);
  const [userDecision, setUserDecision] = useState<'approved' | 'rejected' | null>(null);

  const handleSelect = (p: DiffProposal) => {
    setSelectedProposal(p);
    setUserDecision(null);
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-cyan-200 bg-linear-to-r from-cyan-50 via-sky-50 to-blue-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-cyan-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
          <span>Module 6 — Diagnostic assisté par IA & Agents Autonomes • Section 6.12</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Faire Corriger un Bug par un Agent IA et Contrôler les Modifications
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Un diagnostic réussi ne donne pas carte blanche à l&apos;IA pour réécrire votre base de code. Apprenez à transformer une analyse validée en <strong>plan de patch chirurgical</strong>, à auditer impitoyablement les revues de <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-cyan-300 font-mono">git diff</code> et à rejeter les dérives de périmètre (<em>scope creep</em>).
        </p>
      </div>

      {/* Section 1: Découplage Diagnostic / Correction */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">Méthodologie Industrielle</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Le principe d&apos;étanchéité : du diagnostic validé au mandat de correction
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          L&apos;erreur la plus fréquente des équipes juniors consiste à demander à l&apos;agent : <em>&laquo; Trouve le bug et corrige-le &raquo;</em> en une seule phrase. Cette approche produit presque toujours un patch confus, mélangeant analyse approximative et réécriture sauvage de code.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-wide mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs">Phase 1</span>
              <span>L&apos;Enquête Étéinte (Read-Only)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Le diagnostic d&apos;abord</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              L&apos;agent n&apos;a pas le droit d&apos;écrire. Il explore les logs, compare les types, identifie la cause racine et formule son explication à l&apos;ingénieur. L&apos;ingénieur valide la logique humaine.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase tracking-wide mb-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">Phase 2</span>
              <span>Le Mandat de Patch Circonscrit</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">La correction ciblée</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Une fois la cause convenue, l&apos;ingénieur autorise l&apos;écriture <strong>exclusivement sur le fichier concerné</strong>, avec interdiction formelle de refactorer ou d&apos;altérer le style du reste du fichier.
            </p>
          </div>
        </div>

        <Callout type="info" title="La règle du Mandat de Correction">
          Ne dites jamais : <em>&laquo; Applique la correction &raquo;</em>.<br />
          Dites : <em>&laquo; Applique le patch chirurgical sur la fonction convertAmount dans src/services/currencyConverter.ts. Ne touche à aucun import, ne renomme aucune variable existante, et ajoute un test unitaire prouvant la résolution dans test/currencyConverter.test.ts. &raquo;</em>
        </Callout>
      </section>

      {/* Section 2: La Checklist du Senior Reviewer sur Git Diff */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">Revue de Code</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. La Checklist du Code Reviewer : Auditer un Git Diff produit par une IA
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Avant d&apos;approuver le diff proposé par l&apos;agent dans votre IDE, soumettez chaque ligne modifiée à ces 4 questions éliminatoires :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-indigo-700 uppercase mb-1">Critère 1 : Le test du périmètre strict</div>
            <p className="text-xs sm:text-sm text-slate-700">
              Y a-t-il la moindre ligne modifiée qui n&apos;est pas <em>strictement</em> indispensable à la résolution de la cause racine ? Si l&apos;IA a reformaté des lignes adjacentes ou réorganisé les imports, demandez la purge de ces modifications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-indigo-700 uppercase mb-1">Critère 2 : L&apos;intégrité de l&apos;interface publique</div>
            <p className="text-xs sm:text-sm text-slate-700">
              La signature de la fonction a-t-elle changé ? Un paramètre a-t-il été renommé ou rendu optionnel ? Si oui, l&apos;agent risque de casser des dizaines d&apos;appels consommateurs ailleurs dans le projet.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-indigo-700 uppercase mb-1">Critère 3 : La gestion des cas aux limites</div>
            <p className="text-xs sm:text-sm text-slate-700">
              Le patch traite-t-il les valeurs extrêmes (<code className="text-xs font-mono">null</code>, <code className="text-xs font-mono">0</code>, chaîne vide, tableau vide) par une validation explicite ou s&apos;est-il contenté d&apos;un fallback silencieux arbitraire ?
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-indigo-700 uppercase mb-1">Critère 4 : La preuve automatisée associée</div>
            <p className="text-xs sm:text-sm text-slate-700">
              Le diff inclut-il un nouveau test unitaire démontrant que le cas de défaillance est désormais couvert et ne pourra plus jamais réapparaître ?
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Studio Interactif d'Inspection de Git Diff */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">Studio Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Studio d&apos;Audit de Git Diff IA
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Trois agents IA distincts ont soumis une proposition de correctif pour résoudre un crash de division par zéro dans le service de conversion monétaire. Examinez le diff unifié et décidez d&apos;approuver ou de rejeter chaque proposition :
        </p>

        {/* Sélecteur de proposition */}
        <div className="flex flex-wrap gap-2.5">
          {DIFF_PROPOSALS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                selectedProposal.id === p.id
                  ? 'bg-cyan-700 text-white shadow-md'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Visualiseur de diff */}
        <div className="rounded-2xl bg-white border border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-3.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono font-bold">{selectedProposal.fileTarget}</span>
            </div>
            <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2.5 py-0.5 rounded">
              Lignes : {selectedProposal.linesChanged}
            </span>
          </div>

          <div className="p-4 bg-slate-950">
            <CodeBlock language="diff">{selectedProposal.diffContent}</CodeBlock>
          </div>

          {/* Décision du développeur */}
          <div className="p-5 border-t border-slate-200 space-y-4">
            <div className="text-sm font-bold text-slate-900">
              Votre décision d&apos;ingénieur sur ce Git Diff :
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setUserDecision('approved')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  userDecision === 'approved'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                 Approuver (git apply & commit)
              </button>
              <button
                onClick={() => setUserDecision('rejected')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  userDecision === 'rejected'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                ❌ Rejeter (git checkout & recommencer)
              </button>
            </div>

            {/* Analyse détaillée après choix */}
            {userDecision && (
              <div className={`p-4 rounded-xl border mt-3 text-xs sm:text-sm ${
                (userDecision === 'approved' && selectedProposal.quality === 'perfect') ||
                (userDecision === 'rejected' && selectedProposal.quality !== 'perfect')
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="font-bold mb-1">
                  {(userDecision === 'approved' && selectedProposal.quality === 'perfect') ||
                  (userDecision === 'rejected' && selectedProposal.quality !== 'perfect')
                    ? ' Décision pertinente !'
                    : '⚠️ Erreur d\'appréciation d\'ingénierie :'}
                </div>
                <div className="font-black text-xs uppercase mb-2 text-slate-700">
                  Évaluation Senior : {selectedProposal.verdictLabel}
                </div>
                <p className="leading-relaxed mb-2 font-medium">{selectedProposal.explanation}</p>
                <div className="p-2.5 bg-white/80 rounded-lg border border-slate-200 text-xs font-mono text-slate-800">
                  <strong>Recommandation :</strong> {selectedProposal.recommendedAction}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Pilotage de correctif et contrôle des modifications Git
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 6.12 — Remédiation Assistée et Revue de Modifications"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il impératif de séparer la phase de diagnostic de la phase de correction du code ?",
              options: [
                "Pour permettre aux serveurs de l'IA de refroidir entre deux requêtes.",
                "Pour s'assurer que la cause racine est rigoureusement comprise et validée par l'ingénieur humain avant d'autoriser l'altération des fichiers sources.",
                "Parce que les langages compilés refusent de s'exécuter si le prompt contient plus de 10 mots.",
                "Pour doubler artificiellement le temps facturé au client."
              ],
              correctIndex: 1,
              explanation: "Séparer diagnostic et remédiation empêche l'agent d'appliquer des patchs compulsifs au hasard sur des symptômes superficiels sans avoir identifié la cause sous-jacente."
            },
            {
              id: 2,
              question: "Qu'appelle-t-on le 'Scope Creep' (dérive de périmètre) lorsqu'un agent IA soumet un diff de correction ?",
              options: [
                "Une erreur de connexion au réseau WiFi.",
                "Le phénomène où l'IA profite d'une demande de correction ponctuelle pour refactorer, reformater ou réécrire arbitrairement de multiples fonctions ou fichiers non demandés.",
                "Le fait qu'un bug se déplace sur un autre serveur.",
                "L'utilisation d'une version obsolète de Python."
              ],
              correctIndex: 1,
              explanation: "Le Scope Creep dilue la responsabilité du patch : il introduit des modifications cosmétiques ou architecturales non sollicitées qui masquent le vrai correctif et multiplient les risques de régressions collatérales."
            },
            {
              id: 3,
              question: "Face à un git diff de 400 lignes pour corriger un simple bug de conversion de devises, quelle doit être votre réaction immédiate ?",
              options: [
                "Merger le code immédiatement pour gagner du temps.",
                "Rejeter le diff (git checkout) et exiger de l'agent un patch chirurgical ciblant exclusivement les quelques lignes défaillantes sans refactoring.",
                "Supprimer Git du serveur de production.",
                "Réécrire le projet en langage C."
              ],
              correctIndex: 1,
              explanation: "Un diff disproportionné par rapport à l'anomalie est le signe d'un dérapage de périmètre de l'agent. Le rôle de l'ingénieur est d'imposer un patch minimaliste et contrôlable."
            },
            {
              id: 4,
              question: "Pourquoi la proposition d'envelopper un calcul monétaire dans un 'try/catch { return 0; }' est-elle inacceptable en production ?",
              options: [
                "Parce que le chiffre 0 porte malheur en informatique.",
                "Parce qu'elle étouffe silencieusement l'anomalie de données et risque d'enregistrer des transactions bancaires à 0€ sans lever d'alerte, provoquant un désastre comptable.",
                "Parce que le mot-clé try est interdit en JavaScript moderne.",
                "Parce que le compilateur TypeScript mettra 10 minutes de plus à compiler."
              ],
              correctIndex: 1,
              explanation: "Ce type de correctif toxique (symptom masking) remplace un crash explicite et détectable par une corruption silencieuse de données métiers aux conséquences financières graves."
            },
            {
              id: 5,
              question: "Quel livrable indissociable du code doit obligatoirement accompagner un patch de débogage réussi ?",
              options: [
                "Une lettre d'excuse rédigée par l'agent IA.",
                "Un test automatisé (unitaire ou d'intégration) qui échouait avant le correctif et réussit après son application.",
                "Une nouvelle image de fond d'écran pour l'IDE.",
                "L'installation d'une nouvelle extension de thème VS Code."
              ],
              correctIndex: 1,
              explanation: "Le test automatisé est le contrat de non-régression : il prouve que le cas particulier est désormais blindé contre tout retour futur du bug."
            },
            {
              id: 6,
              question: "Quelle commande Git permet d'inspecter précisément et ligne par ligne le travail réalisé par un agent avant de l'enregistrer dans l'historique ?",
              options: [
                "git rm --all",
                "git diff (ou git diff --staged)",
                "git push --force origin main",
                "git init"
              ],
              correctIndex: 1,
              explanation: "La commande 'git diff' est l'instrument fondamental de l'ingénieur pour inspecter les ajouts (+) et suppressions (-) exactes avant tout commit."
            }
          ]}
        />
      </section>
    </div>
  );
};
