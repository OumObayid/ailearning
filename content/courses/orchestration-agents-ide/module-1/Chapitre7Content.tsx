'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur interactif de diagnostic : Possibilité vs Limite vs Risque
  const [activeCategory, setActiveCategory] = useState<'possibilities' | 'limits' | 'governance'>('possibilities');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider bg-indigo-100/80 px-3 py-1 rounded-full border border-indigo-300">
            <Icon name="users" className="w-4 h-4 text-indigo-800" />
            <span>Orchestration Multi-Agents • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Temps de lecture : ~15 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] mb-3 min-w-0 max-w-full">
          Chapitre 7 — Identifier les possibilités et les limites des agents IA
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Dresser un inventaire lucide et objectif des capacités réelles des agents logiciels : ce qu&apos;ils font avec brio, leurs angles morts techniques, les risques de sécurité et la nécessité absolue de la gouvernance humaine.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-indigo-200/80 flex flex-col gap-2.5 min-w-0 max-w-full text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Cartographier les 6 grands domaines d&apos;action</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Identifier les 7 pièges et risques récurrents</span>
          </div>
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="whitespace-normal break-words [overflow-wrap:anywhere]">Établir la frontière de gouvernance humaine</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LES POSSIBILITÉS MAJEURES
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">1</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            7.1 & 7.2 — Les 6 domaines où les agents IA excellent
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Lorsqu&apos;ils sont encadrés par des instructions précises, les agents IA augmentent considérablement la productivité logicielle dans 6 domaines clés :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Domaine 1 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">1</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Analyse & Cartographie de Codebase
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                Exploration
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Explorer en quelques secondes des dizaines de fichiers, comprendre l&apos;architecture d&apos;un projet inconnu et repérer les conventions de code existantes sans effort cognitif manuel.
            </p>
          </div>

          {/* Domaine 2 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">2</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Conception Technique & Contrats d&apos;Interface
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                Architecture
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Formuler des propositions d&apos;architecture cohérentes, concevoir des contrats d&apos;API REST robustes et structurer les schémas de données TypeScript de manière exhaustive.
            </p>
          </div>

          {/* Domaine 3 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">3</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Développement Impeccable de Fonctions
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Production
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Créer les contrôleurs Express, coder les composants visuels React et brancher les formulaires sans fautes de syntaxe ni erreurs d&apos;inattention.
            </p>
          </div>

          {/* Domaine 4 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">4</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Automatisation des Suites de Tests
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                Qualité Logicielle
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Rédiger des tests unitaires Vitest couvrants, injecter automatiquement les cas limites (valeurs nulles, erreurs 404/500, timeouts) et prévenir les régressions.
            </p>
          </div>

          {/* Domaine 5 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">5</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Documentation Vivante & Comptes Rendus
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                Pérennité
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Maintenir à jour la documentation des endpoints dans <code>README.md</code>, annoter les types d&apos;API et rédiger des bilans structurés à la clôture de chaque mission.
            </p>
          </div>

          {/* Domaine 6 */}
          <div className="w-full min-w-0 max-w-full p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">6</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Collaboration Multi-Agents Coordonnée
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                Synergie
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Permettre à des profils spécialisés (Architect, Backend, Frontend, QA, Reviewer) de collaborer de façon fluide sous la houlette d&apos;un Team Leader IA et d&apos;un PM humain.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LES LIMITES INTRINSÈQUES ET RISQUES TECHNIQUES
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">2</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            7.3 — Les 7 limites et risques critiques à anticiper
          </h2>
        </div>

        <div className="flex flex-col gap-3.5 w-full min-w-0 max-w-full">
          {/* Limite 1 */}
          <div className="w-full min-w-0 max-w-full p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 text-rose-900 text-xs font-black shrink-0">1</span>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Erreurs d&apos;interprétation & Spécifications ambiguës
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Cadrage
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Si vous demandez « <em>Améliore la gestion des statuts</em> », l&apos;agent peut inventer des statuts non prévus dans TaskFlow. Une consigne doit être chirurgicale et préciser les critères d&apos;acceptation.
            </p>
          </div>

          {/* Limite 2 */}
          <div className="w-full min-w-0 max-w-full p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 text-rose-900 text-xs font-black shrink-0">2</span>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Bugs invisibles et solutions en trompe-l&apos;œil
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Fiabilité
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Le code généré par IA compile presque toujours, mais il peut masquer des failles logiques (oubli de filtrage, fuite mémoire, promesse non gérée ou conditions aux limites ignorées).
            </p>
          </div>

          {/* Limite 3 */}
          <div className="w-full min-w-0 max-w-full p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 text-rose-900 text-xs font-black shrink-0">3</span>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Contexte incomplet ou désynchronisé
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Alignement
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Si un agent n&apos;est pas informé d&apos;une modification du contrat d&apos;API effectuée par un collègue, il développera un composant frontend rigoureusement incompatible.
            </p>
          </div>

          {/* Limite 4 */}
          <div className="w-full min-w-0 max-w-full p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 text-rose-900 text-xs font-black shrink-0">4</span>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Risques de sécurité & Fuite de secrets
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Sécurité
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Ne jamais exposer de jetons d&apos;accès, clés d&apos;API privées ou chaînes de connexion dans les fichiers scannés par l&apos;agent ou dans l&apos;historique de discussion.
            </p>
          </div>

          {/* Limite 5 */}
          <div className="w-full min-w-0 max-w-full p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 text-rose-900 text-xs font-black shrink-0">5</span>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Conflits concurrents d&apos;écriture
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Concurrence Git
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Deux agents modifiant le même fichier en parallèle risquent d&apos;écraser mutuellement leur travail si l&apos;isolation des branches de travail (Git Worktrees) n&apos;est pas appliquée.
            </p>
          </div>

          {/* Limite 6 */}
          <div className="w-full min-w-0 max-w-full p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 text-rose-900 text-xs font-black shrink-0">6</span>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Hallucinations d&apos;APIs & Paquets fantômes
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Dépendances
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              L&apos;IA peut inventer des options de configuration inexistantes ou importer des bibliothèques obsolètes ou non supportées dans votre version de Node.js/React.
            </p>
          </div>

          {/* Limite 7 */}
          <div className="w-full min-w-0 max-w-full p-4 sm:p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/60 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 text-rose-900 text-xs font-black shrink-0">7</span>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]">
                  Absence de responsabilité juridique & morale
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-rose-700 border border-rose-200 shrink-0">
                Légal & Éthique
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              Un agent logiciel n&apos;est pas une entité juridique. Le Project Manager humain assume l&apos;entière responsabilité du code final livré en production et de ses impacts.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : LA MATRICE DE GOUVERNANCE HUMAINE
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">3</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            7.4 & 7.5 — La frontière souveraine : Pourquoi la supervision humaine est non négociable
          </h2>
        </div>

        <div className="overflow-x-auto w-full min-w-0 max-w-full -mx-1 sm:mx-0">
          <table className="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Mission / Opération</th>
                <th className="p-3.5">Délégable aux Agents IA ?</th>
                <th className="p-3.5">Rôle du Project Manager Humain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-bold">Analyser les fichiers et proposer une architecture</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui (Agent Architect)</td>
                <td className="p-3.5 text-slate-600">Examine la proposition et valide l&apos;orientation retenue.</td>
              </tr>
              <tr className="bg-indigo-50/20">
                <td className="p-3.5 font-bold">Coder l&apos;API Express et les composants React</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui (Agents Backend & Frontend)</td>
                <td className="p-3.5 text-slate-600">Définit les critères d&apos;acceptation et contrôle l&apos;avancement.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Rédiger et exécuter les tests Vitest</td>
                <td className="p-3.5 text-emerald-700 font-bold">Oui (Agent QA)</td>
                <td className="p-3.5 text-slate-600">Vérifie que les scénarios testés correspondent au besoin réel.</td>
              </tr>
              <tr className="bg-rose-50/30">
                <td className="p-3.5 font-bold text-rose-950">Arbitrer un changement de technologie majeure</td>
                <td className="p-3.5 text-rose-700 font-black">Non (Interdit aux agents)</td>
                <td className="p-3.5 text-rose-900 font-bold">Décision stratégique exclusive du PM humain.</td>
              </tr>
              <tr className="bg-rose-50/30">
                <td className="p-3.5 font-bold text-rose-950">Valider un merge sur la branche main ou un push distant</td>
                <td className="p-3.5 text-rose-700 font-black">Non (Interdit aux agents)</td>
                <td className="p-3.5 text-rose-900 font-bold">Autorisation explicite obligatoire après revue des diffs.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Distinction fondamentale : Supervision vs Validation">
          • La <strong>Supervision</strong> consiste à suivre l&apos;avancement des agents, à débloquer leurs doutes et à vérifier la propreté de leurs livrables.
          <br />• La <strong>Validation</strong> est l&apos;acte juridique et technique par lequel l&apos;humain assume la responsabilité du code intégré au projet. <strong>Un agent ne peut jamais se valider lui-même !</strong>
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 4 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="p-6 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 space-y-3">
        <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-indigo-700" />
          <span>7.8 — Synthèse générale du chapitre</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
          Les agents IA sont des accélérateurs techniques d&apos;une puissance exceptionnelle pour explorer, coder, tester et documenter. Cependant, leur fiabilité dépend entièrement du cadrage fourni : missions chirurgicales, contexte actualisé et permissions restreintes. <strong>Le Project Manager humain reste le chef d&apos;orchestre incontestable : il conserve l&apos;exclusivité des choix stratégiques, de la validation des livrables et de la livraison de TaskFlow</strong>.
        </p>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ OFFICIEL DE VALIDATION
         ========================================================================= */}
      <section className="space-y-6 pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">✓</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            7.9 — Quiz de compréhension (9 questions)
          </h2>
        </div>

        <QuickQuiz
          title="Évaluation des connaissances : Possibilités et limites des agents IA"
          questions={[
            {
              id: 1,
              question: "Quelle tâche un agent IA peut-il réaliser avec efficacité dans un projet logiciel ?",
              options: [
                "Analyser l'arborescence des fichiers et proposer une ébauche d'architecture",
                "Garantir mathématiquement l'absence absolue de tout bug",
                "Remplacer toutes les décisions de gouvernance humaine",
                "Supprimer tous les besoins de tests et de relecture"
              ],
              correctIndex: 0,
              explanation: "L'analyse de code et la proposition d'architecture font partie des points forts des agents."
            },
            {
              id: 2,
              question: "Pourquoi est-il indispensable de relire et tester le code produit par un agent IA ?",
              options: [
                "Parce qu'un agent ne sait jamais écrire de code qui compile",
                "Parce que le code généré peut contenir des failles logiques, des régressions ou des cas limites oubliés",
                "Parce que les tests automatisés refusent de s'exécuter sur du code généré par IA",
                "Parce qu'il faut obligatoirement réécrire tout le code à la main"
              ],
              correctIndex: 1,
              explanation: "Le code généré peut sembler parfait tout en masquant des régressions ou des incohérences."
            },
            {
              id: 3,
              question: "Quelle situation risque directement d'induire un agent en erreur dans ses développements ?",
              options: [
                "Un contexte de travail incomplet, obsolète ou contradictoire",
                "Une consigne claire avec des critères d'acceptation précis",
                "Un contrat d'API partagé et validé",
                "Une suite de tests unitaires rigoureuse"
              ],
              correctIndex: 0,
              explanation: "Un contexte défaillant ou obsolète conduit mécaniquement l'agent à faire de mauvais choix."
            },
            {
              id: 4,
              question: "Pourquoi applique-t-on le principe de moindre privilège aux permissions des agents ?",
              options: [
                "Pour les empêcher de comprendre l'architecture du projet",
                "Pour réduire les risques de modifications non souhaitées ou de commandes destructives",
                "Pour désactiver leur modèle d'intelligence artificielle",
                "Pour les empêcher d'utiliser TypeScript"
              ],
              correctIndex: 1,
              explanation: "Limiter les accès protège les fichiers et le système contre les opérations accidentelles."
            },
            {
              id: 5,
              question: "Quel danger apparaît lorsque plusieurs agents interviennent en même temps sur les mêmes fichiers ?",
              options: [
                "Les fichiers s'effacent automatiquement d'Internet",
                "Les conversations de chat disparaissent",
                "Ils risquent d'écraser mutuellement leurs modifications et de créer des conflits Git sévères",
                "Le compilateur Node.js refuse de démarrer"
              ],
              correctIndex: 2,
              explanation: "L'écriture concurrente sans isolation physique engendre des écrasements de code."
            },
            {
              id: 6,
              question: "Dans l'organisation de TaskFlow, qui a le dernier mot pour valider les décisions stratégiques ?",
              options: [
                "L'agent Backend",
                "L'agent QA",
                "Le Team Leader IA",
                "Le Project Manager humain"
              ],
              correctIndex: 3,
              explanation: "Le PM humain est le seul détenteur de l'autorité décisionnelle finale sur le projet."
            },
            {
              id: 7,
              question: "Quelle bonne pratique garantit les meilleurs résultats lors du brief d'un agent ?",
              options: [
                "Lui donner un objectif vague pour lui laisser une liberté totale",
                "Lui fournir des instructions précises, des contraintes strictes et un contexte adapté",
                "Lui accorder systématiquement tous les droits d'administration système",
                "Lui interdire de lire les fichiers du projet"
              ],
              correctIndex: 1,
              explanation: "La clarté du prompt et des contraintes détermine directement la pertinence du code produit."
            },
            {
              id: 8,
              question: "Un agent QA peut-il garantir à lui seul la qualité totale d'une application ?",
              options: [
                "Oui, dès lors qu'il a exécuté une suite de tests",
                "Oui, s'il travaille en parallèle avec un agent Frontend",
                "Non, ses résultats doivent être audités et complétés par la validation humaine",
                "Non, car un agent ne sait pas écrire de tests"
              ],
              correctIndex: 2,
              explanation: "Les tests sont une condition nécessaire mais non suffisante : le regard critique humain reste irremplaçable."
            },
            {
              id: 9,
              question: "Pourquoi lancer un grand nombre d'agents simultanément n'est-il pas toujours bénéfique ?",
              options: [
                "Parce que les agents refusent de communiquer entre eux",
                "Parce que cela engendre des surcoûts en tokens et une complexité de synchronisation qui annulent les gains",
                "Parce que Git interdit formellement d'avoir plus de 2 agents",
                "Parce que le code devient automatiquement plus lent à l'exécution"
              ],
              correctIndex: 1,
              explanation: "Le surcoût d'orchestration et le risque de collisions augmentent avec le nombre d'agents non coordonnés."
            }
          ]}
        />
      </section>
    </div>
  );
};
