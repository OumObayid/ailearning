'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface RegressionCheck {
  id: string;
  name: string;
  category: 'Sécurité' | 'Contrats API' | 'Typage' | 'Base de Données';
  status: 'PASSED' | 'FAILED' | 'PENDING';
  details: string;
  command: string;
}

const REGRESSION_CHECKS: RegressionCheck[] = [
  {
    id: 'chk-sec',
    name: 'Contrôle d\'étanchéité multi-tenant & IDOR',
    category: 'Sécurité',
    status: 'PASSED',
    details: 'Vérifie que les utilisateurs A et B ne peuvent en aucun cas accéder réciproquement à leurs commandes.',
    command: 'npx vitest run test/integration/orderAuthorization.test.ts'
  },
  {
    id: 'chk-auth',
    name: 'Rejet systématique des requêtes non authentifiées (HTTP 401)',
    category: 'Sécurité',
    status: 'PASSED',
    details: 'Vérifie que toute route protégée sans Bearer token renvoie 401 sans exécuter le contrôleur.',
    command: 'npx vitest run test/integration/authMiddleware.test.ts'
  },
  {
    id: 'chk-types',
    name: 'Vérification statique TypeScript sans dérivation (Strict Mode)',
    category: 'Typage',
    status: 'PASSED',
    details: 'Garantit l\'absence de @ts-ignore, de casts vers "any" et d\'incohérences de signatures.',
    command: 'npx tsc --noEmit'
  },
  {
    id: 'chk-db',
    name: 'Libération du pool MySQL sous charge concurrente',
    category: 'Base de Données',
    status: 'PASSED',
    details: 'Exécute 50 requêtes simultanées et vérifie que pool.activeConnections redescend à 0.',
    command: 'npx vitest run test/integration/dbPoolStress.test.ts'
  },
  {
    id: 'chk-api',
    name: 'Contrat JSON d\'authentification Frontend / Backend',
    category: 'Contrats API',
    status: 'PASSED',
    details: 'Vérifie que le payload { email, password } est accepté et que passwordUser est définitivement banni.',
    command: 'npx vitest run test/unit/useAuth.test.ts'
  }
];

