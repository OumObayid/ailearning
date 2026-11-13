'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

interface IncidentCase {
  id: number;
  title: string;
  situation: string;
  codeSnippet?: string;
  options: string[];
  correct: string;
  explanation: string;
}

export const Chapitre4Content: React.FC = () => {
  const [labAnswers, setLabAnswers] = useState<Record<number, string>>({});
  const [showLabResults, setShowLabResults] = useState(false);

  const incidentCases: IncidentCase[] = [
    {
      id: 1,
      title: 'Incident 1 : L\'appel fantôme',
      situation: 'Votre frontend React essaie de récupérer les données sur http://localhost:5000/api, mais votre serveur Node.js a démarré sur le port 3000.',
      codeSnippet: `// Console du navigateur :
GET http://localhost:5000/api/users net::ERR_CONNECTION_REFUSED`,
      options: ['Erreur Réseau', 'Erreur de Sécurité', 'Erreur Logique'],
      correct: 'Erreur Réseau',
      explanation: 'Le port 5000 n\'écoute personne. Le paquet réseau heurte une porte fermée, ce qui provoque un refus de connexion HTTP.',
    },
    {
      id: 2,
      title: 'Incident 2 : Le quiproquo des prénoms',
      situation: 'Le composant React envoie { userEmail: "claire@demo.fr" }, mais le serveur Express attend { email: string } et rejette la requête.',
      codeSnippet: `// Réponse API :
HTTP 400 Bad Request: "Missing required property: email"`,
      options: ['Erreur de Performance', 'Erreur d\'Intégration', 'Erreur d\'Infrastructure'],
      correct: 'Erreur d\'Intégration',
      explanation: 'Chaque bloc fonctionne parfaitement de son côté, mais le contrat de communication (l\'interface JSON) n\'est pas synchronisé entre les deux équipes.',
    },
    {
      id: 3,
      title: 'Incident 3 : Le colis introuvable',
      situation: 'Un développeur clone le projet sur son nouvel ordinateur et tape "npm start". Le terminal affiche immédiatement une erreur rouge.',
      codeSnippet: `// Terminal Node.js :
Error: Cannot find module 'axios'
Require stack: - /app/services/api.js`,
      options: ['Erreur de Dépendance', 'Erreur SQL', 'Erreur Logique'],
      correct: 'Erreur de Dépendance',
      explanation: 'Le package tiers "axios" n\'a pas été installé dans le dossier node_modules. Un simple "npm install" résout le problème !',
    },
    {
      id: 4,
      title: 'Incident 4 : La table invisible',
      situation: 'Lors d\'une recherche d\'articles, le serveur crash avec le message : ER_NO_SUCH_TABLE: Table \'boutique.produits\' doesn\'t exist.',
      codeSnippet: `// Log serveur MySQL :
SELECT * FROM produits WHERE categorie = 'informatique';
--> ER_NO_SUCH_TABLE (table manquante)`,
      options: ['Erreur Réseau', 'Erreur de Configuration', 'Erreur de Base de Données'],
      correct: 'Erreur de Base de Données',
      explanation: 'C\'est une anomalie au niveau du schéma relationnel : la table n\'a pas été créée ou la migration SQL n\'a pas été jouée.',
    },
    {
      id: 5,
      title: 'Incident 5 : La porte grande ouverte',
      situation: 'Un utilisateur change l\'URL de son profil de /facture/101 vers /facture/102 et visualise la facture et les coordonnées bancaires de son voisin.',
      codeSnippet: `// Route non sécurisée dans Express :
app.get('/facture/:id', async (req, res) => {
  // Aucune vérification pour savoir si req.params.id appartient au client connecté !
  const facture = await getFacture(req.params.id);
  res.json(facture);
});`,
      options: ['Erreur de Sécurité', 'Erreur de Performance', 'Erreur de Syntaxe'],
      correct: 'Erreur de Sécurité',
      explanation: 'C\'est une faille critique d\'autorisation (IDOR) : le serveur transmet des données sensibles sans contrôler les droits du demandeur.',
    },
    {
      id: 6,
      title: 'Incident 6 : Le serveur qui étouffe',
      situation: 'L\'application tourne bien pendant 3 jours, puis le serveur devient de plus en plus lent jusqu\'à s\'éteindre brutalement par manque de RAM.',
      codeSnippet: `// Monitoring serveur :
RAM: 2 Go (Jour 1) -> 8 Go (Jour 2) -> 16 Go (Jour 3) -> CRASH OOM (Out Of Memory)`,
      options: ['Erreur d\'Intégration', 'Erreur de Performance', 'Erreur de Données'],
      correct: 'Erreur de Performance',
      explanation: 'C\'est une fuite de mémoire (Memory Leak) : des objets continuent d\'être stockés sans jamais être libérés, saturant la mémoire vive.',
    },
  ];

  const handleSelect = (casId: number, val: string) => {
    setLabAnswers((prev) => ({ ...prev, [casId]: val }));
  };

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
          Chapitre 4 — Les différentes catégories d&apos;erreurs logicielles
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          Pourquoi 90% des pannes en production ne proviennent pas d&apos;une faute dans votre code, mais d&apos;un élément de son écosystème (réseau, base de données, configuration, sécurité).
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ne plus accuser son code par défaut</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Démystifier CORS, .env et les ports</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Diagnostiquer les pannes réelles</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LE PIÈGE DU DÉBUTANT (TOUT N'EST PAS DU CODE !)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Piège du débutant : « Ça plante, donc mon code est faux ! »
          </h2>
        </div>

        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
          Le premier réflexe d&apos;un développeur novice quand une page affiche une erreur est d&apos;ouvrir son fichier JavaScript ou React et de commencer à réécrire ses fonctions dans tous les sens.
        </p>

        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-black text-base">
            <Icon name="sparkles" className="w-5 h-5 text-amber-700" />
            <span>L&apos;analogie de la voiture en panne d&apos;essence</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            Si votre voiture refuse de démarrer le matin, est-ce que vous démontez immédiatement les pistons et la boîte de vitesse ? <strong>Bien sûr que non !</strong> Vous vérifiez d&apos;abord si le réservoir contient du carburant, si la batterie a du courant, ou si vous avez inséré la bonne clé.
          </p>
          <div className="p-3.5 rounded-xl bg-white/90 border border-amber-300 text-xs sm:text-sm text-slate-800 font-medium">
            En informatique, c&apos;est exactement pareil : votre code source n&apos;est qu&apos;une petite pièce d&apos;un grand puzzle qui comprend les <strong>variables d&apos;environnement</strong>, le <strong>réseau</strong>, la <strong>base de données</strong> et les <strong>serveurs</strong>.
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LE TOUR D'HORIZON DES 6 FAMILLES MAJEURES D'ERREURS
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Panorama des grandes catégories d&apos;erreurs
          </h2>
        </div>

        {/* 2.1 Programmation */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">A</span>
              <span>Erreurs de Programmation (Le Code Source)</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700 border">Algorithme &amp; Logique</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Défauts directs dans la logique ou oubli d&apos;un cas limite (par exemple diviser par zéro ou tenter de calculer la moyenne d&apos;une liste vide produisant <code>NaN</code>).
          </p>
          <CodeBlock
            language="typescript"
            filename="calculMoyenne.ts"
            code={`function calculerMoyenne(notes: number[]): number | null {
  // ✅ Protection du cas limite : liste vide
  if (notes.length === 0) return null;
  
  const total = notes.reduce((sum, n) => sum + n, 0);
  return total / notes.length;
}`}
          />
        </div>

        {/* 2.2 Configuration */}
        <div className="p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center">B</span>
              <span>Erreurs de Configuration (Le fichier .env &amp; l&apos;Environnement)</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-xs font-bold text-amber-900 border border-amber-300">Variables &amp; Secrets</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Le code est parfait, mais les paramètres d&apos;exécution sont introuvables : variable <code>DATABASE_URL</code> absente, clé d&apos;API Stripe non configurée, ou mauvais port serveur.
          </p>
          <Callout type="warning" title="Règle d'or absolue">
            Ne modifiez jamais votre code source pour &quot;compenser&quot; une variable d&apos;environnement manquante (comme écrire le mot de passe en dur dans le fichier) ! C&apos;est une très mauvaise pratique et une grave faille de sécurité.
          </Callout>
        </div>

        {/* 2.3 Données et Validation */}
        <div className="p-5 rounded-2xl bg-white border-2 border-blue-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">C</span>
              <span>Erreurs de Données &amp; Validation (Le Schéma)</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-xs font-bold text-blue-900 border border-blue-300">Formats &amp; Types</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            L&apos;application attend un entier positif pour l&apos;âge, mais reçoit la chaîne <code>&quot;vingt-cinq&quot;</code> ou un champ manquant. L&apos;utilisation d&apos;un outil de validation comme <strong>Zod</strong> permet d&apos;arrêter l&apos;erreur immédiatement à la frontière :
          </p>
          <CodeBlock
            language="typescript"
            filename="validationUser.ts"
            code={`import { z } from 'zod';

// Définition du contrat strict attendu
const UserSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 lettres"),
  age: z.number().int().positive("L'âge doit être un nombre positif")
});

const resultat = UserSchema.safeParse({ name: 'Ahmed', age: 'vingt-cinq' });
// resultat.success === false --> L'erreur est bloquée proprement avec un message clair !`}
          />
        </div>

        {/* 2.4 Réseau avec Image 3 (CORS) */}
        <div className="p-5 rounded-2xl bg-white border-2 border-purple-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-purple-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">D</span>
              <span>Erreurs Réseau (HTTP, Ports &amp; Erreurs CORS)</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-xs font-bold text-purple-900 border border-purple-300">Communication</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Rupture de communication : le serveur ne répond pas, le port est fermé, ou la douane du navigateur bloque la requête car le serveur n&apos;a pas autorisé les appels depuis votre nom de domaine (la fameuse erreur <strong>CORS</strong>) :
          </p>

          {/* Image 3 from Word Doc */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image3.jpeg"
              alt="Analyse d'erreurs réseau et blocage CORS dans Chrome DevTools Network"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.3 — Inspection des requêtes bloquées et erreurs CORS dans l&apos;onglet Network de Chrome DevTools.
            </div>
          </div>
        </div>

        {/* 2.5 Base de données & Intégration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <h4 className="font-bold text-base text-slate-950 flex items-center gap-2">
              <Icon name="database" className="w-4 h-4 text-emerald-700" />
              <span>E. Base de Données (SQL)</span>
            </h4>
            <p className="text-xs text-slate-700 font-medium">
              Nom de colonne inexistant, table non créée, contrainte d&apos;unicité violée (ex: tenter d&apos;enregistrer deux fois le même email) ou blocage concurrent (deadlock).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <h4 className="font-bold text-base text-slate-950 flex items-center gap-2">
              <Icon name="server" className="w-4 h-4 text-indigo-700" />
              <span>F. Intégration (Contrats d&apos;API)</span>
            </h4>
            <p className="text-xs text-slate-700 font-medium">
              Le frontend envoie <code>username</code> mais le backend attend <code>name</code>. Chaque équipe travaille bien de son côté, mais elles ne parlent pas le même langage JSON !
            </p>
          </div>
        </div>

        {/* 2.6 Performance avec Image 4 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <Icon name="chart-bar" className="w-5 h-5 text-emerald-700" />
              <span>G. Erreurs de Performance &amp; Profilage</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700 border">RAM &amp; CPU</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Le code fonctionne parfaitement, mais il met 12 secondes à répondre ou consomme toute la mémoire RAM du serveur jusqu&apos;à faire planter la machine :
          </p>

          {/* Image 4 from Word Doc */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image4.jpeg"
              alt="Profilage des performances et analyse de flame graph dans Chrome DevTools"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.4 — Analyse de la timeline d&apos;exécution, des microtâches et des goulets d&apos;étranglement avec Chrome DevTools Performance.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : TABLEAU COMPARATIF DES 10 FAMILLES
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            Tableau synthétique des 10 familles d&apos;erreurs
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200 font-black">
              <tr>
                <th className="p-3">Catégorie</th>
                <th className="p-3">Origine réelle</th>
                <th className="p-3">Exemple typique</th>
                <th className="p-3">Outil recommandé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3 font-bold text-emerald-900">Programmation</td>
                <td className="p-3">Logique du code source</td>
                <td className="p-3">Division par zéro ou boucle infinie</td>
                <td className="p-3">VS Code Debugger</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Configuration</td>
                <td className="p-3">Environnement &amp; variables</td>
                <td className="p-3">Port serveur occupé ou .env absent</td>
                <td className="p-3">Fichiers .env, Terminal</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Données &amp; Types</td>
                <td className="p-3">Structure non conforme</td>
                <td className="p-3">Texte au lieu d&apos;un nombre</td>
                <td className="p-3">Zod, TypeScript</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Réseau &amp; CORS</td>
                <td className="p-3">Transport de paquets HTTP</td>
                <td className="p-3">Blocage CORS, timeout, port fermé</td>
                <td className="p-3">Chrome DevTools Network</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Base de données</td>
                <td className="p-3">Moteur relationnel SQL</td>
                <td className="p-3">Table inconnue, doublon d&apos;email unique</td>
                <td className="p-3">MySQL Workbench, Prisma Studio</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Intégration</td>
                <td className="p-3">Contrats entre front et back</td>
                <td className="p-3">Propriété JSON mal orthographiée</td>
                <td className="p-3">Postman, Swagger/OpenAPI</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Dépendances</td>
                <td className="p-3">Packages tiers npm</td>
                <td className="p-3">Module non installé (Cannot find module)</td>
                <td className="p-3">package.json, npm install</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Sécurité</td>
                <td className="p-3">Contrôle d&apos;accès</td>
                <td className="p-3">Accès aux données d&apos;un autre client (IDOR)</td>
                <td className="p-3">Middleware Auth, OWASP</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Performance</td>
                <td className="p-3">Mémoire RAM et CPU</td>
                <td className="p-3">Requête SQL lente, fuite mémoire</td>
                <td className="p-3">Chrome Performance, htop</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Infrastructure</td>
                <td className="p-3">Serveur et Système OS</td>
                <td className="p-3">Disque dur saturé, droits de fichiers</td>
                <td className="p-3">SSH, df -h, logs système</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : LABORATOIRE PRATIQUE INTERACTIF (6 CAS RÉELS)
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            Laboratoire Interactif : Testez votre flair d&apos;enquêteur
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Face à ces 6 situations réelles vécues en entreprise, choisissez la catégorie technique exacte :
        </p>

        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-4">
            {incidentCases.map((cas) => {
              const selected = labAnswers[cas.id];
              const isCorrect = selected === cas.correct;

              return (
                <div key={cas.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm sm:text-base text-slate-950">{cas.title}</span>
                    {showLabResults && selected && (
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    {cas.situation}
                  </p>

                  {cas.codeSnippet && (
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-lime-300 overflow-x-auto whitespace-pre">
                      {cas.codeSnippet}
                    </div>
                  )}

                  {/* Options Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cas.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelect(cas.id, opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          selected === opt
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Feedback Explanation */}
                  {showLabResults && (
                    <div className={`p-3 rounded-xl text-xs font-medium ${
                      isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}>
                      <strong>Réponse attendue : {cas.correct}</strong> — {cas.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowLabResults(!showLabResults)}
              className="px-6 py-3 rounded-xl bg-slate-950 text-white font-black text-sm hover:bg-slate-800 transition shadow-md"
            >
              {showLabResults ? 'Masquer les explications' : 'Vérifier mes 6 diagnostics'}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — Classifier les pannes logicielles"
          questions={[
            {
              id: 1,
              question: "Une variable d'environnement DATABASE_URL est absente dans le fichier .env. Quelle catégorie correspond le mieux ?",
              options: [
                "Une erreur de configuration.",
                "Une erreur de performance.",
                "Une erreur logique.",
                "Une erreur de sécurité.",
              ],
              correctIndex: 0,
              explanation: "Exact ! C'est une erreur de configuration d'environnement indispensable à l'initialisation du service.",
            },
            {
              id: 2,
              question: "Le frontend envoie la propriété 'username' alors que le backend attend 'name'. Il s'agit de :",
              options: [
                "Une erreur réseau physique.",
                "Une erreur d'intégration (désynchronisation du contrat JSON).",
                "Une coupure de fibre optique.",
                "Une erreur de performance.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! Chaque bloc tourne isolément sans bug interne, mais ils ne parlent pas le même langage JSON d'interfaçage.",
            },
            {
              id: 3,
              question: "Votre terminal affiche : Error: Cannot find module 'express'. Quelle est la solution appropriée ?",
              options: [
                "Réécrire le serveur en Python.",
                "Exécuter 'npm install express' pour installer la dépendance manquante.",
                "Supprimer le fichier de base de données.",
                "Changer d'écran d'ordinateur.",
              ],
              correctIndex: 1,
              explanation: "Bien joué ! Il s'agit d'une erreur de dépendance : le package n'est pas présent dans node_modules.",
            },
            {
              id: 4,
              question: "Une requête SQL prend 18 secondes pour retourner 5 lignes sur une table de 2 millions de clients. Quelle catégorie investiguer ?",
              options: [
                "Erreur de syntaxe dans le HTML.",
                "Erreur de performance (manque d'un index SQL sur la colonne recherchée).",
                "Erreur de couleur CSS.",
                "Erreur de clavier.",
              ],
              correctIndex: 1,
              explanation: "Exactement ! Le moteur SQL parcourt les 2 millions de lignes une par une (Full Table Scan) faute d'index adapté.",
            },
            {
              id: 5,
              question: "Une API permet à n'importe qui de modifier le profil d'un autre utilisateur sans vérifier les droits. C'est :",
              options: [
                "Une faille critique de sécurité (défaut d'autorisation).",
                "Une simple erreur de syntaxe.",
                "Un problème de câble réseau.",
                "Une fonctionnalité normale.",
              ],
              correctIndex: 0,
              explanation: "Tout à fait ! C'est une faille de contrôle d'accès (Broken Access Control / IDOR) qui menace l'intégrité des données.",
            },
          ]}
        />
      </section>
    </div>
  );
};
