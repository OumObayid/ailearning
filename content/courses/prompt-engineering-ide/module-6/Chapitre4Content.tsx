'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Autorisation de lecture et d&apos;écriture (Read vs Write)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          La frontière capitale entre suggérer une correction dans le chat et modifier physiquement un fichier sur votre disque dur.
        </p>
      </div>

      {/* 1. Proposer vs Appliquer */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="pencil-square" className="w-5 h-5 text-indigo-600" />
          <span>1. La frontière vitale : Proposer dans le chat vs Écrire sur le disque</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Avoir le droit de lire un fichier n&apos;implique <strong>JAMAIS</strong> le droit de le modifier. L&apos;une des confusions les plus périlleuses chez les développeurs débutants avec l&apos;IA est de confondre une discussion textuelle avec une altération physique de fichier.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du plan d&apos;architecte et du coup de pelleteuse :</span>
          </div>
          <p>
            Quand un architecte trace un nouveau mur sur une feuille de papier calque, cela ne casse aucun mur dans votre maison : c&apos;est une proposition réversible, sans risque matériel. Mais dès que l&apos;ouvrier arrive avec la pelleteuse pour abattre la cloison, un coup mal placé peut sectionner une conduite de gaz !
          </p>
          <p>
            Avec un agent IA, c&apos;est exactement la même réalité :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>Le plan d&apos;architecte (Lecture &amp; Chat) :</strong> L&apos;agent lit le fichier, affiche un snippet dans la discussion et explique son idée. Vos fichiers sur disque restent intacts.</li>
            <li><strong>Le coup de pelleteuse (Écriture physique - Write) :</strong> L&apos;agent appelle l&apos;outil <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">edit_file</code> ou <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">write_file</code>. Le disque dur est altéré, les imports peuvent casser et Git enregistre un nouveau diff.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-base">
              <Icon name="chat-bubble-left-right" className="w-5 h-5" />
              <span>Cas A : Proposition textuelle</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              L&apos;agent génère le bloc de code corrigé dans la fenêtre de discussion. Le fichier physique sur votre disque reste <strong>strictement inchangé</strong>. Risque d&apos;effet de bord : 0%.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-amber-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
              <Icon name="document-duplicate" className="w-5 h-5" />
              <span>Cas B : Modification physique (Write)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              L&apos;agent remplace directement le contenu du fichier sur le disque. Toute erreur de syntaxe ou suppression clandestine provoque une régression immédiate.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Procédure d'autorisation en 5 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="arrow-path-rounded-square" className="w-5 h-5 text-indigo-600" />
          <span>2. La procédure d&apos;autorisation d&apos;écriture en 5 étapes</span>
        </h2>

        <div className="grid gap-2 text-center text-xs font-bold grid-cols-1 sm:grid-cols-2">
          <div className="p-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm space-y-1">
            <span className="text-[10px] text-indigo-700 font-mono">ÉTAPE 1</span>
            <div className="text-slate-950">Diagnostic</div>
            <p className="text-[11px] text-slate-600 font-normal">Lire en consultation seule.</p>
          </div>

          <div className="p-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm space-y-1">
            <span className="text-[10px] text-indigo-700 font-mono">ÉTAPE 2</span>
            <div className="text-slate-950">Ciblage</div>
            <p className="text-[11px] text-slate-600 font-normal">Identifier le fichier unique à modifier.</p>
          </div>

          <div className="p-3 bg-white border-2 border-indigo-200 bg-indigo-50/50 rounded-xl shadow-sm space-y-1">
            <span className="text-[10px] text-indigo-700 font-mono">ÉTAPE 3</span>
            <div className="text-indigo-950">Aperçu Diff</div>
            <p className="text-[11px] text-indigo-900 font-normal">Afficher le avant/après dans le chat.</p>
          </div>

          <div className="p-3 bg-white border-2 border-amber-300 bg-amber-50 rounded-xl shadow-sm space-y-1">
            <span className="text-[10px] text-amber-800 font-mono">ÉTAPE 4</span>
            <div className="text-amber-950 font-bold">Accord Humain</div>
            <p className="text-[11px] text-amber-900 font-normal">Attendre le &quot;Oui&quot; explicite.</p>
          </div>

          <div className="p-3 bg-white border-2 border-emerald-200 bg-emerald-50 rounded-xl shadow-sm space-y-1">
            <span className="text-[10px] text-emerald-800 font-mono">ÉTAPE 5</span>
            <div className="text-emerald-950 font-bold">Écriture bornée</div>
            <p className="text-[11px] text-emerald-900 font-normal">Appliquer l&apos;édition chirurgicale.</p>
          </div>
        </div>
      </section>

      {/* 3. Les 4 paramètres obligatoires d'une autorisation valide */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="adjustments-horizontal" className="w-5 h-5 text-indigo-600" />
          <span>3. Les 4 paramètres obligatoires d&apos;une autorisation valide</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une autorisation floue comme <em>« Oui vas-y corrige »</em> est une porte ouverte aux régressions. Une autorisation sécurisée doit toujours comporter 4 éléments précis :
        </p>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Paramètre</th>
                <th className="p-3.5 border-b border-slate-200 text-rose-900">Mauvaise pratique (Dangereux &amp; Flou)</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-900">Bonne pratique (Précis &amp; Verrouillé)</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold">1. Fichier cible</td>
                <td className="p-3.5 text-rose-700">« Modifie le projet pour régler le problème »</td>
                <td className="p-3.5 font-mono text-xs text-emerald-700 font-bold">src/components/SearchBar.jsx uniquement</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">2. Action autorisée</td>
                <td className="p-3.5 text-rose-700">« Fais ce que tu penses nécessaire »</td>
                <td className="p-3.5 text-emerald-700 font-bold">Remplacement de la condition de filtrage (lignes 24 à 28)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">3. Objectif technique</td>
                <td className="p-3.5 text-rose-700">« Amélioration générale du code »</td>
                <td className="p-3.5 text-emerald-700 font-bold">Gestion stricte de l&apos;insensibilité à la casse (lowercase)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">4. Portée temporelle</td>
                <td className="p-3.5 text-rose-700">Autorisation permanente pour toute la session</td>
                <td className="p-3.5 text-emerald-700 font-bold">Valable uniquement pour cette opération immédiate (1 seule passe)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {[
            { param: "1. Fichier cible", bad: "« Modifie le projet »", good: "src/components/SearchBar.jsx uniquement" },
            { param: "2. Action autorisée", bad: "« Fais ce qu'il faut »", good: "Remplacement du filtre (lignes 24 à 28)" },
            { param: "3. Objectif", bad: "« Amélioration »", good: "Insensibilité à la casse (lowercase)" },
            { param: "4. Portée temporelle", bad: "Permanente", good: "Valable uniquement pour cette opération immédiate" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="font-bold text-slate-950 text-sm">{item.param}</div>
              <div className="text-rose-700"><strong>Flou :</strong> {item.bad}</div>
              <div className="text-emerald-700 font-semibold"><strong>Précis :</strong> {item.good}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Instructions de politique d'écriture */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>4. Directive d&apos;instructions : Politique d&apos;écriture sécurisée</span>
        </h2>

        {/* Prompt Card without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE GOUVERNANCE READ / WRITE ===
          </div>
          <div className="text-indigo-300 font-bold">[1. LECTURE SANS DROIT D&apos;ÉCRITURE]</div>
          <div className="text-slate-200">
            La consultation ou l&apos;inspection d&apos;un fichier ne t&apos;accorde en aucun cas le droit d&apos;y écrire. Tu es en lecture seule tant qu&apos;un ordre formel d&apos;écriture ne t&apos;a pas été délivré.
          </div>

          <div className="text-amber-300 font-bold pt-1">[2. PROTOCOLE DU DIFF PRÉALABLE OBLIGATOIRE]</div>
          <div className="pl-4 text-slate-200">
            Avant de mobiliser l&apos;outil d&apos;édition (edit_file), tu dois impérativement :<br />
            1. Indiquer le chemin exact du fichier ciblé.<br />
            2. Présenter le Diff unifié des lignes à modifier.<br />
            3. Expliquer brièvement l&apos;impact sur le reste du projet.<br />
            4. Attendre la confirmation formelle de l&apos;utilisateur avant d&apos;appliquer l&apos;outil.
          </div>

          <div className="text-rose-400 font-bold pt-1">[3. NON-PROPAGATION DES ACCORDS]</div>
          <div className="pl-4 text-slate-200">
            Une autorisation accordée pour modifier le fichier A ne constitue JAMAIS une autorisation de toucher au fichier B. Chaque fichier exige son accord distinct.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Autorisations de lecture et d&apos;écriture
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 4"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre proposer du code dans le chat et exécuter l'outil edit_file ?",
              options: [
                "Proposer du code dans le chat n'a aucun impact matériel sur le disque dur (risque zéro), tandis qu'edit_file modifie physiquement le fichier sur la machine.",
                "edit_file est gratuit alors que le chat est payant.",
                "Le code dans le chat s'exécute automatiquement dans le navigateur.",
                "Il n'y a aucune différence technique."
              ],
              correctIndex: 0,
              explanation: "Tant que le code reste dans la conversation, aucun risque de régression sur votre projet : c'est un plan d'architecte. L'écriture physique modifie le disque dur."
            },
            {
              id: 2,
              question: "Si l'utilisateur vous dit 'Oui je valide pour le composant Header.jsx', avez-vous le droit de modifier également le fichier App.jsx pour y insérer l'import ?",
              options: [
                "Non, une autorisation ne se propage jamais implicitement d'un fichier à l'autre. Il faut présenter le Diff sur App.jsx et solliciter un accord distinct.",
                "Oui, car les imports font partie de la même famille de modifications.",
                "Oui, si la modification fait moins de 3 lignes.",
                "Non, sauf si le terminal est fermé."
              ],
              correctIndex: 0,
              explanation: "Le principe de non-propagation des accords stipule qu'une validation sur un fichier ne confère aucun blanc-seing sur les autres fichiers du projet."
            },
            {
              id: 3,
              question: "Pourquoi est-il crucial d'exiger de l'agent qu'il présente un aperçu Diff (avant/après) avant toute écriture ?",
              options: [
                "Pour permettre au développeur humain de vérifier que la modification est chirurgicale et n'efface pas de fonctions voisines par mégarde.",
                "Pour ralentir l'exécution de l'agent afin qu'il ne surchauffe pas.",
                "Pour tester les couleurs de l'écran.",
                "Pour forcer l'enregistrement du fichier au format PDF."
              ],
              correctIndex: 0,
              explanation: "Le Diff est la preuve visuelle préalable de l'impact de l'agent : il permet d'intercepter les erreurs avant que le fichier sur disque ne soit altéré."
            }
          ]}
        />
      </section>
    </div>
  );
};
