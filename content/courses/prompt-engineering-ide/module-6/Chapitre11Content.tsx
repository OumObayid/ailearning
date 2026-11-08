'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre11Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — Journalisation, traçabilité et audit d&apos;agent
        </h1>
      </div>

      {/* 1. Distinction Logging vs Traçabilité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Logging opérationnel vs Traçabilité d&apos;agent (Audit Trail)
        </h2>
        <p className="text-slate-700">
          Le simple affichage de messages de progression dans la console ne constitue pas une trace d&apos;audit. Une piste d&apos;audit sécurisée doit permettre de reconstituer <strong>l&apos;intention, la décision, l&apos;autorisation obtenue et le résultat vérifié</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="font-bold text-slate-600 uppercase tracking-wider text-xs">Simple Logging (Insuffisant)</span>
            <div className="bg-slate-900 text-slate-300 p-3 rounded-lg font-mono text-xs">
              [INFO] File updated.<br />
              [INFO] Tests passing.<br />
              [INFO] Done.
            </div>
            <p className="text-slate-500 text-xs">Impossible de savoir quel fichier exact a été touché, quelle règle a été vérifiée, ni qui a validé.</p>
          </div>

          <div className="p-4 bg-white border border-emerald-300 rounded-xl space-y-2 shadow-sm bg-emerald-50/20">
            <span className="font-bold text-emerald-800 uppercase tracking-wider text-xs">Piste d&apos;audit structurée (Conforme)</span>
            <div className="bg-slate-900 text-emerald-300 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              &#123;<br />
              &nbsp;&nbsp;&quot;action&quot;: &quot;FILE_WRITE&quot;,<br />
              &nbsp;&nbsp;&quot;target&quot;: &quot;src/utils/math.ts&quot;,<br />
              &nbsp;&nbsp;&quot;lines_changed&quot;: &#123; &quot;add&quot;: 14, &quot;del&quot;: 2 &#125;,<br />
              &nbsp;&nbsp;&quot;human_approval&quot;: true,<br />
              &nbsp;&nbsp;&quot;status&quot;: &quot;SUCCESS&quot;<br />
              &#125;
            </div>
            <p className="text-emerald-900 text-xs">Traçabilité complète, horodatée, vérifiable lors des revues de code et audits SSI.</p>
          </div>
        </div>
      </section>

      {/* 2. Format JSON structuré d'événement d'agent */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Schéma standard d&apos;un log d&apos;action sécurisé
        </h2>
        <p className="text-slate-700">
          Chaque outil appelé ou décision majeure doit générer un enregistrement structuré respectant ce modèle :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
          <span className="text-slate-500">{'// Schema standard d\'événement d\'agent'}</span>
          <pre>{`{
  "timestamp": "2026-11-05T14:32:10.450Z",
  "session_id": "sess-antigravity-8842",
  "agent_role": "Backend-Engineer",
  "event_type": "TOOL_EXECUTION",
  "tool_name": "run_command",
  "tool_input": {
    "command": "npm test -- tests/auth.spec.ts"
  },
  "security_assessment": {
    "permission_level": "LEVEL_2_SAFE_DEV",
    "required_human_consent": false,
    "pii_or_secret_detected": false
  },
  "execution_result": {
    "exit_code": 0,
    "summary": "5 tests passed in 1.4s"
  }
}`}</pre>
        </div>

        <Callout type="danger" title="Règle d'or : Assainissement des traces (Sanitization)">
          Un fichier de log ne doit JAMAIS contenir de données secrètes en clair. Tout token, clé privée ou mot de passe doit être masqué (ex: <code>sk-ant-***</code>) avant écriture dans les logs, sous peine de transformer le journal d&apos;audit en vecteur de fuite de données !
        </Callout>
      </section>

      {/* 3. Traçabilité des refus de sécurité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Enregistrement des refus et anomalies de sécurité
        </h2>
        <p className="text-slate-700">
          Les actions refusées sont les informations les plus précieuses d&apos;un audit : elles permettent d&apos;identifier une tentative d&apos;injection ou un comportement aberrant avant qu&apos;un incident ne survienne.
        </p>

        <div className="bg-slate-900 text-rose-300 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
          <pre>{`{
  "timestamp": "2026-11-05T14:35:00.120Z",
  "event_type": "SECURITY_REFUSAL",
  "policy_violation": "UNAUTHORIZED_FILE_ACCESS",
  "trigger_source": "npm_package_readme_comment",
  "attempted_target": ".env.production",
  "rule_enforced": "ENV_FILE_RESTRICTION_RULE_5",
  "agent_decision": "BLOCKED",
  "alert_sent_to_user": true,
  "incident_level": "CRITICAL"
}`}</pre>
        </div>
      </section>

      {/* 4. TP Pratique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. TP : Audit forensique d&apos;une session d&apos;agent
        </h2>
        <p className="text-slate-700 text-sm">
          Vous analysez le journal d&apos;une session de 30 minutes au cours de laquelle un agent a effectué 12 actions. Voici l&apos;extrait de l&apos;incident :
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-mono font-bold text-slate-700">14:02:15 - TOOL_CALL: read_file(&quot;src/api/auth.ts&quot;)</span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">AUTORISÉ</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-mono font-bold text-slate-700">14:05:30 - TOOL_CALL: run_command(&quot;cat .env&quot;)</span>
            <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">BLOQUÉ PAR POLICY</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-slate-700">14:05:32 - SECURITY_ALERT: Tentative d&apos;accès secret signalée à l&apos;humain</span>
            <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">ALERTE ÉMISE</span>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs space-y-1">
          <span className="font-bold text-emerald-950">Conclusion de l&apos;audit :</span>
          <p className="text-emerald-900">
            Le système de gouvernance a parfaitement fonctionné : la commande d&apos;affichage de secrets a été interceptée et refusée net par la politique de sécurité, la trace a été conservée sans révéler de données sensibles, et le développeur a été averti en temps réel.
          </p>
        </div>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Journalisation &amp; Traçabilité
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial de journaliser également les actions qui ont été refusées par les règles de sécurité ?",
              options: [
                "Pour surcharger le disque dur",
                "Pour identifier les attaques de prompt injection et auditer les comportements anormaux",
                "Pour réinitialiser le système d'exploitation",
                "Pour annuler la licence du logiciel"
              ],
              correctIndex: 1,
              explanation: "Les refus de sécurité permettent de détecter les tentatives de détournement ou les fichiers malveillants avant qu'ils ne réussissent une compromission."
            },
            {
              id: 2,
              question: "Quelle précaution absolue doit être prise lors de la journalisation des paramètres d'outils ?",
              options: [
                "Masquer ou expurger tout secret, clé d'API ou token pour éviter la fuite dans les journaux",
                "Traduire tous les messages en latin",
                "Supprimer tous les fichiers après chaque écriture de log",
                "Désactiver la vérification des types"
              ],
              correctIndex: 0,
              explanation: "Un log contenant des secrets en clair annule tous les efforts de sécurité en offrant un vecteur direct d'exfiltration aux attaquants."
            }
          ]}
        />
      </section>
    </div>
  );
};
