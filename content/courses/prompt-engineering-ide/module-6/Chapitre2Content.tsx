'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 2 — Protection du périmètre du projet (Project Scope)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment confiner hermétiquement votre agent à son répertoire de travail et neutraliser les fuites vers les projets voisins ou dossiers personnels.
        </p>
      </div>

      {/* 1. L'analogie du jardinier et la sanctuarisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="map-pin" className="w-5 h-5 text-indigo-600" />
          <span>1. Pourquoi sanctuariser le périmètre de travail ?</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Sur le disque dur d&apos;un développeur cohabitent des dizaines de dossiers hautement sensibles : des projets de clients concurrents sous clause de confidentialité (NDA), des déclarations d&apos;impôts ou photos de famille, des clés SSH personnelles et l&apos;application sur laquelle l&apos;agent est mandaté :
        </p>

        {/* Tree Box without pre */}
        <div className="p-4 sm:p-5 bg-slate-950 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
          <div className="text-purple-400 font-bold">D:\projets\</div>
          <div>├── <span className="text-emerald-400 font-bold">mon-portfolio-react\</span>     <span className="text-emerald-300 font-semibold">&lt;-- SEUL ESPACE AUTORISÉ (PÉRIMÈTRE STRICT)</span></div>
          <div>│   ├── src/</div>
          <div>│   └── package.json</div>
          <div>├── <span className="text-rose-400 font-bold">client-banque-confidentiel\</span>  <span className="text-rose-400 font-semibold">&lt;-- STRICTEMENT INTERDIT (Secret professionnel)</span></div>
          <div>├── <span className="text-rose-400 font-bold">documents-personnels-impots\</span> <span className="text-rose-400 font-semibold">&lt;-- STRICTEMENT INTERDIT (Vie privée)</span></div>
          <div>└── <span className="text-rose-400 font-bold">.ssh\</span>                       <span className="text-rose-400 font-semibold">&lt;-- STRICTEMENT INTERDIT (Clés privées de serveurs)</span></div>
        </div>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de la clôture du jardinier :</span>
          </div>
          <p>
            Vous embauchez un jardinier pour tondre la pelouse de votre jardin avant. S&apos;il ne trouve pas d&apos;engrais dans votre abri de jardin, imaginez s&apos;il sautait la clôture pour aller fouiller dans la cabane de votre voisin, ou s&apos;il pénétrait dans votre salon par la fenêtre ouverte ! Ce serait une violation de domicile intolérable.
          </p>
          <p>
            Pour un agent IA, c&apos;est exactement pareil : s&apos;il manque d&apos;informations ou d&apos;un composant, il ne doit en aucun cas utiliser des chemins de remonte comme <code className="font-mono text-xs bg-indigo-100 px-1 py-0.5 rounded text-indigo-900">..\client-banque</code> (attaque par <em>Path Traversal</em>). Il doit s&apos;arrêter net et vous interroger.
          </p>
        </div>

        <Callout type="danger">
          <strong>Règle d&apos;or du périmètre :</strong> Un manque d&apos;information ou de code dans le projet ne donne <strong>JAMAIS</strong> le droit à l&apos;agent d&apos;élargir son périmètre de recherche au-delà de sa racine.
        </Callout>
      </section>

      {/* 2. Les 3 frontières complémentaires */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="squares-2x2" className="w-5 h-5 text-indigo-600" />
          <span>2. Les 3 frontières concentriques de sécurité</span>
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">FRONTIÈRE 1</span>
              <span className="text-xs text-slate-500">Le Terrain</span>
            </div>
            <h4 className="font-extrabold text-slate-950 text-base">Frontière Géographique (Workspace)</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le dossier racine autorisé et ses sous-répertoires. Interdiction formelle de remonter vers les dossiers parents (<code className="font-mono">../</code>) ou de scanner d&apos;autres lecteurs (<code className="font-mono">C:\</code>).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">FRONTIÈRE 2</span>
              <span className="text-xs text-slate-500">Les Pièces Interdites</span>
            </div>
            <h4 className="font-extrabold text-slate-950 text-base">Frontière des Ressources Internes</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Même à l&apos;intérieur du dossier du projet, certaines pièces sont sanctuarisées : fichiers <code className="font-mono">.env*</code>, clés <code className="font-mono">*.pem</code>, historique <code className="font-mono">.git/</code> et cache.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">FRONTIÈRE 3</span>
              <span className="text-xs text-slate-500">Les Gestes Autorisés</span>
            </div>
            <h4 className="font-extrabold text-slate-950 text-base">Frontière des Opérations</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Ce que l&apos;agent a le droit de faire sur les ressources accessibles : lecture seule par défaut, modification chirurgicale sur validation explicite, suppression bannie.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Bloc d'instructions de confinement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>3. Directive d&apos;instructions : Confinement de l&apos;espace de travail</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-800">
          Injectez cette directive dans les instructions de votre agent pour lui interdire tout franchissement de périmètre :
        </p>

        {/* Prompt Card without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE SÉCURITÉ : CONFINEMENT DE PÉRIMÈTRE ===
          </div>
          <div className="text-indigo-300 font-bold">[1. ESPACE DE TRAVAIL EXCLUSIF]</div>
          <div className="text-slate-200">
            Tu opères STRICTEMENT et EXCLUSIVEMENT au sein du répertoire racine du projet assigné par l&apos;utilisateur.
          </div>

          <div className="text-rose-400 font-bold pt-1">[2. INTERDICTIONS DE SORTIE FORMELLES]</div>
          <div className="pl-4 text-slate-200">
            • Interdiction d&apos;utiliser des chemins relatifs ascendants (ex: &quot;../&quot; ou &quot;..\\&quot;).<br />
            • Interdiction d&apos;inspecter des projets frères situés dans le même dossier parent.<br />
            • Interdiction de suivre des liens symboliques ou raccourcis menant hors du workspace.<br />
            • Interdiction de lancer des recherches grep globales sur tout le disque dur.
          </div>

          <div className="text-amber-300 font-bold pt-1">[3. CONDUITE EN CAS DE RESSOURCE MANQUANTE]</div>
          <div className="pl-4 text-slate-200">
            Si un fichier, une fonction ou une bibliothèque importée est introuvable :<br />
            1. Ne cherche JAMAIS ailleurs sur le système d&apos;exploitation.<br />
            2. Déclare honnêtement la ressource manquante dans ta réponse.<br />
            3. Demande à l&apos;utilisateur de te fournir le fichier ou son contenu dans le chat.
          </div>
        </div>
      </section>

      {/* 4. Atelier guidé (TP 6.2) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-indigo-600" />
          <span>4. Atelier pratique (TP 6.2) : Détecter une tentative d&apos;évasion</span>
        </h2>
        
        <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
          <p className="text-sm sm:text-base text-slate-800 font-medium">
            Examinez cet appel d&apos;outil émis par un agent dans ses logs de débogage :
          </p>
          <div className="p-3 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed break-words border border-slate-800 min-w-0 max-w-full">
            <span className="text-purple-400">tool_call</span>: <span className="text-emerald-300">view_file</span>&#123; <span className="text-purple-300">&quot;Path&quot;</span>: <span className="text-rose-400">&quot;../../client-finance/config/database.json&quot;</span> &#125;
          </div>
          <p className="text-xs sm:text-sm text-slate-700">
            <strong>Diagnostic de sécurité :</strong> Cet appel constitue une tentative d&apos;évasion de périmètre par <em>Path Traversal</em>. L&apos;agent tente d&apos;explorer un projet tiers. L&apos;IDE doit bloquer l&apos;appel immédiatement avec le message : <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded text-rose-700">Access Denied: Path escapes workspace root</code>.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Périmètre du projet
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 2"
          questions={[
            {
              id: 1,
              question: "Si une fonction importée dans un composant React est introuvable dans le dossier du projet, quelle est la conduite réglementaire de l'agent ?",
              options: [
                "S'arrêter, signaler la lacune à l'utilisateur et lui demander de lui transmettre le fichier ou extrait nécessaire directement.",
                "Utiliser des chemins relatifs '../../' pour fouiller dans les autres projets du disque dur de l'ordinateur.",
                "Inventer le code de la fonction sans rien dire pour que ça compile.",
                "Effacer le composant pour faire disparaître l'erreur d'import."
              ],
              correctIndex: 0,
              explanation: "Un manque de contexte ne confère aucun droit d'élargissement de périmètre : l'agent doit déclarer la ressource manquante avec transparence."
            },
            {
              id: 2,
              question: "Une simple instruction écrite dans le prompt interdisant de sortir du dossier suffit-elle à garantir une sécurité absolue ?",
              options: [
                "Non, la consigne textuelle oriente le modèle mais doit être obligatoirement doublée d'un verrouillage technique (bac à sable / sandbox de l'IDE) qui bloque physiquement les chemins interdits.",
                "Oui, car les modèles d'IA ne se trompent jamais et respectent toujours les consignes à 100%.",
                "Oui, car Windows désactive automatiquement les touches du clavier si un agent sort du dossier.",
                "Non, car les agents ne savent pas lire les dossiers."
              ],
              correctIndex: 0,
              explanation: "Le principe de sécurité en profondeur (Defense in Depth) exige à la fois des instructions claires dans le prompt ET un bac à sable technique au niveau de l'IDE."
            },
            {
              id: 3,
              question: "Dans l'analogie du jardinier, que représente le fait de sauter la clôture pour aller chercher de l'engrais dans l'abri du voisin ?",
              options: [
                "Une tentative de Path Traversal (remontée de dossier hors du workspace) pour chercher du contexte dans des projets voisins non autorisés.",
                "Une marque d'autonomie remarquable qui mérite une prime.",
                "Une opération standard autorisée par la convention collective.",
                "Une mise à jour automatique de Windows."
              ],
              correctIndex: 0,
              explanation: "Sauter chez le voisin correspond exactement à remonter avec `../` pour piocher du code dans un autre dossier : c'est une violation flagrante de périmètre."
            }
          ]}
        />
      </section>
    </div>
  );
};
