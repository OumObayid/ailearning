'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface RemediationTask {
  id: string;
  order: number;
  code: string;
  title: string;
  targetFiles: string[];
  blastRadius: 'FAIBLE' | 'MOYEN' | 'ÉLEVÉ';
  dependency: string;
  validationTest: string;
}

const REMEDIATION_TASKS: RemediationTask[] = [
  {
    id: 't-db-pool',
    order: 1,
    code: 'FIX-01',
    title: 'Sanctuarisation du Pool MySQL & Correction du Connection Leak',
    targetFiles: ['src/backend/config/database.ts'],
    blastRadius: 'FAIBLE',
    dependency: 'Aucune (Fondation infrastructure)',
    validationTest: 'test/integration/dbPoolStress.test.ts (50 requêtes concurrentes)'
  },
  {
    id: 't-auth-idor',
    order: 2,
    code: 'FIX-02',
    title: 'Contrôle d\'Autorisation IDOR sur les Commandes',
    targetFiles: ['src/backend/controllers/order.controller.ts'],
    blastRadius: 'MOYEN',
    dependency: 'FIX-01 (Nécessite un accès DB stable)',
    validationTest: 'test/integration/orderAuthorization.test.ts (Vérification 403 sur cross-user)'
  },
  {
    id: 't-order-404',
    order: 3,
    code: 'FIX-03',
    title: 'Gestion Contractuelle HTTP 404 sur Commande Inexistante',
    targetFiles: ['src/backend/controllers/order.controller.ts', 'src/backend/repositories/order.repository.ts'],
    blastRadius: 'FAIBLE',
    dependency: 'FIX-02 (Appliqué sur le même contrôleur)',
    validationTest: 'test/integration/orderNotFound.test.ts (Vérification 404 sur ID 999999)'
  },
  {
    id: 't-client-payload',
    order: 4,
    code: 'FIX-04',
    title: 'Harmonisation du Payload React dans useAuth.ts',
    targetFiles: ['src/frontend/hooks/useAuth.ts', 'src/frontend/components/LoginForm.tsx'],
    blastRadius: 'MOYEN',
    dependency: 'FIX-02 & FIX-03 (Contrats API backend stabilisés)',
    validationTest: 'test/unit/useAuth.test.ts & Test E2E de connexion'
  }
];

