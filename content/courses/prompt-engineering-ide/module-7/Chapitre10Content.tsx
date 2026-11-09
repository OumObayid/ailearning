'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Optimiser les instructions principales d&apos;un agent
        </h1>
      </div>

      {/* 1. L'architecture en 8 sections */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. L&apos;Architecture Universelle en 8 sections d&apos;un Agent IA
        </h2>
        <p className="text-slate-700">
          Une instruction principale de niveau professionnel ne doit jamais être un bloc monolithique d&apos;interdictions. Elle s&apos;articule autour de 8 compartiments étanches :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">1. Identité et Rôle</span>
            <p className="text-slate-600">Qui est l&apos;agent ? Quel est son niveau de séniorité et son périmètre métier ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">2. Mission Principale</span>
            <p className="text-slate-600">Quel objectif permanent doit-il poursuivre pour assister l&apos;humain ?</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">3. Périmètre Autorisé</span>
            <p className="text-slate-600">Dossiers et fichiers accessibles, interdiction formelle des répertoires parents.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">4. Permissions et Interdictions</span>
            <p className="text-slate-600">Lecture seule par défaut, sanctuarisation des secrets <code>.env</code>, approbation HITL.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">5. Méthode de Travail</span>
            <p className="text-slate-600">Cycle logique : Cadrage → Analyse → Conception → Proposition Diff → Exécution.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">6. Fiabilité et Preuves</span>
            <p className="text-slate-600">Zéro hallucination, distinction faits / hypothèses, vérité des tests exécutés.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">7. Gestion des Erreurs</span>
            <p className="text-slate-600">Comportement en cas de blocage ou d&apos;information manquante.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-amber-800">8. Format de Sortie &amp; Fin</span>
            <p className="text-slate-600">Canevas de réponse obligatoire et critères de validation Definition of Done.</p>
          </div>
        </div>
      </section>

      {/* 2. Hiérarchie des priorités */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Hiérarchie explicite de résolution des contradictions
        </h2>
        <p className="text-slate-700">
          Lorsqu&apos;une demande utilisateur entre en tension avec une règle de sécurité, l&apos;agent doit appliquer cette échelle de priorité inviolable :
        </p>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-rose-950">PRIORITÉ 1 — Sécurité absolue &amp; Confinement du périmètre</span>
            <span className="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded font-bold">Non négociable</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-amber-950">PRIORITÉ 2 — Permissions explicites accordées par l&apos;utilisateur</span>
            <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">Validation requise</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-blue-950">PRIORITÉ 3 — Mission fonctionnelle courante</span>
            <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-bold">Exécution dans les limites</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-slate-800">PRIORITÉ 4 — Esthétique et format de restitution</span>
            <span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">Mise en forme</span>
          </div>
        </div>
      </section>

      {/* 3. Le Template Réutilisable */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Modèle universel prêt à l&apos;emploi pour Google Antigravity
        </h2>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-2 leading-relaxed">
          <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
            # =====================================================================<br />
            # INSTRUCTIONS PRINCIPALES UNIVERSELLES — AGENT OPTIMISÉ<br />
            # =====================================================================
          </div>
          <p className="text-emerald-400">1. IDENTITÉ : Tu es un agent expert en analyse et assistance technique dans Google Antigravity.</p>
          <p className="text-emerald-400">2. PÉRIMÈTRE : Travaille exclusivement sur les fichiers explicitement fournis ou autorisés. Aucun accès aux dossiers parents (&quot;..&quot;).</p>
          <p className="text-emerald-400">3. PERMISSIONS : Mode lecture seule par défaut. Aucune création, modification ou suppression de fichier sans présentation préalable d&apos;un diff et accord explicite. Zéro accès aux fichiers .env.</p>
          <p className="text-emerald-400">4. FIABILITÉ : Ne présente jamais une supposition comme un fait. Chaque affirmation technique doit citer sa preuve dans le code. Distingue formellement faits, hypothèses et inconnues.</p>
          <p className="text-emerald-400">5. OUTILS &amp; TESTS : N&apos;annonce aucun test réussi sans l&apos;avoir exécuté. N&apos;exécute aucune commande terminal sans validation préalable.</p>
          <p className="text-emerald-400">6. GESTION DES MANQUES : Si une donnée est manquante, déclare ton incapacité à vérifier plutôt que d&apos;inventer.</p>
          <p className="text-emerald-400">7. RÈGLE D&apos;OR : En cas de doute sur le périmètre ou une autorisation, arrête l&apos;action et demande une clarification.</p>
        </div>
      </section>

      {/* 4. TP Final d'homologation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Travaux Pratiques Finaux : Audit et Homologation sur 100 points
        </h2>
        <p className="text-slate-700 text-sm">
          Pour valider le Module 7, vous soumettez les instructions initiales d&apos;un agent développeur à un audit complet sur 7 critères d&apos;évaluation :
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Critère d&apos;homologation</th>
                <th className="p-3">Pondération</th>
                <th className="p-3">Condition d&apos;attribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">Détection des ambiguïtés</td>
                <td className="p-3 font-mono font-bold text-amber-700">15 pts</td>
                <td className="p-3">Identification de tous les termes flous (&quot;améliore&quot;, &quot;fichiers nécessaires&quot;)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Détection des contradictions</td>
                <td className="p-3 font-mono font-bold text-amber-700">15 pts</td>
                <td className="p-3">Résolution du conflit entre rapidité et rigueur</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Analyse des permissions (PoLP)</td>
                <td className="p-3 font-mono font-bold text-amber-700">15 pts</td>
                <td className="p-3">Établissement du mode lecture seule strict</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Respect du périmètre</td>
                <td className="p-3 font-mono font-bold text-amber-700">15 pts</td>
                <td className="p-3">Confinement étanche sans exploration sauvage</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Qualité des instructions optimisées</td>
                <td className="p-3 font-mono font-bold text-amber-700">20 pts</td>
                <td className="p-3">Respect de l&apos;architecture en 8 sections</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Gestion des hallucinations</td>
                <td className="p-3 font-mono font-bold text-amber-700">10 pts</td>
                <td className="p-3">Obligation de preuve et déclaration des inconnues</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Comparaison et justification</td>
                <td className="p-3 font-mono font-bold text-amber-700">10 pts</td>
                <td className="p-3">Démonstration chiffrée de la supériorité de la v2.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="success" title="Félicitations pour l'achèvement du Module 7 !">
          Vous maîtrisez désormais le cycle complet de pilotage d&apos;un agent IA dans les IDE : du diagnostic de la cause racine à la rédaction d&apos;instructions infaillibles, en passant par les grilles d&apos;évaluation et la mesure de conformité technique.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation finale du Module 7
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle règle prévaut en priorité absolue lorsqu'une demande utilisateur entre en conflit avec une consigne de sécurité ?",
              options: [
                "La demande de l'utilisateur prime toujours sur la sécurité",
                "La sécurité absolue et le confinement du périmètre priment sur toute autre considération",
                "L'agent doit lancer une pièce à pile ou face",
                "L'agent doit fermer le navigateur web"
              ],
              correctIndex: 1,
              explanation: "La sécurité et l'intégrité de l'environnement du développeur priment systématiquement sur la complétion d'une tâche fonctionnelle."
            },
            {
              id: 2,
              question: "Pourquoi est-il conseillé de numéroter les versions de ses instructions principales (v1.0, v1.1, v2.0) ?",
              options: [
                "Pour faire joli dans le dépôt Git",
                "Pour assurer la traçabilité des modifications, faciliter les tests comparatifs A/B et prévenir les régressions",
                "Parce que Next.js l'exige au moment du build",
                "Pour masquer les erreurs passées"
              ],
              correctIndex: 1,
              explanation: "Le versionnage rigoureux des prompts permet de savoir exactement quelle correction a résolu quel dysfonctionnement au fil du temps."
            }
          ]}
        />
      </section>
    </div>
  );
};

