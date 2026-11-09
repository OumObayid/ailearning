'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 6 — Protection des clés API (API Keys Security)
        </h1>
      </div>

      {/* 1. L'erreur mortelle : Clé secrète dans React */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. L&apos;erreur critique : Exposer une clé secrète dans un frontend React
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un projet React (Vite ou Create React App), les variables préfixées par <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs text-rose-700">VITE_</code> sont injectées en texte clair dans le bundle JavaScript téléchargé par le navigateur de n&apos;importe quel internaute :
        </p>

        <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl text-xs sm:text-sm text-rose-950 font-mono space-y-2">
          <p className="font-bold">{'// DANGER ABSOLU DANS LE FRONTEND :'}</p>
          <p>VITE_GEMINI_API_KEY=AIzaSyD456... &lt;-- VISIBLE PAR TOUS DANS LE CODE SOURCE DU NAVIGATEUR !</p>
        </div>

        <Callout type="danger">
          <strong>Architecture en couches obligatoire :</strong> Une clé secrète payante (Google Gemini, Stripe) doit résider <strong>exclusivement côté serveur (backend Node.js / Express)</strong>. Le client React communique avec votre API via des requêtes HTTP sans jamais manipuler la clé du fournisseur.
        </Callout>
      </section>

      {/* 2. Architecture recommandée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;architecture de médiation étanche
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-mono text-xs sm:text-sm">
          <div className="bg-white p-3 rounded-xl border border-slate-300 text-center w-full md:w-1/3">
            <span className="font-bold text-slate-900 block">Frontend React (Navigateur)</span>
            <span className="text-xs text-slate-600">Requête POST /api/generate<br />(Aucune clé secrète)</span>
          </div>
          <span className="text-indigo-600 font-black text-xl">→</span>
          <div className="bg-white p-3 rounded-xl border border-indigo-300 text-center w-full md:w-1/3">
            <span className="font-bold text-indigo-700 block">Backend Node.js (Serveur)</span>
            <span className="text-xs text-slate-600">Charge .env confidentiel<br />Injecte process.env.API_KEY</span>
          </div>
          <span className="text-indigo-600 font-black text-xl">→</span>
          <div className="bg-white p-3 rounded-xl border border-slate-300 text-center w-full md:w-1/3">
            <span className="font-bold text-emerald-700 block">API Google Gemini</span>
            <span className="text-xs text-slate-600">Authentification validée<br />Renvoie la réponse</span>
          </div>
        </div>
      </section>

      {/* 3. Les 4 erreurs majeures à proscrire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 4 erreurs majeures de manipulation des clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-mono font-bold text-rose-700">Erreur 1</span>
            <h4 className="font-bold text-slate-950 text-sm">Hardcoding dans le code source</h4>
            <p className="text-xs text-slate-700">Inscrire <code className="font-mono text-xs">const apiKey = &quot;AIza...&quot;</code> en dur. Finit irrémédiablement dans l&apos;historique Git public.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-mono font-bold text-rose-700">Erreur 2</span>
            <h4 className="font-bold text-slate-950 text-sm">Affichage dans console.log()</h4>
            <p className="text-xs text-slate-700">Logger la clé lors du débogage. Se retrouve dans les fichiers de logs partagés ou dans les captures d&apos;écran.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-mono font-bold text-rose-700">Erreur 3</span>
            <h4 className="font-bold text-slate-950 text-sm">Injection dans un prompt</h4>
            <p className="text-xs text-slate-700">Coller la clé dans le chat en disant à l&apos;agent : <em>« Voici ma clé pour tester »</em>. Transmise aux serveurs du LLM.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-mono font-bold text-rose-700">Erreur 4</span>
            <h4 className="font-bold text-slate-950 text-sm">Absence de rotation après fuite</h4>
            <p className="text-xs text-slate-700">Effacer la ligne sur Git sans révoquer la clé dans la console Google Cloud. Les bots continuent de l&apos;exploiter.</p>
          </div>
        </div>
      </section>

      {/* 4. Instructions de sécurité API Keys */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Instructions principales : Sanctuarisation des clés API
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`[POLITIQUE_DE_SECURITE_DES_CLES_API]
1. CONFIDENTIALITÉ STRICTE :
   Ne demande JAMAIS à l'utilisateur de coller une clé d'API réelle dans la conversation.
   Utilise exclusivement des valeurs fictives d'exemple ("EXEMPLE_CLE_GEMINI").

2. DÉTECTION DE CLÉS EXPOSÉES :
   Si tu découvres une chaîne de caractères ressemblant à une clé d'API réelle dans un fichier :
   - Ne la reproduis JAMAIS dans ton rapport.
   - Remplace-la par "<REDACTED_API_KEY>".
   - Alerte immédiatement l'utilisateur sur la nécessité de révoquer et renouveler la clé.

3. EXCLUSION DU FRONTEND :
   Refuse systématiquement toute proposition visant à importer une clé secrète dans un composant React client.`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Sécurité des clés API
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 6"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il formellement interdit de stocker une clé API secrète (ex: Google Gemini) dans une variable préfixée VITE_ dans une application React ?",
              options: [
                "Parce que Vite ne sait pas lire les variables d'environnement.",
                "Parce que toutes les variables VITE_ sont incorporées dans le bundle JavaScript public accessible par n'importe quel visiteur dans son navigateur.",
                "Parce que cela ralentit l'affichage des images.",
                "Parce que React utilise uniquement des fichiers XML."
              ],
              correctIndex: 1,
              explanation: "Le code client s'exécute chez l'utilisateur : toute clé présente dans le bundle est immédiatement extractible par un tiers."
            },
            {
              id: 2,
              question: "Que devez-vous faire en priorité absolue si vous constatez qu'une clé d'API a été accidentellement commitée dans un dépôt Git ?",
              options: [
                "Faire un nouveau commit en effaçant le fichier sans changer la clé.",
                "Révoquer immédiatement la clé compromise dans la console du fournisseur (ex: Google Cloud), en générer une nouvelle et vérifier les logs d'accès.",
                "Éteindre l'écran de l'ordinateur.",
                "Attendre la fin du mois."
              ],
              correctIndex: 1,
              explanation: "Supprimer le fichier ne nettoie pas l'historique Git et n'empêche pas l'usage d'une clé déjà aspirée : seule la révocation côté fournisseur est efficace."
            }
          ]}
        />
      </section>
    </div>
  );
};
