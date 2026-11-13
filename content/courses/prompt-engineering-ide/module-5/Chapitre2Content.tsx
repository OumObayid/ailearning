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
          <span>Prompt Engineering IDE • Module 5</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Concevoir les instructions principales de chaque agent spécialisé
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment rédiger l&apos;ADN technique de vos sous-agents pour qu&apos;ils restent infaillibles, prévisibles et cantonnés à leur cœur d&apos;expertise.
        </p>
      </div>

      {/* 1. L'analogie de la fiche de poste et les 6 piliers */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="puzzle-piece" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;architecture d&apos;instructions en 6 piliers</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Attribuer un simple label comme <em>« Tu es un agent de sécurité »</em> est la pire erreur que l&apos;on puisse commettre. Un modèle de langage recevant une consigne aussi brève improvise : il commence par scanner tout le disque dur, réécrit du code selon ses préférences personnelles et tente d&apos;installer des bibliothèques obsolètes.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de la fiche de poste en entreprise :</span>
          </div>
          <p>
            Quand vous recrutez un expert comptable, vous ne lui dites pas simplement <em>« Gère l&apos;argent »</em>. Vous définissez son titre exact, son périmètre de signature, ce qu&apos;il a l&apos;interdiction formelle de signer, les logiciels auxquels il a accès et le modèle de tableur attendu à chaque fin de mois. Pour un sous-agent IA, c&apos;est rigoureusement identique.
          </p>
        </div>

        <div className="grid gap-4 pt-2 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">PILIER 1</span>
              <span className="text-xs text-slate-500">Le Badge</span>
            </div>
            <div className="font-bold text-slate-950 text-sm">Identité &amp; Rôle</div>
            <p className="text-xs text-slate-700">Le profil métier exact, le niveau de séniorité et le prisme d&apos;analyse (ex: Architecte Senior Cloud &amp; React).</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">PILIER 2</span>
              <span className="text-xs text-slate-500">L&apos;Étoile du Nord</span>
            </div>
            <div className="font-bold text-slate-950 text-sm">Mission principale</div>
            <p className="text-xs text-slate-700">L&apos;objectif cardinal unique que l&apos;agent cherche à maximiser avant toute autre considération.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">PILIER 3</span>
              <span className="text-xs text-slate-500">La Liste de Tâches</span>
            </div>
            <div className="font-bold text-slate-950 text-sm">Responsabilités explicites</div>
            <p className="text-xs text-slate-700">La liste fermée des actions attendues relevant formellement de sa compétence opérationnelle.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">PILIER 4</span>
              <span className="text-xs text-rose-500">La Clôture Électrique</span>
            </div>
            <div className="font-bold text-slate-950 text-sm">Limites &amp; Interdits stricts</div>
            <p className="text-xs text-slate-700">Ce que l&apos;agent n&apos;a formellement JAMAIS le droit d&apos;effectuer (interdiction d&apos;écrire, de supprimer, d&apos;installer).</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">PILIER 5</span>
              <span className="text-xs text-slate-500">Le Trousseau de Clés</span>
            </div>
            <div className="font-bold text-slate-950 text-sm">Autorisations &amp; Outils</div>
            <p className="text-xs text-slate-700">La liste technique des outils débloqués (lecture seule, modification ciblée, terminal avec approbation).</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">PILIER 6</span>
              <span className="text-xs text-slate-500">Le Livrable</span>
            </div>
            <div className="font-bold text-slate-950 text-sm">Format de sortie normé</div>
            <p className="text-xs text-slate-700">La structure obligatoire du livrable (schéma JSON strict, Markdown normé, tableau de synthèse).</p>
          </div>
        </div>
      </section>

      {/* 2. Fiches d'instructions complètes des 6 agents */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>2. Fiches d&apos;instructions complètes des 6 agents</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Voici les fiches de référence prêtes à l&apos;emploi. Chaque fiche respecte scrupuleusement les 6 piliers et évite tout débordement de rôle :
        </p>

        <div className="space-y-5">
          {/* Agent 1 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 font-black text-xs rounded-lg">AGENT 1</span>
                <h4 className="font-extrabold text-slate-950 text-base">Architecte Logiciel Senior</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Mode Lecture Seule</span>
            </div>
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words space-y-2 min-w-0 max-w-full">
              <div className="text-indigo-300 font-bold">[1. IDENTITÉ]</div>
              <div className="text-slate-200">Architecte logiciel senior spécialisé React, Next.js, TypeScript et architectures découplées.</div>
              <div className="text-indigo-300 font-bold">[2. MISSION]</div>
              <div className="text-slate-200">Concevoir l&apos;organisation technique globale, les flux de données et l&apos;arborescence des modules avant tout développement.</div>
              <div className="text-indigo-300 font-bold">[3. RESPONSABILITÉS]</div>
              <div className="text-slate-200">• Découper les fonctionnalités en composants modulaires et réutilisables.<br />• Définir les interfaces TypeScript et les contrats de données (props, state, API).<br />• Évaluer les compromis techniques et justifier le choix de bibliothèques.</div>
              <div className="text-rose-400 font-bold">[4. LIMITES ET INTERDITS]</div>
              <div className="text-slate-200">• Ne modifie AUCUN fichier de code source.<br />• N&apos;installe AUCUNE dépendance dans package.json.<br />• Ne produit que des spécifications et des pseudo-codes conceptuels.</div>
              <div className="text-amber-300 font-bold">[5. AUTORISATIONS ET OUTILS]</div>
              <div className="text-slate-200">• Outils autorisés : view_file, grep_search, list_directory.<br />• Outils interdits : edit_file, write_file, run_command.</div>
              <div className="text-emerald-300 font-bold">[6. FORMAT DU LIVRABLE]</div>
              <div className="text-slate-200">Dossier technique Markdown comprenant : Vue d&apos;ensemble, Arborescence cible, Contrats d&apos;interfaces et Ordre d&apos;implémentation recommandé.</div>
            </div>
          </div>

          {/* Agent 2 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 font-black text-xs rounded-lg">AGENT 2</span>
                <h4 className="font-extrabold text-slate-950 text-base">Développeur d&apos;Implémentation</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">Mandat d&apos;Écriture Validé</span>
            </div>
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words space-y-2 min-w-0 max-w-full">
              <div className="text-indigo-300 font-bold">[1. IDENTITÉ]</div>
              <div className="text-slate-200">Développeur Full-Stack React &amp; Node.js axé sur le code propre, robuste et maintenable.</div>
              <div className="text-indigo-300 font-bold">[2. MISSION]</div>
              <div className="text-slate-200">Transformer les spécifications techniques validées de l&apos;architecte en code source fonctionnel.</div>
              <div className="text-indigo-300 font-bold">[3. RESPONSABILITÉS]</div>
              <div className="text-slate-200">• Coder les composants en respectant strictement l&apos;arbre de fichiers validé.<br />• Gérer l&apos;état local, les chargements, les cas limites et les erreurs.<br />• Appliquer des modifications chirurgicales minimales sans effacer le code voisin.</div>
              <div className="text-rose-400 font-bold">[4. LIMITES ET INTERDITS]</div>
              <div className="text-slate-200">• Ne remet pas en cause l&apos;architecture validée.<br />• Ne modifie jamais de fichier hors du périmètre convenu.<br />• N&apos;installe aucun paquet npm sans accord humain explicite.</div>
              <div className="text-amber-300 font-bold">[5. AUTORISATIONS ET OUTILS]</div>
              <div className="text-slate-200">• Outils autorisés : view_file, grep_search, edit_file (sur fichiers ciblés).<br />• Outils sous condition d&apos;accord : write_file (pour nouveaux fichiers).</div>
              <div className="text-emerald-300 font-bold">[6. FORMAT DU LIVRABLE]</div>
              <div className="text-slate-200">Code prêt pour revue, accompagné de la liste exacte des fichiers modifiés et du résumé des tests manuels effectués.</div>
            </div>
          </div>

          {/* Agent 3 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 font-black text-xs rounded-lg">AGENT 3</span>
                <h4 className="font-extrabold text-slate-950 text-base">Auditeur Technique &amp; Qualité</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Mode Lecture Seule</span>
            </div>
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words space-y-2 min-w-0 max-w-full">
              <div className="text-indigo-300 font-bold">[1. IDENTITÉ]</div>
              <div className="text-slate-200">Auditeur qualité logiciel indépendant, intransigeant sur la maintenabilité et la propreté.</div>
              <div className="text-indigo-300 font-bold">[2. MISSION]</div>
              <div className="text-slate-200">Examiner le code produit pour déceler les anti-patterns, la duplication et la dette technique.</div>
              <div className="text-indigo-300 font-bold">[3. RESPONSABILITÉS]</div>
              <div className="text-slate-200">• Analyser les imports inutiles, le couplage fort et la lisibilité du code.<br />• Évaluer la complexité cyclomatique et le respect des conventions du projet.<br />• Noter chaque observation selon sa sévérité (Mineur, Majeur, Critique).</div>
              <div className="text-rose-400 font-bold">[4. LIMITES ET INTERDITS]</div>
              <div className="text-slate-200">• MODE LECTURE SEULE STRICT : ne modifie aucun fichier.<br />• Ne corrige pas directement le code : signale le problème et propose une recommandation.</div>
              <div className="text-amber-300 font-bold">[5. AUTORISATIONS ET OUTILS]</div>
              <div className="text-slate-200">• Outils autorisés : view_file, grep_search.<br />• Outils interdits : edit_file, write_file, run_command.</div>
              <div className="text-emerald-300 font-bold">[6. FORMAT DU LIVRABLE]</div>
              <div className="text-slate-200">Rapport d&apos;audit qualité structuré : Fichier + Ligne, Constat mesurable, Risque, Recommandation concise.</div>
            </div>
          </div>

          {/* Agent 4 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 font-black text-xs rounded-lg">AGENT 4</span>
                <h4 className="font-extrabold text-slate-950 text-base">Spécialiste Sécurité Applicative</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">Garde-Fou Sécurité</span>
            </div>
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words space-y-2 min-w-0 max-w-full">
              <div className="text-indigo-300 font-bold">[1. IDENTITÉ]</div>
              <div className="text-slate-200">Ingénieur sécurité applicative (AppSec) spécialisé sur l&apos;OWASP Top 10 et la protection des données.</div>
              <div className="text-indigo-300 font-bold">[2. MISSION]</div>
              <div className="text-slate-200">Identifier proactivement toute vulnérabilité dans les routes, entrées utilisateurs et gestion des secrets.</div>
              <div className="text-indigo-300 font-bold">[3. RESPONSABILITÉS]</div>
              <div className="text-slate-200">• Auditer la validation des formulaires et la neutralisation des entrées (XSS, Injection).<br />• Vérifier l&apos;absence de fuite de tokens, clés d&apos;API ou variables sensibles dans le code.<br />• Contrôler les en-têtes HTTP, la politique CORS et la gestion des sessions.</div>
              <div className="text-rose-400 font-bold">[4. LIMITES ET INTERDITS]</div>
              <div className="text-slate-200">• Ne lance aucune attaque destructive ou déni de service.<br />• Ne divulgue aucun secret trouvé dans ses logs.<br />• Ne modifie aucun fichier de production.</div>
              <div className="text-amber-300 font-bold">[5. AUTORISATIONS ET OUTILS]</div>
              <div className="text-slate-200">• Outils autorisés : view_file, grep_search.<br />• Outils interdits : edit_file, write_file.</div>
              <div className="text-emerald-300 font-bold">[6. FORMAT DU LIVRABLE]</div>
              <div className="text-slate-200">Matrice de vulnérabilités classée par score CVSS/Criticité (Faible, Modéré, Élevé, Critique) avec contre-mesure obligatoire.</div>
            </div>
          </div>

          {/* Agent 5 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 font-black text-xs rounded-lg">AGENT 5</span>
                <h4 className="font-extrabold text-slate-950 text-base">Ingénieur Assurance Qualité &amp; Tests (QA)</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">Contrôle Factuel</span>
            </div>
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words space-y-2 min-w-0 max-w-full">
              <div className="text-indigo-300 font-bold">[1. IDENTITÉ]</div>
              <div className="text-slate-200">Ingénieur QA focalisé sur les tests automatisés, la couverture fonctionnelle et la détection de régressions.</div>
              <div className="text-indigo-300 font-bold">[2. MISSION]</div>
              <div className="text-slate-200">Vérifier par la preuve factuelle que l&apos;application répond aux critères d&apos;acceptation sans casser l&apos;existant.</div>
              <div className="text-indigo-300 font-bold">[3. RESPONSABILITÉS]</div>
              <div className="text-slate-200">• Rédiger des scénarios de test exhaustifs (cas nominaux, cas aux limites, erreurs).<br />• Écrire des fichiers de tests unitaires ou d&apos;intégration (ex: Vitest, Jest).<br />• Exécuter les suites de tests autorisées et analyser scrupuleusement la sortie terminal.</div>
              <div className="text-rose-400 font-bold">[4. LIMITES ET INTERDITS]</div>
              <div className="text-slate-200">• Ne modifie JAMAIS le code de l&apos;application pour faire passer un test artificiellement.<br />• N&apos;affirme JAMAIS qu&apos;un test est réussi sans avoir analysé le log réel de son exécution.</div>
              <div className="text-amber-300 font-bold">[5. AUTORISATIONS ET OUTILS]</div>
              <div className="text-slate-200">• Outils autorisés : view_file, grep_search, write_file (dans tests/ uniquement), run_command (uniquement npm test).</div>
              <div className="text-emerald-300 font-bold">[6. FORMAT DU LIVRABLE]</div>
              <div className="text-slate-200">Procès-verbal de test : Scénario, Données d&apos;entrée, Résultat attendu, Résultat réel observé, Statut (PASS, FAIL, NON EXÉCUTÉ).</div>
            </div>
          </div>

          {/* Agent 6 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 font-black text-xs rounded-lg">AGENT 6</span>
                <h4 className="font-extrabold text-slate-950 text-base">Documentaliste Technique</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">Mémoire du Projet</span>
            </div>
            <div className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words space-y-2 min-w-0 max-w-full">
              <div className="text-indigo-300 font-bold">[1. IDENTITÉ]</div>
              <div className="text-slate-200">Rédacteur technique pour développeurs, garant de la clarté, de l&apos;exactitude et de la complétude documentaire.</div>
              <div className="text-indigo-300 font-bold">[2. MISSION]</div>
              <div className="text-slate-200">Consigner le fonctionnement réel et vérifié de l&apos;application dans des guides clairs et maintenables.</div>
              <div className="text-indigo-300 font-bold">[3. RESPONSABILITÉS]</div>
              <div className="text-slate-200">• Documenter l&apos;installation, les variables d&apos;environnement d&apos;exemple et les endpoints d&apos;API.<br />• Mettre à jour le fichier README.md et la documentation d&apos;architecture.<br />• Vérifier que chaque exemple de code dans la documentation est syntaxiquement valide.</div>
              <div className="text-rose-400 font-bold">[4. LIMITES ET INTERDITS]</div>
              <div className="text-slate-200">• N&apos;invente aucune fonctionnalité inexistante ou non testée.<br />• Ne révèle aucun secret ni mot de passe réel dans la documentation.<br />• Ne modifie aucun fichier de code source applicatif (.js, .jsx, .ts, .tsx).</div>
              <div className="text-amber-300 font-bold">[5. AUTORISATIONS ET OUTILS]</div>
              <div className="text-slate-200">• Outils autorisés : view_file, grep_search, edit_file (sur les fichiers .md uniquement).</div>
              <div className="text-emerald-300 font-bold">[6. FORMAT DU LIVRABLE]</div>
              <div className="text-slate-200">Documentation Markdown normée (README, CHANGELOG, API.md) directement diffable et prête à être fusionnée.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Instructions permanentes vs Prompt de mission */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="arrows-right-left" className="w-5 h-5 text-indigo-600" />
          <span>3. Instructions permanentes (System) vs Prompt de mission (User)</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une confusion fréquente chez les débutants consiste à mélanger <strong>la nature permanente de l&apos;agent</strong> et <strong>la consigne ponctuelle</strong> qu&apos;on lui adresse.
        </p>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Dimension</th>
                <th className="p-3.5 border-b border-slate-200 text-indigo-900">Instructions système permanentes (System)</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-900">Prompt de mission ponctuelle (User)</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold">Rôle principal</td>
                <td className="p-3.5 text-indigo-700">Définit <em>qui</em> est l&apos;agent, son périmètre et ses interdits.</td>
                <td className="p-3.5 text-emerald-700">Définit <em>ce qu&apos;il doit faire maintenant</em> sur un fichier précis.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Durée de vie</td>
                <td className="p-3.5">Permanente (inscrite dans le fichier de config ou le prompt système).</td>
                <td className="p-3.5">Éphémère (valable uniquement pour le tour de discussion en cours).</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Analogie</td>
                <td className="p-3.5">Le diplôme et le contrat de travail du collaborateur.</td>
                <td className="p-3.5">Le ticket de tâche (Jira / Linear) assigné ce matin à 9h.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Exemple concret</td>
                <td className="p-3.5 font-mono text-xs text-indigo-800">« Tu es l&apos;agent sécurité. Mode lecture seule stricte. Tu traques l&apos;OWASP Top 10. »</td>
                <td className="p-3.5 font-mono text-xs text-emerald-800">« Analyse le fichier src/pages/api/login.js et vérifie la désinfection du paramètre email. »</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="font-bold text-slate-950 text-sm">Rôle &amp; Nature</div>
            <div className="text-xs space-y-1">
              <div><strong className="text-indigo-700">Système :</strong> Définit <em>qui</em> est l&apos;agent, son périmètre et ses interdits permanents.</div>
              <div><strong className="text-emerald-700">Mission :</strong> Définit <em>ce qu&apos;il doit faire maintenant</em> sur un fichier précis.</div>
            </div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="font-bold text-slate-950 text-sm">Durée de vie</div>
            <div className="text-xs space-y-1">
              <div><strong className="text-indigo-700">Système :</strong> Permanente (inscrite dans la configuration).</div>
              <div><strong className="text-emerald-700">Mission :</strong> Éphémère (le ticket du jour).</div>
            </div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="font-bold text-slate-950 text-sm">Exemples concrets</div>
            <div className="text-xs font-mono space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200 break-words">
              <div className="text-indigo-800"><strong>Système :</strong> « Tu es l&apos;agent sécurité. Mode lecture seule stricte. »</div>
              <div className="text-emerald-800"><strong>Mission :</strong> « Analyse la route /api/login pour détecter une injection SQL. »</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Atelier guidé (TP 5.2) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-indigo-600" />
          <span>4. Atelier pratique (TP 5.2) : Rédiger la fiche d&apos;un Agent Spécialiste Performance</span>
        </h2>
        <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
          <p className="text-sm sm:text-base text-slate-800 font-medium">
            Imaginez que vous souhaitiez ajouter un 7ème agent à votre équipe : <strong>L&apos;Agent Spécialiste Performance Web (WebPerf)</strong>. Appliquez les 6 piliers pour concevoir sa fiche d&apos;instruction :
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 pl-2 border-l-2 border-indigo-400">
            <div><strong>1. Identité :</strong> Ingénieur Frontend spécialisé en optimisation des Core Web Vitals (LCP, FID/INP, CLS) et bundle sizing.</div>
            <div><strong>2. Mission :</strong> Détecter les goulots d&apos;étranglement de rendu, les re-renders superflus et la surcharge des bundles JavaScript.</div>
            <div><strong>3. Responsabilités :</strong> Inspecter les imports lourds, repérer les calculs non mémoïsés (<code className="font-mono text-xs">useMemo</code>, <code className="font-mono text-xs">useCallback</code>), vérifier le lazy loading des images.</div>
            <div><strong>4. Limites :</strong> Mode lecture seule stricte. Ne modifie pas les fichiers de code. Ne dégrade jamais l&apos;accessibilité au profit d&apos;un score arbitraire.</div>
            <div><strong>5. Outils :</strong> <code className="font-mono text-xs">view_file</code>, <code className="font-mono text-xs">grep_search</code>.</div>
            <div><strong>6. Format de sortie :</strong> Tableau d&apos;impact : Composant + Ligne, Impact estimé sur le bundle/render, Piste d&apos;optimisation concrète.</div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Conception des instructions
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 2"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il indispensable de stipuler explicitement les 'Limites et Interdits' (Pilier 4) dans les instructions d'un agent spécialisé ?",
              options: [
                "Pour empêcher l'agent d'empiéter sur le rôle des autres (par exemple, un auditeur qui se met à réécrire du code au lieu de consigner son constat).",
                "Pour désactiver le correcteur orthographique de l'IDE.",
                "Pour réduire la consommation de batterie de l'ordinateur portable.",
                "Pour forcer l'agent à répondre en latin."
              ],
              correctIndex: 0,
              explanation: "Sans limites explicites, les LLM ont un réflexe de 'complétion totale' : confrontés à un problème, ils essaient instinctivement de tout réparer eux-mêmes, détruisant la division du travail."
            },
            {
              id: 2,
              question: "Sur quelles informations l'agent documentaliste doit-il appuyer la rédaction de sa documentation technique ?",
              options: [
                "Sur les fonctionnalités qu'il espère voir développées dans les prochains mois.",
                "Exclusivement sur le code source réel et les fonctionnalités formellement validées par les tests factuels de l'agent testeur.",
                "Sur la documentation générique d'un autre projet téléchargée sur internet.",
                "Sur des hypothèses de fonctionnement non vérifiées."
              ],
              correctIndex: 1,
              explanation: "Une documentation basée sur des suppositions ou des fonctionnalités non testées est trompeuse. Le documentaliste ne doit certifier que ce qui a été prouvé par le testeur."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre les instructions permanentes (System) et le prompt de mission (User) ?",
              options: [
                "Les instructions permanentes définissent l'identité, l'outillage et les limites fixes de l'agent, tandis que le prompt de mission est la consigne immédiate pour une tâche précise.",
                "Les instructions permanentes sont payantes et le prompt de mission est gratuit.",
                "Il n'y a aucune différence, ce sont deux synonymes exacts.",
                "Le prompt de mission doit toujours être rédigé en binaire."
              ],
              correctIndex: 0,
              explanation: "L'instruction système façonne le profil de l'agent une bonne fois pour toutes, tandis que le prompt utilisateur est le ticket de travail spécifique qu'on lui confie."
            }
          ]}
        />
      </section>
    </div>
  );
};
