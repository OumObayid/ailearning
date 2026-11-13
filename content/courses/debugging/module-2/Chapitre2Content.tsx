'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type DevToolsTab = 'elements' | 'console' | 'network' | 'application';

export const Chapitre2Content: React.FC = () => {
  // State for Interactive Lab
  const [activeTab, setActiveTab] = useState<DevToolsTab>('elements');

  // Elements interactive state
  const [buttonPadding, setButtonPadding] = useState<'tight' | 'spacious'>('tight');
  const [buttonBg, setButtonBg] = useState<'buggy' | 'fixed'>('buggy');
  const [pointerEvents, setPointerEvents] = useState<'none' | 'auto'>('none');

  // Console interactive state
  const [consoleOutput, setConsoleOutput] = useState<string>(
    '// Cliquez sur une commande ci-dessous pour l\'exécuter dans la console simulée...'
  );

  // Network interactive state
  const [networkSubTab, setNetworkSubTab] = useState<'headers' | 'payload' | 'response'>('headers');

  // Application interactive state
  const [tokenDeleted, setTokenDeleted] = useState<boolean>(false);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="bug" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Maîtriser les outils de développement Chrome DevTools
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Chrome DevTools n&apos;est pas seulement un inspecteur visuel pour tester des couleurs : c&apos;est le véritable bloc opératoire et la tour de contrôle du navigateur web. Apprenez à disséquer le DOM, traquer les erreurs JavaScript, intercepter les flux HTTP et purger le cache local comme un ingénieur senior.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          <span>1. Objectifs d&apos;apprentissage opérationnels</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-800">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Raccourcis &amp; Navigation rapide :</strong>
              <span>Ouvrir instantanément les panneaux clés (F12, Ctrl+Shift+C, Ctrl+Shift+J) et utiliser la Command Palette.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">DOM vivant &amp; Modèle de boîte :</strong>
              <span>Distinguer le code source HTML du DOM calculé et manipuler les styles CSS calculés en direct.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Investigation réseau HTTP :</strong>
              <span>Disséquer les requêtes API (Headers, Payload, Response) et identifier les codes HTTP (401, 404, 500, CORS).</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Stockage &amp; Sessions client :</strong>
              <span>Vérifier, éditer ou purger les tokens JWT et sessions dans Local Storage, Cookies et Cache.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Métaphore d'ouverture & Idées reçues */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. La métaphore : Le tableau de bord et la boîte noire du navigateur
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Imaginez un pilote d&apos;avion de ligne : pour voler en toute sécurité, il ne se contente pas de regarder par la fenêtre. Il a sous les yeux des dizaines de cadrans lui indiquant l&apos;altitude, la vitesse du vent, la pression d&apos;huile et la consommation de carburant.
        </p>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Pour un développeur web, <strong>Chrome DevTools est exactement ce tableau de bord</strong>. Sans lui, vous essayez de deviner pourquoi un bouton ne clique pas ou pourquoi une page reste blanche en &quot;regardant par la fenêtre&quot;. Avec lui, vous voyez l&apos;intégralité de la mémoire, des variables, des requêtes réseau et du moteur de rendu en direct.
        </p>

        {/* Idées reçues des débutants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <div className="text-xs font-black uppercase text-amber-900 mb-1 flex items-center gap-1.5">
              <span>⚠️ Idée reçue n°1</span>
            </div>
            <p className="text-sm text-slate-800 font-medium">
              <em>&quot;Si je modifie le texte ou la couleur dans DevTools, est-ce que j&apos;abîme les vrais fichiers sur le disque dur ou sur le serveur ?&quot;</em>
            </p>
            <p className="text-xs text-amber-950 font-bold mt-2">
              👉 Non, absolument jamais ! DevTools modifie uniquement la mémoire vive (RAM) de votre navigateur. Un simple rafraîchissement (<kbd className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono">F5</kbd>) réinitialise tout.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200">
            <div className="text-xs font-black uppercase text-blue-900 mb-1 flex items-center gap-1.5">
              <span>⚠️ Idée reçue n°2</span>
            </div>
            <p className="text-sm text-slate-800 font-medium">
              <em>&quot;Est-ce que les autres utilisateurs du site peuvent voir les modifications que j&apos;effectue dans DevTools ?&quot;</em>
            </p>
            <p className="text-xs text-blue-950 font-bold mt-2">
              👉 Non plus ! Toutes les modifications sont 100% locales à votre session. Vous pouvez tester librement sans aucun risque de casser le site en production pour les autres.
            </p>
          </div>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image5.jpeg"
            alt="Les 4 panneaux majeurs de Chrome DevTools : Elements, Console, Performance et Network"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.1 — Vue synthétique des 4 panneaux majeurs : Elements (DOM vivant), Console (moteur JS), Performance (profilage) et Network (échanges HTTP).
          </div>
        </div>
      </section>

      {/* 3. Méthodes d'ouverture et raccourcis clavier ultimes */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Raccourcis indispensables et secrets de productivité
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Un développeur efficace ne perd pas son temps à faire un clic droit puis &quot;Inspecter&quot;. Il utilise les raccourcis natifs pour sauter directement au cœur du problème :
        </p>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Action ciblée</th>
                <th className="p-3.5">Windows / Linux</th>
                <th className="p-3.5">macOS</th>
                <th className="p-3.5">Pourquoi c&apos;est magique ?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950 flex items-center gap-2">
                  <Icon name="maximize" className="w-4 h-4 text-slate-600" />
                  <span>Ouvrir / Fermer DevTools</span>
                </td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">F12 ou Ctrl + Shift + I</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Cmd + Option + I</td>
                <td className="p-3.5 text-xs text-slate-600">Ouvre l&apos;inspecteur sur le dernier panneau utilisé.</td>
              </tr>
              <tr className="hover:bg-slate-50 bg-emerald-50/40">
                <td className="p-3.5 font-bold text-slate-950 flex items-center gap-2">
                  <Icon name="search" className="w-4 h-4 text-emerald-600" />
                  <span>Le Viseur d&apos;élément direct</span>
                </td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Ctrl + Shift + C</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Cmd + Option + C</td>
                <td className="p-3.5 text-xs text-slate-700">Active immédiatement le pointeur d&apos;inspection : cliquez sur n&apos;importe quel bouton de la page pour sauter à son code HTML.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950 flex items-center gap-2">
                  <Icon name="code" className="w-4 h-4 text-slate-600" />
                  <span>Saut direct à la Console</span>
                </td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Ctrl + Shift + J</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Cmd + Option + J</td>
                <td className="p-3.5 text-xs text-slate-600">Ouvre instantanément la console d&apos;exécution sans passer par le HTML.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950 flex items-center gap-2">
                  <Icon name="settings" className="w-4 h-4 text-slate-600" />
                  <span>Command Palette universelle</span>
                </td>
                <td className="p-3.5 font-mono text-indigo-700 font-bold">Ctrl + Shift + P</td>
                <td className="p-3.5 font-mono text-indigo-700 font-bold">Cmd + Shift + P</td>
                <td className="p-3.5 text-xs text-slate-600">Permet de taper des commandes puissantes : capture d&apos;écran pleine page (&quot;Capture full size screenshot&quot;), désactiver JS, etc.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image6.jpeg"
            alt="Barre d'onglets de Chrome DevTools avec navigation des panneaux"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.2 — Organisation des onglets principaux et icône de simulation mobile (Device Toolbar).
          </div>
        </div>
      </section>

      {/* 4. Le Panneau Elements */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Le panneau Elements : Le DOM vivant et le modèle de boîte
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une erreur fréquente chez les débutants est de confondre le <strong>code source HTML</strong> (ce que vous écrivez dans votre fichier <code className="bg-slate-100 text-slate-900 px-1 rounded">index.html</code>) et le <strong>DOM vivant</strong> (Document Object Model).
        </p>

        <Callout type="tip" title="HTML Source vs DOM Vivant">
          <p className="text-sm leading-relaxed">
            Lorsque vous faites <em>Afficher le code source (Ctrl+U)</em>, le navigateur vous montre le texte brut initial envoyé par le serveur. Mais aujourd&apos;hui, avec React, Vue ou Angular, le JavaScript modifie la page en continu, ajoute des balises et supprime des éléments. 
            Le panneau <strong>Elements</strong> vous montre l&apos;arbre de balises <strong>actuel et vivant en mémoire</strong> !
          </p>
        </Callout>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image7.jpeg"
            alt="Panneau Elements avec Box Model margin padding border et styles calculés"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.3 — Panneau Elements : Arbre DOM vivant à gauche, règles CSS et Modèle de Boîte (Box Model) à droite.
          </div>
        </div>

        {/* Le Modèle de boîte démystifié */}
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-5 space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Icon name="layout" className="w-5 h-5 text-indigo-600" />
            <span>Comprendre le modèle de boîte (Box Model) sans se tromper</span>
          </h3>
          <p className="text-sm text-slate-700 font-medium">
            Pourquoi le texte déborde-t-il ? Pourquoi mon bouton pousse-t-il le titre du bas ? Le schéma du Box Model vous donne la réponse en 4 couches concentriques :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
            <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl">
              <strong className="text-amber-950 block text-sm">1. Content</strong>
              <span className="text-slate-700">La zone du texte ou de l&apos;image elle-même.</span>
            </div>
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl">
              <strong className="text-emerald-950 block text-sm">2. Padding</strong>
              <span className="text-slate-700">Espace intérieur entre le contenu et la bordure.</span>
            </div>
            <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-xl">
              <strong className="text-yellow-950 block text-sm">3. Border</strong>
              <span className="text-slate-700">Le contour visible ou transparent de la boîte.</span>
            </div>
            <div className="p-3 bg-orange-100 border border-orange-300 rounded-xl">
              <strong className="text-orange-950 block text-sm">4. Margin</strong>
              <span className="text-slate-700">Espace extérieur repoussant les éléments voisins.</span>
            </div>
          </div>
        </div>

        {/* Astuce de pro : styles barrés et pseudo-classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>🔍 Pourquoi une règle CSS est-elle barrée ?</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Si vous voyez une ligne comme <span className="line-through text-slate-400 font-mono">color: blue;</span> dans l&apos;onglet Styles, cela signifie qu&apos;une règle plus spécifique ou située plus bas (par exemple <code className="text-rose-600 font-mono">color: red;</code>) a pris le dessus.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>🎯 Forcer un état (:hover, :focus)</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Déboguer un menu déroulant qui se referme dès que la souris bouge est un enfer. Cliquez sur le bouton <strong>:hov</strong> dans Styles et cochez <code className="font-mono text-emerald-700">:hover</code> pour figer l&apos;état sans toucher la souris !
            </p>
          </div>
        </div>
      </section>

      {/* 5. Le Panneau Console */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Le panneau Console : Bien au-delà du simple console.log()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La console affiche toutes les erreurs non capturées (<code className="text-rose-600 bg-rose-50 px-1 rounded font-mono">Uncaught TypeError</code>), mais elle met aussi à votre disposition un terminal d&apos;évaluation interactif complet avec des super-pouvoirs :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image8.jpeg"
            alt="Erreur Uncaught TypeError affichée dans la Console DevTools"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.4 — Détection immédiate d&apos;une erreur d&apos;exécution avec lien direct vers le fichier fautif (<code className="text-xs">index.js:2:4</code>).
          </div>
        </div>

        {/* Boîte à outils : Commandes secrètes de la console */}
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 text-slate-100 p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Icon name="code" className="w-4 h-4 text-emerald-400" />
              <span>Les commandes magiques des ingénieurs expérimentés</span>
            </span>
            <span className="text-slate-500 text-[11px]">Directement dans la console DevTools</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-amber-300 font-bold text-sm">$0</div>
              <p className="text-slate-300 text-xs font-sans">
                Représente l&apos;élément actuellement sélectionné dans le panneau Elements ! Tapez <code className="text-amber-200">$0.value</code> ou <code className="text-amber-200">$0.click()</code> pour le piloter directement.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-cyan-300 font-bold text-sm">console.table(donnees)</div>
              <p className="text-slate-300 text-xs font-sans">
                Transforme un tableau d&apos;objets incompréhensible en un tableau Excel triable avec colonnes automatiques.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-emerald-300 font-bold text-sm">copy(monObjet)</div>
              <p className="text-slate-300 text-xs font-sans">
                Copie instantanément n&apos;importe quelle variable ou réponse JSON dans votre presse-papier pour la coller ailleurs !
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-purple-300 font-bold text-sm">console.dir(element)</div>
              <p className="text-slate-300 text-xs font-sans">
                Affiche l&apos;objet JavaScript réel d&apos;un élément DOM (avec ses 100+ propriétés et événements) au lieu du code HTML.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Le Panneau Sources */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          6. Le panneau Sources : Débogage visuel &amp; Source Maps
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Le panneau Sources est l&apos;équivalent d&apos;un éditeur de code embarqué. Il vous permet de poser des points d&apos;arrêt (breakpoints), d&apos;exécuter le code ligne par ligne et d&apos;inspecter les variables dans leur portée (Scope) :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image9.jpeg"
            alt="Panneau Sources avec arborescence des fichiers, breakpoints et call stack"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.5 — Sources : inspection du code source, points d&apos;arrêt (breakpoints), Scope (Local/Global) et Call Stack.
          </div>
        </div>

        <Callout type="note" title="Démystification : Qu'est-ce qu'une Source Map (.map) ?">
          <p className="text-sm leading-relaxed">
            Lorsque vous développez en TypeScript ou avec Next.js, votre code source est compilé, minifié et regroupé en un seul fichier géant incompréhensible (<code className="font-mono text-slate-800">bundle.min.js</code>).
            Une <strong>Source Map</strong> est un fichier dictionnaire qui fait le lien entre ce fichier minifié et votre fichier d&apos;origine (<code className="font-mono text-emerald-700">UserProfile.tsx</code>). DevTools l&apos;utilise pour vous permettre de poser des points d&apos;arrêt sur votre vrai code TypeScript d&apos;origine !
          </p>
        </Callout>
      </section>

      {/* 7. Le Panneau Network */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          7. Le panneau Network : L&apos;enquêteur des échanges HTTP
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans 80% des applications modernes, les bugs proviennent d&apos;une mauvaise communication entre le frontend et le backend (mauvaise URL, token manquant, format JSON invalide). <strong>Network est l&apos;outil roi pour tout démasquer :</strong>
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image10.jpeg"
            alt="Panneau Network de DevTools affichant une requête avec Status Code 200 OK"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.6 — Network : liste chronologique des requêtes, statuts HTTP, types de ressources et volet d&apos;inspection détaillée.
          </div>
        </div>

        {/* Les 4 règles d'or de l'onglet Network */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Icon name="search" className="w-4 h-4 text-emerald-600" />
              <span>1. Filtrer sur Fetch/XHR</span>
            </div>
            <p className="text-slate-600 font-medium">
              Par défaut, Network affiche tout (images, polices, fichiers CSS). Cliquez sur le filtre <strong>Fetch/XHR</strong> pour n&apos;afficher QUE les appels vers votre API backend.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Icon name="clock" className="w-4 h-4 text-blue-600" />
              <span>2. Cocher &quot;Preserve log&quot;</span>
            </div>
            <p className="text-slate-600 font-medium">
              Quand vous soumettez un formulaire, la page se recharge souvent et vide la liste des requêtes. En cochant <em>Preserve log</em>, l&apos;historique reste intact !
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-1.5">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Icon name="refresh" className="w-4 h-4 text-amber-600" />
              <span>3. Cocher &quot;Disable cache&quot;</span>
            </div>
            <p className="text-slate-600 font-medium">
              Empêche le navigateur d&apos;utiliser d&apos;anciennes versions de vos fichiers JavaScript. Vous testez toujours la version fraîchement émise par votre serveur.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Le Panneau Application */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          8. Le panneau Application : Stockage client, Cookies et Tokens
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Où vit la session d&apos;un utilisateur connecté ? Le panneau Application regroupe tous les conteneurs de stockage gérés par le navigateur sur la machine du client :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image11.jpeg"
            alt="Panneau Application montrant Local Storage, Session Storage et Cookies"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.7 — Application : arborescence de stockage client (Local Storage, Session Storage, Cookies, IndexedDB).
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <strong className="text-slate-950 block font-bold">Local Storage</strong>
            <p className="text-xs text-slate-600 font-medium">
              Persistant indéfiniment. Idéal pour mémoriser les préférences (ex: thème sombre). Si un vieux token d&apos;authentification périmé y reste stocké, il peut bloquer l&apos;utilisateur en boucle.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <strong className="text-slate-950 block font-bold">Session Storage</strong>
            <p className="text-xs text-slate-600 font-medium">
              Temporaire. Toutes les données sont automatiquement détruites dès que l&apos;utilisateur ferme l&apos;onglet du navigateur.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1">
            <strong className="text-slate-950 block font-bold">Cookies (HttpOnly)</strong>
            <p className="text-xs text-slate-600 font-medium">
              Envoyés automatiquement à chaque requête HTTP vers le serveur. Les cookies marqués <code className="text-emerald-700 font-mono">HttpOnly</code> sont invisibles en JavaScript pour empêcher les attaques XSS.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Panneaux Performance et Memory */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          9. Les panneaux Performance et Memory : Fluidité et fuites de mémoire
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-3 p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Icon name="cpu" className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-950">Performance (Profilage CPU &amp; 60 FPS)</h3>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-300">
              <Image
                src="/images/cours/debugging/module-2/image12.jpeg"
                alt="Panneau Performance avec Flame Chart et tâches bloquantes"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Si le défilement de votre page saccade, c&apos;est qu&apos;une tâche JavaScript bloque le fil d&apos;exécution principal (Main Thread) pendant plus de <strong>50 millisecondes</strong>. Le panneau Performance enregistre un Flame Chart détaillé pour pointer la fonction exacte qui consomme trop de temps CPU.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Icon name="database" className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-950">Memory (Heap Snapshots &amp; Fuites)</h3>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-300">
              <Image
                src="/images/cours/debugging/module-2/image13.jpeg"
                alt="Panneau Memory avec Heap Snapshot et rétention d'objets"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Une application web qui devient lente après 30 minutes souffre souvent d&apos;une fuite de mémoire (Memory Leak). Le panneau Memory permet de capturer deux instantanés (Snapshots) de la mémoire Heap V8 et de les comparer pour trouver les objets conservés en mémoire par mégarde.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Laboratoire interactif Chrome DevTools */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Atelier pratique interactif</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            10. Simulateur interactif : Expérimentez les 4 panneaux clés
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Manipulez cette reproduction miniature de Chrome DevTools pour constater immédiatement l&apos;effet de chaque outil sur un scénario d&apos;incident réel.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200 rounded-2xl border border-slate-300">
          <button
            onClick={() => setActiveTab('elements')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'elements'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon name="layout" className="w-4 h-4 text-indigo-600" />
            <span>1. Panneau Elements</span>
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'console'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon name="code" className="w-4 h-4 text-emerald-600" />
            <span>2. Panneau Console</span>
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'network'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon name="search" className="w-4 h-4 text-rose-600" />
            <span>3. Panneau Network</span>
          </button>
          <button
            onClick={() => setActiveTab('application')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'application'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon name="database" className="w-4 h-4 text-amber-600" />
            <span>4. Panneau Application</span>
          </button>
        </div>

        {/* Tab Content 1: Elements */}
        {activeTab === 'elements' && (
          <div className="rounded-2xl border-2 border-indigo-200 bg-white p-5 space-y-5 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span>Scénario Elements : &quot;Le bouton Commander est inaccessible et invisible&quot;</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Activez les corrections CSS ci-dessous pour voir le bouton se réparer en temps réel dans le viewport simulé :
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex justify-between items-center">
                    <span>1. Règle CSS : Background color</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {buttonBg === 'buggy' ? 'rgba(0,0,0,0)' : '#10B981'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setButtonBg('buggy')}
                      className={`px-3 py-1.5 rounded-lg font-bold ${
                        buttonBg === 'buggy' ? 'bg-rose-100 text-rose-900 border border-rose-300' : 'bg-white border text-slate-700'
                      }`}
                    >
                      ❌ transparent (buggy)
                    </button>
                    <button
                      onClick={() => setButtonBg('fixed')}
                      className={`px-3 py-1.5 rounded-lg font-bold ${
                        buttonBg === 'fixed' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-white border text-slate-700'
                      }`}
                    >
                      ✓ #10B981 (vert émeraude)
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex justify-between items-center">
                    <span>2. Règle CSS : Padding (Modèle de boîte)</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {buttonPadding === 'tight' ? '0px' : '12px 24px'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setButtonPadding('tight')}
                      className={`px-3 py-1.5 rounded-lg font-bold ${
                        buttonPadding === 'tight' ? 'bg-rose-100 text-rose-900 border border-rose-300' : 'bg-white border text-slate-700'
                      }`}
                    >
                      ❌ padding: 0 (étouffé)
                    </button>
                    <button
                      onClick={() => setButtonPadding('spacious')}
                      className={`px-3 py-1.5 rounded-lg font-bold ${
                        buttonPadding === 'spacious' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-white border text-slate-700'
                      }`}
                    >
                      ✓ padding: 12px 24px (spacieux)
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex justify-between items-center">
                    <span>3. Règle CSS : Pointer Events</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      pointer-events: {pointerEvents}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPointerEvents('none')}
                      className={`px-3 py-1.5 rounded-lg font-bold ${
                        pointerEvents === 'none' ? 'bg-rose-100 text-rose-900 border border-rose-300' : 'bg-white border text-slate-700'
                      }`}
                    >
                      ❌ none (clic bloqué)
                    </button>
                    <button
                      onClick={() => setPointerEvents('auto')}
                      className={`px-3 py-1.5 rounded-lg font-bold ${
                        pointerEvents === 'auto' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-white border text-slate-700'
                      }`}
                    >
                      ✓ auto (cliquable)
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Preview Viewport */}
              <div className="rounded-xl border-2 border-dashed border-slate-300 p-6 flex flex-col items-center justify-center bg-slate-50 min-h-[220px]">
                <span className="text-[11px] uppercase font-mono text-slate-400 font-bold mb-4">Aperçu du rendu live dans le DOM</span>
                <button
                  style={{
                    backgroundColor: buttonBg === 'buggy' ? 'transparent' : '#059669',
                    color: buttonBg === 'buggy' ? '#94a3b8' : '#ffffff',
                    padding: buttonPadding === 'tight' ? '1px 2px' : '12px 24px',
                    pointerEvents: pointerEvents,
                    cursor: pointerEvents === 'none' ? 'not-allowed' : 'pointer',
                    border: buttonBg === 'buggy' ? '1px dashed #cbd5e1' : 'none',
                  }}
                  className="rounded-xl font-bold shadow-md transition-all text-sm"
                  onClick={() => alert('Bravo ! Le bouton a été cliqué avec succès !')}
                >
                  Valider la commande (99,00 €)
                </button>
                <div className="text-center mt-4 text-xs font-mono text-slate-500">
                  {pointerEvents === 'none'
                    ? '⚠️ Clic impossible (pointer-events: none)'
                    : '✅ Clic opérationnel !'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Console */}
        {activeTab === 'console' && (
          <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5 space-y-4 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Scénario Console : &quot;Exécutez les fonctions magiques des pros&quot;</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Cliquez sur les commandes pour voir le retour affiché dans le terminal DevTools :
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setConsoleOutput(`┌─────────┬──────────────┬────────────┬─────────┐
│ (index) │ nom          │ role       │ actif   │
├─────────┼──────────────┼────────────┼─────────┤
│ 0       │ 'Marie Curie'│ 'Admin'    │ true    │
│ 1       │ 'Alan Turing'│ 'Dev'      │ true    │
│ 2       │ 'Ada Lovelace│ 'Architect'│ false   │
└─────────┴──────────────┴────────────┴─────────┘
Tableau formaté avec console.table() - Triable et beaucoup plus lisible qu'un dump JSON !`)
                }
                className="px-3 py-2 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                console.table(users)
              </button>

              <button
                onClick={() =>
                  setConsoleOutput(`> $0
<button class="btn-primary" id="checkout-btn">Payer la commande</button>
// $0 donne accès instantané aux méthodes JavaScript du bouton :
> $0.getBoundingClientRect()
{ top: 240, left: 180, width: 220, height: 48 }`)
                }
                className="px-3 py-2 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                $0 (Élément sélectionné)
              </button>

              <button
                onClick={() =>
                  setConsoleOutput(`[Console Info]
✓ Copie effectuée dans le presse-papier !
Contenu : {"id": "usr_99", "email": "dev@antigravity.io", "token": "jwt_ey872..."}
Vous pouvez maintenant faire Ctrl+V dans votre éditeur ou dans un ticket de bug !`)
                }
                className="px-3 py-2 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                copy(sessionUser)
              </button>

              <button
                onClick={() =>
                  setConsoleOutput(`> console.time("Calcul de panier");
> calculerTotalPanier();
> console.timeEnd("Calcul de panier");
⏱️ Calcul de panier: 2.148ms // Rapide !
Si le calcul avait pris > 50ms, vous auriez identifié un goulet d'étranglement !`)
                }
                className="px-3 py-2 rounded-xl bg-slate-900 text-indigo-300 font-mono text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                console.time() / timeEnd()
              </button>

              <button
                onClick={() => setConsoleOutput('// Console nettoyée.')}
                className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                clear()
              </button>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 min-h-[160px] whitespace-pre-wrap overflow-x-auto shadow-inner border border-slate-800">
              {consoleOutput}
            </div>
          </div>
        )}

        {/* Tab Content 3: Network */}
        {activeTab === 'network' && (
          <div className="rounded-2xl border-2 border-rose-200 bg-white p-5 space-y-4 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                <span>Scénario Network : &quot;Échec de connexion — Diagnostic d&apos;une erreur 401&quot;</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Voici la requête consignée dans DevTools. Cliquez sur les sous-onglets pour disséquer l&apos;appel :
              </p>
            </div>

            {/* Request Summary bar */}
            <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold">401 Unauthorized</span>
                <span className="font-bold text-slate-900">POST /api/auth/login</span>
              </div>
              <span className="text-slate-500">Durée : 142 ms — Taille : 284 B</span>
            </div>

            {/* Sub Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setNetworkSubTab('headers')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  networkSubTab === 'headers' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Headers (En-têtes)
              </button>
              <button
                onClick={() => setNetworkSubTab('payload')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  networkSubTab === 'payload' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Payload (Données envoyées)
              </button>
              <button
                onClick={() => setNetworkSubTab('response')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  networkSubTab === 'response' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Response (Réponse du serveur)
              </button>
            </div>

            {/* Sub Tab View */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2">
              {networkSubTab === 'headers' && (
                <div>
                  <div className="text-emerald-400 font-bold mb-1"># General</div>
                  <div>Request URL: https://api.monapp.com/api/auth/login</div>
                  <div>Request Method: POST</div>
                  <div className="text-rose-400 font-bold">Status Code: 401 Unauthorized</div>
                  <div className="text-emerald-400 font-bold mt-3 mb-1"># Request Headers</div>
                  <div>Content-Type: application/json</div>
                  <div>User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)</div>
                </div>
              )}

              {networkSubTab === 'payload' && (
                <div>
                  <div className="text-emerald-400 font-bold mb-1"># Corps JSON envoyé par le formulaire :</div>
                  <pre className="text-amber-200">{JSON.stringify({ email: 'stagiaire@entreprise.com', password: 'wrong_password_123' }, null, 2)}</pre>
                  <p className="text-slate-400 text-[11px] font-sans mt-2">
                    💡 Grâce au Payload, vous prouvez immédiatement que le frontend a bien transmis l&apos;email et le mot de passe saisis.
                  </p>
                </div>
              )}

              {networkSubTab === 'response' && (
                <div>
                  <div className="text-emerald-400 font-bold mb-1"># JSON brut renvoyé par l&apos;API Express/Node.js :</div>
                  <pre className="text-rose-300">{JSON.stringify({ error: 'AuthFailed', message: 'Identifiant ou mot de passe incorrect.', attemptsRemaining: 2 }, null, 2)}</pre>
                  <p className="text-slate-400 text-[11px] font-sans mt-2">
                    🎯 Diagnostic immédiat : Le code React n&apos;est pas buggé ! C&apos;est simplement l&apos;utilisateur qui a tapé un mauvais mot de passe.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 4: Application */}
        {activeTab === 'application' && (
          <div className="rounded-2xl border-2 border-amber-200 bg-white p-5 space-y-4 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                <span>Scénario Application : &quot;L&apos;utilisateur est bloqué en boucle par un token corrompu&quot;</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Observez les clés enregistrées dans Local Storage et utilisez le bouton de purge pour réparer l&apos;application :
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-300">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                  <tr>
                    <th className="p-3">Clé (Key)</th>
                    <th className="p-3">Valeur (Value)</th>
                    <th className="p-3">Diagnostic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 text-indigo-700 font-bold">theme</td>
                    <td className="p-3 text-slate-700">&quot;dark&quot;</td>
                    <td className="p-3 text-emerald-700 font-sans font-medium text-xs">Valide</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 text-indigo-700 font-bold">cart_items</td>
                    <td className="p-3 text-slate-700">[42, 88, 105]</td>
                    <td className="p-3 text-emerald-700 font-sans font-medium text-xs">Valide</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-rose-50/50">
                    <td className="p-3 text-indigo-700 font-bold">auth_jwt</td>
                    <td className="p-3 text-rose-700 font-bold">
                      {tokenDeleted ? '<clé supprimée>' : 'eyJhbGciOiJ_MALFORMED_OR_EXPIRED_TOKEN'}
                    </td>
                    <td className="p-3 text-rose-700 font-sans font-bold text-xs">
                      {tokenDeleted ? '✓ Nettoyé' : '❌ Token expiré qui fait planter le middleware !'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setTokenDeleted(!tokenDeleted)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  tokenDeleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                }`}
              >
                <Icon name="trash" className="w-4 h-4" />
                <span>{tokenDeleted ? 'Restaurer le bug pour retester' : 'Supprimer la clé auth_jwt (Clear Storage)'}</span>
              </button>

              <span className="text-xs text-slate-600 font-medium">
                {tokenDeleted
                  ? '✅ Clé purgée ! L\'application peut maintenant rediriger proprement vers l\'écran de connexion.'
                  : '⚠️ Cliquez sur le bouton pour tester la purge.'}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* 11. Cas pratique guidé */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          11. Cas pratique complet : Résolution pas-à-pas dans index.html
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Considérons une page Web minimale où un clic sur un bouton est censé charger et lister des utilisateurs :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image14.jpeg"
            alt="Page web minimale de test avec bouton Click me"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.8 — Page web de test minimale pour reproduire le bug sous Chrome DevTools.
          </div>
        </div>

        {/* Code Blocks avant / après */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase text-rose-700 flex items-center gap-1.5">
              <span>❌ Code défectueux (Génère des balises vides)</span>
            </div>
            <CodeBlock
              language="javascript"
              code={`const users = [
  { name: "Ahmed", age: 25 },
  { name: "Sara", age: 30 }
];

document.getElementById("loadUsers")
  .addEventListener("click", () => {
    users.forEach(user => {
      const li = document.createElement("li");
      // ❌ BUG : La propriété n'est pas .username mais .name !
      li.textContent = user.username; 
      list.appendChild(li);
    });
  });`}
            />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase text-emerald-700 flex items-center gap-1.5">
              <span>✓ Code corrigé (Validé sous DevTools)</span>
            </div>
            <CodeBlock
              language="javascript"
              code={`const users = [
  { name: "Ahmed", age: 25 },
  { name: "Sara", age: 30 }
];

document.getElementById("loadUsers")
  .addEventListener("click", () => {
    users.forEach(user => {
      const li = document.createElement("li");
      // ✓ Correction : accès à la clé réelle .name
      li.textContent = user.name; 
      list.appendChild(li);
    });
  });`}
            />
          </div>
        </div>

        {/* Investigation guidée */}
        <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3 text-sm text-slate-800">
          <strong className="text-slate-950 block font-bold text-base">
            Le protocole d&apos;investigation avec DevTools en 4 étapes :
          </strong>
          <ol className="list-decimal pl-5 space-y-2 font-medium">
            <li>
              <strong>Étape 1 — Panneau Elements :</strong> Vous cliquez sur le bouton. Rien ne s&apos;affiche à l&apos;écran, mais dans l&apos;arbre DOM d&apos;Elements, vous constatez que deux balises <code className="text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">&lt;li&gt;&lt;/li&gt;</code> ont bien été injectées, mais qu&apos;elles sont totalement vides !
            </li>
            <li>
              <strong>Étape 2 — Panneau Sources :</strong> Vous cliquez sur la ligne <code className="text-slate-900 bg-white px-1 rounded">li.textContent = user.username</code> pour poser un point d&apos;arrêt (breakpoint). Au clic suivant, l&apos;exécution se fige.
            </li>
            <li>
              <strong>Étape 3 — Panneau Console :</strong> Dans la console active, vous évaluez l&apos;objet en direct :
              <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs my-1">
                <div>&gt; user.username</div>
                <div className="text-rose-400">undefined</div>
                <div>&gt; user.name</div>
                <div className="text-emerald-400">&quot;Ahmed&quot;</div>
              </div>
              Le diagnostic est sans appel : la clé <code className="font-mono text-rose-600">username</code> n&apos;existe pas sur cet objet !
            </li>
            <li>
              <strong>Étape 4 — Correction et validation :</strong> Vous remplacez <code className="font-mono text-emerald-700">user.username</code> par <code className="font-mono text-emerald-700">user.name</code> dans votre fichier source, rafraîchissez la page : les prénoms s&apos;affichent immédiatement.
            </li>
          </ol>
        </div>
      </section>

      {/* 12. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>12. Quiz de validation — Chapitre 2</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel panneau permet d'inspecter l'arbre DOM vivant et de modifier les styles CSS calculés en direct ?",
              options: [
                "Network",
                "Elements",
                "Application",
                "Performance"
              ],
              correctIndex: 1,
              explanation: "Le panneau Elements présente l'arbre DOM vivant tel qu'il existe en mémoire vive, ainsi que toutes les règles CSS appliquées et le Box Model."
            },
            {
              id: 2,
              question: "Vous souhaitez vérifier le corps (Payload) et la réponse JSON exacte retournée par votre backend d'API REST. Quel panneau devez-vous ouvrir ?",
              options: [
                "Network",
                "Elements",
                "Memory",
                "Security"
              ],
              correctIndex: 0,
              explanation: "Le panneau Network consigne chaque échange HTTP. Ses onglets Payload et Response/Preview permettent de lire exactement le JSON échangé."
            },
            {
              id: 3,
              question: "Quelle variable magique de la console DevTools référence automatiquement l'élément DOM actuellement sélectionné dans le panneau Elements ?",
              options: [
                "$this",
                "$_",
                "$0",
                "$$"
              ],
              correctIndex: 2,
              explanation: "$0 représente toujours le dernier nœud DOM sélectionné dans Elements. Vous pouvez l'utiliser pour tester $0.click() ou $0.value directement."
            },
            {
              id: 4,
              question: "Où devez-vous vous rendre dans DevTools pour purger un vieux token JWT périmé stocké dans le navigateur du client ?",
              options: [
                "Sources",
                "Performance",
                "Application (Local Storage)",
                "Elements"
              ],
              correctIndex: 2,
              explanation: "Le panneau Application centralise tous les stockages locaux (Local Storage, Session Storage, Cookies et IndexedDB) et permet de les effacer en un clic."
            },
            {
              id: 5,
              question: "Pourquoi coche-t-on impérativement l'option 'Preserve log' dans le panneau Network lors du test d'un formulaire ?",
              options: [
                "Pour accélérer le temps de réponse de l'API",
                "Pour empêcher l'effacement de l'historique des requêtes lors du rechargement de la page après soumission",
                "Pour chiffrer les requêtes en HTTPS",
                "Pour désactiver le cache du navigateur"
              ],
              correctIndex: 1,
              explanation: "Sans 'Preserve log', le rechargement déclenché par un formulaire HTML effacerait immédiatement la liste des requêtes Network, masquant l'erreur."
            },
            {
              id: 6,
              question: "Un défilement (scroll) saccade sur mobile et bloque la page pendant 80ms. Quel panneau permet de mesurer ce blocage du fil principal (Main Thread) ?",
              options: [
                "Performance",
                "Memory",
                "Elements",
                "Application"
              ],
              correctIndex: 0,
              explanation: "Le panneau Performance enregistre les tâches CPU longues (> 50ms) et met en évidence les chutes de framerate (en dessous de 60 FPS)."
            }
          ]}
        />
      </section>
    </div>
  );
};
