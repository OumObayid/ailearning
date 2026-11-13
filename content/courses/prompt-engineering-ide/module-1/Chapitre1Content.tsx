'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Prompt, instruction, contexte et commande
        </h1>
      </div>

      {/* 1. Le Prompt */}
      <section className="space-y-4 min-w-0 max-w-full">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Le Prompt
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un <strong>prompt</strong> est une entrée transmise à un modèle d&apos;intelligence artificielle pour orienter sa réponse ou son comportement. Il indique globalement ce que l&apos;on attend du modèle.
        </p>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 min-w-0 max-w-full overflow-hidden">
          <p className="text-xs uppercase font-extrabold text-indigo-700 tracking-wider mb-2">Exemple de prompt direct :</p>
          <pre className="font-mono text-xs sm:text-sm bg-white p-4 rounded-xl border border-slate-200 text-slate-900 whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full overflow-x-auto">
            Explique-moi le fonctionnement de Node.js avec un exemple simple.
          </pre>
        </div>
      </section>

      {/* 2. L'instruction */}
      <section className="space-y-4 min-w-0 max-w-full">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;instruction
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une <strong>instruction</strong> est une consigne qui définit précisément ce que l&apos;IA doit faire ou respecter. Elle encadre le comportement, la méthode et le format de la réponse.
        </p>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 min-w-0 max-w-full overflow-hidden">
          <p className="text-xs uppercase font-extrabold text-indigo-700 tracking-wider mb-2">Exemple d&apos;instruction encadrée :</p>
          <pre className="font-mono text-xs sm:text-sm bg-white p-4 rounded-xl border border-slate-200 text-slate-900 whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full overflow-x-auto">
{`Tu es un développeur Node.js expérimenté.
Explique le fonctionnement de Node.js.
Utilise un langage accessible.
Donne un exemple pratique.
Ne dépasse pas 15 lignes.`}
          </pre>
        </div>
        <p className="text-base text-slate-800">
          Ici, l&apos;instruction impose un rôle, un style de langage, un contenu obligatoire et une contrainte de taille.
        </p>
      </section>

      {/* 3. Le contexte */}
      <section className="space-y-4 min-w-0 max-w-full">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le contexte
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Le <strong>contexte</strong> fournit les informations indispensables pour comprendre une demande et orienter la réponse vers la réalité technique du projet.
        </p>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 min-w-0 max-w-full overflow-hidden">
          <p className="text-xs uppercase font-extrabold text-indigo-700 tracking-wider mb-2">Exemple de contexte technique :</p>
          <pre className="font-mono text-xs sm:text-sm bg-white p-4 rounded-xl border border-slate-200 text-slate-900 whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full overflow-x-auto">
{`Contexte :
Je développe une API REST avec Node.js et Express.js.
Je suis actuellement en train de créer un endpoint de génération IA avec Gemini.`}
          </pre>
        </div>
        <p className="text-base text-slate-800">
          Le contexte permet à l&apos;agent de tenir compte de l&apos;environnement technique sans devoir faire d&apos;hypothèses hasardeuses.
        </p>
      </section>

      {/* 4. La commande */}
      <section className="space-y-4 min-w-0 max-w-full">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La commande
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une <strong>commande</strong> est une demande d&apos;exécution d&apos;une action précise et opérationnelle.
        </p>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 min-w-0 max-w-full overflow-hidden">
          <p className="text-xs uppercase font-extrabold text-indigo-700 tracking-wider mb-2">Exemple de commande d&apos;opération :</p>
          <pre className="font-mono text-xs sm:text-sm bg-white p-4 rounded-xl border border-slate-200 text-slate-900 whitespace-pre-wrap break-words [overflow-wrap:anywhere] min-w-0 max-w-full overflow-x-auto">
{`Analyse le fichier server.js.
Identifie les erreurs potentielles.
Ne modifie aucun fichier.
Présente tes observations.`}
          </pre>
        </div>
        <p className="text-base text-slate-800">
          La commande indique une opération concrète à réaliser dans l&apos;environnement de l&apos;agent.
        </p>
      </section>

      {/* 5. Comparaison des quatre notions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Comparaison des quatre notions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Notion</th>
                <th className="p-3.5 border border-slate-200">Fonction principale</th>
                <th className="p-3.5 border border-slate-200">Portée</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Prompt</td>
                <td className="p-3.5 border border-slate-200">Solliciter le modèle</td>
                <td className="p-3.5 border border-slate-200">Message global transmis à l&apos;IA</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Instruction</td>
                <td className="p-3.5 border border-slate-200">Encadrer son comportement</td>
                <td className="p-3.5 border border-slate-200">Consignes de style, de limites et de format</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Contexte</td>
                <td className="p-3.5 border border-slate-200">Lui fournir les informations utiles</td>
                <td className="p-3.5 border border-slate-200">Environnement, technologies et fichiers applicables</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Commande</td>
                <td className="p-3.5 border border-slate-200">Lui demander une opération</td>
                <td className="p-3.5 border border-slate-200">Action précise à réaliser immédiatement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="À retenir">
          Ces quatre notions peuvent être réunies dans un seul et même message dans l&apos;IDE. Elles ne représentent pas nécessairement quatre mécanismes techniques indépendants dans le modèle, mais un découpage méthodologique fondamental pour maîtriser vos interactions.
        </Callout>
      </section>

      {/* TP & Quiz interactif */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Identification des 4 notions
        </h2>
        <p className="text-base font-medium text-slate-800">
          Analysez les quatre extraits ci-dessous et identifiez la nature de chaque formulation :
        </p>

        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Extraire la nature de la consigne"
            question="Quelle est la nature principale de cet extrait : « Tu es un expert en sécurité informatique. » ?"
            options={['Un Prompt', 'Une Instruction', 'Un Contexte', 'Une Commande']}
            correctIndex={1}
            explanation="« Tu es un expert en sécurité informatique » définit la posture et la consigne de rôle donnée à l'agent : c'est une instruction."
          />

          <QuickQuiz
            title="Question 2 — Extraire la nature de la consigne"
            question="Quelle est la nature principale de cet extrait : « Mon projet utilise React, Vite et Node.js. » ?"
            options={['Un Prompt', 'Une Instruction', 'Un Contexte', 'Une Commande']}
            correctIndex={2}
            explanation="Cet extrait décrit l'environnement technologique de l'application : il s'agit d'un contexte."
          />

          <QuickQuiz
            title="Question 3 — Extraire la nature de la consigne"
            question="Quelle est la nature principale de cet extrait : « Analyse le fichier auth.js et identifie les vulnérabilités. » ?"
            options={['Un Prompt', 'Une Instruction', 'Un Contexte', 'Une Commande']}
            correctIndex={3}
            explanation="Une demande explicite d'exécuter une opération technique concrète constitue une commande."
          />

          <QuickQuiz
            title="Question 4 — Extraire la nature de la consigne"
            question="Quelle est la nature principale de cet extrait : « Comment fonctionne le middleware Express ? » ?"
            options={['Un Prompt direct', 'Une Instruction', 'Un Contexte', 'Une Commande système']}
            correctIndex={0}
            explanation="Une question posée au modèle pour solliciter une réponse sans encadrement complexe est un prompt au sens direct."
          />
        </div>
      </section>
    </div>
  );
};
