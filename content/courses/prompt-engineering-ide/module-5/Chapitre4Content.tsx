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
          <span>Prompt Engineering IDE • Module 5</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 4 — Collaboration et communication entre agents IA
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment synchroniser vos agents avec le passage de témoin (Context Handoff), choisir le bon modèle de collaboration et éviter l&apos;effet téléphone arabe.
        </p>
      </div>

      {/* 1. L'analogie du témoin de relais et les 3 piliers */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="chat-bubble-left-right" className="w-5 h-5 text-indigo-600" />
          <span>1. Les 3 piliers de la collaboration multi-agents</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Avoir six agents ultra-compétents ne sert à rien si chacun travaille isolé dans sa bulle. Dès que deux agents doivent enchaîner leurs actions, le risque majeur est <strong>la déperdition de contexte</strong>.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du relais 4x100 mètres :</span>
          </div>
          <p>
            Dans une course de relais, la victoire ne dépend pas seulement de la vitesse individuelle des sprinters, mais de <strong>la précision du passage de témoin</strong>. Si le coureur lâche le témoin, s&apos;il le tend dans le vide ou s&apos;il court dans la mauvaise direction, la course est perdue.
          </p>
          <p>
            Entre vos agents d&apos;IA, le témoin s&apos;appelle le <strong>Context Handoff</strong>. C&apos;est la fiche synthétique formelle qui transmet les décisions de l&apos;agent précédent au suivant, sans bruit parasite.
          </p>
        </div>

        <div className="grid gap-4 pt-2 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <Icon name="chat-bubble-left-right" className="w-4 h-4" />
              <span>1. Communication</span>
            </div>
            <p className="text-xs text-slate-700">
              Transmettre uniquement l&apos;information utile et épurée d&apos;un agent à l&apos;autre, en filtrant les bavardages et les logs bruts superflus.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <Icon name="document-duplicate" className="w-4 h-4" />
              <span>2. Transmission (Handoff)</span>
            </div>
            <p className="text-xs text-slate-700">
              Formaliser des livrables exploitables (spécifications, schémas, matrices de test) directement assimilables par l&apos;agent récepteur.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <Icon name="arrows-pointing-in" className="w-4 h-4" />
              <span>3. Coordination</span>
            </div>
            <p className="text-xs text-slate-700">
              Définir l&apos;ordre précis des interventions et positionner des portes de validation humaine obligatoires aux tournants critiques.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 3 modèles de collaboration */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="squares-plus" className="w-5 h-5 text-indigo-600" />
          <span>2. Les 3 grands modèles d&apos;organisation collaborative</span>
        </h2>

        <div className="space-y-4">
          {/* Modèle 1 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-extrabold text-slate-950 text-base">Modèle 1 : Collaboration Séquentielle (Pipeline / Chaîne de montage)</h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">Linéaire &amp; Prévisible</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Les agents interviennent les uns après les autres selon un ordre chronologique strict. Chaque agent attend la fin de la mission du précédent pour démarrer la sienne.
            </p>
            {/* Visual Pipeline */}
            <div className="grid gap-2 text-center text-xs font-bold pt-1 grid-cols-1 sm:grid-cols-2">
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900">1. Architecte</div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900">2. Développeur</div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900">3. Auditeur</div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900">4. Testeur</div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900">5. Documentaliste</div>
            </div>
            <p className="text-xs text-slate-600 italic">
              <strong>Quand l&apos;utiliser :</strong> Idéal pour les nouvelles fonctionnalités complètes, les refactorisations lourdes et l&apos;onboarding de nouveaux projets.
            </p>
          </div>

          {/* Modèle 2 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-extrabold text-slate-950 text-base">Modèle 2 : Collaboration Parallèle (Fan-Out / Fan-In)</h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">Haute Performance</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Dès que le Développeur a figé son code, plusieurs agents en lecture seule (l&apos;Auditeur Qualité et l&apos;Agent Sécurité) examinent simultanément les mêmes fichiers sous deux prismes différents. Leurs rapports sont ensuite fusionnés (Fan-In).
            </p>
            {/* Visual Fan-Out */}
            <div className="grid gap-2 text-center text-xs font-bold pt-1 grid-cols-1 sm:grid-cols-2">
              <div className="p-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-900">Code figé (Dév)</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">Auditeur (Qualité)</div>
                <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-900">Sécurité (OWASP)</div>
              </div>
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">Synthèse unifiée (Fan-In)</div>
            </div>
            <p className="text-xs text-slate-600 italic">
              <strong>Quand l&apos;utiliser :</strong> Lors de revues de Pull Requests ou d&apos;audits de sécurité express pour diviser le temps d&apos;attente par deux.
            </p>
          </div>

          {/* Modèle 3 */}
          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-extrabold text-indigo-950 text-base">Modèle 3 : Collaboration Coordonnée par Orchestrateur</h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300">Gouvernance Avancée</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Un agent orchestrateur (Lead Agent) dialogue avec l&apos;utilisateur, découpe la tâche, distribue les fiches de Handoff aux sous-agents spécialisés et arbitre les divergences avant de demander l&apos;accord humain final.
            </p>
            <p className="text-xs text-slate-600 italic">
              <strong>Quand l&apos;utiliser :</strong> Le modèle standard pour les projets professionnels d&apos;envergure dans les IDE assistés par IA.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Fiche de transmission de contexte (Context Handoff) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>3. Le contrat de transmission (Context Handoff)</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Pour éliminer tout malentendu, chaque passage de relais d&apos;un agent à l&apos;autre doit adopter une <strong>structure de transmission normée</strong> :
        </p>

        {/* Handoff Template without pre */}
        <div className="p-5 bg-slate-950 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === CONTEXT HANDOFF : FICHE OFFICIELLE DE TRANSMISSION ===
          </div>
          <div className="text-slate-300"><strong>ÉMETTEUR :</strong> Agent Architecte Logiciel</div>
          <div className="text-slate-300"><strong>DESTINATAIRE :</strong> Agent Développeur d&apos;Implémentation</div>
          <div className="text-slate-300"><strong>OBJECTIF :</strong> Implémenter la barre de recherche du portfolio React</div>
          
          <div className="text-amber-300 font-bold pt-1">1. DÉCISIONS D&apos;ARCHITECTURE VALIDÉES :</div>
          <div className="pl-4 text-slate-200">
            • Emplacement composant : src/components/SearchBar.jsx<br />
            • Filtrage en mémoire sur le state local (aucun appel serveur requis)<br />
            • Insensibilité stricte à la casse (.toLowerCase().includes(...))<br />
            • Affichage d&apos;un message EmptyState si la liste résultante est vide
          </div>

          <div className="text-rose-400 font-bold pt-1">2. CONTRAINTES TECHNIQUES INVIOLABLES :</div>
          <div className="pl-4 text-slate-200">
            • Ne modifier aucun fichier hors de SearchBar.jsx et de son import dans App.jsx<br />
            • Zéro paquet externe npm supplémentaire (utiliser les hooks React natifs)<br />
            • Préserver l&apos;ensemble des classes Tailwind existantes sans régression graphique
          </div>

          <div className="text-emerald-400 font-bold pt-1">3. LIVRABLE FORMEL ATTENDU EN RETOUR :</div>
          <div className="pl-4 text-slate-200">
            Code complet de SearchBar.jsx + Démonstration du diff minimal dans App.jsx
          </div>
        </div>
      </section>

      {/* 4. Gestion des anomalies de collaboration */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="exclamation-triangle" className="w-5 h-5 text-indigo-600" />
          <span>4. Résolution des incidents de collaboration classiques</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Incident rencontré</th>
                <th className="p-3.5 border-b border-slate-200">Conséquence sur le projet</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-900">Parade méthodologique</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold text-rose-700">Conflit d&apos;édition concurrente</td>
                <td className="p-3.5">Deux agents essaient de modifier le même fichier au même moment.</td>
                <td className="p-3.5 text-slate-700">Sanctuariser l&apos;écriture : seul le Développeur édite ; les auditeurs sont strictement en lecture seule.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-amber-700">Divergence d&apos;expertise</td>
                <td className="p-3.5">L&apos;auditeur veut simplifier un bout de code, la sécurité exige des vérifications complexes.</td>
                <td className="p-3.5 text-slate-700">Arbitrage humain obligatoire : exposer les deux positions chiffrées à l&apos;utilisateur qui tranche.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">Test sur version obsolète</td>
                <td className="p-3.5">Le testeur valide un commit antérieur à une correction critique.</td>
                <td className="p-3.5 text-slate-700">Horodatage et identifiant de commit explicite dans chaque fiche de Handoff.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-rose-700">Conflit d&apos;édition concurrente</div>
            <div><strong>Problème :</strong> Deux agents modifient le même fichier simultanément.</div>
            <div><strong className="text-emerald-700">Solution :</strong> Un seul agent détient l&apos;outil d&apos;édition (Développeur). Les autres restent en lecture seule.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-amber-700">Divergence d&apos;expertise</div>
            <div><strong>Problème :</strong> Désaccord entre la simplicité (qualité) et les gardes (sécurité).</div>
            <div><strong className="text-emerald-700">Solution :</strong> L&apos;orchestrateur soumet les deux options à l&apos;utilisateur pour arbitrage humain.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-indigo-700">Test sur version obsolète</div>
            <div><strong>Problème :</strong> Le testeur vérifie du vieux code non mis à jour.</div>
            <div><strong className="text-emerald-700">Solution :</strong> Mentionner l&apos;empreinte du commit ou du fichier dans la fiche de Handoff.</div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Collaboration et Handoff
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 4"
          questions={[
            {
              id: 1,
              question: "Quel est le bénéfice principal d'une fiche de transmission de contexte (Context Handoff) entre deux agents ?",
              options: [
                "Transmettre les décisions, contraintes et livrables exacts sans dépendre de l'historique complet de discussion, évitant les oublis et le bruit.",
                "Remplacer le compilateur TypeScript par un script Python.",
                "Accélérer le débit de téléchargement de l'IDE.",
                "Fermer automatiquement toutes les fenêtres de code ouvertes."
              ],
              correctIndex: 0,
              explanation: "Le Handoff isole l'information indispensable : l'agent suivant reçoit un cahier des charges précis sans être noyé dans les méandres des conversations passées."
            },
            {
              id: 2,
              question: "Dans quel cas le modèle de collaboration parallèle (Fan-Out / Fan-In) est-il particulièrement avantageux ?",
              options: [
                "Lorsque le code a été stabilisé par le développeur et doit subir en même temps un audit qualité et un audit de sécurité indépendants.",
                "Lorsque le projet ne contient encore aucun fichier source.",
                "Quand on souhaite que deux agents écrivent dans le même fichier à la même seconde.",
                "Uniquement si vous possédez deux souris connectées à votre ordinateur."
              ],
              correctIndex: 0,
              explanation: "Dès lors que le code ne bouge plus, l'analyser en parallèle sous plusieurs angles indépendants (qualité et sécurité) divise le temps de revue sans aucun risque de collision."
            },
            {
              id: 3,
              question: "Que doit faire l'équipe si l'agent Auditeur Qualité et l'agent Sécurité sont en désaccord sur la manière de structurer une fonction ?",
              options: [
                "L'orchestrateur présente les deux thèses de manière claire et chiffrée à l'utilisateur humain pour arbitrage éclairé.",
                "Supprimer le fichier de code pour éviter la querelle.",
                "Tirer à pile ou face de façon aléatoire.",
                "Laisser les deux agents modifier le fichier à tour de rôle indéfiniment."
              ],
              correctIndex: 0,
              explanation: "Les divergences d'architecture ou de compromis technique doivent toujours remonter à l'humain, qui détient la responsabilité ultime des choix structurants."
            }
          ]}
        />
      </section>
    </div>
  );
};
