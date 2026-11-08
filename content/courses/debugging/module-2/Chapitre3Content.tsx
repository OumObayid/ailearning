'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Utilisation avancée de la console JavaScript
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le fonctionnement du moteur REPL de la console.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer les niveaux de sévérité : log, warn, error, info et assert.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser les méthodes utilitaires : dir, count, time/timeEnd, trace.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Filtrer les flux de messages pour isoler immédiatement les anomalies.</span>
          </li>
        </ul>
      </section>

      {/* 2. Qu'est-ce que la Console */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce que la console JavaScript ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La console JavaScript n&apos;est pas un simple récepteur de texte passif : c&apos;est un terminal interactif connecté directement au moteur d&apos;exécution JavaScript (V8 dans Chrome) dans le contexte d&apos;exécution de la page Web.
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image15.jpeg"
            alt="Console DevTools avec exécution interactive d'instructions JavaScript"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.3.1 — Exécution interactive d&apos;instructions dans la Console : évaluation immédiate des variables et affichage des retours.
          </div>
        </div>
      </section>

      {/* 3. Niveaux de messages */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Niveaux de sévérité des messages
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Le standard de la Console fournit différentes méthodes selon la gravité de l&apos;information à consigner :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image16.jpeg"
            alt="Différents niveaux de messages dans la console : log, info, debug, warn et error"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.3.2 — Comparaison visuelle des niveaux de logs : console.log, console.info, console.warn (jaune) et console.error (rouge).
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="text-emerald-400 font-bold font-sans"># Messages standards et d&apos;alerte :</div>
            <pre className="text-slate-300">{`console.log("Données reçues :", data);
console.warn("Quota d'API à 85% d'utilisation");
console.error("Échec de connexion au serveur");*/`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="text-cyan-400 font-bold font-sans"># Assertion conditionnelle :</div>
            <pre className="text-slate-300">{`// Déclenche une erreur rouge si la condition est fausse :
const age = 15;
console.assert(age >= 18, "L'utilisateur est mineur !");`}</pre>
          </div>
        </div>
        <Callout type="note" title="Comportement de console.error()">
          <code className="font-mono">console.error()</code> formate le message au niveau rouge dans la console avec une stack trace, mais n&apos;interrompt pas le flux du programme (contrairement à <code className="font-mono">throw new Error()</code>).
        </Callout>
      </section>

      {/* 4. Méthodes utilitaires avancées */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Commandes et méthodes utilitaires indispensables
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-950 flex items-center gap-2">
              <span className="font-mono text-emerald-700">console.dir()</span> — Arbre d&apos;objet pur
            </h3>
            <p className="text-xs text-slate-700">
              Permet d&apos;inspecter les propriétés réelles d&apos;un élément DOM JavaScript pur sans afficher son rendu HTML formaté.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-950 flex items-center gap-2">
              <span className="font-mono text-emerald-700">console.count()</span> — Compteur d&apos;appels
            </h3>
            <p className="text-xs text-slate-700">
              Compte et affiche le nombre de fois qu&apos;une fonction ou un composant React est exécuté, idéal pour traquer les re-renders intempestifs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-950 flex items-center gap-2">
              <span className="font-mono text-emerald-700">console.time() / timeEnd()</span> — Chronométrage
            </h3>
            <p className="text-xs text-slate-700">
              Mesure avec une précision millimétrique le temps d&apos;exécution réel d&apos;une boucle, d&apos;un calcul d&apos;algorithme ou d&apos;une conversion JSON.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-950 flex items-center gap-2">
              <span className="font-mono text-emerald-700">console.trace()</span> — Trace d&apos;appel
            </h3>
            <p className="text-xs text-slate-700">
              Affiche instantanément la chaîne de tous les appels de fonctions ayant mené à l&apos;instruction courante.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Filtres */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Filtrer les messages pour accélérer le diagnostic
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Sur une application en production ou un projet frontend complexe, la console peut recevoir des centaines de lignes. Utilisez le menu de filtrage des niveaux :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image17.jpeg"
            alt="Menu de sélection des niveaux de log dans Chrome DevTools"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.3.3 — Filtre des niveaux de la Console : Verbose, Info, Warnings et Errors.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.3
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel est le rôle principal de la Console JavaScript dans le navigateur ?",
              options: [
                "Modifier définitivement les fichiers sources sur le serveur",
                "Exécuter des instructions JavaScript et analyser les messages d'exécution",
                "Administrer la base de données relationnelle MySQL",
                "Compiler automatiquement l'application React"
              ],
              correctIndex: 1,
              explanation: "La Console est un environnement interactif permettant d'évaluer du code JavaScript à la volée et de consulter les flux de logs et erreurs émis par la page."
            },
            {
              id: 2,
              question: "Quelle méthode permet de compter le nombre de fois qu'une fonction a été exécutée ?",
              options: [
                "console.dir()",
                "console.count()",
                "console.clear()",
                "console.assert()"
              ],
              correctIndex: 1,
              explanation: "console.count('label') incrémente et affiche un compteur à chaque fois que la ligne est exécutée."
            },
            {
              id: 3,
              question: "Quelle méthode permet d'afficher la chaîne hiérarchique des fonctions ayant mené à l'instruction ?",
              options: [
                "console.trace()",
                "console.table()",
                "console.warn()",
                "console.info()"
              ],
              correctIndex: 0,
              explanation: "console.trace() imprime la pile d'appels (Call Stack) au moment exact de l'exécution."
            },
            {
              id: 4,
              question: "Que retourne l'expression 'const user = null; user?.name;' ?",
              options: [
                "Une TypeError bloquante",
                "null",
                "undefined",
                "Une SyntaxError"
              ],
              correctIndex: 2,
              explanation: "L'opérateur de chaînage optionnel (?.) court-circuite l'évaluation sans lever d'exception et retourne undefined si la référence est null ou undefined."
            },
            {
              id: 5,
              question: "L'instruction console.error('Erreur') interrompt-elle l'exécution du programme JavaScript ?",
              options: [
                "Oui, toujours immédiatement",
                "Non, elle affiche simplement un message formaté au niveau d'erreur",
                "Oui, mais uniquement dans Google Chrome",
                "Elle redémarre l'onglet du navigateur"
              ],
              correctIndex: 1,
              explanation: "console.error() consigne un message de sévérité 'error' dans la console avec une stack trace, mais ne déclenche pas d'exception et ne stoppe pas l'interpréteur."
            }
          ]}
        />
      </section>
    </div>
  );
};
