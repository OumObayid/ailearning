'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  // Simulateur interactif : Générateur de Dossier de Release & Checklist
  const [releaseVersion, setReleaseVersion] = useState<string>('v1.0.0');
  const [checklist, setChecklist] = useState({
    codeClean: true,
    testsPass: true,
    docComplete: true,
    secretsExcluded: true,
    pmApproved: false
  });

  const allChecksPass = checklist.codeClean && checklist.testsPass && checklist.docComplete && checklist.secretsExcluded && checklist.pmApproved;

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 8
          </span>
          <span className="text-xs text-muted-foreground">1 h de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Préparer la livraison du projet
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Une fois le code intégré et testé, le projet n'est pas encore livré. Découvrez comment formaliser un livrable prêt pour la remise finale : étiquetage sémantique Git (<code>git tag</code>), documentation d'installation autonome, explicitation des limites techniques (comme la persistance en mémoire) et checklist de recette finale.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de gouvernance & autorisation de release</p>
        <p className="text-sm leading-relaxed">
          La préparation d'un dossier de livraison par le Team Leader et les agents spécialisés ne vaut pas autorisation de publication. Seul le <strong>Project Manager humain</strong> a l'autorité légale et contractuelle pour prononcer la validation finale et autoriser la diffusion du livrable.
        </p>
      </Callout>

      {/* Section 1 : Intégration vs Livraison */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="package" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>1. Distinguer Intégration et Livraison</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 text-xs leading-relaxed">
            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
                <span className="font-bold text-blue-400">Intégration (Technique interne) :</span>
                <p className="text-muted-foreground">Rassemble les branches de développement dans une même base de code commune (sur <code>develop</code> ou <code>main</code>) et valide leur cohabitation par les tests.</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
                <span className="font-bold text-emerald-400">Livraison (Remise externe ou finale) :</span>
                <p className="text-muted-foreground">Prépare le package complet à destination de l'utilisateur ou du client : code stable, tag de version, guide d'installation (<code>README.md</code>), prérequis matériels, tests reproductibles et limites techniques connues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Le versionnement sémantique et les tags Git */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="tag" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>2. Versionnement sémantique et tags immuables</span>
        </h2>
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col gap-3 min-w-0 max-w-full">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
            Pour identifier de façon certaine l'état du code remis, l'équipe applique la convention SemVer (<code>MAJOR.MINOR.PATCH</code>) combinée aux tags annotés Git :
          </p>
          <div className="grid grid-cols-1 gap-2.5 font-mono text-xs min-w-0 max-w-full">
            <div className="p-3 rounded-lg bg-black border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
              <span className="text-sky-400 font-bold text-xs sm:text-sm break-words [overflow-wrap:anywhere]">git rev-parse HEAD</span>
              <p className="text-slate-300 font-sans mt-0.5 text-xs leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">Identifie le hash SHA unique du commit servant de référence absolue au livrable.</p>
            </div>
            <div className="p-3 rounded-lg bg-black border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
              <span className="text-emerald-400 font-bold text-xs sm:text-sm break-words [overflow-wrap:anywhere]">git tag -a v1.0.0 -m "Release initiale TaskFlow"</span>
              <p className="text-slate-300 font-sans mt-0.5 text-xs leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">Associe un tag annoté immuable au commit sans risque de dérive future.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 : La documentation obligatoire et transparence des limites */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="file-text" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>3. Le dossier documentaire : Expliciter les limites connues</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 text-xs leading-relaxed">
          <p className="text-muted-foreground">
            Le fichier <code>README.md</code> est l'élément contractuel central du livrable. Il doit comporter :
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
            <li><strong>Installation reproductible :</strong> <code>npm ci</code> dans les sous-dossiers respectifs (garantit l'exactitude des versions verrouillées par <code>package-lock.json</code>).</li>
            <li><strong>Démarrage :</strong> Commandes exactes pour lancer backend et frontend en parallèle.</li>
            <li><strong>Lancement des tests :</strong> <code>npx vitest run</code>.</li>
            <li><strong>Limites techniques assumées :</strong> Dans TaskFlow, les données sont stockées en mémoire volatile. L'arrêt du serveur réinitialise les tâches. Il est impératif de documenter cette limite pour éviter toute attente erronée de persistance SQL.</li>
          </ul>
        </div>
      </div>

      {/* Section 4 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>4. Atelier Interactif — Générateur de Dossier de Release & Checklist</span>
        </h2>
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col gap-4 min-w-0 max-w-full">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
            Configurez la release de TaskFlow. Cochez les critères d'acceptation requis pour soumettre la demande de livraison au Project Manager.
          </p>

          <div className="grid grid-cols-1 gap-2 text-xs min-w-0 max-w-full">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              <span className="font-semibold text-white text-xs sm:text-sm">Tag de version SemVer proposé :</span>
              <input
                type="text"
                value={releaseVersion}
                onChange={(e) => setReleaseVersion(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-black font-mono text-xs text-white font-bold w-28 text-center focus:outline-none focus:border-indigo-500 transition-colors shrink-0"
              />
            </div>
          </div>

          {/* Checklist de livraison */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3 text-xs min-w-0 max-w-full">
            <span className="font-bold text-white text-sm">Checklist de Validation Finale de Livraison :</span>

            <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.codeClean}
                onChange={(e) => setChecklist({ ...checklist, codeClean: e.target.checked })}
                className="rounded border-slate-700 mt-0.5 sm:mt-0 accent-indigo-600 shrink-0"
              />
              <span className="text-slate-200 text-xs sm:text-sm leading-relaxed">Dépôt propre : 0 fichier non suivi, build TypeScript sans erreur</span>
            </label>

            <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.testsPass}
                onChange={(e) => setChecklist({ ...checklist, testsPass: e.target.checked })}
                className="rounded border-slate-700 mt-0.5 sm:mt-0 accent-indigo-600 shrink-0"
              />
              <span className="text-slate-200 text-xs sm:text-sm leading-relaxed">Campagne de tests complète au vert (unitaires + Supertest + non-régression)</span>
            </label>

            <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.docComplete}
                onChange={(e) => setChecklist({ ...checklist, docComplete: e.target.checked })}
                className="rounded border-slate-700 mt-0.5 sm:mt-0 accent-indigo-600 shrink-0"
              />
              <span className="text-slate-200 text-xs sm:text-sm leading-relaxed">README complet (prérequis, installation npm ci, limites mémoire documentées)</span>
            </label>

            <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.secretsExcluded}
                onChange={(e) => setChecklist({ ...checklist, secretsExcluded: e.target.checked })}
                className="rounded border-slate-700 mt-0.5 sm:mt-0 accent-indigo-600 shrink-0"
              />
              <span className="text-slate-200 text-xs sm:text-sm leading-relaxed">Sécurité : Aucun secret ni .env commité dans le dossier de livraison</span>
            </label>

            <label className="flex items-start sm:items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.pmApproved}
                onChange={(e) => setChecklist({ ...checklist, pmApproved: e.target.checked })}
                className="rounded border-slate-700 mt-0.5 sm:mt-0 accent-indigo-600 shrink-0"
              />
              <span className="text-indigo-400 font-bold text-xs sm:text-sm leading-relaxed">Autorisation souveraine accordée par le Project Manager humain</span>
            </label>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs sm:text-sm flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 ${
            allChecksPass ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-200' : 'bg-amber-950/80 border-amber-700/80 text-amber-200'
          }`}>
            <span className="font-bold leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              {allChecksPass ? `🎉 Dossier ${releaseVersion} validé et autorisé pour livraison !` : '⚠️ En attente des conditions de livraison obligatoires'}
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-black/50 border border-current shrink-0">
              {allChecksPass ? 'STATUT: LIVRÉ' : 'STATUT: EN PRÉPARATION'}
            </span>
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 8 : Préparer la livraison du projet"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence principale entre intégration et livraison ?",
              options: [
                "L'intégration concerne uniquement la documentation ; la livraison concerne uniquement le code.",
                "L'intégration réunit les contributions ; la livraison prépare une version à remettre.",
                "L'intégration et la livraison désignent exactement la même opération.",
                "La livraison doit toujours être réalisée avant l'intégration."
              ],
              correctIndex: 1,
              explanation: "L'intégration rassemble le code en interne ; la livraison prépare et remet un produit fini, vérifié et documenté au destinataire."
            },
            {
              id: 2,
              question: "Pourquoi faut-il définir les critères de livraison avant la remise du projet ?",
              options: [
                "Pour éviter d'avoir à exécuter des tests.",
                "Pour permettre aux agents de choisir librement les fonctionnalités.",
                "Pour déterminer objectivement les conditions que le projet doit satisfaire.",
                "Pour remplacer la validation du Project Manager."
              ],
              correctIndex: 2,
              explanation: "Des critères objectifs permettent de mesurer de façon indiscutable la complétude du livrable avant signature."
            },
            {
              id: 3,
              question: "Quelle commande permet d'identifier précisément le commit courant ?",
              options: [
                "git rev-parse HEAD",
                "git branch --delete",
                "git merge --abort",
                "git diff --check"
              ],
              correctIndex: 0,
              explanation: "git rev-parse HEAD retourne le hash SHA-1 complet identifiant sans ambiguïté le commit actif."
            },
            {
              id: 4,
              question: "Dans un projet utilisant npm avec un fichier package-lock.json, quelle commande permet une installation fondée sur le fichier de verrouillage ?",
              options: [
                "npm publish",
                "npm update --force",
                "npm run build",
                "npm ci"
              ],
              correctIndex: 3,
              explanation: "npm ci (Clean Install) installe exactement les versions figées dans le lockfile sans modifier les dépendances."
            },
            {
              id: 5,
              question: "À quoi sert principalement un tag Git de version ?",
              options: [
                "À remplacer les tests automatisés.",
                "À associer un nom à un commit précis.",
                "À fusionner automatiquement toutes les branches.",
                "À supprimer les modifications non suivies."
              ],
              correctIndex: 1,
              explanation: "Un tag étiquette un commit spécifique pour pouvoir le retrouver ou le déployer à tout moment dans le temps."
            },
            {
              id: 6,
              question: "Quels éléments peuvent faire partie d'une documentation de livraison ?",
              options: [
                "Les prérequis techniques, les instructions d'installation/démarrage, les résultats de tests réels et les limites connues.",
                "Uniquement le fichier .gitignore.",
                "Uniquement l'historique des conversations des agents.",
                "Les mots de passe administrateur en clair."
              ],
              correctIndex: 0,
              explanation: "Une documentation complète guide le destinataire depuis l'installation jusqu'aux limites techniques connues."
            },
            {
              id: 7,
              question: "Le QA signale une anomalie qui empêche une fonctionnalité essentielle de fonctionner. Quelle est la conduite appropriée ?",
              options: [
                "Ignorer le problème si le frontend se construit correctement.",
                "Supprimer le test qui détecte l'anomalie.",
                "Examiner son impact, organiser sa correction et vérifier le résultat avant la décision de livraison.",
                "Déclarer automatiquement le projet livré."
              ],
              correctIndex: 2,
              explanation: "Un bug bloquant doit être traité et revérifié avant toute remise, sous peine de livrer un produit défectueux."
            },
            {
              id: 8,
              question: "Quel est le rôle principal du Team Leader dans la préparation de la livraison ?",
              options: [
                "Coordonner les dernières vérifications et rassembler les rapports pour le Project Manager.",
                "Remplacer toutes les responsabilités des agents spécialisés.",
                "Autoriser automatiquement le déploiement en production.",
                "Modifier les critères d'acceptation sans validation."
              ],
              correctIndex: 0,
              explanation: "Le Team Leader prépare le dossier de synthèse et veille à ce que toutes les preuves techniques soient prêtes pour le PM."
            },
            {
              id: 9,
              question: "Un projet dont toutes les contributions sont intégrées est nécessairement prêt à être livré.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : après l'intégration, il reste les tests globaux, la documentation, l'étiquetage et la validation humaine d'acceptation."
            },
            {
              id: 10,
              question: "Une livraison peut être préparée et documentée par le Team Leader, mais sa validation finale reste soumise à la décision du Project Manager humain dans l'organisation TaskFlow.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : la validation finale et l'autorisation de diffusion restent la prérogative souveraine du PM humain."
            }
          ]}
        />
      </div>
    </div>
  );
};
