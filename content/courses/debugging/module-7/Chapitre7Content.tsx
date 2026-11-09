'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface AtomicPatch {
  id: string;
  ticket: string;
  branch: string;
  commitMessage: string;
  filePath: string;
  diffSummary: string;
  unifiedDiff: string;
  testCommand: string;
}

const ATOMIC_PATCHES: AtomicPatch[] = [
  {
    id: 'patch-pool',
    ticket: 'FIX-01',
    branch: 'fix/mysql-connection-leak',
    commitMessage: 'fix(db): ensure pool connection release in finally block to prevent exhaustion',
    filePath: 'src/backend/config/database.ts',
    diffSummary: '+6 / -2 lignes modifiées',
    unifiedDiff: `--- a/src/backend/config/database.ts
+++ b/src/backend/config/database.ts
@@ -38,10 +38,14 @@ export async function executeTransaction<T>(callback: (conn: PoolConnection) =>
   const conn = await pool.getConnection();
   try {
     await conn.beginTransaction();
     const result = await callback(conn);
     await conn.commit();
     return result;
   } catch (error) {
     await conn.rollback();
     throw error;
+  } finally {
+    // Sanctuarisation : libération garantie même en cas d'exception
+    conn.release();
   }`,
    testCommand: 'npx vitest run test/integration/dbPoolStress.test.ts'
  },
  {
    id: 'patch-idor',
    ticket: 'FIX-02',
    branch: 'fix/order-idor-authorization',
    commitMessage: 'fix(security): enforce resource ownership check in getOrderById to prevent IDOR',
    filePath: 'src/backend/controllers/order.controller.ts',
    diffSummary: '+7 / -1 lignes modifiées',
    unifiedDiff: `--- a/src/backend/controllers/order.controller.ts
+++ b/src/backend/controllers/order.controller.ts
@@ -24,7 +24,13 @@ export async function getOrderById(req: Request, res: Response) {
   const order = await orderRepository.findById(orderId);
   if (!order) {
     return res.status(404).json({ error: "Commande introuvable" });
   }
+  // Contrôle de sécurité strict : vérification d'appartenance
+  if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
+    req.log.warn({ orderId, requestUserId: req.user.id }, "Tentative d'accès non autorisé IDOR");
+    return res.status(403).json({ error: "Accès refusé à cette ressource" });
+  }
   return res.json(order);`,
    testCommand: 'npx vitest run test/integration/orderAuthorization.test.ts'
  },
  {
    id: 'patch-client-auth',
    ticket: 'FIX-04',
    branch: 'fix/auth-payload-contract',
    commitMessage: 'fix(auth): align frontend login payload key with backend schema (password)',
    filePath: 'src/frontend/hooks/useAuth.ts',
    diffSummary: '+1 / -1 lignes modifiées',
    unifiedDiff: `--- a/src/frontend/hooks/useAuth.ts
+++ b/src/frontend/hooks/useAuth.ts
@@ -18,7 +18,7 @@ export async function login(email: string, passwordUser: string) {
   const response = await fetch('/api/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
-    body: JSON.stringify({ email, passwordUser })
+    body: JSON.stringify({ email, password: passwordUser })
   });
   return response.json();`,
    testCommand: 'npx vitest run test/unit/useAuth.test.ts'
  }
];

