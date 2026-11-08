'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Démonstration complète dans Google Antigravity &amp; Clôture
        </h1>
      </div>

      {/* 1. Déploiement de l'environnement Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Déploiement de l&apos;escouade dans Google Antigravity
        </h2>
        <p className="text-slate-700">
          Pour lancer le projet de synthèse dans Google Antigravity, l&apos;ingénieur prompt prépare l&apos;environnement en trois étapes préparatoires incontournables :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-purple-800">Étape A — Confinement du Workspace</span>
            <p className="text-slate-600">Ouvrir exclusivement le répertoire racine du projet React/Node.js. Aucun dossier parent n&apos;est accessible.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-purple-800">Étape B — Chargement des Personas</span>
            <p className="text-slate-600">Injecter les instructions principales du Coordinateur, Développeur, Sécurité, Testeur et Documentaliste.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs">
            <span className="font-bold text-purple-800">Étape C — Verrouillage PoLP</span>
            <p className="text-slate-600">Activer le mode lecture seule par défaut. Exiger les diffs unifiés et la validation HITL avant chaque écriture.</p>
          </div>
        </div>
      </section>

      {/* 2. Le Déroulé des 7 jalons de la démonstration */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 7 jalons d&apos;exécution d&apos;une fonctionnalité de bout en bout
        </h2>
        <p className="text-slate-700 text-sm">
          Voici la séquence opérationnelle chronologique suivie par l&apos;escouade pour développer la création d&apos;un projet avec persistance MySQL :
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">JALON 1</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Cadrage par le coordinateur</h4>
              <p className="text-xs text-slate-600">Le coordinateur décompose la demande en 4 ordres de mission DEV-FINAL-001, SEC-FINAL-001, TEST-FINAL-001 et DOC-FINAL-001.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">JALON 2</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Propositions techniques préalables</h4>
              <p className="text-xs text-slate-600">Le développeur conçoit la route Express et le formulaire React ; la sécurité relève les exigences anti-SQLi et le testeur prépare la matrice.</p>
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-purple-300 rounded-xl flex items-start gap-3 shadow-xs bg-purple-50/20">
            <span className="font-mono font-bold text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">JALON 3</span>
            <div>
              <h4 className="font-bold text-purple-950 text-sm">Arrêt souverain et validation humaine (HITL)</h4>
              <p className="text-xs text-slate-700">L&apos;escouade suspend ses actions. Le développeur humain étudie le diff unifié et valide formellement l&apos;écriture sur le disque.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">JALON 4</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Développement unitaire autorisé</h4>
              <p className="text-xs text-slate-600">Le développeur est le SEUL agent à appliquer la modification de code sur les fichiers autorisés.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">JALON 5</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Recette, vérification et tests factuels</h4>
              <p className="text-xs text-slate-600">Le testeur exécute les commandes autorisées et consigne les preuves matérielles (codes retours HTTP 201, données MySQL enregistrées).</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">JALON 6</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Documentation OpenAPI confirmée</h4>
              <p className="text-xs text-slate-600">Le documentaliste consigne la spécification technique officielle à partir des résultats réels validés.</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-xs">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">JALON 7</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Rapport final de clôture</h4>
              <p className="text-xs text-slate-600">Le coordinateur consolide les comptes-rendus, confirme l&apos;absence de secret divulgué et soumet la livraison au responsable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Grille d'homologation finale sur 100 points */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Grille d&apos;homologation finale du système (Score sur 100)
        </h2>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
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

        <Callout type="success" title="Homologation de Production">
          Un score supérieur ou égal à 90 points avec zéro incident éliminatoire sur les secrets confère le statut officiel d&apos;Agent Homologué Production au sein de votre organisation technique.
        </Callout>
      </section>

      {/* 4. Clôture de la formation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Clôture et Bilan de la Formation
        </h2>

        <div className="p-6 bg-gradient-to-br from-purple-100/70 via-indigo-50 to-white border-2 border-purple-300 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-purple-950 font-black text-lg">
            <Icon name="academic-cap" className="w-6 h-6 text-purple-700" />
            <span>Félicitations pour l&apos;accomplissement du cursus complet !</span>
          </div>
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
            Vous avez parcouru avec succès l&apos;ensemble des 8 modules du cursus <strong>Prompt Engineering pour les agents IA dans les IDE</strong> : des fondations de tokens aux fenêtres de contexte, de l&apos;architecture d&apos;instructions aux techniques de prompting avancées, de l&apos;orchestration multi-agents à la gouvernance de sécurité inviolable, jusqu&apos;au pilotage d&apos;une escouade professionnelle complète dans Google Antigravity.
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
        </div>
      </section>

      {/* QuickQuiz */}
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
                "L'intelligence artificielle doit être totalement autonome pour aller plus vite",
                "Le développeur humain conserve la décision finale sur toutes les actions sensibles (HITL)",
                "Le modèle le plus cher prend toujours les décisions",
                "Les décisions sont tirées au sort par le système d'exploitation"
              ],
              correctIndex: 1,
              explanation: "L'IA est un multiplicateur de force extraordinaire pour analyser, proposer et coder, mais la responsabilité finale et le contrôle demeurent toujours entre les mains de l'humain."
            },
            {
              id: 2,
              question: "Pourquoi la fiabilité d'un système multi-agents dépend-elle de preuves matérielles plutôt que de déclarations textuelles ?",
              options: [
                "Parce qu'un agent peut produire une réponse parfaitement polie et convaincante qui repose sur des hallucinations ou des actions non exécutées",
                "Parce que les disques durs sont trop petits",
                "Parce que Git refuse les fichiers texte sans preuves",
                "Pour faire plaisir aux auditeurs"
              ],
              correctIndex: 0,
              explanation: "Seules les preuves directes (lignes de code fournies, retours d'outils vérifiés, codes HTTP observés) permettent de certifier la réalité d'un travail."
            }
          ]}
        />
      </section>
    </div>
  );
};
