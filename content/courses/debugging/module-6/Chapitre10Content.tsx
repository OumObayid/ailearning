'use client';

import React from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre10Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Diagnostiquer les problèmes de permissions et d&apos;accès aux fichiers
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 6.10 — Diagnostiquer les problèmes de permissions et d&apos;accès aux fichiers
      </p>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        À la fin de ce chapitre, vous devez être capable de :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre les permissions des fichiers et dossiers sous Windows et Linux.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer les erreurs d&apos;accès dans une application Node.js.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les problèmes de lecture, d&apos;écriture et de suppression.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre les risques liés au Path Traversal.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corriger les problèmes de permissions sans compromettre la sécurité.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comprendre les permissions des fichiers
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un système d&apos;exploitation contrôle les utilisateurs et les processus qui peuvent accéder aux fichiers et dossiers.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les principales opérations sont :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Permission</th>
              <th className="px-4 py-3">Signification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Read (r)</td>
              <td className="px-4 py-2.5 font-medium">Lire un fichier.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Write (w)</td>
              <td className="px-4 py-2.5 font-medium">Modifier ou écrire dans un fichier.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Execute (x)</td>
              <td className="px-4 py-2.5 font-medium">Exécuter un fichier ou traverser un dossier sous Linux.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple concret :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une application Node.js doit enregistrer une image dans :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`project/
├── server.js
└── uploads/
Si le processus Node.js ne dispose pas du droit d'écriture sur uploads/, l'enregistrement échoue.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le code peut être correct : le problème vient des permissions du système.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Comprendre les erreurs d&apos;accès dans Node.js
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Node.js fournit plusieurs codes d&apos;erreurs utiles pour diagnostiquer les problèmes de fichiers.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Signification</th>
              <th className="px-4 py-3">Cause possible</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">EACCES</td>
              <td className="px-4 py-2.5 font-medium">Permission refusée</td>
              <td className="px-4 py-2.5 font-medium">Droits insuffisants.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">EPERM</td>
              <td className="px-4 py-2.5 font-medium">Opération non autorisée</td>
              <td className="px-4 py-2.5 font-medium">Restriction du système.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ENOENT</td>
              <td className="px-4 py-2.5 font-medium">Fichier ou dossier introuvable</td>
              <td className="px-4 py-2.5 font-medium">Chemin incorrect ou fichier absent.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">EEXIST</td>
              <td className="px-4 py-2.5 font-medium">Élément déjà existant</td>
              <td className="px-4 py-2.5 font-medium">Création d&apos;un fichier ou dossier existant.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">EISDIR</td>
              <td className="px-4 py-2.5 font-medium">Le chemin correspond à un dossier</td>
              <td className="px-4 py-2.5 font-medium">Opération incompatible.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">ENOTDIR</td>
              <td className="px-4 py-2.5 font-medium">Un élément du chemin n&apos;est pas un dossier</td>
              <td className="px-4 py-2.5 font-medium">Chemin incorrect.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">EMFILE</td>
              <td className="px-4 py-2.5 font-medium">Trop de fichiers ouverts par le processus</td>
              <td className="px-4 py-2.5 font-medium">Limite de descripteurs atteinte.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import fs from "node:fs/promises";

try {
await fs.writeFile("./uploads/test.txt", "Bonjour");
} catch (error) {
console.error("Code :", error.code);
console.error("Message :", error.message);
}
Si le dossier uploads n'existe pas, Node.js peut retourner ENOENT.
S'il existe mais que l'application ne peut pas y écrire, elle peut retourner EACCES ou EPERM.
Méthode de diagnostic : examiner d'abord error.code, puis vérifier le chemin et les permissions.`}</code></pre>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Diagnostiquer les permissions sous Windows
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Sous Windows, les permissions reposent principalement sur les ACL (Access Control Lists).
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Elles définissent les droits accordés aux utilisateurs et groupes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.1. Vérifier les permissions graphiquement
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ouvrir l&apos;Explorateur de fichiers.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Faire un clic droit sur le dossier concerné.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Sélectionner Propriétés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ouvrir l&apos;onglet Sécurité.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Sélectionner l&apos;utilisateur ou le groupe.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Examiner les permissions : lecture, écriture, modification, contrôle total.</span>
          </li>
        </ul>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image13.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ne donnez pas automatiquement le contrôle total à tout le monde pour corriger une erreur. Accordez uniquement les droits nécessaires au compte qui exécute l&apos;application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        4.2. Vérifier les permissions avec PowerShell
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Afficher les permissions :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Get-Acl .\\uploads | Format-List`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Afficher les informations d&apos;un processus Node.js :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Get-Process node`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vérifier l&apos;utilisateur courant :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`whoami`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces commandes permettent de mieux comprendre quel utilisateur exécute les opérations et quelles permissions sont configurées.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Diagnostiquer les permissions sous Linux
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Linux utilise généralement les permissions suivantes :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`r : lecture.
w : écriture.
x : exécution ou traversée du dossier.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces permissions sont définies pour trois catégories :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>User : propriétaire.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Group : groupe.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Others : autres utilisateurs.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.1. Lire les permissions
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`ls -l`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`-rw-r--r--  user  group  config.json
drwxr-xr-x  user  group  uploads`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Interprétation :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Élément</th>
              <th className="px-4 py-3">Signification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">-</td>
              <td className="px-4 py-2.5 font-medium">Fichier ordinaire.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">d</td>
              <td className="px-4 py-2.5 font-medium">Dossier.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">rw -</td>
              <td className="px-4 py-2.5 font-medium">Propriétaire : lecture et écriture.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">r --</td>
              <td className="px-4 py-2.5 font-medium">Groupe : lecture seule.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">r -x</td>
              <td className="px-4 py-2.5 font-medium">Lecture et traversée du dossier.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.2. Vérifier le propriétaire
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`whoami
ls -ld uploads`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        5.3. Modifier les permissions
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`chmod 755 uploads`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cela donne :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Propriétaire : lecture, écriture, exécution.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Groupe : lecture et exécution.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Autres : lecture et exécution.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour autoriser l&apos;écriture au propriétaire :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`chmod 755 uploads`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le propriétaire dispose déjà du droit d&apos;écriture avec cette configuration.
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Attention : éviter chmod 777 comme solution automatique. Cela accorde des droits très larges à tous les utilisateurs.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour changer le propriétaire, une commande comme celle-ci peut être utilisée :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`sudo chown appuser:appgroup uploads`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Elle doit être adaptée au véritable utilisateur qui exécute le backend.
      </p>
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative w-full h-72 sm:h-96">
          <Image src="/images/cours/debugging/module-6/image14.jpeg" alt="Illustration technique" fill className="object-contain" />
        </div>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Diagnostiquer les problèmes de chemins de fichiers dans Node.js
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une erreur fréquente consiste à utiliser un chemin relatif en supposant qu&apos;il est toujours calculé depuis le dossier du fichier JavaScript.
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`En réalité, ./ est généralement interprété depuis le répertoire courant du processus (process.cwd()).`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`await fs.writeFile("./uploads/image.txt", "Contenu");`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Si le serveur est lancé depuis un autre répertoire, Node.js peut chercher le dossier au mauvais endroit.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        6.1. Vérifier le répertoire courant
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`console.log(process.cwd());
6.2. Construire un chemin fiable avec import.meta.url
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer le dossier s&apos;il n&apos;existe pas :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import fs from "node:fs/promises";

