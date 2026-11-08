'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { DebuggingConsoleSimulator } from '@/components/interactive/DebuggingConsoleSimulator';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 5 — Utilisation professionnelle de console.log(), error() et table()
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
            <span>Utiliser les méthodes de journalisation avec des messages explicites.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Formater les tableaux d&apos;objets avec console.table() et filtrer les colonnes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Regrouper les logs avec console.group() et console.groupCollapsed().</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Sécuriser les logs en évitant toute fuite de mots de passe ou tokens d&apos;API.</span>
          </li>
        </ul>
      </section>

      {/* 2. console.error */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Signaler des erreurs avec console.error()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Contrairement à un simple message informatif, <code className="font-mono text-emerald-700">console.error()</code> attire immédiatement l&apos;œil du développeur avec une coloration rouge distinctive et génère une trace d&apos;exécution :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image20.jpeg"
            alt="Affichage d'un message d'erreur rouge avec console.error dans Chrome DevTools"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.5.1 — Rendu visuel d&apos;un appel console.error() dans la console de développement.
          </div>
        </div>
      </section>

      {/* 3. console.table */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Analyser les collections d&apos;objets avec console.table()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsque vous recevez une liste d&apos;utilisateurs ou un panier de produits depuis une API, développer un à un chaque objet est fastidieux. <code className="font-mono text-emerald-700">console.table()</code> génère une grille interactive triable en colonnes :
        </p>
        <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image21.jpeg"
            alt="Tableau tabulaire généré par console.table montrant id, name, price et inStock"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.5.2 — Visualisation avec console.table() : colonnes index, id, name, price et inStock triables d&apos;un clic.
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <div className="text-emerald-400 font-bold"># Filtrer les colonnes pour ne pas surcharger :</div>
          <pre className="text-slate-300">{`const products = [
  { id: 1, name: "Clavier", price: 200, stock: 15, category: "Hardware", supplierId: 99 },
  { id: 2, name: "Souris", price: 100, stock: 0, category: "Hardware", supplierId: 99 }
];

// N'afficher que les colonnes 'name' et 'stock' dans la console :
console.table(products, ["name", "stock"]);`}</pre>
        </div>
      </section>

      {/* 4. Organisation hiérarchique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Structuration hiérarchique avec console.group()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Sur les flux de traitement complexes, regroupez logiquement vos logs pour éviter le bruit visuel :
        </p>
        <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <pre className="text-slate-300">{`console.groupCollapsed("📦 Diagnostic de la commande #8824");
console.log("Client ID :", 42);
console.log("Statut :", "PENDING_PAYMENT");
console.table(orderItems);
console.groupEnd();`}</pre>
        </div>
        <p className="text-sm text-slate-700 font-medium">
          <code className="font-mono">console.groupCollapsed()</code> crée un bloc accordéon initialement fermé que l&apos;ingénieur peut déplier à la demande sans encombrer la console.
        </p>
      </section>

      {/* 5. Sécurité et Bonnes pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Sécurité des logs et bonnes pratiques professionnelles
        </h2>
        <Callout type="warning" title="Règle absolue de sécurité">
          Ne journalisez <strong>JAMAIS</strong> de données confidentielles ou d&apos;identifiants de sécurité : mots de passe en clair, tokens d&apos;authentification JWT, clés d&apos;API tierces, numéros de cartes bancaires ou données personnelles sensibles (PII).
        </Callout>

        <div className="overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-900 font-black">
              <tr>
                <th className="p-3.5">Pratique déconseillée ❌</th>
                <th className="p-3.5">Pratique recommandée ✅</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-rose-700">console.log(user);</td>
                <td className="p-3.5 font-mono text-emerald-700">console.log(&quot;Utilisateur récupéré :&quot;, user.id, user.role);</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-rose-700">console.log(&quot;Payload :&quot;, req.body); // Contient password !</td>
                <td className="p-3.5 font-mono text-emerald-700">const &#123; password, ...safe &#125; = req.body; console.log(safe);</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5">Laisser des dizaines de logs temporaires en production</td>
                <td className="p-3.5">Utiliser un logger structuré (Pino/Winston) avec niveaux filtrés selon <code className="text-slate-800 font-mono">NODE_ENV</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Simulateur Interactif de Console */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[19px] font-bold text-slate-900">
            Simulateur pratique : Console DevTools & Formatage Tabulaire
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Manipulez directement la console émulée ci-dessous pour observer la différence entre un affichage brut, un tableau structuré avec <code className="text-emerald-700 font-mono font-bold">console.table()</code>, et l&apos;inspection d&apos;une stack trace en cas d&apos;exception :
        </p>
        <DebuggingConsoleSimulator />
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 2.5
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle méthode de console est la plus adaptée pour analyser visuellement un tableau d'objets ?",
              options: [
                "console.error()",
                "console.table()",
                "console.clear()",
                "console.count()"
              ],
              correctIndex: 1,
              explanation: "console.table() formate automatiquement les collections d'objets sous la forme d'un tableau synthétique avec colonnes triables."
            },
            {
              id: 2,
              question: "Comment restreindre l'affichage d'un tableau à certaines propriétés spécifiques avec console.table ?",
              options: [
                "En passant un second paramètre contenant un tableau des noms de clés souhaitées (ex: console.table(users, ['name', 'age']))",
                "Ce n'est pas possible, toutes les colonnes s'affichent toujours",
                "En utilisant un fichier CSS externe",
                "En supprimant les propriétés de l'objet en mémoire"
              ],
              correctIndex: 0,
              explanation: "Le second argument optionnel de console.table(data, columns) permet de spécifier un tableau de chaînes désignant les colonnes à afficher."
            },
            {
              id: 3,
              question: "Où s'affichent normalement les instructions de log générées par une API Node.js / Express ?",
              options: [
                "Dans l'onglet Elements de Chrome",
                "Dans le terminal de la machine hôte où s'exécute le processus Node.js",
                "Dans le stockage Local Storage du navigateur",
                "Dans le fichier CSS compilé"
              ],
              correctIndex: 1,
              explanation: "Les logs émis par Node.js s'écrivent sur la sortie standard (stdout/stderr) du terminal serveur ou dans les fichiers de logging centralisés."
            },
            {
              id: 4,
              question: "Quelle pratique de journalisation présente un risque critique de sécurité ?",
              options: [
                "Ajouter des messages contextuels explicites",
                "Afficher des mots de passe, tokens JWT ou clés secrètes dans les journaux",
                "Utiliser console.table pour examiner des paniers d'achat",
                "Regrouper les logs avec console.group"
              ],
              correctIndex: 1,
              explanation: "Les logs sont souvent persistés dans des fichiers ou des outils d'agrégation d'équipe (Datadog, CloudWatch). Y inscrire des secrets compromet la sécurité du système."
            }
          ]}
        />
      </section>
    </div>
  );
};
