'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { FullStackAuditCapstoneLab } from '@/components/interactive/FullStackAuditCapstoneLab';

interface QualityGate {
  id: string;
  name: string;
  category: string;
  metric: string;
  threshold: string;
  actual: string;
  passed: boolean;
}

const QUALITY_GATES: QualityGate[] = [
  {
    id: 'gate-ts',
    name: 'Compilation Statique TypeScript Strict',
    category: 'Qualité Code',
    metric: 'Erreurs tsc',
    threshold: '0 erreur',
    actual: '0 erreur',
    passed: true
  },
  {
    id: 'gate-lint',
    name: 'Conformité ESLint (Zéro Warning / Erreur)',
    category: 'Qualité Code',
    metric: 'Problèmes linter',
    threshold: '0 problème',
    actual: '0 problème',
    passed: true
  },
  {
    id: 'gate-coverage',
    name: 'Couverture de Tests Automatisés (@vitest/coverage-v8)',
    category: 'Tests',
    metric: 'Couverture branches',
    threshold: '≥ 85.0%',
    actual: '92.4%',
    passed: true
  },
  {
    id: 'gate-sec-idor',
    name: 'Protection Multi-tenant & IDOR (/api/orders/:id)',
    category: 'Sécurité',
    metric: 'Statut test 403',
    threshold: '100% PASS',
    actual: '100% PASS',
    passed: true
  },
  {
    id: 'gate-pool-leak',
    name: 'Libération Garantie du Pool MySQL (Stress Test)',
    category: 'Infrastructure',
    metric: 'Connexions orphelines',
    threshold: '0 fuite',
    actual: '0 fuite (active: 0)',
    passed: true
  },
  {
    id: 'gate-redaction',
    name: 'Masquage des Secrets dans les Logs (Data Redaction)',
    category: 'Sécurité RGPD',
    metric: 'Secrets en clair',
    threshold: '0 secret',
    actual: '0 secret (Pino redact)',
    passed: true
  }
];

