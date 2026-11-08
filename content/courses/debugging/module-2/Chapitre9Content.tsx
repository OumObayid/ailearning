'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { StepDebuggerSandbox } from '@/components/interactive/StepDebuggerSandbox';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Exécution pas à pas : Step Into, Step Over et Step Out
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser les trois commandes fondamentales du débogage pas à pas.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Naviguer avec aisance entre les fonctions sans poser des dizaines de breakpoints.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Observer l&apos;évolution précise des variables à chaque ligne franchie.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser les raccourcis claviers F8, F10, F11 et Shift+F11 comme un pro.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 3 commandes */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les trois commandes cardinales du débogueur
        </h2>

        {/* Step Into */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">1</span>
            Step Into (Entrer dans la fonction) — Raccourci F11
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Exécute l&apos;instruction courante et, si celle-ci contient un appel de fonction, déplace immédiatement l&apos;interpréteur à la première ligne de cette fonction pour inspecter ses arguments et son corps :
          </p>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image37.jpeg"
              alt="Bouton Step Into mis en surbrillance dans la barre d'outils du débogueur"
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.9.1 — Commande Step Into (F11) : descente dans la fonction appelée.
            </div>
          </div>
        </div>

        {/* Step Over */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">2</span>
            Step Over (Passer au-dessus) — Raccourci F10
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Exécute la ligne courante en bloc sans entrer dans le corps des fonctions appelées. L&apos;interpréteur s&apos;arrête directement à la ligne suivante dans le contexte actif. Idéal quand la fonction appelée est une bibliothèque tierce sûre ou déjà validée :
          </p>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
            <Image
              src="/images/cours/debugging/module-2/image38.jpeg"
              alt="Bouton Step Over dans Microsoft Edge et Chrome DevTools"
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
              Figure 2.9.2 — Commande Step Over (F10) : exécution atomique de la ligne sans entrer dans les détails.
            </div>
          </div>
        </div>

        {/* Step Out */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">3</span>
            Step Out (Sortir de la fonction) — Raccourci Shift + F11
          </h3>
          <p className="text-base text-slate-800 font-medium">
            Termine immédiatement l&apos;exécution de la fonction courante jusqu&apos;à son instruction <code className="font-mono">return</code> et replace le débogueur juste après l&apos;appel dans la fonction appelante :
          </p>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
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

      {/* 3. Matrice de décision */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Matrice de décision du débogueur
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Situation du diagnostic</th>
                <th className="p-3.5">Commande optimale</th>
                <th className="p-3.5">Raccourci</th>
                <th className="p-3.5">Raisonnement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Je suspecte une anomalie dans le calcul interne d&apos;une fonction</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Step Into</td>
                <td className="p-3.5 font-mono">F11</td>
                <td className="p-3.5">Je veux observer chaque ligne de cette fonction et vérifier ses paramètres.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">La fonction appelée est un utilitaire standard connu (<code className="font-mono">Math.round</code>, <code className="font-mono">lodash</code>)</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Step Over</td>
                <td className="p-3.5 font-mono">F10</td>
                <td className="p-3.5">Inutile de perdre du temps dans les entrailles d&apos;une bibliothèque externe éprouvée.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Je suis entré par mégarde dans une boucle longue ou j&apos;ai compris le calcul</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Step Out</td>
                <td className="p-3.5 font-mono">Shift + F11</td>
                <td className="p-3.5">Je laisse la fonction finir et je remonte directement dans la fonction parente.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">J&apos;ai terminé mon examen local et veux avancer jusqu&apos;à l&apos;incident suivant</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">Resume</td>
                <td className="p-3.5 font-mono">F8</td>
                <td className="p-3.5">Le moteur reprend à pleine vitesse jusqu&apos;au prochain breakpoint.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Cas pratique guidé */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Cas pratique guidé : traquer un argument erroné
        </h2>
        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <div className="text-rose-400 font-bold"># Code avec bug logique sournois :</div>
          <pre className="text-slate-300">{`function calculateFinalPrice(price, quantity) {
  const subtotal = calculateSubtotal(price, quantity); // 100 * 2 = 200
  const discount = calculateDiscount(subtotal);        // 200 * 0.10 = 20
  
  // ❌ ERREUR : on passe 'price' (100) au lieu de 'subtotal' (200) !
  const tax = calculateTax(price); 
  
  return subtotal - discount + tax; // 200 - 20 + 20 = 200 (au lieu de 220)
}`}</pre>
        </div>
        <p className="text-sm text-slate-800 font-medium">
          En utilisant <strong>Step Into</strong> sur <code className="font-mono text-emerald-700">calculateTax()</code>, on découvre avec stupéfaction que le paramètre reçu vaut <code className="font-mono text-rose-700">100</code> au lieu de <code className="font-mono text-emerald-700">200</code>. Le problème n&apos;était pas dans la formule mathématique de la taxe, mais dans l&apos;argument transmis par la fonction appelante !
        </p>
      </section>

      {/* Simulateur Interactif de Pas à Pas */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="search" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Bac à Sable Interactif : Maîtrise des commandes de Step
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Prenez les commandes du débogueur virtuel ci-dessous : activez des breakpoints en cliquant sur les numéros de ligne, puis utilisez les boutons <strong className="text-emerald-700">Step Over (F10)</strong>, <strong className="text-emerald-700">Step Into (F11)</strong> et <strong className="text-emerald-700">Step Out</strong> pour observer en temps réel la pile d&apos;appels (Call Stack) et les variables de portée (Scope) :
        </p>
        <StepDebuggerSandbox />
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.9
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle commande du débogueur permet d'entrer à l'intérieur d'une fonction appelée ?",
              options: [
                "Step Over (F10)",
                "Step Into (F11)",
                "Step Out (Shift + F11)",
                "Resume (F8)"
              ],
              correctIndex: 1,
              explanation: "Step Into descend à l'intérieur de la fonction appelée pour examiner son exécution pas à pas."
            },
            {
              id: 2,
              question: "Vous souhaitez exécuter une ligne contenant un appel à une bibliothèque externe sans inspecter ses sous-fonctions. Quelle commande utiliser ?",
              options: [
                "Step Over (F10)",
                "Step Into (F11)",
                "Restart",
                "Stop"
              ],
              correctIndex: 0,
              explanation: "Step Over évalue la fonction appelée en tant qu'instruction unitaire et s'arrête à la ligne suivante dans le contexte courant."
            },
            {
              id: 3,
              question: "Vous êtes à l'intérieur d'une fonction et souhaitez terminer son exécution pour revenir à son appelant. Quelle commande utiliser ?",
              options: [
                "Step Into",
                "Step Over",
                "Step Out (Shift + F11)",
                "Deactivate breakpoints"
              ],
              correctIndex: 2,
              explanation: "Step Out exécute le reste de la fonction courante jusqu'au return et suspend l'exécution dans la fonction appelante."
            },
            {
              id: 4,
              question: "Pourquoi est-il déconseillé d'utiliser Step Into sur toutes les lignes sans distinction ?",
              options: [
                "Cela supprime le code source",
                "Cela fait entrer inutilement le débogueur dans des centaines de fichiers internes de frameworks ou bibliothèques",
                "Le navigateur plante systématiquement",
                "La console s'efface"
              ],
              correctIndex: 1,
              explanation: "Un ingénieur chevronné utilise Step Over pour les fonctions déjà fiables et réserve Step Into uniquement aux fonctions métier suspectes."
            }
          ]}
        />
      </section>
    </div>
  );
};
