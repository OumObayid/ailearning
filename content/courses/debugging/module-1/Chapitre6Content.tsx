'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  const [activeBugFamily, setActiveBugFamily] = useState<'deterministic' | 'heisenbug' | 'data' | 'env'>('deterministic');

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed max-w-none">
      {/* =========================================================================
          EN-TÊTE DU CHAPITRE
         ========================================================================= */}
      <div className="rounded-3xl border-2 border-lime-200 bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider bg-lime-100/80 px-3 py-1 rounded-full border border-lime-300">
            <Icon name="bug" className="w-4 h-4 text-lime-800" />
            <span>Ingénierie du Débogage • Module 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
            <span>Lecture accessible : ~12 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere] mb-3">
          Chapitre 6 — Reproduire une erreur de manière contrôlée
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          La règle d&apos;or de l&apos;ingénieur : si vous ne savez pas provoquer le bug à volonté en 2 clics sur votre ordinateur, vous ne pourrez jamais savoir si vous l&apos;avez réellement réparé.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Éviter le bricolage à l&apos;aveugle</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dompter les Heisenbugs (bugs intermittents)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Appliquer le protocole en 7 étapes</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : LE PIÈGE DU BRICOLAGE À L'AVEUGLE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Piège absolu : Tenter de réparer sans savoir reproduire
          </h2>
        </div>

        <p className="text-base text-slate-800 font-medium">
          Voici le comportement le plus destructeur chez un développeur débutant :
        </p>

        <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-950 font-black text-base">
            <Icon name="x" className="w-5 h-5 text-rose-700" />
            <span>Le scénario catastrophe du tâtonnement</span>
          </div>
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            Un utilisateur signale : <em>« Le bouton Commander ne fonctionne pas ! »</em>. Le débutant ouvre le code, modifie 3 lignes au hasard sans tester, pousse son code en production, et renvoie un message à l&apos;utilisateur : <em>« Est-ce que ça marche maintenant ? »</em>.
          </p>
          <div className="p-3.5 rounded-xl bg-white border border-rose-200 text-xs sm:text-sm text-rose-950 font-medium">
            <strong>Pourquoi c&apos;est une faute grave d&apos;ingénierie :</strong> Vous transformez vos utilisateurs en testeurs cobayes, vous perdez toute crédibilité, et vous risquez d&apos;introduire 3 nouveaux bugs sans même avoir touché à la cause du premier !
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 border-2 border-emerald-300 space-y-2">
          <div className="flex items-center gap-2 text-emerald-950 font-black text-base">
            <Icon name="check-circle" className="w-5 h-5 text-emerald-700" />
            <span>L&apos;analogie du Mécanicien automobile</span>
          </div>
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            Si un client dit au garagiste : <em>« Ma voiture fait un bruit métallique étrange quand je roule »</em>, le mécanicien ne commence pas à changer l&apos;embrayage au hasard ! Il monte dans le véhicule, démarre, accélère en 3ème vitesse, et cherche à <strong>reproduire le bruit à coup sûr</strong>. Une fois qu&apos;il sait exactement comment et quand le bruit se produit, le localiser et le réparer ne prend que quelques minutes.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LES 4 FAMILLES DE REPRODUCTIBILITÉ (HEISENBUGS & CIE)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Les 4 familles de reproductibilité : Du bug fidèle au bug fantôme
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Tous les bugs ne sont pas égaux devant la reproduction. Cliquez sur chaque famille pour comprendre son comportement :
        </p>

        {/* Interactive Tabs */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-white overflow-hidden shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-800 text-xs font-bold divide-x divide-slate-800 bg-slate-900">
            <button
              onClick={() => setActiveBugFamily('deterministic')}
              className={`p-3 text-center transition-colors ${
                activeBugFamily === 'deterministic' ? 'bg-emerald-600/40 text-emerald-300 border-b-2 border-emerald-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              1. Déterministe (Le fidèle)
            </button>
            <button
              onClick={() => setActiveBugFamily('heisenbug')}
              className={`p-3 text-center transition-colors ${
                activeBugFamily === 'heisenbug' ? 'bg-amber-600/40 text-amber-300 border-b-2 border-amber-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              2. Heisenbug (Le fantôme)
            </button>
            <button
              onClick={() => setActiveBugFamily('data')}
              className={`p-3 text-center transition-colors ${
                activeBugFamily === 'data' ? 'bg-blue-600/40 text-blue-300 border-b-2 border-blue-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              3. Dépendant des données
            </button>
            <button
              onClick={() => setActiveBugFamily('env')}
              className={`p-3 text-center transition-colors ${
                activeBugFamily === 'env' ? 'bg-purple-600/40 text-purple-300 border-b-2 border-purple-400 font-black' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              4. Dépendant de l&apos;environnement
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {activeBugFamily === 'deterministic' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Icon name="check-circle" className="w-4 h-4" />
                  <span>Le bug déterministe : Il survient à 100% à chaque exécution</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  C&apos;est le cas idéal du débogueur : vous fournissez les entrées A et B, et l&apos;erreur survient instantanément, de façon prévisible et constante.
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-lime-300">
                  {`// Exemple : Division par zéro systématique
function calculerRatio(a, b) {
  return a / b; // Si b === 0, produit toujours Infinity !
}`}
                </div>
                <p className="text-xs text-emerald-300">
                  🎯 <strong>Diagnostic :</strong> Très facile à isoler et à corriger avec un test unitaire.
                </p>
              </div>
            )}

            {activeBugFamily === 'heisenbug' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Icon name="sparkles" className="w-4 h-4" />
                  <span>Le Heisenbug (Bug intermittent) : Le cauchemar des développeurs</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Nommé d&apos;après le physicien Werner Heisenberg (principe d&apos;incertitude) : c&apos;est un bug qui <strong>semble disparaître dès qu&apos;on essaie de l&apos;observer</strong> (par exemple en ajoutant un <code className="text-amber-300 font-mono">console.log</code> qui modifie le timing !).
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                  {`// Exemple typique : Condition de course asynchrone (Race condition)
let utilisateurConnecte = null;

async function chargerProfil() {
  utilisateurConnecte = await fetchUser(); // Prend entre 100ms et 2000ms !
}

function afficherNom() {
  // 💥 Si l'affichage se déclenche avant la fin du fetch, crash aléatoire !
  console.log(utilisateurConnecte.nom);
}`}
                </div>
                <p className="text-xs text-amber-300">
                  🎯 <strong>Remède :</strong> Ne pas compter sur la chance. Utiliser des outils d&apos;inspection réseau (DevTools) pour simuler une connexion lente (Throttling 3G) et forcer la reproduction de la course asynchrone.
                </p>
              </div>
            )}

            {activeBugFamily === 'data' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Icon name="database" className="w-4 h-4" />
                  <span>Le bug dépendant des données : Le piège des cas limites (Edge Cases)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Le site fonctionne parfaitement pour 95% des utilisateurs normaux, mais s&apos;effondre lorsqu&apos;on saisit une valeur inhabituelle : une apostrophe dans un nom, un nombre négatif, un texte vide, ou un emoji !
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
                  {`// Cas 1 : "Jean Dupont" -> Marche très bien
// Cas 2 : "Éléonore d'Artois" -> Crash SQL à cause de l'apostrophe !
// Cas 3 : "Alex 🦁" -> Crash MySQL si la table n'est pas en utf8mb4 !`}
                </div>
                <p className="text-xs text-blue-300">
                  🎯 <strong>Remède :</strong> Demander immédiatement les données exactes tapées par le client pour reproduire l&apos;incident au caractère près.
                </p>
              </div>
            )}

            {activeBugFamily === 'env' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Icon name="server" className="w-4 h-4" />
                  <span>Le bug d&apos;environnement : Le fameux « Mais chez moi ça marche ! »</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Sur votre machine de développement (MacBook M3, Node v22, macOS), tout fonctionne à merveille. Mais sur le serveur de production (Linux Debian, Node v18), le service refuse de démarrer !
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                  {`// Exemple : Casse des noms de fichiers sensible sous Linux !
import { UserCard } from './userCard'; // ❌ Marche sous Windows/Mac (insensible à la casse)
// 💥 Plante sous Linux car le fichier s'appelle 'UserCard.tsx' avec un U majuscule !`}
                </div>
                <p className="text-xs text-purple-300">
                  🎯 <strong>Remède :</strong> Aligner les environnements grâce à Docker ou standardiser les versions de Node.js avec un fichier <code className="text-white">.nvmrc</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : LE PROTOCOLE DE REPRODUCTION EN 7 ÉTAPES
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            La Méthodologie de reproduction en 7 étapes
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Pour transformer un signalement flou en problème résolu, suivez toujours ces 7 étapes ordonnées :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">1</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">Collecter les faits bruts</h3>
            <p className="text-xs text-slate-600 font-medium">Récupérer l&apos;URL exacte, l&apos;heure, les logs serveur horodatés et la charge utile (payload JSON).</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">2</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">Figer l&apos;environnement</h3>
            <p className="text-xs text-slate-600 font-medium">Vérifier la version du navigateur, la version de Node.js et l&apos;état de la base de données.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">3</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">Définir l&apos;état initial (Préconditions)</h3>
            <p className="text-xs text-slate-600 font-medium">L&apos;utilisateur est-il connecté ? Le panier a-t-il déjà un article ? Le compte a-t-il une photo de profil ?</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">4</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">Rédiger les étapes pas à pas (1, 2, 3)</h3>
            <p className="text-xs text-slate-600 font-medium">Écrire une séquence reproductible sans saut d&apos;étape : 1. Cliquer ici, 2. Taper ceci, 3. Valider.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">5</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">Éliminer le bruit parasite</h3>
            <p className="text-xs text-slate-600 font-medium">Vider le cache du navigateur, désactiver les extensions (Adblock, etc.) et tester en navigation privée.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 space-y-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">6</span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">Isoler les variables (Une seule à la fois !)</h3>
            <p className="text-xs text-slate-600 font-medium">Si vous changez la version de Node et le code en même temps, vous ne saurez jamais lequel a réglé le problème.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
          <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
            <Icon name="check-circle" className="w-5 h-5 text-emerald-700" />
            <span>Étape 7 : Créer un test automatisé rouge (Le test de non-régression)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            Une fois le bug reproduit, écrivez immédiatement un test automatique avec Jest ou Vitest qui <strong>échoue de manière prévisible</strong>. Dès que vous appliquerez le correctif, ce test passera au vert et vous garantira à vie que ce bug précis ne pourra plus jamais réapparaître !
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : LES 4 OUTILS DE REPRODUCTION (IMAGES DU COURS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;arsenal d&apos;outillage pour reproduire selon les couches
          </h2>
        </div>

        {/* Image 9 : Chrome DevTools Network Waterfall */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-black text-xs">CHROME</span>
              <span>A. Reproduction Réseau &amp; Frontend (Chrome DevTools Network)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Cascade HTTP &amp; Statuts</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Permet d&apos;inspecter les temps de chargement (Waterfall), les codes de statut HTTP (200, 404, 500) et de simuler une connexion réseau dégradée :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image9.jpeg"
              alt="Analyse de la cascade de requêtes et statuts HTTP dans Chrome DevTools Network"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.9 — Vue détaillée du panneau Network de Chrome DevTools : statuts, types MIME et chronologie de chaque ressource chargée.
            </div>
          </div>
        </div>

        {/* Image 10 : Postman */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-black text-xs">POSTMAN</span>
              <span>B. Reproduction d&apos;API &amp; Payloads JSON</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Isolation Backend</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Permet d&apos;envoyer des requêtes HTTP brutes au serveur en testant des valeurs limites (champs vides, faux jetons d&apos;authentification, caractères spéciaux) sans passer par l&apos;interface visuelle :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image10.jpeg"
              alt="Formulation de requêtes de test avec paramètres dans Postman"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.10 — Isolation d&apos;un appel API dans Postman pour tester les cas limites avec paramètres spécifiques.
            </div>
          </div>
        </div>

        {/* Image 11 : VS Code Debugger */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-black text-xs">VS CODE</span>
              <span>C. Reproduction Backend &amp; Points d&apos;arrêt conditionnels</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Exécution pas à pas</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Permet de poser un point d&apos;arrêt qui ne se déclenche <strong>que lorsque la condition rare est remplie</strong> (ex: <code className="text-blue-700 font-mono">user.id === 42</code>) :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image11.jpeg"
              alt="Session de débogage avec points d'arrêt et inspection de variables dans VS Code"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.11 — Contrôle de l&apos;exécution avec VS Code : pile d&apos;appels (Call Stack), variables locales et points d&apos;arrêt.
            </div>
          </div>
        </div>

        {/* Image 12 : MySQL Workbench */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs">MYSQL</span>
              <span>D. Reproduction des contraintes de base de données (MySQL Workbench)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Moteur relationnel SQL</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Exécuter la requête SQL isolée pour vérifier les erreurs de contraintes de clé étrangère, d&apos;unicité ou d&apos;indexation lente :
          </p>
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <Image
              src="/images/cours/debugging/module-1/image12.jpeg"
              alt="Exécution de requêtes et analyse des messages d'erreur dans MySQL Workbench"
              width={1200}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 text-center border-t border-slate-200">
              Figure 1.12 — Reproduction d&apos;erreurs SQL et vérification des contraintes d&apos;intégrité dans MySQL Workbench.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : CHECKLIST INTERACTIVE DE REPRODUCTION
         ========================================================================= */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <InteractiveChecklist
          title="Protocole de Reproduction Contrôlée en 7 Étapes"
          items={[
            "1. Isoler et documenter la version exacte de l'environnement (OS, Node.js, navigateur, commit Git)",
            "2. Collecter le jeu de données d'entrée minimal (payload JSON ou paramètres de requête exacts)",
            "3. Identifier l'action unitaire ou l'événement système déclencheur du bug",
            "4. Éliminer les facteurs tiers bruyants (vider le cache local, désactiver extensions, réinitialiser la session)",
            "5. Rejouer le scénario 3 fois consécutives pour confirmer le déterminisme à 100%",
            "6. Capturer les logs serveur horodatés et la trace réseau complète (DevTools / Postman)",
            "7. Rédiger un test automatisé rouge (Jest/Vitest) qui échoue de manière reproductible avant le correctif"
          ]}
        />
      </section>

      {/* =========================================================================
          SECTION 6 : SYNTHÈSE DES POINTS CLÉS
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            Synthèse du Chapitre 6
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lime-500/10 to-teal-500/10 border-2 border-emerald-300 space-y-2 text-sm sm:text-base font-medium text-slate-900">
          <p>• <strong>Pas de reproduction = Pas de correction :</strong> Toute modification sans reproduction préalable est un coup de poker dangereux.</p>
          <p>• <strong>Les Heisenbugs (intermittents) :</strong> Sont souvent dus à des conditions de course asynchrones ou à des délais réseau ; simulez un réseau lent pour les figer.</p>
          <p>• <strong>Les cas limites (Edge Cases) :</strong> Testez toujours les données extrêmes (texte vide, apostrophes, emojis, valeurs négatives).</p>
          <p>• <strong>Isoler les variables :</strong> Ne modifiez qu&apos;un seul paramètre à la fois pour identifier le déclencheur avec certitude.</p>
          <p>• <strong>Le test rouge salvateur :</strong> Un bug reproductible doit être matérialisé par un test automatisé rouge avant d&apos;écrire la moindre ligne de correctif.</p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — La Reproduction d'Erreurs"
          questions={[
            {
              id: 1,
              question: "Quel est l'objectif premier de la reproduction d'une erreur ?",
              options: [
                "Modifier immédiatement le code à la volée en espérant que ça remarche.",
                "Provoquer volontairement le dysfonctionnement de manière prévisible pour comprendre avec certitude ses conditions d'apparition.",
                "Supprimer tous les logs pour cacher le problème.",
                "Demander au client de ne plus utiliser le site.",
              ],
              correctIndex: 1,
              explanation: "Exactement ! Savoir déclencher l'anomalie à coup sûr est la condition indispensable pour valider ensuite que le correctif fonctionne réellement.",
            },
            {
              id: 2,
              question: "Comment appelle-t-on un bug intermittent qui semble disparaître dès qu'on essaie de l'observer (par exemple en ajoutant un log) ?",
              options: [
                "Un bug déterministe.",
                "Un Heisenbug (bug fantôme).",
                "Un bug de syntaxe.",
                "Un bug de clavier.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! Nommé d'après Werner Heisenberg, le Heisenbug est souvent causé par une condition de course asynchrone dont le timing est perturbé par l'observation.",
            },
            {
              id: 3,
              question: "Pourquoi est-il crucial de ne faire varier qu'un seul facteur à la fois pendant les tests de reproduction ?",
              options: [
                "Pour savoir avec exactitude quel paramètre précis est la cause du déclenchement.",
                "Pour économiser la batterie de l'ordinateur portable.",
                "Pour que le code compile plus vite.",
                "C'est inutile, il vaut mieux changer 10 choses à la fois.",
              ],
              correctIndex: 0,
              explanation: "Bravo ! Si vous changez à la fois le code, la version de Node et la base de données, vous ne saurez jamais lequel était responsable.",
            },
            {
              id: 4,
              question: "Quel outil est le plus adapté pour tester directement un endpoint HTTP avec des corps JSON invalides sans passer par l'interface web ?",
              options: [
                "Postman.",
                "Un logiciel de retouche photo.",
                "La calculatrice Windows.",
                "Un traitement de texte.",
              ],
              correctIndex: 0,
              explanation: "Bien joué ! Postman permet de forger n'importe quelle requête HTTP et d'examiner la réponse brute du serveur en toute indépendance du frontend.",
            },
            {
              id: 5,
              question: "Pourquoi les ingénieurs écrivent-ils un test automatisé qui échoue (test rouge) dès qu'ils ont reproduit un bug ?",
              options: [
                "Pour créer un test de non-régression qui garantira à vie que ce bug ne pourra plus jamais réapparaître une fois corrigé.",
                "Pour faire planter les serveurs de l'entreprise.",
                "Pour punir le développeur qui a écrit le bug.",
                "Pour augmenter artificiellement la taille du projet.",
              ],
              correctIndex: 0,
              explanation: "Excellente réponse ! Le test rouge qui passe au vert après correction devient le gardien permanent contre toute future régression logicielle.",
            },
          ]}
        />
      </section>
    </div>
  );
};
