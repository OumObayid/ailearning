'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 5</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 7 — Orchestration avancée : construire une équipe d&apos;agents
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment concevoir un agent Orchestrateur (Lead Agent), router intelligemment les tâches et intégrer des portes d&apos;approbation humaine obligatoires.
        </p>
      </div>

      {/* 1. L'analogie de la tour de contrôle et le rôle de l'orchestrateur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="user-group" className="w-5 h-5 text-indigo-600" />
          <span>1. Le rôle central de l&apos;agent Orchestrateur</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;orchestrateur (<em>Lead Orchestrator</em>) n&apos;est pas là pour coder des composants React ou déchiffrer des dumps mémoire. Il n&apos;exécute aucune tâche opérationnelle directe.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de la tour de contrôle aérienne :</span>
          </div>
          <p>
            Le contrôleur aérien ne pilote aucun avion, ne fait pas le plein de kérosène et ne charge pas les bagages. En revanche, il a la vision globale du ciel : il décide quel avion décolle, quel appareil atterrit, quelle piste reste dégagée et ordonne un demi-tour d&apos;urgence en cas d&apos;orage.
          </p>
          <p>
            Votre agent Orchestrateur joue exactement ce rôle : il écoute la consigne de l&apos;utilisateur, la décompose en étapes étanches, convoque le bon spécialiste au bon moment et veille à ce que personne n&apos;entre en collision.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-3">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Responsabilité cardinale</th>
                <th className="p-3.5 border-b border-slate-200 text-indigo-900">Action opérationnelle de l&apos;Orchestrateur</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold">1. Analyse &amp; Cadrage</td>
                <td className="p-3.5">Reformuler la demande utilisateur pour en dégager les objectifs mesurables et les contraintes implicites.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">2. Découpage en sous-tâches</td>
                <td className="p-3.5">Transformer un chantier complexe en une suite d&apos;étapes étanches ordonnées logiquement.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">3. Routage intelligent</td>
                <td className="p-3.5">Sélectionner le sous-agent dont la compétence déclarée correspond précisément au besoin de l&apos;étape.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">4. Rédaction du Handoff</td>
                <td className="p-3.5">Rédiger la fiche de transmission officielle sans bruit parasite ni déperdition de consigne.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">5. Arbitrage des divergences</td>
                <td className="p-3.5">Mettre en perspective les avis contradictoires (ex: Sécurité vs Simplicité) et préparer la décision pour l&apos;humain.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-rose-700">6. Gestion des portes de validation (Gates)</td>
                <td className="p-3.5 font-semibold text-rose-800">Stopper net l&apos;exécution tant que l&apos;utilisateur n&apos;a pas formellement donné son accord sur une action sensible.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {[
            { num: "1", title: "Analyse & Cadrage", desc: "Clarifier les objectifs et contraintes de l'utilisateur." },
            { num: "2", title: "Découpage", desc: "Scinder la demande en étapes logiques et étanches." },
            { num: "3", title: "Routage", desc: "Assigner chaque sous-tâche au spécialiste compétent." },
            { num: "4", title: "Handoff", desc: "Transmettre les spécifications épurées sans ambiguïté." },
            { num: "5", title: "Arbitrage", desc: "Éclairer les divergences techniques pour l'humain." },
            { num: "6", title: "Portes de validation", desc: "Stopper l'exécution avant tout acte d'écriture sans accord.", danger: true },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 bg-white border ${item.danger ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'} rounded-xl space-y-1.5 shadow-sm text-xs`}>
              <div className="font-bold text-slate-950 text-sm">{item.num}. {item.title}</div>
              <p className="text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Les Portes de validation humaine (Human Approval Gates) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-indigo-600" />
          <span>2. Les portes de validation humaine (Human Approval Gates)</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Déléguer à des agents IA ne signifie jamais perdre le contrôle de son projet. L&apos;architecture d&apos;équipe repose sur une frontière stricte entre les actions autonomes et les actions sous verrouillage humain :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Actions autonomes autorisées
            </div>
            <p className="text-xs text-emerald-950">
              Ces actions ne modifient pas l&apos;état persistant du disque dur et peuvent s&apos;exécuter sans interruption :
            </p>
            <ul className="text-xs text-emerald-900 list-disc pl-4 space-y-1">
              <li>Lecture et inspection des fichiers du workspace (<code className="font-mono">view_file</code>).</li>
              <li>Recherche de symboles ou textes dans le code (<code className="font-mono">grep_search</code>).</li>
              <li>Élaboration de propositions d&apos;architecture en Markdown.</li>
              <li>Rédaction de rapports d&apos;audit qualité et sécurité.</li>
            </ul>
          </div>

          <div className="p-5 bg-rose-50/70 border-2 border-rose-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              Approbation humaine obligatoire (Gates)
            </div>
            <p className="text-xs text-rose-950">
              Ces actions modifient le projet et <strong>exigent impérativement l&apos;aval formel de l&apos;utilisateur</strong> avant exécution :
            </p>
            <ul className="text-xs text-rose-900 list-disc pl-4 space-y-1">
              <li>Toute création ou modification physique de fichier source.</li>
              <li>Toute installation de dépendance dans <code className="font-mono">package.json</code>.</li>
              <li>Toute exécution de commande shell dans le terminal.</li>
              <li>Toute suppression ou renommage de ressource existante.</li>
            </ul>
          </div>
        </div>

        <Callout type="warning">
          <strong>Le principe du Stop &amp; Ask :</strong> Si l&apos;agent orchestrateur s&apos;apprête à faire démarrer l&apos;étape de codage par le développeur, il DOIT d&apos;abord présenter le plan d&apos;intervention à l&apos;utilisateur et poser la question : <em>« Validez-vous ce plan d&apos;action pour que l&apos;agent Développeur applique ces modifications ? »</em>.
        </Callout>
      </section>

      {/* 3. Instructions complètes de l'agent Orchestrateur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>3. Fiche d&apos;instructions système de l&apos;agent Orchestrateur</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-800">
          Voici le prompt de gouvernance à injecter comme instructions système du profil Lead Orchestrator :
        </p>

        {/* Orchestrator Prompt Box without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === INSTRUCTIONS SYSTÈME : LEAD ORCHESTRATEUR D&apos;ÉQUIPE ===
          </div>
          <div className="text-indigo-300 font-bold">[1. IDENTITÉ ET MANDAT]</div>
          <div className="text-slate-200">
            Tu es l&apos;agent orchestrateur technique en chef d&apos;une équipe de six spécialistes : Architecte, Développeur, Auditeur Qualité, Sécurité (AppSec), Testeur (QA) et Documentaliste.
          </div>

          <div className="text-indigo-300 font-bold pt-1">[2. MISSION FONDAMENTALE]</div>
          <div className="text-slate-200">
            Ordonnancer et superviser la réalisation des demandes utilisateur en garantissant une étanchéité parfaite des rôles, une qualité irréprochable et le contrôle permanent de l&apos;humain.
          </div>

          <div className="text-amber-300 font-bold pt-1">[3. PROTOCOLE D&apos;EXÉCUTION OBLIGATOIRE]</div>
          <div className="pl-4 text-slate-200">
            1. DÉCOUPE chaque demande en sous-tâches étanches avec critères d&apos;acceptation.<br />
            2. ROUTE chaque tâche vers l&apos;unique sous-agent compétent.<br />
            3. SOUMETS systématiquement le plan d&apos;implémentation à l&apos;approbation de l&apos;utilisateur avant d&apos;autoriser la moindre écriture physique de code.<br />
            4. ARBITRE les divergences entre auditeur et sécurité en exposant les compromis à l&apos;utilisateur.<br />
            5. EXIGE des preuves factuelles de test avant de déclarer une mission terminée.
          </div>

          <div className="text-rose-400 font-bold pt-1">[4. INTERDITS FORMELS]</div>
          <div className="pl-4 text-slate-200">
            • Tu ne développes JAMAIS de code toi-même.<br />
            • Tu ne modifies AUCUN fichier physique.<br />
            • Tu ne bypasses JAMAIS une porte de validation humaine.
          </div>
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
              question: "Quelle est la conduite réglementaire de l'orchestrateur en cas de divergence technique entre l'auditeur qualité et l'agent sécurité ?",
              options: [
                "Présenter les deux points de vue avec leurs arguments chiffrés à l'utilisateur humain et solliciter son arbitrage avant d'agir.",
                "Choisir arbitrairement la solution qui demande le moins de code.",
                "Supprimer les deux agents de la session pour clore le débat.",
                "Laisser les deux sous-agents se battre dans le terminal."
              ],
              correctIndex: 0,
              explanation: "L'orchestrateur éclaire la décision mais ne s'approprie pas les choix structurants : c'est à l'humain de trancher les compromis entre sécurité et vélocité."
            },
            {
              id: 2,
              question: "Pourquoi est-il obligatoire de placer une 'Human Approval Gate' avant la phase d'édition par le Développeur ?",
              options: [
                "Pour permettre à l'utilisateur de vérifier le plan et les fichiers ciblés avant qu'une écriture réelle ne modifie l'arborescence du projet.",
                "Parce que les serveurs d'IA s'éteignent à 18h.",
                "Pour forcer l'utilisateur à installer un antivirus payant.",
                "Pour recompiler le noyau de l'ordinateur."
              ],
              correctIndex: 0,
              explanation: "La porte d'approbation humaine est le garde-fou ultime contre les modifications destructives, les suppressions imprévues et le code hors périmètre."
            },
            {
              id: 3,
              question: "Quel rôle correspond le mieux à l'agent Orchestrateur dans une analogie du monde réel ?",
              options: [
                "Le contrôleur aérien dans sa tour de contrôle, qui gère les flux et l'ordre des vols sans piloter lui-même les avions.",
                "Le bagagiste qui charge les valises.",
                "Le steward qui distribue les boissons.",
                "L'avion lui-même."
              ],
              correctIndex: 0,
              explanation: "L'orchestrateur supervise la circulation des flux de travail, la sécurité globale et l'ordonnancement sans exécuter lui-même les tâches techniques manuelles."
            }
          ]}
        />
      </section>
    </div>
  );
};
