'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { FullStackAuditCapstoneLab } from '@/components/interactive/FullStackAuditCapstoneLab';

interface ArchLayer {
  id: string;
  name: string;
  tech: string;
  role: string;
  criticalFiles: string[];
  vulnerabilities: string[];
}

const ARCH_LAYERS: ArchLayer[] = [
  {
    id: 'frontend',
    name: '1. Couche Présentation (Frontend Client)',
    tech: 'React 19 + Vite / TailwindCSS',
    role: 'Interface utilisateur, formulaires d\'authentification, upload de documents et affichage des analyses IA.',
    criticalFiles: ['src/frontend/App.tsx', 'src/frontend/hooks/useAuth.ts', 'src/frontend/components/DocumentUpload.tsx'],
    vulnerabilities: [
      'Désalignement de clés dans les payloads JSON (passwordUser au lieu de password)',
      'Gestion déficiente des états d\'attente réseau (aucun feedback visuel en cas de timeout)',
      'Absence d\'interception globale des erreurs HTTP 401/403'
    ]
  },
  {
    id: 'gateway',
    name: '2. Couche Serveur & Middlewares (API Gateway)',
    tech: 'Node.js 22 + Express 5 + JWT + Multer',
    role: 'Routage HTTP, parsing JSON, upload multipart/form-data, validation des tokens d\'accès Bearer.',
    criticalFiles: ['src/backend/server.ts', 'src/backend/routes/api.routes.ts', 'src/backend/middlewares/auth.middleware.ts'],
    vulnerabilities: [
      'Middlewares de parsing JSON placés après les routes Multer provoquant des corps de requêtes vides',
      'Absence de validation de taille maximale sur les uploads Multer (risque d\'épuisement de mémoire buffer)',
      'Décodage non sécurisé de JWT sans vérification d\'algorithme (alg: none)'
    ]
  },
  {
    id: 'business',
    name: '3. Couche Métier & Services (Domain Services)',
    tech: 'TypeScript Strict + Services découplés',
    role: 'Orchestration métier, calculs financiers, règles de validation Zod et intégration du client IA Gemini.',
    criticalFiles: ['src/backend/services/order.service.ts', 'src/backend/services/gemini.service.ts'],
    vulnerabilities: [
      'Appels synchrones bloquants vers l\'API Google Gemini sans timeout d\'abandon (AbortController)',
      'Couplage fort entre le contrôleur et les requêtes SQL sans gestion des cas de retours null',
      'Secrets d\'API hardcodés dans les fichiers au lieu de variables d\'environnement validées'
    ]
  },
  {
    id: 'persistence',
    name: '4. Couche Données (Persistence MySQL)',
    tech: 'MySQL 8.4 + Pool de connexions mysql2',
    role: 'Stockage relationnel ACID des utilisateurs, commandes, audits et métadonnées de documents analysés.',
    criticalFiles: ['src/backend/config/database.ts', 'src/backend/repositories/user.repository.ts'],
    vulnerabilities: [
      'Pool de connexions saturé : absence de libération des connexions (connection leak) en cas d\'exception dans un bloc try sans finally',
      'Injections SQL potentielles par concaténation directe de filtres dynamiques',
      'Absence d\'index sur les colonnes de recherche fréquentes (ex: tenant_id, created_at)'
    ]
  }
];

