'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 8 — Projet Final &amp; Système Multi-Agents</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Définir le projet final et son cahier des charges
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Pourquoi tout système multi-agents exige un cahier des charges strict avant d&apos;écrire la moindre ligne de code, et comment poser les fondations de l&apos;application PlanIQ (React, Node.js, Express, MySQL) sous Google Antigravity.
        </p>
      </div>

      {/* 1. L'analogie du chantier de construction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie du chantier de construction : Pourquoi pas de code sans plan</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Imaginez un terrain vague sur lequel débarquent cinq artisans le même matin : un maçon, un électricien, un plombier, un menuisier et un peintre. Si personne ne leur fournit de <strong>plan d&apos;architecte</strong> ni de <strong>cahier des charges</strong>, le peintre peindra sur de la terre battue, le plombier percera des tranchées là où le maçon comptait couler les fondations, et chacun accusera l&apos;autre d&apos;avoir gâché son travail.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Avec un système multi-agents dans un IDE, le danger est identique : si vous lancez vos agents IA sans un contrat fonctionnel et technique indiscutable, le développeur créera des routes API incompatibles avec les composants React, l&apos;auditeur de sécurité bloquera des fichiers imaginaires, et le testeur vérifiera des fonctionnalités exclues du projet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-2">
            <span className="font-bold text-rose-800">Le démarrage anarchique (À bannir)</span>
            <p className="text-slate-600">
              Lancer 5 agents avec des prompts vagues du type : <em>&quot;Développeur, code l&apos;application ; Sécurité, vérifie tout ; Testeur, teste ce que tu peux.&quot;</em>
            </p>
            <p className="text-rose-900 font-semibold text-xs">
              Résultat : Conflits de réécriture, hallucination de routes inexistantes et saturation de contexte en 15 minutes.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
            <span className="font-bold text-emerald-800">Le cadrage méthodique (Recommandé)</span>
            <p className="text-slate-600">
              Établir un cahier des charges officiel qui fige la stack technique, délimite les 5 modules fonctionnels et affecte un mandat exclusif à chaque agent.
            </p>
            <p className="text-emerald-900 font-semibold text-xs">
              Résultat : Des agents disciplinés, zéro écrasement de fichier et une traçabilité totale sous contrôle humain.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Présentation du projet support PlanIQ */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. Présentation de l&apos;application support : PlanIQ Project Manager</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour notre projet de synthèse du cursus, nous pilotons la conception d&apos;une application web professionnelle de gestion de projets d&apos;équipe :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <span className="font-bold text-purple-900 uppercase tracking-wide text-xs">Architecture Technique Imposée</span>
            <ul className="space-y-2 text-slate-700 text-xs">
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• Frontend :</span>
                <span>React.js (Composants fonctionnels, state local réactif, formulaires contrôlés, Tailwind CSS).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• Backend :</span>
                <span>Node.js + Express (API RESTful, middlewares de sécurité, validation des requêtes).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• Persistance :</span>
                <span>MySQL (Tables relationnelles : <code>utilisateurs</code>, <code>projets</code>, <code>taches</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• IDE &amp; Agents :</span>
                <span>Google Antigravity (Orchestration multi-agents sous gouvernance humaine HITL).</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <span className="font-bold text-purple-900 uppercase tracking-wide text-xs">Les 5 Modules Fonctionnels Autorisés</span>
            <ul className="space-y-1.5 text-slate-700 text-xs">
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 shrink-0">1.</span>
                <span><strong>Authentification :</strong> Inscription, connexion sécurisée et vérification de session utilisateur.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 shrink-0">2.</span>
                <span><strong>Gestion des Projets :</strong> CRUD complet (Créer, lister, modifier le statut, archiver).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 shrink-0">3.</span>
                <span><strong>Gestion des Tâches :</strong> Assignation aux membres, priorités (Basse, Moyenne, Haute), statuts d&apos;avancement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 shrink-0">4.</span>
                <span><strong>Tableau de Bord :</strong> Métriques en temps réel (taux de complétion, tâches en retard).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 shrink-0">5.</span>
                <span><strong>Documentation :</strong> Spécifications d&apos;API OpenAPI/Swagger et guides d&apos;installation.</span>
              </li>
            </ul>
          </div>
        </div>

        <Callout type="note" title="Limites volontaires du périmètre (Scope Bounding)">
          Pour maintenir une rigueur pédagogique absolue, les paiements bancaires par carte, l&apos;envoi de SMS et les intégrations tierces superflues sont délibérément <strong>exclus du périmètre</strong>. Aucun agent n&apos;a le droit de proposer ces fonctionnalités sans demande formelle de l&apos;utilisateur.
        </Callout>
      </section>

      {/* 3. Répartition des responsabilités des 5 agents */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Répartition stricte des responsabilités de l&apos;escouade</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Chaque agent possède une mission spécialisée et un livrable obligatoire. Aucun agent ne peut empiéter sur le rôle d&apos;un autre :
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Agent</th>
                <th className="p-3">Mandat exclusif</th>
                <th className="p-3">Livrable obligatoire</th>
                <th className="p-3">Interdiction absolue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-bold text-purple-950">1. Coordinateur</td>
                <td className="p-3">Analyse la demande humaine, planifie et supervise les 4 spécialistes.</td>
                <td className="p-3 font-mono text-xs text-purple-800">Ordres de mission et synthèse finale</td>
                <td className="p-3 text-rose-700 text-xs">Ne code jamais et ne modifie aucun fichier.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-950">2. Développeur</td>
                <td className="p-3">Conçoit les composants React et les routes Express autorisées.</td>
                <td className="p-3 font-mono text-xs text-blue-800">Diffs de code unifiés</td>
                <td className="p-3 text-rose-700 text-xs">Aucune écriture sur le disque sans accord HITL.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-950">3. Sécurité</td>
                <td className="p-3">Audite les risques (injections SQL, failles XSS, gestion des tokens).</td>
                <td className="p-3 font-mono text-xs text-rose-800">Rapport d&apos;audit et préconisations</td>
                <td className="p-3 text-rose-700 text-xs">Mode lecture seule strict : ne modifie aucun code.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-950">4. Testeur</td>
                <td className="p-3">Prépare les scénarios de test et vérifie les résultats d&apos;exécution.</td>
                <td className="p-3 font-mono text-xs text-amber-800">Plan de test et matrice de preuves</td>
                <td className="p-3 text-rose-700 text-xs">Ne jamais déclarer un test réussi sans exécution réelle.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-950">5. Documentaliste</td>
                <td className="p-3">Rédige la spécification OpenAPI et les guides techniques d&apos;API.</td>
                <td className="p-3 font-mono text-xs text-emerald-800">Fiches de documentation vérifiées</td>
                <td className="p-3 text-rose-700 text-xs">Ne jamais inventer une route ou un paramètre.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-purple-950 text-xs">1. Coordinateur</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-900">Supervision</span>
            </div>
            <p className="text-slate-600 text-xs">Planifie et supervise. Ne code jamais et ne touche à aucun fichier sur le disque.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-blue-950 text-xs">2. Développeur</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900">Code &amp; Diffs</span>
            </div>
            <p className="text-slate-600 text-xs">Conçoit React/Express. Aucune écriture sans diff approuvé par l&apos;humain.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-rose-950 text-xs">3. Sécurité</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-900">Audit Seul</span>
            </div>
            <p className="text-slate-600 text-xs">Mode lecture seule strict : audite les risques sans modifier le moindre fichier.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-amber-950 text-xs">4. Testeur</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">Preuves QA</span>
            </div>
            <p className="text-slate-600 text-xs">Prépare et vérifie les tests. Interdiction formelle d&apos;inventer les résultats.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-emerald-950 text-xs">5. Documentaliste</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900">Docs API</span>
            </div>
            <p className="text-slate-600 text-xs">Rédige les spécifications d&apos;après les preuves directes uniquement.</p>
          </div>
        </div>
      </section>

      {/* 4. Le Cahier des Charges officiel */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>4. Le Cahier des Charges Officiel régissant l&apos;escouade</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Voici le document contractuel de référence que chaque agent doit respecter scrupuleusement :
        </p>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-2 break-words min-w-0 max-w-full">
          <div className="text-purple-400 font-bold border-b border-slate-800 pb-1">
            # =========================================================================<br />
            # CAHIER DES CHARGES OFFICIEL — SYSTÈME MULTI-AGENTS PLANIQ (PROJET FINAL)<br />
            # =========================================================================
          </div>
          <p className="text-slate-300">1. OBJET DU PROJET : Développer l&apos;application PlanIQ sous la gouvernance exclusive du développeur humain.</p>
          <p className="text-slate-300">2. TECHNOLOGIES EXCLUSIVES : React.js (Frontend), Node.js / Express (Backend REST), MySQL (Base de données), Google Antigravity.</p>
          <p className="text-slate-300">3. POLITIQUE DE LECTURE SEULE : Tous les agents démarrent en mode LECTURE SEULE strict. Seul l&apos;agent développeur peut soumettre des diffs d&apos;écriture pour validation humaine.</p>
          <p className="text-slate-300">4. SANCTUARISATION DE LA CONFIGURATION : Interdiction absolue d&apos;accéder aux fichiers .env, aux clés API secrètes ou de remonter dans les répertoires parents.</p>
          <p className="text-slate-300">5. DEFINITION OF DONE GLOBALE : Une fonctionnalité n&apos;est validée que lorsqu&apos;elle est implémentée en code propre, auditée par la Sécurité (zéro faille critique), couverte par des tests avec preuves et documentée.</p>
        </div>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Cahier des charges</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il impératif de définir un cahier des charges officiel avant de lancer les agents IA ?",
              options: [
                "Pour fournir un référentiel commun et indiscutable évitant que les agents ne se marchent sur les pieds ou n'inventent des fonctionnalités hors périmètre",
                "Pour que le système d'exploitation Windows accepte de créer les dossiers",
                "Pour augmenter automatiquement la mémoire vive de l'ordinateur",
                "Pour permettre à l'agent sécurité de modifier le code sans prévenir"
              ],
              correctIndex: 0,
              explanation: "Le cahier des charges constitue le contrat technique universel de l'escouade. Sans lui, chaque agent interprète la mission selon ses biais statistiques, provoquant chaos et réécritures contradictoires."
            },
            {
              id: 2,
              question: "Un agent de sécurité détectant une faille critique d'injection SQL a-t-il le droit de modifier le fichier de route Express de sa propre initiative ?",
              options: [
                "Oui, car l'urgence d'une faille critique prime sur toute procédure",
                "Non, il doit consigner la faille dans son rapport d'audit avec la preuve matérielle et laisser le développeur appliquer le diff après accord humain",
                "Oui, s'il a déjà prévenu le testeur",
                "Non, il doit supprimer le fichier du disque"
              ],
              correctIndex: 1,
              explanation: "L'agent sécurité a un mandat exclusif d'audit en lecture seule. Pour éviter les conflits d'édition, seul l'agent développeur prépare le diff, validé par l'humain avant écriture."
            },
            {
              id: 3,
              question: "Quelles technologies forment l'architecture technique imposée pour l'application support PlanIQ ?",
              options: [
                "React.js (Frontend), Node.js + Express (Backend REST), MySQL (Persistance) sous Google Antigravity",
                "PHP WordPress, SQLite et Docker",
                "Python Django, MongoDB et Ruby on Rails",
                "Java Spring Boot et base de données Microsoft Access"
              ],
              correctIndex: 0,
              explanation: "Le cahier des charges fige la stack technique sur React.js, Node.js avec Express et MySQL, orchestrée dans l'IDE agentique Google Antigravity."
            }
          ]}
        />
      </section>
    </div>
  );
};
