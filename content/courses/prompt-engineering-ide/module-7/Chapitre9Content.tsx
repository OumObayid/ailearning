'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 7 — Débogage &amp; Optimisation de Prompts</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 9 — Gérer les tâches longues et complexes
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Comment immuniser votre agent IA contre l&apos;amnésie sur les sessions de plusieurs heures grâce à la décomposition par étapes, aux points de contrôle (HITL) et aux résumés d&apos;état instantanés.
        </p>
      </div>

      {/* 1. L'analogie du marathonien et des ravitaillements */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie du marathonien : Pourquoi courir d&apos;une seule traite mène au crash</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Un coureur de marathon ne sprinte pas les 42 kilomètres d&apos;une seule traite sans s&apos;arrêter. S&apos;il refuse de s&apos;hydrater aux postes de ravitaillement, ne consulte jamais son allure au kilomètre et fonce tête baissée, il s&apos;effondre au trentième kilomètre par épuisement ou se trompe d&apos;itinéraire.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Lorsqu&apos;on confie à un agent IA une mission lourde (comme refactoriser 5 composants ou migrer une API), lui demander de <em>&quot;tout faire d&apos;un coup&quot;</em> produit la même catastrophe : saturation de la fenêtre de contexte, oubli des consignes de sécurité initiales, actions chaotiques et hallucinations massives.
        </p>

        {/* 8 écueils majeurs */}
        <div className="grid gap-3 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">1. Amnésie contextuelle</span>
            <p className="text-slate-600">Oubli des interdictions de sécurité posées lors du tout premier message.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">2. Répétition stérile</span>
            <p className="text-slate-600">L&apos;agent réanalyse en boucle des fichiers qu&apos;il a déjà inspectés plus tôt.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">3. Dérive de mission</span>
            <p className="text-slate-600">Il se met à réécrire des modules annexes non demandés par zèle intempestif.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">4. Bypass de validation</span>
            <p className="text-slate-600">Il enchaîne des écritures sur le disque sans solliciter l&apos;accord humain.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">5. Désordre logique</span>
            <p className="text-slate-600">Il modifie le code avant d&apos;avoir validé l&apos;architecture de base.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">6. Absence de suivi</span>
            <p className="text-slate-600">Incapacité de résumer précisément ce qui est fait et ce qui reste à faire.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">7. Masquage d&apos;erreur</span>
            <p className="text-slate-600">Il poursuit son script à l&apos;aveugle malgré l&apos;échec d&apos;un build ou d&apos;un test.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">8. Tâche infinie</span>
            <p className="text-slate-600">Boucle d&apos;analyse perpétuelle incapable de prononcer l&apos;achèvement des travaux.</p>
          </div>
        </div>
      </section>

      {/* 2. Décomposition en sous-tâches & Checkpoints */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. La décomposition en 4 phases et points de contrôle obligatoires (Gates)</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour garder le contrôle absolu, chaque mission longue doit être découpée en 4 étapes séquentielles. Chaque étape possède un état binaire et un verrou de sécurité infranchissable :
        </p>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">PHASE 1</span>
              <div>
                <h4 className="font-bold text-slate-900">Cadrage &amp; Délimitation du Périmètre</h4>
                <p className="text-xs text-slate-500">Identifier l&apos;objectif exact, lister les fichiers concernés et poser les contraintes d&apos;intégrité.</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs shrink-0">Terminée</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">PHASE 2</span>
              <div>
                <h4 className="font-bold text-slate-900">Inspection &amp; Diagnostic en Lecture Seule</h4>
                <p className="text-xs text-slate-500">Examiner le code autorisé sans modifier un seul octet sur le disque.</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-xs shrink-0">Terminée</span>
          </div>

          <div className="p-3 bg-amber-50/50 border-2 border-amber-300 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">PHASE 3</span>
              <div>
                <h4 className="font-bold text-slate-950">Proposition de Diff &amp; Impact Technique</h4>
                <p className="text-xs text-slate-600">Formuler la modification en texte clair avec le diff Git anticipé et attendre la décision humaine.</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-amber-200 text-amber-900 text-xs shrink-0">Point de Contrôle (HITL)</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">PHASE 4</span>
              <div>
                <h4 className="font-bold text-slate-900">Application Supervisée &amp; Tests</h4>
                <p className="text-xs text-slate-500">Exécution de l&apos;édition sur le disque uniquement après accord explicite, suivie des tests.</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-600 text-xs shrink-0">En attente</span>
          </div>
        </div>
      </section>

      {/* 3. Le Snapshot d'état */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Le Snapshot d&apos;état : Sauvegarder la mémoire de vol</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour permettre d&apos;interrompre et de reprendre une session sans perte d&apos;informations, l&apos;agent doit générer un <strong>cliché d&apos;état instantané (State Snapshot)</strong> à chaque palier significatif :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-2 break-words min-w-0 max-w-full">
          <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
            # CLICHÉ D&apos;ÉTAT INTERMÉDIAIRE (STATE SNAPSHOT v1.2)
          </div>
          <p className="text-slate-300">1. MISSION INITIALE : Remplacer l&apos;appel fetch direct par un React Query hook dans UserProfile.tsx</p>
          <p className="text-slate-300">2. CONTRAINTES PERMANENTES : Mode lecture seule actif, zéro modification de .env, pas d&apos;accès à /api</p>
          <p className="text-slate-300">3. FAITS CONFIRMÉS : Le fichier components/UserProfile.tsx utilise useState et useEffect (lignes 8 à 22)</p>
          <p className="text-slate-300">4. DÉCISIONS ARBITRÉES : L&apos;utilisateur a validé l&apos;usage de useQuery avec une clé de cache [&apos;user&apos;, id]</p>
          <p className="text-slate-300">5. ÉTAPES ACCOMPLIES : Étape 1 (Cadrage), Étape 2 (Audit du composant existant)</p>
          <p className="text-amber-300">6. AUTORISATION EN ATTENTE : Approbation du diff présenté pour components/UserProfile.tsx</p>
          <p className="text-emerald-400">7. PROCHAINE ACTION UNIQUE : Attendre la réponse de l&apos;utilisateur avant d&apos;invoquer edit_file</p>
        </div>

        <Callout type="tip" title="La Definition of Done (DoD) en 5 critères d'arrêt">
          Une mission n&apos;est jamais déclarée terminée sur une impression floue. Elle est officiellement clôturée quand les 5 critères suivants sont satisfaits :
          <ol className="list-decimal pl-5 mt-2 space-y-1 text-xs">
            <li>Toutes les sous-tâches planifiées affichent le statut <strong>Terminée</strong>.</li>
            <li>Aucun fichier temporaire ou déchet n&apos;a été laissé sur le disque.</li>
            <li>Les commandes de vérification ou tests prévus ont retourné un code de succès (0).</li>
            <li>Un rapport de synthèse final structuré a été remis à l&apos;utilisateur.</li>
            <li>Aucun appel d&apos;outil ni action n&apos;est en attente dans la session.</li>
          </ol>
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Gestion des tâches longues</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial qu'un agent IA produise un résumé d'état intermédiaire (State Snapshot) lors d'une mission longue ?",
              options: [
                "Pour permettre de reprendre la session sans amnésie contextuelle ni perte des contraintes de sécurité en cas d'interruption",
                "Pour supprimer automatiquement le code source existant",
                "Pour forcer l'ordinateur à se mettre en veille",
                "Pour changer de modèle de langage toutes les dix minutes"
              ],
              correctIndex: 0,
              explanation: "Le cliché d'état fige les acquis, les décisions déjà arbitrées et les contraintes de sécurité, évitant à l'agent de recommencer au début ou d'oublier ses règles initiales."
            },
            {
              id: 2,
              question: "Que doit faire un agent lorsqu'une étape intermédiaire d'un plan complexe échoue (par exemple, une commande de compilation renvoie une erreur de type) ?",
              options: [
                "Masquer l'erreur et prétendre que tout s'est bien passé pour rassurer l'utilisateur",
                "Arrêter immédiatement les étapes en aval, documenter l'erreur factuelle et attendre l'arbitrage humain",
                "Supprimer le fichier tsconfig.json pour éliminer l'erreur",
                "Continuer à modifier d'autres fichiers au hasard"
              ],
              correctIndex: 1,
              explanation: "L'agent ne doit jamais progresser à l'aveugle après un échec : il fige l'exécution, signale l'anomalie exacte et sollicite les instructions de l'ingénieur."
            },
            {
              id: 3,
              question: "Quelle phase de la décomposition en 4 étapes constitue le verrou de sécurité absolu avant toute modification du système ?",
              options: [
                "La phase de félicitations",
                "La phase 3 : Présentation formelle du diff et de l'analyse d'impact pour validation humaine (HITL)",
                "La phase d'installation automatique de paquets npm",
                "La phase de fermeture de l'éditeur de code"
              ],
              correctIndex: 1,
              explanation: "La phase 3 constitue le point de contrôle non négociable : tant que l'humain n'a pas validé explicitement le diff proposé, aucun octet ne peut être modifié sur le disque."
            }
          ]}
        />
      </section>
    </div>
  );
};
