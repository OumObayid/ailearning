'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 6 — Lecture et modification des fichiers
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Maîtriser les modifications chirurgicales, comprendre les chaînes d&apos;imports et utiliser Git comme ceinture de sécurité absolue.
        </p>
      </div>

      {/* 1. Introduction & Analogie */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="pencil" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;analogie : Changer une ampoule vs raser la maison</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          La plus grande angoisse d&apos;un développeur débutant face à une IA est souvent la même : <em className="text-rose-800">« Et si l&apos;agent supprime mon code ou casse mon projet ? »</em>
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Cette crainte est légitime si l&apos;on utilise un agent maladroit qui réécrit 500 lignes de code pour simplement changer la couleur d&apos;un bouton. Dans Google Antigravity, nous appliquons le principe de la <strong>modification chirurgicale</strong> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 bg-rose-50/60 border-2 border-rose-200 rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">❌ La mauvaise approche (Réécriture brute)</span>
            <h4 className="font-extrabold text-slate-950 text-base">Raser la maison pour changer une ampoule</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              L&apos;IA régénère l&apos;intégralité du fichier. Résultat : elle oublie vos commentaires, supprime des fonctions secondaires et crée des régressions massives invisibles.
            </p>
          </div>

          <div className="p-5 bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">✅ La bonne approche (Chirurgicale)</span>
            <h4 className="font-extrabold text-slate-950 text-base">Remplacer exactement la pièce défectueuse</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              L&apos;agent localise les 3 lignes exactes à ajuster, préserve tout le reste du fichier intact et vous présente un Diff clair et vérifiable en 5 secondes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Traçage des dépendances */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Aucun fichier n&apos;est une île : Le jeu de dominos des imports
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans une application moderne, les fichiers sont interconnectés comme un réseau routier. Modifier un fichier au début de la chaîne sans vérifier ses dépendances peut faire s&apos;effondrer toute l&apos;application :
        </p>

        <div className="p-4 sm:p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-3 font-mono text-xs sm:text-sm">
          <div className="font-sans font-bold text-slate-900 text-sm">Exemple d&apos;effet domino dans React :</div>
          
          <div className="space-y-2 text-slate-800">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200">
              <span className="text-indigo-600 font-bold">1. Le Service racine :</span> <code className="text-slate-900 font-bold">src/services/authService.ts</code>
              <p className="text-slate-600 font-sans text-xs mt-0.5">Définit la fonction <code className="text-indigo-700">login(email, password)</code>.</p>
            </div>
            <div className="pl-4 border-l-2 border-indigo-300 ml-3 space-y-2">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="text-indigo-600 font-bold">2. Le Formulaire :</span> <code className="text-slate-900 font-bold">src/components/LoginForm.tsx</code>
                <p className="text-slate-600 font-sans text-xs mt-0.5">Appelle <code className="text-indigo-700">login()</code> lors de la soumission.</p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="text-indigo-600 font-bold">3. La Page :</span> <code className="text-slate-900 font-bold">src/pages/LoginPage.tsx</code>
                <p className="text-slate-600 font-sans text-xs mt-0.5">Affiche le formulaire et redirige vers le dashboard.</p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="text-indigo-600 font-bold">4. L&apos;Application :</span> <code className="text-slate-900 font-bold">src/App.tsx</code>
                <p className="text-slate-600 font-sans text-xs mt-0.5">Gère le routeur et les pages protégées.</p>
              </div>
            </div>
          </div>
        </div>

        <Callout type="note">
          <strong>Ce que fait l&apos;agent :</strong> Avant de renommer <code className="bg-slate-100 px-1 rounded font-mono text-xs">login</code> en <code className="bg-slate-100 px-1 rounded font-mono text-xs">signIn</code>, un bon agent recherche d&apos;abord tous les fichiers qui importent cette fonction pour mettre à jour l&apos;ensemble de la chaîne simultanément.
        </Callout>
      </section>

      {/* 3. Modification ciblée vs Réécriture */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comparatif : Modification ciblée vs Réécriture totale
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/4">Critère</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Modification Ciblée (Recommandée)</th>
                <th className="p-3.5 border border-slate-200 text-slate-600">Réécriture Globale</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Périmètre d&apos;impact</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Seules les quelques lignes concernées sont touchées</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">100 % du fichier est écrasé et réécrit</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Risque de bugs cachés</td>
                <td className="p-3.5 border border-slate-200 text-emerald-700 font-bold">Quasiment nul (le reste du code est préservé)</td>
                <td className="p-3.5 border border-slate-200 text-rose-700 font-bold">Très élevé (perte de fonctions existantes)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Lisibilité pour l&apos;humain</td>
                <td className="p-3.5 border border-slate-200 text-indigo-900 font-bold">Diff ultra-clair lisible en 5 secondes</td>
                <td className="p-3.5 border border-slate-200 text-slate-600">Diff gigantesque impossible à relire sérieusement</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-emerald-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase">Modification Ciblée</span>
            <p className="text-xs text-slate-700">Ne touche qu&apos;aux lignes nécessaires. Conserve vos commentaires et vos fonctions existantes.</p>
          </div>
          <div className="p-4 bg-white border border-rose-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-rose-800 uppercase">Réécriture Globale</span>
            <p className="text-xs text-slate-700">Écrase tout le fichier. Risque très élevé d&apos;effacer du code utile sans s&apos;en rendre compte.</p>
          </div>
        </div>
      </section>

      {/* 4. Le Diff et Git : Votre sauvegarde de jeu vidéo */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-indigo-600" />
          <span>4. Git et le Diff : Votre sauvegarde de jeu vidéo avant le boss</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Grâce à <strong>Git</strong>, vous ne risquez jamais de perdre votre travail. Chaque modification proposée par l&apos;agent apparaît sous forme de <strong>Diff</strong> (rouge pour ce qui est retiré, vert pour ce qui est ajouté) :
        </p>

        {/* Diff visuel sans scrollbar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200 shadow-xl space-y-1.5 break-words min-w-0 max-w-full">
          <div className="text-slate-400 pb-2 border-b border-slate-800 text-xs">
            --- a/src/components/Welcome.tsx &nbsp;&nbsp;&nbsp; +++ b/src/components/Welcome.tsx
          </div>
          <div className="text-slate-400">export function Welcome() &#123;</div>
          <div className="bg-rose-950/70 text-rose-300 p-1 rounded border border-rose-800/60">
            - &nbsp;return &lt;h1&gt;Bonjour&lt;/h1&gt;;
          </div>
          <div className="bg-emerald-950/70 text-emerald-300 p-1 rounded border border-emerald-800/60">
            + &nbsp;return &lt;h1 className=&quot;text-xl font-bold&quot;&gt;Bienvenue sur mon application&lt;/h1&gt;;
          </div>
          <div className="text-slate-400">&#125;</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">git status</span>
            <h4 className="font-bold text-slate-950 text-sm mt-1">La vue d&apos;ensemble</h4>
            <p className="text-xs text-slate-600">Affiche la liste exacte des fichiers que l&apos;agent a touchés.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">git diff</span>
            <h4 className="font-bold text-slate-950 text-sm mt-1">La loupe ligne par ligne</h4>
            <p className="text-xs text-slate-600">Permet d&apos;inspecter chaque virgule ajoutée avant de dire oui.</p>
          </div>
        </div>
      </section>

      {/* 5. Les fichiers sanctuarisés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Les fichiers sanctuarisés : Ce à quoi l&apos;agent ne doit jamais toucher sans ordre
        </h2>
        
        <div className="p-5 bg-rose-50/70 border-2 border-rose-200 rounded-2xl space-y-2.5">
          <div className="font-extrabold text-rose-950 text-base flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span>Les 3 zones interdites par défaut :</span>
          </div>
          <ul className="text-xs sm:text-sm text-rose-950 space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Le fichier <code className="bg-rose-100 px-1 py-0.5 rounded font-mono font-bold">.env</code> :</strong> Contient vos mots de passe de base de données et clés secrètes. L&apos;agent ne doit jamais les copier dans le chat ni les téléverser.
            </li>
            <li>
              <strong>Le fichier <code className="bg-rose-100 px-1 py-0.5 rounded font-mono font-bold">package-lock.json</code> :</strong> Géré automatiquement par npm. Une modification manuelle par l&apos;IA risque de désynchroniser vos dépendances.
            </li>
            <li>
              <strong>Les fichiers de build racine :</strong> (<code className="bg-rose-100 px-1 py-0.5 rounded font-mono">tsconfig.json</code>, <code className="bg-rose-100 px-1 py-0.5 rounded font-mono">vite.config.ts</code>). À ne modifier que sur demande explicite.
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques guidés (TP 4.6) : Appliquer une retouche chirurgicale
        </h2>
        <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">TP 4.6 — Contrôle de Diff</span>
          <h4 className="font-extrabold text-slate-950 text-base">Remplacer un titre et valider le Diff</h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Ordonnez à Google Antigravity :
          </p>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs break-words border border-slate-800 min-w-0 max-w-full">
            « Dans mon fichier Header.tsx, remplace uniquement le titre &quot;Mon App&quot; par &quot;Portfolio Pro&quot;. Utilise une édition chirurgicale sans réécrire le reste du fichier. Montre-moi le diff résultant. »
          </div>
          <p className="text-xs text-slate-600 italic">
            → Vérifiez que seules 2 lignes apparaissent dans le Diff (1 suppression rouge, 1 ajout vert) et que tous vos imports et fonctions annexes sont restés intacts.
          </p>
        </div>
      </section>

      {/* 7. Quiz d'évaluation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur la Gestion des fichiers
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 6 (Lecture et modification des fichiers)"
          questions={[
            {
              id: 1,
              question: "Pourquoi privilégie-t-on toujours une modification ciblée (chirurgicale) plutôt qu'une réécriture globale ?",
              options: [
                "Parce que la modification ciblée protège le code existant et réduit drastiquement les risques de régression accidentelle.",
                "Parce que les modèles d'IA ne savent pas écrire plus de 20 lignes à la fois.",
                "Parce que Git interdit formellement de remplacer un fichier en entier.",
                "Pour forcer l'IDE à économiser de la batterie."
              ],
              correctIndex: 0,
              explanation: "Remplacer tout un fichier risque de faire disparaître des imports indispensables ou des commentaires essentiels. Une retouche ciblée est propre, sûre et facile à auditer."
            },
            {
              id: 2,
              question: "Quel affichage visuel permet d'auditer avec exactitude les lignes ajoutées (vertes) et supprimées (rouges) par l'agent ?",
              options: [
                "Le fichier README.",
                "Le Diff (Git Diff ou vue différentielle de l'IDE).",
                "Le gestionnaire des tâches Windows.",
                "L'historique de recherche Google."
              ],
              correctIndex: 1,
              explanation: "Le Diff présente la comparaison unifiée ligne par ligne entre la version précédente et la nouvelle proposition."
            },
            {
              id: 3,
              question: "Pourquoi le fichier .env fait-il partie des fichiers sanctuarisés à protéger en priorité ?",
              options: [
                "Parce qu'il pèse souvent plusieurs gigaoctets.",
                "Parce qu'il contient des secrets confidentiels (clés API, mots de passe de bases de données, tokens privés).",
                "Parce qu'il est écrit dans un langage que l'IA ne comprend pas.",
                "Parce qu'il supprime Windows s'il est ouvert."
              ],
              correctIndex: 1,
              explanation: "Le fichier .env abrite les secrets et identifiants sensibles du projet ; l'agent ne doit jamais les divulguer ni les écraser sans accord explicite."
            }
          ]}
        />
      </section>
    </div>
  );
};
