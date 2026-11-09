'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Détecter et neutraliser les hallucinations
        </h1>
      </div>

      {/* 1. Les 7 formes d'hallucinations dans le code */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les 7 formes d&apos;hallucinations techniques dans un IDE
        </h2>
        <p className="text-slate-700">
          Dans le développement logiciel, une hallucination n&apos;est presque jamais un texte absurde ou incohérent. Au contraire, elle est <strong>techniquement très plausible</strong>, ce qui la rend d&apos;autant plus insidieuse :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">1. Fichier inventé</span>
            <p className="text-slate-600">L&apos;agent affirme que la logique se trouve dans <code>authMiddleware.js</code> sans avoir vérifié son existence sur le disque.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">2. Fonction inventée</span>
            <p className="text-slate-600">Il prétend que la fonction <code>validateSessionToken()</code> est disponible dans le module importé.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">3. Technologie supposée</span>
            <p className="text-slate-600">Il affirme que le projet utilise JWT ou bcrypt alors qu&apos;aucun extrait de code ne le prouve.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">4. Faux résultat de test</span>
            <p className="text-slate-600">Il annonce : <em>&quot;Tous les tests de sécurité sont validés avec succès&quot;</em> sans avoir exécuté la commande.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">5. Numéro de ligne fictif</span>
            <p className="text-slate-600">Il localise une faille critique &quot;à la ligne 142&quot; d&apos;un fichier dont il n&apos;a lu que 20 lignes.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">6. Action fantôme</span>
            <p className="text-slate-600">Il assure : <em>&quot;J&apos;ai corrigé le composant&quot;</em> alors qu&apos;aucun outil d&apos;édition n&apos;a été exécuté.</p>
          </div>
        </div>
      </section>

      {/* 2. Fait vs Erreur vs Hypothèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Ne pas confondre Fait, Erreur, Hypothèse et Hallucination
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Concept</th>
                <th className="p-3">Définition rigoureuse</th>
                <th className="p-3">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-bold text-emerald-800">Fait confirmé</td>
                <td className="p-3">Information prouvée matériellement par une source fournie</td>
                <td className="p-3 font-mono text-xs">Le fichier contient const port = 3000</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-800">Hypothèse explicite</td>
                <td className="p-3">Déduction logique identifiée comme restant à vérifier</td>
                <td className="p-3 font-mono text-xs">Le serveur écoute probablement sur le port par défaut</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-800">Information inconnue</td>
                <td className="p-3">Donnée non fournie et reconnue comme telle</td>
                <td className="p-3 font-mono text-xs">Le code de la base de données n&apos;est pas accessible</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-800">Hallucination</td>
                <td className="p-3">Supposition présentée avec l&apos;autorité d&apos;un fait avéré</td>
                <td className="p-3 font-mono text-xs">Le serveur utilise MySQL (sans aucune preuve)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. La hiérarchie des preuves */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La hiérarchie des preuves à 6 niveaux
        </h2>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-emerald-950">NIVEAU 1 — Preuve matérielle directe</span>
            <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">Code source fourni / lu</span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-emerald-950">NIVEAU 2 — Retour d&apos;outil d&apos;exécution</span>
            <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">Sortie de commande terminal</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-blue-950">NIVEAU 3 — Documentation officielle du SDK</span>
            <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-bold">Docs Google Gen AI / Next.js</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-amber-950">NIVEAU 4 — Connaissances paramétriques générales</span>
            <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">Mémoire d&apos;entraînement du LLM</span>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-rose-950">NIVEAU 5 &amp; 6 — Pure supposition sans trace</span>
            <span className="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded font-bold text-rose-900">REJET OBLIGATOIRE</span>
          </div>
        </div>
      </section>

      {/* 4. Bloc anti-hallucination pour Prompt */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Directive système anti-hallucination
        </h2>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-2">
          <div className="text-rose-400 font-bold border-b border-slate-800 pb-1">
            # DIRECTIVE DE FIABILITÉ FACTUELLE ET PRÉVENTION DES HALLUCINATIONS
          </div>
          <p className="text-slate-300">
            &lt;factual_grounding_policy&gt;
          </p>
          <p className="pl-4 text-emerald-400">
            1. OBLIGATION DE PREUVE : Pour chaque affirmation technique, indique le composant et la ligne exacte du code fourni qui la justifie.
          </p>
          <p className="pl-4 text-emerald-400">
            2. INTERDICTION D&apos;INVENTION : N&apos;invente jamais l&apos;existence d&apos;une technologie, bibliothèque, route API ou fonction qui ne figure pas expressément dans les éléments fournis.
          </p>
          <p className="pl-4 text-emerald-400">
            3. DÉCLARATION D&apos;INCONNUE : Si une information manque pour conclure, dis clairement : &quot;Je ne dispose pas des éléments permettant de vérifier ce point.&quot;
          </p>
          <p className="pl-4 text-emerald-400">
            4. VÉRACITÉ DES TESTS : Ne prétends JAMAIS qu&apos;un test a réussi si tu n&apos;as pas exécuté formellement l&apos;outil de test durant le présent échange.
          </p>
          <p className="text-slate-300">
            &lt;/factual_grounding_policy&gt;
          </p>
        </div>

        <Callout type="success" title="Principe d'honnêteté intellectuelle de l'agent">
          Un agent fiable n&apos;est pas celui qui a réponse à tout : c&apos;est celui qui sait <strong>distinguer ce qu&apos;il peut prouver matériellement de ce qu&apos;il ne peut pas vérifier</strong>.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Détection des hallucinations
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si un agent analyse un fichier Express de 10 lignes sans mention de base de données et écrit 'Le serveur utilise MySQL', comment qualifier cette affirmation ?",
              options: [
                "Une optimisation d'anticipation",
                "Une hallucination technique (supposition non fondée présentée comme un fait)",
                "Une déduction mathématique",
                "Une directive système normale"
              ],
              correctIndex: 1,
              explanation: "Faute de preuve matérielle dans le code fourni, affirmer que le projet utilise MySQL relève de l'invention pure."
            },
            {
              id: 2,
              question: "Quelle est la source de preuve la plus solide (Niveau 1) pour justifier qu'une route API existe ?",
              options: [
                "L'intuition de l'agent basée sur son modèle de langage",
                "La présence vérifiée du code de la route dans le fichier fourni ou inspecté",
                "Un forum en ligne mentionnant que cette route est courante",
                "Le nom du dossier du projet"
              ],
              correctIndex: 1,
              explanation: "Seule la présence directe du code dans la ressource fournie constitue une preuve matérielle de premier niveau."
            }
          ]}
        />
      </section>
    </div>
  );
};

