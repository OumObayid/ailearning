'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Few-shot Prompting
        </h1>
      </div>

      {/* 1. Les 3 Niveaux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Zero-shot vs One-shot vs Few-shot
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Technique</th>
                <th className="p-3.5 border border-slate-200">Exemples fournis</th>
                <th className="p-3.5 border border-slate-200">Usage optimal</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Zero-shot</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">0 exemple</td>
                <td className="p-3.5 border border-slate-200">Tâches standard, économie maximale de tokens.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">One-shot</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">1 exemple unique</td>
                <td className="p-3.5 border border-slate-200">Fixer la syntaxe d&apos;un format de réponse précis.</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Few-shot</td>
                <td className="p-3.5 border border-slate-200 font-mono text-xs">2 à 5 exemples</td>
                <td className="p-3.5 border border-slate-200">Classification métier, cas limites, raisonnement guidé.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Exemple Few-shot complet */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie d&apos;un prompt Few-shot de classification
        </h2>
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-900 text-slate-100 p-6 font-mono text-xs sm:text-sm space-y-2">
          <p className="text-xs uppercase font-extrabold text-indigo-400">[PROMPT FEW-SHOT — CLASSIFICATION DE TICKETS]</p>
          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
{`Tu es un agent de tri des demandes utilisateurs.

RÈGLES :
- INFORMATION : Demande de renseignements généraux.
- RÉCLAMATION : Insatisfaction sur facturation ou service.
- ASSISTANCE : Problème technique nécessitant de l'aide.

EXEMPLES DE RÉFÉRENCE :
Message : "Quels sont vos moyens de paiement acceptés ?"
-> {"categorie": "INFORMATION", "justification": "Demande de renseignement."}

Message : "J'ai été prélevé deux fois pour la même commande."
-> {"categorie": "RÉCLAMATION", "justification": "Incident de facturation."}

Message : "Je n'arrive pas à réinitialiser mon mot de passe."
-> {"categorie": "ASSISTANCE", "justification": "Blocage technique d'accès."}

NOUVELLE ENTRÉE À TRAITER :
Message : "Le bouton de validation reste grisé lors de l'envoi."

FORMAT STRICT ATTENDU :
Retourne uniquement un JSON valide avec les clés "categorie" et "justification".`}
          </pre>
        </div>
      </section>

      {/* 3. Implémentation Node.js & Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Intégration backend avec Google Gemini (@google/genai)
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 font-mono text-xs sm:text-sm space-y-2 text-slate-900">
          <pre className="whitespace-pre-wrap">
{`const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI });

async function classifierFewShot(userMessage) {
  const prompt = \`Tu es un classifieur de requêtes.
EXEMPLES :
"Combien coûte l'abonnement ?" -> {"cat": "INFO"}
"Mon colis est arrivé cassé." -> {"cat": "RECLAMATION"}
"Erreur 404 sur mon profil." -> {"cat": "ASSISTANCE"}

NOUVEAU MESSAGE :
"\${userMessage}"
Format JSON strict uniquement.\`;

  const response = await ai.interactions.create({
    model: "gemini-2.5-flash",
    input: prompt
  });
  return response;
}`}
          </pre>
        </div>

        <Callout type="warning" title="Consommation de tokens & Dérive">
          Chaque exemple Few-shot consomme des tokens dans la fenêtre de contexte. Veillez à ce que vos exemples ne se contredisent pas entre eux, sous peine de dégrader la cohérence du modèle.
        </Callout>
      </section>

      {/* 4. TP & Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Quiz Few-shot
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Impact des exemples"
            question="Les exemples fournis dans un prompt Few-shot entraînent-ils une modification permanente des poids du modèle ?"
            options={[
              'Oui, le modèle enregistre les exemples dans sa mémoire sur disque',
              'Non, les exemples sont injectés uniquement dans la fenêtre de contexte de la requête',
            ]}
            correctIndex={1}
            explanation="Le Few-shot est un apprentissage en contexte (in-context learning). Il ne modifie pas les paramètres du réseau de neurones."
          />

          <QuickQuiz
            title="Question 2 — Sélection des exemples"
            question="Quelle est la règle capitale lors de la sélection des exemples Few-shot ?"
            options={[
              'Multiplier 20 exemples presque identiques',
              'Fournir 3 à 5 exemples représentatifs, cohérents entre eux et couvrant les cas limites',
            ]}
            correctIndex={1}
            explanation="La diversité et la cohérence stricte des exemples évitent la suradaptation et garantissent une bonne généralisation."
          />
        </div>
      </section>
    </div>
  );
};

