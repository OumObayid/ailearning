'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* En-tête du Chapitre */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 4 — Les Agents IA dans l&apos;IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Différence entre un chatbot et un agent IA
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Comprendre la différence fondamentale entre une intelligence artificielle qui se contente de parler et une IA outillée capable d&apos;agir directement dans votre environnement de développement.
        </p>
      </div>

      {/* 1. L'analogie du quotidien */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="sparkles" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;analogie concrète : Le consultant au téléphone vs le collègue assis à vos côtés</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Pour un débutant, la profusion de nouveaux termes (<em className="text-indigo-800">LLM</em>, <em className="text-indigo-800">agents</em>, <em className="text-indigo-800">chatbots</em>, <em className="text-indigo-800">copilotes</em>) peut sembler confuse. Pourtant, la différence entre un <strong>chatbot</strong> et un <strong>agent IA</strong> se résume à une scène de la vie professionnelle quotidienne très simple :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Carte Chatbot */}
          <div className="p-5 sm:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 font-black flex items-center justify-center text-lg">
                  📞
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-950 text-base">Le Chatbot classique</h3>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Un consultant expert par téléphone</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Imaginez un consultant très instruit au bout du fil. Vous lui décrivez votre panne de voiture : il vous explique parfaitement la théorie mécanique et vous dicte quoi faire.
              </p>
              <div className="mt-3 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-rose-700 flex items-center gap-1.5">
                  <span>❌ Ses limites physiques :</span>
                </div>
                <div>• Il n&apos;est pas dans votre garage : il ne voit pas votre moteur.</div>
                <div>• Il n&apos;a pas de mains : il ne peut pas tenir la clé de 12.</div>
                <div>• Il ne sait pas si la pièce rentre : c&apos;est <strong>vous</strong> qui devez faire tout le travail et tester si le moteur démarre.</div>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-600 bg-slate-150 p-2 rounded-lg text-center">
              Rôle : Répondre et conseiller uniquement.
            </div>
          </div>

          {/* Carte Agent IA */}
          <div className="p-5 sm:p-6 bg-indigo-50/60 border-2 border-indigo-200 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                  💻
                </span>
                <div>
                  <h3 className="font-extrabold text-indigo-950 text-base">L&apos;Agent IA (ex: Google Antigravity)</h3>
                  <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Un développeur outillé à côté de vous</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Imaginez maintenant un collègue développeur installé sur le bureau voisin, muni d&apos;outils autorisés (accès au projet, éditeur de code, terminal de commande).
              </p>
              <div className="mt-3 p-3 bg-white border border-indigo-200 rounded-xl text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <span>✅ Ses capacités d&apos;action :</span>
                </div>
                <div>• Il explore l&apos;arborescence du projet pour trouver les bons fichiers.</div>
                <div>• Il rédige le code directement aux bons emplacements autorisés.</div>
                <div>• Il lance les tests dans le terminal et vérifie lui-même si tout compile.</div>
              </div>
            </div>
            <div className="text-xs font-bold text-indigo-800 bg-indigo-100/70 p-2 rounded-lg text-center">
              Rôle : Comprendre, planifier, exécuter et vérifier sous votre contrôle.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Anatomie d'un chatbot classique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie d&apos;un chatbot classique : Une boucle passive à une seule passe
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un chatbot classique (comme ChatGPT standard, Claude.ai ou Gemini Web) fonctionne selon un schéma d&apos;échange en circuit fermé :
        </p>

        {/* Schéma fonctionnel du chatbot */}
        <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="grid gap-3 text-center text-xs sm:text-sm grid-cols-1 sm:grid-cols-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-extrabold text-slate-900 block mb-1">1. L&apos;Utilisateur</span>
              <p className="text-xs text-slate-600">Copie-colle une question ou un extrait de code dans la fenêtre de chat.</p>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
              <span className="font-extrabold text-indigo-900 block mb-1">2. Le Modèle IA</span>
              <p className="text-xs text-slate-600">Calcule des probabilités statistiques de mots et produit une réponse textuelle.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-extrabold text-slate-900 block mb-1">3. L&apos;Utilisateur</span>
              <p className="text-xs text-slate-600">Doit copier le texte produit, ouvrir son IDE, chercher le fichier et l&apos;intégrer à la main.</p>
            </div>
          </div>
        </div>

        {/* Les 3 angles morts */}
        <div className="space-y-2 pt-1">
          <h3 className="font-bold text-slate-900 text-base">Les 3 grands angles morts d&apos;un chatbot pour le développeur :</h3>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-rose-800 text-xs uppercase tracking-wide">1. Aveuglement contextuel</div>
              <p className="text-xs text-slate-700">
                Il ignore l&apos;architecture globale de votre projet, la version de vos bibliothèques dans <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-[11px]">package.json</code> et vos conventions d&apos;équipe.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-rose-800 text-xs uppercase tracking-wide">2. Impuissance motrice</div>
              <p className="text-xs text-slate-700">
                Il n&apos;a aucun bras : il ne peut ni ouvrir un fichier, ni créer un dossier, ni installer un paquet npm, ni manipuler Git.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-rose-800 text-xs uppercase tracking-wide">3. Absence de feedback réel</div>
              <p className="text-xs text-slate-700">
                Si le code qu&apos;il a proposé comporte une erreur de syntaxe ou un import erroné, il l&apos;ignore totalement jusqu&apos;à ce que vous veniez lui recoller l&apos;erreur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomie d'un Agent IA dans un IDE */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Anatomie d&apos;un agent IA dans un IDE : La révolution de l&apos;action outillée
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un environnement de développement intégré (IDE) moderne comme <strong>Google Antigravity</strong>, l&apos;IA n&apos;est pas enfermée dans une simple boîte de dialogue. Elle est connectée à l&apos;environnement via des <strong>outils (Tools)</strong>.
        </p>

        {/* Définition en formule simple */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-2xl shadow-md">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">La formule d&apos;un Agent IA :</div>
          <div className="text-base sm:text-lg font-black tracking-wide">
            Agent IA = Cerveau (Modèle LLM) + Bras &amp; Yeux (Outils) + Garde-fous (Permissions)
          </div>
          <p className="text-xs text-indigo-100 mt-2 leading-relaxed">
            Le modèle réfléchit et prend des décisions ; les outils exécutent les actions concrètes sur votre projet ; et vous conservez le contrôle total grâce au système d&apos;autorisations.
          </p>
        </div>

        {/* Les 4 super-pouvoirs de l'agent */}
        <div className="pt-2 space-y-3">
          <h3 className="font-bold text-slate-900 text-base">Les 4 super-pouvoirs opérationnels de l&apos;agent :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 bg-white border-2 border-indigo-100 rounded-xl space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-950 text-sm">
                <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
                <span>Percevoir le projet (Lecture)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                L&apos;agent peut inspecter l&apos;arborescence, lire les déclarations TypeScript, vérifier les dépendances réelles et comprendre vos conventions sans que vous n&apos;ayez à tout copier-coller.
              </p>
            </div>

            <div className="p-4 bg-white border-2 border-indigo-100 rounded-xl space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-950 text-sm">
                <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                <span>Planifier méthodiquement</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Avant de modifier aveuglément votre code, l&apos;agent établit un plan par étapes logiques (ex: créer le composant → mettre à jour l&apos;import → vérifier les tests) qu&apos;il vous soumet pour approbation.
              </p>
            </div>

            <div className="p-4 bg-white border-2 border-indigo-100 rounded-xl space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-950 text-sm">
                <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
                <span>Agir avec précision (Édition)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Il applique les modifications directement dans les fichiers ciblés via des diffs chirurgicaux, sans toucher aux portions de code saines ni altérer vos commentaires.
              </p>
            </div>

            <div className="p-4 bg-white border-2 border-indigo-100 rounded-xl space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-950 text-sm">
                <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
                <span>Observer &amp; Vérifier (Terminal)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Il peut exécuter un script de build (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-[11px]">npm run build</code>) ou vos tests unitaires pour constater le résultat réel et corriger immédiatement une éventuelle régression.
              </p>
            </div>
          </div>
        </div>

        <Callout type="warning">
          <strong>Important pour les débutants :</strong> L&apos;agent n&apos;est pas un robot incontrôlable. Chaque action critique (écrire dans un fichier, lancer une commande système) requiert votre consentement ou respecte les permissions de sécurité configurées dans l&apos;IDE.
        </Callout>
      </section>

      {/* 4. Cas d'usage réel comparé */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Cas d&apos;usage concret : « Ajouter un bouton Mode Sombre dans ma Navbar React »
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Comparons le travail réel du développeur face à la même demande selon l&apos;outil employé :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Colonne Chatbot */}
          <div className="p-5 bg-white border-2 border-slate-300 rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="font-extrabold text-slate-900 text-base">Avec un Chatbot Web</h4>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-bold">12 actions humaines</span>
            </div>
            <ol className="text-xs sm:text-sm text-slate-700 space-y-2 list-decimal pl-4 leading-relaxed">
              <li>Vous écrivez un prompt en décrivant de mémoire votre Navbar.</li>
              <li>Le chatbot génère un long bloc de code JSX générique.</li>
              <li>Vous cherchez manuellement dans quel dossier se trouve <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">Navbar.tsx</code>.</li>
              <li>Vous copiez-collez le code en écrasant une partie de vos props existantes.</li>
              <li>L&apos;application crashe : il manque la bibliothèque d&apos;icônes <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">lucide-react</code>.</li>
              <li>Vous retournez sur le chat, recollez l&apos;erreur, relancez le terminal, installez le paquet et réessayez.</li>
            </ol>
            <div className="pt-2 text-xs font-bold text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              Résultat : Vous avez fait 90 % du travail d&apos;intégration et de débogage.
            </div>
          </div>

          {/* Colonne Agent Antigravity */}
          <div className="p-5 bg-white border-2 border-indigo-300 rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <h4 className="font-extrabold text-indigo-950 text-base">Avec l&apos;Agent Antigravity</h4>
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-mono font-bold">2 actions humaines</span>
            </div>
            <ol className="text-xs sm:text-sm text-slate-700 space-y-2 list-decimal pl-4 leading-relaxed">
              <li>Vous écrivez simplement : <em className="text-indigo-900 font-medium">« Ajoute un bouton Mode Sombre dans la navbar en respectant notre thème actuel. »</em></li>
              <li>L&apos;agent inspecte l&apos;arborescence, repère <code className="bg-slate-100 px-1 rounded font-mono text-[11px]">src/components/Navbar.tsx</code> et votre configuration Tailwind.</li>
              <li>Il prépare un plan d&apos;action clair et vous demande de le valider.</li>
              <li>Après votre clic sur <strong>« Valider »</strong>, il insère le bouton, importe les bons hooks déjà présents dans votre projet et lance la vérification TypeScript.</li>
              <li>Il vous présente un compte-rendu clair des changements effectués.</li>
            </ol>
            <div className="pt-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              Résultat : L&apos;agent a géré l&apos;intégration technique ; vous avez simplement validé la direction.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tableau comparatif synthétique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Synthèse comparative : Face-à-face Chatbot vs Agent IA
        </h2>

        {/* Version Desktop / Tablette : Tableau aéré */}
        <div className="hidden sm:block">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-slate-100 text-slate-900 font-black uppercase text-xs">
              <tr>
                <th className="p-3.5 border border-slate-200">Critère</th>
                <th className="p-3.5 border border-slate-200">Chatbot classique (ChatGPT / Claude Web)</th>
                <th className="p-3.5 border border-slate-200 text-indigo-900">Agent IA dans l&apos;IDE (Google Antigravity)</th>
              </tr>
            </thead>
            <tbody className="font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Nature principale</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Moteur de discussion et de suggestion</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Partenaire d&apos;exécution outillé et autonome</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Connaissance du projet</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Limitée à ce que vous collez dans le prompt</td>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">Lecture directe de l&apos;ensemble des fichiers autorisés</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Édition du code</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Manuelle (copier / coller à votre charge)</td>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">Automatique et ciblée dans les fichiers du projet</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Commandes Terminal</td>
                <td className="p-3.5 border border-slate-200 text-rose-700">Impossible (aucun accès au système)</td>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">Possible (npm test, build, lint sous permission)</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Vérification des erreurs</td>
                <td className="p-3.5 border border-slate-200 text-slate-600">Aveugle (ne sait pas si son code plante)</td>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">Observe les retours du compilateur et s&apos;auto-corrige</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold">Rôle du développeur</td>
                <td className="p-3.5 border border-slate-200 text-slate-700">Exécutant manuel des conseils de l&apos;IA</td>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-900">Pilote, superviseur et arbitre des décisions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Version Mobile : Cartes empilées sans scrollbar */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nature principale</span>
            <div className="text-xs text-slate-700"><strong className="text-slate-900">Chatbot :</strong> Moteur de discussion et de suggestion textuelle.</div>
            <div className="text-xs text-indigo-900 font-semibold"><strong className="text-indigo-950">Agent :</strong> Partenaire d&apos;exécution outillé dans votre IDE.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Connaissance du projet</span>
            <div className="text-xs text-slate-700"><strong className="text-slate-900">Chatbot :</strong> Aveugle, limité à ce que vous collez dans le chat.</div>
            <div className="text-xs text-emerald-800 font-semibold"><strong className="text-emerald-950">Agent :</strong> Explore et lit directement les fichiers de code.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Édition &amp; Terminal</span>
            <div className="text-xs text-slate-700"><strong className="text-slate-900">Chatbot :</strong> Vous devez tout copier-coller et exécuter vous-même.</div>
            <div className="text-xs text-indigo-900 font-semibold"><strong className="text-indigo-950">Agent :</strong> Modifie les fichiers et lance les commandes avec votre accord.</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Vérification</span>
            <div className="text-xs text-slate-700"><strong className="text-slate-900">Chatbot :</strong> Ne sait pas si le code fonctionne.</div>
            <div className="text-xs text-emerald-800 font-semibold"><strong className="text-emerald-950">Agent :</strong> Observe les retours du terminal et corrige ses propres erreurs.</div>
          </div>
        </div>
      </section>

      {/* 6. Exploration visuelle de l'IDE Antigravity */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="layout" className="w-5 h-5 text-indigo-600" />
          <span>6. Découverte visuelle : Google Antigravity au microscope</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Voici comment se matérialise l&apos;environnement d&apos;un agent IA dans Google Antigravity. L&apos;interface réunit en un même écran tous les leviers d&apos;action du développeur et de l&apos;agent :
        </p>

        {/* Image du workspace Antigravity */}
        <div className="rounded-3xl border-2 border-slate-300 overflow-hidden bg-slate-950 p-2 shadow-sm">
          <div className="relative w-full aspect-[4/3] max-h-[500px]">
            <Image
              src="/images/cours/prompt-engineering-ide/antigravity-layout.jpeg"
              alt="Organisation de l'interface Google Antigravity : Éditeur de code au centre, Volet Agent à droite et Terminal en bas"
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
          <p className="text-center text-xs text-slate-300 py-2.5 font-mono px-4">
            Figure 4.1 : Vue tripartite de l&apos;IDE Google Antigravity — L&apos;Éditeur de code (centre), le Volet Agent conversationnel &amp; décisionnel (droite) et le Terminal d&apos;exécution intégré (bas).
          </p>
        </div>

        {/* Décryptage des 3 zones */}
        <div className="grid gap-3.5 pt-2 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">Zone 1 — Centre</span>
            <h4 className="font-extrabold text-slate-950 text-sm">L&apos;Éditeur de code classique</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Votre espace familier où les fichiers sont ouverts. Vous y voyez les modifications de l&apos;agent s&apos;afficher en temps réel sous forme de surbrillances colorées (diffs).
            </p>
          </div>

          <div className="p-4 bg-white border border-indigo-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="text-xs font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Zone 2 — Droite</span>
            <h4 className="font-extrabold text-slate-950 text-sm">Le Volet Agent (Antigravity)</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le centre de contrôle. C&apos;est ici que vous dialoguez avec l&apos;agent, qu&apos;il décompose son plan d&apos;action, liste les fichiers qu&apos;il compte modifier et vous demande vos approbations.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Zone 3 — Bas</span>
            <h4 className="font-extrabold text-slate-950 text-sm">Le Terminal d&apos;exécution</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              La console système où s&apos;exécutent les commandes (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-[11px]">git</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-[11px]">npm</code>, tests). L&apos;agent peut y lire les logs d&apos;erreurs pour s&apos;auto-corriger.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Le Rôle du Développeur : De Codeur à Superviseur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. La nouvelle posture du développeur : De « Codeur solitaire » à « Chef d&apos;orchestre »
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          L&apos;arrivée des agents IA ne signifie absolument pas que le métier de développeur disparaît. Au contraire, votre rôle évolue vers une dimension beaucoup plus stratégique et valorisante :
        </p>

        <div className="grid gap-4 pt-1 grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              🎯
            </div>
            <h4 className="font-bold text-slate-950 text-sm">1. Définir l&apos;intention claire</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;agent ne devine pas vos besoins métier. Vous devez formuler des objectifs précis, fixer les contraintes et spécifier ce qui ne doit pas être modifié.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              🛡️
            </div>
            <h4 className="font-bold text-slate-950 text-sm">2. Contrôler les permissions</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              C&apos;est vous qui décidez si l&apos;agent peut modifier un fichier critique ou lancer un script destructeur. Vous restez le garant de la sécurité de votre machine.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              🔍
            </div>
            <h4 className="font-bold text-slate-950 text-sm">3. Valider la qualité finale</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;agent peut commettre des erreurs logiques ou stylistiques. Vous relisez le diff proposé avant de valider et de committer les modifications dans Git.
            </p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 font-medium">
          💡 <strong>Règle d&apos;or du Prompt Engineering moderne :</strong> <em>« L&apos;agent propose et prépare le travail outillé ; le développeur arbitre, valide et engage sa responsabilité. »</em>
        </div>
      </section>

      {/* 8. Travaux pratiques guidés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Travaux pratiques guidés (TP 4.1) : Ressentir la différence en direct
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Pour ancrer ce chapitre, réalisez cette courte expérience en deux temps :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl space-y-2.5">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Expérience 1</span>
            <h4 className="font-bold text-slate-950 text-base">Le test du Chatbot Web</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Ouvrez ChatGPT ou Gemini dans votre navigateur et posez-lui la consigne suivante :
            </p>
            <div className="p-3 bg-slate-100 rounded-xl font-mono text-xs text-slate-800 break-words border border-slate-200">
              « Je travaille sur un projet web. Liste les composants qui utilisent l&apos;authentification dans mon dossier src/ et corrige les imports cassés. »
            </div>
            <p className="text-xs text-slate-600 italic">
              → <strong>Constat attendu :</strong> L&apos;IA vous répondra poliment qu&apos;elle n&apos;a pas accès à vos fichiers et vous demandera de lui coller manuellement le contenu de chaque composant.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl space-y-2.5">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Expérience 2</span>
            <h4 className="font-bold text-slate-950 text-base">Le test de l&apos;Agent Antigravity</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Dans Google Antigravity, ouvrez votre projet de cours et soumettez la même consigne :
            </p>
            <div className="p-3 bg-indigo-50/80 rounded-xl font-mono text-xs text-indigo-950 break-words border border-indigo-200">
              « Liste les composants de src/ qui utilisent l&apos;authentification et signale-moi les imports cassés sans rien modifier. »
            </div>
            <p className="text-xs text-slate-600 italic">
              → <strong>Constat attendu :</strong> L&apos;agent appelle son outil de recherche de fichiers, lit les fichiers concernés, dresse la liste exacte des composants réels et vous remet un rapport factuel vérifiable.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Quiz de validation */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Vérifiez votre compréhension
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 1 (Chatbot vs Agent IA)"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre un chatbot classique et un agent IA dans un IDE ?",
              options: [
                "Le chatbot est plus intelligent car il dispose de plus de paramètres.",
                "Le chatbot produit uniquement des suggestions de texte passives, alors que l'agent IA dispose d'outils lui permettant d'inspecter, modifier et tester le code dans l'environnement du projet.",
                "L'agent IA ne comprend pas le langage naturel et ne parle qu'en langage machine.",
                "Le chatbot a un accès automatique et illimité à l'ensemble du disque dur."
              ],
              correctIndex: 1,
              explanation: "L'agent IA se caractérise par l'action outillée : il peut lire les fichiers du projet, préparer des plans, appliquer des modifications et observer les résultats dans le terminal, tout en restant encadré par des permissions."
            },
            {
              id: 2,
              question: "Pourquoi dit-on qu'un chatbot classique est en situation d'« aveuglement contextuel » face à votre code ?",
              options: [
                "Parce qu'il ne dispose d'aucun accès direct aux fichiers, aux dépendances (package.json) ni à la structure réelle de votre projet sans copier-coller manuel.",
                "Parce qu'il ne connaît pas la syntaxe du langage JavaScript.",
                "Parce qu'il fonctionne uniquement sans connexion Internet.",
                "Parce qu'il refuse d'analyser du code qui contient plus de 10 lignes."
              ],
              correctIndex: 0,
              explanation: "Le chatbot ne voit que ce que vous collez manuellement dans son prompt. Il ignore tout du reste du projet, ce qui conduit souvent à des propositions inadaptées ou incompatibles."
            },
            {
              id: 3,
              question: "Dans Google Antigravity, un agent IA peut-il modifier n'importe quel fichier de votre ordinateur à votre insu ?",
              options: [
                "Oui, car un agent IA est totalement omnipotent et sans limites.",
                "Non, ses actions sont strictement bornées par les autorisations accordées par le développeur et le système de permissions sécurisé de l'IDE.",
                "Oui, mais uniquement s'il s'agit de fichiers écrits en langage Python.",
                "Non, car l'agent ne sait pas écrire dans les fichiers."
              ],
              correctIndex: 1,
              explanation: "Disposer d'outils ne signifie pas avoir tous les droits. L'IDE Antigravity applique des barrières de sécurité strictes, obligeant l'agent à demander confirmation pour les opérations sensibles."
            }
          ]}
        />
      </section>
    </div>
  );
};
