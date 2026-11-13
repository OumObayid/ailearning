'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 7</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Déboguer un prompt avec méthode
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          La méthode scientifique pour isoler une consigne défaillante, tester une variable à la fois et tenir un registre d&apos;évolution (Prompt Changelog).
        </p>
      </div>

      {/* 1. L'analogie de l'horloger et la différence bricolage vs ingénierie */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="wrench-screwdriver" className="w-5 h-5 text-indigo-600" />
          <span>1. Bricolage empirique vs Débogage d&apos;ingénieur</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Face à un agent qui répond à côté de la plaque, le réflexe du débutant est de s&apos;agacer, d&apos;ajouter trois points d&apos;exclamation et d&apos;écrire : <em>« FAIS CE QUE JE TE DIS !!! NE TOUCHE PAS AUX FICHIERS !!! »</em>. Cette approche chaotique aggrave généralement le problème.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de l&apos;horloger de précision :</span>
          </div>
          <p>
            Quand une montre suisse mécanique prend deux secondes de retard par jour, l&apos;horloger ne lui donne pas des coups de marteau et ne remplace pas les 50 engrenages d&apos;un coup ! Il met sa loupe, isole le ressort de balancier, tourne une micro-vis d&apos;un quart de millimètre, et observe le tic-tac sur son banc de mesure.
          </p>
          <p>
            Le débogage de prompt est un travail d&apos;horlogerie : <strong>une instruction = un engrenage</strong>. Pour trouver la faille, on isole l&apos;engrenage fautif et on ne modifie qu&apos;un seul paramètre à la fois.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-3">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200 text-rose-900">Bricolage au hasard (Amateur)</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-900">Débogage méthodique (Ingénieur)</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 text-rose-700">Modifier trois phrases au hasard dans le prompt</td>
                <td className="p-3.5 text-emerald-800 font-semibold">Identifier le mot exact qui a déclenché le comportement déviant</td>
              </tr>
              <tr>
                <td className="p-3.5 text-rose-700">Rajouter des interdictions en MAJUSCULES sous le coup de la colère</td>
                <td className="p-3.5 text-emerald-800 font-semibold">Comprendre pourquoi la consigne initiale manquait de clarté technique</td>
              </tr>
              <tr>
                <td className="p-3.5 text-rose-700">Réécrire les 50 lignes du prompt d&apos;un coup</td>
                <td className="p-3.5 text-emerald-800 font-semibold">Tester une seule variation à la fois sur un cas d&apos;essai stable</td>
              </tr>
              <tr>
                <td className="p-3.5 text-rose-700">Espérer que ça marche par chance sans mesurer</td>
                <td className="p-3.5 text-emerald-800 font-semibold">Comparer scientifiquement les sorties avant/après et consigner le changelog</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-slate-950 text-sm">Gestion des modifications</div>
            <div className="text-rose-700"><strong>Amateur :</strong> Change 3 phrases d&apos;un coup au pif.</div>
            <div className="text-emerald-700 font-semibold"><strong>Ingénieur :</strong> Isole et modifie une seule consigne à la fois.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-slate-950 text-sm">Approche des erreurs</div>
            <div className="text-rose-700"><strong>Amateur :</strong> Écrit en majuscules avec des &quot;!!!&quot;.</div>
            <div className="text-emerald-700 font-semibold"><strong>Ingénieur :</strong> Remplace les mots flous par des critères mesurables.</div>
          </div>
        </div>
      </section>

      {/* 2. Les 5 composantes fondamentales à inspecter */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="cube" className="w-5 h-5 text-indigo-600" />
          <span>2. Les 5 composantes fondamentales à ausculter</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Quand un prompt échoue, l&apos;erreur se cache systématiquement dans l&apos;une de ces cinq composantes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded">Composante 1</span>
            <h4 className="font-bold text-slate-950">Le Rôle (Persona)</h4>
            <p className="text-slate-600">
              Est-il en phase avec le comportement attendu ? Dire <em>&quot;Tu es un développeur senior&quot;</em> incite l&apos;agent à coder immédiatement. Pour une phase d&apos;inspection, préférez <em>&quot;Tu es un auditeur en lecture seule stricte&quot;</em>.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded">Composante 2</span>
            <h4 className="font-bold text-slate-950">La Mission (Objectif)</h4>
            <p className="text-slate-600">
              Le verbe d&apos;action est-il univoque ? Bannissez <em>&quot;Améliore le code&quot;</em> au profit de <em>&quot;Rédige la liste des failles détectées dans la fenêtre de discussion sans toucher aux fichiers&quot;</em>.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded">Composante 3</span>
            <h4 className="font-bold text-slate-950">Le Contexte fourni</h4>
            <p className="text-slate-600">
              L&apos;agent a-t-il les éléments indispensables sous la main ? Si vous lui demandez de filtrer des utilisateurs sans lui donner la structure de la table, il est contraint d&apos;inventer des colonnes fictives.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded">Composante 4</span>
            <h4 className="font-bold text-slate-950">Les Contraintes et Limites</h4>
            <p className="text-slate-600">
              Les règles sont-elles ordonnées ? L&apos;interdiction de modifier des fichiers prime-t-elle formellement sur la consigne de résolution des erreurs ?
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs sm:text-sm">
          <span className="font-bold text-indigo-700 text-xs font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded">Composante 5</span>
          <h4 className="font-bold text-slate-950">Le Format de sortie exigé</h4>
          <p className="text-slate-600">
            Avez-vous imposé un canevas strict ? Si vous n&apos;exigez pas de sections prédéfinies (ex: Constat, Ligne, Recommandation), l&apos;agent noiera son analyse dans un paragraphe narratif difficile à exploiter.
          </p>
        </div>
      </section>

      {/* 3. Le tableau de suivi des versions d'un agent (Prompt Changelog) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="clipboard-document-list" className="w-5 h-5 text-indigo-600" />
          <span>3. Le registre de versions d&apos;un agent (Prompt Changelog)</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Tout comme vous versionnez votre code avec Git, vous devez tracer l&apos;évolution de vos instructions d&apos;agents pour comprendre vos gains et vos régressions :
        </p>

        {/* Desktop Changelog Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border-b border-slate-200">Version</th>
                <th className="p-3 border-b border-slate-200">Problème observé</th>
                <th className="p-3 border-b border-slate-200">Modification appliquée (Hypothèse)</th>
                <th className="p-3 border-b border-slate-200 text-emerald-900">Résultat mesuré</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">v1.0</td>
                <td className="p-3 text-rose-700">L&apos;agent modifie Projects.jsx sans accord</td>
                <td className="p-3">Remplacement de &quot;Améliore&quot; par &quot;Analyse en lecture seule&quot;</td>
                <td className="p-3 text-emerald-700 font-semibold">Plus aucune écriture sauvage sur disque ✓</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">v1.1</td>
                <td className="p-3 text-rose-700">L&apos;agent invente une fonction inexistante</td>
                <td className="p-3">Ajout de la règle : &quot;Si une fonction est introuvable, signale son absence&quot;</td>
                <td className="p-3 text-emerald-700 font-semibold">Élimination des hallucinations à 100% ✓</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-900">v1.2</td>
                <td className="p-3 text-rose-700">Rapport trop long et bavard</td>
                <td className="p-3">Imposition d&apos;une grille de sortie en 4 points (Fichier, Ligne, Risque, Remède)</td>
                <td className="p-3 text-emerald-700 font-semibold">Temps de lecture divisé par 3 ✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Changelog Cards */}
        <div className="sm:hidden space-y-3">
          {[
            { v: "v1.0", pb: "Écriture sauvage sur Projects.jsx", mod: "Remplacer 'Améliore' par 'Lecture seule'", res: "Zéro écriture sur disque ✓" },
            { v: "v1.1", pb: "Invention de fonctions fictives", mod: "Interdiction d'inventer si absent", res: "Hallucinations éliminées ✓" },
            { v: "v1.2", pb: "Rapport touffu et verbeux", mod: "Imposer un canevas en 4 points", res: "Lecture 3x plus rapide ✓" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-indigo-700 text-sm">{item.v}</span>
                <span className="text-emerald-700 font-bold">{item.res}</span>
              </div>
              <div className="text-rose-700"><strong>Bug :</strong> {item.pb}</div>
              <div className="text-slate-700"><strong>Ajustement :</strong> {item.mod}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Débogage méthodique de prompt
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 2"
          questions={[
            {
              id: 1,
              question: "Quelle est la règle d'or lors du débogage méthodique d'un prompt pour identifier la cause d'une anomalie ?",
              options: [
                "Ne modifier qu'une seule instruction ou variable à la fois pour mesurer précisément son impact sur le résultat.",
                "Changer le rôle, les contraintes et le modèle en même temps.",
                "Supprimer tout le prompt et recommencer à zéro à chaque bogue.",
                "Écrire les phrases en majuscules pour forcer l'obéissance."
              ],
              correctIndex: 0,
              explanation: "Modifier une seule variable à la fois est le fondement de la méthode scientifique : cela permet d'isoler avec certitude la cause et l'effet."
            },
            {
              id: 2,
              question: "Si votre agent invente régulièrement des fonctions ou des variables fictives dans ses analyses, quelle composante devez-vous en premier lieu déboguer ?",
              options: [
                "Le contexte fourni (en lui précisant les signatures réelles du code) et la règle de conduite face au manque (en lui interdisant d'inventer en cas de doute).",
                "La couleur du thème de l'IDE.",
                "La taille de l'écran de l'ordinateur.",
                "Le débit de la connexion Wi-Fi."
              ],
              correctIndex: 0,
              explanation: "Les hallucinations naissent du vide d'information : en comblant le contexte et en interdisant formellement l'invention, l'agent se cantonne aux faits réels."
            },
            {
              id: 3,
              question: "À quoi sert un 'Prompt Changelog' dans un projet d'ingénierie d'agents ?",
              options: [
                "À documenter l'historique des versions du prompt (problème constaté, hypothèse, modification testée et résultat mesuré) pour éviter les régressions.",
                "À payer moins cher les requêtes de l'API.",
                "À effacer automatiquement les sauvegardes de Git.",
                "C'est un fichier de configuration pour Windows 11."
              ],
              correctIndex: 0,
              explanation: "Le Changelog de prompt permet de suivre rigoureusement l'évolution des instructions et de capitaliser sur les réglages réussis au fil du projet."
            }
          ]}
        />
      </section>
    </div>
  );
};
