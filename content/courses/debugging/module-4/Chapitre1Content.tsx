'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Comprendre le fonctionnement des requêtes HTTP
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le parcours physique et logique d&apos;une transaction HTTP.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Dissecter l&apos;anatomie des 4 blocs d&apos;une requête et des 3 blocs d&apos;une réponse.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Sélectionner la méthode HTTP appropriée selon la règle REST.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Isoler immédiatement l&apos;origine du problème : client, réseau ou backend.</span>
          </li>
        </ul>
      </section>

      {/* 2. Trajet de la communication */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Trajet complet d&apos;une communication HTTP
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Dans une architecture moderne (React + Express + MySQL), le navigateur ne communique jamais directement avec le moteur de base de données. Le serveur Node.js agit comme un sas étanche et sécurisé :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs font-mono">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="text-2xl">💻</div>
            <div className="font-bold text-slate-950 font-sans text-sm">1. Client (React / Vue)</div>
            <p className="text-slate-600 font-sans">Forge la requête HTTP (URL, Headers, JSON)</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300 bg-emerald-50/50 space-y-2">
            <div className="text-2xl">⚡</div>
            <div className="font-bold text-emerald-900 font-sans text-sm">2. Backend (Express.js)</div>
            <p className="text-slate-600 font-sans">Valide les entrées, authentifie et lance la requête SQL</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <div className="text-2xl">🗄️</div>
            <div className="font-bold text-slate-950 font-sans text-sm">3. Base (MySQL)</div>
            <p className="text-slate-600 font-sans">Exécute la requête SQL et retourne les lignes persistées</p>
          </div>
        </div>
      </section>

      {/* 3. Anatomie requête / réponse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Anatomie d&apos;une requête et d&apos;une réponse HTTP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 font-sans uppercase">Requête HTTP émise par le client :</span>
            <pre className="text-slate-300">{`POST /api/users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{
  "name": "Ahmed",
  "email": "ahmed@example.com"
}`}</pre>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 font-sans uppercase">Réponse HTTP retournée par le serveur :</span>
            <pre className="text-slate-300">{`HTTP/1.1 201 Created
Content-Type: application/json
Date: Sat, 07 Nov 2026 12:45:00 GMT

{
  "success": true,
  "message": "Utilisateur créé",
  "data": { "id": 15, "name": "Ahmed" }
}`}</pre>
          </div>
        </div>

        <Callout type="warning">
          <strong>Piège de l&apos;illusion 200 OK :</strong> Un statut HTTP 200 indique uniquement que le serveur a réussi à retourner une réponse réseau. Si le corps JSON contient <code className="font-mono">{`{ "success": false, "error": "Solde insuffisant" }`}</code>, l&apos;opération métier a échoué ! Un diagnostic d&apos;ingénierie examine toujours le code HTTP ET la charge utile JSON.
        </Callout>
      </section>

      {/* 4. Méthodes sémantiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Matrice sémantique des méthodes HTTP
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3 border-b border-slate-200">Méthode</th>
                <th className="p-3 border-b border-slate-200">Action sémantique</th>
                <th className="p-3 border-b border-slate-200">Idempotence</th>
                <th className="p-3 border-b border-slate-200">Body autorisé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-blue-700">GET</td>
                <td className="p-3 font-sans">Lecture sans modification d&apos;état</td>
                <td className="p-3 text-emerald-700">Oui (sûr)</td>
                <td className="p-3 text-rose-700">Non recommandé</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-emerald-700">POST</td>
                <td className="p-3 font-sans">Création d&apos;une nouvelle ressource</td>
                <td className="p-3 text-rose-700">Non (effet de bord)</td>
                <td className="p-3 text-emerald-700">Oui (JSON obligatoire)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-amber-700">PUT</td>
                <td className="p-3 font-sans">Remplacement complet d&apos;une ressource existante</td>
                <td className="p-3 text-emerald-700">Oui</td>
                <td className="p-3 text-emerald-700">Oui (Payload complet)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-purple-700">PATCH</td>
                <td className="p-3 font-sans">Modification partielle d&apos;un ou plusieurs champs</td>
                <td className="p-3 text-amber-700">Non systématique</td>
                <td className="p-3 text-emerald-700">Oui (Diff partiel)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-rose-700">DELETE</td>
                <td className="p-3 font-sans">Suppression définitive d&apos;une ressource</td>
                <td className="p-3 text-emerald-700">Oui</td>
                <td className="p-3 text-slate-500">Optionnel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 4.1
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel composant d'une architecture Web moderne communique directement avec le serveur MySQL ?",
              options: [
                "L'application React dans le navigateur",
                "Le backend Node.js / Express.js",
                "L'inspecteur Chrome DevTools",
                "Le protocole DNS"
              ],
              correctIndex: 1,
              explanation: "Pour des impératifs critiques de sécurité et de persistance des secrets de connexion, seul le serveur backend interroge directement la base de données relationnelle."
            },
            {
              id: 2,
              question: "Quelle méthode HTTP doit être utilisée par convention REST pour remplacer intégralement une ressource existante ?",
              options: [
                "POST",
                "GET",
                "PUT",
                "PATCH"
              ],
              correctIndex: 2,
              explanation: "PUT remplace la ressource dans son ensemble. Pour une modification partielle de quelques champs sans écraser le reste, la norme préconise PATCH."
            },
            {
              id: 3,
              question: "Dans quel panneau de Chrome DevTools peut-on inspecter le statut HTTP et les en-têtes d'une requête envoyée par fetch() ?",
              options: [
                "Elements",
                "Network",
                "Memory",
                "Application"
              ],
              correctIndex: 1,
              explanation: "L'onglet Network enregistre chaque échange HTTP, affiche le code de statut, la latence temporelle, les en-têtes et la charge utile brute."
            }
          ]}
        />
      </section>
    </div>
  );
};

