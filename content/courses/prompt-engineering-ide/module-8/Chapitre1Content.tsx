'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Définir le projet final et son cahier des charges
        </h1>
      </div>

      {/* 1. Pourquoi commencer par le cahier des charges */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi définir le projet avant de créer les agents ?
        </h2>
        <p className="text-slate-700">
          Un système multi-agents ne démarre jamais par l&apos;écriture de prompts isolés. Pour qu&apos;un coordinateur IA puisse distribuer des tâches sans ambiguïté et pour que les agents spécialisés ne se marchent pas sur les pieds, ils doivent partager <strong>un référentiel commun et indiscutable</strong> :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-slate-700 font-medium">
          <li>Le périmètre précis de l&apos;application et ses frontières techniques.</li>
          <li>Les 5 fonctionnalités autorisées et celles volontairement exclues.</li>
          <li>La stack technique retenue (React 19, Node.js 22, Express, MySQL).</li>
          <li>Les rôles, responsabilités et livrables exigés pour chaque agent.</li>
          <li>Les règles de gouvernance et les points d&apos;arrêt obligatoires (Human-in-the-Loop).</li>
        </ul>
      </section>

      {/* 2. Présentation du projet support */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Présentation de l&apos;application support : PlanIQ Project Manager
        </h2>
        <p className="text-slate-700">
          Nous pilotons le développement d&apos;une application web complète de gestion de projets et de tâches d&apos;équipe :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="font-bold text-purple-800 uppercase tracking-wide text-xs">Architecture Technique</span>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>Frontend :</strong> React.js (Composants fonctionnels, state local, formulaires réactifs).</li>
              <li>• <strong>Backend :</strong> Node.js + Express.js (API REST, middlewares de validation).</li>
              <li>• <strong>Persistance :</strong> MySQL (Tables relationnelles utilisateurs, projets, tâches).</li>
              <li>• <strong>IDE &amp; Agents :</strong> Google Antigravity (Coordination multi-agents).</li>
            </ul>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="font-bold text-purple-800 uppercase tracking-wide text-xs">Les 5 Ensembles Fonctionnels</span>
            <ul className="space-y-1 text-slate-700">
              <li>1. <strong>Authentification :</strong> Inscription, connexion sécurisée, session utilisateur.</li>
              <li>2. <strong>Gestion des projets :</strong> CRUD complet (Créer, lister, éditer, supprimer).</li>
              <li>3. <strong>Gestion des tâches :</strong> Assignation, priorités (Basse, Moyenne, Haute), statut.</li>
              <li>4. <strong>Tableau de bord :</strong> Statistiques d&apos;avancement et métriques en temps réel.</li>
              <li>5. <strong>Documentation :</strong> Spécifications d&apos;API OpenAPI et guides d&apos;installation.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Délimitation des responsabilités des 5 agents */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Responsabilités respectives des 5 agents
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Agent</th>
                <th className="p-3">Mission principale</th>
                <th className="p-3">Livrable obligatoire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-bold text-purple-900">Coordinateur</td>
                <td className="p-3">Analyse la demande humaine, décompose en tâches et supervise l&apos;escouade</td>
                <td className="p-3 font-mono text-xs">Plan global et rapport de synthèse</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-900">Développeur</td>
                <td className="p-3">Conçoit et développe les interfaces React et routes Express autorisées</td>
                <td className="p-3 font-mono text-xs">Code source, diffs unifiés et composants</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-900">Sécurité</td>
                <td className="p-3">Analyse les risques (SQLi, XSS, auth), sans modifier le code par défaut</td>
                <td className="p-3 font-mono text-xs">Rapport d&apos;audit et recommandations</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-900">Testeur</td>
                <td className="p-3">Prépare les scénarios et vérifie la conformité avec preuves matérielles</td>
                <td className="p-3 font-mono text-xs">Plan de tests et matrice de résultats</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Documentaliste</td>
                <td className="p-3">Rédige la documentation technique fondée sur les éléments confirmés</td>
                <td className="p-3 font-mono text-xs">Documentation API et guides d&apos;exploitation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="Limites volontaires du projet">
          Pour concentrer l&apos;effort pédagogique sur l&apos;ingénierie de prompt et la coordination multi-agents, nous excluons délibérément les passerelles de paiement bancaire, l&apos;envoi de SMS et les fonctionnalités d&apos;IA dans l&apos;application finale.
        </Callout>
      </section>

      {/* 4. Le Cahier des charges officiel */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le Cahier des Charges Officiel du Projet
        </h2>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-2 leading-relaxed">
          <div className="text-purple-400 font-bold border-b border-slate-800 pb-1">
            # =====================================================================<br />
            # CAHIER DES CHARGES — SYSTÈME MULTI-AGENTS IA (PROJET FINAL)<br />
            # =====================================================================
          </div>
          <p className="text-slate-300">1. OBJET : Piloter le développement complet d&apos;une application de gestion de tâches par une équipe de 5 agents IA sous contrôle d&apos;un développeur humain.</p>
          <p className="text-slate-300">2. TECHNOLOGIES IMPOSÉES : React.js (Frontend), Node.js / Express (Backend REST), MySQL (Base relationnelle), Google Antigravity (IDE agentique).</p>
          <p className="text-slate-300">3. RÈGLE DE GOUVERNANCE STRICTE : Mode lecture seule par défaut pour tous les agents. Aucune écriture, création ou suppression de fichier sans présentation préalable du diff et validation humaine formelle.</p>
          <p className="text-slate-300">4. SANCTUARISATION DES SECRETS : Interdiction absolue d&apos;accès aux fichiers .env et aux clés privées. Traçabilité des actions sans secrets dans les logs.</p>
          <p className="text-slate-300">5. CRITÈRE D&apos;ACHÈVEMENT : Le projet est validé lorsque les 5 ensembles fonctionnels sont codés, audités sans faille critique, couverts par des tests avec preuves et documentés.</p>
        </div>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Cahier des charges
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel agent est spécifiquement chargé d'analyser la demande humaine et de répartir les missions dans l'équipe ?",
              options: [
                "L'agent développeur",
                "L'agent coordinateur",
                "L'agent testeur",
                "L'agent documentaliste"
              ],
              correctIndex: 1,
              explanation: "Le coordinateur est le pivot organisationnel : il comprend le besoin global, le découpe en tâches et orchestre les interventions."
            },
            {
              id: 2,
              question: "Un agent détectant une faille de sécurité critique a-t-il le droit de modifier immédiatement le code sans accord préalable ?",
              options: [
                "Oui, car la sécurité est prioritaire",
                "Non, il doit rédiger un rapport avec preuve et recommandation, et laisser le développeur appliquer la correction après validation humaine",
                "Oui, s'il fait une copie de sauvegarde",
                "Non, il doit supprimer le projet entier"
              ],
              correctIndex: 1,
              explanation: "Pour éviter les conflits d'écriture et préserver la gouvernance, l'agent sécurité audite et recommande ; le développeur applique après validation humaine."
            }
          ]}
        />
      </section>
    </div>
  );
};

