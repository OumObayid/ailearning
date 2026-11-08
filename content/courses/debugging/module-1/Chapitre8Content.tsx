'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Méthodologie professionnelle de diagnostic
        </h1>
      </div>

      {/* 1. Démarche professionnelle vs Débutant */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Démarche professionnelle vs Approche intuitive
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/50 border-2 border-rose-200 space-y-2">
            <h3 className="font-black text-base text-rose-950 flex items-center gap-2">
              <span>⚠️</span> L&apos;approche &quot;au hasard&quot; (Débutant)
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Constater l&apos;erreur ➔ Ouvrir le premier fichier venu ➔ Modifier quelques lignes au pif ➔ Relancer l&apos;app en espérant un miracle. Cette méthode engendre des effets de bord et masque les causes réelles.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/50 border-2 border-emerald-300 space-y-2">
            <h3 className="font-black text-base text-emerald-900 flex items-center gap-2">
              <Icon name="check-circle" className="w-5 h-5 text-emerald-700" />
              La démarche méthodique (Ingénieur)
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Observer ➔ Collecter les faits ➔ Reproduire ➔ Délimiter le périmètre ➔ Formuler des hypothèses ➔ Prouver techniquement ➔ Isoler la cause racine ➔ Valider par des tests.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 10 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Le protocole des 10 étapes d&apos;investigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            { num: '1', title: 'Observation', desc: 'Comportement attendu vs observé.' },
            { num: '2', title: 'Collecte', desc: 'Logs, versions, traces HTTP, erreurs.' },
            { num: '3', title: 'Reproduction', desc: 'Scénario déterministe et contrôlé.' },
            { num: '4', title: 'Périmètre', desc: 'Étendue des utilisateurs/environnements.' },
            { num: '5', title: 'Hypothèses', desc: 'Priorisation par probabilité et impact.' },
            { num: '6', title: 'Investigation', desc: 'Outils spécialisés (DevTools, VS Code).' },
            { num: '7', title: 'Cause racine', desc: 'Preuve irréfutable du défaut premier.' },
            { num: '8', title: 'Correctif', desc: 'Modification minimale, propre et ciblée.' },
            { num: '9', title: 'Validation', desc: 'Tests fonctionnels et de non-régression.' },
            { num: '10', title: 'Rapport', desc: 'Documentation formalisée du bug.' },
          ].map((step) => (
            <div key={step.num} className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-xs">{step.num}</span>
              <h3 className="font-black text-sm text-slate-950">{step.title}</h3>
              <p className="text-xs text-slate-600 font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Investigation avec Images 16, 17, 18 */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Déploiement des outils d&apos;investigation technique
        </h2>

        {/* Image 16 : Chrome DevTools Step Debugging */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">A. Investigation Frontend : Débogage pas à pas dans Chrome DevTools</h3>
          <p className="text-sm text-slate-700 font-medium">
            Exécuter le code ligne par ligne (Step Over, Step Into) et surveiller la portée des variables locales (Scope) :
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
              Figure 1.16 — Utilisation des contrôles d&apos;exécution et inspection des closures dans Chrome DevTools Sources.
            </div>
          </div>
        </div>

        {/* Image 17 : VS Code Debugging */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">B. Investigation Backend : Points d&apos;arrêt Node.js dans VS Code</h3>
          <p className="text-sm text-slate-700 font-medium">
            Suspendre le serveur Node.js sur une route Express pour observer les objets <code>req</code> et <code>res</code> :
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
              Figure 1.17 — Session de débogage Node.js sous VS Code : suivi des variables en mémoire et console de débogage active.
            </div>
          </div>
        </div>

        {/* Image 18 : MySQL Workbench Query Results */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">C. Investigation SQL : Analyse des requêtes et messages d&apos;action</h3>
          <p className="text-sm text-slate-700 font-medium">
            Valider la conformité des données et surveiller l&apos;Output Panel (durée, code d&apos;erreur, lignes affectées) :
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
              Figure 1.18 — Exécution SQL dans MySQL Workbench : confirmation des schémas de table et traçabilité des opérations.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Modèle de rapport d'incident */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Modèle professionnel de rapport de diagnostic (Bug Report)
        </h2>
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-300 font-mono text-xs sm:text-sm text-slate-800 space-y-3 overflow-x-auto">
          <div className="font-black text-base text-slate-950 pb-2 border-b">RAPPORT D&apos;INCIDENT TECHNIQUE — BUG-305</div>
          <div><strong className="text-slate-950">1. Titre :</strong> Échec de validation des commandes en production (HTTP 500)</div>
          <div><strong className="text-slate-950">2. Symptôme :</strong> L&apos;appel <code>POST /api/orders</code> échoue systématiquement avec un code HTTP 500.</div>
          <div><strong className="text-slate-950">3. Périmètre :</strong> Environnement de production, création de commandes multi-articles.</div>
          <div><strong className="text-slate-950">4. Reproduction :</strong> Créer un panier avec 2 articles ➔ Valider le paiement ➔ Erreur 500 immédiate.</div>
          <div><strong className="text-slate-950">5. Logs capturés :</strong> <code>ER_BAD_FIELD_ERROR: Unknown column &apos;product_id&apos; in &apos;field list&apos;</code></div>
          <div><strong className="text-slate-950">6. Cause racine :</strong> Incohérence de nom de colonne entre le contrôleur Express (<code>product_id</code>) et la table MySQL (<code>id_product</code>).</div>
          <div><strong className="text-slate-950">7. Correctif appliqué :</strong> Harmonisation du nom de champ dans la requête SQL et ajout de validation Zod.</div>
          <div><strong className="text-slate-950">8. Tests de validation :</strong> Commande valide (201), produit manquant (400), tests de non-régression passés.</div>
          <div><strong className="text-slate-950">9. Statut :</strong> Verified &amp; Closed.</div>
        </div>
      </section>

      {/* 5. Le débogage avec Agents IA */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Piloter un agent IA de diagnostic avec rigueur
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Les agents IA intégrés à l&apos;IDE (comme Google Antigravity) accélèrent l&apos;analyse des stack traces, à condition de les piloter avec des instructions strictes :
        </p>
        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <div className="text-emerald-400 font-bold"># Exemple de prompt professionnel pour agent de diagnostic :</div>
          <div className="text-slate-300">
            &quot;RÔLE : Tu es un ingénieur senior spécialisé en Node.js, Express et MySQL.<br />
            CONTEXTE : L&apos;API de paiement retourne une erreur HTTP 500.<br />
            CONSIGNES STRICTES :<br />
            1. Ne modifie aucun fichier et n&apos;invente aucune donnée.<br />
            2. Analyse les logs et la stack trace fournis.<br />
            3. Distingue clairement les faits observés des hypothèses.<br />
            4. Propose la cause racine probable et les commandes exactes pour la vérifier.&quot;
          </div>
        </div>
        <Callout type="warning" title="Sécurité et confidentialité des données">
          Ne transmettez jamais de clés API, de tokens JWT, de mots de passe ou de données personnelles réelles d&apos;utilisateurs aux modèles d&apos;IA. Utilisez toujours des extraits anonymisés.
        </Callout>
      </section>

      {/* Check-list Interactive de Diagnostic */}
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

      {/* 6. Synthèse & Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Méthodologie de Diagnostic"
          questions={[
            {
              id: 1,
              question: "Quelle est la première action à mener dans un diagnostic professionnel ?",
              options: [
                "Modifier immédiatement le code du serveur.",
                "Comprendre précisément le dysfonctionnement et collecter les informations objectives.",
                "Déployer une nouvelle version en production.",
              ],
              correctIndex: 1,
              explanation: "Collecter les faits et comprendre le comportement attendu précède toute action technique.",
            },
            {
              id: 2,
              question: "Pourquoi est-il utile de tester une API avec Postman ou curl avant d'accuser le frontend React ?",
              options: [
                "Pour isoler le backend et vérifier si l'erreur survient indépendamment de l'interface graphique.",
                "Pour remplacer la base de données.",
                "Pour formater le code JavaScript.",
              ],
              correctIndex: 0,
              explanation: "Isoler l'API permet de savoir si l'anomalie se situe côté client ou côté serveur.",
            },
            {
              id: 3,
              question: "Que doit contenir la section 'Cause racine' d'un rapport de diagnostic professionnel ?",
              options: [
                "La preuve factuelle de l'origine fondamentale qui a déclenché l'anomalie.",
                "Une simple capture d'écran sans explication.",
                "Le nom de l'ordinateur du développeur.",
              ],
              correctIndex: 0,
              explanation: "La cause racine doit être étayée par des preuves techniques formelles.",
            },
            {
              id: 4,
              question: "Quand peut-on considérer une correction logicielle comme définitivement validée ?",
              options: [
                "Dès que le développeur a sauvegardé son fichier.",
                "Lorsque des tests unitaires, fonctionnels et de non-régression confirment le bon fonctionnement.",
                "Dès que l'application a redémarré.",
              ],
              correctIndex: 1,
              explanation: "La validation exige la preuve par les tests que le problème est résolu sans effets secondaires.",
            },
            {
              id: 5,
              question: "Quel rôle doit jouer l'IA dans l'investigation et le débogage d'une application ?",
              options: [
                "Celui d'un assistant d'analyse rapide dont les hypothèses doivent être vérifiées par le développeur.",
                "Une autorité décisionnelle aveugle qui applique automatiquement les changements.",
                "Un remplaçant des bases de données.",
              ],
              correctIndex: 0,
              explanation: "L'IA propose et analyse ; le développeur vérifie, arbitre et demeure responsable du code.",
            },
          ]}
        />
      </section>
    </div>
  );
};
