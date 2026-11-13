'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 5</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 8 — Projet pratique : coordonner une équipe de six agents spécialisés
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Mise en pratique finale : orchestrez votre équipe complète de 6 agents dans Google Antigravity pour concevoir, coder, auditer, tester et documenter une recherche de projets React en direct.
        </p>
      </div>

      {/* 1. Objectif du projet */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="rocket-launch" className="w-5 h-5 text-indigo-600" />
          <span>1. Objectif du projet de synthèse</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Ce grand projet pratique est le point d&apos;orgue du Module 5. Votre mission consiste à coordonner une équipe complète de <strong>six sous-agents sous l&apos;égide d&apos;un agent Orchestrateur</strong> afin d&apos;enrichir une application portfolio React d&apos;un système de recherche instantanée multi-critères (par titre de projet et par catégorie technique).
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>Les 3 défis d&apos;ingénierie à relever :</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>Zéro conflit d&apos;écriture :</strong> Seul l&apos;agent Développeur modifiera le code source, après validation humaine.</li>
            <li><strong>Revue parallèle indépendante :</strong> L&apos;Auditeur et l&apos;agent Sécurité examineront le commit simultanément sans se gêner.</li>
            <li><strong>Certification factuelle :</strong> L&apos;agent Testeur et le Documentaliste ne valideront que ce qui a été prouvé par des logs d&apos;exécution.</li>
          </ul>
        </div>
      </section>

      {/* 2. Maquettes de l'application */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="photo" className="w-5 h-5 text-indigo-600" />
          <span>2. Présentation visuelle de l&apos;application cible</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;application affiche une galerie de projets avec aperçu visuel, titre, descriptif et badge de technologie (React, Node.js, TypeScript) :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-2 shadow-sm">
            <div className="relative w-full aspect-[16/10] max-h-[300px]">
              <Image
                src="/images/cours/prompt-engineering-ide/module-5-image1.jpeg"
                alt="Exemple de portfolio de projets web"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <p className="text-center text-xs text-slate-300 py-1.5 font-mono">
              Figure 5.1 : Galerie des cartes de projets à filtrer dynamiquement.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-2 shadow-sm">
            <div className="relative w-full aspect-[16/10] max-h-[300px]">
              <Image
                src="/images/cours/prompt-engineering-ide/module-5-image2.jpeg"
                alt="Interface de portfolio personnel avec barre de recherche"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <p className="text-center text-xs text-slate-300 py-1.5 font-mono">
              Figure 5.2 : En-tête et zone d&apos;insertion de la barre de recherche.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Le circuit de collaboration des 6 missions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="arrows-pointing-in" className="w-5 h-5 text-indigo-600" />
          <span>3. Le circuit de collaboration étape par étape</span>
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-700 font-mono bg-indigo-50 px-2 py-0.5 rounded">ÉTAPE 1</span>
                <h4 className="font-bold text-slate-950 text-sm">Conception &amp; Architecture (Architecte)</h4>
              </div>
              <p className="text-xs text-slate-600">Définition du composant <code className="font-mono">SearchBar.jsx</code>, de la gestion du state local et du composant d&apos;état vide (EmptyState).</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg shrink-0">Porte de validation 1</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-700 font-mono bg-indigo-50 px-2 py-0.5 rounded">ÉTAPE 2</span>
                <h4 className="font-bold text-slate-950 text-sm">Implémentation chirurgicale (Développeur)</h4>
              </div>
              <p className="text-xs text-slate-600">Écriture du composant avec filtrage insensible à la casse et mise à jour minimale du composant parent <code className="font-mono">App.jsx</code>.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg shrink-0">Mandat d&apos;écriture</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-700 font-mono bg-indigo-50 px-2 py-0.5 rounded">ÉTAPES 3 &amp; 4</span>
                <h4 className="font-bold text-slate-950 text-sm">Revue Qualité &amp; Sécurité en parallèle (Auditeur &amp; Sécurité)</h4>
              </div>
              <p className="text-xs text-slate-600">L&apos;auditeur analyse la complexité et les re-renders ; l&apos;agent sécurité traque d&apos;éventuelles injections XSS ou failles DOM.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-purple-100 text-purple-900 rounded-lg shrink-0">Fan-Out Parallèle</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-700 font-mono bg-indigo-50 px-2 py-0.5 rounded">ÉTAPE 5</span>
                <h4 className="font-bold text-slate-950 text-sm">Exécution des tests fonctionnels (Testeur)</h4>
              </div>
              <p className="text-xs text-slate-600">Test systématique des scénarios : recherche exacte, insensibilité casse, filtre catégorie, recherche vide et réinitialisation.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg shrink-0">Validation Factuelle</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-700 font-mono bg-indigo-50 px-2 py-0.5 rounded">ÉTAPE 6</span>
                <h4 className="font-bold text-slate-950 text-sm">Documentation officielle (Documentaliste)</h4>
              </div>
              <p className="text-xs text-slate-600">Mise à jour du README avec les instructions d&apos;utilisation et les props du composant SearchBar basées sur les tests validés.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg shrink-0">Livrable Final</span>
          </div>
        </div>
      </section>

      {/* 4. Prompt intégral de lancement dans Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="command-line" className="w-5 h-5 text-indigo-600" />
          <span>4. Prompt intégral de lancement dans Google Antigravity</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-800">
          Copiez ce prompt dans la fenêtre de chat principale d&apos;Antigravity pour initialiser l&apos;orchestration du projet :
        </p>

        {/* Master Prompt Box without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === PROMPT D&apos;ORCHESTRATION DU PROJET PORTFOLIO ===
          </div>
          <div className="text-slate-200">
            Tu es le Lead Orchestrateur supervisant notre équipe de six agents spécialisés :
          </div>
          <div className="pl-4 text-emerald-300">
            • Architecte (@architecte)<br />
            • Développeur (@developpeur)<br />
            • Auditeur Qualité (@auditeur)<br />
            • Sécurité AppSec (@securite)<br />
            • Testeur QA (@testeur)<br />
            • Documentaliste (@documentaliste)
          </div>

          <div className="text-amber-300 font-bold pt-1">[OBJECTIF PRINCIPAL]</div>
          <div className="text-slate-200">
            Implémenter un champ de recherche réactif dans notre portfolio React permettant de filtrer les projets par titre et par catégorie technologique, sans rechargement de page.
          </div>

          <div className="text-rose-400 font-bold pt-1">[CONSIGNES STRICTES DE GOUVERNANCE]</div>
          <div className="pl-4 text-slate-200">
            1. NE MODIFIE AUCUN FICHIER à cette étape d&apos;initialisation.<br />
            2. Établis le plan d&apos;orchestration en 6 sous-tâches étanches avec fiches de Context Handoff prévisionnelles.<br />
            3. PRÉVOIS LA PORTE DE VALIDATION HUMAINE obligatoire avant d&apos;autoriser @developpeur à appliquer les modifications de code.<br />
            4. Soumets-moi ton plan d&apos;action complet pour approbation avant de lancer la mission 1 (@architecte).
          </div>
        </div>
      </section>

      {/* 5. Grille d'évaluation finale sur 25 points */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="check-badge" className="w-5 h-5 text-indigo-600" />
          <span>5. Grille d&apos;homologation finale de l&apos;équipe (25 points)</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Critère d&apos;homologation</th>
                <th className="p-3.5 border-b border-slate-200 text-center">Barème</th>
                <th className="p-3.5 border-b border-slate-200">Condition de validation</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold">1. Étanchéité absolue des rôles (RACI)</td>
                <td className="p-3.5 text-center font-bold text-indigo-700">/ 5 pts</td>
                <td className="p-3.5">Seul l&apos;agent Développeur a utilisé un outil d&apos;édition de code. Zéro empiètement.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">2. Découpage et clarté de l&apos;Orchestrateur</td>
                <td className="p-3.5 text-center font-bold text-indigo-700">/ 5 pts</td>
                <td className="p-3.5">Les 6 sous-tâches sont distinctes, bien ordonnées et sans dépendance circulaire.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">3. Rigueur du Context Handoff</td>
                <td className="p-3.5 text-center font-bold text-indigo-700">/ 5 pts</td>
                <td className="p-3.5">Les contraintes techniques (zéro paquet externe, props) sont transmises sans déperdition.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">4. Respect des portes d&apos;approbation</td>
                <td className="p-3.5 text-center font-bold text-indigo-700">/ 5 pts</td>
                <td className="p-3.5">L&apos;orchestrateur a attendu l&apos;accord explicite de l&apos;utilisateur avant toute modification réelle.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">5. Preuves factuelles des tests</td>
                <td className="p-3.5 text-center font-bold text-indigo-700">/ 5 pts</td>
                <td className="p-3.5">Les 5 scénarios de recherche sont certifiés avec logs réels et distinction des cas non testés.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {[
            { title: "1. Étanchéité des rôles", pts: "5 pts", desc: "Seul le développeur a modifié des fichiers de code." },
            { title: "2. Découpage orchestrateur", pts: "5 pts", desc: "6 étapes bien séquencées sans blocages." },
            { title: "3. Rigueur Handoff", pts: "5 pts", desc: "Transmissions fidèles sans oubli de contraintes." },
            { title: "4. Portes d'approbation", pts: "5 pts", desc: "Accord humain préalable respecté à chaque tournant." },
            { title: "5. Preuves factuelles", pts: "5 pts", desc: "Logs réels certifiés sans aucune hallucination." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-950 text-sm">{item.title}</span>
                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{item.pts}</span>
              </div>
              <p className="text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>

        <Callout type="success">
          <strong>Seuil de certification :</strong> L&apos;équipe est déclarée prête pour un usage en environnement de production professionnel si elle obtient au minimum <strong>22/25</strong> avec un score parfait de 5/5 sur l&apos;étanchéité des rôles.
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Examen de certification finale du Module 5
        </h2>
        <QuickQuiz
          title="Examen final — Module 5 : Équipes d'agents spécialisés"
          questions={[
            {
              id: 1,
              question: "Dans le projet de synthèse, quel est l'unique agent autorisé à modifier physiquement le fichier source SearchBar.jsx ?",
              options: [
                "L'agent Développeur, exclusivement après que l'utilisateur a formellement validé le plan d'action d'architecture.",
                "L'agent Sécurité dès qu'il repère une faille potentielle.",
                "L'agent Documentaliste pour ajouter des commentaires au code.",
                "L'ensemble des six agents en même temps pour accélérer la livraison."
              ],
              correctIndex: 0,
              explanation: "L'unicité de la responsabilité d'écriture (un seul R) est le principe fondamental qui empêche les corruptions de fichiers et les régressions contradictoires."
            },
            {
              id: 2,
              question: "Que doit consigner l'agent testeur si la suite de tests automatisés n'a pas pu être exécutée par manque de temps ?",
              options: [
                "Déclarer honnêtement que les tests sont au statut 'NON EXÉCUTÉ' et refuser catégoriquement de simuler un faux succès.",
                "Affirmer que tous les tests ont réussi pour rassurer le chef de projet.",
                "Supprimer le fichier de test pour faire disparaître l'alerte.",
                "Inventer de fausses traces d'exécution dans la console."
              ],
              correctIndex: 0,
              explanation: "L'intégrité factuelle est indispensable : un agent de confiance doit signaler avec exactitude ce qu'il a pu observer et ce qui reste à vérifier par l'humain."
            },
            {
              id: 3,
              question: "Quel est le bénéfice majeur d'avoir fait intervenir l'Auditeur Qualité et l'agent Sécurité en parallèle (Fan-Out) après l'écriture du composant ?",
              options: [
                "Ils examinent le même code stable sous deux angles indépendants sans risque de collision, divisant le temps de revue par deux.",
                "Cela permet de faire chauffer l'ordinateur pour l'hiver.",
                "Cela permet à l'un d'effacer les modifications de l'autre.",
                "C'est une obligation légale inscrite dans le code du travail."
              ],
              correctIndex: 0,
              explanation: "Le modèle parallèle (Fan-Out) est optimal pour les phases d'audit en lecture seule : il permet des revues multidimensionnelles sans allonger le cycle de livraison."
            }
          ]}
        />
      </section>
    </div>
  );
};
