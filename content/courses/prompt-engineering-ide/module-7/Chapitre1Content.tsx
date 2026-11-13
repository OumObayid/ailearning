'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 7</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Identifier les causes d&apos;un mauvais résultat
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comprendre pourquoi votre agent dévie, disséquer les 7 causes majeures d&apos;échec et appliquer la méthode scientifique de diagnostic en 6 étapes.
        </p>
      </div>

      {/* 1. L'analogie du médecin légiste et l'échec de l'agent */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="magnifying-glass" className="w-5 h-5 text-indigo-600" />
          <span>1. Pourquoi les agents IA échouent-ils ?</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Rédiger un prompt élégant ne garantit absolument pas que votre agent produira le résultat escompté. Même doté du meilleur modèle de langage, un agent peut soudainement :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-slate-800">
          <li>Modifier des fichiers totalement hors du périmètre de sa mission.</li>
          <li>Inventer des bibliothèques inexistantes ou des fonctions fictives (hallucinations).</li>
          <li>Interpréter de travers une consigne qui vous semblait pourtant évidente.</li>
          <li>Oublier des règles strictes fixées au début d&apos;une longue session de chat.</li>
          <li>Affirmer avec assurance qu&apos;un test unitaire est réussi alors qu&apos;il ne l&apos;a jamais exécuté.</li>
        </ul>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du détective face à la scène de crime :</span>
          </div>
          <p>
            Quand un avion ou une machine industrielle tombe en panne, les enquêteurs ne s&apos;énervent pas en disant : <em>« La machine est méchante ! »</em>. Ils collectent les indices factuels, analysent les enregistrements et remontent méthodiquement à <strong>la cause racine</strong> (un écrou mal serré, une consigne de vol ambiguë, un capteur défaillant).
          </p>
          <p>
            En Prompt Engineering, c&apos;est exactement pareil : quand un agent produit un mauvais résultat, blâmer l&apos;IA est inutile. Il faut enfiler son costume de détective et trouver <strong>pourquoi la consigne a été mal interprétée</strong>.
          </p>
        </div>
      </section>

      {/* 2. Qu'est-ce qu'un mauvais résultat ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="x-circle" className="w-5 h-5 text-indigo-600" />
          <span>2. Qu&apos;est-ce qu&apos;un &quot;mauvais résultat&quot; ?</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Attention : un mauvais résultat n&apos;est pas seulement un code qui plante avec une erreur rouge ! Un résultat est mauvais dès lors qu&apos;il <strong>viole les critères d&apos;acceptation, le périmètre ou les règles de gouvernance</strong>.
        </p>

        {/* Example Box without pre */}
        <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <Icon name="exclamation-circle" className="w-5 h-5" />
            <span>Cas concret d&apos;échec silencieux dans Google Antigravity :</span>
          </div>
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
            <div className="text-amber-400 font-bold">Demande de l&apos;utilisateur :</div>
            <div>&quot;Analyse le composant Projects.jsx et relève les problèmes éventuels. Ne modifie aucun fichier.&quot;</div>
            <div className="text-rose-400 font-bold pt-1">Comportement constaté de l&apos;agent :</div>
            <div>L&apos;agent analyse Projects.jsx, puis prend l&apos;initiative d&apos;ouvrir et d&apos;éditer également App.jsx et projects.json.</div>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-semibold">
            Même si le code produit par l&apos;agent est techniquement parfait, <strong>le résultat est catastrophique</strong> : l&apos;agent a violé le périmètre assigné et l&apos;interdiction formelle d&apos;écriture.
          </p>
        </div>
      </section>

      {/* 3. Les 7 causes majeures de dysfonctionnement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="list-bullet" className="w-5 h-5 text-indigo-600" />
          <span>3. Les 7 causes majeures de dysfonctionnement</span>
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 1 — Consigne floue ou trop ouverte</span>
              <span className="text-[11px] font-mono text-slate-500">Ex: &quot;Améliore ce qui ne va pas&quot;</span>
            </div>
            <p className="text-slate-700">
              L&apos;agent n&apos;a pas de frontière : il explore tout le dépôt, réécrit des styles et installe des bibliothèques tierces.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-emerald-800 border border-slate-200">
              ✓ Remède : Délimiter le fichier unique cible (<code className="font-bold">src/components/Projects.jsx</code>) et interdire toute modification.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 2 — Instructions contradictoires</span>
              <span className="text-[11px] font-mono text-slate-500">Ex: &quot;Ne touche à rien&quot; + &quot;Répare les bugs&quot;</span>
            </div>
            <p className="text-slate-700">
              Deux ordres incompatibles donnés en même temps : l&apos;agent doit choisir au hasard quelle règle enfreindre.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-emerald-800 border border-slate-200">
              ✓ Remède : Établir la hiérarchie : <em>&quot;Propose des corrections dans le chat ; toute écriture sur le disque requiert un accord formel.&quot;</em>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 3 — Contexte insuffisant (Le vide d&apos;information)</span>
              <span className="text-[11px] font-mono text-slate-500">Ex: &quot;Ajoute la recherche&quot; sans donner les données</span>
            </div>
            <p className="text-slate-700">
              L&apos;agent ne sait pas comment sont structurées les données et invente des modèles fictifs pour combler le trou.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-emerald-800 border border-slate-200">
              ✓ Remède : Fournir la structure JSON ou ordonner : <em>&quot;Si une structure manque, demande-la avant de coder.&quot;</em>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 4 — Saturation ou dilution de l&apos;attention</span>
              <span className="text-[11px] font-mono text-slate-500">Session de 30 échanges</span>
            </div>
            <p className="text-slate-700">
              Au fil d&apos;une longue conversation, le début du prompt s&apos;éloigne et l&apos;attention du LLM se disperse.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-emerald-800 border border-slate-200">
              ✓ Remède : Récapituler l&apos;état intermédiaire, purger les bavardages et réinjecter la fiche de Handoff.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 5 — Bruit et répétitions stériles</span>
              <span className="text-[11px] font-mono text-slate-500">La même règle répétée 7 fois</span>
            </div>
            <p className="text-slate-700">
              Répéter « Fais attention » sous 10 formes différentes noie les consignes techniques et consomme inutilement des tokens.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-emerald-800 border border-slate-200">
              ✓ Remède : Factoriser en un seul bloc d&apos;instructions structuré et concis.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 6 — Hallucinations et affirmations sans preuve</span>
              <span className="text-[11px] font-mono text-slate-500">Inventions plausibles</span>
            </div>
            <p className="text-slate-700">
              L&apos;agent affirme qu&apos;une fonction existe sans l&apos;avoir vue dans le code, ou déclare les tests réussis sans les avoir lancés.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-emerald-800 border border-slate-200">
              ✓ Remède : Exiger la distinction formelle entre <strong>Faits prouvés par logs</strong> et <strong>Hypothèses</strong>.
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 uppercase tracking-wide text-xs">Cause 7 — Mauvais emploi des outils</span>
              <span className="text-[11px] font-mono text-slate-500">Outil inadapté ou zélé</span>
            </div>
            <p className="text-slate-700">
              L&apos;agent lance une commande terminal lourde alors qu&apos;une simple lecture suffisait, ou oublie d&apos;appeler l&apos;outil d&apos;inspection.
            </p>
            <div className="bg-slate-50 p-2.5 rounded font-mono text-xs text-emerald-800 border border-slate-200">
              ✓ Remède : Restreindre la liste des outils autorisés dans le frontmatter YAML (<code className="font-bold">tools: [view_file]</code>).
            </div>
          </div>
        </div>
      </section>

      {/* 4. Méthode de diagnostic en 6 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="arrow-path-rounded-square" className="w-5 h-5 text-indigo-600" />
          <span>4. Le cycle de diagnostic et de correction en 6 étapes</span>
        </h2>

        <div className="grid gap-3 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 1</span>
            <h4 className="font-bold text-slate-950">Observer les faits bruts</h4>
            <p className="text-slate-600">Relever précisément quels fichiers ont été touchés et quels outils ont été déclenchés.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 2</span>
            <h4 className="font-bold text-slate-950">Comparer avec la mission</h4>
            <p className="text-slate-600">Mesurer l&apos;écart formel entre ce qui a été demandé et ce qui a été produit.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 3</span>
            <h4 className="font-bold text-slate-950">Isoler la cause racine</h4>
            <p className="text-slate-600">S&apos;agit-il d&apos;une consigne ambiguë, d&apos;une contradiction ou d&apos;un manque de contexte ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 4</span>
            <h4 className="font-bold text-slate-950">Ajuster une seule règle</h4>
            <p className="text-slate-600">Modifier uniquement la phrase fautive sans tout réécrire au hasard.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 5</span>
            <h4 className="font-bold text-slate-950">Re-tester à l&apos;identique</h4>
            <p className="text-slate-600">Soumettre exactement le même prompt pour vérifier l&apos;efficacité du changement.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono font-bold text-indigo-700">ÉTAPE 6</span>
            <h4 className="font-bold text-slate-950">Valider l&apos;absence de régression</h4>
            <p className="text-slate-600">Vérifier que cette correction n&apos;a pas cassé le comportement sur un autre cas.</p>
          </div>
        </div>
      </section>

      {/* 5. Fiche standard d'analyse d'incident */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="table-cells" className="w-5 h-5 text-indigo-600" />
          <span>5. La fiche standard d&apos;incident de prompt</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Rubrique d&apos;analyse</th>
                <th className="p-3.5 border-b border-slate-200">Question diagnostique</th>
                <th className="p-3.5 border-b border-slate-200 text-indigo-900">Exemple de cas concret</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold">1. Mission initiale</td>
                <td className="p-3.5">Qu&apos;avais-je formellement demandé dans le prompt ?</td>
                <td className="p-3.5 font-mono text-xs text-slate-700">Auditer Projects.jsx en lecture seule sans modifier le code</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">2. Résultat constaté</td>
                <td className="p-3.5">Qu&apos;a réellement produit ou altéré l&apos;agent ?</td>
                <td className="p-3.5 font-mono text-xs text-rose-700 font-semibold">A modifié Projects.jsx et touché au composant App.jsx</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">3. Écart mesuré</td>
                <td className="p-3.5">Quelle règle ou frontière a été franchie ?</td>
                <td className="p-3.5 font-mono text-xs text-rose-700 font-semibold">Violation de la lecture seule + fuite de périmètre hors du composant</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">4. Cause racine</td>
                <td className="p-3.5">Quel mot ou ambiguïté a provoqué l&apos;erreur ?</td>
                <td className="p-3.5 font-mono text-xs text-amber-800">Le mot &quot;améliore&quot; a été interprété comme un ordre d&apos;écriture immédiat</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">5. Correction ciblée</td>
                <td className="p-3.5">Quelle instruction précise élimine le problème ?</td>
                <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">Remplacer &quot;améliore&quot; par &quot;liste les recommandations dans le chat&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {[
            { cat: "1. Mission initiale", q: "Ce qui était demandé", ex: "Auditer Projects.jsx en lecture seule" },
            { cat: "2. Résultat constaté", q: "Ce qui a été fait", ex: "A édité Projects.jsx et App.jsx" },
            { cat: "3. Écart mesuré", q: "Frontière franchie", ex: "Écriture non autorisée + fuite de périmètre" },
            { cat: "4. Cause racine", q: "Pourquoi l'erreur est survenue", ex: "Le mot 'améliore' a été pris pour un ordre d'édition" },
            { cat: "5. Correction", q: "Ajustement précis", ex: "Exiger un rapport textuel dans le chat uniquement" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="font-bold text-slate-950 text-sm">{item.cat}</div>
              <div className="text-slate-600"><strong>Question :</strong> {item.q}</div>
              <div className="font-mono bg-slate-50 p-2 rounded text-slate-800"><strong>Exemple :</strong> {item.ex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Diagnostic d&apos;un agent défaillant
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 1"
          questions={[
            {
              id: 1,
              question: "Si un agent produit un code qui fonctionne mais qu'il a modifié trois fichiers alors qu'on lui avait demandé d'en analyser un seul, comment qualifie-t-on ce résultat ?",
              options: [
                "C'est un mauvais résultat car l'agent a violé les limites de périmètre et son mandat d'intervention, ce qui présente un risque inacceptable de régressions.",
                "C'est un excellent résultat car le code fonctionne.",
                "C'est un résultat neutre qui n'a pas d'importance.",
                "C'est la preuve que l'agent est plus intelligent que le développeur."
              ],
              correctIndex: 0,
              explanation: "La qualité d'un travail d'agent ne se mesure pas seulement au fonctionnement du code, mais au respect scrupuleux des limites et des consignes imparties."
            },
            {
              id: 2,
              question: "Pourquoi est-il néfaste de réécrire complètement un prompt de 50 lignes dès qu'une seule erreur survient ?",
              options: [
                "Parce qu'en changeant tout d'un coup, on est incapable de savoir quelle modification a résolu le problème ou introduit un nouveau bogue : il faut isoler et corriger une variable à la fois.",
                "Parce que les claviers d'ordinateur s'usent trop vite.",
                "Parce que les modèles d'IA n'aiment pas les nouveaux textes.",
                "Parce que c'est interdit par le règlement intérieur."
              ],
              correctIndex: 0,
              explanation: "La méthode scientifique exige de ne modifier qu'un seul élément à la fois pour comprendre précisément l'impact de chaque mot sur le comportement de l'agent."
            },
            {
              id: 3,
              question: "Dans l'analogie de l'enquête policière, que représente la recherche de la cause racine ?",
              options: [
                "Trouver le mot précis ou la règle contradictoire qui a induit l'agent en erreur, plutôt que de punir aveuglément la machine en ajoutant des interdictions en vrac.",
                "Appeler la police municipale pour porter plainte.",
                "Changer d'ordinateur portable immédiatement.",
                "Mettre son écran en mode sombre."
              ],
              correctIndex: 0,
              explanation: "Identifier la cause racine permet d'appliquer une correction chirurgicale et pérenne plutôt que d'alourdir le prompt d'interdictions superflues et désordonnées."
            }
          ]}
        />
      </section>
    </div>
  );
};
