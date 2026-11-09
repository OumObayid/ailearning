'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Projet pratique : coordonner une équipe de six agents spécialisés
        </h1>
      </div>

      {/* 1. Objectif du projet */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectif du projet de synthèse
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Ce projet réunit l&apos;ensemble des savoir-faire acquis dans le Module 5. Vous allez orchestrer une équipe complète de <strong>six agents spécialisés sous la gouvernance d&apos;un agent orchestrateur</strong> dans Google Antigravity, afin d&apos;enrichir une application portfolio React d&apos;une barre de recherche par titre et par catégorie.
        </p>
      </section>

      {/* 2. Maquettes et résultat attendu */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Présentation des maquettes de l&apos;application
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;application présente les projets d&apos;un développeur avec titre, descriptif, catégorie (React, Vue.js, Node.js) et aperçu visuel :
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
              Figure 5.1 : Vue galerie des réalisations à filtrer.
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
              Figure 5.2 : En-tête et zone d&apos;intégration de la recherche de projets.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Circuit de collaboration des 6 missions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le circuit de collaboration des 6 missions
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-700 font-mono">Mission 1</span>
              <h4 className="font-bold text-slate-950 text-sm">Analyse et conception (Architecte)</h4>
              <p className="text-xs text-slate-600">Définition du composant SearchBar, de l&apos;état local et de la gestion du vide.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded">Porte de validation 1</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-700 font-mono">Mission 2</span>
              <h4 className="font-bold text-slate-950 text-sm">Implémentation ciblée (Développeur)</h4>
              <p className="text-xs text-slate-600">Écriture du code de filtrage insensible à la casse dans le périmètre autorisé.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded">Porte de validation 2</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-700 font-mono">Missions 3 &amp; 4</span>
              <h4 className="font-bold text-slate-950 text-sm">Revue Qualité &amp; Sécurité en parallèle (Auditeur &amp; Sécurité)</h4>
              <p className="text-xs text-slate-600">Audit de maintenabilité du state React et traçage d&apos;éventuelles injections XSS.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-800 rounded">Revue Parallèle</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-700 font-mono">Mission 5</span>
              <h4 className="font-bold text-slate-950 text-sm">Exécution des tests fonctionnels (Testeur)</h4>
              <p className="text-xs text-slate-600">Test des 7 scénarios (recherche nominale, catégorie, casse, sans résultat, effacement).</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">Validation QA</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-700 font-mono">Mission 6</span>
              <h4 className="font-bold text-slate-950 text-sm">Documentation officielle (Documentaliste)</h4>
              <p className="text-xs text-slate-600">Rédaction de la documentation fidèle basée uniquement sur les tests réussis.</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded">Livrable Final</span>
          </div>
        </div>
      </section>

      {/* 4. Prompt de déploiement pour Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Prompt intégral de lancement dans Antigravity
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`Tu es l'agent orchestrateur d'une équipe de six agents spécialisés :
- Architecte, Développeur, Auditeur, Sécurité, Testeur et Documentaliste.

MISSION GÉNÉRALE :
Ajouter une fonctionnalité de recherche par titre et par catégorie dans mon portfolio React.

CONSIGNES STRICTES DE GOUVERNANCE :
1. Ne parcours aucun dossier extérieur au projet et ne modifie aucun fichier à cette étape.
2. Décompose la mission en 6 sous-tâches étanches avec fiches de Handoff.
3. Prévois les deux portes de validation humaine obligatoires (avant édition et avant build).
4. Soumets-moi ton plan de coordination complet pour validation avant de lancer le premier sous-agent.`}</pre>
        </div>
      </section>

      {/* 5. Grille d'évaluation sur 25 points */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Grille d&apos;homologation finale de l&apos;équipe (25 points)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Critère d&apos;évaluation</th>
                <th className="p-3 border border-slate-200">Barème</th>
                <th className="p-3 border border-slate-200">Condition de réussite</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold">1. Étanchéité des missions (RACI)</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">3 pts</td>
                <td className="p-3 border border-slate-200">Aucun empiètement entre auditeur, sécurité et développeur.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">2. Décomposition par l&apos;orchestrateur</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">3 pts</td>
                <td className="p-3 border border-slate-200">Sous-tâches clairement formulées et ordonnées.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">3. Rigueur du Context Handoff</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">3 pts</td>
                <td className="p-3 border border-slate-200">Transmissions sans perte de contraintes techniques.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">4. Respect absolu des autorisations</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">5 pts</td>
                <td className="p-3 border border-slate-200">Zéro modification sans accord (critère bloquant).</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">5. Preuves des tests d&apos;exécution</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">3 pts</td>
                <td className="p-3 border border-slate-200">Distinction nette entre tests passés et non exécutés.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">6. Clarté du compte rendu final</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">2 pts</td>
                <td className="p-3 border border-slate-200">Rapport consolidé fidèle et transparent.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="success">
          <strong>Validation du Module 5 :</strong> L&apos;équipe est déclarée opérationnelle pour la production à partir d&apos;une note supérieure ou égale à <strong>21/25</strong> et zéro manquement aux règles de sécurité du workspace.
        </Callout>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Examen final du Module 5
        </h2>
        <QuickQuiz
          title="Examen final — Module 5 : Équipes d'agents spécialisés"
          questions={[
            {
              id: 1,
              question: "Dans le projet de synthèse, quel est l'unique agent autorisé à modifier physiquement le code source du composant de recherche ?",
              options: [
                "L'agent Développeur, exclusivement après validation formelle de son plan par l'utilisateur.",
                "L'agent Sécurité dès qu'il repère une faille.",
                "L'agent Documentaliste pour insérer des commentaires.",
                "Tous les agents en même temps."
              ],
              correctIndex: 0,
              explanation: "L'unicité de la responsabilité d'écriture garantit l'intégrité du code : seul le développeur code après approbation humaine."
            },
            {
              id: 2,
              question: "Que doit faire l'agent testeur si la commande de tests unitaires n'a pas pu être exécutée faute de temps ?",
              options: [
                "Déclarer que les tests sont réussis par défaut.",
                "Signaler honnêtement dans son rapport que les tests sont au statut 'NON EXÉCUTÉS' et ne pas prétendre à un succès sans preuve.",
                "Supprimer le fichier de test pour cacher l'oubli.",
                "Inventer de fausses traces dans le terminal."
              ],
              correctIndex: 1,
              explanation: "L'intégrité factuelle est non négociable : un test non exécuté doit être consigné comme tel pour que l'humain prenne les mesures nécessaires."
            }
          ]}
        />
      </section>
    </div>
  );
};

