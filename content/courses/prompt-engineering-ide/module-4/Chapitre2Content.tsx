'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Architecture générale d&apos;un agent IA
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Comment un agent IA fonctionne-t-il en coulisses ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Lorsqu&apos;on demande à Google Antigravity : <em>« Analyse mon application React, trouve les erreurs et propose des corrections sans modifier les fichiers »</em>, le système ne se contente pas d&apos;envoyer une phrase à un modèle de langage.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Il met en branle une <strong>architecture complète de composants spécialisés</strong> qui travaillent de concert pour comprendre la demande, inspecter les ressources pertinentes, orchestrer les étapes et valider les résultats.
        </p>
      </section>

      {/* 2. Les 7 composants fondamentaux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 7 composants interconnectés d&apos;un agent IA
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-sm">A</div>
            <div>
              <h4 className="font-extrabold text-slate-950 text-base">Instructions Système (System Instructions)</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                Le socle comportemental permanent. Elles fixent le rôle de l&apos;agent (développeur, auditeur, testeur), ses règles déontologiques, son périmètre et la stricte interdiction de modifier certains fichiers sans accord préalable.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-sm">B</div>
            <div>
              <h4 className="font-extrabold text-slate-950 text-base">Modèle d&apos;Intelligence Artificielle (LLM)</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                Le moteur cognitif. Il interprète les requêtes en langage naturel, comprend la logique de programmation et décide de la prochaine étape à franchir. <em>Attention :</em> le modèle réfléchit, mais ne touche pas directement au disque.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-sm">C</div>
            <div>
              <h4 className="font-extrabold text-slate-950 text-base">Contexte Dynamique (Context)</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                L&apos;ensemble des informations disponibles à un instant t : historique de discussion, arborescence du projet, contenu des fichiers ouverts ou inspectés, et sorties des outils récemment appelés.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-sm">D</div>
            <div>
              <h4 className="font-extrabold text-slate-950 text-base">Planificateur (Planner)</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                Le coordinateur tactique. Il décompose un objectif complexe en sous-étapes logiques (ex: analyser package.json → repérer les composants → auditer la sécurité → synthétiser) pour éviter les oublis et les interventions désordonnées.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-sm">E</div>
            <div>
              <h4 className="font-extrabold text-slate-950 text-base">Boîte à Outils (Tools)</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                Les bras armés de l&apos;agent. Fonctions permettant de lire un fichier, lancer une recherche textuelle, éditer du code, exécuter une commande dans le terminal ou interagir avec un navigateur via MCP.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-sm">F</div>
            <div>
              <h4 className="font-extrabold text-slate-950 text-base">Système d&apos;Autorisations (Permissions)</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                Le garde-fou technique. Il intercepte chaque demande d&apos;action de l&apos;agent pour vérifier si l&apos;opération est autorisée directement, bloquée, ou soumise à la confirmation explicite de l&apos;utilisateur.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-sm">G</div>
            <div>
              <h4 className="font-extrabold text-slate-950 text-base">Observation &amp; Validation</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                Le contrôle qualité rétroactif. Après chaque appel d&apos;outil, l&apos;agent examine le retour réel (code d&apos;erreur, tests réussis ou échoués) pour adapter immédiatement la suite de son plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Le cycle en boucle */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La boucle opérationnelle : Comprendre, Planifier, Agir, Observer
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Contrairement à une simple exécution séquentielle, un agent IA fonctionne selon un cycle en boucle itérative :
        </p>

        <div className="p-6 bg-slate-950 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`+-------------------------------------------------------------+
|                     CYCLE DE L'AGENT                        |
+-------------------------------------------------------------+
                              |
                              v
                  [ 1. COMPRENDRE L'OBJECTIF ]
                              |
                              v
                  [ 2. PLANIFIER LES ETAPES ]
                              |
                              v
             +--> [ 3. APPELER UN OUTIL (ACTION) ]
             |                |
             |                v
             |    [ 4. VERIFIER LES AUTORISATIONS ]
             |                |
             |                v
             |    [ 5. OBSERVER LE RESULTAT REEL ]
             |                |
             |                v
             +-- Objectif non atteint / Correction requise ?
                              |
                     Oui, tout est conforme
                              |
                              v
                  [ 6. RESTITUTION A L'UTILISATEUR ]`}</pre>
        </div>

        <Callout type="note">
          <strong>Principe d&apos;adaptation :</strong> Si l&apos;agent tente de lire un fichier et reçoit une erreur <em>« File not found »</em> lors de l&apos;étape d&apos;observation, il ne s&apos;arrête pas bêtement : il révise son plan, lance une recherche de fichier, et reprend son cycle.
        </Callout>
      </section>

      {/* 4. Tableau d'application */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Exemple appliqué : Diagnostic d&apos;une page d&apos;accueil React
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Composant</th>
                <th className="p-3 border border-slate-200">Intervention dans le diagnostic</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold">Instructions</td>
                <td className="p-3 border border-slate-200">Empêche formellement de modifier le moindre fichier sans consigne.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">Modèle IA</td>
                <td className="p-3 border border-slate-200">Identifie qu&apos;une erreur de rendu provient souvent d&apos;un hook ou d&apos;un composant enfant.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">Contexte</td>
                <td className="p-3 border border-slate-200">Intègre le contenu de <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/App.jsx</code> et de <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">package.json</code>.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">Planificateur</td>
                <td className="p-3 border border-slate-200">Établit l&apos;ordre : (1) examiner les imports, (2) vérifier les dépendances, (3) diagnostiquer.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">Outils</td>
                <td className="p-3 border border-slate-200">Appelle l&apos;outil <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">read_file</code> pour inspecter le code source.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">Autorisations</td>
                <td className="p-3 border border-slate-200">Autorise l&apos;accès en lecture mais bloquerait toute commande de modification.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">Observation</td>
                <td className="p-3 border border-slate-200">Constate qu&apos;un import de feuille CSS pointe vers un fichier inexistant.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.2)
        </h2>
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 4.2 — Déconstruction de l&apos;architecture</span>
          <h4 className="font-bold text-slate-950">Faire expliciter son architecture à Antigravity</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dans Google Antigravity, soumettez l&apos;instruction suivante :<br />
            <em>« Explique comment tu organiserais l&apos;analyse d&apos;un projet React. Présente séparément : tes instructions nécessaires, le rôle de ton modèle LLM, les informations de contexte requises, tes étapes de planification, tes outils nécessaires, tes autorisations indispensables et ta méthode de validation. Ne touche à aucun fichier et n&apos;exécute aucune commande. »</em>
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800">
            <strong>Question réflexive :</strong> Pourquoi un modèle d&apos;intelligence artificielle ne peut-il pas modifier directement un fichier sur votre disque sans passer par un outil technique externe ?
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Architecture d&apos;un agent
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 2"
          questions={[
            {
              id: 1,
              question: "Quel composant d'un agent IA est responsable de décomposer un objectif complexe en sous-étapes ordonnées ?",
              options: [
                "Le système de fichiers.",
                "Le planificateur (Planner).",
                "Le terminal de commandes.",
                "Le compilateur JavaScript."
              ],
              correctIndex: 1,
              explanation: "Le planificateur structure la mission en étapes successives pour éviter les oublis et organiser les appels d'outils de façon cohérente."
            },
            {
              id: 2,
              question: "Pourquoi l'observation et la validation sont-elles cruciales après l'exécution d'un outil ?",
              options: [
                "Pour permettre à l'agent de vérifier les conséquences réelles de son action et d'adapter son comportement en cas d'erreur.",
                "Pour fermer automatiquement l'IDE.",
                "Parce que les modèles d'IA ne se souviennent jamais de ce qu'ils viennent d'écrire.",
                "Pour supprimer le code source du projet."
              ],
              correctIndex: 0,
              explanation: "L'observation ferme la boucle de feedback de l'agent en lui fournissant les preuves factuelles (succès ou erreur) indispensables pour décider de la suite."
            }
          ]}
        />
      </section>
    </div>
  );
};

