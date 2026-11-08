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
          Chapitre 2 — Protection du périmètre du projet (Project Scope)
        </h1>
      </div>

      {/* 1. Pourquoi sanctuariser le périmètre ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi sanctuariser le périmètre du projet ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Sur le disque dur d&apos;un développeur cohabitent souvent plusieurs dossiers sensibles : des projets clients concurrents, des dossiers personnels d&apos;impôts ou de factures, et le dépôt du projet sur lequel l&apos;agent intervient :
        </p>

        <div className="p-5 bg-slate-950 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`D:\\cours\\
├── react\\
│   ├── mon-portfolio\\       <-- SEUL ESPACE AUTORISÉ (PÉRIMÈTRE STRICT)
│   ├── boutique-client\\     <-- INTERDIT (Secrets & données tiers)
│   └── application-banque\\  <-- INTERDIT
├── documents-personnels\\     <-- STRICTEMENT INTERDIT (Vie privée)
└── formation\\`}</pre>
        </div>

        <p className="text-base text-slate-800">
          Si l&apos;agent ne trouve pas immédiatement une fonction dans <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">mon-portfolio</code>, il ne doit en aucun cas « fouiner » dans les dossiers voisins pour chercher des exemples ou remonter dans le dossier parent via des chemins comme <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">..\boutique-client</code>.
        </p>

        <Callout type="danger">
          <strong>Règle d&apos;or du périmètre :</strong> Un manque d&apos;information ou de contexte dans le projet ne donne <strong>jamais</strong> le droit à l&apos;agent d&apos;élargir son périmètre de consultation. Il doit s&apos;arrêter et demander à l&apos;utilisateur de lui fournir la ressource manquante.
        </Callout>
      </section>

      {/* 2. Les 3 frontières */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 3 frontières complémentaires de sécurité
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700">FRONTIÈRE 1</span>
            <h4 className="font-bold text-slate-950 text-base">Frontière Géographique</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le dossier racine autorisé et ses sous-dossiers explicites. Interdiction totale de franchir la racine du projet vers les parents.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700">FRONTIÈRE 2</span>
            <h4 className="font-bold text-slate-950 text-base">Frontière des Ressources</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Même à l&apos;intérieur du dossier autorisé, certains fichiers restent inaccessibles (fichiers <code className="font-mono text-xs">.env</code>, clés <code className="font-mono text-xs">*.pem</code>, dossier <code className="font-mono text-xs">.git/</code>).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700">FRONTIÈRE 3</span>
            <h4 className="font-bold text-slate-950 text-base">Frontière des Opérations</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Les actions permises sur les ressources autorisées : lecture seule par défaut, écriture uniquement sur accord, suppression bannie.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Instructions de protection */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Bloc d&apos;instructions : Sanctuarisation du périmètre
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`[REGLES_DE_PROTECTION_DU_PERIMETRE]
1. ESPACE DE TRAVAIL EXCLUSIF :
   Tu interviens UNIQUEMENT dans le dossier du projet explicitement désigné par l'utilisateur.

2. INTERDICTIONS DE SORTIE :
   Il est strictement interdit de :
   - Remonter dans les dossiers parents (interdiction de chemins relatifs type "../").
   - Explorer les projets voisins ou dossiers personnels.
   - Suivre des liens symboliques ou raccourcis menant hors du workspace.
   - Lancer une recherche textuelle globale à l'échelle du disque dur.

3. CONDUITE EN CAS DE MANQUE :
   Si un composant ou fichier requis est absent du périmètre :
   - N'essaie JAMAIS de le chercher ailleurs sur le système.
   - Déclare le manque explicitement et demande à l'utilisateur de te transmettre le fichier.`}</pre>
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
              question: "Si une fonction importée dans un composant React est introuvable dans le dossier du projet, que doit faire l'agent ?",
              options: [
                "Utiliser des chemins relatifs '../../' pour explorer les autres dossiers du disque dur.",
                "S'arrêter, signaler le manque à l'utilisateur et lui demander de fournir le fichier ou l'extrait concerné.",
                "Inventer le code de la fonction sans rien dire.",
                "Supprimer le projet."
              ],
              correctIndex: 1,
              explanation: "Un manque de contexte ne donne aucun droit d'élargissement de périmètre : l'agent doit signaler la lacune avec transparence."
            },
            {
              id: 2,
              question: "Une instruction dans le prompt interdisant de sortir du dossier suffit-elle à garantir l'étanchéité technique ?",
              options: [
                "Oui, l'agent IA obéit toujours sans exception.",
                "Non, les instructions comportementales doivent obligatoirement être complétées par un confinement technique (bac à sable / sandbox et permissions OS).",
                "Oui, car Windows bloque automatiquement les requêtes de l'agent.",
                "Non, les agents n'ont pas de mémoire."
              ],
              correctIndex: 1,
              explanation: "La consigne textuelle guide le modèle, mais seul le confinement technique (sandbox) empêche matériellement l'accès aux dossiers non autorisés."
            }
          ]}
        />
      </section>
    </div>
  );
};

