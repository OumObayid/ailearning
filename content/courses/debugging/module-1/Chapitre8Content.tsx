'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-lime-200 bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider bg-lime-100/80 px-3 py-1 rounded-full border border-lime-300">
            <Icon name="bug" className="w-4 h-4 text-lime-800" />
            <span>Ingénierie du Débogage • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Lecture accessible : ~12 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere] mb-3">
          Chapitre 8 — Méthodologie professionnelle de diagnostic
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          Passer du bricolage anxiogène à la démarche scientifique d&apos;enquête : apprenez à formuler des hypothèses falsifiables, à manipuler les contrôles pas à pas de votre IDE, et à piloter une IA sans tomber dans ses hallucinations.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Adopter la méthode scientifique</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Maîtriser Step Over, Step Into et Call Stack</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Rédiger un Post-Mortem d&apos;ingénieur</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : L'APPRENTI SORCIER VS LE CHERCHEUR SCIENTIFIQUE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;Apprenti Sorcier vs L&apos;Ingénieur Scientifique
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-3">
            <h3 className="font-bold text-base text-rose-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-200 text-rose-900 font-bold text-xs flex items-center justify-center">❌</span>
              <span>L&apos;Apprenti Sorcier (Approche au pif)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Il voit une erreur ➔ Ouvre un fichier au hasard ➔ Modifie une ligne sans comprendre ➔ Relance l&apos;application en croisant les doigts ➔ Ça ne marche toujours pas ➔ Il stresse et réécrit tout le module.
            </p>
            <div className="p-2.5 bg-white rounded-xl border border-rose-200 text-xs text-rose-800 font-semibold">
              Résultat : Du code spaghetti, des régressions cachées et une perte de temps colossale.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 space-y-3">
            <h3 className="font-bold text-base text-emerald-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center">✅</span>
              <span>L&apos;Ingénieur Scientifique (Méthode rigoureuse)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Il observe le symptôme ➔ Isole la couche responsable (Front, Back, SQL) ➔ Émet une hypothèse vérifiable ➔ Réalise une expérience pour prouver l&apos;hypothèse ➔ Applique la correction minimale ➔ Valide par un test automatique.
            </p>
            <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
              Résultat : Zéro stress, une certitude mathématique et un système durablement consolidé.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LES 10 ÉTAPES DU PROTOCOLE UNIVERSEL D'INVESTIGATION
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Protocole des 10 étapes d&apos;investigation
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Ce protocole en 10 étapes est la boussole universelle utilisée dans les plus grands centres d&apos;ingénierie logicielle :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {[
            { num: '1', title: 'Observation', desc: 'Définir clairement la différence entre résultat attendu et observé.' },
            { num: '2', title: 'Collecte', desc: 'Extraire les logs horodatés, les versions logicielles et les traces HTTP.' },
            { num: '3', title: 'Reproduction', desc: 'Construire un scénario fiable qui déclenche le bug à 100% sur commande.' },
            { num: '4', title: 'Périmètre', desc: 'Mesurer qui est touché : tous les utilisateurs ou un cas particulier ?' },
            { num: '5', title: 'Hypothèses', desc: 'Formuler une explication logique et classer les causes possibles.' },
            { num: '6', title: 'Investigation', desc: 'Inspecter les variables au pas à pas dans VS Code ou DevTools.' },
            { num: '7', title: 'Cause racine', desc: 'Apporter la preuve technique indiscutable du défaut originel.' },
            { num: '8', title: 'Correctif', desc: 'Appliquer la modification chirurgicale minimale sans toucher au reste.' },
            { num: '9', title: 'Validation', desc: 'Faire passer un test automatique rouge au vert (non-régression).' },
            { num: '10', title: 'Rapport', desc: 'Documenter l\'incident pour que l\'équipe apprenne de l\'erreur (RCA).' },
          ].map((step) => (
            <div key={step.num} className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5 hover:border-lime-400 transition-colors">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-xs">{step.num}</span>
              <h3 className="font-bold text-sm text-slate-950">{step.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : DÉMYSTIFIER LES CONTRÔLES DU DÉBOGUEUR (STEP OVER, INTO, OUT)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            La Télécommande du Débogueur : Décryptage des boutons Step Over, Step Into et Call Stack
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans Chrome DevTools comme dans VS Code, la barre d&apos;outils du débogueur contient des icônes mystérieuses qui effraient souvent les débutants. Voici leur fonctionnement exact :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-slate-950">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-mono">↷</span>
              <span>Step Over (F10)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              <strong>« Avancer d&apos;un pas » :</strong> Exécute la ligne actuelle et s&apos;arrête à la ligne suivante dans le même fichier, sans entrer dans le détail des fonctions appelées.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-slate-950">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono">⤓</span>
              <span>Step Into (F11)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              <strong>« Plonger à l&apos;intérieur » :</strong> Si la ligne actuelle appelle une fonction personnalisée, le débogueur entre à l&apos;intérieur pour vous montrer sa toute première ligne.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-slate-950">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-mono">⤒</span>
              <span>Step Out (Shift+F11)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              <strong>« Remonter à la surface » :</strong> Finit d&apos;exécuter le reste de la fonction actuelle d&apos;un coup et s&apos;arrête juste après l&apos;appel, dans la fonction parente.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-slate-950">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-mono">▶</span>
              <span>Continue (F5)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              <strong>« Reprendre à pleine vitesse » :</strong> Relance l&apos;exécution normale du programme jusqu&apos;au prochain Breakpoint (ou jusqu&apos;à la fin si aucun autre point d&apos;arrêt n&apos;est croisé).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : LES 3 OUTILS D'INVESTIGATION SUR LE TERRAIN (IMAGES DU COURS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;arsenal d&apos;investigation en action : Chrome, VS Code et MySQL
          </h2>
        </div>

        {/* Image 16 : Chrome DevTools Step Debugging */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-black text-xs">CHROME SOURCES</span>
              <span>A. Débogage pas à pas dans le navigateur</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Frontend &amp; Closures</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Exécuter le code JavaScript de l&apos;interface ligne par ligne et surveiller le panneau <em>Scope</em> (portée des variables locales) :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image16.jpeg"
              alt="Exécution pas à pas et points d'arrêt dans l'onglet Sources de Chrome DevTools"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.16 — Contrôles d&apos;exécution pas à pas et inspection de l&apos;état des variables dans Chrome DevTools Sources.
            </div>
          </div>
        </div>

        {/* Image 17 : VS Code Debugging */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-black text-xs">VS CODE NODE</span>
              <span>B. Débogage du serveur Node.js / Express</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Backend &amp; Call Stack</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Figer le serveur Node.js sur une route d&apos;API pour inspecter les paramètres reçus dans l&apos;objet <code className="text-blue-700 font-mono">req.body</code> :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image17.jpeg"
              alt="Lancement d'une session de débogage Node.js avec console interactive dans VS Code"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.17 — Session de débogage Node.js sous VS Code : suivi des variables en mémoire et console d&apos;évaluation dynamique.
            </div>
          </div>
        </div>

        {/* Image 18 : MySQL Workbench */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs">MYSQL OUTPUT</span>
              <span>C. Analyse des requêtes et erreurs relationnelles</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Base de données</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Surveiller le panneau <em>Action Output</em> de MySQL pour voir le code d&apos;erreur exact, le temps de réponse en millisecondes et le nombre de lignes modifiées :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image18.jpeg"
              alt="Analyse des résultats et du panneau d'actions dans MySQL Workbench"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.18 — Exécution SQL dans MySQL Workbench : confirmation des schémas de table et traçabilité des opérations dans le panneau Output.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : COMMENT PILOTER UNE IA POUR LE DÉBOGAGE SANS RISQUE
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            Piloter un Agent IA de diagnostic comme un Pro (Prompt Engineering)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Les outils comme ChatGPT, Claude ou les agents intégrés dans votre éditeur (Google Antigravity) sont d&apos;une aide précieuse pour déchiffrer des messages d&apos;erreur cryptiques, à condition de savoir leur donner le bon cadre :
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-800 font-bold text-sm">
              <Icon name="x" className="w-4 h-4" />
              <span>❌ Le mauvais prompt du débutant (Piège à hallucinations)</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-rose-200 font-mono text-xs text-slate-700 italic">
              « Salut mon code marche pas : [colle 300 lignes en vrac]. Corrige tout stp. »
            </div>
            <p className="text-xs text-rose-800 font-medium">
              L&apos;IA ne connaît ni votre environnement, ni le résultat attendu. Elle risque de réécrire des fonctions entières, de supprimer des sécurités et d&apos;inventer des bibliothèques inexistantes !
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
              <Icon name="check" className="w-4 h-4" />
              <span>✅ Le prompt d&apos;ingénieur en 4 blocs (Ultra-efficace)</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-200 font-mono text-xs text-slate-800 space-y-1">
              <p><strong>1. Rôle :</strong> Tu es expert en Node.js, Express et MySQL.</p>
              <p><strong>2. Contexte :</strong> Route POST /api/orders renvoyant une 500.</p>
              <p><strong>3. Faits :</strong> Stack Trace : <code>Unknown column &apos;product_id&apos;</code>.</p>
              <p><strong>4. Consigne :</strong> Ne modifie aucun fichier. Propose 3 hypothèses ordonnées par probabilité et donne la commande SQL pour vérifier.</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 font-medium">
          🛡️ <strong>Avertissement Sécurité &amp; Données :</strong> Ne collez jamais de mots de passe, de clés secrètes d&apos;API Stripe, ou de vrais noms de clients dans une IA publique. Anonymisez toujours vos données au préalable (<code className="text-amber-900 font-bold font-mono">user_id = 42</code>, <code className="text-amber-900 font-bold font-mono">test@demo.com</code>).
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 : MODÈLE PROFESSIONNEL DE RAPPORT D'INCIDENT (POST-MORTEM)
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">6</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Rapport d&apos;Incident d&apos;Ingénieur (Post-Mortem / RCA)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans les équipes d&apos;élite, chaque anomalie critique donne lieu à un document synthétique appelé <em>Root Cause Analysis (RCA)</em> pour partager la connaissance et éviter que l&apos;erreur ne se reproduise :
        </p>

        <CodeBlock
          language="markdown"
          filename="RCA-BUG-305.md"
          code={`# RAPPORT D'INCIDENT TECHNIQUE (POST-MORTEM) — INC-305

**1. Résumé exécutif :**
L'API de création de commande a été indisponible pendant 25 minutes suite à une incohérence de nom de colonne SQL.

**2. Symptôme observé :**
Tous les appels POST /api/orders renvoyaient immédiatement une réponse HTTP 500.

**3. Déroulé chronologique de l'enquête :**
- 14h02 : Alerte de monitoring (taux d'erreurs 500 > 15%).
- 14h08 : Développeur assigné. Inspection des logs : ER_BAD_FIELD_ERROR: Unknown column 'product_id'.
- 14h14 : Cause racine identifiée : La migration SQL a nommé la colonne 'id_product', alors que le contrôleur Express écrivait 'product_id'.
- 14h20 : Correctif appliqué sur la branche fix/order-column-name.
- 14h27 : Validation des tests de non-régression et déploiement en production. Statut résolu.

**4. Cause racine (Root Cause) :**
Absence de validation de schéma unifiée (Zod/Prisma) entre le code serveur et la base de données.

**5. Actions préventives pour l'avenir :**
- Intégrer un linter SQL automatique dans la CI/CD GitHub Actions.
- Ajouter un test d'intégration automatisé qui valide la commande de bout en bout avant chaque déploiement.`}
        />
      </section>

      {/* =========================================================================
          SECTION 7 : CHECKLIST INTERACTIVE DE DIAGNOSTIC
         ========================================================================= */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <InteractiveChecklist
          title="Protocole d'Investigation et Diagnostic d'Incident en 10 Étapes"
          items={[
            "1. Comprendre et caractériser formellement l'anomalie (symptôme vs comportement attendu)",
            "2. Reproduire le comportement dans un environnement de test contrôlé",
            "3. Collecter les indices objectifs (logs serveurs, réponses HTTP brutes, stack traces)",
            "4. Formuler une première hypothèse technique testable",
            "5. Isoler la couche défaillante (Frontend React, API Express ou Base MySQL)",
            "6. Inspecter l'exécution dynamique (Breakpoints, Scope et Call Stack)",
            "7. Identifier la cause racine (Root Cause) avec preuves factuelles",
            "8. Concevoir et appliquer le correctif minimal ciblé",
            "9. Exécuter la suite de tests de non-régression et valider le scénario initial",
            "10. Rédiger le rapport d'incident ou Post-Mortem (RCA) pour l'équipe"
          ]}
        />
      </section>

      {/* =========================================================================
          SECTION 8 : SYNTHÈSE DES POINTS CLÉS
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">7</span>
          <h2 className="text-xl font-bold text-slate-950">
            Synthèse du Chapitre 8
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-teal-500/10 border-2 border-emerald-300 space-y-2 text-sm sm:text-base font-medium text-slate-900">
          <p>• <strong>Démarche scientifique :</strong> Remplacer les suppositions intuitives par des observations, des hypothèses et des preuves formelles.</p>
          <p>• <strong>Télécommande du débogueur :</strong> Utilisez <em>Step Over (F10)</em> pour avancer d&apos;une ligne, <em>Step Into (F11)</em> pour entrer dans une fonction, et <em>Continue (F5)</em> pour aller au breakpoint suivant.</p>
          <p>• <strong>Piloter l&apos;IA avec rigueur :</strong> Donnez-lui un rôle clair, collez la Stack Trace exacte, et demandez-lui d&apos;analyser avant de toucher au moindre code.</p>
          <p>• <strong>Le Post-Mortem :</strong> Transformer un incident désagréable en opportunité d&apos;apprentissage collectif grâce à un rapport d&apos;incident structuré.</p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — Méthodologie Professionnelle de Diagnostic"
          questions={[
            {
              id: 1,
              question: "Quelle est la toute première chose à faire lors d'une session de diagnostic professionnel ?",
              options: [
                "Modifier immédiatement le premier fichier source venu en espérant que ça remarche.",
                "Observer rigoureusement l'anomalie, définir le comportement attendu et collecter les logs et faits bruts.",
                "Désinstaller l'application et la réécrire depuis zéro.",
                "Éteindre l'ordinateur portable.",
              ],
              correctIndex: 1,
              explanation: "Exactement ! Collecter les faits bruts et comprendre le comportement attendu précède toujours la moindre modification de code.",
            },
            {
              id: 2,
              question: "Dans le débogueur de votre IDE, que fait la commande 'Step Over' (F10) ?",
              options: [
                "Elle supprime la ligne actuelle.",
                "Elle exécute la ligne actuelle et s'arrête à la ligne suivante dans le même fichier sans plonger dans la fonction appelée.",
                "Elle éteint le serveur.",
                "Elle ouvre le navigateur en plein écran.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! Step Over permet d'avancer d'un pas sans se perdre dans les détails internes de la fonction appelée.",
            },
            {
              id: 3,
              question: "Quelle est la différence entre 'Step Over' (F10) et 'Step Into' (F11) ?",
              options: [
                "Il n'y a aucune différence.",
                "Step Over passe à la ligne suivante, tandis que Step Into plonge à l'intérieur de la fonction appelée pour voir sa première instruction.",
                "Step Over marche sur Windows, Step Into sur Linux.",
                "Step Into supprime les variables locales.",
              ],
              correctIndex: 1,
              explanation: "Bravo ! Step Into est idéal pour inspecter les entrailles d'une fonction maison suspecte.",
            },
            {
              id: 4,
              question: "Quelle précaution de sécurité est INDISPENSABLE lorsque vous soumettez une Stack Trace à un assistant IA ?",
              options: [
                "Écrire en majuscules.",
                "Anonymiser les données sensibles : retirer clés API, tokens de connexion, mots de passe et données personnelles de clients.",
                "Ne jamais poser de questions techniques.",
                "Lancer l'IA uniquement la nuit.",
              ],
              correctIndex: 1,
              explanation: "Excellente réponse ! Ne transmettez jamais d'informations confidentielles ou de clés d'accès aux modèles d'IA publics.",
            },
            {
              id: 5,
              question: "Quel est l'objectif premier d'un rapport de diagnostic (Post-Mortem / RCA) en entreprise ?",
              options: [
                "Trouver un coupable pour le sanctionner publiquement.",
                "Documenter la cause racine et mettre en place des mesures préventives pour que ce bug ne se reproduise plus jamais.",
                "Remplir le disque dur du serveur.",
                "Ralentir le développement de l'équipe.",
              ],
              correctIndex: 1,
              explanation: "Tout à fait ! La culture de l'ingénierie moderne est 'blameless' : on analyse l'incident pour améliorer les processus et consolider l'architecture.",
            },
          ]}
        />
      </section>
    </div>
  );
};