export const Chapitre7Content: React.FC = () => {
  const [selectedPatch, setSelectedPatch] = useState<AtomicPatch>(ATOMIC_PATCHES[0]);
  const [committedPatches, setCommittedPatches] = useState<string[]>([]);

  const handleApplyCommit = (id: string) => {
    if (!committedPatches.includes(id)) {
      setCommittedPatches((prev) => [...prev, id]);
    }
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.7</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Application Progressive des Correctifs et Discipline des Commits Atomiques
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Le piège absolu en fin de projet consiste à modifier 10 fichiers en vrac et à commiter avec le message &laquo; fix bugs &raquo;. La vraie ingénierie logicielle repose sur le principe de <strong>l&apos;atome de remédiation</strong> : une branche dédiée, un patch chirurgical, un test de validation et un commit sémantique documenté.
        </p>
      </div>

      {/* Section 1: La Règle des Commits Atomiques */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Discipline de Versionnement</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Le principe du commit atomique en ingénierie de débogage
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Un commit atomique est une unité de modification indivisible qui ne traite <em>qu&apos;un seul problème</em>, accompagné de son test unitaire ou d&apos;intégration associé :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs">
            <div className="text-xs font-bold text-rose-700 uppercase mb-2">❌ Le commit fourre-tout toxique</div>
            <div className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-xl mb-2">
              git commit -m &quot;fix: réparé le login, l&apos;IDOR, les commandes et clean du code&quot;
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modifie 18 fichiers simultanément. Si une régression apparaît, il est impossible d&apos;isoler le coupable par <code className="text-xs font-mono">git bisect</code> ou de faire un <code className="text-xs font-mono">git revert</code> propre.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs">
            <div className="text-xs font-bold text-emerald-700 uppercase mb-2"> Le commit sémantique atomique (Conventional Commits)</div>
            <div className="p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-xl mb-2">
              git commit -m &quot;fix(security): enforce resource ownership check in getOrderById (FIX-02)&quot;
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ne touche que le contrôleur concerné et son test. Peut être audité, cherry-pické ou révoqué individuellement en 1 seconde.
            </p>
          </div>
        </div>

        <Callout type="info" title="L'isolation par branche Git de travail">
          Ne modifiez jamais la branche principale <code className="text-xs font-mono bg-white px-1 py-0.5 rounded border border-slate-200">main</code> directement pendant l&apos;investigation. Créez systématiquement une branche dédiée : <code className="text-xs font-mono bg-white px-1 py-0.5 rounded border border-slate-200">git checkout -b fix/capstone-remediation</code>. Vous pouvez ainsi comparer vos modifications avec <code className="text-xs font-mono bg-white px-1 py-0.5 rounded border border-slate-200">git diff main</code> à tout instant.
        </Callout>
      </section>

      {/* Section 2: Simulateur Interactif d'Application de Patchs */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Banc d&apos;Essai Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Atelier : Revue de Git Diff et Enregistrement des Commits Atomiques
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Appliquez méthodiquement les trois patchs chirurgicaux élaborés pour notre projet Capstone. Pour chaque patch, examinez le diff unifié, vérifiez la commande de test et confirmez l&apos;enregistrement du commit sémantique :
        </p>

        {/* Sélecteur de patch */}
        <div className="flex flex-wrap gap-2.5">
          {ATOMIC_PATCHES.map((patch) => {
            const isCommitted = committedPatches.includes(patch.id);
            const isSelected = selectedPatch.id === patch.id;
            return (
              <button
                key={patch.id}
                onClick={() => setSelectedPatch(patch)}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{isCommitted ? '✓' : '○'}</span>
                <span>{patch.ticket} : {patch.commitMessage.slice(0, 35)}...</span>
              </button>
            );
          })}
        </div>

        {/* Affichage du diff et de la console Git */}
        <div className="rounded-2xl bg-white border border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">{selectedPatch.ticket} • {selectedPatch.filePath}</span>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Branche : {selectedPatch.branch} | {selectedPatch.diffSummary}</div>
            </div>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
              committedPatches.includes(selectedPatch.id)
                ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                : 'bg-amber-900/60 text-amber-300 border border-amber-700'
            }`}>
              {committedPatches.includes(selectedPatch.id) ? 'COMMITTÉ DANS GIT' : 'EN ATTENTE DE REVUE'}
            </span>
          </div>

          <div className="p-4 bg-slate-950">
            <CodeBlock language="diff">{selectedPatch.unifiedDiff}</CodeBlock>
          </div>

          <div className="p-5 border-t border-slate-200 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Commande de test de falsification associée :</div>
              <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-xs text-slate-800">
                {selectedPatch.testCommand}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Message de commit sémantique préparé :</div>
              <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs">
                git commit -m &quot;{selectedPatch.commitMessage}&quot;
              </div>
            </div>

            <div className="pt-2">
              <button
                disabled={committedPatches.includes(selectedPatch.id)}
                onClick={() => handleApplyCommit(selectedPatch.id)}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs disabled:opacity-40"
              >
                {committedPatches.includes(selectedPatch.id)
                  ? ' Patch déjà validé et commité avec succès'
                  : 'Approuver le Git Diff et exécuter le commit atomique'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Quiz : Correction progressive et hygiène de versionnement Git
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.7 — Commits Atomiques, Diff Review et Isolation Git"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il rigoureusement interdit de regrouper la correction de 5 anomalies hétérogènes dans un unique commit 'fix bugs' ?",
              options: [
                "Parce que les serveurs GitHub refusent les commits dont le message contient moins de 20 mots.",
                "Parce qu'en cas de régression en production, il devient impossible d'utiliser 'git bisect' pour identifier le fragment responsable ou d'effectuer un 'git revert' chirurgical sans annuler les autres correctifs valides.",
                "Parce que cela consomme deux fois plus d'espace sur le disque dur.",
                "Pour respecter une règle esthétique imposée par les graphistes."
              ],
              correctIndex: 1,
              explanation: "Le commit atomique préserve la traçabilité chirurgicale : chaque modification a une cause univoque et peut être isolée ou révoquée indépendamment."
            },
            {
              id: 2,
              question: "Dans le standard 'Conventional Commits', quel préfixe conventionnel doit porter un commit corrigeant une vulnérabilité de sécurité ?",
              options: [
                "feat(security):",
                "fix(security): ou fix(sec):",
                "docs(security):",
                "chore(security):"
              ],
              correctIndex: 1,
              explanation: "Le mot-clé 'fix' signale formellement une remédiation de bogue ou de vulnérabilité, déclenchant automatiquement l'incrémentation du numéro de patch dans le versionnement sémantique (SemVer)."
            },
            {
              id: 3,
              question: "Pourquoi la libération d'une connexion SQL (conn.release()) doit-elle être placée dans un bloc 'finally' et non dans le bloc 'try' ?",
              options: [
                "Parce que le mot-clé finally accélère la vitesse d'exécution de 40%.",
                "Parce que si une exception survient au milieu du bloc try, les lignes suivantes du try sont sautées : la connexion ne serait jamais libérée, provoquant une fuite fatale (connection leak). Le bloc finally s'exécute toujours, avec ou sans erreur.",
                "Parce que TypeScript refuse de compiler conn.release() dans un try.",
                "Pour des raisons de rétrocompatibilité avec Internet Explorer 6."
              ],
              correctIndex: 1,
              explanation: "Le bloc 'finally' offre la garantie absolue d'exécution du nettoyage des ressources, même en cas de crash brutal ou de rejet d'exception dans la transaction."
            },
            {
              id: 4,
              question: "Quelle commande Git permet d'examiner le travail en attente (staged) avant d'enregistrer formellement le commit ?",
              options: [
                "git status -v ou git diff --staged (git diff --cached)",
                "git push --force origin main",
                "git clean -fdx",
                "git branch -D main"
              ],
              correctIndex: 0,
              explanation: "La commande 'git diff --staged' affiche précisément les lignes prêtes à être figées dans l'historique, permettant à l'ingénieur de repérer d'éventuelles modifications parasites."
            },
            {
              id: 5,
              question: "Lorsque l'agent d'IDE propose d'appliquer un patch, quelle attitude doit adopter l'ingénieur face aux lignes de reformatage cosmétique ajoutées par l'agent ?",
              options: [
                "Les accepter toutes sans regarder.",
                "Les rejeter impérativement pour ne conserver dans le diff que la stricte correction de la cause racine et son test associé.",
                "Supprimer Git pour ne plus voir les diffs.",
                "Renommer le projet."
              ],
              correctIndex: 1,
              explanation: "Le bruit de formatage pollue l'historique de versionnement (git blame) et augmente le risque de conflits de fusion (merge conflicts). Les patchs doivent rester chirurgicaux."
            },
            {
              id: 6,
              question: "Quelle est la règle d'or lors de la correction progressive d'une anomalie complexe ?",
              options: [
                "Travailler directement sur le serveur de production sans faire de commit.",
                "Une anomalie à la fois : Test Red -> Patch chirurgical -> Test Green -> npx tsc -> Commit atomique documenté.",
                "Corriger tous les fichiers un vendredi à 18h avant de partir en week-end.",
                "Désactiver le compilateur TypeScript pour gagner du temps."
              ],
              correctIndex: 1,
              explanation: "Ce cycle déterministe garantit que chaque étape est solidement homologuée avant d'aborder le problème suivant, éliminant les régressions croisées."
            }
          ]}
        />
      </section>
    </div>
  );
};
