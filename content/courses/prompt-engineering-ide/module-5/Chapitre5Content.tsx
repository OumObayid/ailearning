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
          <span>Prompt Engineering IDE • Module 5</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Configuration concrète des sous-agents dans Google Antigravity
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment déclarer vos sous-agents dans les fichiers <code className="font-mono text-xs font-bold bg-purple-100 text-purple-900 px-1 py-0.5 rounded">agent.md</code>, configurer le frontmatter YAML et verrouiller les permissions d&apos;outils.
        </p>
      </div>

      {/* 1. L'arborescence officielle d'Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="folder-plus" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;arborescence normalisée des sous-agents Antigravity</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans Google Antigravity, les sous-agents d&apos;un projet ne sont pas codés en Python ou compilés en binaire. Ce sont de simples <strong>fichiers Markdown documentés</strong> situés dans un répertoire dédié à la racine de votre workspace :
        </p>

        {/* Tree Box without pre */}
        <div className="p-4 sm:p-5 bg-slate-950 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
          <div className="text-purple-400 font-bold">MON-PROJET-REACT/</div>
          <div>├── <span className="text-indigo-400 font-bold">.agents/</span></div>
          <div>│   └── <span className="text-indigo-400 font-bold">agents/</span></div>
          <div>│       ├── <span className="text-emerald-300">architecte/</span></div>
          <div>│       │   └── <span className="text-white font-bold">agent.md</span>        <span className="text-slate-500">&lt;-- Profil Conception (Lecture seule)</span></div>
          <div>│       ├── <span className="text-emerald-300">developpeur/</span></div>
          <div>│       │   └── <span className="text-white font-bold">agent.md</span>        <span className="text-slate-500">&lt;-- Profil Écriture (Édition ciblée)</span></div>
          <div>│       ├── <span className="text-emerald-300">auditeur/</span></div>
          <div>│       │   └── <span className="text-white font-bold">agent.md</span>        <span className="text-slate-500">&lt;-- Profil Qualité (Lecture seule)</span></div>
          <div>│       ├── <span className="text-emerald-300">securite/</span></div>
          <div>│       │   └── <span className="text-white font-bold">agent.md</span>        <span className="text-slate-500">&lt;-- Profil Vulnérabilités (Lecture seule)</span></div>
          <div>│       ├── <span className="text-emerald-300">testeur/</span></div>
          <div>│       │   └── <span className="text-white font-bold">agent.md</span>        <span className="text-slate-500">&lt;-- Profil QA (Tests &amp; vérification)</span></div>
          <div>│       └── <span className="text-emerald-300">documentaliste/</span></div>
          <div>│           └── <span className="text-white font-bold">agent.md</span>        <span className="text-slate-500">&lt;-- Profil Docs Markdown</span></div>
          <div>├── src/</div>
          <div>├── package.json</div>
          <div>└── README.md</div>
        </div>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du passeport et du livret de service :</span>
          </div>
          <p>
            Chaque fichier <code className="font-mono text-xs bg-indigo-100 px-1 py-0.5 rounded">agent.md</code> se compose de deux parties bien distinctes :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>Le passeport biométrique (en-tête YAML entre trois tirets <code className="font-mono">---</code>) :</strong> Lu par l&apos;IDE Antigravity pour savoir quel nom donner à l&apos;agent et quelles autorisations techniques lui accorder.</li>
            <li><strong>Le livret d&apos;instructions (le corps Markdown) :</strong> Lu par le cerveau du LLM pour comprendre sa mission, ses limites et son format de rapport.</li>
          </ul>
        </div>
      </section>

      {/* 2. Anatomie d'un agent.md */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="cog-6-tooth" className="w-5 h-5 text-indigo-600" />
          <span>2. Les paramètres YAML essentiels d&apos;un agent Antigravity</span>
        </h2>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200 font-mono">Paramètre YAML</th>
                <th className="p-3.5 border-b border-slate-200 font-mono text-indigo-900">Valeur type</th>
                <th className="p-3.5 border-b border-slate-200">Fonction dans Google Antigravity</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-mono font-bold text-indigo-700">name</td>
                <td className="p-3.5 font-mono">securite</td>
                <td className="p-3.5">Identifiant machine unique utilisé pour invoquer le sous-agent dans le chat ou par l&apos;orchestrateur.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-indigo-700">description</td>
                <td className="p-3.5 text-xs text-slate-600">&quot;Examine les vulnérabilités OWASP...&quot;</td>
                <td className="p-3.5">Résumé lu par l&apos;orchestrateur pour savoir à quel agent confier une tâche donnée.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-indigo-700">tools</td>
                <td className="p-3.5 font-mono text-xs text-slate-700">[view_file, grep_search]</td>
                <td className="p-3.5"><strong>Liste blanche fermée :</strong> seuls ces outils seront techniquement visibles par l&apos;agent.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-indigo-700">subagent</td>
                <td className="p-3.5 font-mono font-bold text-emerald-700">true</td>
                <td className="p-3.5">Indique qu&apos;il s&apos;agit d&apos;un sous-agent spécialisé mobilisable par délégation.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-indigo-700">mainAgent</td>
                <td className="p-3.5 font-mono font-bold text-rose-700">false</td>
                <td className="p-3.5">Empêche qu&apos;il soit lancé par erreur comme agent conversationnel principal généraliste.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-indigo-700">commandExecutionPolicy</td>
                <td className="p-3.5 font-mono font-bold text-rose-700">&quot;off&quot;</td>
                <td className="p-3.5"><strong>Garde-fou capital :</strong> désactive l&apos;exécution automatique de commandes shell dans le terminal.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden space-y-3">
          {[
            { param: "name", val: "securite", desc: "Identifiant machine pour invoquer le sous-agent." },
            { param: "description", val: "Analyse OWASP...", desc: "Permet à l'orchestrateur de router automatiquement la tâche." },
            { param: "tools", val: "[view_file, grep_search]", desc: "Liste fermée des outils autorisés (principe du moindre privilège)." },
            { param: "subagent", val: "true", desc: "Déclare le profil comme sous-agent spécialisé." },
            { param: "commandExecutionPolicy", val: "\"off\"", desc: "Verrouille le terminal : aucune commande shell automatique." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-indigo-700">{item.param}</span>
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{item.val}</span>
              </div>
              <p className="text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Comparatif des configurations : Développeur vs Sécurité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="code-bracket-square" className="w-5 h-5 text-indigo-600" />
          <span>3. Deux exemples concrets de fichiers de configuration</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Comparez comment le Développeur reçoit l&apos;outil de modification, alors que l&apos;agent Sécurité en est formellement privé au niveau de la configuration technique :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Developpeur agent.md */}
          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              .agents/agents/developpeur/agent.md
            </span>
            <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div className="text-slate-500">---</div>
              <div><span className="text-purple-400">name</span>: <span className="text-emerald-300">developpeur</span></div>
              <div><span className="text-purple-400">description</span>: <span className="text-emerald-300">&quot;Implémente les fonctionnalités React validées.&quot;</span></div>
              <div><span className="text-purple-400">tools</span>:</div>
              <div className="pl-4 text-emerald-300">- view_file</div>
              <div className="pl-4 text-emerald-300">- grep_search</div>
              <div className="pl-4 text-emerald-300 font-bold">- edit_file  # AUTORISÉ EN ÉCRITURE</div>
              <div><span className="text-purple-400">subagent</span>: <span className="text-amber-400">true</span></div>
              <div><span className="text-purple-400">mainAgent</span>: <span className="text-amber-400">false</span></div>
              <div><span className="text-purple-400">commandExecutionPolicy</span>: <span className="text-amber-400">&quot;off&quot;</span></div>
              <div className="text-slate-500">---</div>
              <div className="text-indigo-300 font-bold pt-1"># IDENTITÉ</div>
              <div className="text-slate-200">Développeur Frontend React d&apos;implémentation rigoureuse.</div>
              <div className="text-indigo-300 font-bold pt-1"># MISSION</div>
              <div className="text-slate-200">Coder selon les spécifications validées sans altérer le reste du code.</div>
              <div className="text-rose-400 font-bold pt-1"># LIMITES</div>
              <div className="text-slate-200">Ne modifie que les fichiers mentionnés dans le Handoff.</div>
            </div>
          </div>

          {/* Securite agent.md */}
          <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
              .agents/agents/securite/agent.md
            </span>
            <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div className="text-slate-500">---</div>
              <div><span className="text-purple-400">name</span>: <span className="text-emerald-300">securite</span></div>
              <div><span className="text-purple-400">description</span>: <span className="text-emerald-300">&quot;Audite les failles et risques applicatifs OWASP.&quot;</span></div>
              <div><span className="text-purple-400">tools</span>:</div>
              <div className="pl-4 text-emerald-300">- view_file</div>
              <div className="pl-4 text-emerald-300">- grep_search</div>
              <div className="pl-4 text-slate-500 italic"># AUCUN outil d&apos;écriture (edit_file / write_file absent)</div>
              <div><span className="text-purple-400">subagent</span>: <span className="text-amber-400">true</span></div>
              <div><span className="text-purple-400">mainAgent</span>: <span className="text-amber-400">false</span></div>
              <div><span className="text-purple-400">commandExecutionPolicy</span>: <span className="text-amber-400">&quot;off&quot;</span></div>
              <div className="text-slate-500">---</div>
              <div className="text-indigo-300 font-bold pt-1"># IDENTITÉ</div>
              <div className="text-slate-200">Auditeur sécurité applicative web (AppSec).</div>
              <div className="text-indigo-300 font-bold pt-1"># MISSION</div>
              <div className="text-slate-200">Déceler les failles sans tenter de les exploiter ni de les modifier.</div>
              <div className="text-rose-400 font-bold pt-1"># LIMITES</div>
              <div className="text-slate-200">Mode lecture seule strict. Ne révèle aucun secret en clair.</div>
            </div>
          </div>
        </div>

        <Callout type="note">
          <strong>La sécurité par l&apos;outillage :</strong> Ne vous fiez pas seulement aux consignes textuelles. En retirant <code className="font-mono text-xs">edit_file</code> de la liste <code className="font-mono text-xs">tools</code> de l&apos;agent sécurité, même si le modèle était victime d&apos;une injection le poussant à effacer du code, il en serait physiquement incapable car la fonction d&apos;édition ne lui est pas fournie.
        </Callout>
      </section>

      {/* 4. Atelier guidé (TP 5.5) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-indigo-600" />
          <span>4. Atelier pratique (TP 5.5) : Créer votre premier sous-agent local</span>
        </h2>
        
        <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
          <p className="text-sm sm:text-base text-slate-800 font-medium">
            Pour installer un sous-agent dans votre propre IDE Google Antigravity :
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
            <li>Ouvrez votre projet dans Antigravity.</li>
            <li>Créez le dossier <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">.agents/agents/testeur/</code>.</li>
            <li>Créez-y le fichier <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">agent.md</code>.</li>
            <li>Copiez-y l&apos;en-tête YAML avec <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">name: testeur</code> et les outils de lecture + rapport.</li>
            <li>Dans la fenêtre de discussion principale, tapez : <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">@testeur vérifie les scénarios de test du panier d&apos;achat</code>. Antigravity invoquera automatiquement le sous-agent avec ses règles spécifiques !</li>
          </ol>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Configuration Antigravity
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 5"
          questions={[
            {
              id: 1,
              question: "Dans quel répertoire officiel d'un projet Google Antigravity configure-t-on les sous-agents d'un workspace ?",
              options: [
                ".agents/agents/<nom_agent>/agent.md",
                "node_modules/antigravity/agents/",
                "public/config/agents.json",
                "system32/drivers/etc/agents/"
              ],
              correctIndex: 0,
              explanation: "Google Antigravity recherche nativement les déclarations de sous-agents personnalisés du workspace dans le dossier .agents/agents/<nom_agent>/agent.md."
            },
            {
              id: 2,
              question: "Pourquoi est-il crucial de positionner 'commandExecutionPolicy: off' pour les profils d'analyse ou d'audit ?",
              options: [
                "Pour interdire l'exécution de commandes système automatiques dans le shell à l'insu de l'utilisateur.",
                "Pour faire baisser la facture d'électricité de la carte graphique.",
                "Parce qu'Antigravity ne sait pas ce qu'est un terminal.",
                "Pour obliger l'agent à taper ses réponses avec une machine à écrire."
              ],
              correctIndex: 0,
              explanation: "Désactiver l'exécution automatique de commandes shell garantit qu'aucune commande potentiellement destructrice ou imprévue ne sera lancée en arrière-plan sans accord."
            },
            {
              id: 3,
              question: "Si l'on veut rendre un agent strictement 'Lecture Seule', quelle est la méthode la plus sûre ?",
              options: [
                "Retirer formellement tout outil d'édition (comme edit_file ou write_file) de son tableau 'tools' dans le YAML frontmatter.",
                "Lui demander gentiment en lui disant s'il vous plaît dans le prompt.",
                "Mettre son écran d'ordinateur en noir et blanc.",
                "Débrancher le clavier quand il commence à parler."
              ],
              correctIndex: 0,
              explanation: "La sécurité par conception (Security by Design) consiste à ne pas fournir l'outil dans l'environnement d'exécution de l'agent. Sans outil d'écriture, l'agent ne peut pas altérer les fichiers."
            }
          ]}
        />
      </section>
    </div>
  );
};