export const Chapitre10Content: React.FC = () => {
  const [reportCopied, setReportCopied] = useState<boolean>(false);

  const allGatesPassed = QUALITY_GATES.every((g) => g.passed);

  const handleCopyReport = () => {
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2000);
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.10 (Certification Finale)</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Audit Final, Homologation de Production et Rédaction du Rapport Technique
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Votre intervention de débogage ne se conclut pas au dernier commit Git : elle s&apos;achève par la validation formelle des <strong>Quality Gates</strong> de mise en production et la rédaction d&apos;un <strong>Rapport Technique d&apos;Audit</strong> exhaustif. Officialisez la certification et l&apos;homologation de votre système d&apos;entreprise.
        </p>
      </div>

      {/* Section 1: Les 7 Portes d'Homologation (Quality Gates) */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Gouvernance de Livraison</div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              1. La Matrice des Quality Gates de Mise en Production
            </h2>
          </div>
          <span className={`text-xs font-mono font-black px-3 py-1 rounded-full ${
            allGatesPassed
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {allGatesPassed ? '✓ 6/6 QUALITY GATES FRANCHIES' : 'EN COURS D\'AUDIT'}
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans l&apos;ingénierie logicielle d&apos;élite, la livraison en production ne repose pas sur une impression de confiance subjective, mais sur le franchissement mathématique et binaire de critères de contrôle non négociables :
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Quality Gate</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Seuil Requis</th>
                <th className="px-4 py-3">Mesure Constatée</th>
                <th className="px-4 py-3">Décision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              {QUALITY_GATES.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{g.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{g.category}</td>
                  <td className="px-4 py-3 font-mono text-xs">{g.threshold}</td>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-slate-900">{g.actual}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                      ✓ HOMOLOGUÉ
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout type="info" title="Le Sign-Off d'Ingénierie Formel">
          Le <em>Sign-Off</em> est l&apos;engagement écrit par le Lead Engineer attestant que l&apos;ensemble des risques identifiés lors de l&apos;audit initial (IDOR, saturation de connexions, timeouts IA) ont été éradiqués, documentés et sanctuarisés par des tests de non-régression pérennes.
        </Callout>
      </section>

      {/* Section 2: Structure Officielle du Rapport Technique */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Livrable Certifiant</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Le Rapport Technique Officiel d&apos;Audit et de Remédiation
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Voici le document officiel de fin d&apos;études récapitulant l&apos;intervention complète de débogage réalisée sur l&apos;application Capstone, prêt pour transmission au comité de direction technique (CTO / VP Engineering) :
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-md overflow-hidden">
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-xs font-mono text-slate-300 border-b border-slate-800">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>RAPPORT_AUDIT_TECHNIQUE_CAPSTONE_2026.md</span>
            </span>
            <button
              onClick={handleCopyReport}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {reportCopied ? '✓ Copié dans le presse-papier' : 'Copier le rapport'}
            </button>
          </div>
          <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
            <CodeBlock language="markdown">{`# RAPPORT D'AUDIT TECHNIQUE, RCA ET HOMOLOGATION FINALE
Date : 9 Novembre 2026
Projet : Capstone Audit Enterprise (React 19 / Express 5 / MySQL 8 / Gemini API)
Auditeur Principal : Ingénieur en Débogage Certifié

## 1. RÉSUMÉ EXÉCUTIF
L'application présentait 5 dysfonctionnements majeurs dont une faille de sécurité critique IDOR (P1) et une fuite de ressources provoquant la saturation du pool MySQL sous charge (P1). 
L'intervention a suivi le protocole strict de découplage en 10 étapes : cartographie, reproduction cURL, traçabilité par Correlation ID, RCA des 5 Pourquoi, planification de remédiation sous whitelist et vérification automatisée Red-Green.
Statut actuel : HOMOLOGATION DE PRODUCTION ACCORDÉE (100% des Quality Gates franchies).

## 2. INVENTAIRE DES INCIDENTS RÉSOLUS
- [FIX-01] PERF-03 (P1) : Libération des connexions du pool MySQL sanctuarisée dans un bloc 'finally' (dbPoolStress: 50 requêtes concurrentes OK).
- [FIX-02] SEC-01 (P1) : Contrôle d'autorisation strict (order.userId === req.user.id) dans getOrderById colmatant la faille IDOR (Test 403 OK).
- [FIX-03] TECH-02 (P2) : Implémentation du contrat d'erreur HTTP 404 sur commande absente avec élimination du TypeError 500.
- [FIX-04] FUNC-04 (P2) : Harmonisation du contrat d'authentification React (useAuth.ts) avec le schéma backend (clé 'password').
- [FIX-05] PERF-05 (P2) : Découplage asynchrone et injection d'AbortController (timeout 8000ms) sur le client Google Gemini.

## 3. BILAN DES MÉTRIQUES D'ASSURANCE QUALITÉ
- Compilation TypeScript : 0 erreur ('npx tsc --noEmit' en mode strict).
- Linter ESLint : 0 warning, 0 erreur sur l'ensemble du workspace.
- Couverture de branches (@vitest/coverage-v8) : 92.4% (seuil requis ≥ 85%).
- Suite de non-régression : 24 tests unitaires et d'intégration validés au vert (PASS).
- Traçabilité et hygiène des données : Logs structurés JSON Pino avec Correlation ID et masquage PII conforme RGPD.

## 4. RECOMMANDATIONS POUR LA DETTE TECHNIQUE RÉSIDUELLE
1. Déployer un cache Redis distribué pour stocker les analyses de documents fréquentes de Gemini API.
2. Ajouter des index composites sur la table MySQL 'orders' (tenant_id, created_at) pour prévenir les slow queries.
3. Intégrer un linter de schémas OpenAPI automatisé dans la CI GitHub Actions.`}</CodeBlock>
          </div>
        </div>
      </section>

      {/* Section 3: Laboratoire Capstone Récapitulatif */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Laboratoire Final</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
            <Icon name="terminal" className="w-6 h-6 text-emerald-700" />
            <span>3. Synthèse Finale dans le Laboratoire Interactif Capstone</span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Accédez à la vue finale du laboratoire Capstone pour vérifier l&apos;état consolidé de votre mission d&apos;homologation :
        </p>

        <FullStackAuditCapstoneLab />
      </section>

      {/* Section 4: Quiz de Clôture du Cours */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Épreuve de Clôture du Cours</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz de Clôture : Homologation finale et gouvernance technique d&apos;ingénierie
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.10 — Audit Final, Sign-off et Bilan du Cours d'Ingénierie du Débogage"
          questions={[
            {
              id: 1,
              question: "Quelle est la raison d'être fondamentale d'un Rapport Technique d'Audit rédigé après une intervention de débogage ?",
              options: [
                "Justifier l'achat d'un nouvel ordinateur portable pour l'équipe.",
                "Consigner formellement les causes racines identifiées, prouver l'absence de régression par des métriques chiffrées, documenter les commits de patchs et engager la responsabilité d'homologation de production.",
                "Remplacer le code source par un fichier texte pour alléger le serveur.",
                "Supprimer l'historique des tickets Jira pour repartir de zéro."
              ],
              correctIndex: 1,
              explanation: "Le rapport technique est la mémoire de l'organisation : il prouve que le système est sain, prévient la reproduction des mêmes erreurs et formalise l'accord de mise en production."
            },
            {
              id: 2,
              question: "Que signifie concrètement le terme 'Sign-off' dans un processus d'homologation d'ingénierie logicielle ?",
              options: [
                "La fermeture de la session Windows.",
                "L'approbation formelle et documentée d'un ingénieur responsable attestant que l'ensemble des critères de qualité, de sécurité et de robustesse sont satisfaits pour autoriser le déploiement.",
                "La déconnexion du réseau Internet pendant 24 heures.",
                "L'annulation de toutes les commandes clients."
              ],
              correctIndex: 1,
              explanation: "Le Sign-off engage formellement la responsabilité de l'auditeur sur la fiabilité du système livré."
            },
            {
              id: 3,
              question: "Si une application démarre sans erreur visible mais qu'une seule Quality Gate échoue (ex: couverture de code à 70% au lieu de 85%), que doit être la décision d'homologation ?",
              options: [
                "Homologuer immédiatement en considérant que 70% est suffisant.",
                "Refuser l'homologation (GO / NO-GO : NO-GO), car le seuil contractuel de sécurité et de couverture n'est pas atteint : les tests manquants doivent être écrits avant livraison.",
                "Supprimer la Quality Gate pour faire passer le statut au vert.",
                "Déployer en production en secret un dimanche matin."
              ],
              correctIndex: 1,
              explanation: "Les Quality Gates sont binaires et non négociables : un seul critère non satisfait bloque la mise en production pour protéger l'intégrité du service."
            },
            {
              id: 4,
              question: "Pourquoi est-il indispensable de documenter la 'Dette Technique Résiduelle' dans le rapport d'audit final ?",
              options: [
                "Pour critiquer le travail des développeurs précédents.",
                "Pour identifier en toute transparence les points de vigilance non urgents (ex: absence d'index SQL composite, besoin de cache Redis) et planifier leur traitement lors des sprints futurs sans masquer le risque.",
                "Pour demander une augmentation de salaire immédiate.",
                "Pour occuper les stagiaires de l'entreprise."
              ],
              correctIndex: 1,
              explanation: "Tout système comporte de la dette technique. La cartographier clairement permet au management technique d'anticiper les futurs chantiers de scalabilité."
            },
            {
              id: 5,
              question: "Quelle est la méthode scientifique qui résume l'intégralité du cours d'Ingénierie du Débogage ?",
              options: [
                "Modifier du code au hasard jusqu'à ce que l'erreur disparaisse de l'écran.",
                "La boucle rigoureuse : Cartographie -> Reproduction déterministe -> Traçabilité des logs -> 5 Pourquoi (RCA) -> Plan de patch sous whitelist -> Cycle Red-Green -> Zero Trust AI -> Non-régression globale.",
                "Faire aveuglément confiance aux réponses générées par les chatbots gratuits.",
                "Désactiver TypeScript et les linters pour coder plus vite."
              ],
              correctIndex: 1,
              explanation: "Cette discipline d'ingénierie transforme le débogage d'une pratique intuitive aléatoire en une science déterministe, reproductible et industrielle."
            },
            {
              id: 6,
              question: "Quelle est la posture professionnelle d'un ingénieur face à un agent IA de développement intégré à son IDE ?",
              options: [
                "Lui donner les droits administrateur complets et le laisser tout modifier sans relecture.",
                "Considérer l'IA comme un copilote de calcul probabiliste sous supervision humaine stricte : encadrer son périmètre de fichiers, auditer impitoyablement ses diffs et valider chaque modification par des tests déterministes (Zero Trust AI Code).",
                "Refuser catégoriquement d'utiliser les outils d'IA et revenir à l'éditeur de texte bloc-notes.",
                "Laisser l'IA décider elle-même des règles de sécurité de l'entreprise."
              ],
              correctIndex: 1,
              explanation: "L'ingénieur moderne exploite la puissance de calcul et d'exploration de l'IA tout en maintenant un contrôle absolu de sécurité, de typage et de validation humaine."
            }
          ]}
        />
      </section>
    </div>
  );
};
