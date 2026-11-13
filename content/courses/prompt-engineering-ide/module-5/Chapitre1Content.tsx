'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 5 — Concevoir une Équipe d&apos;Agents Spécialisés</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Comprendre le principe des agents IA spécialisés
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Pourquoi diviser une mission entre plusieurs agents spécialisés plutôt que de tout confier à une seule IA « couteau suisse » complaisante.
        </p>
      </div>

      {/* 1. L'analogie de l'hôpital */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;analogie concrète : L&apos;homme-orchestre vs l&apos;équipe chirurgicale</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Imaginez un hôpital où une seule personne serait à la fois chirurgien, anesthésiste, infirmier et inspecteur de l&apos;hygiène. Pendant qu&apos;elle opère, elle ne peut pas surveiller les constantes vitales ni contrôler si le matériel est stérile. Et si elle commet une erreur, elle s&apos;auto-validera sans s&apos;en rendre compte !
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans le développement logiciel, c&apos;est exactement la même réalité : demander à <strong>une seule invite générale</strong> de concevoir l&apos;architecture, coder le React, auditer les failles de sécurité, exécuter les tests et rédiger la documentation mène à la catastrophe : l&apos;IA est saturée de consignes contradictoires, bâcle la sécurité et valide son propre code avec complaisance.
        </p>
        <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl text-xs sm:text-sm text-indigo-950 font-medium">
          💡 <strong>Le principe de la séparation des pouvoirs :</strong> Celui qui crée le code ne doit pas être celui qui l&apos;audite, ni celui qui certifie la sécurité. En créant une équipe d&apos;agents spécialisés, chaque IA a une mission nette, des permissions adaptées et une impartialité totale.
        </div>
      </section>

      {/* 2. Organisation comparée */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comparatif : Agent Unique « Touche-à-tout » vs Équipe Spécialisée
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-white border-2 border-rose-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">❌ Modèle A : L&apos;Agent Unique Surchargé</span>
            <h4 className="font-extrabold text-slate-950 text-base">Un seul agent avec 10 casquettes</h4>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 font-mono text-center">
              Agent Généraliste<br />
              (Architecture + Code + Sécurité + Tests + Docs)
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 pt-1">
              <li><strong>Saturation cognitive :</strong> Le prompt contient trop d&apos;instructions divergentes.</li>
              <li><strong>Complaisance fatale :</strong> L&apos;agent teste son propre code et s&apos;auto-attribue 10/10 sans voir ses failles.</li>
              <li><strong>Risque de sécurité :</strong> L&apos;agent dispose d&apos;un accès en écriture total permanent.</li>
            </ul>
          </div>

          <div className="p-5 bg-white border-2 border-emerald-200 rounded-2xl shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">✅ Modèle B : L&apos;Équipe d&apos;Agents Spécialisés</span>
            <h4 className="font-extrabold text-slate-950 text-base">Des spécialistes indépendants et coordonnés</h4>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-mono text-center">
              Pilote Humain / Orchestrateur<br />
              ↳ [Architecte] ↳ [Développeur] ↳ [Auditeur]<br />
              ↳ [Sécurité] ↳ [Testeur] ↳ [Documentaliste]
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 pt-1">
              <li><strong>Rôle net et exclusif :</strong> L&apos;agent se concentre à 100 % sur son domaine d&apos;expertise.</li>
              <li><strong>Contrôle qualité objectif :</strong> L&apos;auditeur et le testeur travaillent en lecture seule et ne laissent rien passer.</li>
              <li><strong>Permissions étanches :</strong> Seul le Développeur a le droit d&apos;éditer du code, sous validation humaine.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Les 6 agents de référence */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 6 profils d&apos;agents spécialisés de référence
        </h2>
        <p className="text-sm sm:text-base text-slate-700">
          Dans Google Antigravity, nous structurons notre équipe de développement autour de ces 6 profils complémentaires :
        </p>

        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          {/* Agent 1 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="text-xl">📐</span>
                <span>1. Agent Architecte</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">La conception préliminaire</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Il analyse les besoins, conçoit l&apos;arborescence des dossiers, choisit les bibliothèques et rédige les spécifications. <em>Interdiction absolue d&apos;écrire ou de modifier du code.</em>
              </p>
            </div>
            <span className="text-[11px] font-mono text-indigo-900 bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">Droit : Lecture seule</span>
          </div>

          {/* Agent 2 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="text-xl">💻</span>
                <span>2. Agent Développeur</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">La production du code</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Il prend les spécifications validées de l&apos;Architecte et rédige les composants React et les fonctions Node.js de façon chirurgicale dans le périmètre autorisé.
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-100">Droit : Édition sous validation</span>
          </div>

          {/* Agent 3 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="text-xl">🧐</span>
                <span>3. Agent Auditeur (Code Reviewer)</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">La qualité &amp; la maintenabilité</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Il passe le code au crible : détection des fonctions dupliquées, respect des conventions de nommage et respect du typage TypeScript. Ne modifie aucun fichier.
              </p>
            </div>
            <span className="text-[11px] font-mono text-indigo-900 bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">Droit : Lecture seule</span>
          </div>

          {/* Agent 4 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="text-xl">🛡️</span>
                <span>4. Agent Sécurité</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">La chasse aux failles</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Il traque les vulnérabilités applicatives : risques d&apos;injection SQL, failles XSS, fuite de secrets dans <code className="bg-slate-100 px-1 rounded font-mono text-xs">.env</code> et contrôles d&apos;authentification défaillants.
              </p>
            </div>
            <span className="text-[11px] font-mono text-indigo-900 bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">Droit : Audit passif &amp; scanner</span>
          </div>

          {/* Agent 5 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="text-xl">🧪</span>
                <span>5. Agent Testeur (QA)</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">La vérification par les faits</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Il rédige et exécute les suites de tests unitaires (Vitest/Jest). Il invente des cas limites pervers (champs vides, entrées géantes) pour pousser le code dans ses retranchements.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">Droit : Exécution de tests</span>
          </div>

          {/* Agent 6 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="text-xl">📖</span>
                <span>6. Agent Documentaliste</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">La clarté pour l&apos;équipe</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Il rédige les guides de démarrage, documente les endpoints d&apos;API (Swagger/OpenAPI) et explique la configuration en se basant uniquement sur ce qui a été prouvé par les tests.
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-100">Droit : Rédaction de .md</span>
          </div>
        </div>
      </section>

      {/* 4. Rôle vs Mission vs Autorisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La règle fondamentale : Rôle vs Mission vs Autorisation
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/4">Concept clé</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Question à se poser</th>
                <th className="p-3.5 border border-slate-200">Exemple pour l&apos;Agent Développeur</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">1. Le Rôle (Identité)</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Qui est l&apos;agent ?</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Développeur Front-End React &amp; TypeScript</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">2. La Mission (Tâche)</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Quel travail précis doit-il accomplir aujourd&apos;hui ?</td>
                <td className="p-3.5 border border-slate-200 text-slate-800">Coder le champ de recherche dans <code className="bg-slate-100 px-1 rounded font-mono text-xs">src/components/Search.tsx</code></td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">3. L&apos;Autorisation (Droits)</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Quelles actions physiques a-t-il le droit d&apos;effectuer ?</td>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-800">Modifier uniquement ce fichier après validation humaine du Diff</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">1. Rôle (Identité)</span>
            <p className="text-xs text-slate-700">Qui est l&apos;agent : Développeur React &amp; TypeScript.</p>
          </div>
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase">2. Mission (Tâche)</span>
            <p className="text-xs text-slate-700">Ce qu&apos;il doit faire : Coder le composant de recherche selon les spécifications.</p>
          </div>
          <div className="p-3.5 bg-white border border-emerald-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase">3. Autorisation (Droits)</span>
            <p className="text-xs text-slate-700">Ses droits réels : Modifier ce fichier cible uniquement après accord sur le Diff.</p>
          </div>
        </div>
      </section>

      {/* 5. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux pratiques guidés (TP 5.1) : La distribution des rôles
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 5.1 — Jeu de rôle pour les 6 agents</span>
          <h4 className="font-extrabold text-slate-950 text-base">Qui fait quoi sur une nouvelle fonctionnalité ?</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Pour l&apos;ajout d&apos;un système de favoris dans un portfolio, voici comment se répartissent exactement les missions :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>1. Architecte :</strong> Choisit de stocker les favoris dans le localStorage et définit l&apos;interface TypeScript.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>2. Développeur :</strong> Écrit le hook <code className="text-indigo-700 font-mono">useFavorites.ts</code> et le bouton étoile.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>3. Sécurité :</strong> Vérifie qu&apos;aucune donnée sensible n&apos;est stockée en clair dans le localStorage.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>4. Auditeur :</strong> S&apos;assure que le composant respecte les conventions Tailwind existantes.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>5. Testeur :</strong> Lance des tests pour vérifier que le favori persiste après un rechargement de page.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong>6. Documentaliste :</strong> Explique dans le README comment utiliser le hook dans d&apos;autres pages.
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur les Agents Spécialisés
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 1 (Agents Spécialisés)"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il dangereux de confier le développement ET l'audit de sécurité à un seul et même agent généraliste ?",
              options: [
                "Parce qu'un agent unique entre en conflit d'intérêts et a tendance à valider son propre code avec complaisance sans voir ses failles.",
                "Parce que les ordinateurs ne peuvent faire tourner qu'un seul mot à la fois.",
                "Parce que le langage React interdit les agents généralistes.",
                "Pour faire payer plus d'abonnements."
              ],
              correctIndex: 0,
              explanation: "Séparer le développeur de l'auditeur garantit une séparation des pouvoirs saine : celui qui crée le code n'est pas celui qui certifie sa sécurité."
            },
            {
              id: 2,
              question: "L'Agent Auditeur (Code Reviewer) a-t-il le droit de modifier directement des fichiers pour corriger un défaut ?",
              options: [
                "Oui, pour gagner du temps.",
                "Non, sa mission est d'auditer et d'émettre des recommandations objectives en lecture seule ; la modification incombe au Développeur après accord.",
                "Oui, mais uniquement la nuit.",
                "Non, car il ne sait pas ce qu'est un fichier."
              ],
              correctIndex: 1,
              explanation: "L'auditeur reste en lecture seule pour éviter les conflits d'édition et préserver son impartialité totale de jugement."
            },
            {
              id: 3,
              question: "Quelle est la mission principale de l'Agent Architecte ?",
              options: [
                "Écrire les 1000 premières lignes de code.",
                "Concevoir l'arborescence, structurer les composants et fixer les règles techniques avant toute écriture de code.",
                "Effacer la base de données.",
                "Installer des jeux vidéo sur le serveur."
              ],
              correctIndex: 1,
              explanation: "L'architecte prépare le plan de construction théorique en amont, garantissant que le développeur ne commencera pas à coder à l'aveugle."
            }
          ]}
        />
      </section>
    </div>
  );
};
