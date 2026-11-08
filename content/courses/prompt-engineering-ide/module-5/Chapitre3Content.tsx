'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Responsabilités et non-chevauchement entre agents
        </h1>
      </div>

      {/* 1. Chevauchement de missions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce qu&apos;un chevauchement de missions ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un <strong>chevauchement de missions</strong> survient lorsque plusieurs agents s&apos;estiment simultanément compétents et autorisés pour modifier le même fichier ou résoudre le même problème.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Si l&apos;on transmet à l&apos;auditeur technique et à l&apos;agent sécurité la consigne floue <em>« Analyse le code et corrige les erreurs »</em>, l&apos;auditeur risque de refactoriser une fonction pendant que l&apos;agent sécurité en réécrit la signature pour bloquer une injection SQL. Résultat : conflits de merge, code incohérent et perte de contrôle.
        </p>
        <Callout type="warning">
          <strong>Principe d&apos;étanchéité :</strong> Les agents peuvent et doivent analyser le même code sous des angles différents, mais <strong>un seul et unique agent doit avoir le mandat d&apos;écriture</strong> : l&apos;agent développeur, sur validation humaine du plan.
        </Callout>
      </section>

      {/* 2. Ce qu'il doit faire vs Ce qu'il ne doit pas faire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Frontières des responsabilités des 6 profils
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Agent</th>
                <th className="p-3.5 border border-slate-200">Ce qu&apos;il doit faire (Mandat)</th>
                <th className="p-3.5 border border-slate-200">Ce qu&apos;il ne doit JAMAIS faire (Interdit)</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Architecte</td>
                <td className="p-3.5 border border-slate-200">Concevoir l&apos;organisation technique et les flux</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Développer du code ou modifier des fichiers</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Développeur</td>
                <td className="p-3.5 border border-slate-200">Réaliser les fonctionnalités selon les spécifications</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Modifier l&apos;architecture de son propre chef</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Auditeur</td>
                <td className="p-3.5 border border-slate-200">Examiner la maintenabilité et la propreté du code</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Corriger directement le code source</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Sécurité</td>
                <td className="p-3.5 border border-slate-200">Identifier les vulnérabilités et failles potentielles</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Modifier directement ou tenter des attaques</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Testeur</td>
                <td className="p-3.5 border border-slate-200">Vérifier la conformité par rapport aux critères</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Modifier le code pour masquer un échec de test</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Documentaliste</td>
                <td className="p-3.5 border border-slate-200">Documenter le fonctionnement réel vérifié</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Inventer des fonctionnalités ou altérer le code</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Cas pratique : Route API Express avec faille SQL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Étude de cas : Traitement concerté d&apos;une route vulnérable
        </h2>
        <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
          <pre>{`// Code initial dans src/routes/auth.js :
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);
  res.json(user);
});`}</pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-indigo-700">1. Architecte :</span>
            <p className="text-slate-700">Constate que la route mélange contrôleur et requête SQL brute. Propose de découper en contrôleur + service + repository.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-700">2. Sécurité :</span>
            <p className="text-slate-700">Détecte une vulnérabilité critique d&apos;injection SQL due à l&apos;interpolation de <code className="font-mono">${'{email}'}</code>. Exige des requêtes préparées.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-amber-700">3. Auditeur :</span>
            <p className="text-slate-700">Souligne l&apos;absence de bloc try/catch et le renvoi brut de l&apos;objet utilisateur sans hachage du mot de passe.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-emerald-700">4. Développeur :</span>
            <p className="text-slate-700">Implémente la correction validée : requête préparée avec paramètres liés et structure en couches.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-indigo-700">5. Testeur :</span>
            <p className="text-slate-700">Soumet des charges utiles malveillantes (ex: <code className="font-mono">&apos; OR &apos;1&apos;=&apos;1</code>) et valide que l&apos;injection est neutralisée.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-800">6. Documentaliste :</span>
            <p className="text-slate-700">Met à jour la documentation Swagger avec le contrat JSON sécurisé et les codes HTTP d&apos;erreur (401, 400).</p>
          </div>
        </div>
      </section>

      {/* 4. Matrice RACI */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Matrice RACI des responsabilités
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Activité</th>
                <th className="p-3 border border-slate-200">Architecte</th>
                <th className="p-3 border border-slate-200">Développeur</th>
                <th className="p-3 border border-slate-200">Auditeur</th>
                <th className="p-3 border border-slate-200">Sécurité</th>
                <th className="p-3 border border-slate-200">Testeur</th>
                <th className="p-3 border border-slate-200">Documentaliste</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium text-slate-800 divide-y divide-slate-200 bg-white text-center">
              <tr>
                <td className="p-3 border border-slate-200 text-left font-bold">Conception d&apos;architecture</td>
                <td className="p-3 border border-slate-200 font-black text-indigo-700">R (Responsable)</td>
                <td className="p-3 border border-slate-200 text-slate-500">C (Consulté)</td>
                <td className="p-3 border border-slate-200 text-slate-500">C</td>
                <td className="p-3 border border-slate-200 text-slate-500">C</td>
                <td className="p-3 border border-slate-200 text-slate-400">I (Informé)</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 text-left font-bold">Édition &amp; écriture du code</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 font-black text-indigo-700">R (Responsable)</td>
                <td className="p-3 border border-slate-200 text-slate-500">C</td>
                <td className="p-3 border border-slate-200 text-slate-500">C</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 text-left font-bold">Audit qualité &amp; maintenabilité</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 font-black text-indigo-700">R (Responsable)</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 text-left font-bold">Audit de vulnérabilités</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 font-black text-indigo-700">R (Responsable)</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 text-left font-bold">Exécution des tests de régression</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 font-black text-indigo-700">R (Responsable)</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 text-left font-bold">Rédaction de la documentation</td>
                <td className="p-3 border border-slate-200 text-slate-500">C</td>
                <td className="p-3 border border-slate-200 text-slate-500">C</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-400">I</td>
                <td className="p-3 border border-slate-200 text-slate-500">C</td>
                <td className="p-3 border border-slate-200 font-black text-indigo-700">R (Responsable)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Prompt de non-chevauchement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Prompt universel de non-chevauchement des compétences
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[REGLES_DE_RESPONSABILITE_ET_DE_NON_CHEVAUCHEMENT]
1. RESPECT STRICT DU PÉRIMÈTRE :
   Exécute uniquement les tâches qui correspondent à ta mission principale.
   Ne prends jamais en charge les responsabilités dévolues à un autre agent.

2. DÉTECTION HORS PÉRIMÈTRE :
   Si tu découvres un problème relevant d'une autre spécialité (ex: une faille de sécurité alors que tu es l'auditeur qualité), signale-le dans ton rapport en indiquant l'agent compétent à saisir.

