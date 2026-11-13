'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 8 — Projet Final &amp; Système Multi-Agents</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Définir la communication et la délégation des missions
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Pourquoi le bavardage libre entre agents paralyse les projets, comment standardiser le contrat de mission en 11 paramètres et imposer un format de compte-rendu opposable.
        </p>
      </div>

      {/* 1. L'analogie du protocole radio aérospatial */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie du protocole radio spatial : L&apos;ordre formel contre le bavardage</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Lors d&apos;une mission spatiale entre le centre de contrôle à Houston et la Station Spatiale Internationale, les astronautes ne se racontent pas des anecdotes vagues par radio. Chaque transmission suit un protocole militaire strict : identifiant d&apos;appel, confirmation d&apos;écoute, ordre numéroté, relecture de confirmation (<em>read-back</em>) et acquittement.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Si deux astronautes discutaient en disant : <em>&quot;Au fait, coupe un peu la valve d&apos;oxygène quand tu as cinq minutes&quot;</em>, personne ne saurait quelle valve, quand, ni avec quel niveau de vérification.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Dans un système multi-agents, le bavardage en langage naturel non structuré produit des malentendus catastrophiques : l&apos;agent développeur croit avoir le droit de modifier un fichier, l&apos;agent testeur croit que l&apos;API est déjà prête, et le coordinateur perd le fil conducteur.
        </p>
      </section>

      {/* 2. Communication vs Délégation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. Différence fondamentale entre Communication et Délégation</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Transmettre une information n&apos;équivaut jamais à donner l&apos;autorisation d&apos;agir. La distinction est la pierre angulaire de la sécurité :
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-1/2">Simple communication d&apos;information</th>
                <th className="p-3 w-1/2">Délégation formelle de mission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3">Partager un extrait de code ou une documentation pour lecture.</td>
                <td className="p-3 font-semibold text-purple-900">Confier la responsabilité exclusive d&apos;un livrable précis et daté.</td>
              </tr>
              <tr>
                <td className="p-3">Signaler : &quot;Il y a une erreur 400 sur la route de login&quot;.</td>
                <td className="p-3 font-semibold text-purple-900">Attribuer l&apos;ordre de mission DEV-004 de correction avec périmètre défini.</td>
              </tr>
              <tr>
                <td className="p-3">Ne transfère aucun droit d&apos;action sur le projet.</td>
                <td className="p-3 font-semibold text-purple-900">Délimite strictement les outils autorisés, les contraintes et critères d&apos;arrêt.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-xs">Communication d&apos;information</span>
            <p className="text-slate-600 text-xs">Partage de lecture passif. Ne donne aucun droit d&apos;intervention sur le système.</p>
            <div className="border-t pt-2">
              <span className="font-bold text-purple-900 text-xs">Délégation formelle de mission</span>
              <p className="text-slate-600 text-xs">Ordre contractuel complet avec mandat, périmètre, restrictions et critères d&apos;acceptation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Le Canevas standard en 11 paramètres */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Le contrat de mission standardisé en 11 paramètres</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour qu&apos;une mission soit exécutable sans ambiguïté, le coordinateur formule chaque ordre selon cette matrice complète :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
          <div className="text-purple-400 font-bold border-b border-slate-800 pb-1">
            # CONTRAT DE MISSION DÉLÉGUÉE (SPÉCIFICATION 11 PARAMÈTRES)
          </div>
          <p className="text-slate-300">1. MISSION_ID : SEC-002</p>
          <p className="text-slate-300">2. AGENT DESTINATAIRE : Agent Sécurité</p>
          <p className="text-slate-300">3. OBJECTIF PREMIER : Auditer la gestion des mots de passe et du sel de hachage</p>
          <p className="text-slate-300">4. PÉRIMÈTRE AUTORISÉ : src/api/controllers/authController.js exclusivement</p>
          <p className="text-slate-300">5. TRAVAIL ATTENDU : Vérifier la robustesse de l&apos;algorithme (ex: bcrypt) et l&apos;absence de logs en clair</p>
          <p className="text-rose-400">6. RESTRICTIONS STRICTES : Mode LECTURE SEULE absolu. Aucun appel d&apos;outil d&apos;édition</p>
          <p className="text-slate-300">7. DÉPENDANCES PRÉALABLES : Fichier authController.js créé par le Développeur</p>
          <p className="text-slate-300">8. DONNÉES D&apos;ENTRÉE : Code source fourni dans le diff DEV-002</p>
          <p className="text-slate-300">9. LIVRABLE REQUIS : Rapport d&apos;audit JSON/Markdown avec citations de lignes exactes</p>
          <p className="text-slate-300">10. CRITÈRE D&apos;ACCEPTATION : Zéro avertissement de sécurité non documenté</p>
          <p className="text-amber-400">11. STATUT INITIAL : EN COURS</p>
        </div>
      </section>

      {/* 4. Le Canevas standard de compte-rendu */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>4. Le canevas de compte-rendu d&apos;exécution obligatoire</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          En réponse, l&apos;agent spécialiste ne doit pas répondre par un simple <em>&quot;C&apos;est bon j&apos;ai fini&quot;</em>. Il doit restituer son travail selon cette structure opposable :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
          <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
            # COMPTE-RENDU D&apos;EXÉCUTION DE MISSION (EXEMPLE RETOUR TEST-001)
          </div>
          <p className="text-slate-300">1. RÉFÉRENCE MISSION : TEST-001</p>
          <p className="text-slate-300">2. AGENT ÉMETTEUR : Agent Testeur (QA)</p>
          <p className="text-slate-300">3. RÉSULTAT OBTENU : 4 cas de test préparés, 0 test exécuté (en attente d&apos;accord d&apos;écriture)</p>
          <p className="text-slate-300">4. PREUVES MATÉRIELLES : Spécification des scénarios dans test/projects.test.js</p>
          <p className="text-slate-300">5. ANOMALIES OU RISQUES RELEVÉS : Le champ &quot;description&quot; autorise des chaînes infinies sans troncature</p>
          <p className="text-slate-300">6. RECOMMANDATION : Ajouter une limite de 500 caractères dans la validation Express</p>
          <p className="text-purple-300">7. STATUT FINAL PROPOSÉ : TERMINÉE (En attente de contrôle du coordinateur)</p>
        </div>

        <Callout type="tip" title="La règle de non-ambiguïté">
          Grâce à ce diptyque <strong>Ordre de mission (11 paramètres) / Compte-rendu d&apos;exécution (7 points)</strong>, le système multi-agents fonctionne comme une véritable équipe d&apos;ingénieurs seniors : traçabilité parfaite, zéro friction et audit immédiat.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Communication &amp; Délégation</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre une communication d'information et une délégation de mission ?",
              options: [
                "La communication partage des données passives sans droit d'agir, alors que la délégation confère un mandat contractuel d'intervention avec périmètre et contraintes",
                "La communication s'effectue en anglais, la délégation en français",
                "La délégation nécessite d'éteindre l'ordinateur",
                "Il n'y a aucune différence entre les deux"
              ],
              correctIndex: 0,
              explanation: "Communiquer (ex: signaler un bug) ne donne aucun pouvoir d'action. Seule la délégation formelle de mission confère à l'agent le droit de préparer un livrable dans un périmètre délimité."
            },
            {
              id: 2,
              question: "Pourquoi est-il interdit à un agent spécialiste de répondre simplement 'C'est bon, j'ai fini' au coordinateur ?",
              options: [
                "Parce que le coordinateur est sourd",
                "Parce qu'une réponse sans preuve matérielle ni compte-rendu structuré empêche toute vérification objective et favorise les hallucinations masquées",
                "Parce que Next.js exige au moins 500 mots par message",
                "Parce que cela bloque le port 3000"
              ],
              correctIndex: 1,
              explanation: "Le compte-rendu standardisé impose de citer les preuves matérielles, les anomalies relevées et les livrables, permettant au coordinateur de vérifier la conformité réelle."
            },
            {
              id: 3,
              question: "Quel paramètre du contrat de mission en 11 points garantit qu'un agent ne débordera pas sur les fichiers des autres ?",
              options: [
                "L'heure du message",
                "Le paramètre 'PÉRIMÈTRE AUTORISÉ' (Scope) qui délimite expressément les chemins et fichiers accessibles",
                "Le style de police de caractères",
                "Le nom du processeur de la machine"
              ],
              correctIndex: 1,
              explanation: "La délimitation explicite du périmètre (Scope Bounding) empêche l'agent d'explorer ou de modifier des composants extérieurs à son mandat immédiat."
            }
          ]}
        />
      </section>
    </div>
  );
};
