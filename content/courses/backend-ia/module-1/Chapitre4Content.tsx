'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { NodeMemoryEventLoopLab } from '@/components/interactive/NodeMemoryEventLoopLab';
import { Icon } from '@/components/common/Icon';
import { Callout } from '@/components/courses/Callout';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — Fondations Système</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Garbage Collector, fuites de mémoire et optimisation par Streams
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-700">
          Comprendre comment Node.js recycle sa mémoire vive, traquer les fuites avec Chrome DevTools et manipuler des fichiers volumineux avec les Streams.
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-semibold text-slate-950">
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre comment le moteur V8 nettoie automatiquement la mémoire sans intervention manuelle.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser l&apos;algorithme Mark-and-Sweep (Marquage, Balayage, Compactage).</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Traquer les fuites mémoire invisibles en comparant des Snapshots avec Chrome DevTools.</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 break-words">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Protéger la mémoire de votre API d&apos;IA contre les gros fichiers grâce aux <strong>Streams Node.js</strong>.</span>
          </div>
        </div>
      </section>

      {/* 2. Architecture des espaces mémoire V8 */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comment V8 organise-t-il la mémoire ?
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Pour éviter de ralentir votre serveur à chaque nettoyage, le moteur V8 divise la mémoire en compartiments selon l&apos;âge des objets :
        </p>

        {/* IMAGE 1 : Espaces V8 */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3 break-words">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-1/v8-generational-spaces.jpeg"
              alt="Architecture mémoire V8 : New Space Nursery et Old Space Tenured"
              width={900}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-slate-800">
            Figure 1.1 — Organisation générationnelle de la mémoire V8 : New Space (Nursery) et promotion vers l&apos;Old Space (Tenured).
          </p>
        </div>

        {/* Table responsive : desktop view */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border-2 border-slate-300">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300 text-slate-950 font-black">
                <th className="p-3.5">Zone mémoire</th>
                <th className="p-3.5">Rôle et fonctionnement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-semibold text-slate-900 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">New Space (La pouponnière)</td>
                <td className="p-3.5">C&apos;est ici que naissent tous les nouveaux objets. Cette zone est très petite (quelques Mo) et nettoyée à la vitesse de l&apos;éclair par le <em>Minor GC (Scavenger)</em>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Old Space (Les résidents durables)</td>
                <td className="p-3.5">Les objets qui ont survécu à plusieurs nettoyages y sont transférés. Elle est nettoyée moins souvent mais plus en profondeur par le <em>Major GC</em>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">RSS (Resident Set Size)</td>
                <td className="p-3.5">C&apos;est la totalité de la mémoire RAM physique louée par votre processus auprès de votre système d&apos;exploitation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards view */}
        <div className="sm:hidden grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">New Space (Nursery)</span>
            <p className="text-xs text-slate-800">Lieu de naissance des objets récents, nettoyé quasi instantanément.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">Old Space (Tenured)</span>
            <p className="text-xs text-slate-800">Héberge les objets longue durée (configurations, pools de connexions).</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1 break-words">
            <span className="font-bold text-indigo-700 text-sm">RSS (Resident Set Size)</span>
            <p className="text-xs text-slate-800">Empreinte mémoire totale occupée par Node.js dans la machine.</p>
          </div>
        </div>
      </section>

      {/* 3. Le Garbage Collector et Mark-and-Sweep */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. L&apos;algorithme Mark-and-Sweep (Le ramasse-miettes)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          En JavaScript, vous n&apos;avez pas besoin d&apos;écrire du code manuel pour détruire des variables. V8 emploie un robot de nettoyage interne suivant la méthode <strong>Mark-and-Sweep</strong> (Marquer et Balayer) :
        </p>

        {/* IMAGE 2 : Mark-and-Sweep */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3 break-words">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-1/mark-and-sweep-algorithm.jpeg"
              alt="Algorithme Mark and Sweep : objets racines, marquage et libération des objets orphelins"
              width={850}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-slate-800">
            Figure 1.2 — Fonctionnement du Mark-and-Sweep : parcours depuis les racines (Root Objects) et recyclage des zones orphelines.
          </p>
        </div>

        <Callout type="info" title="L'analogie du déménageur méticuleux">
          <p className="leading-relaxed">
            Pour comprendre intuitivement comment V8 sait ce qu&apos;il doit jeter ou garder :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1.5 font-semibold text-slate-900">
            <li><strong>Étape 1 — Le marquage (Mark) :</strong> Le déménageur part de la liste des pièces habitées (les variables actives). Il colle une gommette verte sur chaque carton relié à cette liste.</li>
            <li><strong>Étape 2 — Le balayage (Sweep) :</strong> Il parcourt tout l&apos;appartement. Tout carton qui ne possède pas de gommette verte est considéré comme un déchet abandonné et jeté à la poubelle.</li>
            <li><strong>Étape 3 — Le compactage (Compact) :</strong> Il regroupe les cartons restants contre le même mur pour libérer un grand espace vide d&apos;un seul tenant.</li>
          </ul>
        </Callout>

        {/* Max 2 cartes par ligne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5 break-words shadow-sm">
            <h3 className="text-base font-black text-indigo-950">1. Mark (Marquage)</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              V8 identifie les &quot;racines&quot; (variables globales, fonctions en cours d&apos;exécution) et marque comme vivants tous les objets accessibles.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5 break-words shadow-sm">
            <h3 className="text-base font-black text-indigo-950">2. Sweep (Balayage)</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Le moteur parcourt le Heap : tout objet orphelin sans marque est recyclé et son espace mémoire redevient libre.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4.5 space-y-1.5 break-words shadow-sm sm:col-span-2">
            <h3 className="text-base font-black text-indigo-950">3. Compact (Compactage)</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Les blocs de mémoire survivants sont regroupés pour éviter la fragmentation et accélérer les futures allocations.
            </p>
          </div>
        </div>
      </section>

      {/* Laboratoire interactif */}
      <NodeMemoryEventLoopLab />

      {/* 4. Diagnostiquer une fuite mémoire avec Chrome DevTools */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Détecter et diagnostiquer une fuite mémoire
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Une fuite de mémoire (<strong>Memory Leak</strong>) se reconnaît facilement sur un graphique : la mémoire grimpe marche après marche sans jamais redescendre, même après le passage du Garbage Collector.
        </p>

        {/* IMAGE 3 : Graphique de fuite mémoire */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3 break-words">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-1/memory-leak-progression-graph.jpeg"
              alt="Graphique de fuite mémoire : courbe ascendante de la mémoire vive au cours du temps"
              width={700}
              height={500}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-slate-800">
            Figure 1.3 — Profil caractéristique d&apos;une fuite mémoire : montée en escalier ininterrompue.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Comment trouver la ligne coupable avec Chrome DevTools ?
          </h3>
          <p className="text-base font-medium text-slate-800 leading-relaxed">
            Pour inspecter la mémoire de votre serveur Node.js avec les mêmes outils visuels que le navigateur :
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-white font-mono text-sm break-words">
            node --inspect server.js
          </div>

          <p className="text-base font-medium text-slate-800 leading-relaxed">
            Ouvrez <code className="font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-indigo-950">chrome://inspect</code> dans Google Chrome, cliquez sur <strong>Open dedicated DevTools for Node</strong>, puis prenez deux photos de la mémoire (<strong>Heap Snapshots</strong>) :
          </p>

          {/* IMAGE 4 : Heap Snapshot DevTools */}
          <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3 break-words">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
              <Image
                src="/images/cours/backend-ia/module-1/devtools-heap-snapshot.jpeg"
                alt="Chrome DevTools Memory Profiler : comparaison de deux Heap Snapshots avec Delta d'allocation"
                width={1000}
                height={700}
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="text-center text-xs sm:text-sm font-bold text-slate-800">
              Figure 1.4 — Comparaison de Snapshot : le tableau Delta isole précisément les objets accumulés entre deux moments.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Optimisation majeure pour le Backend IA : Les Streams */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Optimisation majeure pour le Backend IA : Les Streams
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Dans une application d&apos;IA moderne (RAG, analyse de PDF volumineux), vous devez manipuler des fichiers de 50 à 200 Mo. Charger tout le fichier en mémoire vive d&apos;un seul coup est une erreur fatale en production !
        </p>

        <Callout type="info" title="L'analogie du robinet d'eau">
          <p>
            Vouloir boire de l&apos;eau en renversant d&apos;un coup une cuve de 200 litres inonde toute la cuisine (saturation de la RAM). Utiliser un <strong>Stream</strong>, c&apos;est ouvrir un robinet et remplir un verre au fur et à mesure (morceaux de 64 Ko appelés <em>chunks</em>). Votre serveur ne consomme que quelques mégaoctets de RAM, même pour traiter une vidéo de 10 Go !
          </p>
        </Callout>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/50 p-5 space-y-2 break-words shadow-sm">
            <h3 className="text-base font-black text-rose-950">❌ Lecture brute synchrone (Danger)</h3>
            <div className="font-mono text-xs leading-relaxed text-rose-950 bg-white p-3 rounded-xl border border-rose-200 overflow-x-auto">
              <pre>{`// Dangereux : charge 100 Mo d'un coup en RAM
const fs = require("fs");

app.post("/indexer-doc", (req, res) => {
  const contenu = fs.readFileSync("gros_doc.pdf");
  // 10 requêtes simultanées = 1 Go de RAM saturée !
  res.send("Fait");
});`}</pre>
            </div>
            <p className="text-xs text-rose-800 font-semibold">
              Si 15 utilisateurs envoient un fichier en même temps, le serveur plante faute de RAM.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-5 space-y-2 break-words shadow-sm">
            <h3 className="text-base font-black text-emerald-950">✅ Lecture par flux (Streams)</h3>
            <div className="font-mono text-xs leading-relaxed text-emerald-950 bg-white p-3 rounded-xl border border-emerald-200 overflow-x-auto">
              <pre>{`// Recommandé : lecture fluide par petits paquets
const fs = require("fs");

app.post("/indexer-doc", (req, res) => {
  const flux = fs.createReadStream("gros_doc.pdf");
  flux.on("data", (morceau) => {
    // Traite 64 Ko à la fois pour l'IA
  });
  flux.on("end", () => res.json({ succes: true }));
});`}</pre>
            </div>
            <p className="text-xs text-emerald-800 font-semibold">
              L&apos;empreinte mémoire reste quasi nulle et parfaitement stable quelle que soit la taille du document.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Évaluation finale du Module 1 */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Évaluation finale de validation du Module 1
        </h2>

        <QuickQuiz
          title="Question 1 — Décision du Garbage Collector"
          question="Le Garbage Collector de V8 a-t-il le droit de supprimer un objet qui est encore présent dans un tableau accessible depuis une variable globale ?"
          options={[
            "Oui, après un délai d'inactivité de 30 secondes",
            "Non, tant qu'il existe un chemin d'accès depuis une variable racine vivante, l'objet est protégé contre la suppression",
            "Oui, si la mémoire du serveur dépasse 80%"
          ]}
          correctIndex={1}
          explanation="Le Garbage Collector garantit la sécurité de vos données : il a l'interdiction absolue de détruire un objet auquel votre code peut encore accéder."
        />

        <QuickQuiz
          title="Question 2 — Traitement de fichiers volumineux pour une IA"
          question="Votre API d'intelligence artificielle doit traiter 20 documents PDF de 80 Mo envoyés simultanément. Quelle approche d'architecture devez-vous adopter ?"
          options={[
            "Charger les 20 fichiers d'un coup dans des chaînes de caractères en mémoire",
            "Utiliser des Streams Node.js pour lire et envoyer les fichiers par morceaux (chunks) au fil de l'eau",
            "Créer 20 tableaux globaux distincts pour stocker les octets"
          ]}
          correctIndex={1}
          explanation="Les Streams permettent de traiter des flux de données avec une consommation de mémoire constante et minime, sans jamais saturer la RAM de votre serveur."
        />
      </section>

      {/* 7. Checklist de clôture du Module 1 */}
      <InteractiveChecklist
        title="7. Clôture officielle du Module 1 (Fondations Système)"
        items={[
          "Je comprends le découpage de la mémoire V8 (New Space, Old Space, RSS).",
          "Je sais expliquer le fonctionnement de l'algorithme Mark-and-Sweep.",
          "Je sais pourquoi les variables globales non purgées créent des fuites de mémoire.",
          "Je sais lancer un serveur avec node --inspect et analyser la mémoire avec Chrome DevTools.",
          "Je maîtrise le principe des Streams pour protéger la RAM face aux fichiers volumineux destinés à l'IA.",
          "J'ai validé l'ensemble des 4 chapitres de ce Module 1."
        ]}
      />
    </div>
  );
};
