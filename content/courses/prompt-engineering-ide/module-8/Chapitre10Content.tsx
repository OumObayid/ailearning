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
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>MODULE 8 — PROJET FINAL &amp; SYSTÈME MULTI-AGENTS</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 10 — Démonstration complète dans Google Antigravity &amp; Clôture
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Orchestrez l&apos;escouade en conditions réelles, traversez les 7 jalons d&apos;une fonctionnalité de bout en bout et obtenez votre procès-verbal d&apos;homologation finale.
        </p>
      </div>

      {/* 1. Analogie — La soutenance d'ingénieur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Analogie — La soutenance de projet d&apos;ingénieur
        </h2>
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-slate-800 space-y-3">
          <p className="font-bold text-amber-900">🎓 Dans le monde réel :</p>
          <p>
            Lors d&apos;une soutenance de fin d&apos;études, le candidat (l&apos;escouade d&apos;agents) présente une démonstration
            live de son projet devant un jury (le développeur humain). Il défend chaque choix technique,
            répond aux questions, puis remet le dossier complet. Le jury délibère et — si tout est
            conforme — délivre le <strong>diplôme</strong> : ici, le <em>procès-verbal d&apos;homologation</em>.
          </p>
          <p className="font-bold text-amber-900">⚙️ Dans notre système PlanIQ :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>L&apos;<strong>escouade</strong> (Coordinateur + Développeur + Sécurité + Testeur + Documentaliste) joue le rôle du candidat.</li>
            <li>Le <strong>développeur humain</strong> est le jury souverain : seul habilité à valider et à signer.</li>
            <li>La <strong>grille d&apos;homologation 100 points</strong> est la grille de notation officielle.</li>
            <li>Un score ≥ 90 pts avec zéro incident = le diplôme de Production est décerné.</li>
          </ul>
        </div>
      </section>

      {/* 2. Déploiement de l'environnement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Déploiement de l&apos;escouade dans Google Antigravity
        </h2>
        <p className="text-slate-700 text-sm">
          Pour lancer le projet de synthèse dans Google Antigravity, l&apos;ingénieur prompt prépare
          l&apos;environnement en trois étapes préparatoires incontournables :
        </p>

        <div className="grid gap-4 text-xs sm:text-sm grid-cols-1 sm:grid-cols-2">
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="inline-block font-bold text-purple-800 text-xs uppercase tracking-wide">
              Étape A — Confinement du Workspace
            </span>
            <p className="text-slate-600">
              Ouvrir exclusivement le répertoire racine du projet React/Node.js.
              Aucun dossier parent n&apos;est accessible. Le périmètre est verrouillé dès le départ.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="inline-block font-bold text-purple-800 text-xs uppercase tracking-wide">
              Étape B — Chargement des Personas
            </span>
            <p className="text-slate-600">
              Injecter les instructions principales du Coordinateur, Développeur, Sécurité, Testeur et
              Documentaliste. Chaque agent connaît son périmètre et ses interdictions.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
            <span className="inline-block font-bold text-purple-800 text-xs uppercase tracking-wide">
              Étape C — Verrouillage PoLP
            </span>
            <p className="text-slate-600">
              Activer le mode lecture seule par défaut. Exiger les diffs unifiés et la validation HITL
              avant chaque écriture. Les secrets (.env) sont sanctuarisés.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
          <p className="text-purple-400 font-bold border-b border-slate-800 pb-1"># CHECKLIST DÉPLOIEMENT ESCOUADE — GOOGLE ANTIGRAVITY</p>
          <p className="text-slate-400">─────────────────────────────────────────────────────</p>
          <p><span className="text-emerald-400">[A]</span> Workspace ouvert : /projets/planiq (répertoire racine uniquement)</p>
          <p><span className="text-emerald-400">[B]</span> Personas chargés : Coordinateur + DEV + SEC + TEST + DOC</p>
          <p><span className="text-emerald-400">[C]</span> Mode PoLP actif : lecture seule par défaut | diffs unifiés obligatoires</p>
          <p><span className="text-yellow-400">[⚠]</span> .env sanctuarisé : aucun agent ne lit ni ne transmet les secrets</p>
          <p><span className="text-purple-300 font-bold">→ PRÊT POUR LA DÉMONSTRATION</span></p>
        </div>
      </section>

      {/* 3. Les 7 jalons */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 7 jalons d&apos;exécution d&apos;une fonctionnalité de bout en bout
        </h2>
        <p className="text-slate-700 text-sm">
          Voici la séquence opérationnelle chronologique suivie par l&apos;escouade pour développer
          la création d&apos;un projet avec persistance MySQL :
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded shrink-0">JALON 1</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Cadrage par le coordinateur</h4>
              <p className="text-xs text-slate-600">
                Le coordinateur décompose la demande en 4 ordres de mission :
                DEV-FINAL-001, SEC-FINAL-001, TEST-FINAL-001 et DOC-FINAL-001.
                Chaque ordre est daté et horodaté.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded shrink-0">JALON 2</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Propositions techniques préalables</h4>
              <p className="text-xs text-slate-600">
                Le développeur conçoit la route Express et le formulaire React ; la sécurité
                relève les exigences anti-SQLi et le testeur prépare la matrice de cas.
                Tout reste à l&apos;état de proposition — rien n&apos;est encore écrit sur le disque.
              </p>
            </div>
          </div>

          <div className="p-4 border-2 border-purple-300 rounded-xl flex items-start gap-3 bg-purple-50/40">
            <span className="font-mono font-bold text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded shrink-0">JALON 3</span>
            <div>
              <h4 className="font-bold text-purple-950 text-sm">⏸ Arrêt souverain et validation humaine (HITL)</h4>
              <p className="text-xs text-slate-700">
                L&apos;escouade suspend toutes ses actions. Le développeur humain étudie le diff
                unifié produit par le développeur et valide formellement l&apos;écriture sur le disque.
                Sans cette approbation explicite, aucun agent ne peut modifier un fichier.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded shrink-0">JALON 4</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Développement unitaire autorisé</h4>
              <p className="text-xs text-slate-600">
                Le développeur est le SEUL agent à appliquer la modification de code sur les
                fichiers autorisés. Il livre un diff précis et ne touche pas aux fichiers hors périmètre.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded shrink-0">JALON 5</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Recette, vérification et preuves matérielles</h4>
              <p className="text-xs text-slate-600">
                Le testeur exécute les commandes autorisées et consigne les preuves matérielles :
                codes retours HTTP 201, données MySQL enregistrées. Aucune déclaration textuelle
                non étayée n&apos;est acceptée.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded shrink-0">JALON 6</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Documentation OpenAPI confirmée</h4>
              <p className="text-xs text-slate-600">
                Le documentaliste consigne la spécification technique officielle à partir des résultats
                réels validés. Aucune route n&apos;est inventée ou supposée.
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded shrink-0">JALON 7</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Rapport final de clôture</h4>
              <p className="text-xs text-slate-600">
                Le coordinateur consolide les comptes-rendus des 4 spécialistes, confirme l&apos;absence
                de secret divulgué et soumet la livraison complète au développeur humain pour homologation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tableau récapitulatif des 8 modules */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Tableau récapitulatif des compétences — Les 8 modules du cursus
        </h2>
        <p className="text-slate-700 text-sm">
          Ce tableau consolide le parcours complet : chaque module a forgé une compétence opérationnelle précise.
        </p>

        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Module</th>
                <th className="p-3">Thème principal</th>
                <th className="p-3">Compétence acquise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 1</td>
                <td className="p-3 font-semibold">Tokens &amp; Fenêtre de contexte</td>
                <td className="p-3">Comprendre et piloter la mémoire de travail des modèles LLM.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 2</td>
                <td className="p-3 font-semibold">Architecture des instructions</td>
                <td className="p-3">Rédiger des instructions principales structurées en 12 dimensions.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 3</td>
                <td className="p-3 font-semibold">Techniques de prompting avancé</td>
                <td className="p-3">Appliquer CoT, few-shot et chain-of-thought pour des réponses précises.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 4</td>
                <td className="p-3 font-semibold">Spécialisation des agents IDE</td>
                <td className="p-3">Configurer les personas Développeur, Sécurité, Testeur et Documentaliste.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 5</td>
                <td className="p-3 font-semibold">Orchestration multi-agents</td>
                <td className="p-3">Concevoir la délégation, les ordres de mission et les flux de handoff.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 6</td>
                <td className="p-3 font-semibold">Gouvernance &amp; Sécurité</td>
                <td className="p-3">Implémenter le PoLP, le HITL et la sanctuarisation des secrets.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 7</td>
                <td className="p-3 font-semibold">Système multi-agents complet</td>
                <td className="p-3">Assembler une escouade de 5 agents et piloter un cycle de développement réel.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-700">Module 8</td>
                <td className="p-3 font-semibold">Projet final — PlanIQ</td>
                <td className="p-3">Démontrer la maîtrise complète en conditions réelles et obtenir l&apos;homologation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile — cartes empilées */}
        <div className="sm:hidden space-y-3">
          {[
            { mod: 'Module 1', theme: 'Tokens & Fenêtre de contexte', comp: 'Comprendre et piloter la mémoire de travail des modèles LLM.' },
            { mod: 'Module 2', theme: 'Architecture des instructions', comp: 'Rédiger des instructions principales structurées en 12 dimensions.' },
            { mod: 'Module 3', theme: 'Techniques de prompting avancé', comp: 'Appliquer CoT, few-shot et chain-of-thought pour des réponses précises.' },
            { mod: 'Module 4', theme: 'Spécialisation des agents IDE', comp: 'Configurer les personas Développeur, Sécurité, Testeur et Documentaliste.' },
            { mod: 'Module 5', theme: 'Orchestration multi-agents', comp: 'Concevoir la délégation, les ordres de mission et les flux de handoff.' },
            { mod: 'Module 6', theme: 'Gouvernance & Sécurité', comp: 'Implémenter le PoLP, le HITL et la sanctuarisation des secrets.' },
            { mod: 'Module 7', theme: 'Système multi-agents complet', comp: 'Assembler une escouade de 5 agents et piloter un cycle de développement réel.' },
            { mod: 'Module 8', theme: 'Projet final — PlanIQ', comp: "Démontrer la maîtrise complète en conditions réelles et obtenir l'homologation." },
          ].map((row) => (
            <div key={row.mod} className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1 text-xs">
              <span className="font-mono font-bold text-purple-700">{row.mod}</span>
              <p className="font-semibold text-slate-900">{row.theme}</p>
              <p className="text-slate-600">{row.comp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Grille d'homologation 100 points — responsive */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Grille d&apos;homologation finale du système (Score sur 100)
        </h2>

        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Domaine audité</th>
                <th className="p-3">Pondération</th>
                <th className="p-3">Critère d&apos;attribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">Architecture &amp; Organisation multi-agents</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Séparation des rôles, clarté hiérarchique</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Qualité des Instructions principales</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Exhaustivité des 12 dimensions sans redondance</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Pilotage du coordinateur &amp; Délégation</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Véracité des délégations, pas de mission fictive</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Performance du Développeur</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Code React/Express propre, diffs précis</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Audit de l&apos;Agent Sécurité</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Détection des injections, respect lecture seule</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Rigueur de l&apos;Agent Testeur</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Preuves matérielles, distinction préparé/exécuté</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Fidélité de l&apos;Agent Documentaliste</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Zéro route inventée, OpenAPI exact</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Sécurité, Confinement &amp; PoLP</td>
                <td className="p-3 font-mono font-bold text-purple-700">15 pts</td>
                <td className="p-3">Sanctuarisation de .env, pas de sortie de périmètre</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Validation Humaine (HITL)</td>
                <td className="p-3 font-mono font-bold text-purple-700">10 pts</td>
                <td className="p-3">Respect absolu des arrêts avant écriture</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Rapport final &amp; Traçabilité</td>
                <td className="p-3 font-mono font-bold text-purple-700">5 pts</td>
                <td className="p-3">Clarté de la synthèse d&apos;achèvement</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile — cartes compactes */}
        <div className="sm:hidden space-y-3">
          {[
            { dom: 'Architecture & Organisation multi-agents', pts: '10 pts', crit: 'Séparation des rôles, clarté hiérarchique' },
            { dom: 'Qualité des Instructions principales', pts: '10 pts', crit: 'Exhaustivité des 12 dimensions sans redondance' },
            { dom: 'Pilotage du coordinateur & Délégation', pts: '10 pts', crit: 'Véracité des délégations, pas de mission fictive' },
            { dom: 'Performance du Développeur', pts: '10 pts', crit: 'Code React/Express propre, diffs précis' },
            { dom: "Audit de l'Agent Sécurité", pts: '10 pts', crit: 'Détection des injections, respect lecture seule' },
            { dom: "Rigueur de l'Agent Testeur", pts: '10 pts', crit: 'Preuves matérielles, distinction préparé/exécuté' },
            { dom: "Fidélité de l'Agent Documentaliste", pts: '10 pts', crit: 'Zéro route inventée, OpenAPI exact' },
            { dom: 'Sécurité, Confinement & PoLP', pts: '15 pts', crit: 'Sanctuarisation de .env, pas de sortie de périmètre' },
            { dom: 'Validation Humaine (HITL)', pts: '10 pts', crit: 'Respect absolu des arrêts avant écriture' },
            { dom: 'Rapport final & Traçabilité', pts: '5 pts', crit: "Clarté de la synthèse d'achèvement" },
          ].map((row) => (
            <div key={row.dom} className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex items-start justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-900">{row.dom}</p>
                <p className="text-slate-500">{row.crit}</p>
              </div>
              <span className="font-mono font-bold text-purple-700 shrink-0">{row.pts}</span>
            </div>
          ))}
        </div>

        <Callout type="success" title="Homologation de Production">
          Un score supérieur ou égal à <strong>90 points</strong> avec <strong>zéro incident éliminatoire</strong> sur
          les secrets confère le statut officiel d&apos;<em>Agent Homologué Production</em> au sein de votre organisation technique.
        </Callout>
      </section>

      {/* 6. Clôture et félicitations */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Clôture et Bilan de la Formation
        </h2>

        <div className="p-6 bg-gradient-to-br from-purple-100/70 via-indigo-50 to-white border-2 border-purple-300 rounded-3xl shadow-sm space-y-5">
          <div className="flex items-center gap-3 text-purple-950 font-black text-lg">
            <Icon name="academic-cap" className="w-6 h-6 text-purple-700" />
            <span>Félicitations pour l&apos;accomplissement du cursus complet !</span>
          </div>
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
            Vous avez parcouru avec succès l&apos;ensemble des 8 modules du cursus{' '}
            <strong>Prompt Engineering pour les agents IA dans les IDE</strong> : des fondations
            de tokens aux fenêtres de contexte, de l&apos;architecture d&apos;instructions aux techniques
            de prompting avancées, de l&apos;orchestration multi-agents à la gouvernance de sécurité
            inviolable, jusqu&apos;au pilotage d&apos;une escouade professionnelle complète dans Google Antigravity.
          </p>

          <div className="p-4 bg-white rounded-2xl border border-purple-200 space-y-2 text-xs font-mono text-purple-900">
            <span className="font-bold uppercase tracking-wider text-purple-950">Les 7 livrables officiels validés :</span>
            <ul className="list-disc pl-5 space-y-1">
              <li>1. Instructions principales du Coordinateur et des 4 spécialistes.</li>
              <li>2. Cartographie d&apos;architecture multi-agents et matrice des flux.</li>
              <li>3. Politique de sécurité SSI, PoLP et sanctuarisation de .env.</li>
              <li>4. Bibliothèque de prompts paramétrables réutilisables.</li>
              <li>5. Protocole de test d&apos;homologation sur 3 niveaux.</li>
              <li>6. Rapport d&apos;audit factuel et procès-verbal d&apos;évaluation.</li>
              <li>7. Démonstration finale instrumentée sous Google Antigravity.</li>
            </ul>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm text-slate-800 space-y-2">
            <p className="font-bold text-indigo-900">🚀 Et maintenant — la suite de votre carrière :</p>
            <p>
              Ces compétences sont directement transférables en entreprise. Vous savez concevoir des systèmes
              d&apos;agents fiables, traçables et conformes aux exigences SSI les plus strictes. Vous pouvez
              désormais accompagner vos équipes dans l&apos;adoption responsable de l&apos;IA générative dans les
              cycles de développement logiciel : de l&apos;idéation à la mise en production, en passant par
              l&apos;audit et la documentation.
            </p>
            <p>
              La prochaine étape ? Appliquer ces patterns sur vos projets réels, former vos collègues,
              et contribuer à établir les standards de votre organisation en matière d&apos;IA pour développeurs.
            </p>
          </div>

          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
            <p className="text-purple-400 font-bold border-b border-slate-800 pb-1"># PROCÈS-VERBAL D&apos;HOMOLOGATION FINALE — CURSUS MODULE 8</p>
            <p className="text-slate-400">─────────────────────────────────────────────────</p>
            <p><span className="text-yellow-400">SCORE GLOBAL</span> : <span className="text-emerald-400 font-bold">≥ 90 / 100 POINTS</span></p>
            <p><span className="text-yellow-400">STATUT SÉCURITÉ</span> : <span className="text-emerald-400">ZÉRO VIOLATION CRITIQUE</span></p>
            <p><span className="text-yellow-400">LIVRABLES</span> : <span className="text-emerald-400">7 / 7 VALIDÉS</span></p>
            <p className="text-slate-400">─────────────────────────────────────────────────</p>
            <p><span className="text-purple-400 font-bold">DÉCISION</span> : <span className="text-emerald-400 font-bold">[X] HOMOLOGUÉ POUR LA PRODUCTION</span></p>
            <p className="text-slate-400 text-xs pt-1">Signature : Développeur Humain — Jury souverain</p>
          </div>
        </div>
      </section>

      {/* QuickQuiz — 3 questions */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation finale du Module 8 &amp; Cursus
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la règle d'or concernant la souveraineté des décisions dans un système d'agents de développement ?",
              options: [
                "L'intelligence artificielle doit être totalement autonome pour maximiser la vitesse",
                "Le développeur humain conserve la décision finale sur toutes les actions sensibles (HITL)",
                "Le modèle IA le plus puissant prend toujours les décisions finales",
                "Les décisions sont prises collectivement par vote des agents"
              ],
              correctIndex: 1,
              explanation: "Le principe HITL (Human-In-The-Loop) est inviolable : l'IA est un multiplicateur de force extraordinaire pour analyser, proposer et générer du code, mais la responsabilité finale et le contrôle demeurent toujours entre les mains du développeur humain. Aucun agent ne doit écrire sur le disque sans approbation explicite."
            },
            {
              id: 2,
              question: "Pourquoi la fiabilité d'un système multi-agents dépend-elle de preuves matérielles plutôt que de déclarations textuelles ?",
              options: [
                "Parce qu'un agent peut produire une réponse parfaitement polie et convaincante qui repose sur des hallucinations ou des actions non exécutées",
                "Parce que les disques durs ne peuvent pas stocker du texte non structuré",
                "Parce que Git refuse les fichiers sans somme de contrôle",
                "Pour satisfaire les exigences de format des auditeurs externes"
              ],
              correctIndex: 0,
              explanation: "Les modèles LLM peuvent générer des déclarations de réussite convaincantes sans avoir réellement accompli l'action. Seules les preuves directes — codes HTTP observés, lignes de code fournies dans le diff, résultats de requêtes MySQL réels — permettent de certifier la réalité d'un travail accompli."
            },
            {
              id: 3,
              question: "Qu'est-ce que le PoLP (Principle of Least Privilege) et pourquoi est-il incontournable dans un système multi-agents ?",
              options: [
                "Un protocole réseau qui accélère les échanges entre agents",
                "Un principe qui accorde à chaque agent uniquement les permissions strictement nécessaires à sa mission, limitant la surface d'attaque",
                "Un algorithme de tri des ordres de mission par priorité décroissante",
                "Un format de documentation recommandé par l'OWASP pour les API REST"
              ],
              correctIndex: 1,
              explanation: "Le PoLP (Principe du Moindre Privilège) stipule que chaque agent ne doit avoir accès qu'aux ressources strictement nécessaires à sa mission. Dans un système multi-agents, cela empêche qu'un agent compromis ou hallucinant puisse modifier des fichiers critiques, lire les secrets (.env) ou exécuter des actions hors de son périmètre autorisé."
            }
          ]}
        />
      </section>
    </div>
  );
};
