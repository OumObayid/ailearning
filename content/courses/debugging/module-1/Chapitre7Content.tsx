'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

interface InvestigationScenario {
  id: string;
  name: string;
  symptom: string;
  beginnerReaction: string;
  investigationSteps: string[];
  rootCause: string;
  fix: string;
}

export const Chapitre7Content: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('slow');

  const scenarios: InvestigationScenario[] = [
    {
      id: 'slow',
      name: '1. Lenteur de 8 secondes',
      symptom: 'La page du catalogue met 8 secondes à afficher les 10 premiers produits.',
      beginnerReaction: 'Penser que React est trop lent et essayer d\'utiliser des useMemo partout ou d\'optimiser les styles CSS.',
      investigationSteps: [
        'Étape 1 : Ouvrir Chrome DevTools Network -> La requête GET /api/products prend 7,8 secondes à elle seule ! Le frontend est innocent.',
        'Étape 2 : Regarder le contrôleur Node.js -> Il exécute la requête SQL : SELECT * FROM produits ORDER BY date_creation DESC.',
        'Étape 3 : Lancer EXPLAIN dans MySQL Workbench -> La table compte 500 000 articles et ne possède aucun index sur "date_creation" !',
      ],
      rootCause: 'Un scan complet de la table (Full Table Scan) : MySQL lit les 500 000 lignes une par une sur le disque dur au lieu de lire les 10 plus récentes !',
      fix: 'Ajouter un index SQL sur date_creation et ajouter la clause LIMIT 10. Le temps passe de 8000 ms à 12 ms !',
    },
    {
      id: 'crash500',
      name: '2. Erreur HTTP 500 soudaine',
      symptom: 'La page de profil affiche une alerte rouge : « Erreur lors du chargement de vos informations ».',
      beginnerReaction: 'Recharger la page 5 fois de suite en espérant que ça remarche par miracle.',
      investigationSteps: [
        'Étape 1 : Ouvrir la console Chrome DevTools -> On voit un statut rouge HTTP 500 renvoyé par /api/me.',
        'Étape 2 : Consulter le terminal du serveur Express -> Error: ER_BAD_FIELD_ERROR: Unknown column "user_photo" in "field list".',
        'Étape 3 : Inspecter la base MySQL -> La colonne s\'appelle en réalité "avatar_url" dans la table users !',
      ],
      rootCause: 'Une faute de nommage dans la requête SQL du backend suite à une mise à jour mal synchronisée.',
      fix: 'Corriger le nom du champ dans la requête SQL ou le modèle ORM pour utiliser "avatar_url".',
    },
    {
      id: 'security',
      name: '3. Faille d\'accès (IDOR)',
      symptom: 'Un client curieux change l\'URL de sa facture de /facture/101 vers /facture/102 et voit la facture de son voisin.',
      beginnerReaction: 'Penser que l\'authentification JWT a échoué et réécrire le système de login.',
      investigationSteps: [
        'Étape 1 : Vérifier le token JWT -> L\'utilisateur est parfaitement authentifié (le serveur sait qui il est).',
        'Étape 2 : Regarder la route Express -> app.get("/facture/:id", async (req, res) => ...).',
        'Étape 3 : Constat -> Le contrôleur récupère la facture #102 sans JAMAIS vérifier si facture.client_id correspond à req.user.id !',
      ],
      rootCause: 'Confusion entre Authentification (savoir qui est connecté) et Autorisation (vérifier si ce client a le droit d\'accéder à cette ressource précise).',
      fix: 'Ajouter une vérification stricte : if (facture.clientId !== req.user.id) return res.status(403).json({ error: "Accès refusé" });',
    },
  ];

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

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
          Chapitre 7 — Identifier les symptômes et rechercher les causes
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          La première leçon de tout grand enquêteur : ce qui est visible à l&apos;écran n&apos;est qu&apos;un indice. Apprenez à remonter méthodiquement de la fumée jusqu&apos;à l&apos;étincelle d&apos;origine.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Distinguer symptôme et cause</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Classer les 5 types de symptômes</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Maîtriser EXPLAIN, Network &amp; Console</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LA DISTINCTION CARDINALE (L'ALARME INCENDIE)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            La distinction cardinale : Symptôme vs Cause
          </h2>
        </div>

        <p className="text-base text-slate-800 font-medium">
          Dans le monde du développement, la confusion entre le symptôme et la cause est la source de 80% des pertes de temps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Ce que l&apos;on observe</span>
            <h3 className="text-base font-bold text-slate-950">Le Symptôme (La Fumée)</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              C&apos;est la conséquence visible à l&apos;extérieur : un écran blanc, une alerte rouge, un bouton inerte ou une lenteur insupportable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Ce qui provoque le mal</span>
            <h3 className="text-base font-bold text-slate-950">La Cause Racine (L&apos;Étincelle)</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              C&apos;est le mécanisme défaillant précis : une requête SQL sans index, une variable mal orthographiée ou une règle de sécurité omise.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
            <Icon name="sparkles" className="w-4 h-4 text-amber-700" />
            <span>L&apos;analogie de l&apos;alarme incendie</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            Si une alarme incendie sonne chez vous avec un bip strident, est-ce que votre solution consiste à couper le fil du haut-parleur pour que le bruit cesse ? <strong>Certainement pas !</strong> L&apos;alarme n&apos;est que le symptôme : elle vous prévient qu&apos;une poêle a pris feu dans la cuisine. En programmation, masquer un message d&apos;erreur sans chercher la cause équivaut à couper l&apos;alarme pendant que la maison brûle !
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LES 5 GRANDES FAMILLES DE SYMPTÔMES
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Les 5 grandes familles de symptômes
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dès qu&apos;une anomalie apparaît, classez son symptôme parmi ces 5 catégories pour choisir immédiatement les bons outils :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5">
            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-950">Symptôme Fonctionnel</h3>
            <p className="text-xs text-slate-600 font-medium">Le système tourne sans crash, mais le calcul est faux (ex: montant du panier à 103 € au lieu de 300 €).</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5">
            <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-950">Symptôme Technique</h3>
            <p className="text-xs text-slate-600 font-medium">Une exception est levée de manière bruyante : <code>TypeError</code>, <code>ReferenceError</code> ou code HTTP 500.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5">
            <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-950">Symptôme de Performance</h3>
            <p className="text-xs text-slate-600 font-medium">L&apos;API répond bien, mais elle met 8 secondes au lieu de 200 ms, décourageant les utilisateurs.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5">
            <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">4</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-950">Symptôme de Disponibilité</h3>
            <p className="text-xs text-slate-600 font-medium">Le serveur ne répond plus : réponse HTTP 503 Service Unavailable, crash de Node.js ou saturation mémoire.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-1.5">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">5</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-950">Symptôme de Sécurité</h3>
            <p className="text-xs text-slate-600 font-medium">Fuite de données ou accès non autorisé : un utilisateur peut voir les factures de ses voisins (faille IDOR).</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : SIMULATEUR D'ENQUÊTE DE CAUSE RACINE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;Enquête du Détective : Remonter du symptôme à la cause
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Choisissez un cas d&apos;école ci-dessous pour voir comment un ingénieur remonte les indices au lieu de réécrire son code au hasard :
        </p>

        {/* Interactive Investigation Console */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-white overflow-hidden shadow-xl">
          {/* Header tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 bg-slate-950 text-xs font-bold">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={`p-3 text-left transition-colors flex items-center justify-between ${
                  activeScenarioId === sc.id
                    ? 'bg-emerald-600/30 text-emerald-300 border-b-2 border-emerald-400 font-black'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{sc.name}</span>
                <span className="text-[10px] font-mono text-slate-500">Enquêter →</span>
              </button>
            ))}
          </div>

          {/* Scenario Details */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-xl space-y-1">
              <span className="text-[11px] font-black uppercase text-rose-400">Le Symptôme de départ (Ce que voit le client) :</span>
              <p className="text-sm font-semibold text-rose-100">{activeScenario.symptom}</p>
            </div>

            <div className="p-3.5 bg-slate-800/70 border border-slate-700 rounded-xl space-y-1">
              <span className="text-[11px] font-black uppercase text-amber-400">❌ Le faux réflexe du débutant :</span>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">{activeScenario.beginnerReaction}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-emerald-400">🔍 La démarche de l&apos;ingénieur enquêteur :</span>
              <div className="space-y-1.5 font-mono text-xs text-slate-200">
                {activeScenario.investigationSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-emerald-950/50 border border-emerald-800/80 rounded-xl">
                <span className="text-[11px] font-black uppercase text-emerald-400 block mb-1">🎯 La Cause Racine réelle :</span>
                <p className="text-xs text-emerald-200 font-medium">{activeScenario.rootCause}</p>
              </div>

              <div className="p-3.5 bg-blue-950/50 border border-blue-800/80 rounded-xl">
                <span className="text-[11px] font-black uppercase text-blue-400 block mb-1">✅ Le Vrai Correctif :</span>
                <p className="text-xs text-blue-200 font-medium">{activeScenario.fix}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : LES 3 OUTILS CLEFS D'INVESTIGATION (IMAGES DU COURS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;Arsenal d&apos;investigation : Console, Network et EXPLAIN
          </h2>
        </div>

        {/* Image 13 : Chrome DevTools Console */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-900 font-black text-xs">CONSOLE</span>
              <span>A. Remonter les traces d&apos;exception (Stack Trace)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Panneau Console</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            La console enregistre chaque exception non interceptée et fournit le fil d&apos;Ariane de la fonction coupable jusqu&apos;à son composant parent :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image13.jpeg"
              alt="Console Chrome DevTools avec pile d'exécution d'une exception Uncaught Error"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.13 — Remontée d&apos;appels dans Chrome DevTools : de l&apos;instruction fautive jusqu&apos;au composant déclencheur.
            </div>
          </div>
        </div>

        {/* Image 14 : Chrome DevTools Network */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-black text-xs">NETWORK</span>
              <span>B. Valider le contrat HTTP et les en-têtes réseau</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Onglet Réseau</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Permet de vérifier si le problème vient de l&apos;adresse appelée, de la méthode HTTP (GET, POST), du statut retourné ou d&apos;un type de contenu JSON mal interprété :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image14.jpeg"
              alt="Inspection du statut HTTP et des en-têtes de réponse dans l'onglet Network"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.14 — Vérification de l&apos;échange client/serveur : code statut, méthode, adresse distante et Content-Type.
            </div>
          </div>
        </div>

        {/* Image 15 : MySQL Workbench EXPLAIN */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs">EXPLAIN</span>
              <span>C. Démasquer les goulets d&apos;étranglement SQL avec EXPLAIN</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Performance de la base</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            L&apos;instruction SQL <code>EXPLAIN</code> est l&apos;arme absolue pour comprendre pourquoi une requête est lente : elle vous montre exactement si MySQL parcourt des millions de lignes inutilement (Full Table Scan) faute d&apos;index adapté :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image15.jpeg"
              alt="Visualisation du plan d'exécution graphique EXPLAIN dans MySQL Workbench"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.15 — Plan d&apos;exécution graphique MySQL : détection des scans complets coûteux et optimisation des index relationnels.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : AUTHENTIFICATION VS AUTORISATION (LE RETOUR DU CONTRÔLE D'ACCÈS)
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Piège classique en Sécurité : Authentification vs Autorisation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black uppercase text-blue-800">1. Authentification (401 Unauthorized)</span>
            <p className="text-sm font-bold text-slate-900">« Qui êtes-vous ? »</p>
            <p className="text-xs text-slate-600 font-medium">
              Vérifie votre identité via votre mot de passe ou votre token JWT. C&apos;est votre carte d&apos;identité à l&apos;entrée du bâtiment.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-800">2. Autorisation (403 Forbidden)</span>
            <p className="text-sm font-bold text-slate-900">« Avez-vous le droit d&apos;ouvrir cette porte ? »</p>
            <p className="text-xs text-slate-600 font-medium">
              Vérifie vos droits sur une ressource précise. Même si vous êtes un employé authentifié, vous n&apos;avez pas le droit d&apos;ouvrir le coffre-fort de la comptabilité !
            </p>
          </div>
        </div>

        <CodeBlock
          language="typescript"
          filename="authMiddleware.ts"
          code={`// ❌ MAUVAIS (Vulnérabilité IDOR) : On authentifie mais on n'autorise pas
app.get('/facture/:id', verifierToken, async (req, res) => {
  const facture = await db.getFacture(req.params.id);
  res.json(facture); // 💥 N'importe quel utilisateur connecté peut voir toutes les factures !
});

// ✅ BON (Sécurité robuste) : Contrôle d'autorisation strict
app.get('/facture/:id', verifierToken, async (req, res) => {
  const facture = await db.getFacture(req.params.id);
  
  // Vérification de propriété
  if (facture.clientId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: "Accès interdit à ce document" });
  }
  
  res.json(facture);
});`}
        />
      </section>

      {/* =========================================================================
          SECTION 6 : SYNTHÈSE DES POINTS CLÉS
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">6</span>
          <h2 className="text-xl font-bold text-slate-950">
            Synthèse du Chapitre 7
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-teal-500/10 border-2 border-emerald-300 space-y-2 text-sm sm:text-base font-medium text-slate-900">
          <p>• <strong>Le symptôme n&apos;est pas la cause :</strong> Ne masquez jamais une erreur sans en comprendre le moteur déclencheur.</p>
          <p>• <strong>L&apos;écran React est souvent innocent :</strong> Quand une page blanche ou une erreur 500 survient, ouvrez toujours l&apos;inspecteur Réseau et les logs du serveur backend en premier.</p>
          <p>• <strong>Lenteur = Requête SQL sans index :</strong> Utilisez toujours l&apos;outil <code>EXPLAIN</code> de MySQL pour démasquer les requêtes qui scannent des millions de lignes.</p>
          <p>• <strong>Authentification ≠ Autorisation :</strong> Toujours vérifier que l&apos;utilisateur connecté est bien le propriétaire de la ressource demandée.</p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — Symptômes et Causes Racines"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'un « symptôme » dans un système logiciel ?",
              options: [
                "L'erreur fondamentale cachée dans la base de données.",
                "La manifestation visible et observable du dysfonctionnement (ex: écran blanc, lenteur, alerte).",
                "Le commit Git écrit par le développeur.",
                "La marque de l'ordinateur portable.",
              ],
              correctIndex: 1,
              explanation: "Exactement ! Le symptôme est l'indice visible de l'extérieur. La cause est le défaut sous-jacent qui l'a engendré.",
            },
            {
              id: 2,
              question: "Le navigateur affiche une erreur rouge HTTP 500 dans la console. Où se trouve la cause la plus probable ?",
              options: [
                "Uniquement dans le style CSS du composant React.",
                "Dans le serveur backend (Node/Express) ou la base de données (MySQL) qui a subi un crash interne.",
                "Dans la souris ou le clavier de l'utilisateur.",
                "Dans la taille de l'écran du moniteur.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! Une réponse HTTP 500 signifie 'Internal Server Error' : le serveur a échoué dans son traitement. Le frontend n'a fait que recevoir le statut.",
            },
            {
              id: 3,
              question: "Quel outil SQL permet d'analyser en détail le plan d'exécution d'une requête et de repérer les index manquants ?",
              options: [
                "La commande SQL EXPLAIN.",
                "La commande DROP DATABASE.",
                "Un formateur de code CSS.",
                "La calculatrice.",
              ],
              correctIndex: 0,
              explanation: "Bravo ! EXPLAIN indique si MySQL parcourt 10 lignes grâce à un index ou 500 000 lignes une par une (Full Table Scan).",
            },
            {
              id: 4,
              question: "Quelle est la différence fondamentale entre Authentification et Autorisation ?",
              options: [
                "L'authentification valide qui vous êtes (identité), l'autorisation valide ce que vous avez le droit de faire ou de consulter.",
                "Ce sont deux mots strictement identiques.",
                "L'autorisation s'applique aux ordinateurs et l'authentification aux téléphones.",
                "L'authentification est gratuite et l'autorisation est payante.",
              ],
              correctIndex: 0,
              explanation: "Excellente réponse ! Être connecté (authentifié) ne vous donne pas le droit d'accéder aux factures d'un autre client (autorisation).",
            },
            {
              id: 5,
              question: "Si une page met 8 secondes à charger à cause d'une requête SQL lente, quelle est la bonne démarche d'ingénierie ?",
              options: [
                "Réécrire le code React pour ajouter des animations en attendant.",
                "Inspecter la requête SQL avec EXPLAIN, ajouter un index adapté et limiter le nombre de résultats avec LIMIT.",
                "Demander aux utilisateurs de changer de forfait internet.",
                "Supprimer tous les produits de la base de données.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! Traiter la cause racine (l'absence d'index et le scan complet) fait chuter le temps d'exécution de 8 000 ms à 12 ms !",
            },
          ]}
        />
      </section>
    </div>
  );
};
