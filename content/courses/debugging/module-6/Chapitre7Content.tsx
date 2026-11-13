'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

interface WhyStep {
  level: number;
  question: string;
  answer: string;
  technicalCategory: 'Symptôme' | 'Cause Immédiate' | 'Cause Intermédiaire' | 'Cause Racine';
  badgeColor: string;
}

const FIVE_WHYS_SCENARIO: WhyStep[] = [
  {
    level: 1,
    question: "Pourquoi l'utilisateur reçoit-il une erreur HTTP 500 sur le tableau de bord ?",
    answer: "Parce que le microservice Express a crashé avec une exception 'TypeError: Cannot read properties of undefined (reading name)'.",
    technicalCategory: 'Symptôme',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  {
    level: 2,
    question: "Pourquoi la variable 'user' était-elle undefined dans le contrôleur ?",
    answer: "Parce que l'appel 'await userRepository.findById(req.params.id)' a renvoyé undefined au lieu d'un objet utilisateur.",
    technicalCategory: 'Cause Immédiate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    level: 3,
    question: "Pourquoi le repository n'a-t-il trouvé aucun utilisateur avec cet identifiant ?",
    answer: "Parce que la requête exécutée était 'SELECT * FROM users WHERE id = NaN', le paramètre d'URL n'ayant pas été validé.",
    technicalCategory: 'Cause Intermédiaire',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    level: 4,
    question: "Pourquoi la variable id valait-elle NaN dans le repository ?",
    answer: "Parce que le contrôleur a exécuté 'Number(req.params.userId)', or la route Express déclare le paramètre sous le nom ':id' et non ':userId'.",
    technicalCategory: 'Cause Intermédiaire',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  {
    level: 5,
    question: "Pourquoi cette incohérence de nommage n'a-t-elle pas été interceptée avant la mise en production ?",
    answer: "Parce que la route n'avait aucun middleware de validation de schéma (Zod) à l'entrée et qu'aucun test d'intégration Supertest ne couvrait ce point d'accès.",
    technicalCategory: 'Cause Racine',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
];

export const Chapitre7Content: React.FC = () => {
  const [revealedWhy, setRevealedWhy] = useState<number>(1);

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 6 • Chapitre 7 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Analyse Causale Approfondie (RCA) & Méthode des 5 Pourquoi
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Identifier les causes probables et les causes racines : Décomposition causale, méthode des 5 Pourquoi et classement probabiliste
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Lorsqu&apos;une rupture de digue inonde une vallée, l&apos;inondation est le <strong>symptôme</strong> visible.
          La brèche béante dans le béton est la <strong>cause immédiate</strong>.
          Mais si les ingénieurs se contentent de colmater la brèche avec du ciment rapide, le barrage cédera à nouveau lors du prochain orage.
          La <strong>cause racine</strong> se trouve 3 ans plus tôt : l&apos;utilisation d&apos;un ciment non conforme au gel par le sous-traitant et l&apos;absence de vanne de délestage d&apos;urgence.
          En génie logiciel, identifier la cause racine (Root Cause Analysis - RCA), c&apos;est <strong>isoler le défaut fondamental qui, une fois éliminé, rend la réapparition de l&apos;incident mathématiquement impossible</strong>.
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Objectifs d&apos;apprentissage du chapitre
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer avec rigueur scientifique la hiérarchie : Symptôme $\rightarrow$ Cause Immédiate $\rightarrow$ Cause Racine (RCA).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Piloter un modèle IA avec la méthode des <strong>5 Pourquoi (5 Whys)</strong> pour percer les illusions de surface.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Structurer une matrice d&apos;hypothèses classées par probabilité technique (Élevée, Moyenne, Faible) avec critères de réfutation.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Formuler des remédiations pérennes (schémas Zod, contraintes DDL, tests de régression) plutôt que des pansements locaux.</span>
          </li>
        </ul>
      </section>

      {/* 2. La décomposition causale en 3 strates */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            La décomposition causale : Symptôme vs Cause Immédiate vs Cause Racine
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Tout dysfonctionnement logiciel s&apos;articule autour de 3 strates imbriquées. Confondre ces niveaux est l&apos;erreur la plus fréquente lors de l&apos;usage d&apos;un LLM :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-700 text-sm">1. Le Symptôme</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">Visible</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              La conséquence observable subie par le client ou le système de surveillance.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800">
              HTTP 500 sur checkout.<br />
              &quot;TypeError: Cannot read properties of null&quot;
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-700 text-sm">2. La Cause Immédiate</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">Local</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              L&apos;instruction précise du code qui a déclenché l&apos;interruption du flux d&apos;exécution.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800">
              Ligne 47 de cartService.ts :<br />
              user.cartItems est null au lieu d&apos;être un tableau.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-700 text-sm">3. La Cause Racine (RCA)</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">Fondamental</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              La défaillance systémique (requête SQL sans jointure, migration manquante, absence de validation Zod).
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800">
              LEFT JOIN manquant sur la table cart_items lors de la désérialisation du panier.
            </div>
          </div>
        </div>

        <Callout type="tip" title="L'analogie de l'arbre et des feuilles">
          <p className="text-xs sm:text-sm">
            Couper une feuille malade (supprimer un symptôme par un pansement local) n&apos;empêche pas l&apos;arbre de dépérir si la racine est contaminée par un champignon (défaut d&apos;architecture de données).
            En ingénierie, concentrez 80% de votre énergie d&apos;investigation à localiser la racine plutôt qu&apos;à balayer les feuilles mortes.
          </p>
        </Callout>
      </section>

      {/* 3. La méthode des 5 Pourquoi en action */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            La méthode des 5 Pourquoi (5 Whys) appliquée à l&apos;investigation logicielle
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Conçue à l&apos;origine par Sakichi Toyoda pour l&apos;ingénierie industrielle, la méthode des 5 Pourquoi est l&apos;outil d&apos;investigation le plus efficace pour contraindre un modèle IA à creuser sous la surface.
          Explorez le scénario interactif ci-dessous pour voir comment l&apos;analyse remonte du crash console jusqu&apos;au défaut d&apos;ingénierie initial :
        </p>

        {/* Simulateur interactif 5 Pourquoi */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 text-slate-950 font-bold text-sm">
              <Icon name="sparkles" className="w-4 h-4 text-emerald-700" />
              <span>Simulateur d&apos;Arbre Causal des 5 Pourquoi (Incident API Profile)</span>
            </div>
            <span className="text-xs font-bold text-slate-500 font-mono">
              Étape {revealedWhy} / 5
            </span>
          </div>

          <div className="space-y-3">
            {FIVE_WHYS_SCENARIO.slice(0, revealedWhy).map((step) => (
              <div key={step.level} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Pourquoi #{step.level} : {step.question}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${step.badgeColor}`}>
                    {step.technicalCategory}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium pl-3 border-l-2 border-emerald-500">
                  {step.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            {revealedWhy < 5 ? (
              <button
                onClick={() => setRevealedWhy((prev) => Math.min(prev + 1, 5))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-lime-500 text-slate-950 hover:bg-lime-400 transition shadow-sm flex items-center gap-1.5"
              >
                <span>Poser le Pourquoi #{revealedWhy + 1}</span>
                <Icon name="arrow-right" className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setRevealedWhy(1)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 text-slate-800 hover:bg-slate-300 transition"
              >
                Réinitialiser la simulation
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. Arbre d'hypothèses et classement probabiliste */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Hiérarchisation des hypothèses par probabilité technique
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Lorsqu&apos;un problème peut avoir plusieurs origines, vous devez exiger du modèle qu&apos;il produise un <strong>classement probabiliste justifié</strong> avec son critère de réfutation associé :
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Niveau de Probabilité</th>
                <th className="px-4 py-3">Hypothèse Formulée</th>
                <th className="px-4 py-3">Justification Technique</th>
                <th className="px-4 py-3">Épreuve de Réfutation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-emerald-700">Probabilité Forte (80%)</td>
                <td className="px-4 py-2.5">L&apos;enregistrement recherché n&apos;existe pas dans la table <code>users</code>.</td>
                <td className="px-4 py-2.5">L&apos;ID transmis dans l&apos;URL provient d&apos;un compte récemment purgé par le batch de nettoyage.</td>
                <td className="px-4 py-2.5 font-mono text-xs">SELECT COUNT(*) FROM users WHERE id = :id; $\rightarrow$ Résultat = 0.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-amber-700">Probabilité Moyenne (15%)</td>
                <td className="px-4 py-2.5">Défaut de parsing du paramètre d&apos;URL (coercition string vers number).</td>
                <td className="px-4 py-2.5">La route Express extrait <code>req.params.id</code> en tant que <code>string</code> (&quot;123&quot;), or le repository utilise une comparaison stricte.</td>
                <td className="px-4 py-2.5 font-mono text-xs">Vérifier <code>typeof req.params.id</code> sous le debugger VS Code.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-400">Probabilité Faible (5%)</td>
                <td className="px-4 py-2.5">Panne réseau ou déconnexion soudaine du serveur MySQL.</td>
                <td className="px-4 py-2.5">Si MySQL était inaccessible, l&apos;erreur serait <code>ECONNREFUSED</code> ou <code>ETIMEDOUT</code> et non un <code>TypeError</code> applicatif.</td>
                <td className="px-4 py-2.5 font-mono text-xs">Vérifier l&apos;état du pool de connexions (Active Connections &gt; 0).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Cas pratique : Résolution d'un crash de recherche d'utilisateurs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Cas pratique : Dépister la cause racine d&apos;un crash de recherche SQL
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Considérons un endpoint de recherche d&apos;utilisateurs par filtre optionnel :
        </p>

        <CodeBlock
          filename="src/services/userSearchService.ts"
          language="typescript"
          code={`export async function searchUsers(searchTerm?: string) {
  // L'ingénieur novice a rédigé cette requête :
  const query = searchTerm
    ? 'SELECT id, email, full_name FROM users WHERE email LIKE ?'
    : 'SELECT id, email, full_name FROM users';

  const params = searchTerm ? [\`%\${searchTerm}%\`] : [];

  // Exécution sur le pool MySQL
  const [rows] = await db.execute<RowDataPacket[]>(query, params);

  // Crash si l'utilisateur n'a pas renseigné son profil :
  return rows.map((u) => ({
    id: u.id,
    email: u.email,
    initials: u.full_name.split(' ').map((n: string) => n[0]).join(''),
  }));
}`}
        />

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-950 text-sm">Déroulé des 5 Pourquoi guidé par l&apos;IA :</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
            <li><strong>Pourquoi l&apos;application crashe-t-elle avec <code>TypeError: Cannot read properties of null (reading split)</code> ?</strong> Parce que <code>u.full_name</code> vaut <code>null</code> pour certains enregistrements.</li>
            <li><strong>Pourquoi full_name vaut-il null ?</strong> Parce que la colonne <code>full_name</code> dans la table <code>users</code> a été créée avec la contrainte <code>NULL</code> (facultative lors de l&apos;inscription par Google OAuth).</li>
            <li><strong>Pourquoi le service a-t-il supposé que full_name était toujours une chaîne ?</strong> Parce que l&apos;interface TypeScript déclarait <code>full_name: string</code> au lieu de <code>full_name: string | null</code>.</li>
            <li><strong>Pourquoi le typage était-il faux ?</strong> Parce que les interfaces ont été saisies manuellement sans synchronisation automatisée avec le schéma MySQL.</li>
            <li><strong>Quelle est la cause racine (RCA) ?</strong> Absence de synchronisation de typage entre la base de données et TypeScript, combinée à l&apos;absence de gestion du cas null dans le mapper d&apos;initiales.</li>
          </ol>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Remédiation pérenne certifiée (Clean Mapper) :</h4>
          <CodeBlock
            filename="src/services/userSearchService.ts (Corrigé)"
            language="typescript"
            code={`export interface UserDbRow {
  id: number;
  email: string;
  full_name: string | null; // Typage synchronisé et conforme au schéma DDL
}

export async function searchUsers(searchTerm?: string) {
  const query = searchTerm
    ? 'SELECT id, email, full_name FROM users WHERE email LIKE ?'
    : 'SELECT id, email, full_name FROM users';

  const params = searchTerm ? [\`%\${searchTerm}%\`] : [];
  const [rows] = await db.execute<RowDataPacket[]>(query, params);

  return (rows as unknown as UserDbRow[]).map((u) => {
    // Calcul défensif des initiales
    const initials = u.full_name
      ? u.full_name.trim().split(/\\s+/).map((n) => n[0]?.toUpperCase()).join('')
      : u.email.substring(0, 2).toUpperCase();

    return {
      id: u.id,
      email: u.email,
      initials,
    };
  });
}`}
          />
        </div>
      </section>

      {/* Quiz de certification (6 questions) */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de certification — Chapitre 6.7 : Causes Probables et Causes Racines"
          questions={[
            {
              id: 1,
              question: "Quelle est la définition formelle d'une 'Cause Racine' (Root Cause) dans un système logiciel en production ?",
              options: [
                "Le premier message rouge qui apparaît dans la console du navigateur.",
                "Le dysfonctionnement sous-jacent fondamental qui, une fois éliminé par une correction d'architecture ou de logique, garantit mathématiquement que la classe d'incident ne réapparaîtra jamais.",
                "Le nom du serveur Linux sur lequel tourne l'application.",
                "La ligne de code la plus longue du microservice."
              ],
              correctIndex: 1,
              explanation: "Une cause racine est la source fondamentale de la défaillance. Résoudre une cause immédiate (un pansement) déplace le bug ; éliminer la cause racine détruit la possibilité même de l'anomalie."
            },
            {
              id: 2,
              question: "Dans la méthode des 5 Pourquoi appliquée au logiciel, quel est l'objectif premier d'itérer 5 fois avec la question 'Pourquoi' ?",
              options: [
                "Fatiguer le modèle d'IA pour réduire sa consommation d'énergie.",
                "Traverser les couches superficielles (symptômes, erreurs immédiates) pour remonter jusqu'au défaut d'architecture, de contrat de données ou de processus ayant permis au bug d'exister.",
                "Vérifier si le développeur parle couramment anglais.",
                "Remplir automatiquement les rapports hebdomadaires de l'entreprise."
              ],
              correctIndex: 1,
              explanation: "Chaque itération 'Pourquoi' franchit une couche d'abstraction : du symptôme console au code fautif, puis à la validation d'entrée manquante, et enfin au défaut de conception initial."
            },
            {
              id: 3,
              question: "Si une application Express plante avec 'TypeError: Cannot read properties of null (reading total)', que constitue ce TypeError ?",
              options: [
                "La cause racine indiscutable de l'incident.",
                "Le symptôme d'exécution immédiat (l'effet visible de l'anomalie), dont la cause racine doit être recherchée en amont dans la création ou l'extraction de la donnée.",
                "Une panne matérielle du processeur hôte.",
                "Une tentative d'intrusion cybercriminelle par déni de service."
              ],
              correctIndex: 1,
              explanation: "Le crash à l'exécution est le symptôme visible. La cause racine est la raison pour laquelle cet objet valait null (absence de validation de clé étrangère, suppression concurrente, etc.)."
            },
            {
              id: 4,
              question: "Pourquoi est-il crucial de classer les hypothèses techniques par probabilité (Forte, Moyenne, Faible) au lieu de les tester toutes au hasard ?",
              options: [
                "Pour optimiser le temps d'investigation de l'ingénieur en testant d'abord le scénario le plus probable avec le test de réfutation le plus économique.",
                "Parce que les langages de programmation interdisent de formuler plus de deux hypothèses.",
                "Parce que MySQL supprime les bases de données dont les requêtes d'investigation sont trop lentes.",
                "Pour empêcher les stagiaires de poser des questions."
              ],
              correctIndex: 0,
              explanation: "Classer les hypothèses permet d'appliquer la démarche scientifique : vérifier d'abord les causes statistiques majeures (ex: 80% des crashs sur un findById proviennent d'un identifiant inexistant) avant d'échafauder des théories complexes sur le réseau."
            },
            {
              id: 5,
              question: "Qu'est-ce qu'une 'épreuve de réfutation' associée à une hypothèse formulée par une IA ?",
              options: [
                "Une dispute verbale entre deux développeurs seniors.",
                "Une commande factuelle (requête SQL précise, inspection de métrique, test unitaire isolé) conçue pour prouver immédiatement si l'hypothèse est vraie ou fausse sans altérer le code.",
                "Une mise en demeure juridique envoyée à l'éditeur du framework.",
                "Une suppression du fichier package-lock.json."
              ],
              correctIndex: 1,
              explanation: "Une hypothèse non réfutable n'a aucune valeur scientifique. L'ingénieur doit toujours définir l'expérience minimale (ex: SELECT COUNT(*)) qui validera ou détruira l'hypothèse en quelques secondes."
            },
            {
              id: 6,
              question: "Dans le cas pratique du mapper de profil (full_name.split), pourquoi l'ajout d'un chaînage optionnel (full_name?.split) aurait-il constitué une mauvaise pratique s'il avait été appliqué seul ?",
              options: [
                "Parce que le chaînage optionnel est incompatible avec Node.js 22.",
                "Parce qu'il aurait renvoyé undefined pour les initiales, sans traiter le cas métier (afficher les deux premières lettres de l'email) et sans synchroniser l'interface TypeScript avec la réalité du schéma SQL.",
                "Parce que le split de chaîne de caractères est illégal en base de données.",
                "Parce que les emails ne peuvent pas avoir d'initiales."
              ],
              correctIndex: 1,
              explanation: "L'optional chaining isole le crash immédiat mais dégrade l'interface (initiales vides ou cassées). La remédiation d'ingénierie synchronise le typage réel (null) et implémente une valeur de repli métier explicite."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Chapitre7Content;