3. INTERDICTION D'ÉDITION POUR LES AUDITEURS :
   Si tu n'es pas l'agent développeur mandaté, tu travailles en lecture seule stricte : ne modifie aucun fichier.

4. ARBITRAGE HUMAIN :
   Ne considère jamais la recommandation d'un autre agent comme une autorisation automatique d'agir sur le code. Toute modification requiert la validation explicite de l'utilisateur.`}</pre>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Responsabilités et RACI
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 3"
          questions={[
            {
              id: 1,
              question: "Dans une matrice RACI multi-agents, combien d'agents doivent être désignés 'R' (Responsable de la réalisation) pour une même tâche d'édition de code ?",
              options: [
                "Un seul agent à la fois (l'agent Développeur), pour éviter tout conflit d'écriture et toute modification contradictoire.",
                "Tous les agents en même temps pour mutualiser l'effort.",
                "Zéro agent, c'est l'ordinateur qui décide.",
                "Autant d'agents qu'il y a de fichiers dans le projet."
              ],
              correctIndex: 0,
              explanation: "Le principe fondamental du RACI est l'unicité de la responsabilité de réalisation (un seul R) pour garantir la cohérence et l'imputabilité."
            },
            {
              id: 2,
              question: "Si l'agent auditeur identifie une faille de sécurité majeure, quelle est sa conduite réglementaire ?",
              options: [
                "Modifier le fichier en cachette.",
                "Consigner la faille dans son rapport d'audit et recommander la saisine immédiate de l'agent sécurité pour évaluation approfondie.",
                "Supprimer la base de données.",
                "Ignorer complètement le problème car ce n'est pas de la qualité de code."
              ],
              correctIndex: 1,
              explanation: "L'agent signale le problème à son niveau sans sortir de son périmètre d'observateur neutre, orientant l'utilisateur vers l'expert dédié."
            }
          ]}
        />
      </section>
    </div>
  );
};

