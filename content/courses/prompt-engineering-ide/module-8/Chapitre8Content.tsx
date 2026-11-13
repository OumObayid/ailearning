'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

/* ─────────────────────────── QuickQuiz ─────────────────────────── */
interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pourquoi utiliser des variables comme {{PERIMETRE}} dans un prompt de mission plutôt que d'écrire la valeur directement ?",
    options: [
      "Pour rendre le prompt plus difficile à lire",
      "Pour pouvoir réutiliser le même gabarit avec des valeurs différentes selon chaque mission",
      "Parce que les agents IA ne comprennent pas le texte brut",
      "Pour économiser de la mémoire dans le système",
    ],
    correctIndex: 1,
    explanation:
      "Les variables permettent de séparer la structure du prompt (invariante) de son contenu (spécifique à chaque mission). Le même gabarit DEV-ANALYSE peut ainsi servir pour analyser n'importe quel composant React sans réécrire le prompt à chaque fois.",
  },
  {
    question: "Quelle est la différence entre l'« Instruction principale » d'un agent et un « Prompt de mission » ?",
    options: [
      "Il n'y a aucune différence, ce sont des synonymes",
      "L'instruction principale définit la personnalité permanente de l'agent ; le prompt de mission lui confie une tâche précise et temporaire",
      "Le prompt de mission est écrit en anglais, l'instruction principale en français",
      "L'instruction principale est envoyée par email, le prompt de mission par chat",
    ],
    correctIndex: 1,
    explanation:
      "L'instruction principale (system prompt) est chargée une fois pour toutes et façonne le comportement général de l'agent. Le prompt de mission, lui, est un ordre de travail unique : il précise l'objectif, le périmètre et le livrable attendu pour une tâche donnée.",
  },
  {
    question: "Que doit faire un agent si la variable {{PERIMETRE}} est vide dans son prompt de mission ?",
    options: [
      "Ignorer le périmètre et travailler sur tout le projet",
      "Inventer un périmètre vraisemblable et continuer",
      "Suspendre immédiatement l'exécution et demander la valeur manquante au coordinateur",
      "Fermer la session et attendre le lendemain",
    ],
    correctIndex: 2,
    explanation:
      "La règle d'or est : « Variable vide = arrêt immédiat ». Un agent qui devine ou ignore un périmètre risque de modifier des fichiers non autorisés. Suspendre et demander est le seul comportement sûr.",
  },
];

function QuickQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(quizQuestions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState<boolean[]>(
    Array(quizQuestions.length).fill(false)
  );

  function handleAnswer(qi: number, oi: number) {
    if (selected[qi] !== null) return;
    const ns = [...selected];
    ns[qi] = oi;
    setSelected(ns);
    const ne = [...showExplanation];
    ne[qi] = true;
    setShowExplanation(ne);
  }

  return (
    <div className="space-y-6">
      {quizQuestions.map((q, qi) => (
        <div key={qi} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
          <p className="font-semibold text-slate-800 mb-3">
            <span className="text-purple-600 font-bold mr-2">Q{qi + 1}.</span>
            {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const answered = selected[qi] !== null;
              const isSelected = selected[qi] === oi;
              const isCorrect = oi === q.correctIndex;
              let cls =
                'w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors ';
              if (!answered) {
                cls += 'border-slate-200 hover:border-purple-400 hover:bg-purple-50 text-slate-700';
              } else if (isCorrect) {
                cls += 'border-emerald-400 bg-emerald-50 text-emerald-800 font-medium';
              } else if (isSelected) {
                cls += 'border-red-400 bg-red-50 text-red-800';
              } else {
                cls += 'border-slate-200 text-slate-400';
              }
              return (
                <button key={oi} className={cls} onClick={() => handleAnswer(qi, oi)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {showExplanation[qi] && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              <span className="font-bold">💡 Explication : </span>
              {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── Main Component ─────────────────────── */
export function Chapitre8Content() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10 space-y-14 text-slate-800">

      {/* ── HEADER ── */}
      <header className="rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span className="text-xs font-bold tracking-widest text-purple-700 uppercase">
            MODULE 8 — PROJET FINAL &amp; SYSTÈME MULTI-AGENTS
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere] mb-2">
          Construire une bibliothèque de prompts professionnels réutilisables
        </h1>
        <p className="text-slate-600 text-base">
          Découvrez comment structurer, paramétrer et versionner vos prompts de mission pour qu'ils restent cohérents, traçables et réutilisables dans tout système multi-agents.
        </p>
      </header>

      {/* ── SECTION 1 : ANALOGIE ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900">
          🍽️ Le chef étoilé et son livre de recettes
        </h2>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-900 leading-relaxed">
          <p className="font-bold text-base mb-2">🌟 Analogie : la cuisine étoilée</p>
          <p>
            Imaginez un chef trois étoiles Michelin. Chaque plat qu'il sert est identique soir après soir — même texture,
            même goût, même présentation. Comment ? Grâce à des <strong>fiches recettes standardisées</strong> avec des
            variables : <code className="bg-amber-100 px-1 rounded">{"{{INGRÉDIENT_PRINCIPAL}}"}</code>,{" "}
            <code className="bg-amber-100 px-1 rounded">{"{{QUANTITÉ}}"}</code>,{" "}
            <code className="bg-amber-100 px-1 rounded">{"{{TEMPS_CUISSON}}"}</code>.
          </p>
          <p className="mt-2">
            Chaque soir, les commis remplissent les variables avec les produits du marché — ce qui change le plat — mais
            la <strong>rigueur de la méthode reste invariante</strong>. Sans fiche, chaque cuisinier improvise, les
            résultats divergent et les erreurs s'accumulent.
          </p>
          <p className="mt-2 font-semibold">
            Votre bibliothèque de prompts, c'est ce livre de recettes. Chaque gabarit de mission est une fiche
            paramétrable : remplacez les variables, obtenez un ordre de mission précis — toujours avec la même rigueur.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 : POURQUOI UNE BIBLIOTHÈQUE ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900">📚 Pourquoi construire une bibliothèque ?</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {[
            {
              icon: "⏱️",
              title: "Gain de temps",
              desc: "Un gabarit prêt à l'emploi s'instancie en 30 secondes. Sans bibliothèque, rédiger un prompt complet prend 10 à 20 minutes.",
              color: "bg-blue-50 border-blue-200",
            },
            {
              icon: "🔗",
              title: "Cohérence inter-agents",
              desc: "Tous les agents reçoivent des prompts au format identique. Pas d'ambiguïté, pas de champ oublié, pas de comportement erratique.",
              color: "bg-purple-50 border-purple-200",
            },
            {
              icon: "🗂️",
              title: "Traçabilité",
              desc: "Chaque gabarit porte un identifiant et un numéro de version. En cas de bug, on sait exactement quel prompt, à quelle version, a causé le problème.",
              color: "bg-emerald-50 border-emerald-200",
            },
          ].map((card) => (
            <div key={card.title} className={`border rounded-2xl p-5 ${card.color}`}>
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="font-bold text-slate-800 mb-1">{card.title}</h3>
              <p className="text-sm text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3 : MODÈLE UNIVERSEL ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900">🧩 Les 11 champs obligatoires du modèle universel</h2>
        <p className="text-slate-600 text-sm">
          Tout prompt de mission professionnel doit contenir ces 11 champs. Aucun ne peut être omis ; une variable vide
          déclenche la règle d'or (voir plus bas).
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
          <p className="text-purple-400 font-bold border-b border-slate-800 pb-1">
            # MODÈLE UNIVERSEL PARAMÉTRABLE DE MISSION PROFESSIONNELLE
          </p>
          <p className="text-slate-500">─────────────────────────────────────────────────────</p>
          <p>
            <span className="text-cyan-400">IDENTIFIANT</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;MISSION_ID&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">AGENT_DESTINATAIRE</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;AGENT&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">OBJECTIF</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;OBJECTIF&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">CONTEXTE_TECHNIQUE</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;CONTEXTE&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">PÉRIMÈTRE_AUTORISÉ</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;PERIMETRE&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">MÉTHODE_ET_ÉTAPES</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;METHODE&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">RESTRICTIONS_STRICTES</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;RESTRICTIONS&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">DÉPENDANCES_AMONT</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;DEPENDANCES&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">LIVRABLE_ATTENDU</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;LIVRABLE&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">CRITÈRES_DE_VALIDATION</span>
            {" : "}
            <span className="text-yellow-300">&#123;&#123;CRITERES&#125;&#125;</span>
          </p>
          <p>
            <span className="text-cyan-400">STATUT_INITIAL</span>
            {" : "}
            <span className="text-emerald-400 font-bold">À FAIRE</span>
          </p>
        </div>

        {/* Callout règle d'or */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-5 text-sm text-red-800">
          <p className="font-bold text-base mb-1">🔴 Règle d'or des variables</p>
          <p>
            Si <strong>une seule variable</strong> reste vide dans le prompt de mission, l'agent{" "}
            <strong>suspend immédiatement son exécution</strong> et demande la valeur manquante au coordinateur. Il ne
            devine pas, n'improvise pas, n'ignore pas. Cette règle prévient les modifications hors périmètre et les
            livrables incomplets.
          </p>
        </div>
      </section>

      {/* ── SECTION 4 : TABLEAU RESPONSIVE ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">📊 Variables vs Valeurs fixes</h2>

        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-purple-50">
              <tr>
                <th className="text-left px-4 py-3 font-bold text-purple-800">Champ</th>
                <th className="text-left px-4 py-3 font-bold text-purple-800">Type</th>
                <th className="text-left px-4 py-3 font-bold text-purple-800">Exemple réel</th>
                <th className="text-left px-4 py-3 font-bold text-purple-800">Effet si vide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ["OBJECTIF", "Variable", "Créer l'endpoint POST /projets", "Mission sans direction → arrêt"],
                ["PÉRIMÈTRE_AUTORISÉ", "Variable", "src/routes/projets.ts uniquement", "Risque de modification hors scope → arrêt"],
                ["RESTRICTIONS_STRICTES", "Variable", "Ne pas modifier la base de données", "Comportement non borné → arrêt"],
                ["STATUT_INITIAL", "Valeur fixe", "À FAIRE (toujours)", "N/A — toujours présent"],
                ["AGENT_DESTINATAIRE", "Variable", "Agent Développeur Backend", "Prompt non routé → arrêt"],
                ["CRITÈRES_DE_VALIDATION", "Variable", "Tests Jest verts, zéro lint error", "Livrable non validable → arrêt"],
              ].map(([champ, type, ex, effet]) => (
                <tr key={champ} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-cyan-700 font-semibold">{champ}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                        type === "Variable"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 italic text-xs">{ex}</td>
                  <td className="px-4 py-3 text-xs text-red-700">{effet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile : cartes */}
        <div className="sm:hidden space-y-3">
          {[
            { champ: "OBJECTIF", type: "Variable", ex: "Créer l'endpoint POST /projets", effet: "Mission sans direction → arrêt" },
            { champ: "PÉRIMÈTRE_AUTORISÉ", type: "Variable", ex: "src/routes/projets.ts uniquement", effet: "Risque hors scope → arrêt" },
            { champ: "RESTRICTIONS_STRICTES", type: "Variable", ex: "Ne pas modifier la BDD", effet: "Comportement non borné → arrêt" },
            { champ: "STATUT_INITIAL", type: "Valeur fixe", ex: "À FAIRE (toujours)", effet: "N/A — toujours présent" },
            { champ: "AGENT_DESTINATAIRE", type: "Variable", ex: "Agent Développeur Backend", effet: "Prompt non routé → arrêt" },
            { champ: "CRITÈRES_DE_VALIDATION", type: "Variable", ex: "Tests Jest verts, 0 lint error", effet: "Livrable non validable → arrêt" },
          ].map((row) => (
            <div key={row.champ} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm text-sm">
              <p className="font-mono text-xs text-cyan-700 font-bold mb-1">{row.champ}</p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${
                  row.type === "Variable"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {row.type}
              </span>
              <p className="text-slate-600 italic">{row.ex}</p>
              <p className="text-red-600 text-xs mt-1">{row.effet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5 : CATALOGUE DES GABARITS ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900">🗃️ Catalogue des 8 gabarits standards</h2>
        <p className="text-slate-600 text-sm">
          Ces gabarits couvrent les quatre domaines du système multi-agents : développement, sécurité, tests et
          documentation.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              id: "DEV-ANALYSE",
              desc: "Analyse d'un composant ou module existant avant toute modification.",
              color: "bg-blue-50 border-blue-200 text-blue-800",
              badge: "bg-blue-200 text-blue-900",
            },
            {
              id: "DEV-PROPOSITION",
              desc: "Rédaction d'une proposition technique soumise à validation HITL.",
              color: "bg-blue-50 border-blue-200 text-blue-800",
              badge: "bg-blue-200 text-blue-900",
            },
            {
              id: "SEC-AUDIT-API",
              desc: "Audit de sécurité sur les routes et middlewares d'une API REST.",
              color: "bg-orange-50 border-orange-200 text-orange-800",
              badge: "bg-orange-200 text-orange-900",
            },
            {
              id: "SEC-AUDIT-FRONT",
              desc: "Audit de sécurité sur les composants React (XSS, CSRF, exposition de données).",
              color: "bg-orange-50 border-orange-200 text-orange-800",
              badge: "bg-orange-200 text-orange-900",
            },
            {
              id: "TEST-PLAN",
              desc: "Préparation des scénarios de tests (nominaux, edge cases, erreurs).",
              color: "bg-emerald-50 border-emerald-200 text-emerald-800",
              badge: "bg-emerald-200 text-emerald-900",
            },
            {
              id: "TEST-VERIF",
              desc: "Exécution des tests et collecte des preuves matérielles (logs, screenshots).",
              color: "bg-emerald-50 border-emerald-200 text-emerald-800",
              badge: "bg-emerald-200 text-emerald-900",
            },
            {
              id: "DOC-API-SPEC",
              desc: "Rédaction de la spécification OpenAPI / Swagger d'un endpoint.",
              color: "bg-purple-50 border-purple-200 text-purple-800",
              badge: "bg-purple-200 text-purple-900",
            },
            {
              id: "DOC-GUIDE-INSTALL",
              desc: "Rédaction du guide d'installation et de démarrage du projet.",
              color: "bg-purple-50 border-purple-200 text-purple-800",
              badge: "bg-purple-200 text-purple-900",
            },
          ].map((g) => (
            <div key={g.id} className={`border rounded-2xl p-4 ${g.color}`}>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold font-mono mb-2 ${g.badge}`}>
                {g.id}
              </span>
              <p className="text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6 : VERSIONNAGE ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900">🔄 Versionner ses gabarits</h2>
        <p className="text-slate-600 text-sm">
          Un gabarit évolue avec l'expérience. Le versionnage sémantique s'applique naturellement :
        </p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {[
            { version: "v1.0", label: "Version initiale", desc: "Première rédaction, testée sur une mission réelle.", color: "border-slate-300 bg-slate-50" },
            { version: "v1.1", label: "Correctif mineur", desc: "Ajout d'un champ oublié, reformulation d'une restriction ambiguë.", color: "border-blue-300 bg-blue-50" },
            { version: "v2.0", label: "Révision majeure", desc: "Restructuration complète après retour d'expérience — incompatible avec v1.x.", color: "border-purple-300 bg-purple-50" },
          ].map((v) => (
            <div key={v.version} className={`border rounded-2xl p-4 ${v.color}`}>
              <span className="font-mono text-lg font-extrabold text-slate-700">{v.version}</span>
              <p className="font-semibold text-slate-800 mt-0.5">{v.label}</p>
              <p className="text-sm text-slate-600 mt-1">{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-sm text-indigo-800">
          <p className="font-bold mb-1">📌 Bonne pratique</p>
          <p>
            Conservez toujours l'ancienne version dans votre dépôt Git avant de publier une v2.0. Les missions en cours
            qui s'appuient sur v1.x ne doivent pas être cassées par une mise à jour. Taguez vos commits :{" "}
            <code className="bg-indigo-100 px-1 rounded">gabarit/DEV-ANALYSE@v2.0</code>.
          </p>
        </div>
      </section>

      {/* ── SECTION 7 : QUICKQUIZ ── */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900">🧠 QuickQuiz — Testez vos acquis</h2>
        <QuickQuiz />
      </section>
    </article>
  );
}
