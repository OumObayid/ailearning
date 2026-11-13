'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Compréhension du contexte du projet
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Pourquoi le code le plus élégant du monde ne sert à rien s&apos;il ne s&apos;intègre pas parfaitement à votre projet existant.
        </p>
      </div>

      {/* 1. Introduction : Le piège du code hors-sol */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="search" className="w-5 h-5 text-indigo-600" />
          <span>1. Le piège classique : Du code parfait... qui ne marche pas chez vous</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Tout développeur débutant a déjà vécu cette frustration avec une IA : vous lui demandez <em className="text-indigo-900">« Ajoute une boîte modale de connexion »</em>. L&apos;IA vous génère un magnifique composant en React... mais elle a utilisé une bibliothèque que vous n&apos;avez pas installée, des classes CSS incompatibles avec votre Tailwind, et elle a inventé une route d&apos;API qui n&apos;existe pas sur votre serveur.
        </p>
        <Callout type="danger">
          <strong>Le syndrome du code hors-sol :</strong> Une IA qui produit du code sans connaître votre <strong>contexte</strong> fabrique des solutions théoriquement justes, mais concrètement inutilisables. Dans Google Antigravity, l&apos;agent commence toujours par <strong>observer et comprendre votre contexte</strong> avant de proposer la moindre ligne.
        </Callout>
      </section>

      {/* 2. Les 5 dimensions du contexte */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 5 dimensions du contexte : Ce que l&apos;agent doit savoir
        </h2>
        <p className="text-sm sm:text-base text-slate-700">
          Pour travailler comme un développeur chevronné de votre équipe, l&apos;agent doit explorer 5 types de renseignements complémentaires :
        </p>

        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          {/* Dimension 1 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">1</span>
                <span>Contexte Technique</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">La pile logicielle</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Quelles sont vos technologies réelles ? (React 19 ou Vue 3 ? Vite ou Next.js ? Tailwind ou Bootstrap ? TypeScript ou JavaScript pur ?).
              </p>
            </div>
            <div className="text-[11px] font-mono text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
              Source : package.json, tsconfig.json
            </div>
          </div>

          {/* Dimension 2 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">2</span>
                <span>Contexte Structurel</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">L&apos;organisation des dossiers</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Où vivent vos fichiers ? Y a-t-il un dossier <code className="bg-slate-100 px-1 rounded font-mono text-xs">src/components/ui/</code> pour les boutons réutilisables, ou un dossier <code className="bg-slate-100 px-1 rounded font-mono text-xs">src/services/</code> pour les appels API ?
              </p>
            </div>
            <div className="text-[11px] font-mono text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
              Source : Arborescence de répertoires
            </div>
          </div>

          {/* Dimension 3 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">3</span>
                <span>Contexte Fonctionnel</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">Le parcours utilisateur</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Quel est le but de cette application ? Est-ce une boutique e-commerce avec panier, un tableau de bord d&apos;analytique, ou un portfolio ? L&apos;agent doit saisir la logique des écrans.
              </p>
            </div>
            <div className="text-[11px] font-mono text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
              Source : Composants de pages et routes
            </div>
          </div>

          {/* Dimension 4 */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm mb-1">
                <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">4</span>
                <span>Contexte Métier</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">Les règles d&apos;or du produit</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Les lois intangibles de l&apos;application : <em className="text-slate-800">« Un utilisateur anonyme ne peut pas commenter »</em>, ou <em className="text-slate-800">« Un prix est toujours affiché en centimes d&apos;euro »</em>.
              </p>
            </div>
            <div className="text-[11px] font-mono text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
              Source : Validations Zod, schémas DB
            </div>
          </div>

          {/* Dimension 5 */}
          <div className="p-5 bg-white border-2 border-purple-200 rounded-2xl shadow-sm space-y-2 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 text-purple-700 font-extrabold text-sm mb-1">
                <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-xs">5</span>
                <span>Contexte des Contraintes &amp; Instructions</span>
              </div>
              <h4 className="font-bold text-slate-950 text-base">Vos consignes strictes du moment</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Ce que vous interdisez formellement à l&apos;agent : ne pas installer de paquet tiers, ne pas casser les tests existants, préserver les commentaires, ou ne modifier aucun fichier sans validation préalable.
              </p>
            </div>
            <div className="text-[11px] font-mono text-purple-900 bg-purple-50 p-2 rounded-lg border border-purple-100">
              Source : Prompt utilisateur, AGENTS.md, instructions de projet
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comment l'agent explore le projet */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comment l&apos;agent découvre-t-il votre projet sans se noyer ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans une application contenant des milliers de fichiers, l&apos;agent ne peut pas tout lire d&apos;un coup : cela saturerait sa mémoire immédiate. Il utilise une stratégie d&apos;<strong>entonnoir d&apos;exploration</strong> :
        </p>

        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Étape 1 : Le radar</span>
            <h4 className="font-bold text-slate-950 text-sm">Lecture des fichiers d&apos;identité</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Il inspecte en priorité <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">package.json</code> pour connaître les bibliothèques installées et les scripts, ainsi que <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">README.md</code>.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Étape 2 : Le point d&apos;entrée</span>
            <h4 className="font-bold text-slate-950 text-sm">Le fil conducteur (Main / App)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Il ouvre le fichier racine (<code className="bg-slate-100 px-1 rounded font-mono text-[11px]">src/main.tsx</code> ou <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">src/App.tsx</code>) pour repérer les routeurs et les providers globaux.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">Étape 3 : Le ciblage chirurgical</span>
            <h4 className="font-bold text-slate-950 text-sm">La recherche de symboles</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Si vous mentionnez l&apos;authentification, il utilise des recherches textuelles rapides pour localiser les fichiers contenant <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">useAuth</code> ou <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">login</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Contexte vs Mémoire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La distinction cruciale : Contexte immédiat vs Mémoire permanente
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Beaucoup de débutants confondent ces deux notions. Pourtant, leur fonctionnement est fondamentalement différent :
        </p>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200 w-1/4">Critère</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Le Contexte (Context Window)</th>
                <th className="p-3.5 border border-slate-200 text-purple-900">La Mémoire Permanente (Memory)</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Image mentale</td>
                <td className="p-3.5 border border-slate-200">Les dossiers ouverts actuellement sur votre bureau</td>
                <td className="p-3.5 border border-slate-200 font-bold text-purple-800">Le classeur d&apos;archives rangé dans l&apos;armoire</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Durée de vie</td>
                <td className="p-3.5 border border-slate-200 text-amber-800 font-bold">Éphémère (durée de la tâche ou de la session)</td>
                <td className="p-3.5 border border-slate-200 text-emerald-800 font-bold">Durable (persiste d&apos;une session à l&apos;autre)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Exemples concrets</td>
                <td className="p-3.5 border border-slate-200">Le contenu du fichier <code className="bg-slate-100 px-1 rounded font-mono text-xs">Navbar.tsx</code> que vous êtes en train d&apos;éditer</td>
                <td className="p-3.5 border border-slate-200">Votre règle de style préférée : <em>« Utilise toujours des fonctions fléchées TypeScript »</em></td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Impact d&apos;une surcharge</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Ralentissement et oubli d&apos;instructions anciennes</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Aucun : seules les règles pertinentes sont chargées</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Image mentale</span>
            <div className="text-xs text-indigo-900 font-semibold"><strong className="text-slate-900">Contexte :</strong> Les dossiers ouverts sur le bureau à l&apos;instant t.</div>
            <div className="text-xs text-purple-900 font-semibold"><strong className="text-slate-900">Mémoire :</strong> Le classeur d&apos;archives conservé dans l&apos;armoire.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Durée de vie</span>
            <div className="text-xs text-amber-800 font-semibold"><strong className="text-slate-900">Contexte :</strong> Éphémère (disparaît à la fin de la tâche).</div>
            <div className="text-xs text-emerald-800 font-semibold"><strong className="text-slate-900">Mémoire :</strong> Permanente (conservée entre les redémarrages).</div>
          </div>
        </div>
      </section>

      {/* 5. Prompt d'audit du contexte (Sans scrollbar) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Prompt professionnel : Demander à l&apos;agent d&apos;auditer votre contexte
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Avant de confier une tâche complexe à un agent, utilisez ce prompt de mise en contexte pour vérifier qu&apos;il a bien compris votre application :
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 shadow-xl space-y-3 break-words min-w-0 max-w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-indigo-400">Prompt de cadrage contextuel initial</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À copier dans Antigravity</span>
          </div>

          <div className="space-y-2 text-slate-300 leading-relaxed">
            <div className="text-amber-300 font-semibold">[MISSION : AUDIT DE COMPRÉHENSION CONTEXTUELLE]</div>
            <div>Effectue une analyse de compréhension du projet actuellement ouvert. Ne propose aucune modification pour l&apos;instant.</div>
            
            <div className="pt-2 text-amber-300 font-semibold">[ÉLÉMENTS À RELEVER]</div>
            <div>1. Contexte technique : Framework exact, bundler (Vite/Webpack), bibliothèques UI.</div>
            <div>2. Contexte structurel : Organisation des répertoires et point d&apos;entrée.</div>
            <div>3. Contexte fonctionnel : Objectif de l&apos;application et principales routes.</div>
            <div>4. Informations manquantes : Liste tout ce qui te semble flou ou non documenté.</div>

            <div className="pt-2 text-amber-300 font-semibold">[CONSIGNES STRICTES]</div>
            <div>- Ne modifie et ne crée aucun fichier.</div>
            <div>- N&apos;exécute aucune commande d&apos;écriture.</div>
            <div>- Distingue formellement ce que tu as vérifié de tes suppositions.</div>
          </div>
        </div>
      </section>

      {/* 6. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques guidés (TP 4.3) : Détecter les limites du contexte
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 1</span>
            <h4 className="font-bold text-slate-950 text-base">La cartographie passive</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Demandez à l&apos;agent : <em className="text-indigo-900 font-medium">« Liste les 3 composants clés de mon interface et explique comment ils s&apos;articulent sans toucher aux fichiers. »</em> Observez sa façon de tracer les imports.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Exercice 2</span>
            <h4 className="font-bold text-slate-950 text-base">La détection des manques</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Posez-lui la question piège : <em className="text-indigo-900 font-medium">« Quelles informations te manquent pour savoir comment notre backend gère les tokens de session ? »</em> Constatez s&apos;il admet son ignorance ou s&apos;il invente.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Quiz de validation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vos acquis sur le Contexte
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 3 (Contexte du projet)"
          questions={[
            {
              id: 1,
              question: "Pourquoi un code techniquement sans faute de syntaxe peut-il être totalement inutile s'il a été produit sans contexte ?",
              options: [
                "Parce qu'il peut faire appel à des dépendances non installées ou contredire l'architecture et les conventions en place.",
                "Parce que les ordinateurs refusent le code généré le matin.",
                "Parce que le compilateur TypeScript n'accepte que les fichiers écrits à la main.",
                "Parce que le code sans contexte est automatiquement crypté."
              ],
              correctIndex: 0,
              explanation: "Le contexte assure l'alignement architectural : sans lui, l'IA risque de mélanger des technologies incompatibles (ex: importer Axios quand le projet utilise déjà l'API native fetch)."
            },
            {
              id: 2,
              question: "Quelle est la différence fondamentale entre Contexte (Context) et Mémoire (Memory) ?",
              options: [
                "Le contexte est payant alors que la mémoire est gratuite.",
                "Le contexte est l'espace de travail éphémère de la session actuelle, alors que la mémoire retient des préférences durables d'une session à l'autre.",
                "La mémoire ne peut stocker que des adresses IP.",
                "Le contexte ne fonctionne qu'avec le langage Python."
              ],
              correctIndex: 1,
              explanation: "Le contexte est actif et éphémère (les fichiers ouverts aujourd'hui), tandis que la mémoire conserve vos habitudes et règles de projet dans la durée."
            },
            {
              id: 3,
              question: "Quel fichier racine l'agent inspecte-t-il en priorité pour connaître la liste officielle des bibliothèques d'un projet JavaScript/TypeScript ?",
              options: [
                "index.html",
                "package.json",
                ".gitignore",
                "README.txt"
              ],
              correctIndex: 1,
              explanation: "Le fichier package.json recense l'ensemble des dépendances (dependencies, devDependencies) et les scripts exécutables du projet."
            }
          ]}
        />
      </section>
    </div>
  );
};
