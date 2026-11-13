'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { CodeBlock } from '@/components/courses/CodeBlock';

export const Chapitre2Content: React.FC = () => {
  // État pour la cascade causale interactive (L'effet domino)
  const [activeDomino, setActiveDomino] = useState<number>(1);

  const dominoSteps = [
    {
      id: 1,
      tag: 'Le Bug (La Racine)',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      title: 'Défaut dans le code source',
      description: 'Le développeur a écrit "mail" au lieu de "email" dans la clause SQL.',
      code: `// Fichier : authRepository.ts
const sql = "SELECT * FROM users WHERE mail = ?"; // ❌ Erreur : La colonne s'appelle 'email' !`,
      detail: 'Le bug est tapi dans le fichier. Même si personne ne se connecte la nuit, ce bug existe déjà.',
    },
    {
      id: 2,
      tag: 'L\'Erreur interne',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      title: 'Crash du moteur de base de données',
      description: 'MySQL refuse d\'exécuter la requête et déclenche une exception SQL.',
      code: `// Console du serveur Node.js / MySQL :
Error: ER_BAD_FIELD_ERROR: Unknown column 'mail' in 'where clause'`,
      detail: 'C\'est l\'événement technique : le système de base de données heurte un mur et lève une exception.',
    },
    {
      id: 3,
      tag: 'L\'Erreur réseau',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      title: 'Échec de transmission HTTP',
      description: 'Le serveur Express ne sachant que faire renvoie un code 500 au navigateur.',
      code: `// Inspecteur Réseau (DevTools) :
POST https://monsite.com/api/login -> Status: 500 Internal Server Error`,
      detail: 'Le serveur prévient le client web : "Désolé, une panique imprévue s\'est produite de mon côté".',
    },
    {
      id: 4,
      tag: 'L\'Anomalie d\'affichage',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      title: 'Écart visuel par rapport à la maquette',
      description: 'Le bouton "Se connecter" affiche un spinner qui tourne sans fin au lieu d\'un message clair.',
      code: `// Écran de l'utilisateur :
[ 🔄 Connexion en cours... ] (Le bouton reste bloqué pour toujours)`,
      detail: 'L\'anomalie est l\'écart entre le comportement attendu (redirection ou message d\'erreur) et l\'état figé.',
    },
    {
      id: 5,
      tag: 'Le Dysfonctionnement métier',
      badgeColor: 'bg-red-100 text-red-900 border-red-300',
      title: 'Impact réel sur le service',
      description: '10 000 utilisateurs sont incapables de se connecter à leur compte aujourd\'hui.',
      code: `// Conséquence commerciale :
- Taux de connexion : 0%
- Ventes paralysées
- Support client submergé d'appels mécontents`,
      detail: 'C\'est la douleur réelle vécue par l\'entreprise et ses clients. Tout est parti d\'un mot de 4 lettres ("mail") !',
    },
  ];

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
            <span>Lecture accessible : ~10 min</span>
          </div>
        </div>

        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere] mb-3">
          Chapitre 2 — Bug, erreur, anomalie et dysfonctionnement
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-medium">
          Pourquoi utiliser les bons mots change tout : démêler la faute dans le code, l&apos;exception technique, l&apos;écart de comportement et l&apos;impact réel sur les utilisateurs.
        </p>

        {/* Objectifs du chapitre */}
        <div className="mt-6 pt-5 border-t border-lime-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Distinguer les 4 notions clés</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Maîtriser la cascade causale</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Appliquer les « 5 Pourquoi »</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1 : L'HISTOIRE CAPTIVANTE & L'ANALOGIE AUTOMOBILE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-950">
            La petite histoire du mot « Bug » et l&apos;analogie automobile
          </h2>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm uppercase tracking-wide">
            <Icon name="book-open" className="w-4 h-4 text-emerald-700" />
            <span>D&apos;où vient le mot « Bug » ? (Septembre 1947)</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Le 9 septembre 1947, à l&apos;université de Harvard, l&apos;ordinateur électromécanique géant <em>Mark II</em> tombe en panne sans explication. La pionnière de l&apos;informatique <strong>Grace Hopper</strong> et son équipe ouvrent la machine et découvrent... un véritable papillon de nuit (un insecte, <em>bug</em> en anglais) coincé entre les lames d&apos;un relais mécanique !
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium italic bg-white p-3 rounded-xl border border-slate-200">
            Ils retirèrent l&apos;insecte avec une pince à épiler et collèrent le papillon dans le journal de bord avec la mention : « First actual case of bug being found » (Premier cas réel de bug trouvé). Le verbe <em>déboguer</em> (retirer les insectes) était né !
          </p>
        </div>

        {/* L'analogie automobile */}
        <div className="rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-950 font-black text-base">
            <Icon name="sparkles" className="w-5 h-5 text-amber-700" />
            <span>L&apos;analogie de la voiture : Comprendre les 4 notions en 30 secondes</span>
          </div>
          <p className="text-sm text-slate-800 font-medium">
            Imaginez une voiture qui roule sur l&apos;autoroute :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-rose-700">1. Le Bug</span>
              <p className="text-xs font-bold text-slate-900">La pièce défectueuse</p>
              <p className="text-xs text-slate-600 font-medium">Une durite de frein fissurée en usine lors de l&apos;assemblage.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-amber-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-amber-700">2. L&apos;Erreur</span>
              <p className="text-xs font-bold text-slate-900">Le signal d&apos;alarme</p>
              <p className="text-xs text-slate-600 font-medium">Le capteur détecte une baisse de pression et allume un voyant rouge au tableau de bord.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-blue-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-blue-700">3. L&apos;Anomalie</span>
              <p className="text-xs font-bold text-slate-900">L&apos;écart mesuré</p>
              <p className="text-xs text-slate-600 font-medium">Il faut 60 mètres pour s&apos;arrêter au lieu des 25 mètres indiqués sur la notice.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-purple-200 space-y-1">
              <span className="text-[11px] font-black uppercase text-purple-700">4. Le Dysfonctionnement</span>
              <p className="text-xs font-bold text-slate-900">La conséquence subie</p>
              <p className="text-xs text-slate-600 font-medium">Le conducteur appuie à fond sur la pédale mais la voiture percute le panneau !</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 : LES 4 NOTIONS DÉCORTIQUÉES EN CODE
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-950">
            Décryptage technique avec des exemples de code
          </h2>
        </div>

        {/* 1. Le Bug */}
        <div className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-rose-700 font-black text-base">
              <Icon name="bug" className="w-5 h-5" />
              <span>1. Le Bug (Le Défaut dans le code)</span>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">Présent dans le texte source</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Le bug est une faute inscrite dans le code par un humain. Il peut s&apos;agir d&apos;une mauvaise formule, d&apos;une faute d&apos;inattention ou d&apos;une condition inversée.
          </p>
          <CodeBlock
            language="javascript"
            filename="calculateurTVA.js"
            code={`// ❌ LE BUG : On additionne le taux au lieu de multiplier
function calculerPrixTTC(prixHT, tauxTVA) {
  return prixHT + tauxTVA; // Si prixHT=100 et tauxTVA=0.20, donne 100.20 € au lieu de 120 € !
}`}
          />
        </div>

        {/* 2. L'Erreur */}
        <div className="p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-amber-700 font-black text-base">
              <Icon name="info" className="w-5 h-5" />
              <span>2. L&apos;Erreur (L&apos;Événement d&apos;arrêt technique)</span>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">Exception levée au runtime</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            L&apos;erreur survient lorsque la machine refuse d&apos;exécuter une instruction parce qu&apos;elle viole une règle du langage ou du système.
          </p>
          <CodeBlock
            language="typescript"
            filename="userProfile.ts"
            code={`const profil = null;

// ❌ L'ERREUR : Le moteur JavaScript stoppe immédiatement l'exécution
console.log(profil.nom);
// Résultat en console : Uncaught TypeError: Cannot read properties of null (reading 'nom')`}
          />
        </div>

        {/* 3. L'Anomalie */}
        <div className="p-5 rounded-2xl bg-white border-2 border-blue-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-blue-700 font-black text-base">
              <Icon name="search" className="w-5 h-5" />
              <span>3. L&apos;Anomalie (L&apos;Écart par rapport au résultat attendu)</span>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">Sans aucun message d&apos;erreur !</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            C&apos;est le cas le plus vicieux : le code s&apos;exécute sans aucun crash, aucune ligne rouge n&apos;apparaît dans la console, mais le résultat est faux ou non conforme au cahier des charges.
          </p>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
            <p><strong>Exemple de cahier des charges :</strong> Le montant en euros doit s&apos;afficher avec une virgule et deux décimales (<code className="text-blue-700 font-mono font-bold">1 250,50 €</code>).</p>
            <p><strong>Résultat affiché par le site :</strong> <code className="text-rose-700 font-mono font-bold">1250.5 €</code>.</p>
            <p className="text-slate-500 italic mt-1">La fonction n&apos;a pas crashé, mais il y a une anomalie d&apos;exigence métier.</p>
          </div>
        </div>

        {/* 4. Le Dysfonctionnement */}
        <div className="p-5 rounded-2xl bg-white border-2 border-purple-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-purple-700 font-black text-base">
              <Icon name="x" className="w-5 h-5" />
              <span>4. Le Dysfonctionnement (La Panne utilisateur)</span>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">Impact business &amp; utilisateur</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            C&apos;est la description du problème en langage humain, telle que la rapporte un client furieux au support :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-800">
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center gap-2">
              <span className="text-purple-600">⚠️</span>
              <span>« Je n&apos;arrive pas à payer »</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center gap-2">
              <span className="text-purple-600">⚠️</span>
              <span>« Mon mot de passe est refusé »</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center gap-2">
              <span className="text-purple-600">⚠️</span>
              <span>« Mon panier s&apos;est vidé tout seul »</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 : LA CASCADE CAUSALE INTERACTIVE (L'EFFET DOMINO)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">3</span>
          <h2 className="text-xl font-bold text-slate-950">
            Simulateur interactif : La Cascade Causale (L&apos;effet Domino)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Comprendre comment une petite erreur d&apos;inattention déclenche une réaction en chaîne jusqu&apos;à bloquer toute l&apos;entreprise :
        </p>

        {/* Interactive Domino Card */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-white overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">Cascade d&apos;une panne de connexion</span>
            </div>
            <span className="text-[11px] font-bold text-lime-400">Étape {activeDomino} sur 5</span>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-5 border-b border-slate-800 text-xs font-bold divide-x divide-slate-800 bg-slate-900">
            {dominoSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveDomino(step.id)}
                className={`p-2.5 sm:p-3 text-center transition-all ${
                  activeDomino === step.id
                    ? 'bg-emerald-600/30 text-emerald-300 border-b-2 border-emerald-400 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="hidden sm:inline">Domino </span>{step.id}
              </button>
            ))}
          </div>

          {/* Domino Display Area */}
          <div className="p-5 sm:p-6 space-y-4">
            {dominoSteps.map(
              (step) =>
                activeDomino === step.id && (
                  <div key={step.id} className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${step.badgeColor}`}>
                        {step.tag}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{step.title}</span>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-slate-200">
                      {step.description}
                    </p>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-lime-300 overflow-x-auto whitespace-pre">
                      {step.code}
                    </div>

                    <div className="p-3.5 bg-slate-800/70 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                      <Icon name="info" className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step.detail}</span>
                    </div>
                  </div>
                )
            )}

            {/* Navigation buttons */}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
              <button
                disabled={activeDomino === 1}
                onClick={() => setActiveDomino((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Domino précédent
              </button>
              <button
                disabled={activeDomino === 5}
                onClick={() => setActiveDomino((prev) => Math.min(5, prev + 1))}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              >
                Domino suivant →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : LES 3 FAMILLES D'ERREURS EN PROGRAMMATION
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">4</span>
          <h2 className="text-xl font-bold text-slate-950">
            Les 3 grandes familles d&apos;erreurs en programmation
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Quand votre programme ne fonctionne pas, il s&apos;agit systématiquement de l&apos;une de ces 3 familles :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Famille 1 : Syntaxe */}
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 font-black text-xs flex items-center justify-center">1</span>
              <h3 className="font-bold text-sm sm:text-base text-slate-950">Erreur de Syntaxe</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              La grammaire du code n&apos;est pas respectée (accolade manquante, mot-clé mal orthographié). Le programme <strong>refuse même de démarrer</strong>.
            </p>
            <div className="bg-slate-50 p-2.5 rounded-lg border font-mono text-[11px] text-rose-700">
              {"SyntaxError: Unexpected token '}'"}
            </div>
            <div className="text-[11px] font-semibold text-emerald-700">
              Facile à corriger : votre éditeur (VS Code) la souligne en rouge d&apos;avance !
            </div>
          </div>

          {/* Famille 2 : Runtime */}
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center">2</span>
              <h3 className="font-bold text-sm sm:text-base text-slate-950">Erreur d&apos;Exécution (Runtime)</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              La syntaxe est parfaite, le programme démarre, mais en cours de route il heurte l&apos;impossible (ex: lire un fichier introuvable, variable <code>null</code>).
            </p>
            <div className="bg-slate-50 p-2.5 rounded-lg border font-mono text-[11px] text-amber-700">
              TypeError: Cannot read properties of undefined
            </div>
            <div className="text-[11px] font-semibold text-amber-800">
              Nécessite de poser des breakpoints ou de lire la Stack Trace.
            </div>
          </div>

          {/* Famille 3 : Logique */}
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center">3</span>
              <h3 className="font-bold text-sm sm:text-base text-slate-950">Erreur de Logique (Sémantique)</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Le programme tourne impeccablement, sans aucun message rouge, mais le résultat produit est faux (ex: condition inversée, mauvais calcul).
            </p>
            <div className="bg-slate-50 p-2.5 rounded-lg border font-mono text-[11px] text-purple-700">
              if (age &lt; 18) autoriserAcces(); // ❌ Logique inversée !
            </div>
            <div className="text-[11px] font-semibold text-purple-800">
              Les plus redoutables : seuls les tests et l&apos;analyse humaine les démasquent.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : LA TECHNIQUE DES "5 POURQUOI" (5 WHYS)
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">5</span>
          <h2 className="text-xl font-bold text-slate-950">
            L&apos;arme absolue pour trouver la Cause Racine : La méthode des « 5 Pourquoi »
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Inventée dans l&apos;industrie automobile et adoptée par toutes les grandes entreprises tech (Google, Amazon), cette technique consiste à poser 5 fois de suite la question <em>« Pourquoi ? »</em> pour remonter de la surface jusqu&apos;à la cause racine originelle :
        </p>

        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-5 sm:p-6 space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-emerald-200">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
            <div className="text-xs sm:text-sm font-medium text-slate-800">
              <strong>1. Pourquoi l&apos;utilisateur ne peut pas valider sa commande ?</strong><br />
              <span className="text-slate-600">Parce que le bouton « Payer » reste grisé et inactif.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-emerald-200">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
            <div className="text-xs sm:text-sm font-medium text-slate-800">
              <strong>2. Pourquoi le bouton reste grisé ?</strong><br />
              <span className="text-slate-600">Parce que le formulaire considère que l&apos;adresse de livraison est manquante.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-emerald-200">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
            <div className="text-xs sm:text-sm font-medium text-slate-800">
              <strong>3. Pourquoi l&apos;adresse est considérée comme manquante ?</strong><br />
              <span className="text-slate-600">Pourtant l&apos;utilisateur l&apos;a tapée, mais la requête API renvoie un code d&apos;erreur 400.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-emerald-200">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">4</span>
            <div className="text-xs sm:text-sm font-medium text-slate-800">
              <strong>4. Pourquoi l&apos;API renvoie-t-elle une erreur 400 ?</strong><br />
              <span className="text-slate-600">Parce que le validateur du serveur exige un champ <code>code_postal</code> de 5 chiffres exactement.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-100/90 border border-emerald-300">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0">5</span>
            <div className="text-xs sm:text-sm font-medium text-emerald-950">
              <strong>5. Pourquoi cette validation a-t-elle échoué pour ce client ?</strong> (🎯 <strong>CAUSE RACINE</strong>)<br />
              <span>Parce que ce client habite à Londres (Royaume-Uni) où les codes postaux contiennent des lettres (ex: <code>SW1A 1AA</code>) ! Le validateur rejetait tous les clients internationaux !</span>
            </div>
          </div>
        </div>

        <Callout type="tip" title="La puissance des 5 Pourquoi">
          Si le développeur s&apos;était arrêté au 1er pourquoi, il aurait simplement forcé l&apos;activation du bouton dans le HTML (pansement superficiel). En posant les 5 Pourquoi, il a découvert une règle métier internationale manquante dans son backend !
        </Callout>
      </section>

      {/* =========================================================================
          SECTION 6 : COMMENT RAPPORTER UN PROBLÈME COMME UN PRO
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">6</span>
          <h2 className="text-xl font-bold text-slate-950">
            Le Guide de communication : Signaler une anomalie comme un ingénieur
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans une équipe technique, la qualité de votre description d&apos;un problème fait la différence entre des heures de frustration et une résolution en 10 minutes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <Icon name="x" className="w-4 h-4" />
              <span>❌ Le rapport du débutant (Inexploitable)</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-rose-200 text-xs sm:text-sm font-mono text-slate-800 italic">
              « Salut, ça marche pas sur mon ordi, le bouton beugue. Tu peux regarder stp ? »
            </div>
            <p className="text-xs text-rose-800 font-medium">
              Aucun contexte, aucun message d&apos;erreur, aucun détail sur le navigateur ou les données testées. Impossible à reproduire !
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Icon name="check" className="w-4 h-4" />
              <span>✅ Le rapport de l&apos;ingénieur (Modèle 4 points)</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs text-slate-800 space-y-1">
              <p><strong>1. Comportement attendu :</strong> L&apos;utilisateur est redirigé vers <code>/dashboard</code> après login.</p>
              <p><strong>2. Comportement observé :</strong> Erreur rouge 500 dans la console DevTools.</p>
              <p><strong>3. Étapes de reproduction :</strong> Taper email <code>test@demo.com</code> + mot de passe valide.</p>
              <p><strong>4. Données techniques :</strong> Chrome v122, Node.js v20, log serveur : <code>ER_BAD_FIELD_ERROR</code>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : SYNTHÈSE DU CHAPITRE
         ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-black text-sm">7</span>
          <h2 className="text-xl font-bold text-slate-950">
            Synthèse : Le tableau récapitulatif
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-950 border-b-2 border-slate-200">
              <tr>
                <th className="p-3 font-black">Concept</th>
                <th className="p-3 font-black">Où se situe-t-il ?</th>
                <th className="p-3 font-black">Comment le reconnaît-on ?</th>
                <th className="p-3 font-black">Action requise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr>
                <td className="p-3 font-black text-rose-700 bg-rose-50/30">Bug</td>
                <td className="p-3">Dans le code source</td>
                <td className="p-3">Faute de frappe, opérateur faux, logique erronée</td>
                <td className="p-3 font-bold text-emerald-800">Corriger le code</td>
              </tr>
              <tr>
                <td className="p-3 font-black text-amber-700 bg-amber-50/30">Erreur</td>
                <td className="p-3">À l&apos;exécution (Runtime)</td>
                <td className="p-3">Exception console, statut HTTP 4xx ou 5xx</td>
                <td className="p-3 font-bold text-emerald-800">Lire la Stack Trace</td>
              </tr>
              <tr>
                <td className="p-3 font-black text-blue-700 bg-blue-50/30">Anomalie</td>
                <td className="p-3">À la comparaison</td>
                <td className="p-3">Écart entre le résultat attendu et le résultat réel</td>
                <td className="p-3 font-bold text-emerald-800">Ajuster aux specs</td>
              </tr>
              <tr>
                <td className="p-3 font-black text-purple-700 bg-purple-50/30">Dysfonctionnement</td>
                <td className="p-3">Dans l&apos;usage client</td>
                <td className="p-3">Fonctionnalité inopérante (achat impossible, etc.)</td>
                <td className="p-3 font-bold text-emerald-800">Résoudre l&apos;incident</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 : QUIZ D'AUTO-ÉVALUATION
         ========================================================================= */}
      <section className="space-y-4 pt-4">
        <QuickQuiz
          title="Auto-évaluation — Maîtrisez-vous le vocabulaire et les mécanismes ?"
          questions={[
            {
              id: 1,
              question: "D'après la définition exacte, qu'est-ce qu'un « Bug » ?",
              options: [
                "Un message rouge qui s'affiche dans la console.",
                "Un défaut ou une imperfection logé dans le code source d'un programme.",
                "La colère exprimée par un client au téléphone.",
                "Une panne générale de courant dans le centre de données.",
              ],
              correctIndex: 1,
              explanation: "Exact ! Le bug est le défaut présent dans les lignes de code, même avant que le programme ne soit exécuté.",
            },
            {
              id: 2,
              question: "Un programme tourne sans planter et sans message d'erreur, mais affiche le total 100.20 € au lieu de 120 €. De quel type d'erreur s'agit-il ?",
              options: [
                "Une erreur de syntaxe.",
                "Une erreur réseau HTTP 404.",
                "Une erreur de logique (ou anomalie sémantique).",
                "Un plantage du disque dur.",
              ],
              correctIndex: 2,
              explanation: "Très bien ! C'est une erreur logique : le code est syntaxiquement valide et ne crash pas, mais le calcul mathématique est faux.",
            },
            {
              id: 3,
              question: "Quelle est l'utilité principale de la méthode des « 5 Pourquoi » ?",
              options: [
                "Poser 5 questions pour savoir qui licencier dans l'équipe.",
                "Remonter la chaîne des symptômes pour démasquer la véritable cause racine.",
                "Ralentir le développement logiciel de 5 jours.",
                "Demander 5 fois à l'utilisateur de redémarrer son ordinateur.",
              ],
              correctIndex: 1,
              explanation: "Parfait ! Les 5 Pourquoi permettent de ne pas s'arrêter au symptôme visible et d'atteindre l'origine première du problème.",
            },
            {
              id: 4,
              question: "Quelle est la différence entre une « anomalie » et une « erreur » ?",
              options: [
                "Une erreur est un événement d'interruption technique (exception, statut HTTP), tandis qu'une anomalie est un écart constaté par rapport aux exigences sans forcément planter.",
                "Il n'y a aucune différence, ce sont exactement les mêmes mots.",
                "L'anomalie n'arrive que sur Windows et l'erreur que sur Mac.",
                "Une anomalie est un bug corrigé, une erreur est un bug non corrigé.",
              ],
              correctIndex: 0,
              explanation: "Exactement ! Une anomalie peut survenir dans un programme qui tourne parfaitement sans lever la moindre exception (ex: format de date non conforme).",
            },
            {
              id: 5,
              question: "Quel élément est indispensable dans un rapport d'anomalie professionnel ?",
              options: [
                "Une capture d'écran du fond d'écran de l'ordinateur.",
                "Les étapes précises de reproduction et le comportement attendu vs observé.",
                "Uniquement la phrase « ça ne marche pas ».",
                "Le montant du salaire du développeur.",
              ],
              correctIndex: 1,
              explanation: "Bravo ! Des étapes de reproduction claires et la comparaison entre attendu et observé permettent à n'importe quel membre de l'équipe d'isoler le bug rapidement.",
            },
          ]}
        />
      </section>
    </div>
  );
};
