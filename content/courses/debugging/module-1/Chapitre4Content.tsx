'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  const [labAnswers, setLabAnswers] = useState<Record<number, string>>({});
  const [showLabResults, setShowLabResults] = useState(false);

  const handleSelect = (casId: number, val: string) => {
    setLabAnswers((prev) => ({ ...prev, [casId]: val }));
  };

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Les différentes catégories d&apos;erreurs logicielles
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Au-delà du simple code source
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans une architecture logicielle moderne, le code écrit par le développeur ne représente qu&apos;une fraction du système global. Une anomalie peut émaner de la configuration, des protocoles réseau, de la modélisation des données, des librairies tierces ou de l&apos;infrastructure d&apos;hébergement.
        </p>
        <p className="text-base text-slate-800 font-medium">
          L&apos;objectif de ce chapitre est d&apos;apprendre à <strong>classifier immédiatement une erreur selon son domaine technique réel</strong> afin d&apos;orienter les investigations avec précision.
        </p>
      </section>

      {/* 2. Catégories détaillées */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Panorama des grandes catégories d&apos;erreurs
        </h2>

        {/* 2.1 Programmation */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">A. Erreurs de Programmation (Programming Errors)</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-700 border">Code source</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Défauts directs d&apos;algorithme, mauvaise gestion des types ou cas limites non pris en compte (par exemple diviser par la taille d&apos;un tableau vide produisant <code>NaN</code>).
          </p>
          <pre className="font-mono text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-900">
{`function calculerMoyenne(notes) {
  if (notes.length === 0) return null; // Prise en compte du cas limite
  return notes.reduce((sum, n) => sum + n, 0) / notes.length;
}`}
          </pre>
        </div>

        {/* 2.2 Configuration */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">B. Erreurs de Configuration (Configuration Errors)</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-700 border">Environnement</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Le code est parfait, mais les paramètres d&apos;exécution sont erronés ou absents : fichier <code>.env</code> non chargé, port serveur occupé, ou mauvaises règles CORS.
          </p>
          <Callout type="warning" title="Distinction fondamentale">
            Une erreur de configuration n&apos;est pas une erreur de code. Modifier le code source pour &quot;compenser&quot; une variable d&apos;environnement manquante est une faute grave d&apos;ingénierie.
          </Callout>
        </div>

        {/* 2.3 Données & Validation */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">C. Erreurs de Données &amp; Validation</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-700 border">Schéma &amp; Format</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Données reçues non conformes au contrat attendu (chaîne reçue là où un entier est exigé, champ requis manquant).
          </p>
          <pre className="font-mono text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-900">
{`import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(2),
  age: z.number().int().positive()
});

const validation = UserSchema.safeParse({ name: 'Ahmed', age: 'vingt-cinq' });
// validation.success === false -> Détection précoce dès la frontière de l'API`}
          </pre>
        </div>

        {/* 2.4 Réseau avec Image 3 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">D. Erreurs Réseau (Network Errors)</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-700 border">HTTP / TLS / CORS</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Rupture de communication entre deux systèmes : port inaccessible, certificat HTTPS expiré, latence excessive ou blocage des en-têtes CORS entre deux domaines.
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

        {/* 2.5 Base de données */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">E. Erreurs de Base de Données (Database Errors)</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-700 border">SQL &amp; MySQL</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Requêtes syntaxiquement invalides, noms de colonnes mal orthographiés, violation de contraintes d&apos;unicité ou deadlocks en concurrence.
          </p>
        </div>

        {/* 2.6 Intégration */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">F. Erreurs d&apos;Intégration (Integration Errors)</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-700 border">Contrats d&apos;API</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Chaque composant fonctionne isolément, mais la communication inter-systèmes échoue à cause d&apos;une rupture de contrat (ex: le frontend envoie <code>username</code> alors que le backend attend <code>name</code>).
          </p>
        </div>

        {/* 2.7 Dépendances & Sécurité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <h4 className="font-black text-base text-slate-950">G. Erreurs de Dépendances</h4>
            <p className="text-xs text-slate-700 font-medium">
              Versions incompatibles entre packages npm, suppression d&apos;une méthode dans une mise à jour majeure ou modules manquants.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <h4 className="font-black text-base text-slate-950">H. Erreurs de Sécurité</h4>
            <p className="text-xs text-slate-700 font-medium">
              Failles d&apos;autorisation (IDOR), absence de contrôle d&apos;accès, clés API exposées côté client ou injection SQL.
            </p>
          </div>
        </div>

        {/* 2.8 Performance avec Image 4 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">I. Erreurs de Performance (Performance Errors)</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-black text-slate-700 border">Profiling &amp; Profilage</span>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Le code fonctionne fonctionnellement, mais consomme excessivement de mémoire RAM, sature le CPU ou met plusieurs secondes à répondre.
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

      {/* 3. Tableau comparatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Synthèse des 10 familles d&apos;erreurs
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200 font-black">
              <tr>
                <th className="p-3">Catégorie</th>
                <th className="p-3">Origine technique</th>
                <th className="p-3">Exemple typique</th>
                <th className="p-3">Outil clé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3 font-bold text-emerald-900">Programmation</td>
                <td className="p-3">Logique du code source</td>
                <td className="p-3">Mauvaise formule ou boucle infinie</td>
                <td className="p-3">VS Code Debugger</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Configuration</td>
                <td className="p-3">Variables et paramètres</td>
                <td className="p-3">Port serveur indisponible ou .env manquant</td>
                <td className="p-3">Fichiers .env, Terminal</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Données</td>
                <td className="p-3">Format et types de données</td>
                <td className="p-3">Chaîne au lieu d&apos;un nombre</td>
                <td className="p-3">Zod, Postman</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Réseau</td>
                <td className="p-3">Communication inter-systèmes</td>
                <td className="p-3">Erreur CORS, timeout, DNS</td>
                <td className="p-3">Chrome DevTools Network</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Base de données</td>
                <td className="p-3">Moteur SQL</td>
                <td className="p-3">Colonne inconnue, violation de contrainte</td>
                <td className="p-3">MySQL Workbench, EXPLAIN</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Intégration</td>
                <td className="p-3">Interaction frontend/backend</td>
                <td className="p-3">Propriété JSON désynchronisée</td>
                <td className="p-3">Postman, Swagger/OpenAPI</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Dépendances</td>
                <td className="p-3">Packages tiers</td>
                <td className="p-3">Package npm manquant ou incompatible</td>
                <td className="p-3">package.json, npm audit</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Sécurité</td>
                <td className="p-3">Contrôle d&apos;accès et validation</td>
                <td className="p-3">Absence de contrôle d&apos;autorisation</td>
                <td className="p-3">Tests d&apos;intrusion, OWASP ZAP</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Performance</td>
                <td className="p-3">Ressources machine</td>
                <td className="p-3">Requête SQL sans index, fuite mémoire</td>
                <td className="p-3">Chrome Performance / Memory</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-900">Infrastructure</td>
                <td className="p-3">Système et OS</td>
                <td className="p-3">Disque plein, permissions serveur</td>
                <td className="p-3">SSH, htop, df -h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Laboratoire interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Laboratoire pratique : Identifier la catégorie dominante
        </h2>
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-6">
          <p className="text-sm font-semibold text-slate-800">
            Sélectionnez la catégorie technique exacte pour chacun des 6 cas d&apos;incident réels :
          </p>

          <div className="space-y-4 text-sm font-medium">
            {/* Cas 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-950">Cas 1 : Une application React appelle une API sur le port 5000 alors que le serveur écoute sur le port 3000.</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Erreur réseau', 'Erreur de sécurité', 'Erreur logique'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(1, opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      labAnswers[1] === opt ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showLabResults && (
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  ✓ Réponse : Erreur réseau (le port cible n&apos;est pas accessible par le client HTTP).
                </div>
              )}
            </div>

            {/* Cas 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-950">Cas 2 : Le backend attend une propriété <code>email</code>, mais le frontend transmet <code>userEmail</code>.</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Erreur de performance', 'Erreur d\'intégration', 'Erreur d\'infrastructure'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(2, opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      labAnswers[2] === opt ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showLabResults && (
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  ✓ Réponse : Erreur d&apos;intégration (rupture de contrat entre deux composants autonomes).
                </div>
              )}
            </div>

            {/* Cas 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-950">Cas 3 : Node.js affiche <code>Error: Cannot find module &apos;axios&apos;</code>.</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Erreur de dépendance', 'Erreur SQL', 'Erreur logique'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(3, opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      labAnswers[3] === opt ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showLabResults && (
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  ✓ Réponse : Erreur de dépendance (package npm non installé dans node_modules).
                </div>
              )}
            </div>

            {/* Cas 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-950">Cas 4 : Une requête MySQL échoue car la table <code>produits</code> n&apos;existe pas.</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Erreur réseau', 'Erreur de configuration', 'Erreur de base de données'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(4, opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      labAnswers[4] === opt ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showLabResults && (
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  ✓ Réponse : Erreur de base de données (entité manquante dans le schéma relationnel).
                </div>
              )}
            </div>

            {/* Cas 5 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-950">Cas 5 : Une API renvoie les données personnelles d&apos;un profil sans vérifier les permissions du token.</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Erreur de sécurité', 'Erreur de performance', 'Erreur de syntaxe'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(5, opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      labAnswers[5] === opt ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showLabResults && (
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  ✓ Réponse : Erreur de sécurité (défaut critique d&apos;autorisation côté serveur).
                </div>
              )}
            </div>

            {/* Cas 6 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-950">Cas 6 : Une application consomme progressivement toute la mémoire RAM du serveur jusqu&apos;au crash.</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Erreur d\'intégration', 'Erreur de performance', 'Erreur de données'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(6, opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      labAnswers[6] === opt ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showLabResults && (
                <div className="text-xs font-bold text-emerald-700 mt-1">
                  ✓ Réponse : Erreur de performance (fuite de mémoire / memory leak non nettoyée).
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowLabResults(!showLabResults)}
              className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-black text-sm hover:bg-slate-800 transition"
            >
              {showLabResults ? 'Masquer la correction' : 'Vérifier mes réponses'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Synthèse & Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Les Catégories d'Erreurs"
          questions={[
            {
              id: 1,
              question: "Une variable d'environnement DB_HOST est absente dans le fichier .env. Quelle catégorie correspond le mieux ?",
              options: [
                "Une erreur de configuration.",
                "Une erreur de performance.",
                "Une erreur logique.",
                "Une erreur de sécurité.",
              ],
              correctIndex: 0,
              explanation: "C'est une erreur de configuration d'environnement nécessaire à l'initialisation du service.",
            },
            {
              id: 2,
              question: "Le frontend envoie 'username' alors que le backend attend 'name'. Il s'agit principalement de :",
              options: [
                "Une erreur de réseau.",
                "Une erreur d'intégration.",
                "Une erreur d'infrastructure.",
                "Une erreur de performance.",
              ],
              correctIndex: 1,
              explanation: "Chaque système fonctionne isolément, mais leur interfaçage échoue par désynchronisation du contrat.",
            },
            {
              id: 3,
              question: "Une application ne trouve pas le package Express. De quelle catégorie s'agit-il ?",
              options: [
                "Erreur de données.",
                "Erreur de dépendance.",
                "Erreur SQL.",
                "Erreur de sécurité.",
              ],
              correctIndex: 1,
              explanation: "Il manque un module tiers dans les dépendances du projet (node_modules).",
            },
            {
              id: 4,
              question: "Une requête SQL prend 15 secondes pour retourner 10 lignes sur une table de 2 millions d'entrées. Quelle catégorie investiguer ?",
              options: [
                "Erreur de syntaxe uniquement.",
                "Erreur de performance (absence d'index SQL adapté).",
                "Erreur de dépendance.",
                "Erreur CSS.",
              ],
              correctIndex: 1,
              explanation: "La requête effectue un scan complet de table : c'est un problème d'indexation et de performance SQL.",
            },
            {
              id: 5,
              question: "Une API permet à n'importe quel utilisateur de supprimer les profils d'autres membres sans vérifier son rôle. C'est :",
              options: [
                "Une erreur de sécurité.",
                "Une erreur de configuration uniquement.",
                "Une erreur réseau.",
                "Une erreur de syntaxe.",
              ],
              correctIndex: 0,
              explanation: "C'est une faille de contrôle d'accès et d'autorisation critique (IDOR / Broken Access Control).",
            },
          ]}
        />
      </section>
    </div>
  );
};

