'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Utilisation des outils (Tools &amp; Function Calling)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Comment l&apos;IA passe de la simple parole à l&apos;action concrète grâce au mécanisme de Tool Calling et au standard universel MCP.
        </p>
      </div>

      {/* 1. L'analogie du Chef et du Commis de cuisine */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="cog" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;analogie du restaurant : Le Chef cuisinier et le Commis</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Pour un débutant, il est souvent surprenant d&apos;apprendre qu&apos;un modèle de langage comme Gemini ou GPT <strong>ne sait absolument rien faire d&apos;autre que prédire du texte</strong>. Il ne possède aucun bras mécanique pour ouvrir votre disque dur, ni aucun câble branché sur votre terminal.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Alors, comment fait-il pour modifier un fichier ? Pensez à la cuisine d&apos;un grand restaurant :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-extrabold text-slate-950 text-base">
              <span className="text-xl">👨‍🍳</span>
              <span>Le Modèle d&apos;IA = Le Chef cuisinier</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Le chef a l&apos;expertise et la vision d&apos;ensemble. Il ne quitte pas son plan de travail : lorsqu&apos;il a besoin d&apos;un ingrédient, il rédige un bon de commande très précis sur un ticket : <em className="text-indigo-800 font-medium">« Outil : Découpe, Ingrédient : 3 tomates, Épaisseur : 5 mm »</em>.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-extrabold text-indigo-950 text-base">
              <span className="text-xl">🏃</span>
              <span>L&apos;IDE (Antigravity) = Le Commis de cuisine</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              L&apos;IDE intercepte le ticket, vérifie si l&apos;action est autorisée par les permissions, prend le couteau, coupe les tomates et ramène l&apos;assiette au chef. Le chef examine alors le résultat concret et poursuit sa recette.
            </p>
          </div>
        </div>

        <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl text-xs sm:text-sm text-indigo-950 font-medium">
          💡 <strong>En résumé :</strong> Le modèle n&apos;exécute jamais rien lui-même. Il émet un ordre structuré (un <em>Tool Call</em>), et c&apos;est votre IDE qui réalise l&apos;action sur votre machine sous votre surveillance.
        </div>
      </section>

      {/* 2. Les 6 grandes familles d'outils */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 6 grandes familles d&apos;outils dans un IDE moderne
        </h2>
        <p className="text-sm sm:text-base text-slate-700">
          Dans Google Antigravity, l&apos;agent dispose d&apos;une boîte à outils spécialisée pour couvrir chaque facette du développement :
        </p>

        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Famille 1</span>
              <h4 className="font-extrabold text-slate-950 text-base mt-2">Lecture de fichiers (read_file)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Permet d&apos;ouvrir n&apos;importe quel fichier source (<code className="bg-slate-100 px-1 rounded font-mono text-[11px]">.tsx</code>, <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">.json</code>, <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">.css</code>) en lecture seule pour comprendre le code sans risque d&apos;altération.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">Risque : Zéro</span>
          </div>

          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Famille 2</span>
              <h4 className="font-extrabold text-slate-950 text-base mt-2">Recherche de symboles (grep / search)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Recherche instantanée dans toute l&apos;arborescence d&apos;un nom de fonction, d&apos;un composant React ou d&apos;un endpoint d&apos;API sans avoir à ouvrir tous les dossiers un par un.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">Risque : Zéro</span>
          </div>

          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Famille 3</span>
              <h4 className="font-extrabold text-slate-950 text-base mt-2">Édition ciblée (edit_file)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Applique une modification chirurgicale sur un fichier existant en remplaçant exactement le bloc de code visé, sans écraser le reste du fichier.
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-100">Risque : Modéré (Validation)</span>
          </div>

          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Famille 4</span>
              <h4 className="font-extrabold text-slate-950 text-base mt-2">Terminal système (run_command)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Exécute des commandes en ligne de commande comme <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">npm run build</code>, <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">npx tsc</code> ou <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">git status</code>.
              </p>
            </div>
            <span className="text-[11px] font-mono text-rose-800 bg-rose-50 p-1.5 rounded-lg border border-rose-100">Risque : Élevé (Surveillance)</span>
          </div>

          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Famille 5</span>
              <h4 className="font-extrabold text-slate-950 text-base mt-2">Navigateur Web &amp; Aperçu</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Prend une capture d&apos;écran de la page web rendue en local pour vérifier visuellement le design, les marges et la disposition des éléments UI.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">Risque : Faible</span>
          </div>

          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Famille 6</span>
              <h4 className="font-extrabold text-slate-950 text-base mt-2">Banc de tests unitaires</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Lance la suite de tests Vitest ou Jest pour apporter la preuve indiscutable que la nouvelle fonctionnalité ne casse aucune règle existante.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">Risque : Zéro</span>
          </div>
        </div>
      </section>

      {/* 3. Comment fonctionne le Tool Calling (Sans scrollbar) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Dans les coulisses : Le protocole JSON du Tool Calling
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Comment l&apos;IA communique-t-elle avec l&apos;IDE ? À travers un échange de messages JSON standardisés en 4 temps :
        </p>

        {/* Bloc structuré sans scrollbar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 shadow-xl space-y-4 break-words min-w-0 max-w-full">
          <div>
            <div className="text-indigo-400 font-bold mb-1">// Étape 1 : L&apos;IDE présente au modèle les outils qu&apos;il a le droit d&apos;utiliser</div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-300">
              &#123; &quot;name&quot;: &quot;read_file&quot;, &quot;description&quot;: &quot;Lit le contenu d&apos;un fichier source&quot;, &quot;parameters&quot;: &#123; &quot;path&quot;: &quot;chemin/du/fichier.tsx&quot; &#125; &#125;
            </div>
          </div>

          <div>
            <div className="text-amber-400 font-bold mb-1">// Étape 2 : Le modèle répond en demandant d&apos;exécuter un outil précis</div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-amber-300">
              &#123; &quot;call_tool&quot;: &quot;read_file&quot;, &quot;arguments&quot;: &#123; &quot;path&quot;: &quot;src/components/Header.tsx&quot; &#125; &#125;
            </div>
          </div>

          <div>
            <div className="text-emerald-400 font-bold mb-1">// Étape 3 : L&apos;IDE lit le fichier sur le disque et lui renvoie le contenu réel</div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-emerald-300">
              &#123; &quot;status&quot;: &quot;success&quot;, &quot;content&quot;: &quot;export function Header() &#123; return &lt;nav&gt;...&lt;/nav&gt;; &#125;&quot; &#125;
            </div>
          </div>

          <div>
            <div className="text-sky-400 font-bold mb-1">// Étape 4 : Le modèle formule sa réponse finale en s&apos;appuyant sur ce qu&apos;il a lu</div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-sky-200 font-sans text-xs">
              « J&apos;ai inspecté votre Header.tsx : le menu de navigation utilise Tailwind. Je peux maintenant y intégrer le bouton demandé. »
            </div>
          </div>
        </div>
      </section>

      {/* 4. Le standard MCP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le protocole MCP (Model Context Protocol) : La prise USB-C des agents IA
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Auparavant, chaque éditeur de logiciel devait inventer un connecteur sur mesure pour relier une IA à une base de données PostgreSQL ou à GitHub. Le <strong>Model Context Protocol (MCP)</strong> est le standard ouvert universel qui révolutionne cette intégration :
        </p>

        <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 font-extrabold text-indigo-950 text-base">
            <span className="text-xl">🔌</span>
            <span>Pourquoi comparer MCP à une prise USB-C ?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            De la même façon qu&apos;une prise USB-C permet de brancher indifféremment un clavier, un écran ou un disque externe sur votre ordinateur portable avec un seul câble standard, le protocole <strong>MCP</strong> permet à Google Antigravity de se connecter en un clic à des dizaines d&apos;outils externes :
          </p>
          <div className="grid gap-2 pt-1 text-center text-xs font-bold text-slate-800 grid-cols-1 sm:grid-cols-2">
            <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-xs">GitHub MCP</div>
            <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-xs">PostgreSQL MCP</div>
            <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-xs">Linear / Jira MCP</div>
            <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-xs">Figma MCP</div>
          </div>
        </div>

        <Callout type="warning">
          <strong>Règle de sécurité élémentaire :</strong> Ne connectez jamais un serveur MCP avec des droits d&apos;écriture sur vos bases de données de production. Utilisez toujours des comptes de test ou restreints en lecture seule.
        </Callout>
      </section>

      {/* 5. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 4.5) : Observer les Tool Calls
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.5 — Visualiser les appels d&apos;outils</span>
          <h4 className="font-extrabold text-slate-950 text-base">Suivre l&apos;émission d&apos;un Tool Call en direct</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dans Google Antigravity, demandez :
          </p>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs break-words border border-slate-800 min-w-0 max-w-full">
            « Utilise ton outil de recherche pour trouver où est déclarée la variable d&apos;environnement PORT ou API_URL dans mon code. Présente l&apos;outil que tu as utilisé et son résultat. »
          </div>
          <p className="text-xs text-slate-600 italic">
            → Observez le volet d&apos;agent : vous verrez un petit badge indiquant le nom de l&apos;outil appelé (ex: <code className="bg-slate-100 px-1 rounded font-mono text-xs">search</code>) et les paramètres exacts transmis.
          </p>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur les Outils
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 5 (Tools & Function Calling)"
          questions={[
            {
              id: 1,
              question: "Que se passe-t-il techniquement lors d'un « Tool Call » émis par un modèle d'IA ?",
              options: [
                "L'IA envoie un email au créateur du projet.",
                "Le modèle émet un objet JSON structuré spécifiant le nom de l'outil souhaité et ses paramètres, que l'IDE prend ensuite en charge pour l'exécuter.",
                "Le modèle arrête de fonctionner définitivement.",
                "L'ordinateur formate automatiquement le disque dur."
              ],
              correctIndex: 1,
              explanation: "Le modèle ne manipule pas le matériel : il émet une intention d'action formelle en JSON, et c'est l'environnement hôte de l'IDE qui exécute l'outil sous contrôle des permissions."
            },
            {
              id: 2,
              question: "À quoi compare-t-on le protocole ouvert MCP (Model Context Protocol) ?",
              options: [
                "À une prise USB-C standardisée permettant de relier n'importe quel outil ou base de données externe à l'agent IA de façon unifiée.",
                "À un antivirus gratuit réservé aux téléphones.",
                "À une ancienne disquette 3,5 pouces.",
                "À un câble d'alimentation secteur 220V."
              ],
              correctIndex: 0,
              explanation: "MCP est le standard universel de connectivité permettant à un agent de dialoguer avec des serveurs de données externes (GitHub, PostgreSQL, Jira...) avec un protocole unique."
            },
            {
              id: 3,
              question: "Pourquoi l'outil de terminal (run_command) est-il classé parmi les outils à risque élevé ?",
              options: [
                "Parce qu'il consomme trop de mémoire vive.",
                "Parce qu'une commande mal formulée peut installer des paquets malveillants, écraser des branches Git ou supprimer des données locales.",
                "Parce que le terminal ne fonctionne que la nuit.",
                "Parce qu'il empêche le clavier de fonctionner."
              ],
              correctIndex: 1,
              explanation: "Le terminal exécute des commandes directement sur le système d'exploitation de votre machine, d'où la nécessité d'une surveillance et d'une validation rigoureuse des autorisations."
            }
          ]}
        />
      </section>
    </div>
  );
};
