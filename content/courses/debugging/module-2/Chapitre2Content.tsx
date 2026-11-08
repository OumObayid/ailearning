'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Maîtriser les outils de développement Chrome DevTools
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
            <span>Ouvrir et configurer Chrome DevTools avec les raccourcis professionnels.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Inspecter et modifier dynamiquement le DOM et les styles CSS calculés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer les échanges réseau HTTP et les codes de statut dans Network.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Inspecter les jetons d&apos;authentification dans Local Storage et Cookies.</span>
          </li>
        </ul>
      </section>

      {/* 2. Présentation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Présentation de Chrome DevTools
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Chrome DevTools est une suite d&apos;outils intégrée au navigateur permettant d&apos;observer, de profiler et de modifier une application Web en temps réel pendant son exécution.
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image5.jpeg"
            alt="Les 4 panneaux majeurs de Chrome DevTools : Elements, Console, Performance et Network"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.1 — Vue synthétique des 4 panneaux majeurs : Elements (DOM), Console (JS), Performance (profilage) et Network (HTTP).
          </div>
        </div>
      </section>

      {/* 3. Ouvrir DevTools */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Méthodes d&apos;ouverture et raccourcis clavier
        </h2>
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Raccourci Windows / Linux</th>
                <th className="p-3.5">Raccourci macOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Ouvrir DevTools</td>
                <td className="p-3.5 font-mono text-emerald-700">F12 ou Ctrl + Shift + I</td>
                <td className="p-3.5 font-mono text-emerald-700">Cmd + Option + I</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Inspecter directement un élément</td>
                <td className="p-3.5 font-mono text-emerald-700">Ctrl + Shift + C</td>
                <td className="p-3.5 font-mono text-emerald-700">Cmd + Option + C</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-950">Ouvrir directement la Console</td>
                <td className="p-3.5 font-mono text-emerald-700">Ctrl + Shift + J</td>
                <td className="p-3.5 font-mono text-emerald-700">Cmd + Option + J</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Interface de DevTools */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Organisation de l&apos;interface de DevTools
        </h2>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image6.jpeg"
            alt="Barre d'onglets de Chrome DevTools avec navigation des panneaux"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.2 — Navigation dans les panneaux Chrome DevTools avec bascule vers la version mobile / responsive.
          </div>
        </div>
      </section>

      {/* 5. Elements */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Le panneau Elements : inspecter HTML et CSS
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Le panneau Elements présente l&apos;arbre DOM vivant (Document Object Model) à gauche, et les règles CSS appliquées ainsi que le modèle de boîte (Box Model) à droite.
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image7.jpeg"
            alt="Panneau Elements avec Box Model margin padding border et styles calculés"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.3 — Panneau Elements : arbre DOM à gauche et modèle de boîte CSS (margin, border, padding) à droite.
          </div>
        </div>
        <Callout type="note" title="Styles vs Computed">
          L&apos;onglet <strong>Styles</strong> affiche toutes les déclarations CSS appliquées (avec les règles barrées en cas de surcharge de spécificité). L&apos;onglet <strong>Computed</strong> indique la valeur géométrique finale calculée en pixels par le moteur de rendu du navigateur.
        </Callout>
      </section>

      {/* 6. Console */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Le panneau Console : examiner les erreurs JavaScript
        </h2>
        <p className="text-base text-slate-800 font-medium">
          La console affiche les erreurs d&apos;exécution JavaScript, les avertissements et permet d&apos;évaluer des expressions dynamiquement dans le contexte de la page active :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image8.jpeg"
            alt="Erreur Uncaught TypeError affichée dans la Console DevTools"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.4 — Console DevTools : détection immédiate d&apos;un Uncaught TypeError à index.js:2:4.
          </div>
        </div>
      </section>

      {/* 7. Sources */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Le panneau Sources : examiner et déboguer le code
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Sources donne accès à l&apos;arborescence des scripts chargés, permet de poser des points d&apos;arrêt (breakpoints) et d&apos;inspecter les variables d&apos;exécution pas à pas :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image9.jpeg"
            alt="Panneau Sources avec arborescence des fichiers, breakpoints et call stack"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.5 — Sources : inspection du code source, points d&apos;arrêt (breakpoints), Scope et Call Stack.
          </div>
        </div>
      </section>

      {/* 8. Network */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Le panneau Network : analyser les flux HTTP
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Network consigne chaque ressource demandée par le navigateur. C&apos;est la tour de contrôle pour diagnostiquer les API REST :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image10.jpeg"
            alt="Panneau Network de DevTools affichant une requête avec Status Code 200 OK"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.6 — Network : liste des requêtes, méthodes HTTP, code de statut (200 OK) et onglets Headers/Response.
          </div>
        </div>
      </section>

      {/* 9. Application */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Le panneau Application : stockage client &amp; sessions
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Permet de vérifier la présence et la validité des tokens d&apos;authentification JWT, sessions et données locales :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image11.jpeg"
            alt="Panneau Application montrant Local Storage, Session Storage et Cookies"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.7 — Application : arborescence de stockage client (Local Storage, Session Storage, Cookies, IndexedDB).
          </div>
        </div>
      </section>

      {/* 10. Performance & Memory */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Les panneaux Performance et Memory
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">Performance (Profilage CPU &amp; FPS)</h3>
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image12.jpeg"
                alt="Panneau Performance avec Flame Chart et tâches bloquantes"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">Enregistrement des tâches JavaScript longues bloquant le Main Thread.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">Memory (Heap Snapshots &amp; Fuites)</h3>
            <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
              <Image
                src="/images/cours/debugging/module-2/image13.jpeg"
                alt="Panneau Memory avec Heap Snapshot et rétention d'objets"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-slate-600">Capture d&apos;instantanés de la mémoire Heap V8 pour traquer les fuites mémoires.</p>
          </div>
        </div>
      </section>

      {/* 11. Cas pratique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          11. Cas pratique guidé : diagnostiquer une erreur dans index.html
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Considérons une page Web minimale où un clic sur un bouton est censé lister des utilisateurs :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image14.jpeg"
            alt="Page web minimale de test avec bouton Click me"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.2.8 — Exemple de page web minimale utilisée pour reproduire le comportement sous DevTools.
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <div className="text-emerald-400 font-bold"># Code défectueux :</div>
          <pre className="text-slate-300">{`const users = [
  { name: "Ahmed", age: 25 },
  { name: "Sara", age: 30 }
];

document.getElementById("loadUsers").addEventListener("click", () => {
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.username; // ❌ BUG : la propriété réelle est user.name !
    list.appendChild(li);
  });
});`}</pre>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-sm text-slate-800">
          <strong className="text-slate-950 block">Investigation méthodique avec DevTools :</strong>
          <ol className="list-decimal pl-5 space-y-1 font-medium">
            <li><strong>Elements :</strong> on observe que les balises <code className="text-emerald-700 bg-white px-1 rounded">&lt;li&gt;&lt;/li&gt;</code> sont créées mais restent vides.</li>
            <li><strong>Sources :</strong> on inspecte la ligne d&apos;affectation et on compare avec la structure de l&apos;objet.</li>
            <li><strong>Console :</strong> on tape <code className="text-emerald-700 bg-white px-1 rounded">users[0].username</code> → retourne <code className="text-rose-600">undefined</code>, alors que <code className="text-emerald-700 bg-white px-1 rounded">users[0].name</code> retourne <code className="text-emerald-700">&quot;Ahmed&quot;</code>.</li>
            <li><strong>Correction :</strong> remplacer <code className="text-emerald-700 bg-white px-1 rounded">user.username</code> par <code className="text-emerald-700 bg-white px-1 rounded">user.name</code>.</li>
          </ol>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.2
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel panneau permet d'inspecter la structure HTML du DOM et les styles CSS appliqués ?",
              options: [
                "Network",
                "Elements",
                "Application",
                "Performance"
              ],
              correctIndex: 1,
              explanation: "Elements affiche l'arbre DOM complet et permet d'inspecter ou d'altérer les règles CSS en direct."
            },
            {
              id: 2,
              question: "Vous souhaitez examiner la réponse JSON brute retournée par votre API REST. Quel panneau utiliser ?",
              options: [
                "Network",
                "Elements",
                "Memory",
                "Security"
              ],
              correctIndex: 0,
              explanation: "Le panneau Network liste toutes les requêtes HTTP et permet d'inspecter l'onglet Response pour voir le JSON brut renvoyé par le backend."
            },
            {
              id: 3,
              question: "Où pouvez-vous examiner et modifier les clés enregistrées dans Local Storage ?",
              options: [
                "Sources",
                "Performance",
                "Application",
                "Elements"
              ],
              correctIndex: 2,
              explanation: "Le panneau Application regroupe tous les mécanismes de stockage client : Local Storage, Session Storage, Cookies et IndexedDB."
            },
            {
              id: 4,
              question: "Quel panneau permet de poser un point d'arrêt (breakpoint) sur une ligne de code JavaScript ?",
              options: [
                "Sources",
                "Network",
                "Security",
                "Application"
              ],
              correctIndex: 0,
              explanation: "Le panneau Sources permet de naviguer dans les fichiers scripts du projet et de cliquer sur les numéros de ligne pour ajouter des breakpoints."
            },
            {
              id: 5,
              question: "Une page Web subit des saccades et consomme de plus en plus de mémoire RAM au fil du temps. Quels panneaux permettent d'investiguer ?",
              options: [
                "Elements uniquement",
                "Performance et Memory",
                "Network uniquement",
                "Application uniquement"
              ],
              correctIndex: 1,
              explanation: "Performance enregistre les blocages du Main Thread tandis que Memory permet d'analyser les Heap Snapshots pour isoler les fuites mémoires."
            },
            {
              id: 6,
              question: "Vous constatez qu'un appel d'API retourne un code d'erreur HTTP 404 Not Found. Quel panneau utiliser pour vérifier l'URL exacte appelée ?",
              options: [
                "Network",
                "Memory",
                "Elements",
                "Performance"
              ],
              correctIndex: 0,
              explanation: "Network consigne l'URL complète demandée, permettant de repérer immédiatement une faute de frappe dans la route d'API."
            }
          ]}
        />
      </section>
    </div>
  );
};
