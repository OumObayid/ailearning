'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 7 — Débogage &amp; Optimisation de Prompts</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 10 — Optimiser les instructions principales d&apos;un agent
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Le grand projet d&apos;ingénierie du Module 7 : assembler le persona universel en 8 sections modulaires, arbitrer les contradictions de consignes et valider l&apos;homologation finale sur 100 points.
        </p>
      </div>

      {/* 1. L'analogie de la Formule 1 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie de la Formule 1 : La précision chirurgicale des consignes</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Une monoplace de Formule 1 n&apos;est pas construite en jetant des pièces en vrac dans un coffre. Chaque composant mécanique, chaque aileron aérodynamique et chaque coupe-circuit d&apos;urgence possède un emplacement millimétré et un rôle précis dans le manuel de bord de l&apos;écurie.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour qu&apos;un agent IA opère avec une fiabilité irréprochable dans Google Antigravity ou tout IDE moderne, ses instructions système ne doivent jamais former un texte narratif confus. Elles doivent s&apos;articuler autour de <strong>8 compartiments étanches</strong>, chacun répondant à une responsabilité unique :
        </p>

        <div className="grid gap-3 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">1. Identité &amp; Rôle</span>
            <p className="text-slate-600">Séniorité, spécialité technique et posture professionnelle.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">2. Mission Principale</span>
            <p className="text-slate-600">Valeur concrète à livrer sans dispersion ni dérive.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">3. Périmètre Autorisé</span>
            <p className="text-slate-600">Frontières de fichiers et sanctuarisation de la racine.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">4. Permissions &amp; PoLP</span>
            <p className="text-slate-600">Lecture seule par défaut et validation humaine obligatoire.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">5. Méthode Séquentielle</span>
            <p className="text-slate-600">Étapes linéaires : Cadrage → Analyse → Diff → Action.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">6. Fiabilité &amp; Preuves</span>
            <p className="text-slate-600">Obligation de citer les lignes, zéro hallucination.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">7. Gestion des Blocages</span>
            <p className="text-slate-600">Déclaration explicite des manques et suspension en cas de doute.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-950">8. Format de Sortie</span>
            <p className="text-slate-600">Structure de rapport imposée et Definition of Done.</p>
          </div>
        </div>
      </section>

      {/* 2. Échelle des priorités */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. L&apos;échelle hiérarchique de résolution des contradictions</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Que doit faire un agent lorsqu&apos;un utilisateur pressé lui ordonne : <em>&quot;Vas-y, applique directement le correctif partout sans me demander !&quot;</em> ? L&apos;agent doit résoudre ce conflit d&apos;intérêts selon cette échelle de priorité inviolable :
        </p>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-rose-950">PRIORITÉ 1 — Sécurité absolue, Confinement &amp; Protection des Secrets (.env)</span>
            <span className="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded font-bold shrink-0">Inviolable</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-amber-950">PRIORITÉ 2 — Permissions explicites &amp; Validation humaine (HITL)</span>
            <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold shrink-0">Accord Requis</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-blue-950">PRIORITÉ 3 — Mission fonctionnelle &amp; Objectifs techniques courants</span>
            <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-bold shrink-0">Dans les limites</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-slate-800">PRIORITÉ 4 — Confort stylistique, politesse &amp; mise en forme esthétique</span>
            <span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold shrink-0">Secondaire</span>
          </div>
        </div>
      </section>

      {/* 3. Le Master Template de Prompt */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Le Master Template d&apos;instructions prêt pour la production</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Voici le canevas de référence d&apos;un agent auditeur et développeur, prêt à être copié dans votre fichier de configuration d&apos;agent :
        </p>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-2 break-words min-w-0 max-w-full">
          <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
            # =========================================================================<br />
            # DIRECTIVES MAÎTRESSES UNIVERSELLES — AGENT INGÉNIEUR LOGICIEL v2.0<br />
            # =========================================================================
          </div>
          <p className="text-emerald-400">## 1. IDENTITÉ &amp; RÔLE : Tu es un ingénieur logiciel senior spécialisé en sécurité et audit de code dans Google Antigravity.</p>
          <p className="text-emerald-400">## 2. MISSION : Analyser, sécuriser et améliorer la qualité du code soumis sans jamais altérer l&apos;environnement sans autorisation.</p>
          <p className="text-emerald-400">## 3. PÉRIMÈTRE AUTORISÉ : Interagis exclusivement avec les fichiers expressément désignés par l&apos;utilisateur. Toute exploration des répertoires parents (&quot;..&quot;) ou de fichiers hors scope est interdite.</p>
          <p className="text-emerald-400">## 4. PERMISSIONS &amp; INTÉGRITÉ : Mode LECTURE SEULE par défaut. Aucune création, édition ou suppression de fichier n&apos;est autorisée sans présentation d&apos;un diff et accord explicite préalable. Les fichiers de secrets (.env, clés) sont sanctuarisés et inaccessibles.</p>
          <p className="text-emerald-400">## 5. FIABILITÉ &amp; PREUVES : Tu n&apos;inventes aucune fonction, route API ou dépendance. Chaque constat technique cite le fichier exact et les numéros de ligne. Distingue rigoureusement faits vérifiés et suppositions.</p>
          <p className="text-emerald-400">## 6. SÉCURITÉ TERMINALE : Tu n&apos;annonces aucun test réussi sans l&apos;avoir exécuté. Toute commande terminal sensible nécessite une validation préalable.</p>
          <p className="text-emerald-400">## 7. GESTION DES INCONNUES : Si une information manque pour conclure, déclare ton incapacité à vérifier plutôt que de deviner.</p>
          <p className="text-emerald-400">## 8. RÈGLE D&apos;OR : En cas de doute ou de contradiction entre vitesse et sécurité, la sécurité et la consultation humaine priment systématiquement.</p>
        </div>
      </section>

      {/* 4. Projet Final d'Homologation sur 100 points */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>4. Projet d&apos;Homologation Finale : La grille d&apos;audit sur 100 points</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour valider le Module 7, vous soumettez les instructions de votre agent au banc d&apos;essai final. Pour être homologué, l&apos;agent doit obtenir au moins <strong>70 / 100 points</strong> sans aucune faute éliminatoire :
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Critère d&apos;évaluation</th>
                <th className="p-3">Pondération</th>
                <th className="p-3">Condition stricte d&apos;attribution des points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">1. Détection &amp; Neutralisation des ambiguïtés</td>
                <td className="p-3 font-mono font-bold text-purple-800">15 pts</td>
                <td className="p-3">Éradication de tous les mots pièges (&quot;améliore&quot;, &quot;fichiers nécessaires&quot;, &quot;fais vite&quot;).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">2. Résolution des contradictions</td>
                <td className="p-3 font-mono font-bold text-purple-800">15 pts</td>
                <td className="p-3">Application stricte de l&apos;échelle hiérarchique (Sécurité &gt; Demande utilisateur).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">3. Confinement du périmètre (Sandbox)</td>
                <td className="p-3 font-mono font-bold text-purple-800">15 pts</td>
                <td className="p-3">Zéro tentative d&apos;exploration en dehors du répertoire désigné.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">4. Verrouillage HITL des écritures</td>
                <td className="p-3 font-mono font-bold text-purple-800">15 pts</td>
                <td className="p-3">Mode lecture seule strict et suspension obligatoire tant que le diff n&apos;est pas approuvé.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">5. Architecture modulaire en 8 sections</td>
                <td className="p-3 font-mono font-bold text-purple-800">20 pts</td>
                <td className="p-3">Structure limpide, sans redondance stérile, avec ratio de concision &gt; 85%.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">6. Rigueur factuelle (Anti-hallucination)</td>
                <td className="p-3 font-mono font-bold text-purple-800">10 pts</td>
                <td className="p-3">Preuves matérielles citées pour chaque affirmation et déclaration des inconnues.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">7. Démonstration de supériorité A/B</td>
                <td className="p-3 font-mono font-bold text-purple-800">10 pts</td>
                <td className="p-3">Mesure objective de la supériorité de la Version v2.0 sur la Version v1.0.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-900 text-xs">Clarté, Périmètre &amp; Permissions</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">60 pts</span>
            </div>
            <p className="text-slate-600 text-xs">Éradication des ambiguïtés, respect de la sandbox et suspension HITL avant écriture.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-slate-900 text-xs">Architecture 8 sections &amp; Anti-hallucination</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">30 pts</span>
            </div>
            <p className="text-slate-600 text-xs">Prompt modulaire épuré et obligation absolue de citer les lignes de code.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-slate-900 text-xs">Validation A/B comparative</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">10 pts</span>
            </div>
            <p className="text-slate-600 text-xs">Démonstration chiffrée des gains de la version optimisée.</p>
          </div>
        </div>

        <Callout type="success" title="Félicitations pour l'achèvement du Module 7 !">
          Vous maîtrisez désormais le cycle complet de conception, débogage et homologation des prompts dans les IDE. Vos agents IA ne sont plus des générateurs de texte imprévisibles, mais des coéquipiers d&apos;ingénierie rigoureux, confinés et hautement fiables.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation finale du Module 7 : Examen d&apos;homologation</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle règle prévaut en priorité absolue lorsqu'une instruction de l'utilisateur entre en contradiction directe avec une règle d'intégrité du système ?",
              options: [
                "L'injonction de l'utilisateur prime systématiquement",
                "La sécurité absolue, le confinement du périmètre et la sanctuarisation des secrets priment toujours",
                "L'agent doit tirer à pile ou face",
                "L'agent doit fermer le projet et formater la machine"
              ],
              correctIndex: 1,
              explanation: "La priorité 1 (sécurité absolue et intégrité de l'environnement) est non négociable. Un agent ne peut jamais déroger aux règles d'intégrité sous la pression d'une consigne utilisateur contradictoire."
            },
            {
              id: 2,
              question: "Pourquoi est-il crucial de structurer les instructions principales d'un agent selon une architecture modulaire en sections canoniques (ex: 8 sections) ?",
              options: [
                "Pour rendre le comportement de l'agent prévisible, faciliter la maintenance sans répétition stérile et isoler chaque responsabilité",
                "Parce que le compilateur Next.js refuse les prompts non numérotés",
                "Pour obliger l'agent à répondre en moins de 10 mots",
                "Pour consommer un maximum de mémoire vive"
              ],
              correctIndex: 0,
              explanation: "Une architecture compartimentée offre une clarté totale : chaque consigne a son emplacement dédié, ce qui évite l'accumulation d'interdictions contradictoires ou redondantes."
            },
            {
              id: 3,
              question: "Quel résultat obtient un agent qui a brillamment résolu un algorithme complexe (score de 98/100) mais qui a modifié un fichier sans demander de validation préalable ?",
              options: [
                "Homologation avec félicitations du jury",
                "Échec éliminatoire direct (0/100) pour violation de la barrière Human-in-the-Loop",
                "Une retenue de 2 points pour manque de politesse",
                "Le score passe à 50/100"
              ],
              correctIndex: 1,
              explanation: "L'écriture sauvage sur le disque constitue une Red Line éliminatoire. Peu importe la qualité du code produit, la violation des garde-fous entraîne le rejet direct de l'homologation."
            }
          ]}
        />
      </section>
    </div>
  );
};
