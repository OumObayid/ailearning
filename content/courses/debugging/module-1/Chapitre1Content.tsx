'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Introduction à l&apos;ingénierie du débogage
        </h1>
      </div>

      {/* 1. Définition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Définition de l&apos;ingénierie du débogage
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;<strong>ingénierie du débogage</strong> (<em>Debugging Engineering</em>) est une discipline du développement logiciel qui consiste à appliquer une démarche méthodique et structurée pour identifier, analyser, comprendre et corriger les erreurs présentes dans un système informatique.
        </p>
        <p className="text-base text-slate-800 font-medium">
          Elle ne consiste pas simplement à modifier une ligne de code qui semble incorrecte. Elle cherche à comprendre :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
              <Icon name="search" className="w-4 h-4" />
              <span>Pourquoi &amp; Quand</span>
            </div>
            <p className="text-sm font-medium text-slate-800">
              Pourquoi le problème apparaît et dans quelles conditions exactes de données et d&apos;environnement il se produit.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
              <Icon name="server" className="w-4 h-4" />
              <span>Responsabilité système</span>
            </div>
            <p className="text-sm font-medium text-slate-800">
              Quelle partie ou couche du système est responsable et quelle est la cause réelle sous-jacente.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
              <Icon name="check-circle" className="w-4 h-4" />
              <span>Résolution pérenne</span>
            </div>
            <p className="text-sm font-medium text-slate-800">
              Quelle modification permet de résoudre durablement le problème sans introduire de comportement imprévu.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
              <Icon name="shield-check" className="w-4 h-4" />
              <span>Non-régression</span>
            </div>
            <p className="text-sm font-medium text-slate-800">
              Comment valider avec certitude que le correctif ne casse aucune autre fonctionnalité existante.
            </p>
          </div>
        </div>

        <Callout type="info" title="Exemple concret : Cas d'un panier e-commerce">
          <p className="text-sm leading-relaxed">
            Imaginons une application e-commerce développée avec <strong>React</strong>, <strong>Node.js</strong> et <strong>MySQL</strong>. Un utilisateur ajoute trois produits à son panier, mais le système affiche un montant total de <strong>250 €</strong> au lieu de <strong>350 €</strong>.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Un développeur débutant modifierait immédiatement la formule de calcul dans React. L&apos;ingénieur du débogage examine d&apos;abord toute la chaîne : données envoyées par le frontend, quantités, prix stockés en base MySQL, formule backend Express, réponse JSON et affichage React.
          </p>
        </Callout>
      </section>

      {/* 2. Importance */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi l&apos;ingénierie du débogage est-elle cruciale ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une application Web moderne est composée de couches interconnectées :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/60">
            <span className="text-xs font-black uppercase text-blue-900 block mb-1">Frontend</span>
            <div className="text-base font-black text-slate-950 mb-1">React / Vue.js</div>
            <p className="text-xs font-medium text-slate-700">Interface utilisateur, événements, formulaires et requêtes HTTP / API REST.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/60">
            <span className="text-xs font-black uppercase text-amber-900 block mb-1">Backend</span>
            <div className="text-base font-black text-slate-950 mb-1">Node.js / Express</div>
            <p className="text-xs font-medium text-slate-700">Logique métier, authentification, traitements asynchrones et requêtes SQL.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60">
            <span className="text-xs font-black uppercase text-emerald-900 block mb-1">Base de données</span>
            <div className="text-base font-black text-slate-950 mb-1">MySQL</div>
            <p className="text-xs font-medium text-slate-700">Stockage persistant, intégrité référentielle, indexation et transactions.</p>
          </div>
        </div>

        <Callout type="warning" title="Règle fondamentale d'investigation">
          Le lieu où apparaît une anomalie (l&apos;écran utilisateur) n&apos;est pas nécessairement le lieu où se trouve sa cause réelle. Ne jamais accuser automatiquement le composant dans lequel le problème devient visible.
        </Callout>
      </section>

      {/* 3. Les quatre grandes phases */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les quatre grandes phases du débogage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm">1</span>
            <h3 className="text-base font-black text-slate-950">Détection (Detection)</h3>
            <p className="text-xs text-slate-700 font-medium">Identifier qu&apos;un comportement anormal existe (signalement utilisateur, monitoring ou échec de test).</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm">2</span>
            <h3 className="text-base font-black text-slate-950">Investigation</h3>
            <p className="text-xs text-slate-700 font-medium">Collecter les logs, reproduire le problème en environnement contrôlé et isoler les couches en cause.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm">3</span>
            <h3 className="text-base font-black text-slate-950">Correction (Fixing)</h3>
            <p className="text-xs text-slate-700 font-medium">Identifier la cause racine et appliquer la modification minimale, propre et durable.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm">4</span>
            <h3 className="text-base font-black text-slate-950">Validation (Verification)</h3>
            <p className="text-xs text-slate-700 font-medium">Vérifier par des tests unitaires et d&apos;intégration que le bug est résolu sans provoquer de régression.</p>
          </div>
        </div>
      </section>

      {/* 4. Debugging vs Testing vs Monitoring */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Débogage, tests et monitoring : quelles différences ?
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5 font-black">Discipline</th>
                <th className="p-3.5 font-black">Objectif fondamental</th>
                <th className="p-3.5 font-black">Exemple d&apos;application concrète</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-black text-emerald-700 bg-emerald-50/50">Debugging</td>
                <td className="p-3.5">Comprendre et corriger la cause racine d&apos;un problème.</td>
                <td className="p-3.5">Rechercher pourquoi certaines inscriptions échouent lors de la validation.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-blue-800 bg-blue-50/50">Testing</td>
                <td className="p-3.5">Vérifier qu&apos;un logiciel fonctionne conformément aux spécifications.</td>
                <td className="p-3.5">Vérifier automatiquement avec Vitest que le formulaire d&apos;inscription fonctionne.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-purple-800 bg-purple-50/50">Monitoring</td>
                <td className="p-3.5">Surveiller le comportement d&apos;une application en temps réel en production.</td>
                <td className="p-3.5">Observer le taux d&apos;erreurs HTTP 500 et la latence moyenne des requêtes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Compétences clés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Les compétences d&apos;un ingénieur du débogage
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-800">
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">Lecture de code</span>
            Comprendre le flux d&apos;exécution sans exécuter
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">Analyse de logs</span>
            Extraire les timestamps, traces et contextes
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">Débogueur IDE</span>
            Poser des breakpoints et inspecter la mémoire
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">HTTP &amp; Réseau</span>
            Inspecter headers, payloads et statuts HTTP
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">SQL &amp; Données</span>
            Diagnostiquer contraintes et requêtes lentes
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">Tests automatisés</span>
            Écrire des tests de non-régression
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">Git &amp; Bisect</span>
            Retrouver le commit exact responsable du bug
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-emerald-700 font-black block mb-0.5">Raisonnement</span>
            Distinguer les faits observés des hypothèses
          </div>
        </div>

        <Callout type="tip" title="Fait vs Hypothèse">
          <strong>Fait :</strong> L&apos;API retourne une réponse HTTP 500.<br />
          <strong>Hypothèse :</strong> La base de données est indisponible.<br />
          <strong>Vérification :</strong> Consulter les logs serveur et tester la connexion MySQL. Ne jamais confondre une supposition avec un diagnostic confirmé.
        </Callout>
      </section>

      {/* 6. Traditionnel vs Assisté par IA */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Débogage traditionnel et débogage assisté par IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <h3 className="font-black text-base text-slate-950 flex items-center gap-2">
              <Icon name="code" className="w-5 h-5 text-slate-700" />
              <span>Débogage traditionnel</span>
            </h3>
            <ul className="text-sm font-medium text-slate-800 space-y-1.5 list-disc list-inside">
              <li>Analyse manuelle rigoureuse du code source</li>
              <li>Inspection pas à pas avec breakpoints</li>
              <li>Formulation et vérification des hypothèses</li>
              <li>Écriture manuelle des tests de non-régression</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-emerald-300 space-y-2">
            <h3 className="font-black text-base text-emerald-900 flex items-center gap-2">
              <Icon name="sparkles" className="w-5 h-5 text-emerald-700" />
              <span>Débogage assisté par IA</span>
            </h3>
            <ul className="text-sm font-medium text-slate-800 space-y-1.5 list-disc list-inside">
              <li>Interprétation accélérée des stack traces et logs</li>
              <li>Génération d&apos;hypothèses de causes possibles</li>
              <li>Suggestions de corrections de syntaxe et logique</li>
              <li>Proposition de jeux de tests unitaires</li>
            </ul>
          </div>
        </div>
        <Callout type="warning" title="Vigilance critique avec les agents IA">
          L&apos;IA peut proposer une correction superficielle qui masque l&apos;erreur sans traiter sa cause racine. Le développeur demeure l&apos;autorité responsable du diagnostic, de la sécurité et de la validation finale.
        </Callout>
      </section>

      {/* 7. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Synthèse du chapitre
        </h2>
        <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-slate-900 space-y-2 text-base font-medium">
          <p>• Le débogage est une discipline d&apos;investigation technique, pas une simple modification de code.</p>
          <p>• Une anomalie visible dans le frontend peut trouver sa cause dans le backend ou la base de données.</p>
          <p>• Toujours rechercher la cause racine avant d&apos;écrire une ligne de correctif.</p>
          <p>• Toute correction doit être obligatoirement suivie d&apos;une validation fonctionnelle et de non-régression.</p>
          <p>• L&apos;IA est un assistant accélérateur, jamais une autorité technique infaillible.</p>
        </div>
      </section>

      {/* 8. Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Introduction au Débogage"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif principal de l'ingénierie du débogage ?",
              options: [
                "Écrire du code plus rapidement.",
                "Identifier, analyser et corriger les causes profondes des erreurs logicielles.",
                "Ajouter de nouvelles fonctionnalités en production.",
                "Réduire le nombre de fichiers d'un projet.",
              ],
              correctIndex: 1,
              explanation: "L'ingénierie du débogage vise l'investigation méthodique et la résolution des causes réelles des défauts.",
            },
            {
              id: 2,
              question: "Une application affiche un montant incorrect dans React. Où peut se trouver la cause ?",
              options: [
                "Uniquement dans le composant React.",
                "Uniquement dans la table MySQL.",
                "Dans le frontend, le backend Express ou la base de données MySQL.",
                "Uniquement dans les réglages du navigateur.",
              ],
              correctIndex: 2,
              explanation: "Toute la chaîne de traitement peut être en cause : de l'envoi des données à leur calcul et stockage.",
            },
            {
              id: 3,
              question: "Que signifie rechercher la cause racine (Root Cause) ?",
              options: [
                "Modifier immédiatement la première ligne qui semble anormale.",
                "Identifier l'origine fondamentale du dysfonctionnement pour éviter qu'il ne se reproduise.",
                "Supprimer les messages d'erreur des logs.",
                "Redémarrer le serveur de production.",
              ],
              correctIndex: 1,
              explanation: "La cause racine est le défaut originel dont la correction éradique définitivement le problème.",
            },
            {
              id: 4,
              question: "Quelle discipline surveille le comportement d'une application en temps réel en production ?",
              options: ["Le Debugging.", "Le Monitoring.", "La Compilation.", "Le Formatting."],
              correctIndex: 1,
              explanation: "Le monitoring permet d'observer la santé, le débit et le taux d'erreurs d'un système en exploitation.",
            },
            {
              id: 5,
              question: "Après avoir corrigé un bug, quelle étape est indispensable ?",
              options: [
                "Supprimer immédiatement l'historique des logs.",
                "Modifier d'autres fichiers pour harmoniser le code.",
                "Vérifier la correction par des tests et contrôler l'absence de régressions.",
                "Redémarrer systématiquement son ordinateur.",
              ],
              correctIndex: 2,
              explanation: "La validation et les tests de non-régression garantissent la solidité pérenne du correctif.",
            },
          ]}
        />
      </section>
    </div>
  );
};

