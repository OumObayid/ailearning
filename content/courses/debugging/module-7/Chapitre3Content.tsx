'use client';

import React from 'react';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Construire un prompt professionnel de diagnostic
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 3 — 7.3. Construire un prompt professionnel de diagnostic
      </p>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        À la fin de ce chapitre, vous serez capable de :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Construire un prompt structuré pour diagnostiquer un bug.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Fournir les informations techniques pertinentes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Définir précisément le rôle et la mission de l&apos;IA.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Demander une analyse sans autoriser de modification du code.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Obtenir un rapport de diagnostic exploitable.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi construire un prompt professionnel ?
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un modèle IA ne peut pas identifier correctement un problème s&apos;il reçoit une demande imprécise.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comparez ces deux prompts :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Prompt imprécis :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Mon API ne fonctionne pas. Trouve le problème.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Prompt professionnel :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Tu es un ingénieur backend spécialisé en Node.js,
Express et TypeScript.

Mon API GET /users/:id retourne une erreur HTTP 500
lorsqu'un utilisateur existe.

Analyse le code de la route et du service associé.

Identifie :
1. Le symptôme.
2. Les causes possibles.
3. La cause racine probable.
4. Les preuves techniques.
5. Les vérifications nécessaires.

Ne modifie aucun fichier.
Ne propose pas de correction avant d'avoir terminé
le diagnostic.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le deuxième prompt fournit une mission, un contexte, des données et des contraintes.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 7 composants d&apos;un prompt professionnel
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un prompt de diagnostic efficace peut être construit avec sept composants.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. ROLE
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Rôle
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Définir l&apos;expertise attendue de l&apos;IA.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : ingénieur backend spécialisé en Node.js et Express.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. OBJECTIVE
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Objectif
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Définir le résultat recherché.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : identifier la cause racine d&apos;une erreur HTTP 500.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. CONTEXT
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Contexte
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Présenter l&apos;environnement technique.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : Node.js, Express, TypeScript, MySQL.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. DATA**
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Données
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Transmettre les éléments nécessaires à l&apos;analyse.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : logs, Stack Trace, code source et requête HTTP.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. TASKS
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Tâches
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Décomposer le travail demandé.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : examiner la route, suivre l&apos;appel du service et identifier l&apos;incohérence.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. CONSTRAINTS
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Contraintes
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Définir les limites et les interdictions.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : ne modifier aucun fichier et ne pas ajouter de dépendances.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. OUTPUT FORMAT
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Format de sortie
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Préciser la présentation attendue.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple : rapport avec symptôme, causes possibles, preuves et conclusion.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Exemple complet d&apos;un prompt professionnel
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Situation : une route Express retourne une erreur lorsqu&apos;un utilisateur consulte son profil.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Code concerné :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`router.get("/users/:id", async (req, res) =&gt; {
const user = await userService.findById(req.params.userId);

if (!user) {
return res.status(404).json({
message: "User not found"
});
}

return res.json(user);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici un prompt structuré avec les sept composants :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        MISSION — DIAGNOSTIC D&apos;UNE ERREUR API
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ROLE
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Tu es un ingénieur logiciel spécialisé en Node.js,Express, TypeScript et MySQL.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        OBJECTIVE
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Identifier la cause racine d&apos;une anomalie dans une APIde gestion des utilisateurs.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CONTEXT
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Backend : Node.js</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Framework : Express</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Langage : TypeScript</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Base de données : MySQL</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Architecture : Routes, Controllers et Services.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        DATA
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici le code concerné :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`router.get("/users/:id", async (req, res) =&gt; {
const user = await userService.findById(req.params.userId);

if (!user) {
return res.status(404).json({
message: "User not found"
});
}

return res.json(user);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comportement observé :L&apos;API ne retourne pas les informations attendues.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comportement attendu :L&apos;API doit retourner l&apos;utilisateur correspondant à son identifiant.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TASKS
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Examiner le code.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les incohérences.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Rechercher les causes possibles.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier la cause racine probable.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Présenter les preuves techniques.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CONSTRAINTS
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne modifier aucun fichier.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas ajouter de dépendances.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas inventer de comportement non vérifié.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer les faits des hypothèses.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Signaler les informations manquantes.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        OUTPUT FORMAT
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Présenter un rapport contenant :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Symptôme.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Causes possibles.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Cause racine.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Preuves techniques.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifications complémentaires.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Niveau de confiance et ses justifications.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Comment améliorer la précision du prompt ?
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un prompt professionnel doit éviter les ambiguïtés.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Quelques bonnes pratiques :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">À éviter</th>
              <th className="px-4 py-3">À privilégier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">« Mon code est cassé »</td>
              <td className="px-4 py-2.5 font-medium">Décrire le comportement observé</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">« Trouve une solution »</td>
              <td className="px-4 py-2.5 font-medium">Demander un diagnostic précis</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Transmettre uniquement une ligne</td>
              <td className="px-4 py-2.5 font-medium">Fournir le contexte des fonctions appelées</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">« Corrige tout »</td>
              <td className="px-4 py-2.5 font-medium">Définir le périmètre exact</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Accepter la première hypothèse</td>
              <td className="px-4 py-2.5 font-medium">Demander des preuves techniques</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Conseil : si une information manque, demandez à l&apos;IA de la signaler plutôt que de la laisser inventer une explication.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques — Construire votre propre prompt
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Contexte :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous développez une API Express qui permet de consulter les commandes d&apos;un client.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La route suivante présente une anomalie :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`router.get("/orders/:id", async (req, res) =&gt; {
const order = await orderService.findById(req.params.orderId);

if (!order) {
return res.status(404).json({
message: "Order not found"
});
}

return res.json(order);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;API ne retourne pas correctement la commande demandée.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Votre mission :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Construire un prompt professionnel avec les sept composants :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>ROLE</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>OBJECTIVE</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>CONTEXT</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>DATA</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>TASKS</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>CONSTRAINTS</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>OUTPUT FORMAT</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ne demandez pas à l&apos;IA de corriger le code. Vous devez uniquement obtenir un diagnostic.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Corrigé du TP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un prompt satisfaisant pourrait être :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        DIAGNOSTIC — API DE GESTION DES COMMANDES
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ROLE
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Tu es un ingénieur backend spécialisé en Node.js et Express.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        OBJECTIVE
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Identifier la cause racine du dysfonctionnement dela route GET /orders/.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CONTEXT
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Application Node.js avec Express et TypeScript.Architecture organisée en routes et services.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        DATA
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Code concerné :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`router.get("/orders/:id", async (req, res) =&gt; {
const order = await orderService.findById(req.params.orderId);

if (!order) {
return res.status(404).json({
message: "Order not found"
});
}

return res.json(order);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comportement attendu :Retourner la commande correspondant à l&apos;identifiant demandé.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comportement observé :La route ne retourne pas correctement la commande.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TASKS
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Examiner la déclaration de la route.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier les paramètres utilisés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les incohérences.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déterminer la cause racine probable.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Présenter les preuves.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CONSTRAINTS
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne modifier aucun fichier.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas ajouter de dépendances.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas proposer de correction non justifiée.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer les faits des hypothèses.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        OUTPUT FORMAT
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Présenter le symptôme, les causes possibles,la cause racine, les preuves et les vérifications nécessaires.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat du diagnostic :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`La route déclare le paramètre :id, mais le service utilise req.params.orderId.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La propriété attendue est donc :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`req.params.id`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La cause racine est une incohérence entre le nom du paramètre de route et son utilisation dans le code.
      </p>
      </section>

    </div>
  );
};
