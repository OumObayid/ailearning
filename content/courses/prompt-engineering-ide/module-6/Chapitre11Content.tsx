'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre11Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 11 — Journalisation, traçabilité et audit d&apos;agent (Audit Trail)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment enregistrer les actions et décisions de vos agents dans un format JSON structuré, prouver les faits et auditer les incidents sans jamais faire fuiter de secrets.
        </p>
      </div>

      {/* 1. L'analogie de la boîte noire et le logging vs audit trail */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-magnifying-glass" className="w-5 h-5 text-indigo-600" />
          <span>1. Simple logging bavard vs Piste d&apos;audit inviolable (Audit Trail)</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Afficher des phrases vagues dans la console comme <em>« [INFO] Code mis à jour avec succès »</em> ne constitue en aucun cas une traçabilité d&apos;entreprise. En cas de bug en production ou d&apos;audit de sécurité, vous devez être capable de reconstituer <strong>l&apos;intention exacte, le fichier cible, l&apos;accord humain préalable et le résultat d&apos;exécution</strong>.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de la boîte noire d&apos;un avion de ligne :</span>
          </div>
          <p>
            Un message de passager sur les réseaux sociaux disant <em>« Super vol, on arrive bientôt »</em> n&apos;est pas une trace technique. En revanche, la boîte noire étanche de l&apos;appareil enregistre chaque seconde : l&apos;altitude précise, la vitesse, la position de chaque volet, la voix des pilotes et les déclenchements d&apos;alarmes.
          </p>
          <p>
            Pour vos agents IA, la piste d&apos;audit (Audit Trail) joue ce rôle de boîte noire : elle consigne chaque action sous format JSON structuré et horodaté, rendant tout geste vérifiable et non répudiable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="font-bold text-slate-600 uppercase tracking-wider text-xs">Simple log bavard (Inutile en audit)</span>
            {/* Box without pre */}
            <div className="bg-slate-950 text-slate-300 p-3 rounded-lg font-mono text-xs leading-relaxed break-words space-y-0.5 min-w-0 max-w-full">
              <div>[INFO] Fichier modifié.</div>
              <div>[INFO] Tests passés.</div>
              <div>[INFO] Travail terminé.</div>
            </div>
            <p className="text-slate-500 text-xs">
              Impossible de prouver quel fichier a été touché, quelles lignes ont été supprimées, ni si l&apos;utilisateur a donné son accord.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-emerald-300 rounded-xl space-y-2 shadow-sm bg-emerald-50/20">
            <span className="font-bold text-emerald-800 uppercase tracking-wider text-xs">Piste d&apos;audit structurée (Conforme)</span>
            {/* Box without pre */}
            <div className="bg-slate-950 text-emerald-300 p-3 rounded-lg font-mono text-xs leading-relaxed break-words space-y-0.5 min-w-0 max-w-full">
              <div>&#123;</div>
              <div className="pl-4">&quot;action&quot;: &quot;FILE_EDIT&quot;,</div>
              <div className="pl-4">&quot;target&quot;: &quot;src/components/SearchBar.jsx&quot;,</div>
              <div className="pl-4">&quot;lines_changed&quot;: &#123; &quot;add&quot;: 6, &quot;del&quot;: 1 &#125;,</div>
              <div className="pl-4">&quot;human_approval&quot;: true,</div>
              <div className="pl-4">&quot;exit_status&quot;: &quot;SUCCESS&quot;</div>
              <div>&#125;</div>
            </div>
            <p className="text-emerald-950 text-xs font-semibold">
              Traçabilité médico-légale complète : horodatée, chiffrée, auditable par l&apos;équipe de sécurité.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Format JSON standardisé */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="code-bracket" className="w-5 h-5 text-indigo-600" />
          <span>2. Le schéma JSON officiel d&apos;un événement de sécurité</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Chaque appel d&apos;outil d&apos;agent doit générer un enregistrement structuré respectant ce format normé :
        </p>

        {/* JSON Card without pre */}
        <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
          <div className="text-slate-500">// Journalisation d&apos;une exécution d&apos;outil :</div>
          <div>&#123;</div>
          <div className="pl-4"><span className="text-purple-400">&quot;timestamp&quot;</span>: <span className="text-emerald-300">&quot;2026-11-11T14:32:10.450Z&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;agent_id&quot;</span>: <span className="text-emerald-300">&quot;testeur&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;tool_name&quot;</span>: <span className="text-emerald-300">&quot;run_command&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;parameters&quot;</span>: &#123;</div>
          <div className="pl-8"><span className="text-purple-400">&quot;command&quot;</span>: <span className="text-emerald-300">&quot;npm test -- tests/search.spec.js&quot;</span></div>
          <div className="pl-4">&#125;,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;security_context&quot;</span>: &#123;</div>
          <div className="pl-8"><span className="text-purple-400">&quot;privilege_level&quot;</span>: <span className="text-amber-400">&quot;LEVEL_4_SHELL&quot;</span>,</div>
          <div className="pl-8"><span className="text-purple-400">&quot;human_approval_obtained&quot;</span>: <span className="text-amber-400">true</span>,</div>
          <div className="pl-8"><span className="text-purple-400">&quot;secrets_scrubbed&quot;</span>: <span className="text-amber-400">true</span></div>
          <div className="pl-4">&#125;,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;result&quot;</span>: &#123;</div>
          <div className="pl-8"><span className="text-purple-400">&quot;exit_code&quot;</span>: <span className="text-amber-400">0</span>,</div>
          <div className="pl-8"><span className="text-purple-400">&quot;summary&quot;</span>: <span className="text-emerald-300">&quot;5 tests passés avec succès en 1.2s&quot;</span></div>
          <div className="pl-4">&#125;</div>
          <div>&#125;</div>
        </div>

        <Callout type="danger">
          <strong>Règle d&apos;assainissement des traces (Sanitization) :</strong> Un fichier de log d&apos;audit ne doit <strong>JAMAIS</strong> consigner de mot de passe, de jeton JWT ou de clé d&apos;API en clair. Tout secret détecté doit être immédiatement masqué sous la forme <code className="font-mono text-xs">&lt;REDACTED&gt;</code> avant l&apos;écriture sur disque, sous peine de transformer le journal de sécurité en vecteur de fuite de données !
        </Callout>
      </section>

      {/* 3. La traçabilité des refus de sécurité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-exclamation" className="w-5 h-5 text-indigo-600" />
          <span>3. La traçabilité des refus : la statistique de sécurité reine</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Les actions réussies prouvent que le travail avance, mais <strong>les actions bloquées prouvent que votre sécurité fonctionne</strong>. Tracer chaque refus d&apos;outil permet d&apos;intercepter les tentatives d&apos;injection et les dérives :
        </p>

        {/* Refusal Box without pre */}
        <div className="bg-slate-950 text-rose-300 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
          <div className="text-rose-400 font-bold">// Exemple de log de refus de sécurité :</div>
          <div>&#123;</div>
          <div className="pl-4"><span className="text-purple-400">&quot;timestamp&quot;</span>: <span className="text-white">&quot;2026-11-11T14:35:00.120Z&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;event_type&quot;</span>: <span className="text-rose-400 font-bold">&quot;SECURITY_REFUSAL&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;attempted_target&quot;</span>: <span className="text-white">&quot;.env.production&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;policy_enforced&quot;</span>: <span className="text-white">&quot;SANCTUARY_RULE_NO_ENV_ACCESS&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;agent_decision&quot;</span>: <span className="text-rose-400 font-bold">&quot;BLOCKED&quot;</span>,</div>
          <div className="pl-4"><span className="text-purple-400">&quot;user_notified&quot;</span>: <span className="text-white">true</span></div>
          <div>&#125;</div>
        </div>
      </section>

      {/* 4. Atelier guidé (TP 6.11) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-indigo-600" />
          <span>4. Atelier pratique (TP 6.11) : Audit médico-légal d&apos;une session</span>
        </h2>
        
        <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
          <p className="text-sm sm:text-base text-slate-800 font-medium">
            Examinez cet extrait de journalisation d&apos;un agent en action :
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <span className="text-slate-800 font-bold">14:02:15 - view_file(&quot;src/api/auth.js&quot;)</span>
              <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-[10px]">AUTORISÉ (NIVEAU 1)</span>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <span className="text-rose-900 font-bold">14:05:30 - run_command(&quot;cat .env&quot;)</span>
              <span className="px-2 py-0.5 rounded font-bold bg-rose-600 text-white text-[10px]">BLOQUÉ PAR POLITIQUE DE SÉCURITÉ</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <span className="text-amber-900 font-bold">14:05:32 - ALERTE : Tentative de lecture de secret signalée</span>
              <span className="px-2 py-0.5 rounded font-bold bg-amber-200 text-amber-900 text-[10px]">NOTIFICATION ÉMISE</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700">
            <strong>Conclusion de l&apos;audit :</strong> La tentative d&apos;accès au fichier secret a été interceptée et neutralisée en 2 millisecondes sans aucune fuite de données, et l&apos;utilisateur a été immédiatement prévenu.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Journalisation et traçabilité
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 11"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il interdit d'écrire en clair des clés d'API ou des mots de passe dans les fichiers de log d'audit ?",
              options: [
                "Parce que les logs d'audit sont stockés, archivés et souvent partagés lors des revues de code : y inscrire des secrets en clair transformerait le journal en vecteur de fuite massive de données.",
                "Parce que le format JSON refuse les lettres majuscules.",
                "Parce que les fichiers de log s'effacent toutes les 5 minutes.",
                "Parce que cela bloque le ventilateur de l'ordinateur."
              ],
              correctIndex: 0,
              explanation: "Le principe d'assainissement (Sanitization) impose de masquer les secrets sous la forme <REDACTED> pour que les logs restent partageables et sûrs."
            },
            {
              id: 2,
              question: "Quelle est l'information la plus précieuse à surveiller dans les logs d'un agent pour détecter une tentative d'attaque ou de détournement ?",
              options: [
                "Les événements de type SECURITY_REFUSAL (refus de sécurité), qui indiquent qu'une tentative d'accès non autorisé a été bloquée par les filtres.",
                "Le nombre de virgules utilisées par l'agent dans ses phrases.",
                "La couleur du fond de la fenêtre de chat.",
                "La météo de la ville où se trouve le serveur."
              ],
              correctIndex: 0,
              explanation: "Un pic de refus de sécurité est le signe avant-coureur d'une anomalie, d'une tentative d'injection indirecte ou d'un comportement d'agent déviant."
            },
            {
              id: 3,
              question: "Dans l'analogie de la boîte noire d'un avion, quelle est la différence avec un simple statut console comme 'Fichier mis à jour' ?",
              options: [
                "La boîte noire fournit une traçabilité structurée, horodatée, avec les paramètres d'appel, l'accord humain et le code retour vérifié, permettant une reconstitution fidèle des faits.",
                "Il n'y a aucune différence, ce sont deux expressions équivalentes.",
                "La boîte noire est peinte en orange fluo.",
                "La boîte noire fonctionne uniquement sous Linux."
              ],
              correctIndex: 0,
              explanation: "Une véritable piste d'audit (Audit Trail) permet de prouver objectivement qui a fait quoi, quand, sur quel fichier et avec quelle autorisation explicite."
            }
          ]}
        />
      </section>
    </div>
  );
};
