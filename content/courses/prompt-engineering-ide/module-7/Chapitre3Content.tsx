'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 7</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Réduire les ambiguïtés dans les prompts
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment traquer les mots pièges subjectifs, désamorcer les doubles interprétations et appliquer la méthode de clarification en 4 dimensions.
        </p>
      </div>

      {/* 1. L'analogie de l'ordonnance médicale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="chat-bubble-left-ellipsis" className="w-5 h-5 text-indigo-600" />
          <span>1. Pourquoi l&apos;ambiguïté est le pire ennemi d&apos;un agent IA</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une phrase peut être parfaitement fluide et élégante en français, tout en étant une véritable catastrophe opérationnelle pour un modèle de langage dans un IDE. Pourquoi ? Parce que <strong>chaque mot flou ouvre un arbre d&apos;interprétations divergentes</strong>.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de l&apos;ordonnance médicale :</span>
          </div>
          <p>
            Imaginez un médecin qui rédigerait sur votre ordonnance : <em>« Prenez quelques pilules quand vous vous sentez mal pour améliorer votre santé »</em>. Vous pourriez avaler des somnifères pour un mal de gorge ou faire une surdose mortelle !
          </p>
          <p>
            Une vraie ordonnance indique : <strong>Médicament exact, dosage précis (500mg), fréquence (1 matin et soir au milieu du repas), durée (5 jours) et contre-indications</strong>.
          </p>
          <p>
            Avec un agent IA, c&apos;est exactement la même exigence : remplacer les conseils vagues par un protocole technique au millimètre près.
          </p>
        </div>
      </section>

      {/* 2. Les 5 types majeurs d'ambiguïtés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="puzzle-piece" className="w-5 h-5 text-indigo-600" />
          <span>2. Les 5 types majeurs d&apos;ambiguïtés dans le code</span>
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs uppercase font-mono">1. Ambiguïté sur la mission</span>
            <div className="text-slate-700 space-y-0.5">
              <div><strong className="text-rose-700">Flou :</strong> &quot;Optimise mon système d&apos;authentification.&quot; (S&apos;agit-il de la vitesse, de la sécurité des hashs, ou de l&apos;ergonomie du formulaire ?)</div>
              <div><strong className="text-emerald-700">Précis :</strong> &quot;Vérifie l&apos;absence d&apos;injection SQL dans src/routes/auth.js et propose les requêtes paramétrées dans le chat.&quot;</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs uppercase font-mono">2. Ambiguïté sur le périmètre</span>
            <div className="text-slate-700 space-y-0.5">
              <div><strong className="text-rose-700">Flou :</strong> &quot;Regarde les fichiers nécessaires pour comprendre la recherche.&quot; (L&apos;agent peut scanner 500 fichiers sur le disque !)</div>
              <div><strong className="text-emerald-700">Précis :</strong> &quot;Consulte exclusivement src/components/SearchBar.jsx et src/data/projects.json. Aucun autre fichier.&quot;</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs uppercase font-mono">3. Ambiguïté sur les autorisations</span>
            <div className="text-slate-700 space-y-0.5">
              <div><strong className="text-rose-700">Flou :</strong> &quot;Tu peux corriger les bugs importants.&quot; (L&apos;agent a-t-il le droit d&apos;écrire ? d&apos;installer des paquets ?)</div>
              <div><strong className="text-emerald-700">Précis :</strong> &quot;Mode lecture seule strict : décris les corrections sous forme de diff Git dans le chat sans modifier les fichiers.&quot;</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs uppercase font-mono">4. Ambiguïté sur le livrable attendu</span>
            <div className="text-slate-700 space-y-0.5">
              <div><strong className="text-rose-700">Flou :</strong> &quot;Donne-moi une analyse complète.&quot; (Qu&apos;est-ce qui définit la complétude ?)</div>
              <div><strong className="text-emerald-700">Précis :</strong> &quot;Structure ton rapport avec 4 rubriques : 1. Constat, 2. Fichier et Ligne, 3. Risque, 4. Recommandation.&quot;</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 text-xs uppercase font-mono">5. Ambiguïté temporelle ou d&apos;ordre</span>
            <div className="text-slate-700 space-y-0.5">
              <div><strong className="text-rose-700">Flou :</strong> &quot;Teste le code avant de terminer.&quot; (Lancer npm test dans le terminal ou rédiger des scénarios ?)</div>
              <div><strong className="text-emerald-700">Précis :</strong> &quot;Rédige la liste des cas de test à la fin de ta réponse. N&apos;exécute aucune commande dans le shell sans mon accord.&quot;</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tableau des mots piégés à bannir */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="exclamation-triangle" className="w-5 h-5 text-indigo-600" />
          <span>3. Le dictionnaire des mots piégés à bannir</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200 font-mono text-rose-900">Mot piégé subjectif</th>
                <th className="p-3.5 border-b border-slate-200">Risque de dérive pour l&apos;agent</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-900">Formulation alternative rigoureuse</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-700">Améliore / Nettoie</td>
                <td className="p-3.5">L&apos;agent réécrit la moitié du composant selon ses préférences esthétiques.</td>
                <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">&quot;Identifie les 3 plus gros goulots d&apos;étranglement et propose un Diff.&quot;</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-700">Tout / Partout</td>
                <td className="p-3.5">Périmètre infini : l&apos;agent explore récursivement tout le disque dur.</td>
                <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">&quot;Dans le fichier src/components/SearchBar.jsx exclusivement.&quot;</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-700">Nécessaire / Utile</td>
                <td className="p-3.5">Laisse l&apos;agent seul juge des ressources à ouvrir (risque d&apos;ouverture de .env).</td>
                <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">&quot;Utilise uniquement la liste fournie. Demande confirmation si un fichier manque.&quot;</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-700">Automatiquement</td>
                <td className="p-3.5">Court-circuite le contrôle humain (Human-in-the-Loop) et applique sans validation.</td>
                <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">&quot;Présente le plan d&apos;action et attends mon feu vert explicite.&quot;</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-700">Sécurisé</td>
                <td className="p-3.5">Notion nébuleuse et non mesurable pour un modèle.</td>
                <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">&quot;Protège contre les attaques XSS par échappement strict des balises HTML.&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {[
            { word: "Améliore / Nettoie", risk: "Réécriture anarchique du code.", fix: "Proposer un Diff sur 3 points précis." },
            { word: "Tout / Partout", risk: "Exploration récursive illimitée.", fix: "Nommer le fichier exact (ex: SearchBar.jsx)." },
            { word: "Nécessaire", risk: "Laisse l'agent décider des fichiers à ouvrir.", fix: "Liste fermée + arrêt en cas de manque." },
            { word: "Automatiquement", risk: "Supprime l'accord humain (HITL).", fix: "Attendre le 'Oui' explicite de l'utilisateur." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="font-mono font-bold text-rose-700 text-sm">{item.word}</div>
              <div className="text-slate-600"><strong>Danger :</strong> {item.risk}</div>
              <div className="text-emerald-700 font-semibold"><strong>Solution :</strong> {item.fix}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. La méthode des 4 dimensions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="adjustments-vertical" className="w-5 h-5 text-indigo-600" />
          <span>4. La méthode de clarification en 4 dimensions</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Avant d&apos;envoyer n&apos;importe quelle consigne à votre agent, vérifiez qu&apos;elle coche ces 4 dimensions indispensables :
        </p>

        <div className="grid gap-3 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-indigo-700 font-mono text-xs">1. L&apos;ACTION EXACTE</span>
            <p className="text-slate-600">Quel est le verbe d&apos;action précis ? (Analyser, synthétiser, comparer, formuler un Diff...)</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-indigo-700 font-mono text-xs">2. LA CIBLE CHIRURGICALE</span>
            <p className="text-slate-600">Sur quel composant, route ou fichier unique porte l&apos;intervention ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-indigo-700 font-mono text-xs">3. LES LIMITES STRICTES</span>
            <p className="text-slate-600">Quelles opérations sont formellement bannies ? (Aucune écriture sur disque, aucun shell...)</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-bold text-indigo-700 font-mono text-xs">4. LE FORMAT DU LIVRABLE</span>
            <p className="text-slate-600">Quelle est la structure de réponse attendue ? (Tableau markdown, liste numérotée, schéma JSON...)</p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Réduction des ambiguïtés
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 3"
          questions={[
            {
              id: 1,
              question: "Pourquoi l'instruction 'Améliore le formulaire de contact' est-elle considérée comme dangereuse pour un agent d'IDE ?",
              options: [
                "Parce que le verbe 'Améliore' est totalement subjectif et n'impose aucune limite : l'agent peut modifier les champs, réécrire le CSS ou changer de bibliothèque sans contrôle.",
                "Parce que les formulaires de contact sont interdits en JavaScript.",
                "Parce que le mot 'formulaire' prend trop de tokens.",
                "Parce que l'agent ne sait pas ce qu'est un e-mail."
              ],
              correctIndex: 0,
              explanation: "Les mots vagues comme 'améliore' ou 'nettoie' ouvrent la porte aux initiatives personnelles incontrôlées : l'agent réécrit du code selon ses propres goûts."
            },
            {
              id: 2,
              question: "Quelle formulation remplace le plus efficacement la consigne floue 'Consulte les fichiers nécessaires' ?",
              options: [
                "'Consulte exclusivement src/components/Form.jsx et src/utils/validation.js. Ne recherche ni n'ouvre aucun autre fichier.'",
                "'Fais de ton mieux pour trouver les bons fichiers partout.'",
                "'Ouvre tous les fichiers du disque dur pour être sûr.'",
                "'Demande à Google quels sont les fichiers nécessaires.'"
              ],
              correctIndex: 0,
              explanation: "Nommer exhaustivement les fichiers cibles et interdire formellement toute ouverture supplémentaire verrouille le périmètre d'investigation de l'agent."
            },
            {
              id: 3,
              question: "Dans l'analogie de l'ordonnance médicale, à quoi correspond le fait d'indiquer '500mg, 1 matin et soir pendant 5 jours' ?",
              options: [
                "À définir des limites, un dosage technique et des critères d'achèvement précis au lieu de donner un conseil généraliste sans contrainte.",
                "À acheter des médicaments génériques.",
                "À soigner la fièvre de l'ordinateur.",
                "À éteindre l'écran à 20 heures."
              ],
              correctIndex: 0,
              explanation: "Une ordonnance précise élimine toute marge d'interprétation pour le patient, tout comme une consigne cadrée élimine les dérives chez l'agent IA."
            }
          ]}
        />
      </section>
    </div>
  );
};