export const Chapitre1Content: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<ArchLayer>(ARCH_LAYERS[0]);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.1</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Inspection et Cartographie de l&apos;Architecture du Projet Capstone
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Bienvenue dans le grand projet d&apos;homologation. Vous prenez en charge une application fullstack d&apos;entreprise (React 19, Express 5, MySQL 8, JWT, Multer et Gemini API) criblée d&apos;anomalies fonctionnelles, de failles de sécurité et de goulots d&apos;étranglement. Première règle d&apos;or : <strong>on n&apos;écrit aucune ligne de code sans cartographie d&apos;architecture préalable</strong>.
        </p>
      </div>

      {/* Section 1: Pourquoi inspecter l'architecture ? */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Principes Fondamentaux</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Pourquoi cartographier avant de déboguer ?
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Sur un système multicouche en production, un symptôme visible côté client (ex: une boîte de dialogue d&apos;erreur rouge dans React) n&apos;est presque jamais la cause racine du problème. Le bug peut résider dans six couches distinctes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-1">Écran Client</div>
            <div className="text-sm font-bold text-slate-900 mb-1">React / Navigation</div>
            <p className="text-xs text-slate-600">Payload corrompu ou désynchronisation du state local.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-1">Middleware HTTP</div>
            <div className="text-sm font-bold text-slate-900 mb-1">Express / JWT / Multer</div>
            <p className="text-xs text-slate-600">Rejet d&apos;authentification ou parsing multipart tronqué.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-1">Persistence & Données</div>
            <div className="text-sm font-bold text-slate-900 mb-1">MySQL / Pool mysql2</div>
            <p className="text-xs text-slate-600">Verrou mort (deadlock) ou saturation du pool de connexions.</p>
          </div>
        </div>

        <Callout type="warning" title="La règle de suspension d'intervention">
          Pendant toute la phase d&apos;inspection architecturale, <strong>aucune modification de fichier n&apos;est autorisée</strong>, ni par vous ni par l&apos;agent d&apos;IA. Tout diagnostic prématuré débouche sur des patchs aveugles qui déplacent le problème au lieu de le résoudre.
        </Callout>
      </section>

      {/* Section 2: Arborescence Technique de Référence */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Arborescence Industrielle</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Anatomie de la base de code du projet Capstone
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Voici la topologie exacte du repository sur lequel s&apos;articule l&apos;ensemble de ce Module 7. Notez la séparation stricte des responsabilités :
        </p>

        <CodeBlock language="text">{`capstone-audit-enterprise/
├── package.json                   # Scripts de build, dépendances Vitest, Supertest, Express
├── tsconfig.json                  # Typage strict TypeScript (noImplicitAny, strictNullChecks)
├── .env.example                   # Gabarit des variables requises (PORT, DB_*, GEMINI_API_KEY)
├── src/
│   ├── frontend/                  # Application React 19 Client
│   │   ├── components/            # Formulaires, Uploader Multer, Dashboards
│   │   ├── hooks/useAuth.ts       # Gestion du token JWT et cycle de session
│   │   └── services/api.ts        # Client HTTP Fetch avec gestion des headers
│   └── backend/                   # Serveur d'API Express 5
│       ├── config/
│       │   └── database.ts        # Initialisation du pool MySQL avec gestion d'erreurs
│       ├── middlewares/
│       │   ├── auth.middleware.ts # Vérification du JWT Bearer et des rôles
│       │   └── upload.ts          # Configuration du stockage Multer et validation MIME
│       ├── controllers/
│       │   ├── auth.controller.ts # Login, logout, refresh token
│       │   ├── order.controller.ts# CRUD commandes et calcul de taxes
│       │   └── ai.controller.ts   # Point d'entrée de l'analyse documentaire Gemini
│       ├── services/
│       │   ├── gemini.service.ts  # Client SDK Google GenAI avec timeout et fallback
│       │   └── order.service.ts   # Logique métier et transactions ACID
│       └── repositories/
│           ├── user.repository.ts # Requêtes préparées SQL sur la table users
│           └── order.repository.ts# Requêtes jointures complexes et gestion d'index
└── test/                          # Suite automatisée de non-régression
    ├── unit/                      # Tests unitaires purs sous Vitest
    └── integration/               # Tests d'API HTTP complets sous Supertest`}</CodeBlock>
      </section>

      {/* Section 3: Explorateur de Couches d'Architecture */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Explorateur Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Cartographie Dynamique des 4 Couches & Vulnérabilités Typiques
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Cliquez sur chaque couche de l&apos;application pour examiner son rôle, ses fichiers critiques et les pièges d&apos;architecture découverts lors de l&apos;audit initial :
        </p>

        {/* Boutons sélecteurs de couche */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {ARCH_LAYERS.map((layer) => {
            const isSelected = selectedLayer.id === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-400 font-bold shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-black uppercase text-emerald-800">{layer.tech}</div>
                <div className="text-xs sm:text-sm font-bold mt-1 line-clamp-1">{layer.name}</div>
              </button>
            );
          })}
        </div>

        {/* Détails de la couche sélectionnée */}
        <div className="p-6 rounded-2xl bg-white border border-slate-300 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-emerald-700">Fiche de Couche Technique</span>
              <h3 className="text-lg font-black text-slate-950">{selectedLayer.name}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
              Stack : {selectedLayer.tech}
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Rôle dans le système :</div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">{selectedLayer.role}</p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Fichiers sensibles à inspecter en priorité :</div>
            <div className="flex flex-wrap gap-2">
              {selectedLayer.criticalFiles.map((file, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800">
                  {file}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">Anomalies architecturales détectées :</div>
            <ul className="space-y-2">
              {selectedLayer.vulnerabilities.map((vuln, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-rose-50/60 p-2.5 rounded-lg border border-rose-100">
                  <span className="text-rose-600 font-black">⚠️</span>
                  <span>{vuln}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Laboratoire Capstone */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Banc d&apos;Essai Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
            <Icon name="terminal" className="w-6 h-6 text-emerald-700" />
            <span>4. Laboratoire Interactif Capstone : Audit, RCA &amp; Homologation</span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Ce simulateur sera votre fil conducteur tout au long du Module 7. Explorez les phases de cartographie, identifiez les trois bugs majeurs du projet et préparez votre feuille de route d&apos;investigation :
        </p>

        <FullStackAuditCapstoneLab />
      </section>

      {/* Section 5: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Contrôle des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            5. Quiz : Fondements d&apos;inspection d&apos;une architecture logicielle complète
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.1 — Cartographie et Inspection Architecturale"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il impératif de cartographier l'ensemble de l'architecture avant de tenter de résoudre le moindre bug dans un grand projet ?",
              options: [
                "Pour permettre aux développeurs de recharger leur mémoire cache interne.",
                "Parce qu'un symptôme visible dans l'interface utilisateur peut provenir d'un middleware, d'un contrôleur, d'une requête MySQL ou d'un service tiers externe non maîtrisé.",
                "Parce que Git refuse de commiter des dépôts dont l'arborescence n'a pas été imprimée sur papier.",
                "Pour remplacer obligatoirement tous les composants React par des pages HTML statiques."
              ],
              correctIndex: 1,
              explanation: "Le débogage sans vue d'ensemble conduit inévitablement à appliquer des patchs superficiels (symptom masking) sur la couche visible plutôt que de traiter la cause racine dans la couche d'origine."
            },
            {
              id: 2,
              question: "Dans une architecture Express moderne avec MySQL et Multer, quel problème d'ordre de middlewares provoque fréquemment des 'req.body' vides ou corrompus ?",
              options: [
                "L'activation de l'option gzip de compression HTTP.",
                "Le positionnement du parser de corps (ex: express.json()) après la déclaration des routes de téléversement multipart Multer ou des routes d'authentification.",
                "L'utilisation de variables typées en TypeScript strict.",
                "L'absence de fichier .gitignore à la racine du projet."
              ],
              correctIndex: 1,
              explanation: "Express évalue les middlewares séquentiellement. Si un middleware consommateur de flux est déclaré après la route, le corps de la requête n'est pas instancié au moment de l'accès dans le contrôleur."
            },
            {
              id: 3,
              question: "Qu'appelle-t-on une fuite de connexion (Connection Leak) dans un pool de base de données MySQL (mysql2) ?",
              options: [
                "Un câble réseau débranché dans la salle serveur.",
                "L'omission de restituer une connexion au pool (conn.release()) lorsqu'une exception est levée dans un bloc try sans bloc finally, provoquant la saturation totale du pool sous forte charge.",
                "Une requête SQL qui renvoie plus de 1 000 lignes de résultat.",
                "L'utilisation du protocole TLS 1.3."
              ],
              correctIndex: 1,
              explanation: "Si chaque erreur d'exécution laisse une connexion du pool 'occupée', le pool finit par refuser toute nouvelle requête client, provoquant un blocage complet (hang) de l'API."
            },
            {
              id: 4,
              question: "Pourquoi l'appel à une API IA externe (comme Google Gemini) sans AbortController représente-t-il un danger critique de disponibilité ?",
              options: [
                "Parce que Gemini facture les requêtes deux fois plus cher sans AbortController.",
                "Parce qu'un ralentissement du réseau ou de l'API externe bloque indéfiniment les workers Node.js et les sockets ouvertes des clients, provoquant l'épuisement des threads et le crash de l'API.",
                "Parce que TypeScript refusera de transpiler le mot-clé await.",
                "Parce que les navigateurs Safari n'acceptent que les requêtes de moins de 1 seconde."
              ],
              correctIndex: 1,
              explanation: "Sans délai d'expiration (timeout) et mécanisme d'abandon (AbortSignal), une latence chez le fournisseur tiers paralyse les ressources du serveur Node.js jusqu'au crash global."
            },
            {
              id: 5,
              question: "Dans le pattern Repository, quelle est la responsabilité exclusive de la couche 'repositories/' ?",
              options: [
                "Rendre les composants graphiques React avec TailwindCSS.",
                "Isoler complètement les requêtes de données SQL de bas niveau et la sérialisation des entités, afin que les services métier n'aient pas de dépendance directe au dialecte SQL.",
                "Gérer les sessions utilisateurs et les cookies HTTP-only.",
                "Compiler les assets CSS et JavaScript pour la production."
              ],
              correctIndex: 1,
              explanation: "Le pattern Repository sépare la logique métier (services) de la persistence (SQL). Cela permet de tester la logique métier avec des mocks sans avoir besoin d'une vraie base de données active."
            },
            {
              id: 6,
              question: "Que doit-on impérativement vérifier lors de l'inspection de la configuration d'environnement (.env.example) d'un projet ?",
              options: [
                "Que tous les mots de passe et clés de production y sont inscrits en clair.",
                "Que toutes les variables requises (ports, credentials DB, JWT secret, clés d'API) sont listées avec des valeurs fictives ou documentées, et que le vrai fichier .env est exclu du contrôle de version Git.",
                "Que le fichier pèse au moins 5 mégaoctets.",
                "Que le nom du fichier est écrit entièrement en lettres majuscules."
              ],
              correctIndex: 1,
              explanation: "Le fichier .env.example sert de contrat de configuration documentaire pour les développeurs, tandis que le fichier .env réel contenant les vrais secrets doit impérativement rester ignoré par Git pour prévenir toute fuite."
            }
          ]}
        />
      </section>
    </div>
  );
};