await fs.mkdir(uploadDir, { recursive: true });`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette approche permet de construire un chemin indépendant du répertoire depuis lequel le serveur a été lancé.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Comprendre le Path Traversal
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vulnérabilité de sécurité
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le Path Traversal est une vulnérabilité qui permet à un utilisateur de tenter d&apos;accéder à des fichiers situés en dehors du répertoire prévu par l&apos;application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Elle apparaît souvent lorsqu&apos;un serveur utilise directement un nom de fichier fourni par l&apos;utilisateur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple vulnérable :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.get("/api/files/:filename", async (req, res) =&gt; {
const filename = req.params.filename;

const filePath = path.join(
process.cwd(),
"uploads",
filename
);

const content = await fs.readFile(filePath);

res.send(content);
});
Le développeur pense que l'utilisateur demandera uniquement des fichiers du dossier uploads.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Mais un attaquant peut tenter de manipuler le chemin avec des séquences comme :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`../`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces séquences permettent de remonter dans l&apos;arborescence des dossiers.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Par exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`uploads/../../config/.env`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Si aucune protection n&apos;est appliquée, le serveur risque de lire un fichier sensible.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        7.1. Corriger le Path Traversal
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une première protection consiste à vérifier que le chemin final reste à l&apos;intérieur du répertoire autorisé.
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import path from "node:path";
import fs from "node:fs/promises";

const uploadDir = path.resolve("uploads");

app.get("/api/files/:filename", async (req, res) =&gt; {
const filename = req.params.filename;

const filePath = path.resolve(uploadDir, filename);

if (
filePath === uploadDir ||
!filePath.startsWith(uploadDir + path.sep)
) {
return res.status(403).json({
message: "Accès interdit"
});
}

try {
const content = await fs.readFile(filePath);
res.send(content);

} catch (error) {
if (error.code === "ENOENT") {
return res.status(404).json({
message: "Fichier introuvable"
});
}

console.error(error);

res.status(500).json({
message: "Erreur interne"
});
}
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette vérification empêche les chemins qui sortent du dossier autorisé.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour les applications sensibles, il faut également prendre en compte les liens symboliques et les éventuelles différences de casse sous Windows. Une stratégie encore plus sûre consiste à ne jamais accepter un chemin fourni par l&apos;utilisateur : utilisez un identifiant de fichier stocké en base de données et retrouvez le chemin réel côté serveur.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Autres causes fréquentes de problèmes d&apos;accès aux fichiers
        </h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Problème</th>
              <th className="px-4 py-3">Diagnostic</th>
              <th className="px-4 py-3">Solution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Dossier inexistant</td>
              <td className="px-4 py-2.5 font-medium">ENOENT</td>
              <td className="px-4 py-2.5 font-medium">Créer le dossier.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Permissions insuffisantes</td>
              <td className="px-4 py-2.5 font-medium">EACCES</td>
              <td className="px-4 py-2.5 font-medium">Corriger les ACL ou permissions.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Fichier utilisé par un autre processus</td>
              <td className="px-4 py-2.5 font-medium">Particulièrement fréquent sous Windows</td>
              <td className="px-4 py-2.5 font-medium">Identifier le processus qui bloque le fichier.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Chemin relatif incorrect</td>
              <td className="px-4 py-2.5 font-medium">Vérifier process.cwd ( )</td>
              <td className="px-4 py-2.5 font-medium">Utiliser un chemin absolu.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Fichier trop volumineux</td>
              <td className="px-4 py-2.5 font-medium">Erreur mémoire ou limite applicative</td>
              <td className="px-4 py-2.5 font-medium">Utiliser des streams et limiter la taille.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Trop de fichiers ouverts</td>
              <td className="px-4 py-2.5 font-medium">EMFILE</td>
              <td className="px-4 py-2.5 font-medium">Fermer correctement les fichiers et limiter les ouvertures simultanées.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour éviter de charger entièrement les fichiers volumineux en mémoire, utiliser des streams :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import fs from "node:fs";

const stream = fs.createReadStream("./uploads/video.mp4");

stream.pipe(res);`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette méthode transmet progressivement le contenu au client.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. TP pratique — Diagnostiquer et sécuriser un accès aux fichiers
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TP pratique
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Difficulté : intermédiaire
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Objectif : créer une API qui permet de consulter les fichiers d'un dossier uploads, identifier une vulnérabilité Path Traversal et la corriger.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 1 — Préparer le projet
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`mkdir debug-files
cd debug-files
npm init -y
npm install express
Dans package.json, ajouter :
"type": "module"`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créer cette structure :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`debug-files/
├── server.js
├── uploads/
│   └── document.txt
└── private/
└── secret.txt
Contenu de document.txt :
Document public.
Contenu de secret.txt :
Informations confidentielles.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 2 — Créer une route vulnérable
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Dans server.js :
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";

const app = express();

app.get("/api/files/:filename", async (req, res) =&gt; {
try {
const filePath = path.join(
process.cwd(),
"uploads",
req.params.filename
);

const content = await fs.readFile(filePath, "utf8");

res.send(content);

} catch (error) {
console.error("Erreur :", error.code);

res.status(500).json({
message: "Erreur de lecture"
});
}
});

app.listen(3000, () =&gt; {
console.log("Serveur sur le port 3000");
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 3 — Tester le fonctionnement normal
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarrer :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`node server.js`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ouvrir :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`http://localhost:3000/api/files/document.txt`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat attendu :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Document public.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 4 — Identifier la vulnérabilité
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Dans un environnement local de test, essayer de demander le fichier secret.txt en manipulant le chemin avec ../.
Selon le système d'exploitation et la normalisation du chemin, le serveur vulnérable peut accéder au fichier situé hors de uploads.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le résultat attendu de ce test est de constater que le serveur ne limite pas correctement son accès au dossier public.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 5 — Corriger la route
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Remplacer la route précédente par :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`const uploadDir = path.resolve("uploads");

app.get("/api/files/:filename", async (req, res) =&gt; {
try {
const filePath = path.resolve(
uploadDir,
req.params.filename
);

if (!filePath.startsWith(uploadDir + path.sep)) {
return res.status(403).json({
message: "Accès interdit"
});
}

const content = await fs.readFile(filePath, "utf8");

res.send(content);

} catch (error) {
if (error.code === "ENOENT") {
return res.status(404).json({
message: "Fichier introuvable"
});
}

console.error("Erreur de lecture :", error.code);

res.status(500).json({
message: "Erreur interne"
});
}
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 6 — Vérifier la correction
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Résultat attendu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Accéder à document.txt</td>
              <td className="px-4 py-2.5 font-medium">200 — Lecture autorisée</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Accéder à un fichier inexistant</td>
              <td className="px-4 py-2.5 font-medium">404 — Introuvable</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Tenter de sortir de uploads</td>
              <td className="px-4 py-2.5 font-medium">403 — Accès interdit</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Corrigé : la cause racine était l&apos;utilisation directe d&apos;une donnée utilisateur dans la construction du chemin. La correction vérifie que le chemin final reste dans le répertoire autorisé.
      </p>
      </section>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 6.10"
          questions={[
            {
              id: 1,
              question: "Que signifie EACCES dans Node.js ?",
              options: ["Fichier inexistant.", "Permission refusée.", "Erreur de syntaxe."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Quelle commande Linux permet d'afficher les permissions d'un fichier ?",
              options: ["ls -l", "npm audit", "node --inspect"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Que signifie chmod 755 ?",
              options: ["Tous les utilisateurs disposent de tous les droits.", "Le propriétaire dispose de lecture, écriture et exécution ; les autres disposent de lecture et exécution.", "Le fichier est supprimé."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Que représente le Path Traversal ?",
              options: ["Une tentative d'accéder à des fichiers en dehors du répertoire autorisé.", "Une erreur de connexion MySQL.", "Une fuite mémoire."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 5,
              question: "Pourquoi utiliser path.resolve() ?",
              options: ["Pour calculer un chemin absolu normalisé.", "Pour supprimer les fichiers.", "Pour accorder les permissions."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
