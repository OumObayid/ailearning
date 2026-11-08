'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Bug, erreur, anomalie et dysfonctionnement
        </h1>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Introduction : Clarifier le vocabulaire technique
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Dans le langage courant des équipes informatiques, les termes <em>Bug</em>, <em>Erreur</em>, <em>Anomalie</em> et <em>Dysfonctionnement</em> sont souvent employés de façon interchangeable. Pourtant, pour un ingénieur du débogage, ces concepts désignent des réalités techniques différentes :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-rose-200 shadow-sm">
            <span className="text-xs font-black uppercase text-rose-800">1. Le défaut</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">Bug</h3>
            <p className="text-xs text-slate-700 font-medium mt-1">Le défaut dans le code ou la logique logicielle.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-sm">
            <span className="text-xs font-black uppercase text-amber-800">2. L&apos;événement</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">Erreur (Error)</h3>
            <p className="text-xs text-slate-700 font-medium mt-1">La situation problématique ou l&apos;exception levée.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-blue-200 shadow-sm">
            <span className="text-xs font-black uppercase text-blue-800">3. L&apos;écart</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">Anomalie</h3>
            <p className="text-xs text-slate-700 font-medium mt-1">L&apos;écart entre le résultat observé et le résultat attendu.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 shadow-sm">
            <span className="text-xs font-black uppercase text-purple-800">4. La conséquence</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">Dysfonctionnement</h3>
            <p className="text-xs text-slate-700 font-medium mt-1">La dégradation concrète d&apos;une fonctionnalité du service.</p>
          </div>
        </div>
      </section>

      {/* 2. Le Bug */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Qu&apos;est-ce qu&apos;un bug ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Le <strong>Bug</strong> désigne un défaut ou une imperfection présent dans le logiciel. Ce défaut peut provenir d&apos;une faute de frappe, d&apos;une formule mathématique erronée, d&apos;une mauvaise gestion des données ou d&apos;une incompréhension d&apos;un contrat d&apos;API.
        </p>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 space-y-3">
          <p className="text-xs uppercase font-extrabold text-rose-700">Exemple de bug JavaScript :</p>
          <pre className="font-mono text-sm bg-white p-4 rounded-xl border border-slate-200 text-slate-900 overflow-x-auto">
{`// Code erroné : addition au lieu d'une multiplication
function calculerTotal(prix, quantite) {
  return prix + quantite;
}

console.log(calculerTotal(50, 3)); 
// Résultat obtenu : 53
// Résultat attendu : 150`}
          </pre>
          <p className="text-xs uppercase font-extrabold text-emerald-700">Correction du bug :</p>
          <pre className="font-mono text-sm bg-white p-4 rounded-xl border border-slate-200 text-slate-900 overflow-x-auto">
{`function calculerTotal(prix, quantite) {
  return prix * quantite;
}

console.log(calculerTotal(50, 3)); // 150`}
          </pre>
        </div>
        <Callout type="info" title="À retenir">
          Le bug est le défaut intrinsèque présent dans le code source. Il existe même si aucun utilisateur ne l&apos;a encore déclenché.
        </Callout>
      </section>

      {/* 3. L'erreur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Qu&apos;est-ce qu&apos;une erreur (Error) ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une <strong>erreur</strong> est un événement ou un état problématique qui empêche une opération de s&apos;exécuter correctement. Elle est souvent signalée explicitement par le moteur d&apos;exécution (exception) ou par un protocole (statut HTTP).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-amber-800">Exception de runtime</span>
            <pre className="font-mono text-xs bg-slate-100 p-3 rounded-lg text-slate-900">
{`const utilisateur = null;
console.log(utilisateur.nom);
// TypeError: Cannot read properties of null`}
            </pre>
            <p className="text-xs text-slate-700">Le moteur JavaScript bloque l&apos;exécution face à une opération interdite.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-2">
            <span className="text-xs font-black uppercase text-amber-800">Erreur de protocole réseau</span>
            <pre className="font-mono text-xs bg-slate-100 p-3 rounded-lg text-slate-900">
{`fetch('/api/users');
// Réponse HTTP : 500 Internal Server Error`}
            </pre>
            <p className="text-xs text-slate-700">Le serveur notifie qu&apos;il a échoué dans le traitement de la requête.</p>
          </div>
        </div>
      </section>

      {/* 4. L'anomalie */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Qu&apos;est-ce qu&apos;une anomalie (Anomaly) ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Une <strong>anomalie</strong> est un écart constaté entre le comportement réel d&apos;un système et son comportement attendu par le cahier des charges.
        </p>
        <Callout type="tip" title="Une anomalie ne lève pas nécessairement d'exception">
          <p className="text-sm">
            Exemple : Une application bancaire affiche un solde sous la forme <code>1250.5 €</code> au lieu de <code>1250,50 €</code>. Le calcul mathématique est exact, aucun message d&apos;erreur n&apos;est émis dans la console, mais l&apos;affichage s&apos;écarte des exigences requises.
          </p>
        </Callout>
      </section>

      {/* 5. Le dysfonctionnement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Qu&apos;est-ce qu&apos;un dysfonctionnement (Malfunction) ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Le <strong>dysfonctionnement</strong> représente la manifestation concrète du problème perçue par l&apos;utilisateur :
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-slate-800">
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">Impossible de se connecter</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">Le panier ne s&apos;enregistre pas</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">La page reste blanche</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">L&apos;application se ferme brutalement</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">Le formulaire ne soumet rien</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">Le serveur ne répond plus</div>
        </div>
      </section>

      {/* 6. Tableau comparatif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Comparaison des quatre notions
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5 font-black">Notion</th>
                <th className="p-3.5 font-black">Signification</th>
                <th className="p-3.5 font-black">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3.5 font-black text-rose-800 bg-rose-50/40">Bug</td>
                <td className="p-3.5">Défaut dans le code logiciel ou la configuration.</td>
                <td className="p-3.5">Opérateur <code>+</code> au lieu de <code>*</code>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-amber-800 bg-amber-50/40">Erreur</td>
                <td className="p-3.5">Événement problématique ou exception déclenchée.</td>
                <td className="p-3.5"><code>TypeError</code> ou réponse HTTP 500.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-blue-800 bg-blue-50/40">Anomalie</td>
                <td className="p-3.5">Écart constaté par rapport au résultat attendu.</td>
                <td className="p-3.5">Format de date <code>2026-11-06</code> au lieu de <code>06/11/2026</code>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-black text-purple-800 bg-purple-50/40">Dysfonctionnement</td>
                <td className="p-3.5">Fonctionnalité concrète rendue inopérante.</td>
                <td className="p-3.5">Impossible de passer commande sur le site.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Cause Racine */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Notion essentielle : La Cause Racine (Root Cause)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La <strong>cause racine</strong> est l&apos;origine fondamentale d&apos;un dysfonctionnement. C&apos;est le défaut premier dont l&apos;élimination garantit que le problème ne pourra plus se manifester.
        </p>
        <div className="p-5 rounded-2xl bg-white border-2 border-emerald-300 space-y-3">
          <h3 className="font-black text-base text-slate-950">Exemple d&apos;escalade causale : Panne de connexion</h3>
          <div className="space-y-2 text-sm font-medium text-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-36 font-black text-slate-950 shrink-0">Symptôme :</span>
              <span>L&apos;utilisateur clique sur Connexion et rien ne se passe.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-36 font-black text-slate-950 shrink-0">Dysfonctionnement :</span>
              <span>Authentification indisponible.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-36 font-black text-slate-950 shrink-0">Erreur visible :</span>
              <span>Réponse HTTP 500 dans la console DevTools.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-36 font-black text-slate-950 shrink-0">Bug intermédiaire :</span>
              <span>Exception non catchée dans le contrôleur Node.js.</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-300">
              <span className="w-36 font-black text-emerald-900 shrink-0">Cause racine :</span>
              <span className="font-bold text-emerald-900">Le backend utilise <code>mail</code> au lieu de <code>email</code> dans la requête SQL MySQL.</span>
            </div>
          </div>
        </div>
        <Callout type="warning" title="Piège classique à éviter">
          Remplacer superficiellement une réponse HTTP 500 par une réponse HTTP 200 sans corriger la colonne SQL ne résout rien : cela masque l&apos;erreur sans traiter la cause racine !
        </Callout>
      </section>

      {/* 8. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Synthèse du chapitre
        </h2>
        <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-slate-900 space-y-2 text-base font-medium">
          <p>• <strong>Bug :</strong> Le défaut tapi dans le code ou l&apos;architecture.</p>
          <p>• <strong>Erreur :</strong> La manifestation technique (exception levée, interruption).</p>
          <p>• <strong>Anomalie :</strong> La différence constatée entre le résultat attendu et le résultat réel.</p>
          <p>• <strong>Dysfonctionnement :</strong> L&apos;impact fonctionnel direct subi par le service ou l&apos;utilisateur.</p>
          <p>• <strong>Cause racine :</strong> L&apos;origine première qu&apos;il faut impérativement corriger.</p>
        </div>
      </section>

      {/* 9. Quiz */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Quiz d'auto-évaluation — Notions de Bug, Erreur et Cause Racine"
          questions={[
            {
              id: 1,
              question: "Une erreur dans le code qui utilise + au lieu de * dans un calcul de montant est :",
              options: [
                "Un dysfonctionnement réseau.",
                "Un bug de programmation.",
                "Un monitoring système.",
                "Une anomalie de sécurité.",
              ],
              correctIndex: 1,
              explanation: "Il s'agit d'un bug : un défaut logique inscrit directement dans le code source.",
            },
            {
              id: 2,
              question: "Le navigateur affiche l'exception TypeError: Cannot read properties of null. De quoi s'agit-il ?",
              options: [
                "D'une erreur technique levée à l'exécution.",
                "D'un test unitaire.",
                "D'une simple anomalie visuelle.",
                "D'une fonctionnalité normale.",
              ],
              correctIndex: 0,
              explanation: "C'est une erreur technique : le runtime JavaScript interrompt l'exécution suite à une opération non valide.",
            },
            {
              id: 3,
              question: "Une application affiche une date sous la forme 2026-11-06 au lieu de 06/11/2026 exigée. C'est :",
              options: [
                "Une panne de serveur.",
                "Une erreur de syntaxe fatale.",
                "Une anomalie d'affichage par rapport aux exigences.",
                "Un crash de base de données.",
              ],
              correctIndex: 2,
              explanation: "C'est une anomalie : un écart entre le résultat attendu et le résultat constaté.",
            },
            {
              id: 4,
              question: "Les utilisateurs ne peuvent plus du tout commander sur la boutique en ligne. Comment qualifier cette situation ?",
              options: ["Un dysfonctionnement.", "Une variable.", "Une instruction.", "Un breakpoint."],
              correctIndex: 0,
              explanation: "Un dysfonctionnement décrit l'altération concrète d'une fonctionnalité métier.",
            },
            {
              id: 5,
              question: "Quel est l'objectif premier de la recherche de la cause racine ?",
              options: [
                "Masquer les messages d'erreur affichés à l'écran.",
                "Identifier l'origine première du problème pour une résolution durable.",
                "Redémarrer le serveur à intervalles réguliers.",
                "Supprimer les modules non utilisés.",
              ],
              correctIndex: 1,
              explanation: "Résoudre la cause racine empêche définitivement la réapparition du défaut.",
            },
          ]}
        />
      </section>
    </div>
  );
};

