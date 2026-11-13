'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 8 — Le Meta-Prompting (Faire écrire ses prompts par l&apos;IA)
        </h1>
        <p className="mt-2 text-base text-slate-700">
          L&apos;IA au carré : utiliser l&apos;intelligence du modèle pour concevoir, auditer et affiner vos propres instructions et fichiers de configuration d&apos;agents.
        </p>
      </div>

      {/* 1. Définition et Analogie */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Qu&apos;est-ce que le Meta-Prompting ?
        </h2>

        <p className="text-base sm:text-lg text-slate-800 font-medium">
          Le préfixe grec <em>« méta »</em> signifie <em>« qui porte sur soi-même »</em>. Le <strong>Meta-Prompting</strong> consiste à utiliser l&apos;IA non pas pour coder directement, mais pour <strong>rédiger ou perfectionner le prompt qu&apos;un autre agent (ou vous-même) utilisera ensuite</strong>.
        </p>

        {/* Analogie de l'ingénieur pédagogique */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase">
            <span>💡 L&apos;analogie du professeur et de l&apos;élève</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            &bull; <strong>Prompt classique :</strong> Vous êtes l&apos;élève qui pose une question d&apos;exercice : <em>« Résous cette équation »</em>.<br />
            &bull; <strong>Meta-Prompt :</strong> Vous travaillez avec un inspecteur pédagogique pour concevoir l&apos;énoncé parfait : <em>« Rédige un énoncé d&apos;exercice clair, sans piège inutile, avec des consignes strictes pour que les élèves ne sautent pas les étapes »</em>.<br />
            En résumé : au lieu de suer à rédiger un prompt complexe à la main, <strong>vous demandez à l&apos;IA de concevoir le meilleur prompt possible pour vous</strong> !
          </p>
        </div>
      </section>

      {/* 2. Pourquoi le Meta-Prompting est indispensable ? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Les 3 super-pouvoirs du Meta-Prompting dans votre IDE
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">1. Du besoin flou au prompt parfait</span>
            <p className="text-xs text-slate-600">
              Vous avez une idée brouillonne : vous la jetez en vrac dans l&apos;IA, et le méta-prompt la restructure en prompt professionnel avec Rôle, Entrées et Contraintes.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-purple-700">2. L&apos;audit de vos propres prompts</span>
            <p className="text-xs text-slate-600">
              Vous soumettez un prompt à l&apos;IA en demandant : <em>« Quelles sont les ambiguïtés dans cette consigne ? Où l&apos;agent risque-t-il d&apos;halluciner ? »</em>.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700">3. Rédacteur de fichiers d&apos;agents</span>
            <p className="text-xs text-slate-600">
              Générer automatiquement des fichiers de règles comme <code>AGENTS.md</code> ou les fiches d&apos;instructions dans <code>.agents/agents/</code> sans rien oublier.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Le Méta-Prompt Pratique du Développeur */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Votre Méta-Prompt réutilisable (Le générateur universel)
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Gardez ce modèle sous la main ! Dès que vous devez lancer une tâche complexe dans Antigravity, passez d&apos;abord par ce méta-prompt :
        </p>

        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 shadow-inner break-words min-w-0 max-w-full">
          <p className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">[MÉTA-PROMPT : GÉNÉRATEUR D&apos;INSTRUCTIONS]</p>
          <div className="space-y-2.5 text-slate-200">
            <div className="text-indigo-300 font-semibold">
              Tu es un expert mondial en Prompt Engineering pour IDE agentiques (Antigravity).
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-amber-300">
              Je veux accomplir la tâche suivante sur mon projet :<br />
              <span className="text-white font-bold">&quot;[Écrivez ici votre idée brute en 1 ou 2 phrases]&quot;</span>
            </div>
            <div className="space-y-1 text-slate-300 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[11px] block">Rédige pour moi le PROMPT PARFAIT qui inclut obligatoirement :</span>
              <ol className="list-decimal list-inside space-y-0.5 pl-1 text-slate-300">
                <li>Le Rôle optimal à adopter.</li>
                <li>La décomposition des étapes de réflexion (Chain of Thought).</li>
                <li>Les contraintes négatives (ce qu&apos;il est formellement interdit de faire).</li>
                <li>Le format de sortie attendu (sans texte superflu).</li>
              </ol>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Gain de temps spectaculaire">
          En 5 secondes, l&apos;IA transforme une consigne timide en une directive chirurgicale qui vous évitera 4 allers-retours de corrections !
        </Callout>
      </section>

      {/* 4. Exemple Concret : Avant / Après le Meta-Prompting */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Démonstration : Métamorphose d&apos;une consigne débutante
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 space-y-2 min-w-0">
            <span className="text-xs font-black uppercase text-rose-800">Votre idée brute de départ</span>
            <div className="font-mono text-xs bg-white p-3 rounded-xl border border-rose-200 text-slate-800 break-words leading-relaxed">
              « Je veux que l&apos;agent m&apos;aide à créer une route d&apos;upload d&apos;avatar pour mes utilisateurs. »
            </div>
            <p className="text-xs text-slate-600">
              Si vous envoyez ça tel quel, l&apos;agent va inventer un stockage arbitraire (AWS S3 ? Disque local ?), oublier la limitation de taille de fichier et négliger la sécurité des extensions.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-2 min-w-0">
            <span className="text-xs font-black uppercase text-emerald-800">Le prompt produit par le Meta-Prompting</span>
            <div className="font-mono text-xs bg-white p-3.5 rounded-xl border border-emerald-200 text-slate-800 space-y-1.5 shadow-inner break-words">
              <div><strong className="text-indigo-700">RÔLE :</strong> Développeur Backend Node.js senior.</div>
              <div><strong className="text-indigo-700">MISSION :</strong> Créer la route POST /api/user/avatar.</div>
              <div className="text-xs space-y-0.5 pt-1">
                <strong className="text-rose-700 block text-[11px] uppercase">CONTRAINTES STRICTES :</strong>
                <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-xs pl-1">
                  <li>Valider le type MIME (JPEG/PNG/WEBP uniquement).</li>
                  <li>Limiter la taille max à 2 Mo.</li>
                  <li>Bloquer toute exécution de script SVG.</li>
                  <li>Retourner &#123; success: true, url: string &#125; en JSON.</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              Une consigne blindée contre les failles, générée en 2 secondes sans effort mental.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur le Meta-Prompting"
          items={[
            "Je comprends que le Meta-Prompting consiste à utiliser l'IA pour générer ou auditer mes prompts.",
            "J'utilise un méta-prompt pour transformer mes idées brutes en directives techniques complètes.",
            "Je fais auditer mes prompts longs pour repérer les incohérences ou les instructions ambiguës.",
            "Je sais que le Meta-Prompting accélère la rédaction de fichiers de règles AGENTS.md.",
            "Je relis toujours le prompt généré avant de l'envoyer à un agent d'exécution."
          ]}
        />
      </section>

      {/* 6. Quiz de Validation */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          Validation des connaissances — Quiz Express
        </h2>

        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Quel est l'objectif premier du Meta-Prompting ?"
            question="Pourquoi un développeur utilise-t-il le Meta-Prompting au quotidien ?"
            options={[
              "Pour remplacer son processeur par une puce quantique",
              "Pour déléguer à l'IA la conception de prompts parfaits et optimisés à partir d'une simple intention de départ",
              "Pour effacer l'historique de son navigateur"
            ]}
            correctIndex={1}
            explanation="Exactement ! Le Meta-Prompting vous évite d'oublier des contraintes évidentes (types de retour, sécurité, formats) en laissant l'IA structurer la consigne idéale."
          />

          <QuickQuiz
            title="Question 2 — Rôle du développeur"
            question="Quand l'IA génère un prompt via un méta-prompt, quelle étape reste indispensable ?"
            options={[
              "La relecture humaine pour vérifier que les contraintes correspondent bien aux choix du projet",
              "Traduire le prompt en binaire de 0 et de 1",
              "Éteindre l'ordinateur"
            ]}
            correctIndex={0}
            explanation="Bravo ! Vous conservez toujours le rôle de pilote : vous vérifiez que le prompt généré n'ajoute pas de contraintes superflues avant de le soumettre à l'agent exécutant."
          />
        </div>
      </section>
    </div>
  );
};
