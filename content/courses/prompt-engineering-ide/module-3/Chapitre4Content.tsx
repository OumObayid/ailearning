'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — La Décomposition de Prompts (Prompt Decomposition)
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Diviser pour mieux régner : comment découper une grosse demande en petites sous-tâches digestes pour éviter les hallucinations et le code tronqué.
        </p>
      </div>

      {/* 1. Pourquoi le Mega-Prompt échoue toujours ? */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Le piège du « Méga-Prompt » monolithique
        </h2>

        <p className="text-base sm:text-lg text-slate-800 font-medium">
          L&apos;erreur numéro un de tout développeur débutant avec l&apos;IA est de copier-coller un cahier des charges de 3 pages dans le chat en disant : <em>« Crée-moi toute l&apos;application avec l&apos;authentification, la base de données, l&apos;UI et les tests. »</em>
        </p>

        {/* Analogie de la maison */}
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-black text-sm uppercase">
            <span>⚠️ Ce qui se passe quand on demande tout d&apos;un coup</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Personne ne demande à un maçon : <em>« Construis toute la maison en 1 heure »</em>. On pose d&apos;abord les fondations, puis les murs, puis la toiture, et enfin l&apos;électricité.<br />
            Face à une demande gigantesque, l&apos;IA s&apos;essouffle, atteint sa limite de tokens de sortie, coupe le code en plein milieu avec un commentaire frustrant (<code>// ... le reste du code ici</code>) et oublie 50% de vos consignes.
          </p>
        </div>

        {/* Le Principe de la Décomposition */}
        <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 space-y-2">
          <h3 className="font-extrabold text-indigo-950 text-base">
            🎯 La Règle d&apos;or : 1 Prompt = 1 Responsabilité unique
          </h3>
          <p className="text-sm text-slate-700">
            La <strong>Décomposition de Prompts</strong> consiste à scinder un grand objectif en une suite de <strong>missions atomiques</strong>. Chaque invite produit un composant, une fonction ou un test validé avant de passer au suivant.
          </p>
        </div>
      </section>

      {/* 2. Les 3 Schémas de Décomposition */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Les 3 manières de découper le travail
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">1. Découpage Séquentiel</span>
            <p className="text-sm font-bold text-slate-950">En chaîne (A ➔ B ➔ C)</p>
            <p className="text-xs text-slate-600">
              L&apos;étape 2 a absolument besoin du résultat de l&apos;étape 1. Ex : Définir le type TypeScript ➔ Coder la fonction ➔ Écrire le test unitaire.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-purple-700">2. Découpage Parallèle</span>
            <p className="text-sm font-bold text-slate-950">En parallèle (Indépendants)</p>
            <p className="text-xs text-slate-600">
              Des modules qui n&apos;ont pas de lien direct. Ex : Créer l&apos;icône SVG du bouton d&apos;un côté, et créer la table SQL de l&apos;autre.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700">3. Découpage Conditionnel</span>
            <p className="text-sm font-bold text-slate-950">À aiguillage (Si / Alors)</p>
            <p className="text-xs text-slate-600">
              La suite dépend de l&apos;audit initial. Ex : Si le code a une faille critique ➔ générer un patch immédiat. Sinon ➔ optimiser la vitesse.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Cas Pratique d'IDE : Construire le « Dark Mode » pas-à-pas */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Cas d&apos;école : Implémenter le « Mode Sombre » en 3 étapes
        </h2>

        <p className="text-base text-slate-800 font-medium">
          Voyons comment transformer une demande globale en une séquence parfaite de 3 prompts courts et précis dans votre IDE :
        </p>

        <div className="space-y-4">
          {/* Étape 1 */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded bg-indigo-100 text-indigo-800">
                ÉTAPE 1 : La logique & persistance (Hook React)
              </span>
              <span className="text-xs font-semibold text-slate-500">Fichier : hooks/useTheme.ts</span>
            </div>
            <div className="font-mono text-xs bg-slate-900 text-slate-100 p-3.5 rounded-xl shadow-inner space-y-1.5 leading-relaxed break-words">
              <div className="text-indigo-400 font-bold uppercase text-[11px]">PROMPT 1 :</div>
              <div className="text-slate-200">
                &quot;Écris un hook personnalisé React &apos;useTheme&apos; en TypeScript.
              </div>
              <ul className="text-slate-300 list-disc list-inside space-y-0.5 text-xs pl-1">
                <li>Il doit gérer un état &apos;theme&apos; (&apos;light&apos; ou &apos;dark&apos;).</li>
                <li>Il doit sauvegarder le choix dans localStorage et lire la préférence système de l&apos;OS.</li>
                <li>Fournis uniquement le code de useTheme.ts sans composant d&apos;interface.&quot;</li>
              </ul>
            </div>
            <p className="text-xs text-emerald-700 font-bold">
              ✓ Résultat : Un hook propre de 30 lignes, 100% testable, sans aucune distraction graphique.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded bg-purple-100 text-purple-800">
                ÉTAPE 2 : Le bouton visuel (Composant UI)
              </span>
              <span className="text-xs font-semibold text-slate-500">Fichier : components/ThemeToggle.tsx</span>
            </div>
            <div className="font-mono text-xs bg-slate-900 text-slate-100 p-3.5 rounded-xl shadow-inner space-y-1.5 leading-relaxed break-words">
              <div className="text-purple-400 font-bold uppercase text-[11px]">PROMPT 2 :</div>
              <div className="text-slate-200">
                &quot;Voici mon hook &apos;useTheme&apos; créé à l&apos;étape 1 : [useTheme.ts]. Crée le composant &apos;ThemeToggle.tsx&apos; :
              </div>
              <ul className="text-slate-300 list-disc list-inside space-y-0.5 text-xs pl-1">
                <li>Utilise Tailwind CSS pour styliser un bouton élégant.</li>
                <li>Affiche une icône Soleil en mode sombre et Lune en mode clair.</li>
                <li>Appelle la fonction de bascule du hook au clic.&quot;</li>
              </ul>
            </div>
            <p className="text-xs text-emerald-700 font-bold">
              ✓ Résultat : L&apos;IA intègre parfaitement le hook existant sans rien réinventer.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                ÉTAPE 3 : Le test automatisé
              </span>
              <span className="text-xs font-semibold text-slate-500">Fichier : __tests__/ThemeToggle.test.tsx</span>
            </div>
            <div className="font-mono text-xs bg-slate-900 text-slate-100 p-3.5 rounded-xl shadow-inner space-y-1.5 leading-relaxed break-words">
              <div className="text-emerald-400 font-bold uppercase text-[11px]">PROMPT 3 :</div>
              <div className="text-slate-200">
                &quot;Écris un test unitaire avec Vitest et React Testing Library pour tester &apos;ThemeToggle.tsx&apos; :
              </div>
              <ul className="text-slate-300 list-disc list-inside space-y-0.5 text-xs pl-1">
                <li>Vérifie que le clic sur le bouton inverse bien l&apos;icône et appelle le localStorage.&quot;</li>
              </ul>
            </div>
            <p className="text-xs text-emerald-700 font-bold">
              ✓ Résultat : Votre fonctionnalité est finie, modulaire et vérifiée !
            </p>
          </div>
        </div>
      </section>

      {/* 4. Le lien avec la commande /plan d'Antigravity */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. L&apos;Orchestrateur le fait pour vous : La commande `/plan`
        </h2>

        <p className="text-base text-slate-800 font-medium">
          Dans un IDE agentique comme Antigravity, vous n&apos;avez même pas besoin d&apos;imaginer le découpage tout seul au départ :
        </p>

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 space-y-3">
          <p className="text-sm text-slate-800 leading-relaxed">
            Tapez simplement <strong><code>/plan</code></strong> suivi de votre idée générale dans le chat de l&apos;IDE :
          </p>
          <div className="bg-white p-3 rounded-xl border border-indigo-200 font-mono text-xs text-slate-900 break-all">
            /plan Implémente le système de panier d&apos;achat e-commerce avec calcul des taxes et réduction promo
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            L&apos;agent orchestrateur va automatiquement générer un <strong>artéfact de plan</strong> décomposant l&apos;opération en 4 ou 5 étapes ordonnées avec des cases à cocher. Vous validez le plan, puis il exécute chaque sous-tâche une à une avec votre supervision.
          </p>
        </div>

        <Callout type="tip" title="Règle d'or pour débutant">
          Si une réponse de l&apos;IA dépasse 80 lignes de code ou touche à plus de 2 fichiers à la fois, arrêtez-la et décomposez ! Vous garderez 100% du contrôle sur votre code.
        </Callout>
      </section>

      {/* 5. Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur la Décomposition"
          items={[
            "Je comprends pourquoi les méga-prompts mènent au code tronqué et aux oublis.",
            "J'applique la règle d'or : 1 prompt = 1 mission ou 1 fichier clair.",
            "Je sais découper séquentiellement : Logique -> Interface -> Tests.",
            "Je transmets les livrables de l'étape 1 en entrée de l'étape 2.",
            "Je sais utiliser la commande /plan dans Antigravity pour laisser l'orchestrateur proposer un découpage initial."
          ]}
        />
      </section>

      {/* 6. Quiz de Validation */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          Validation des connaissances — Quiz Express
        </h2>

        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Le piège du code tronqué"
            question="L'IA génère du code puis s'arrête brutalement en écrivant '// ... reste de la logique ici'. Quelle est la cause principale ?"
            options={[
              "Le modèle est en panne de serveur",
              "La demande était trop vaste et a dépassé la limite de tokens de sortie du modèle",
              "Le langage TypeScript est interdit par l'API"
            ]}
            correctIndex={1}
            explanation="Exactement ! Chaque modèle a un quota maximum de tokens par réponse. Décomposer en petites sous-tâches garantit que chaque fichier est généré en intégralité sans coupure."
          />

          <QuickQuiz
            title="Question 2 — Stratégie de découpage"
            question="Pour créer une nouvelle fonctionnalité de filtre dans un tableau, quel est le meilleur premier prompt ?"
            options={[
              "Générer toute la page, la base de données, les boutons et le design en un seul message",
              "Écrire la fonction utilitaire pure 'filterItems(list, criteria)' et ses tests avant de toucher à l'affichage",
              "Changer la couleur du tableau"
            ]}
            correctIndex={1}
            explanation="Bravo ! Commencer par la logique pure et les types permet d'avoir un socle solide et testable avant d'y connecter les boutons graphiques."
          />
        </div>
      </section>
    </div>
  );
};
