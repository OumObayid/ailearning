'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Reproduire une erreur de manière contrôlée
        </h1>
      </div>

      {/* 1. Définition */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi la reproduction est-elle le premier devoir du débogueur ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La <strong>reproduction contrôlée</strong> (<em>Bug Reproduction</em>) consiste à provoquer volontairement et à volonté un dysfonctionnement en recréant exactement les conditions de son apparition.
        </p>
        <Callout type="info" title="Principe d'or du diagnostic">
          Tant qu&apos;une erreur n&apos;est pas reproductible de façon prévisible, toute tentative de modification du code s&apos;apparente à une loterie. On ne peut pas affirmer avoir corrigé un bug que l&apos;on ne sait pas déclencher.
        </Callout>
      </section>

      {/* 2. Typologie selon la reproductibilité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Typologie des erreurs selon leur reproductibilité
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <h3 className="font-black text-base text-slate-950">A. Erreurs déterministes (Systématiques)</h3>
            <p className="text-xs text-slate-700 font-medium">
              Se déclenchent à chaque exécution dès que les mêmes entrées sont fournies. Reproduction aisée et diagnostic direct.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-amber-300 bg-amber-50/30 space-y-1.5">
            <h3 className="font-black text-base text-amber-950">B. Erreurs intermittentes (Heisenbugs)</h3>
            <p className="text-xs text-slate-700 font-medium">
              N&apos;apparaissent que sporadiquement : concurrence asynchrone, double-clic utilisateur ou réseau instable.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <h3 className="font-black text-base text-slate-950">C. Erreurs dépendantes des données</h3>
            <p className="text-xs text-slate-700 font-medium">
              Fonctionnent parfaitement avec des jeux normaux, mais crashent sur des valeurs limites (nombres négatifs, apostrophes, emojis, <code>null</code>).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <h3 className="font-black text-base text-slate-950">D. Erreurs dépendantes de l&apos;environnement</h3>
            <p className="text-xs text-slate-700 font-medium">
              Fonctionnent sur la machine du développeur, mais échouent en staging ou production (versions de Node, configuration MySQL, variables d&apos;environnement).
            </p>
          </div>
        </div>
      </section>

      {/* 3. Protocole des 7 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La méthodologie de reproduction en 7 étapes
        </h2>
        <div className="space-y-3 font-medium text-sm text-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">1</span>
            <div><strong>Collecter les informations :</strong> Récupérer logs, payloads HTTP, version du navigateur et état de la session.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">2</span>
            <div><strong>Identifier l&apos;environnement :</strong> Figer la version de Node.js, le système d&apos;exploitation et le schéma de base de données.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">3</span>
            <div><strong>Définir les préconditions :</strong> Préparer l&apos;état initial exact (utilisateur connecté, panier pré-rempli, stock initial).</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">4</span>
            <div><strong>Décrire les étapes pas à pas :</strong> Rédiger les actions précises sans aucune omission de saisie.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">5</span>
            <div><strong>Exécuter le scénario :</strong> Suivre scrupuleusement la procédure sans improviser d&apos;actions annexes.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">6</span>
            <div><strong>Comparer le résultat :</strong> Établir la confrontation objective entre résultat attendu et résultat constaté.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black shrink-0">7</span>
            <div><strong>Isoler les variables :</strong> Réduire le test à sa plus simple expression (ne faire varier qu&apos;un paramètre à la fois).</div>
          </div>
        </div>
      </section>

      {/* 4. Outils de reproduction avec images 9, 10, 11, 12 */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Outils dédiés selon les couches d&apos;architecture
        </h2>

        {/* Image 9 : Chrome DevTools Network Waterfall */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">A. Reproduction Frontend &amp; Réseau (Chrome DevTools)</h3>
          <p className="text-sm text-slate-700 font-medium">
            Observer le comportement des requêtes HTTP, analyser les chronologies (Waterfall) et capturer les codes de statut :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image9.jpeg"
              alt="Analyse de la cascade de requêtes et statuts HTTP dans Chrome DevTools Network"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.9 — Vue détaillée du panneau Network de Chrome DevTools : statuts, types MIME et temps de réponse de chaque ressource.
            </div>
          </div>
        </div>

        {/* Image 10 : Postman */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">B. Reproduction d&apos;API &amp; Payloads HTTP (Postman)</h3>
          <p className="text-sm text-slate-700 font-medium">
            Rejouer des requêtes en faisant varier les paramètres de requête, les en-têtes d&apos;autorisation et les corps JSON :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image10.jpeg"
              alt="Formulation de requêtes de test avec paramètres dans Postman"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.10 — Isolation d&apos;un appel API dans Postman pour tester les cas limites (paramètres vides, types invalides).
            </div>
          </div>
        </div>

        {/* Image 11 : VS Code Debugger */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">C. Reproduction Backend &amp; Exécution pas à pas (VS Code)</h3>
          <p className="text-sm text-slate-700 font-medium">
            Positionner des points d&apos;arrêt conditionnels pour piéger les cas d&apos;anomalies rares :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image11.jpeg"
              alt="Session de débogage avec points d'arrêt et inspection de variables dans VS Code"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.11 — Contrôle de l&apos;exécution avec VS Code : pile d&apos;appels (Call Stack), variables locales et console de débogage.
            </div>
          </div>
        </div>

        {/* Image 12 : MySQL Workbench */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">D. Reproduction de contraintes SQL (MySQL Workbench)</h3>
          <p className="text-sm text-slate-700 font-medium">
            Exécuter les requêtes directement pour observer les retours du moteur relationnel :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image12.jpeg"
              alt="Exécution de requêtes et analyse des messages d'erreur dans MySQL Workbench"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.12 — Reproduction d&apos;erreurs SQL et vérification des contraintes d&apos;intégrité dans MySQL Workbench.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Travaux Pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Exercices pratiques de reproduction
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-amber-800">TP 1 • Erreur logique</span>
            <p className="text-xs text-slate-700 font-medium">
              Reproduction systématique d&apos;une mauvaise opération mathématique en comparant <code>price + quantity</code> vs <code>price * quantity</code>.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-purple-800">TP 2 • Erreur d&apos;exécution</span>
            <p className="text-xs text-slate-700 font-medium">
              Déclenchement délibéré d&apos;un crash en injectant <code>null</code> dans une fonction manipulant <code>user.name</code>.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-blue-800">TP 3 • Intégration API</span>
            <p className="text-xs text-slate-700 font-medium">
              Mise en évidence de la rupture de contrat entre un frontend envoyant <code>username</code> et un backend attendant <code>name</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Check-list Interactive de Reproduction */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <InteractiveChecklist
          title="Protocole de Reproduction Contrôlée en 7 Étapes"
          items={[
            "1. Isoler et documenter la version exacte de l'environnement (OS, Node.js, navigateur, commit Git)",
            "2. Collecter le jeu de données d'entrée minimal (payload JSON ou paramètres de requête exacts)",
            "3. Identifier l'action unitaire ou l'événement système déclencheur du bug",
            "4. Éliminer les facteurs tiers bruyants (vider le cache local, désactiver extensions, réinitialiser la session)",
            "5. Rejouer le scénario 3 fois consécutives pour confirmer le déterminisme à 100%",
            "6. Capturer les logs serveur horodatés et la trace réseau complète (DevTools / Postman)",
            "7. Rédiger un test automatisé rouge (Jest/Vitest) qui échoue de manière reproductible avant le correctif"
          ]}
        />
      </section>

      {/* 6. Synthèse & Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Reproduction Contrôlée"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif premier de la reproduction d'une erreur ?",
              options: [
                "Modifier immédiatement le code à la volée.",
                "Provoquer volontairement le dysfonctionnement pour comprendre avec certitude ses conditions d'apparition.",
                "Supprimer les alertes de la console.",
              ],
              correctIndex: 1,
              explanation: "Comprendre comment déclencher un problème est la condition indispensable pour le diagnostiquer et le résoudre.",
            },
            {
              id: 2,
              question: "Une erreur qui se reproduit à 100% à chaque appel avec les mêmes paramètres est dite :",
              options: ["Intermittente.", "Systématiquement reproductible (déterministe).", "Une erreur de réseau."],
              correctIndex: 1,
              explanation: "Les erreurs déterministes sont les plus directes à isoler car leur comportement est constant.",
            },
            {
              id: 3,
              question: "Pourquoi est-il crucial de ne faire varier qu'un seul facteur à la fois pendant les tests de reproduction ?",
              options: [
                "Pour savoir avec exactitude quel paramètre précis est la cause du déclenchement.",
                "Pour économiser des requêtes HTTP.",
                "Pour éviter d'utiliser des bases de données.",
              ],
              correctIndex: 0,
              explanation: "Isoler les variables permet de prouver la responsabilité du paramètre sans effet de bord masquant.",
            },
            {
              id: 4,
              question: "Quel outil est le plus adapté pour tester manuellement un endpoint HTTP avec des corps JSON invalides ?",
              options: ["Postman.", "Photoshop.", "Un tableur."],
              correctIndex: 0,
              explanation: "Postman permet de forger n'importe quelle requête HTTP et d'examiner la réponse brute du serveur.",
            },
            {
              id: 5,
              question: "Pourquoi écrit-on un test automatisé qui échoue immédiatement après avoir reproduit un bug ?",
              options: [
                "Pour créer un test de non-régression qui garantira que ce bug ne pourra plus jamais réapparaître.",
                "Pour supprimer le code de l'application.",
                "Pour ralentir le cycle de release.",
              ],
              correctIndex: 0,
              explanation: "Le test rouge validé par le correctif devient le garant permanent de la stabilité du code.",
            },
          ]}
        />
      </section>
    </div>
  );
};

