'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Analyse des besoins et conception de l&apos;architecture
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Ce premier chapitre marque le lancement des <strong>Travaux Pratiques finaux (TP fil rouge)</strong> du cours Backend IA : la conception et le développement complet d&apos;une <strong>application d&apos;analyse intelligente optimisée</strong>. Réparti sur les 9 chapitres de ce module, ce TP vous place en situation réelle pour concevoir, coder, relier et tester l&apos;ensemble de la pile technique (Node.js, Express, MySQL, Google Gemini, SSE, Worker Threads, Redis et React).
        </p>
        <p className="text-base text-slate-800">
          Avant de commencer à programmer, un développeur backend doit analyser rigoureusement les besoins métier, identifier les fonctionnalités attendues et concevoir l&apos;architecture technique globale de son application. Cette première étape pose les fondations du projet complet.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin du chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprendre le fonctionnement global de l&apos;application.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Identifier les fonctionnalités nécessaires et le cahier des charges.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Définir les responsabilités étanches du frontend et du backend.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprendre la circulation des données de bout en bout.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Organiser les composants techniques de manière modulaire.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Préparer une architecture évolutive, découplée et hautement performante.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Présentation du projet */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Présentation du projet
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Nous allons développer une application permettant à un utilisateur de soumettre un texte pour demander une analyse à l&apos;intelligence artificielle.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <p className="text-xs uppercase font-extrabold text-indigo-700 tracking-wider">Scénario d&apos;utilisation type :</p>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-800 space-y-2">
            <p className="font-semibold text-slate-950">1. Un utilisateur saisit :</p>
            <p className="italic text-slate-700 bg-slate-50 p-2.5 rounded-lg border-l-4 border-amber-500">
              « Explique-moi les principales causes du changement climatique et propose cinq solutions concrètes. »
            </p>
            <p className="font-semibold text-slate-950 pt-1">2. Traitement dynamique :</p>
            <ul className="text-slate-700 text-sm space-y-1 list-disc list-inside">
              <li>L&apos;application transmet cette demande à Google Gemini.</li>
              <li>Gemini génère une réponse que le backend transmet progressivement au navigateur avec Server-Sent Events (SSE).</li>
              <li>L&apos;utilisateur voit la réponse apparaître mot par mot sans latence de blocage.</li>
              <li>L&apos;application conserve également l&apos;historique complet des analyses en base MySQL.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Identification des fonctionnalités */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Identification des fonctionnalités
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Avant de programmer, nous devons établir les fonctionnalités du projet. Ces fonctionnalités constituent notre cahier des charges fonctionnel initial :
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Fonctionnalité</th>
                <th className="py-3 px-4">Description technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Soumettre une analyse</td>
                <td className="py-2.5 px-4">Envoyer un texte au backend via une requête HTTP POST.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Générer une réponse IA</td>
                <td className="py-2.5 px-4">Interroger le modèle Google Gemini via le SDK officiel.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Streaming</td>
                <td className="py-2.5 px-4">Afficher progressivement la réponse au fur et à mesure avec SSE.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Historique</td>
                <td className="py-2.5 px-4">Conserver les anciennes analyses dans une base de données MySQL.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Consultation</td>
                <td className="py-2.5 px-4">Consulter le détail et l&apos;historique d&apos;une analyse précédente.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Cache</td>
                <td className="py-2.5 px-4">Réutiliser instantanément certains résultats identiques avec Redis.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Gestion des erreurs</td>
                <td className="py-2.5 px-4">Traiter les pannes d&apos;API, les timeouts réseau et les erreurs serveur.</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-4 font-bold text-amber-900">Traitement parallèle</td>
                <td className="py-2.5 px-4">Exécuter les calculs CPU intensifs hors du thread principal via Worker Threads.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Architecture générale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Architecture générale de l&apos;application
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Notre application sera organisée autour de trois grandes parties interconnectées :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Icon name="layout" className="w-4 h-4 text-indigo-700" />
              <span>Frontend React</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Interface visible par l&apos;utilisateur, formulaires réactifs, affichage du streaming temps réel et visualisation de l&apos;historique.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Icon name="server" className="w-4 h-4 text-amber-700" />
              <span>Backend Node.js / Express</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Traitement des requêtes HTTP, validation, coordination des services, streaming SSE et délestage des tâches lourdes.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Icon name="database" className="w-4 h-4 text-emerald-700" />
              <span>Services externes &amp; Stockage</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Google Gemini pour l&apos;inférence, MySQL pour la persistance relationnelle et Redis pour le cache en mémoire vive.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Composant</th>
                <th className="py-2.5 px-4">Responsabilité clé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">React</td>
                <td className="py-2 px-4">Affichage et interaction utilisateur.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Express</td>
                <td className="py-2 px-4">Gestion des routes HTTP et des middlewares.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Node.js</td>
                <td className="py-2 px-4">Environnement d&apos;exécution asynchrone du backend.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Gemini</td>
                <td className="py-2 px-4">Analyse et génération par intelligence artificielle.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">MySQL</td>
                <td className="py-2 px-4">Stockage permanent relationnel.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Redis</td>
                <td className="py-2 px-4">Cache ultra-rapide et limitation des requêtes (Rate Limiting).</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">Worker Threads</td>
                <td className="py-2 px-4">Calculs CPU intensifs parallélisés.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-bold text-slate-950">SSE</td>
                <td className="py-2 px-4">Transmission progressive des flux textuels.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Comprendre la circulation des données */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Comprendre la circulation des données
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          C&apos;est une notion essentielle pour un développeur Backend. Voici le cycle complet d&apos;une analyse IA :
        </p>

        <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
          <p className="text-amber-400 font-bold">{'// Cycle complet d\'une requête d\'analyse :'}</p>
          <p>1. Utilisateur   : Saisit sa demande dans le formulaire React.</p>
          <p>2. Frontend React: Envoie une requête HTTP POST au backend Express.</p>
          <p>3. Express       : Vérifie et valide les données reçues (taille, type).</p>
          <p>4. Redis         : Vérifie si un résultat réutilisable existe déjà dans le cache.</p>
          <p>5. Google Gemini : Si absent du cache, reçoit la demande et génère la réponse.</p>
          <p>6. Node.js (SSE) : Reçoit progressivement les fragments et les pousse au frontend.</p>
          <p>7. MySQL         : Enregistre la demande et le résultat final pour l&apos;historique.</p>
          <p>8. React         : Affiche la réponse complète et fluide à l&apos;utilisateur.</p>
        </div>

        <Callout type="info" title="Parallélisme streaming et écriture en base">
          <p className="text-sm leading-relaxed text-slate-800">
            Ce parcours représente le fonctionnement cible. Dans notre implémentation, l&apos;enregistrement dans MySQL est effectué à la fin de la génération, tandis que le streaming SSE est transmis en temps réel sans attendre l&apos;écriture disque.
          </p>
        </Callout>
      </section>

      {/* 6. Responsabilités Frontend / Backend */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Définition des responsabilités Frontend / Backend
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/40 space-y-2">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wider">
              Frontend React
            </h3>
            <ul className="text-xs sm:text-sm text-slate-800 space-y-1 list-disc list-inside">
              <li>Afficher les formulaires de saisie.</li>
              <li>Récupérer le texte saisi par l&apos;utilisateur.</li>
              <li>Envoyer les requêtes HTTP.</li>
              <li>Recevoir et parser les événements SSE.</li>
              <li>Afficher les réponses progressivement.</li>
              <li>Présenter l&apos;historique des analyses.</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
            <h3 className="text-sm font-black text-amber-950 uppercase tracking-wider">
              Backend Node.js
            </h3>
            <ul className="text-xs sm:text-sm text-slate-800 space-y-1 list-disc list-inside">
              <li>Recevoir et valider les requêtes HTTP.</li>
              <li>Conserver secrète la clé API Gemini.</li>
              <li>Communiquer avec Google Gemini.</li>
              <li>Gérer les requêtes SQL MySQL et le cache Redis.</li>
              <li>Maintenir ouvertes les connexions SSE.</li>
              <li>Déléguer aux Worker Threads quand nécessaire.</li>
              <li>Gérer les erreurs et les performances globales.</li>
            </ul>
          </div>
        </div>

        <Callout type="warning" title="Sécurité absolue des clés secrètes">
          <p className="text-sm leading-relaxed text-amber-950">
            Le frontend ne doit <strong>JAMAIS</strong> communiquer directement avec Gemini en utilisant une clé API secrète. Tout code s&apos;exécutant dans un navigateur est public et inspectable. Cette clé doit rester hermétiquement confinée dans le backend.
          </p>
        </Callout>
      </section>

      {/* 7. Choix de l'architecture technique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Choix de l&apos;architecture technique
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Pour notre projet, nous allons utiliser une architecture modulaire et découplée avec TypeScript :
        </p>

        <CodeBlock
          filename="Structure du projet modulaire"
          language="text"
          code={`intelligent-analysis/
├── frontend/             # Application React avec Vite
│   └── src/
└── backend/              # API Node.js avec Express & TypeScript
    ├── src/
    │   ├── config/       # Variables d'environnement et clients externes
    │   ├── controllers/  # Gestion des requêtes HTTP (Req, Res)
    │   ├── routes/       # Définition des endpoints REST
    │   ├── services/     # Logique métier et inférence Gemini
    │   ├── database/     # Connexion et requêtes préparées MySQL
    │   ├── cache/        # Gestion du client Redis et opérations clé-valeur
    │   ├── workers/      # Scripts Worker Threads pour calculs CPU
    │   ├── middlewares/  # Validation, sécurité et gestion des erreurs
    │   └── app.ts        # Point d'entrée de l'application Express
    ├── .env
    ├── package.json
    └── tsconfig.json`}
        />
      </section>

      {/* 8. Définition des principales routes API */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Définition des principales routes API
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Méthode</th>
                <th className="py-2.5 px-4">Endpoint</th>
                <th className="py-2.5 px-4">Fonction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-emerald-700">POST</td>
                <td className="py-2 px-4 font-mono font-semibold">/api/analyses</td>
                <td className="py-2 px-4">Créer une analyse classique.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-sky-700">GET</td>
                <td className="py-2 px-4 font-mono font-semibold">/api/analyses</td>
                <td className="py-2 px-4">Consulter l&apos;historique de toutes les analyses.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-sky-700">GET</td>
                <td className="py-2 px-4 font-mono font-semibold">/api/analyses/:id</td>
                <td className="py-2 px-4">Consulter le résultat d&apos;une analyse précise.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-indigo-700">GET / POST</td>
                <td className="py-2 px-4 font-mono font-semibold">/api/analyses/:id/stream</td>
                <td className="py-2 px-4">Diffuser une analyse mot à mot avec SSE.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-rose-700">DELETE</td>
                <td className="py-2 px-4 font-mono font-semibold">/api/analyses/:id</td>
                <td className="py-2 px-4">Supprimer une analyse de l&apos;historique.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Travaux pratiques — Analyse et conception
        </h2>
        <PracticalWork
          title="Atelier d'architecture logicielle"
          objective="Vérifier la maîtrise de la conception modulaire avant toute écriture de code."
          duration="45 min"
          steps={[
            "Exercice 1 (Compréhension) : Justifiez pourquoi l'architecture sépare le stockage MySQL (permanent) du cache Redis (en mémoire volatile), et pourquoi les Worker Threads sont dédiés aux calculs CPU.",
            "Exercice 2 (Conception) : Tracez sur schéma le trajet complet d'une requête de 2 000 caractères depuis le clic de l'utilisateur jusqu'à l'enregistrement SQL final.",
            "Exercice 3 (Organisation des fichiers) : Pour chaque composant (connexion MySQL, appel Gemini, route Express, calcul lourd, cache Redis), identifiez le dossier exact de l'arborescence src/ où il doit être implémenté."
          ]}
        />
      </section>

      {/* 10. Synthèse du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Synthèse du chapitre
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            Points clés à retenir :
          </p>
          <ul className="text-sm text-slate-900 space-y-1.5 list-disc list-inside font-medium">
            <li>On analyse toujours les besoins et le flux de données avant de programmer.</li>
            <li>React gère exclusivement l&apos;interface utilisateur et le rendu progressif.</li>
            <li>Node.js / Express orchestre le backend et sécurise les clés d&apos;API.</li>
            <li>Gemini réalise les analyses par intelligence artificielle.</li>
            <li>MySQL conserve les données de façon permanente et relationnelle.</li>
            <li>Redis accélère les traitements répétitifs et protège les quotas.</li>
            <li>SSE assure la diffusion mot à mot en temps réel.</li>
            <li>Worker Threads préviennent tout blocage de l&apos;Event Loop lors des calculs intensifs.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
