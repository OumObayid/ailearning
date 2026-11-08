'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Identifier les symptômes et rechercher les causes
        </h1>
      </div>

      {/* 1. Symptôme vs Cause */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. La distinction cardinale : Symptôme vs Cause
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-amber-800">Ce que l&apos;on observe</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Le Symptôme</h3>
            <p className="text-sm font-medium text-slate-700">
              La manifestation visible du dysfonctionnement (ex: &quot;Impossible de charger les produits&quot;, bouton inactif, chargement infini).
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700">Ce qui provoque le problème</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">La Cause</h3>
            <p className="text-sm font-medium text-slate-700">
              Le facteur technique premier (ex: le backend Express exécute une requête SQL avec un nom de colonne inexistant dans MySQL).
            </p>
          </div>
        </div>
        <Callout type="warning" title="Avertissement professionnel">
          Le premier message d&apos;erreur visible n&apos;indique presque jamais la véritable origine du problème. Ne vous fiez jamais à une intuition non vérifiée par des logs ou des requêtes réseau.
        </Callout>
      </section>

      {/* 2. Typologie des symptômes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 5 grandes catégories de symptômes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="font-black text-base text-slate-950">1. Symptôme fonctionnel</h3>
            <p className="text-xs text-slate-700 font-medium">Le total du panier affiche 103 € au lieu de 300 €.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="font-black text-base text-slate-950">2. Symptôme technique</h3>
            <p className="text-xs text-slate-700 font-medium">TypeError, ReferenceError ou ECONNREFUSED sur le port 3306.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="font-black text-base text-slate-950">3. Symptôme de performance</h3>
            <p className="text-xs text-slate-700 font-medium">Une API répond normalement en 200 ms mais met 8 secondes sous charge.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="font-black text-base text-slate-950">4. Symptôme de disponibilité</h3>
            <p className="text-xs text-slate-700 font-medium">Réponse HTTP 503, crash du processus Node.js ou saturation mémoire.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="font-black text-base text-slate-950">5. Symptôme de sécurité</h3>
            <p className="text-xs text-slate-700 font-medium">Un utilisateur régulier accède aux données d&apos;un autre profil (faille IDOR).</p>
          </div>
        </div>
      </section>

      {/* 3. Chaîne de causalité et Outils avec images 13, 14, 15 */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Remonter la chaîne de causalité avec les outils de diagnostic
        </h2>

        {/* Image 13 : Chrome DevTools Console */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">A. Analyser les traces d&apos;exception dans la console</h3>
          <p className="text-sm text-slate-700 font-medium">
            La console capture la Stack Trace au moment exact de l&apos;exception non interceptée :
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
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">B. Valider le contrat HTTP et les en-têtes réseau</h3>
          <p className="text-sm text-slate-700 font-medium">
            Inspecter l&apos;URL, la méthode, les en-têtes et les statuts HTTP réels retournés par le serveur :
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
              Figure 1.14 — Vérification de l&apos;échange client/serveur : code statut, schéma, adresse distante et Content-Type.
            </div>
          </div>
        </div>

        {/* Image 15 : MySQL Workbench EXPLAIN */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">C. Diagnostiquer les goulets d&apos;étranglement SQL avec EXPLAIN</h3>
          <p className="text-sm text-slate-700 font-medium">
            Visualiser le plan d&apos;exécution d&apos;une requête pour repérer les full table scans et index manquants :
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
              Figure 1.15 — Plan d&apos;exécution graphique MySQL : détection des scans complets coûteux et optimisation des index.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Méthodes d'analyse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Méthodes professionnelles d&apos;analyse causale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <h3 className="font-black text-base text-slate-950">La Méthode des 5 Pourquoi (5 Whys)</h3>
            <p className="text-xs text-slate-700 font-medium">
              Poser itérativement la question &quot;Pourquoi&quot; pour dépasser la cause immédiate et atteindre le défaut originel dans l&apos;architecture ou le processus.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <h3 className="font-black text-base text-slate-950">Le Diagramme d&apos;Ishikawa</h3>
            <p className="text-xs text-slate-700 font-medium">
              Structurer les hypothèses par famille : Code, Données, Base SQL, Réseau, Dépendances et Infrastructure système.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Travaux Pratiques de Diagnostic */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Exercices d&apos;investigation guidée
        </h2>
        <div className="space-y-3 text-sm font-medium">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-800">Cas 1 • Erreur HTTP 500</span>
            <p className="text-xs text-slate-700">
              L&apos;API <code>/api/products</code> plante avec <code>Unknown column &apos;product_name&apos; in &apos;field list&apos;</code>. Cause : désynchronisation entre le modèle Express et le schéma MySQL réel.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-black uppercase text-amber-800">Cas 2 • Lenteur anormale de 7 secondes</span>
            <p className="text-xs text-slate-700">
              Une route SQL fait un <code>SELECT *</code> sur des millions de lignes pour n&apos;en retourner que 10. Cause : absence de clause <code>LIMIT</code> et d&apos;index sur la colonne de filtrage.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-black uppercase text-purple-800">Cas 3 • Faille d&apos;autorisation (IDOR)</span>
            <p className="text-xs text-slate-700">
              Un utilisateur accède aux données d&apos;un autre profil via <code>/api/users/:id</code>. Cause : le backend authentifie le token mais omet de vérifier que l&apos;utilisateur est propriétaire de la ressource.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Synthèse & Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Symptômes et Causes"
          questions={[
            {
              id: 1,
              question: "Qu'est-ce qu'un symptôme dans un système informatique ?",
              options: [
                "L'origine fondamentale d'une erreur.",
                "La manifestation concrète et observable d'un problème.",
                "Le correctif appliqué dans Git.",
              ],
              correctIndex: 1,
              explanation: "Le symptôme est ce qui est constaté de l'extérieur par l'utilisateur ou le monitoring.",
            },
            {
              id: 2,
              question: "Une API retourne HTTP 500 dans la console. Peut-on en déduire que la cause racine est dans le code React ?",
              options: [
                "Oui, car l'erreur est visible dans le navigateur.",
                "Non, il faut inspecter les logs du backend Express et de la base MySQL.",
                "Oui, obligatoirement.",
              ],
              correctIndex: 1,
              explanation: "Le frontend ne fait que subir et présenter l'erreur survenue sur le serveur.",
            },
            {
              id: 3,
              question: "Quel outil SQL permet d'examiner en détail le plan d'exécution d'une requête et ses index ?",
              options: ["La commande EXPLAIN.", "La commande DROP TABLE.", "Un linter CSS."],
              correctIndex: 0,
              explanation: "EXPLAIN dévoile comment MySQL planifie la lecture des tables et des index.",
            },
            {
              id: 4,
              question: "Quelle est la différence fondamentale entre authentification et autorisation ?",
              options: [
                "L'authentification valide l'identité de l'utilisateur ; l'autorisation vérifie ses droits et permissions d'accès.",
                "Ce sont deux termes interchangeables.",
                "L'autorisation ne s'applique qu'aux mots de passe.",
              ],
              correctIndex: 0,
              explanation: "Être authentifié (savoir qui vous êtes) ne donne pas l'autorisation d'accéder aux données d'autrui.",
            },
            {
              id: 5,
              question: "Quelle méthode permet de remonter pas à pas jusqu'à la cause racine en posant des questions successives ?",
              options: ["La méthode des 5 Pourquoi.", "Le formatage de code.", "Le redémarrage automatique."],
              correctIndex: 0,
              explanation: "Les 5 Pourquoi permettent d'aller au-delà de la cause immédiate.",
            },
          ]}
        />
      </section>
    </div>
  );
};

