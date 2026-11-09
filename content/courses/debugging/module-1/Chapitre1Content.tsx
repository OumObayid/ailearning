'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

export const Chapitre1Content: React.FC = () => {
  // État pour le simulateur interactif d'enquête (Panier e-commerce)
  const [activeTab, setActiveTab] = useState<'frontend' | 'network' | 'backend' | 'database'>('frontend');

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
            <span>Lecture accessible : ~10 min</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-3">
          Chapitre 1 — Introduction à l&apos;ingénierie du débogage
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          Pourquoi les meilleurs développeurs ne sont pas ceux qui codent le plus vite, mais ceux qui savent méthodiquement comprendre et résoudre les anomalies sans paniquer.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Démystifier le jargon technique</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Adopter la démarche du détective</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Éviter les pièges des débutants</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : ANALOGIE DU MÉDECIN & DÉFINITION
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            Qu&apos;est-ce que l&apos;ingénierie du débogage ?
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
          Pour beaucoup de débutants, déboguer ressemble à ceci : <em>« Mon programme ne marche pas, je change une ligne au hasard, je relance, ça ne marche toujours pas, je stresse et je recommence. »</em>
        </p>

        {/* L'analogie du Médecin vs Le Pansement */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 space-y-4">
          <div className="flex items-center gap-2 text-amber-950 font-black text-base">
            <Icon name="sparkles" className="w-5 h-5 text-amber-600" />
            <span>L&apos;analogie médicale : Le symptôme n&apos;est pas la maladie</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            Imaginez que vous ayez 39°C de fièvre à cause d&apos;une infection bactérienne. Prendre du paracétamol fait baisser votre fièvre pendant 4 heures (le <strong>symptôme visible</strong> disparaît temporairement), mais l&apos;infection continue de proliférer (la <strong>cause racine</strong> est toujours là).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 text-xs sm:text-sm font-medium text-slate-800">
              <strong className="text-rose-700 block mb-1">❌ Le bricolage (Le pansement) :</strong>
              Masquer l&apos;erreur pour que l&apos;écran ait l&apos;air propre, sans comprendre pourquoi elle est apparue. Le bug réapparaîtra sous une autre forme, souvent pire.
            </div>
            <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-300 text-xs sm:text-sm font-medium text-slate-800">
              <strong className="text-emerald-700 block mb-1">✅ L&apos;ingénierie (Le médecin enquêteur) :</strong>
              Poser un diagnostic précis, analyser les examens biologiques (logs, données) et prescrire le traitement exact qui éradique la source du mal.
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            La véritable mission d&apos;un ingénieur du débogage
          </h3>
          <p className="text-sm text-slate-700 font-medium">
            L&apos;ingénierie du débogage (<em>Debugging Engineering</em>) est la science méthodique qui consiste à répondre à quatre questions fondamentales avant même de modifier la moindre ligne :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Quand &amp; Pourquoi ?</strong>
                <span className="text-xs text-slate-600 font-medium">Quelles conditions précises déclenchent le bug ? (Un compte particulier ? Un panier vide ?)</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
              <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Où est la source réelle ?</strong>
                <span className="text-xs text-slate-600 font-medium">Est-ce l&apos;écran (React), le serveur de calcul (Node.js) ou la base de données (MySQL) ?</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">La solution est-elle saine ?</strong>
                <span className="text-xs text-slate-600 font-medium">Résout-elle le fond du problème ou n&apos;est-ce qu&apos;une rustine temporaire ?</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
              <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">4</div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Rien n&apos;a été cassé ailleurs ?</strong>
                <span className="text-xs text-slate-600 font-medium">C&apos;est le principe de <strong>non-régression</strong> : s&apos;assurer que la réparation ne crée pas de nouvel incident.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LE GLOSSAIRE EXPRESS POUR DÉBUTANTS
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Glossaire Express : Le vocabulaire technique expliqué simplement
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Ces termes reviennent constamment dans le monde professionnel. Voici leur signification concrète, sans jargon obscur :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Term 1 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-2 text-rose-700 font-black text-sm">
              <Icon name="bug" className="w-4 h-4" />
              <span>Un Bug (Anomalie)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Un écart entre ce que le logiciel <strong>devrait faire</strong> (le cahier des charges) et ce qu&apos;il <strong>fait réellement</strong>.
            </p>
          </div>

          {/* Term 2 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
              <Icon name="search" className="w-4 h-4" />
              <span>Cause Racine (Root Cause)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              L&apos;origine première et fondamentale de la panne. C&apos;est la fissure originelle qui a fini par faire céder tout le barrage.
            </p>
          </div>

          {/* Term 3 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-2 text-amber-700 font-black text-sm">
              <Icon name="shield-check" className="w-4 h-4" />
              <span>Régression / Non-régression</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Une régression, c&apos;est réparer la serrure de la porte d&apos;entrée mais bloquer sans le vouloir la porte du garage. Le test de non-régression valide que tout le reste fonctionne toujours.
            </p>
          </div>

          {/* Term 4 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
              <Icon name="document-text" className="w-4 h-4" />
              <span>Stack Trace (Trace de pile)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              La « boîte noire » du crash : la liste chronologique de toutes les fonctions et lignes de code appelées juste avant l&apos;accident.
            </p>
          </div>

          {/* Term 5 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-2 text-blue-700 font-black text-sm">
              <Icon name="clock" className="w-4 h-4" />
              <span>Breakpoint (Point d&apos;arrêt)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Mettre le code en pause à un moment exact pour inspecter les variables en direct, comme mettre un film en pause pour regarder les détails d&apos;une scène.
            </p>
          </div>

          {/* Term 6 */}
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5 hover:border-lime-400 transition-colors">
            <div className="flex items-center gap-2 text-purple-700 font-black text-sm">
              <Icon name="server" className="w-4 h-4" />
              <span>Payload &amp; Statut HTTP</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Le <em>Payload</em> est le colis envoyé dans la lettre réseau (ex: données JSON). Le <em>Statut</em> est le tampon postal (200 = OK, 404 = Introuvable, 500 = Panique serveur).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : SIMULATEUR D'ENQUÊTE INTERACTIF (CAS DU PANIER D'ACHAT)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            Cas Pratique Interactif : L&apos;enquête du Panier d&apos;achat
          </h2>
        </div>

        <p className="text-base text-slate-800 font-medium">
          Voici le scénario le plus classique du développement Web. Un client a commandé 3 articles pour une valeur de <strong>350 €</strong>. Pourtant, sur son écran, le site affiche un total de <strong>250 €</strong> !
        </p>

        {/* Console interactive de l'enquête */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-white overflow-hidden shadow-xl">
          {/* Top Bar Navigation */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">Enquête interactive : Remonter le flux de données</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400 bg-lime-950/80 px-2.5 py-0.5 rounded border border-lime-800">
              Cliquez sur chaque maillon ci-dessous
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-800 text-xs font-bold divide-x divide-slate-800 bg-slate-900">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`p-3 text-left transition-colors flex items-center gap-2 ${
                activeTab === 'frontend'
                  ? 'bg-blue-600/30 text-blue-300 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px] font-mono">1</span>
              <span>1. Écran React</span>
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`p-3 text-left transition-colors flex items-center gap-2 ${
                activeTab === 'network'
                  ? 'bg-purple-600/30 text-purple-300 border-b-2 border-purple-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-mono">2</span>
              <span>2. Réseau HTTP</span>
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`p-3 text-left transition-colors flex items-center gap-2 ${
                activeTab === 'backend'
                  ? 'bg-amber-600/30 text-amber-300 border-b-2 border-amber-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-mono">3</span>
              <span>3. Serveur Node</span>
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`p-3 text-left transition-colors flex items-center gap-2 ${
                activeTab === 'database'
                  ? 'bg-emerald-600/30 text-emerald-300 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-mono">4</span>
              <span>4. Base MySQL</span>
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="p-5 sm:p-6 space-y-4">
            {activeTab === 'frontend' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Icon name="layout" className="w-4 h-4" />
                  <span>Maillon 1 : Ce que voit l&apos;utilisateur dans son navigateur (React)</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <p className="text-slate-500">{"// Affichage à l'écran :"}</p>
                  <p><span className="text-amber-400">&lt;div</span> <span className="text-indigo-400">className</span>=&quot;total&quot;<span className="text-amber-400">&gt;</span> Total : {'{'}cart.total{'}'} € <span className="text-amber-400">&lt;/div&gt;</span></p>
                  <p className="text-emerald-400">{"// Résultat affiché : Total : 250 € (FAUX, attendu 350 €)"}</p>
                </div>
                <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs sm:text-sm text-blue-200">
                  <strong>💡 L&apos;erreur du débutant :</strong> Penser immédiatement que React calcule mal et rajouter <code className="bg-blue-900/60 px-1 py-0.5 rounded text-white font-mono">+ 100</code> dans le composant. C&apos;est catastrophique car React ne calcule rien, il affiche simplement la variable <code className="text-amber-300 font-mono">cart.total</code> reçue de l&apos;API !
                </div>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Icon name="search" className="w-4 h-4" />
                  <span>Maillon 2 : Ce qui transite sur le réseau (Onglet Réseau / DevTools)</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <p className="text-slate-500">{"// Réponse reçue du serveur HTTP GET /api/cart :"}</p>
                  <p className="text-purple-300">{'{'}</p>
                  <p className="pl-4 text-slate-300">&quot;itemsCount&quot;: 3,</p>
                  <p className="pl-4 text-emerald-400">&quot;total&quot;: 250,</p>
                  <p className="pl-4 text-slate-400">&quot;currency&quot;: &quot;EUR&quot;</p>
                  <p className="text-purple-300">{'}'}</p>
                </div>
                <div className="p-3 bg-purple-950/40 border border-purple-800/60 rounded-xl text-xs sm:text-sm text-purple-200">
                  <strong>🔍 Le constat de l&apos;enquêteur :</strong> Le frontend est 100% innocent ! Le serveur lui a littéralement envoyé <code className="text-emerald-300 font-mono">&quot;total&quot;: 250</code>. Inutile de toucher à React. On remonte maintenant vers le serveur backend !
                </div>
              </div>
            )}

            {activeTab === 'backend' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Icon name="server" className="w-4 h-4" />
                  <span>Maillon 3 : Le calcul métier côté serveur (Node.js / Express)</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <p className="text-slate-500">{"// Code de la fonction de calcul dans Express :"}</p>
                  <p><span className="text-blue-400">const</span> subtotal = 350; <span className="text-slate-500">{"// Somme des 3 produits"}</span></p>
                  <p><span className="text-blue-400">const</span> discount = await getActiveDiscount(userId); <span className="text-slate-500">{"// Réduction trouvée : 100 €"}</span></p>
                  <p><span className="text-blue-400">const</span> total = subtotal - discount; <span className="text-amber-400">{"// 350 - 100 = 250 €"}</span></p>
                </div>
                <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs sm:text-sm text-amber-200">
                  <strong>🔎 La découverte :</strong> La formule mathématique du backend est juste (350 - 100 = 250). Mais pourquoi une réduction de 100 € a-t-elle été appliquée à ce client alors qu&apos;il n&apos;a saisi aucun code promo ? Allons voir la base de données !
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Icon name="database" className="w-4 h-4" />
                  <span>Maillon 4 : Les données enregistrées en base (MySQL) — La Cause Racine !</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <p className="text-slate-500">-- Résultat de la requête SQL SELECT * FROM discounts WHERE user_id = 42;</p>
                  <p className="text-slate-400">| id | code | amount | expires_at | is_active |</p>
                  <p className="text-rose-400 font-bold">| 91 | WELCOME100 | 100.00 | 2023-01-01 | 1 | &lt;-- EXPIRÉ DEPUIS 3 ANS MAIS ACTIF !</p>
                </div>
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs sm:text-sm text-emerald-200 space-y-1">
                  <p><strong>🎯 Victoire de l&apos;enquêteur (Cause Racine isolée) :</strong></p>
                  <p>Le serveur appliquait la réduction car la requête SQL ne vérifiait pas la date d&apos;expiration (<code className="text-emerald-300 font-mono">expires_at &gt; NOW()</code>). L&apos;anomalie s&apos;affichait sur React, mais le bug était une requête SQL incomplète !</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Callout type="warning" title="La règle d'or du débogueur">
          <strong>Le lieu où le bug explose n&apos;est presque jamais le lieu où le bug a été commis.</strong> Ne commencez jamais à réécrire un composant d&apos;affichage avant d&apos;avoir vérifié les données brutes qui entrent dans ce composant.
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 4 : LE MATCH DÉBUTANT VS INGÉNIEUR
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            Développeur Débutant vs Ingénieur du Débogage : Le match des réflexes
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Ce tableau résume la différence d&apos;état d&apos;esprit entre le bricolage frustrant et la sérénité méthodique :
        </p>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200">
              <tr>
                <th className="p-3 font-black">Situation rencontrée</th>
                <th className="p-3 font-black text-rose-800 bg-rose-50/50">Réflexe du Débutant (À éviter)</th>
                <th className="p-3 font-black text-emerald-800 bg-emerald-50/50">Réflexe de l&apos;Ingénieur (À adopter)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3 font-bold text-slate-900">Une page devient blanche</td>
                <td className="p-3 bg-rose-50/20 text-rose-950">
                  Actualise la page 10 fois en espérant que ça remarche par magie.
                </td>
                <td className="p-3 bg-emerald-50/20 text-emerald-950">
                  Ouvre immédiatement la Console du navigateur (F12) et lit la première erreur rouge en haut.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Le serveur renvoie une erreur 500</td>
                <td className="p-3 bg-rose-50/20 text-rose-950">
                  Modifie la route dans le code sans savoir ce qui plante.
                </td>
                <td className="p-3 bg-emerald-50/20 text-emerald-950">
                  Consulte les logs du terminal serveur pour lire la <em>Stack Trace</em> et le numéro de ligne exact.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Un bug survient parfois seulement</td>
                <td className="p-3 bg-rose-50/20 text-rose-950">
                  Dit « chez moi ça marche » et classe le ticket comme résolu.
                </td>
                <td className="p-3 bg-emerald-50/20 text-emerald-950">
                  Cherche le cas limite (ex: utilisateur sans photo de profil, panier avec 0 article, etc.).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Après avoir appliqué un fix</td>
                <td className="p-3 bg-rose-50/20 text-rose-950">
                  Pousse le code en production immédiatement sans tester les autres pages.
                </td>
                <td className="p-3 bg-emerald-50/20 text-emerald-950">
                  Teste le parcours utilisateur complet et écrit un test automatisé pour verrouiller le comportement.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : LES 4 GRANDES ÉTAPES DE LA MÉTHODE SCIENTIFIQUE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            La Méthode Scientifique en 4 étapes
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Chaque bug, qu&apos;il soit minuscule ou critique, doit être traité avec cette même rigueur :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white font-black text-xs">1</span>
              <h3 className="font-bold text-base text-slate-950">Étape 1 : Détection &amp; Reproduction</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Si vous ne pouvez pas reproduire un bug à volonté, vous ne pouvez pas être certain de l&apos;avoir corrigé. Vous devez être capable de dire : <em>« Quand je clique ici avec ces données-là, le bug arrive à tous les coups. »</em>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white font-black text-xs">2</span>
              <h3 className="font-bold text-base text-slate-950">Étape 2 : Isolement (L&apos;entonnoir)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Couper le système en deux : Est-ce le frontend ou le backend ? Si c&apos;est le backend, est-ce la requête SQL ou la formule de calcul ? On élimine les suspects les uns après les autres jusqu&apos;à isoler la ligne fautive.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white font-black text-xs">3</span>
              <h3 className="font-bold text-base text-slate-950">Étape 3 : Correction minimale &amp; Propre</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Corriger la cause racine avec le moins de modifications possible. Ne profitez jamais d&apos;une correction de bug pour réécrire 3 autres fichiers non liés, sinon vous risquez de créer 5 nouveaux bugs !
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white font-black text-xs">4</span>
              <h3 className="font-bold text-base text-slate-950">Étape 4 : Validation &amp; Non-régression</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Vérifier que le cas d&apos;origine est résolu, tester les cas normaux adjacents, et idéalement ajouter un test automatique pour que ce bug précis ne revienne plus jamais.
            </p>
          </div>
        </div>

        {/* Exemple de code : Bricolage vs Solution pro */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-bold text-slate-900">
            Exemple concret en code : Le pansement dangereux vs Le vrai correctif
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-rose-600 mb-1 flex items-center gap-1.5">
                <Icon name="x" className="w-4 h-4" />
                <span>❌ Le mauvais correctif (Cache la misère)</span>
              </div>
              <CodeBlock
                language="typescript"
                filename="cartService.ts"
                code={`// ❌ MAUVAIS : On force la valeur à la main
function getCartTotal(cart: Cart) {
  let total = calculateTotal(cart);
  
  // "Bricolage" : Si l'utilisateur est John, on force 350
  if (cart.userId === 42 && total === 250) {
    return 350; // Dangereux ! Ne résout rien pour les autres
  }
  
  return total;
}`}
              />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1.5">
                <Icon name="check" className="w-4 h-4" />
                <span>✅ Le bon correctif (Résout la cause racine)</span>
              </div>
              <CodeBlock
                language="sql"
                filename="discountRepository.sql"
                code={`-- ✅ BON : Corriger la requête SQL pour ignorer les coupons expirés
SELECT * FROM discounts 
WHERE user_id = ? 
  AND is_active = 1
  AND expires_at > NOW(); -- La vraie condition manquante !`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 : DEBUGGING VS TESTING VS MONITORING
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">6</span>
          <h2 className="text-xl font-bold text-slate-950">
            Debugging, Testing et Monitoring : Quelles différences ?
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Les débutants confondent souvent ces trois disciplines complémentaires. Voici une façon simple de les mémoriser :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/50 space-y-2">
            <span className="text-[11px] font-black uppercase text-blue-900 bg-blue-100 px-2 py-0.5 rounded">Avant la livraison</span>
            <div className="text-base font-black text-slate-950 flex items-center gap-1.5">
              <Icon name="check-circle" className="w-4 h-4 text-blue-700" />
              <span>Testing (Les Tests)</span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Le contrôle technique du véhicule avant de partir sur l&apos;autoroute. On vérifie que les freins et les phares répondent bien au cahier des charges.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/50 space-y-2">
            <span className="text-[11px] font-black uppercase text-purple-900 bg-purple-100 px-2 py-0.5 rounded">Pendant la route (En prod)</span>
            <div className="text-base font-black text-slate-950 flex items-center gap-1.5">
              <Icon name="chart-bar" className="w-4 h-4 text-purple-700" />
              <span>Monitoring (La Surveillance)</span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Le tableau de bord de la voiture : il vous alerte si le voyant d&apos;huile s&apos;allume ou si la vitesse faiblit anormalement en direct.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-2">
            <span className="text-[11px] font-black uppercase text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">Quand il y a une panne</span>
            <div className="text-base font-black text-slate-950 flex items-center gap-1.5">
              <Icon name="bug" className="w-4 h-4 text-emerald-700" />
              <span>Debugging (Le Débogage)</span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              La boîte à outils et le savoir-faire du mécanicien : ouvrir le capot, trouver quel tuyau fuit, comprendre pourquoi il s&apos;est percé et le remplacer.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : L'IA ET LE DÉBOGAGE (ALLIÉ OU PIÈGE ?)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">7</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;IA dans le débogage : Votre copilote, jamais votre remplaçant
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Aujourd&apos;hui, des assistants comme ChatGPT, Claude ou Copilot transforment la façon de résoudre les problèmes. Mais pour un débutant, ils peuvent être un piège redoutable :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border-2 border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Icon name="sparkles" className="w-4 h-4 text-emerald-700" />
              <span>Où l&apos;IA excelle (Gain de temps x10)</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-800 font-medium space-y-1.5 list-disc list-inside">
              <li>Traduire instantanément un message d&apos;erreur obscur en anglais technique.</li>
              <li>Expliquer ce qu&apos;une bibliothèque externe attend comme paramètres.</li>
              <li>Proposer des hypothèses auxquelles vous n&apos;aviez pas pensé.</li>
              <li>Rédiger un test unitaire pour reproduire le bug.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/60 border-2 border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <Icon name="shield-check" className="w-4 h-4 text-rose-700" />
              <span>Le danger pour le débutant (L&apos;illusion de solution)</span>
            </div>
            <ul className="text-xs sm:text-sm text-slate-800 font-medium space-y-1.5 list-disc list-inside">
              <li>L&apos;IA a tendance à proposer des <em>pansements</em> qui cachent l&apos;erreur.</li>
              <li>Elle peut inventer une fonction qui n&apos;existe pas (hallucination).</li>
              <li>Copier-coller sans comprendre vous empêche d&apos;acquérir l&apos;intuition du métier.</li>
              <li>Vous êtes le seul responsable du code déployé en production.</li>
            </ul>
          </div>
        </div>

        <Callout type="tip" title="La règle des 3 minutes avec l'IA">
          Avant de demander à une IA : prenez toujours 3 minutes pour <strong>lire vous-même</strong> le message d&apos;erreur et émettre au moins une hypothèse. Si vous donnez à l&apos;IA le contexte exact (le message d&apos;erreur + le code concerné + votre hypothèse), sa réponse sera 10 fois plus pertinente !
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 8 : SYNTHÈSE DES POINTS CLÉS
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">8</span>
          <h2 className="text-xl font-bold text-slate-950">
            En résumé : La Check-list mentale du bon débogueur
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-teal-500/10 border-2 border-emerald-300 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
            <p className="text-sm font-semibold text-slate-900">
              <strong>Ne pas paniquer :</strong> Une erreur n&apos;est pas une punition, c&apos;est le système qui vous donne une piste précieuse.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
            <p className="text-sm font-semibold text-slate-900">
              <strong>Lire le message d&apos;erreur :</strong> 90% des réponses sont écrites dans la console ou le terminal.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
            <p className="text-sm font-semibold text-slate-900">
              <strong>Isoler avant de réparer :</strong> Identifier la couche exacte (React, HTTP, Express, MySQL) avant de taper une ligne de code.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
            <p className="text-sm font-semibold text-slate-900">
              <strong>Viser la cause racine :</strong> Ne jamais mettre un pansement superficiel pour « faire taire » l&apos;erreur.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</div>
            <p className="text-sm font-semibold text-slate-900">
              <strong>Valider sans casser le reste :</strong> Toujours vérifier le principe de non-régression.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — Validez vos réflexes de débogage"
          questions={[
            {
              id: 1,
              question: "Quelle est la toute première chose à faire lorsqu'une page web affiche une anomalie visuelle ?",
              options: [
                "Modifier immédiatement le composant d'affichage HTML/React.",
                "Ouvrir les outils de développement (F12) et vérifier la console ainsi que les requêtes réseau.",
                "Redémarrer son ordinateur et désinstaller le navigateur.",
                "Supprimer tous les fichiers de style CSS.",
              ],
              correctIndex: 1,
              explanation: "Bien joué ! L'écran ne fait qu'afficher ce qu'il reçoit. Inspecter la console et les réponses réseau permet de savoir immédiatement si la donnée reçue est déjà corrompue.",
            },
            {
              id: 2,
              question: "Pourquoi est-il dangereux d'appliquer un « pansement » superficiel au lieu de chercher la cause racine ?",
              options: [
                "Parce que le code prend trop de place sur le disque dur.",
                "Parce que le vrai problème reste présent et réapparaîtra sous une autre forme, souvent pire.",
                "Parce que l'ordinateur va s'éteindre automatiquement.",
                "Ce n'est pas dangereux, c'est au contraire la meilleure pratique.",
              ],
              correctIndex: 1,
              explanation: "Exactement ! Forcer une valeur à la main (comme notre panier à 350 €) laisse la faille ouverte pour tous les autres utilisateurs ou scénarios.",
            },
            {
              id: 3,
              question: "Qu'est-ce qu'une « régression logicielle » ?",
              options: [
                "Un logiciel qui fonctionne trop lentement.",
                "Le fait d'introduire un nouveau bug sur une fonctionnalité existante en essayant d'en réparer une autre.",
                "Une mise à jour graphique de l'interface utilisateur.",
                "La perte d'une connexion internet pendant l'écriture du code.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! La non-régression est le souci n°1 des ingénieurs : s'assurer qu'un correctif n'endommage rien d'autre.",
            },
            {
              id: 4,
              question: "Quelle est la différence fondamentale entre le Testing et le Debugging ?",
              options: [
                "Il n'y a aucune différence, ce sont deux synonymes stricts.",
                "Le testing détecte la présence d'une anomalie conformément aux spécifications, tandis que le debugging recherche la cause et la corrige.",
                "Le testing se fait uniquement sur mobile et le debugging sur ordinateur.",
                "Le debugging est réalisé par les clients et le testing par les serveurs.",
              ],
              correctIndex: 1,
              explanation: "Exact ! Les tests signalent : « Attention, le résultat attendu n'est pas obtenu ! ». Le débogueur prend ensuite le relais pour comprendre le « Pourquoi » et le corriger.",
            },
            {
              id: 5,
              question: "Quelle attitude adopter lorsqu'un assistant IA (ChatGPT, Claude, etc.) vous suggère une correction ?",
              options: [
                "Copier-coller le code les yeux fermés sans le lire.",
                "Comprendre la logique proposée, vérifier qu'elle traite bien la cause racine et tester le comportement vous-même.",
                "Refuser catégoriquement toute utilisation de l'IA.",
                "Ne jamais tester après avoir collé le code de l'IA.",
              ],
              correctIndex: 1,
              explanation: "Excellente réponse ! L'IA est un formidable accélérateur d'idées, mais vous restez l'ingénieur responsable et garant de la fiabilité de votre code.",
            },
          ]}
        />
      </section>
    </div>
  );
};