export const Chapitre9Content: React.FC = () => {
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [pipelineSuccess, setPipelineSuccess] = useState<boolean>(false);

  const triggerPipeline = () => {
    setPipelineRunning(true);
    setPipelineSuccess(false);
    setTimeout(() => {
      setPipelineRunning(false);
      setPipelineSuccess(true);
    }, 500);
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.9</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Vérification Globale de la Non-Régression et Pipeline d&apos;Audit Pré-Merge
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Réparer un bug en en créant deux autres n&apos;est pas une victoire : c&apos;est une dégradation silencieuse. Découvrez comment ériger une <strong>matrice de non-régression</strong> impitoyable et configurer le pipeline de pré-validation (Pre-Flight Gate) avant toute fusion dans la branche de production.
        </p>
      </div>

      {/* Section 1: La Matrice des 4 Piliers de Non-Régression */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Architecture de Contrôle</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Les quatre piliers de la non-régression logicielle
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Sur un système d&apos;entreprise, la non-régression ne se limite pas à faire passer les tests unitaires : elle doit être validée sur quatre dimensions complémentaires :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-rose-700 uppercase mb-1">Pilier 1 : Non-régression de sécurité</div>
            <p className="text-xs sm:text-sm text-slate-600">
              Garantir que le correctif n&apos;a pas affaibli l&apos;isolation multi-tenant, supprimé des filtres de sécurité ou permis des contournements d&apos;authentification (401/403).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-blue-700 uppercase mb-1">Pilier 2 : Non-régression contractuelle</div>
            <p className="text-xs sm:text-sm text-slate-600">
              Vérifier que les schémas de réponses JSON et les codes statut HTTP attendus par les clients mobiles et frontends existants n&apos;ont pas été altérés.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-emerald-700 uppercase mb-1">Pilier 3 : Non-régression statique (TypeScript)</div>
            <p className="text-xs sm:text-sm text-slate-600">
              S&apos;assurer que la compilation stricte (<code className="text-xs font-mono">tsc --noEmit</code>) ne produit aucun warning, aucun cast sauvage vers &apos;any&apos; et aucun import non résolu.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-amber-700 uppercase mb-1">Pilier 4 : Non-régression de concurrence</div>
            <p className="text-xs sm:text-sm text-slate-600">
              Prouver sous charge concurrente (stress test) que les connexions de pool SQL sont restituées et que la mémoire heap reste stable.
            </p>
          </div>
        </div>

        <Callout type="warning" title="La règle de l'effet d'avalanche">
          Dans 40% des régressions industrielles, la cause n&apos;est pas le code modifié lui-même, mais une dépendance partagée dont la signature a été subtilement changée sans que les autres modules consommateurs n&apos;aient été mis à jour. D&apos;où l&apos;obligation d&apos;exécuter l&apos;intégralité de la suite de tests globale.
        </Callout>
      </section>

      {/* Section 2: Le Pipeline d'Audit Automatisé Pre-Flight */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Automatisation CI/CD</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Le script de validation Pre-Flight avant toute fusion Git
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Avant d&apos;envisager la fusion de votre branche de correctifs (<code className="text-xs font-mono">fix/capstone-remediation</code>) dans la branche principale, vous devez exécuter ce script séquentiel éliminatoire :
        </p>

        <CodeBlock language="bash">{`# Pipeline de vérification globale de non-régression
set -e # Arrêt immédiat dès la première commande en échec

echo "==> 1. Vérification statique des types TypeScript..."
npx tsc --noEmit

echo "==> 2. Audit du Linter (règles strictes)..."
node --max-old-space-size=512 ./node_modules/eslint/bin/eslint.js "src/**/*.{ts,tsx}"

echo "==> 3. Exécution de la suite complète de tests (Unitaires + Intégration)..."
npx vitest run

echo "==> 4. Contrôle des conflits et du diff Git..."
git diff --check

echo " HOMOLOGATION VALIDÉE : Zéro régression détectée. Prêt pour la mise en production."`}</CodeBlock>
      </section>

      {/* Section 3: Simulateur Interactif - Le Gatekeeper de Non-Régression */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Banc d&apos;Essai Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Simulation de la Barrière de Non-Régression (Pre-Merge Gate)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Voici les 5 contrôles de sécurité et de conformité qui jalonnent l&apos;homologation finale de notre projet Capstone. Déclenchez la vérification automatisée pour confirmer le passage de tous les jalons :
        </p>

        <div className="rounded-2xl bg-white border border-slate-300 shadow-sm p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Matrice de validation</span>
              <h3 className="text-base font-bold text-slate-900">5 contrôles critiques obligatoires</h3>
            </div>
            <button
              disabled={pipelineRunning}
              onClick={triggerPipeline}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs disabled:opacity-40"
            >
              {pipelineRunning ? '⏳ Exécution du pipeline CI...' : '▶ Lancer le pipeline complet de non-régression'}
            </button>
          </div>

          <div className="space-y-2.5">
            {REGRESSION_CHECKS.map((chk) => (
              <div key={chk.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {chk.category}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{chk.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{chk.details}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-mono font-black px-2.5 py-1 rounded ${
                    pipelineSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {pipelineSuccess ? 'PASSED (0 REGRESSION)' : 'EN ATTENTE'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {pipelineSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950 text-emerald-200 font-mono text-xs space-y-1 border border-emerald-800">
              <div className="font-bold text-emerald-300">
                 BILAN PIPELINE : 5/5 vérifications validées avec succès en 2.4s
              </div>
              <p className="text-slate-300">
                Statut : HOMOLOGATION ACCORDÉE — La branche fix/capstone-remediation peut être fusionnée dans main en toute sécurité.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Stratégies de non-régression et pipelines d&apos;homologation
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.9 — Non-Régression, CI/CD et Sécurité Pré-Merge"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il insuffisant de vérifier uniquement que le test du bug corrigé passe au vert ?",
              options: [
                "Parce que Vitest ne supporte pas les tests individuels.",
                "Parce qu'un correctif chirurgical peut introduire des effets de bord collatéraux sur d'autres composants dépendants (régression croisée) sans que le test isolé ne puisse le détecter.",
                "Parce que Git exige obligatoirement 100 tests pour autoriser un commit.",
                "Pour faire patienter le client avant la livraison."
              ],
              correctIndex: 1,
              explanation: "Le test unitaire valide la correction de l'anomalie cible, mais seule l'exécution de la suite globale vérifie que le reste de l'application est resté indemne."
            },
            {
              id: 2,
              question: "Dans un pipeline de pré-validation (Pre-Flight Gate), pourquoi l'étape 'npx tsc --noEmit' doit-elle être exécutée avant même de lancer les tests ?",
              options: [
                "Pour nettoyer les fichiers temporaires du système d'exploitation.",
                "Parce que la vérification statique TypeScript détecte immédiatement les désalignements de types, signatures modifiées et imports cassés en quelques secondes sans mobiliser de ressources d'exécution.",
                "Parce que les processeurs modernes ne peuvent pas exécuter de tests sans tsc.",
                "Pour empêcher les stagiaires de modifier le code."
              ],
              correctIndex: 1,
              explanation: "La compilation statique est déterministe et ultra-rapide : elle élimine 90% des erreurs d'incompatibilité de contrat avant même d'instancier le runtime de test."
            },
            {
              id: 3,
              question: "Quelle commande Git permet de vérifier qu'aucun conflit de fusion ou espace parasite (whitespace error) n'est présent dans le diff ?",
              options: [
                "git diff --check",
                "git reset --hard",
                "git push --all",
                "git branch -m"
              ],
              correctIndex: 0,
              explanation: "La commande 'git diff --check' scanne les modifications à la recherche d'espaces de fin de ligne résiduels ou de marqueurs de conflits non résolus (<<<<<<<)."
            },
            {
              id: 4,
              question: "Pourquoi les tests de non-régression de sécurité doivent-ils obligatoirement inclure des requêtes sans authentification (HTTP 401) et avec droits insuffisants (HTTP 403) ?",
              options: [
                "Pour tester la vitesse de la carte réseau.",
                "Pour s'assurer qu'un correctif n'a pas accidentellement supprimé le middleware d'authentification ou transformé une route privée en route publique accessible à tous.",
                "Pour inciter les utilisateurs à créer un compte.",
                "Pour respecter une convention esthétique d'URL."
              ],
              correctIndex: 1,
              explanation: "Tester les scénarios négatifs (cas d'accès refusé) garantit que les barrières de sécurité restent infranchissables pour les requêtes malveillantes."
            },
            {
              id: 5,
              question: "Que doit-on faire si un seul test de la suite de non-régression échoue lors du pipeline d'homologation pré-merge ?",
              options: [
                "Supprimer le test qui échoue pour que le pipeline passe au vert.",
                "Interdire formellement la fusion (merge bloqué), identifier si l'échec est une régression réelle introduite par le patch ou une mise à jour légitime de spécification, et corriger le problème avant toute tentative de livraison.",
                "Forcer la mise en production en espérant que personne ne remarque le bug.",
                "Redémarrer le serveur de build trois fois de suite."
              ],
              correctIndex: 1,
              explanation: "La règle d'or de la CI est absolue : un seul test rouge bloque l'homologation. Supprimer ou ignorer un test défaillant constitue une faute professionnelle grave."
            },
            {
              id: 6,
              question: "Quel rôle jouent les tests de charge concurrente (stress tests) dans la matrice de non-régression d'un pool MySQL ?",
              options: [
                "Vérifier la couleur des câbles réseau.",
                "Prouver sous afflux massif de requêtes simultanées que le pool ne subit aucune fuite de connexion (Connection Leak) et que les transactions sont correctement libérées dans le bloc finally.",
                "Télécharger automatiquement les dernières mises à jour de MySQL.",
                "Vérifier que le disque dur est défragmenté."
              ],
              correctIndex: 1,
              explanation: "Les fuites de connexion ne se révèlent qu'en condition de concurrence : le stress test garantit que l'infrastructure ne s'effondrera pas sous le trafic réel des utilisateurs."
            }
          ]}
        />
      </section>
    </div>
  );
};