export const Chapitre6Content: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<RemediationTask>(REMEDIATION_TASKS[0]);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.6</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Élaboration du Plan de Correction et Maîtrise du Rayon d&apos;Impact (Blast Radius)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Un diagnostic réussi ne garantit rien si le correctif est déployé dans le désordre. Dans un projet multicouche complexe, modifier le frontend avant d&apos;avoir stabilisé le schéma backend provoque des régressions croisées ingérables. Découvrez comment structurer une <strong>Fiche de Remédiation</strong> et ordonnancer les dépendances.
        </p>
      </div>

      {/* Section 1: La Notion de Blast Radius (Rayon d'Impact) */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Gestion des Risques</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Mesurer le rayon d&apos;impact (Blast Radius) avant de modifier un fichier
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Le <strong>Blast Radius</strong> mesure l&apos;étendue maximale des dommages potentiels causés à l&apos;écosystème si le correctif appliqué venait à comporter une anomalie imprévue :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">Blast Radius Faible</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Module Isolé</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modification d&apos;une fonction utilitaire pure sans dépendance externe ou d&apos;un contrôleur dédié à un point d&apos;entrée unique.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg">Risque de régression limité</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">Blast Radius Moyen</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Contrat d&apos;Interface Métier</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modification d&apos;un schéma d&apos;authentification ou d&apos;un service partagé entre le frontend React et plusieurs routes de l&apos;API.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-amber-700 bg-amber-50 p-2 rounded-lg">Exige des tests d&apos;intégration</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-black">Blast Radius Élevé</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Infrastructure Transverse</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Altération du pool de connexions MySQL, du middleware d&apos;authentification global JWT ou du fichier de configuration TypeScript racine.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-rose-700 bg-rose-50 p-2 rounded-lg font-bold">Peut paralyser tout le site</div>
          </div>
        </div>

        <Callout type="warning" title="La règle de la Whitelist de Fichiers">
          Lorsque vous confiez une tâche de correction à un agent IA dans votre IDE, votre instruction doit obligatoirement inclure : <em>&laquo; Fichiers autorisés : [CHEMIN_EXACT]. Toute modification en dehors de ce périmètre sera rejetée. &raquo;</em> Cela empêche l&apos;agent d&apos;altérer 14 fichiers de configuration sous prétexte de simplifier le correctif.
        </Callout>
      </section>

      {/* Section 2: Structure d'une Fiche de Remédiation Industrielle */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Standard d&apos;Équipe</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Anatomie d&apos;une Fiche de Remédiation Professionnelle
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Chaque bug majeur du projet Capstone doit faire l&apos;objet d&apos;un mandat d&apos;intervention documenté sous ce format standardisé avant toute écriture de code :
        </p>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs shadow-md">
          <div className="text-emerald-400 font-bold mb-2">{`// Fiche de Remédiation : FIX-02 (Contrôle IDOR)`}</div>
          <CodeBlock language="markdown">{`# FICHE DE REMÉDIATION — INCIDENT SEC-01

- CODE TICKET : FIX-02
- PRIORITÉ : P1 (Bloquante)
- TITRE : Contrôle d'autorisation de propriété sur /api/orders/:id
- CAUSE RACINE : getOrderById ne compare pas order.userId avec req.user.id
- PÉRIMÈTRE AUTORISÉ :
  * src/backend/controllers/order.controller.ts
  * test/integration/orderAuthorization.test.ts
- FICHIERS INTERDITS :
  * package.json, database.ts, routes/api.routes.ts
- ÉTAPES DE MISE EN ŒUVRE :
  1. Écrire le test d'intégration 'orderAuthorization.test.ts' simulant l'accès croisé (RED).
  2. Ajouter la condition : if (order.userId !== req.user.id && req.user.role !== 'ADMIN') return res.status(403)...
  3. Vérifier que le test passe au vert (GREEN).
  4. Exécuter 'npx tsc --noEmit' pour valider le typage.
- STRATÉGIE DE ROLLBACK : git checkout src/backend/controllers/order.controller.ts`}</CodeBlock>
        </div>
      </section>

      {/* Section 3: Séquenceur de Dépendances de Correctifs */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Ordonnancement Stratégique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : L&apos;Ordre Séquentiel Optimal pour le Projet Capstone
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Examinons la séquence rigoureuse d&apos;application des 4 fiches de remédiation élaborées pour le projet Capstone. Cliquez sur chaque étape pour inspecter ses contraintes de dépendances et son test de validation :
        </p>

        {/* Sélecteur de tâche */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {REMEDIATION_TASKS.map((task) => {
            const isSelected = selectedTask.id === task.id;
            return (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-400 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-black text-emerald-800">Étape {task.order}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    task.blastRadius === 'FAIBLE'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    Radius {task.blastRadius}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold mt-1 line-clamp-1">{task.code} : {task.title}</div>
              </button>
            );
          })}
        </div>

        {/* Détails de la tâche sélectionnée */}
        <div className="p-6 rounded-2xl bg-white border border-slate-300 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-emerald-700">Ordre d&apos;exécution #{selectedTask.order}</span>
              <h3 className="text-lg font-black text-slate-950">{selectedTask.code} — {selectedTask.title}</h3>
            </div>
            <span className="text-xs font-mono bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-bold text-slate-800">
              Dépendance requise : {selectedTask.dependency}
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Périmètre strict de fichiers autorisés :</div>
            <div className="flex flex-wrap gap-2">
              {selectedTask.targetFiles.map((file, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800">
                  {file}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">Test automatisé de validation exigé :</div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-950">
              {selectedTask.validationTest}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Élaboration de plans de correction et gestion du risque
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.6 — Fiches de Remédiation, Ordonnancement et Blast Radius"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial de planifier l'ordre séquentiel d'application des correctifs dans un projet multicouche ?",
              options: [
                "Pour permettre au compilateur TypeScript de faire des pauses régulières.",
                "Parce que corriger une couche haute (ex: React) avant de stabiliser les contrats d'infrastructure basse (ex: pool MySQL ou middlewares d'authentification) engendre des régressions croisées et des faux échecs.",
                "Parce que Git n'autorise que 2 commits par jour.",
                "Pour des raisons d'esthétique du code source."
              ],
              correctIndex: 1,
              explanation: "Stabiliser d'abord les fondations de données et de sécurité garantit que les services et le frontend s'appuient sur des contrats d'API fermes et prévisibles."
            },
            {
              id: 2,
              question: "Que désigne la notion de 'Blast Radius' (rayon d'impact) lors de la modification d'un fichier source ?",
              options: [
                "La température maximale atteinte par le processeur lors de la compilation.",
                "La surface potentielle de régression et l'ensemble des modules dépendants susceptibles de dysfonctionner si le correctif appliqué comporte un bug inattendu.",
                "La distance physique entre le développeur et le serveur de production.",
                "Le temps nécessaire pour cloner le dépôt Git."
              ],
              correctIndex: 1,
              explanation: "Plus un fichier est au cœur du système (ex: database.ts ou auth.middleware.ts), plus son Blast Radius est élevé et plus il exige de tests de non-régression stricts."
            },
            {
              id: 3,
              question: "Dans une Fiche de Remédiation, pourquoi est-il obligatoire de spécifier une 'Whitelist' de fichiers autorisés pour l'agent IA ?",
              options: [
                "Pour interdire à l'agent de parler en anglais.",
                "Pour circonscrire strictement les modifications au fichier nécessaire et empêcher l'agent de refactorer arbitrairement des fichiers de configuration ou des dépendances non demandées.",
                "Parce que le système de fichiers Linux ne supporte que 3 fichiers à la fois.",
                "Pour économiser l'électricité du serveur."
              ],
              correctIndex: 1,
              explanation: "Sans liste blanche explicite, les agents autonomes ont tendance à dériver hors périmètre (scope creep) et à modifier des fichiers transverses sans préavis."
            },
            {
              id: 4,
              question: "Quelle est la stratégie de 'Rollback' immédiate à prévoir si l'application d'un patch échoue ou casse les tests unitaires ?",
              options: [
                "Formater le disque dur de la machine.",
                "Utiliser la commande 'git checkout -- <fichier>' (ou git restore) pour restaurer immédiatement le fichier dans son état exact pré-intervention sans laisser de traces résiduelles.",
                "Fermer l'IDE et attendre le lendemain.",
                "Effacer le dossier .git."
              ],
              correctIndex: 1,
              explanation: "Git permet de revenir instantanément à un état stable propre avant de repenser la stratégie de correction."
            },
            {
              id: 5,
              question: "Pourquoi les correctifs de sécurité (comme la faille IDOR) doivent-ils être priorisés avant les ajustements d'affichage React ?",
              options: [
                "Parce que les failles de sécurité engagent la responsabilité légale et la protection immédiate des données utilisateurs, tandis que les défauts d'affichage ne menacent pas la pérennité du service.",
                "Parce que le CSS est plus difficile à écrire que le JavaScript.",
                "Parce que les hackers ne travaillent que le week-end.",
                "Pour faire plaisir aux auditeurs externes."
              ],
              correctIndex: 0,
              explanation: "La hiérarchie des risques impose de colmater les failles critiques d'exposition de données avant toute amélioration cosmétique."
            },
            {
              id: 6,
              question: "Quel livrable d'ingénierie doit valider formellement la fin d'une tâche de remédiation ?",
              options: [
                "Un message de félicitations envoyé sur Slack.",
                "L'exécution avec succès du test de reproduction associé (Green), la compilation TypeScript sans erreur (npx tsc --noEmit) et une revue de git diff validée.",
                "La suppression des fichiers de documentation pour gagner de la place.",
                "Le redémarrage du routeur réseau."
              ],
              correctIndex: 1,
              explanation: "La trinité 'Test Vert + Compilation TS + Git Diff propre' constitue le standard d'homologation indiscutable d'un correctif professionnel."
            }
          ]}
        />
      </section>
    </div>
  );
};
