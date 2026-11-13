'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { StepDebuggerSandbox } from '@/components/interactive/StepDebuggerSandbox';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 9 — Exécution pas à pas : Step Into, Step Over et Step Out
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Savoir poser un point d&apos;arrêt pour figer le temps est utile, mais piloter l&apos;exécution ligne par ligne sans jamais se perdre dans les bibliothèques tierces est le véritable super-pouvoir de l&apos;ingénieur. Maîtrisez les 3 touches cardinales de la télécommande (<kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300">F10</kbd>, <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300">F11</kbd>, <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300">Shift+F11</kbd>) et la liste d&apos;exclusion (Ignore List).
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          <span>1. Objectifs d&apos;apprentissage opérationnels</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-800">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">La métaphore de la télécommande :</strong>
              <span>Distinguer quand descendre dans une fonction (Step Into), quand la survoler (Step Over) et quand s&apos;échapper (Step Out).</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Éviter le piège de node_modules :</strong>
              <span>Configurer l&apos;Ignore List (Blackboxing) pour que le débogueur n&apos;entre jamais dans les entrailles de React ou Lodash.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Matrice de décision du diagnostic :</strong>
              <span>Choisir instantanément la bonne commande selon que le code appelé est suspect, fiable ou une boucle itérative.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Traque d&apos;argument erroné en direct :</strong>
              <span>Vérifier la transmission des paramètres d&apos;une fonction appelante à une fonction enfant pas à pas.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. La métaphore des 3 touches */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. La métaphore : Les 3 allures de l&apos;explorateur
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Imaginez que vous exploriez un sentier de randonnée en forêt. À chaque bifurcation menant vers une grotte souterraine (une fonction appelée), vous avez 3 choix :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-xs font-bold">F11</span>
              <strong className="text-emerald-950 text-sm">Step Into</strong>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              <strong>Allumer sa lampe et descendre dans la grotte :</strong> vous entrez à l&apos;intérieur de la fonction pour examiner chaque caillou (chaque ligne et variable locale).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-xs font-bold">F10</span>
              <strong className="text-blue-950 text-sm">Step Over</strong>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              <strong>Enjamber la grotte et continuer sur le sentier :</strong> la fonction s&apos;exécute en une fraction de seconde en arrière-plan, et vous vous arrêtez directement à la ligne suivante.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-mono text-xs font-bold">Shift + F11</span>
              <strong className="text-amber-950 text-sm">Step Out</strong>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              <strong>Prendre l&apos;ascenseur de secours pour remonter :</strong> vous êtes descendu dans une fonction trop longue, vous laissez le moteur terminer le travail et vous remontez au grand air chez le parent.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Les trois commandes cardinales */}
      <section className="space-y-6">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Les trois commandes cardinales dans Chrome DevTools
        </h2>

        {/* Step Into */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</span>
            <span>Step Into (Entrer dans la fonction) — Raccourci F11</span>
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Si la ligne sur laquelle vous êtes arrêté appelle une autre fonction (ex: <code className="font-mono text-slate-900">calculateTax(subtotal)</code>), <strong className="text-emerald-700">Step Into</strong> transporte immédiatement le curseur d&apos;exécution à la <strong>première ligne interne</strong> de cette fonction :
          </p>
          <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image37.jpeg"
              alt="Bouton Step Into mis en surbrillance dans la barre d'outils du débogueur"
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.9.1 — Commande Step Into (F11) : descente immédiate dans la fonction appelée pour inspecter ses arguments reçus.
            </div>
          </div>
        </div>

        {/* Step Over */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
            <span>Step Over (Passer au-dessus) — Raccourci F10</span>
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Exécute la ligne courante d&apos;un seul bloc atomique <strong>sans entrer dans les sous-fonctions</strong>. L&apos;interpréteur s&apos;arrête directement à la ligne suivante dans le fichier en cours. C&apos;est la commande que vous utiliserez <strong>80% du temps</strong> :
          </p>
          <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image38.jpeg"
              alt="Bouton Step Over dans Microsoft Edge et Chrome DevTools"
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.9.2 — Commande Step Over (F10) : exécution globale de la ligne sans entrer dans les détails internes.
            </div>
          </div>
        </div>

        {/* Step Out */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold">3</span>
            <span>Step Out (Sortir de la fonction) — Raccourci Shift + F11</span>
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Termine immédiatement l&apos;exécution de la fonction courante jusqu&apos;à son instruction <code className="font-mono text-slate-900">return</code> et replace le débogueur juste après la ligne d&apos;appel dans la fonction parente :
          </p>
          <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image39.jpeg"
              alt="Bouton Step Out dans Chrome DevTools"
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.9.3 — Commande Step Out (Shift + F11) : sortie immédiate vers la fonction appelante.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Le piège fatal des débutants : Ignore List (Blackboxing) */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Le piège fatal : Comment ne pas se noyer dans node_modules ?
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Voici le scénario catastrophe vécu par tout débutant : vous êtes sur <code className="font-mono">useState()</code> ou <code className="font-mono">fetch()</code>, vous appuyez sur <kbd className="bg-white px-1 border rounded">F11</kbd> (Step Into), et <strong>BOUUM</strong> : vous vous retrouvez propulsé au milieu de 12 000 lignes de code minifié de React ou de Next.js !
        </p>

        <Callout type="tip" title="La solution d'ingénieur : L'Ignore List (Blackboxing)">
          <p className="text-sm leading-relaxed">
            Pour empêcher définitivement le débogueur de plonger dans les bibliothèques externes, faites un clic droit sur le fichier dans l&apos;onglet Sources et cliquez sur <strong>&quot;Add script to ignore list&quot;</strong>.<br />
            Mieux encore : dans les paramètres de DevTools (<kbd className="bg-white px-1 border rounded">F1</kbd> &gt; <em>Ignore List</em>), ajoutez la règle <code className="font-mono text-emerald-800 font-bold">/node_modules/</code>. Désormais, <kbd className="bg-white px-1 border rounded">F11</kbd> n&apos;entrera <strong>QUE dans votre propre code</strong>, sautant automatiquement toute la plomberie interne des frameworks !
          </p>
        </Callout>
      </section>

      {/* 5. Matrice de décision */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Matrice de décision universelle du débogueur
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Situation du diagnostic</th>
                <th className="p-3.5">Commande optimale</th>
                <th className="p-3.5">Raccourci</th>
                <th className="p-3.5">Raisonnement d&apos;ingénieur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Je suspecte une anomalie dans le calcul interne d&apos;une fonction métier</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Step Into</td>
                <td className="p-3.5 font-mono font-bold">F11</td>
                <td className="p-3.5 text-xs text-slate-600">Je veux observer chaque ligne de cette fonction et vérifier ses paramètres reçus.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">La fonction appelée est un utilitaire standard connu (<code className="font-mono">Math.round</code>, <code className="font-mono">lodash</code>)</td>
                <td className="p-3.5 font-mono text-blue-700 font-bold">Step Over</td>
                <td className="p-3.5 font-mono font-bold">F10</td>
                <td className="p-3.5 text-xs text-slate-600">Inutile de perdre du temps dans les entrailles d&apos;une bibliothèque externe éprouvée.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Je suis entré par mégarde dans une boucle longue ou j&apos;ai compris le calcul</td>
                <td className="p-3.5 font-mono text-amber-700 font-bold">Step Out</td>
                <td className="p-3.5 font-mono font-bold">Shift + F11</td>
                <td className="p-3.5 text-xs text-slate-600">Je laisse la fonction finir et je remonte directement dans la fonction appelante.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">J&apos;ai terminé mon examen local et veux avancer jusqu&apos;à l&apos;incident suivant</td>
                <td className="p-3.5 font-mono text-purple-700 font-bold">Resume</td>
                <td className="p-3.5 font-mono font-bold">F8</td>
                <td className="p-3.5 text-xs text-slate-600">Le moteur reprend à pleine vitesse jusqu&apos;au prochain point d&apos;arrêt actif.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Cas pratique guidé */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          6. Cas pratique guidé : Traquer un argument erroné pas à pas
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Considérons une fonction de facturation qui calcule un total erroné de <strong>200,00 €</strong> au lieu de <strong>220,00 €</strong> :
        </p>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-rose-700">Code avec bug logique sournois :</span>
          <CodeBlock
            language="javascript"
            code={`function calculateFinalPrice(price, quantity) {
  // Ligne 1 : prix = 100, quantite = 2
  const subtotal = calculateSubtotal(price, quantity); // -> 200 €
  const discount = calculateDiscount(subtotal);        // -> 20 €
  
  // ❌ ERREUR : Le développeur a passé 'price' (100) au lieu de 'subtotal' (200) !
  const tax = calculateTax(price); // Taxe calculée sur 100 € (20 €) au lieu de 200 € (40 €) !
  
  return subtotal - discount + tax; // 200 - 20 + 20 = 200 € (au lieu de 220 €) !
}`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3 text-xs text-slate-800">
          <strong className="text-slate-950 block font-bold text-sm">
            La chorégraphie pas-à-pas de l&apos;ingénieur avec DevTools :
          </strong>
          <ol className="list-decimal pl-5 space-y-1.5 font-medium">
            <li>On pose un breakpoint sur la ligne <code className="font-mono bg-white px-1 rounded">const subtotal = ...</code>.</li>
            <li>On appuie sur <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold">F10</kbd> (Step Over) : <code className="font-mono text-emerald-700">subtotal</code> vaut 200. Tout va bien.</li>
            <li>On appuie sur <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold">F10</kbd> (Step Over) : <code className="font-mono text-emerald-700">discount</code> vaut 20. Tout va bien.</li>
            <li>Sur la ligne <code className="font-mono bg-white px-1 rounded">calculateTax(price)</code>, on appuie sur <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold text-emerald-700">F11</kbd> (Step Into).</li>
            <li><strong>Révélation immédiate :</strong> dans le scope de <code className="font-mono">calculateTax</code>, le paramètre reçu vaut <strong>100</strong> au lieu de <strong>200</strong> !</li>
            <li>On appuie sur <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold text-amber-700">Shift + F11</kbd> (Step Out) pour remonter chez l&apos;appelant et remplacer immédiatement <code className="font-mono text-rose-700">price</code> par <code className="font-mono text-emerald-700">subtotal</code>.</li>
          </ol>
        </div>
      </section>

      {/* 7. Simulateur Interactif de Pas à Pas */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[20px] font-bold text-slate-900">
            7. Bac à Sable Interactif : Maîtrise des commandes de Step
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Prenez les commandes du débogueur virtuel ci-dessous : activez des breakpoints en cliquant sur les numéros de ligne, puis utilisez les boutons <strong className="text-emerald-700">Step Over (F10)</strong>, <strong className="text-emerald-700">Step Into (F11)</strong> et <strong className="text-emerald-700">Step Out</strong> pour observer en temps réel la pile d&apos;appels (Call Stack) et les variables de portée (Scope) :
        </p>
        <StepDebuggerSandbox />
      </section>

      {/* 8. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>8. Quiz de validation — Chapitre 9</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle commande du débogueur permet d'entrer à l'intérieur du corps d'une fonction appelée pour l'inspecter ligne par ligne ?",
              options: [
                "Step Over (F10)",
                "Step Into (F11)",
                "Step Out (Shift + F11)",
                "Resume (F8)"
              ],
              correctIndex: 1,
              explanation: "Step Into (F11) déplace le pointeur d'exécution à la première ligne de la fonction appelée."
            },
            {
              id: 2,
              question: "Vous êtes arrêté sur une ligne appelant 'Math.round(valeur)'. Quelle commande devez-vous utiliser ?",
              options: [
                "Step Over (F10)",
                "Step Into (F11)",
                "Restart (Ctrl + Shift + F5)",
                "Step Out (Shift + F11)"
              ],
              correctIndex: 0,
              explanation: "Math.round est une fonction native du moteur V8. Utiliser Step Over (F10) évite de perdre du temps sur du code standard déjà éprouvé."
            },
            {
              id: 3,
              question: "Vous êtes descendu par erreur à l'intérieur d'une longue fonction utilitaire. Comment remonter immédiatement dans la fonction appelante ?",
              options: [
                "Step Into (F11)",
                "Step Over (F10)",
                "Step Out (Shift + F11)",
                "Fermer DevTools"
              ],
              correctIndex: 2,
              explanation: "Step Out (Shift + F11) laisse la fonction courante terminer son exécution et replace le débogueur juste après la ligne d'appel chez l'appelant."
            },
            {
              id: 4,
              question: "Quelle fonctionnalité de Chrome DevTools permet d'empêcher Step Into de plonger dans les fichiers de 'node_modules' ?",
              options: [
                "L'Ignore List (Blackboxing)",
                "Le mode incognito",
                "Disable Cache",
                "Preserve Log"
              ],
              correctIndex: 0,
              explanation: "L'Ignore List (anciennement Blackbox) permet d'ignorer automatiquement des dossiers comme /node_modules/ pour ne déboguer que votre propre code."
            },
            {
              id: 5,
              question: "Quelle touche permet de reprendre l'exécution à pleine vitesse (Resume) jusqu'au prochain point d'arrêt dans Chrome DevTools ?",
              options: [
                "F1",
                "F8",
                "F10",
                "F12"
              ],
              correctIndex: 1,
              explanation: "F8 (ou le bouton bleu Play) reprend l'exécution jusqu'au prochain breakpoint ou jusqu'à la fin du script."
            },
            {
              id: 6,
              question: "Si une ligne de code contient 'const total = a + b;' (sans aucun appel de fonction), quel est le comportement de Step Into (F11) ?",
              options: [
                "Il provoque une erreur de syntaxe",
                "Il se comporte exactement comme un Step Over (F10) et passe à la ligne suivante",
                "Il redémarre le script",
                "Il attend un clic utilisateur"
              ],
              correctIndex: 1,
              explanation: "S'il n'y a aucune fonction dans laquelle descendre, Step Into avance simplement à la prochaine instruction, tout comme Step Over."
            }
          ]}
        />
      </section>
    </div>
  );
};
