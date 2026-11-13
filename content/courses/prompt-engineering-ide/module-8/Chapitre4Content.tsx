'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 8 — Projet Final &amp; Système Multi-Agents</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Créer les quatre agents spécialisés
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Pourquoi une seule IA &quot;couteau suisse&quot; est victime de biais de confirmation, et comment configurer les personas étanches des 4 experts : Développeur, Sécurité, Testeur et Documentaliste.
        </p>
      </div>

      {/* 1. L'analogie du bloc opératoire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie du bloc opératoire : Pourquoi l&apos;agent &quot;couteau suisse&quot; est dangereux</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Dans une salle d&apos;opération chirurgicale, il n&apos;y a jamais un seul médecin qui fait tout. Vous avez le <strong>chirurgien</strong> qui incise, l&apos;<strong>anesthésiste</strong> qui surveille en permanence le rythme cardiaque et la respiration, l&apos;<strong>infirmier instrumentiste</strong> qui compte les compresses pour qu&apos;aucune ne soit oubliée dans le corps, et le <strong>radiologue</strong> qui fournit les images médicales fiables.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Si le chirurgien devait en même temps surveiller l&apos;anesthésie et compter les compresses, le patient risquerait sa vie à cause de la saturation cognitive du praticien.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          En ingénierie logicielle avec des agents IA, le piège est le même : si vous demandez au même agent de développer, d&apos;auditer sa propre sécurité et de tester son propre code, il est victime d&apos;un <strong>biais de complaisance massif</strong>. Il conçoit des tests sur mesure pour son propre code et ignore ses failles de sécurité par paresse cognitive.
        </p>
      </section>

      {/* 2. Les 4 mandats exclusifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. Les 4 mandats exclusifs et la séparation des pouvoirs</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 bg-white border border-blue-200 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 text-xs uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>1. Développeur Full-Stack</span>
            </div>
            <p className="text-slate-600">
              <strong>Mandat :</strong> Seul agent habilité à concevoir l&apos;architecture technique et à préparer des diffs unifiés pour React.js, Express et MySQL.
            </p>
            <p className="text-slate-500 text-xs font-mono">
              Restreint par le mode lecture seule par défaut jusqu&apos;à validation humaine du diff.
            </p>
          </div>

          <div className="p-5 bg-white border border-rose-200 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-900 text-xs uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>2. Auditeur Sécurité</span>
            </div>
            <p className="text-slate-600">
              <strong>Mandat :</strong> Détecter les vulnérabilités applicatives (SQLi, failles XSS, gestion des sessions, protection absolue du fichier <code>.env</code>).
            </p>
            <p className="text-slate-500 text-xs font-mono">
              Mode lecture seule permanent : il émet des alertes et préconisations mais ne code jamais.
            </p>
          </div>

          <div className="p-5 bg-white border border-amber-200 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>3. Ingénieur Testeur (QA)</span>
            </div>
            <p className="text-slate-600">
              <strong>Mandat :</strong> Élaborer les scénarios de test aux limites, vérifier le comportement du code et exiger des preuves matérielles d&apos;exécution.
            </p>
            <p className="text-slate-500 text-xs font-mono">
              Ne modifie aucun fichier pour &quot;forcer&quot; un test et distingue tests préparés de tests lancés.
            </p>
          </div>

          <div className="p-5 bg-white border border-emerald-200 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>4. Documentaliste Technique</span>
            </div>
            <p className="text-slate-600">
              <strong>Mandat :</strong> Rédiger les spécifications OpenAPI/Swagger et les guides d&apos;intégration à partir des éléments confirmés dans le code réel.
            </p>
            <p className="text-slate-500 text-xs font-mono">
              Interdiction absolue d&apos;inventer une route, un paramètre de requête ou un composant non prouvé.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Les Instructions Maîtresses des 4 Spécialistes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Canevas des instructions maîtresses pour chaque spécialiste</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Chaque agent reçoit son propre bloc de directives système dans Google Antigravity :
        </p>

        <div className="space-y-3">
          {/* Agent DEV */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
            <span className="text-blue-400 font-bold">// AGENT 1 : DÉVELOPPEUR FULL-STACK (REACT / NODE.JS)</span>
            <p className="text-slate-300">1. IDENTITÉ : Expert senior en développement React.js, Express et requêtes SQL relationnelles.</p>
            <p className="text-slate-300">2. MISSION : Réaliser les composants et routes confiés par le coordinateur sous forme de diffs unifiés.</p>
            <p className="text-rose-400 font-bold">3. GARDE-FOU D&apos;ÉCRITURE : Tu n&apos;appliques aucun changement directement sur le disque sans accord explicite de l&apos;humain.</p>
          </div>

          {/* Agent SEC */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
            <span className="text-rose-400 font-bold">// AGENT 2 : AUDITEUR CYBERSÉCURITÉ</span>
            <p className="text-slate-300">1. IDENTITÉ : Spécialiste cybersécurité Web &amp; API (OWASP Top 10, CWE).</p>
            <p className="text-slate-300">2. MISSION : Auditer le code proposé pour déceler injections SQL, failles XSS, CSRF et faiblesses d&apos;authentification.</p>
            <p className="text-rose-400 font-bold">3. RESTRICTION LECTURE SEULE : Tu ne modifies aucun fichier source et n&apos;exécutes aucune commande intrusive.</p>
          </div>

          {/* Agent TEST */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
            <span className="text-amber-400 font-bold">// AGENT 3 : INGÉNIEUR TESTEUR (QA)</span>
            <p className="text-slate-300">1. IDENTITÉ : Ingénieur qualité logiciel et tests d&apos;intégration API.</p>
            <p className="text-slate-300">2. MISSION : Concevoir la matrice de tests fonctionnels et de cas limites, puis auditer les retours d&apos;exécution.</p>
            <p className="text-rose-400 font-bold">3. VÉRACITÉ DES TESTS : Ne prétends JAMAIS qu&apos;un test a réussi sans preuve matérielle de sortie de terminal.</p>
          </div>

          {/* Agent DOC */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
            <span className="text-emerald-400 font-bold">// AGENT 4 : DOCUMENTALISTE TECHNIQUE</span>
            <p className="text-slate-300">1. IDENTITÉ : Rédacteur technique et concepteur de spécifications d&apos;API OpenAPI.</p>
            <p className="text-slate-300">2. MISSION : Rédiger la documentation des endpoints, des payloads JSON et des guides d&apos;installation.</p>
            <p className="text-rose-400 font-bold">3. STRICT ANCRAGE FACTUEL : Interdiction d&apos;inventer une route qui ne figure pas formellement dans le code validé.</p>
          </div>
        </div>

        <Callout type="tip" title="Séparation des responsabilités = Fiabilité décuplée">
          En confiant la vérification de sécurité et les tests à deux agents indépendants du développeur, vous éliminez 95% des angles morts et des régressions avant même la première mise en production.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Agents spécialisés</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il risqué de confier le développement, l'audit de sécurité et les tests à un seul et même agent IA ?",
              options: [
                "Parce qu'un agent unique souffre d'un biais de complaisance, conçoit des tests superficiels qui valident son propre code et minimise ses propres failles",
                "Parce qu'un agent unique coûte dix fois plus cher en bande passante",
                "Parce que le terminal Linux refuse d'exécuter un agent polyvalent",
                "Parce que React 19 interdit les agents généralistes"
              ],
              correctIndex: 0,
              explanation: "Tout comme un développeur humain a du mal à relire son propre code sans complaisance, une IA généraliste valide ses propres erreurs. La séparation des rôles garantit des contrôles croisés impartiaux."
            },
            {
              id: 2,
              question: "Quelle interdiction formelle s'applique à l'agent de documentation technique ?",
              options: [
                "Il lui est interdit de documenter les routes en français",
                "Il lui est formellement interdit d'inventer des endpoints ou des structures de requêtes qui ne figurent pas dans le code validé",
                "Il ne peut pas utiliser le format Markdown",
                "Il doit obligatoirement écrire ses textes en majuscules"
              ],
              correctIndex: 1,
              explanation: "Le documentaliste a une obligation stricte d'ancrage factuel : inventer des routes API inexistantes désinforme les développeurs et corrompt la documentation."
            },
            {
              id: 3,
              question: "Si l'agent testeur constate qu'un cas limite fait échouer l'application, que doit-il faire ?",
              options: [
                "Modifier en douce le fichier source pour faire passer son test",
                "Consigner l'échec avec la preuve matérielle de l'erreur et transmettre son compte-rendu au coordinateur",
                "Supprimer le scénario de test pour que le rapport soit tout vert",
                "Changer la version de MySQL"
              ],
              correctIndex: 1,
              explanation: "L'agent testeur n'a pas le droit d'écrire dans le code applicatif. Il documente le bug factuellement et laisse le coordinateur et le développeur apporter le correctif."
            }
          ]}
        />
      </section>
    </div>
  );
};
