'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 10 — Validation humaine avant les actions sensibles (HITL)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Pourquoi l&apos;autonomie totale est une illusion dangereuse et comment mettre en place le protocole Human-in-the-Loop (HITL) pour garder le contrôle absolu de votre code.
        </p>
      </div>

      {/* 1. Pourquoi l'autonomie totale est une illusion dangereuse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="user-check" className="w-5 h-5 text-indigo-600" />
          <span>1. Pourquoi l&apos;autonomie totale est une illusion dangereuse</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un agent IA dans un IDE possède la vitesse de frappe d&apos;un ordinateur et la capacité d&apos;appeler directement les commandes du système d&apos;exploitation. Sans supervision humaine explicite sur les opérations critiques, une simple hallucination de syntaxe ou une confusion de dossier peut détruire des semaines de travail en un millième de seconde.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du copilote d&apos;avion et du bouton de tir :</span>
          </div>
          <p>
            Dans l&apos;aviation civile ou les systèmes de haute sécurité, le copilote ou le système informatique peut calculer la trajectoire optimale, identifier les turbulences et proposer une altitude de secours. Mais pour toute manœuvre d&apos;urgence ou action irréversible (vidange de kérosène, changement de plan de vol), <strong>le commandant de bord humain doit actionner le commutateur physique</strong>.
          </p>
          <p>
            C&apos;est le principe universel du <strong>Human-in-the-Loop (HITL)</strong> : l&apos;agent IA prépare, analyse et formule le Diff avec brio, mais la main humaine conserve l&apos;exclusivité du déclenchement physique.
          </p>
        </div>

        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
              0
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Autonomie Totale (Dangereux)</h4>
            <p className="text-xs text-slate-600">
              L&apos;agent lit, modifie, supprime et pousse sur Git sans jamais demander d&apos;accord. Risque maximal d&apos;accident irréversible.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-bold text-slate-950 text-sm">Supervision Passive (Trop tard)</h4>
            <p className="text-xs text-slate-600">
              L&apos;agent applique les changements et envoie un récapitulatif a posteriori. Trop tard en cas de fichier écrasé ou de base corrompue !
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-emerald-400 rounded-xl space-y-2 shadow-sm bg-emerald-50/20">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-bold text-emerald-950 text-sm">HITL Contrôlé (Recommandé)</h4>
            <p className="text-xs text-slate-700">
              L&apos;agent prépare le Diff, chiffre l&apos;impact et <strong>s&apos;arrête net</strong> en attendant le clic ou l&apos;accord explicite de l&apos;utilisateur.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 4 phases obligatoires d'une action contrôlée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="arrow-path" className="w-5 h-5 text-indigo-600" />
          <span>2. Les 4 phases obligatoires d&apos;une action contrôlée</span>
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded">PHASE 1</span>
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-950 text-sm">Évaluation du périmètre d&apos;impact</h4>
              <p className="text-xs text-slate-600">L&apos;agent inspecte les fichiers cibles, les dépendances impactées et qualifie le type d&apos;action (création, écrasement, suppression).</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded">PHASE 2</span>
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-950 text-sm">Formulation du Diff unifié ou de la commande</h4>
              <p className="text-xs text-slate-600">L&apos;agent prépare le changement sous une forme visuelle intelligible (code avant/après ou ligne de commande shell exacte).</p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-rose-300 rounded-xl flex items-start gap-3 shadow-sm bg-rose-50/20">
            <span className="font-mono font-bold text-xs bg-rose-100 text-rose-800 px-2.5 py-1 rounded">PHASE 3</span>
            <div className="space-y-0.5">
              <h4 className="font-bold text-rose-950 text-sm">Arrêt &amp; Demande explicite de validation (Approval Gate)</h4>
              <p className="text-xs text-slate-700">L&apos;agent interrompt son raisonnement, prévient des conséquences (ex: <em>« Cette action modifie la table SQL users »</em>) et attend la confirmation.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded">PHASE 4</span>
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-950 text-sm">Exécution vérifiée et compte-rendu factuel</h4>
              <p className="text-xs text-slate-600">Seulement après accord, l&apos;agent exécute l&apos;outil, vérifie le code de retour et consigne le résultat dans ses logs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Directive système HITL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>3. Directive d&apos;instructions : Protocole Human-in-the-Loop</span>
        </h2>

        {/* Prompt Card without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE GOUVERNANCE HUMAN-IN-THE-LOOP (HITL) ===
          </div>
          <div className="text-indigo-300 font-bold">[1. OPÉRATIONS SOUMISES À ACCORD PRÉALABLE STRICT]</div>
          <div className="pl-4 text-slate-200">
            Tu as l&apos;interdiction formelle d&apos;exécuter les actions suivantes sans confirmation explicite :<br />
            • Toute modification physique ou création de fichier (<code className="text-emerald-300">edit_file</code>, <code className="text-emerald-300">write_file</code>).<br />
            • Toute suppression ou renommage de ressource existante.<br />
            • Toute commande shell terminal modifiant le projet (<code className="text-emerald-300">npm install</code>, <code className="text-emerald-300">git checkout -f</code>).<br />
            • Toute migration ou altération de schéma de base de données.
          </div>

          <div className="text-rose-400 font-bold pt-1">[2. PROTOCOLE D&apos;ARRÊT SYSTEMIQUE (STOP &amp; ASK)]</div>
          <div className="pl-4 text-slate-200">
            Dès qu&apos;une telle action est requise, TU DOIS t&apos;arrêter net et formuler ta demande :<br />
            1. Fichier ciblé et aperçu Diff.<br />
            2. Conséquence technique prévisible.<br />
            3. Question fermée : <em>&quot;Validez-vous cette modification chirurgicale sur [CHEMIN_FICHIER] ?&quot;</em>
          </div>

          <div className="text-amber-300 font-bold pt-1">[3. INTERDICTION D&apos;INFLATION D&apos;AUTORISATION]</div>
          <div className="pl-4 text-slate-200">
            Un accord donné pour modifier le composant A ne t&apos;autorise en aucun cas à modifier le composant B. Si un autre fichier doit être touché, formule une nouvelle demande d&apos;accord distincte.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Validation humaine (HITL)
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 10"
          questions={[
            {
              id: 1,
              question: "Pourquoi la supervision passive (où l'agent effectue les modifications puis envoie un récapitulatif à la fin) est-elle insuffisante pour les opérations critiques ?",
              options: [
                "Parce qu'une fois le fichier écrasé ou la base corrompue, le mal est fait et le récapitulatif ne fait que constater les dégâts survenus trop tard.",
                "Parce que les e-mails de récapitulatif coûtent trop cher.",
                "Parce que la supervision passive ralentit la vitesse du curseur de la souris.",
                "Parce que les développeurs n'aiment pas lire les messages."
              ],
              correctIndex: 0,
              explanation: "La supervision passive intervient après la catastrophe : seul le modèle Human-in-the-Loop préventif (Stop & Ask) permet d'empêcher un incident avant qu'il ne touche le disque."
            },
            {
              id: 2,
              question: "Que doit faire l'agent s'il constate qu'après avoir corrigé le composant Header.jsx avec votre accord, il doit aussi modifier le fichier App.jsx pour que le code compile ?",
              options: [
                "S'arrêter à nouveau, présenter le Diff sur App.jsx et demander un nouvel accord humain explicite avant de toucher à ce second fichier.",
                "Modifier App.jsx en cachette pour rendre service.",
                "Effacer le composant Header.jsx pour annuler son travail.",
                "Fermer l'IDE sans prévenir."
              ],
              correctIndex: 0,
              explanation: "Le principe de non-inflation des accords interdit d'étendre une permission : chaque fichier supplémentaire requiert sa propre porte d'approbation."
            },
            {
              id: 3,
              question: "Dans l'analogie de l'aviation, quel est le rôle du commandant de bord face aux propositions de son copilote informatique ?",
              options: [
                "Il conserve l'autorité absolue et le bouton physique d'engagement : le copilote calcule et propose, mais l'humain valide chaque manœuvre sensible.",
                "Il dort pendant tout le vol sans regarder le tableau de bord.",
                "Il fait le service du café en cabine passagers.",
                "Il débranche les instruments de vol pour piloter aux étoiles."
              ],
              correctIndex: 0,
              explanation: "L'analogie du cockpit illustre la collaboration homme-machine idéale : l'IA apporte sa puissance d'analyse, mais l'humain reste le décisionnaire ultime de l'action."
            }
          ]}
        />
      </section>
    </div>
  );
};
