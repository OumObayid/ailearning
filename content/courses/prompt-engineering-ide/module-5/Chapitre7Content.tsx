'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 7 — Orchestration avancée : construire une équipe d&apos;agents
        </h1>
      </div>

      {/* 1. Rôle de l'orchestrateur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Le rôle central de l&apos;agent orchestrateur
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;orchestrateur (<em>Lead Orchestrator</em>) n&apos;est pas là pour écrire du code ou inspecter les logs : il agit comme un <strong>chef de projet technique rigoureux</strong> chargé d&apos;ordonnancer les missions, d&apos;arbitrer les divergences et de s&apos;assurer que chaque sous-agent respecte son mandat.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Responsabilité</th>
                <th className="p-3 border border-slate-200">Action opérationnelle de l&apos;orchestrateur</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold">1. Comprendre la demande</td>
                <td className="p-3 border border-slate-200">Clarifier les objectifs et identifier les contraintes implicites.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">2. Décomposer le travail</td>
                <td className="p-3 border border-slate-200">Scinder une demande monolithique en micro-tâches étanches et ordonnées.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">3. Router les tâches</td>
                <td className="p-3 border border-slate-200">Sélectionner l&apos;agent dont les compétences correspondent exactement au besoin.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">4. Transmettre le contexte</td>
                <td className="p-3 border border-slate-200">Rédiger la fiche de Handoff sans perte de spécifications critiques.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">5. Arbitrer les conflits</td>
                <td className="p-3 border border-slate-200">Mettre en balance les divergences entre sécurité et performance, puis solliciter l&apos;humain.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">6. Portes de validation (Gates)</td>
                <td className="p-3 border border-slate-200">Stopper l&apos;exécution tant que l&apos;utilisateur n&apos;a pas formellement validé une action sensible.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Portes de validation humaine */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les portes de validation humaine (Human Approval Gates)
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;autonomie des agents ne doit jamais être synonyme d&apos;abandon de contrôle. Certaines opérations exigent impérativement l&apos;aval humain :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase">Actions autonomes autorisées</span>
            <ul className="text-xs text-emerald-950 list-disc pl-4 space-y-1">
              <li>Lecture des fichiers dans le workspace.</li>
              <li>Recherche de symboles dans l&apos;arborescence.</li>
              <li>Rédaction de rapports d&apos;analyse et de plans de travail.</li>
              <li>Élaboration de propositions de code dans la conversation.</li>
            </ul>
          </div>

          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-rose-800 uppercase">Approbation humaine obligatoire</span>
            <ul className="text-xs text-rose-950 list-disc pl-4 space-y-1">
              <li>Toute modification physique ou création de fichier source.</li>
              <li>Toute exécution de commande dans le terminal shell.</li>
              <li>Toute installation de dépendance dans package.json.</li>
              <li>Toute suppression ou déplacement de ressource.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Instructions principales de l'orchestrateur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Instructions principales de l&apos;Agent Orchestrateur
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-normal">
          <pre>{`[ROLE_ET_IDENTITE]
Tu es l'agent orchestrateur d'une équipe de développement logiciel.
Tu supervises : Architecte, Développeur, Auditeur, Sécurité, Testeur et Documentaliste.

[MISSION_DE_COORDINATION]
1. DÉCOMPOSITION : Transforme chaque demande complexe en sous-tâches étanches.
2. ROUTAGE : Assigne chaque tâche au bon spécialiste (ne demande jamais à l'auditeur d'écrire du code).
3. HANDOFF : Transmets les spécifications validées sans ambiguïté.
4. VALIDATION : Arrête systématiquement l'exécution avant toute modification de fichier pour requérir l'accord humain.
5. CONFLITS : Si l'auditeur et la sécurité divergent, expose leurs arguments et demande l'arbitrage de l'utilisateur.

[REGLE_D_OR]
Tu coordonnes les compétences, tu ne te substitues jamais aux autres profils.
La sécurité et le contrôle humain priment toujours sur la rapidité d'exécution.`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Orchestration d&apos;équipe
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 7"
          questions={[
            {
              id: 1,
              question: "Quel est le comportement réglementaire de l'orchestrateur face à deux conclusions contradictoires émises par l'auditeur et l'agent sécurité ?",
              options: [
                "Choisir arbitrairement la réponse la plus courte.",
                "Présenter les deux argumentaires à l'utilisateur, mettre en lumière les enjeux techniques et solliciter son arbitrage avant de poursuivre.",
                "Supprimer les deux agents de l'équipe.",
                "Fermer le terminal."
              ],
              correctIndex: 1,
              explanation: "L'orchestrateur n'a pas à trancher de son propre chef sur des compromis d'architecture ou de sécurité : il éclaire le choix de l'humain."
            },
            {
              id: 2,
              question: "Pourquoi est-il obligatoire de placer une 'Human Approval Gate' avant la phase d'édition du développeur ?",
              options: [
                "Pour permettre à l'utilisateur de valider le plan d'action et les fichiers concernés avant qu'une écriture réelle ne modifie le workspace.",
                "Parce que les modèles d'IA dorment la nuit.",
                "Pour forcer le redémarrage de Windows.",
                "Pour désactiver Git."
              ],
              correctIndex: 0,
              explanation: "La validation humaine préalable est la garantie ultime contre les destructions accidentelles ou les modifications hors périmètre."
            }
          ]}
        />
      </section>
    </div>
  );
};

