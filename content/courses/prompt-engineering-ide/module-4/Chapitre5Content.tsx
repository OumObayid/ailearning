'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Utilisation des outils (Tools &amp; Function Calling)
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Comment l&apos;agent passe-t-il de la réflexion à l&apos;action ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un modèle d&apos;intelligence artificielle (LLM) est fondamentalement un système de prédiction textuelle. Il ne dispose d&apos;aucune main physique ni d&apos;aucun pointeur matériel sur le disque dur. Pour qu&apos;il puisse inspecter un composant ou lancer un build de production, l&apos;environnement hôte doit lui fournir des <strong>Tools (outils)</strong>.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Les outils constituent la passerelle technique entre l&apos;esprit du modèle et le système d&apos;exploitation.
        </p>
      </section>

      {/* 2. Les catégories d'outils */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 6 grandes familles d&apos;outils dans un IDE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="book-open" className="w-4 h-4" />
              <span>1. Lecture de fichiers</span>
            </div>
            <p className="text-xs text-slate-700">Consulter <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">package.json</code>, composants et CSS sans altération.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="magnifying-glass" className="w-4 h-4" />
              <span>2. Recherche textuelle</span>
            </div>
            <p className="text-xs text-slate-700">Rechercher des symboles, fonctions, endpoints ou imports dans l&apos;arborescence.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="pencil-square" className="w-4 h-4" />
              <span>3. Édition chirurgicale</span>
            </div>
            <p className="text-xs text-slate-700">Modifier un composant existant via des remplacements ciblés ou créer un fichier neuf.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="command-line" className="w-4 h-4" />
              <span>4. Terminal &amp; Shell</span>
            </div>
            <p className="text-xs text-slate-700">Exécuter <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">npm run build</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">npm run lint</code> ou lancer des scripts Node.js.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="globe-alt" className="w-4 h-4" />
              <span>5. Navigateur (Browser)</span>
            </div>
            <p className="text-xs text-slate-700">Vérifier le rendu d&apos;un écran ou d&apos;une page web dans un navigateur headless.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-indigo-700 text-sm">
              <Icon name="shield-check" className="w-4 h-4" />
              <span>6. Tests &amp; Validation</span>
            </div>
            <p className="text-xs text-slate-700">Lancer Vitest, Jest ou des tests E2E pour valider les modifications apportées.</p>
          </div>
        </div>
      </section>

      {/* 3. Qu'est-ce que le Tool Calling ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Mécanisme du Tool Calling (Function Calling)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le <strong>Tool Calling</strong> est le protocole standardisé par lequel le modèle exprime sa volonté d&apos;exécuter une fonction sous la forme d&apos;un objet JSON structuré contenant le nom de l&apos;outil et ses paramètres :
        </p>

        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`// 1. Description de l'outil exposée au modèle par l'IDE
const tools = [
  {
    type: "function",
    name: "rechercher_produit",
    description: "Recherche un produit par son nom ou sa référence",
    parameters: {
      type: "object",
      properties: {
        nom: { type: "string", description: "Nom du produit recherché" }
      },
      required: ["nom"]
    }
  }
];

// 2. Réponse du modèle (Tool Call émis)
{
  "tool_calls": [
    {
      "name": "rechercher_produit",
      "args": { "nom": "Clavier sans fil" }
    }
  ]
}

// 3. L'environnement exécute la fonction réelle et renvoie le résultat au modèle
// 4. Le modèle interprète la réponse et formule sa conclusion à l'utilisateur`}</pre>
        </div>
      </section>

      {/* 4. Protocole MCP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Outils externes et protocole MCP (Model Context Protocol)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Tous les outils ne sont pas codés en dur dans l&apos;IDE. Grâce au standard <strong>MCP (Model Context Protocol)</strong>, un agent peut se connecter dynamiquement à des serveurs tiers pour interagir avec des bases de données SQL, des dépôts GitHub ou des documentations externes :
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl text-sm font-medium">
          <div className="p-3 bg-white rounded-xl border border-indigo-200 text-center w-full md:w-1/3">
            <span className="font-bold text-slate-900 block">Agent Antigravity</span>
            <span className="text-xs text-slate-600">Client MCP</span>
          </div>
          <span className="text-indigo-600 font-black text-xl">↔ [Protocole MCP] ↔</span>
          <div className="p-3 bg-white rounded-xl border border-indigo-200 text-center w-full md:w-1/3">
            <span className="font-bold text-indigo-700 block">Serveurs MCP Spécialisés</span>
            <span className="text-xs text-slate-600">GitHub, PostgreSQL, Jira, Figma</span>
          </div>
        </div>

        <Callout type="warning">
          <strong>Vigilance sur les outils externes :</strong> Chaque outil tiers élargit la surface d&apos;attaque. Un agent ne doit jamais disposer d&apos;outils avec accès en écriture sur des bases de données de production sans validation humaine systématique.
        </Callout>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.5)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 1</span>
            <h4 className="font-bold text-slate-950">Cartographie des outils</h4>
            <p className="text-xs text-slate-700">Demandez à Antigravity de lister ses catégories d&apos;outils actives et d&apos;expliquer les risques associés à chacune.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 2</span>
            <h4 className="font-bold text-slate-950">Séparation lecture/écriture</h4>
            <p className="text-xs text-slate-700">Demandez comment l&apos;agent procéderait pour modifier un titre sans autoriser l&apos;outil d&apos;édition.</p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Utilisation des outils
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 5"
          questions={[
            {
              id: 1,
              question: "Que signifie le terme 'Tool Calling' dans le contexte d'un agent IA ?",
              options: [
                "L'agent téléphone à un support technique.",
                "Le mécanisme par lequel le modèle IA demande l'exécution d'une fonction externe avec des paramètres structurés.",
                "La suppression des outils inutilisés dans l'IDE.",
                "L'installation d'une nouvelle version de Node.js."
              ],
              correctIndex: 1,
              explanation: "Le Tool Calling permet au modèle d'émettre une intention structurée (nom de la fonction + arguments) que l'environnement hôte exécute concrètement."
            },
            {
              id: 2,
              question: "À quoi sert principalement le protocole standardisé MCP (Model Context Protocol) ?",
              options: [
                "À remplacer le langage JavaScript par du Python.",
                "À connecter de manière standardisée des agents IA à des outils et sources de données externes (GitHub, bases de données, APIs).",
                "À désactiver la sécurité du système d'exploitation.",
                "À crypter les fichiers de code source."
              ],
              correctIndex: 1,
              explanation: "MCP est le standard universel de communication permettant aux agents d'interagir avec une multitude d'outils et de services externes de façon unifiée."
            }
          ]}
        />
      </section>
    </div>
  );
};

