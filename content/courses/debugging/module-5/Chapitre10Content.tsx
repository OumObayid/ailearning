'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type PathTestKey = 'normal_file' | 'traversal_passwd' | 'traversal_env' | 'nested_safe';

interface PathScenario {
  title: string;
  badge: string;
  badgeColor: string;
  inputFilename: string;
  naiveResolvedPath: string;
  naiveStatus: 'COMPROMISED_LEAK' | 'SAFE_ACCESS';
  naiveMessage: string;
  secureResolvedPath: string;
  secureStatus: 'BLOCKED_403' | 'SAFE_ACCESS';
  secureMessage: string;
  explanation: string;
}

const PATH_SCENARIOS: Record<PathTestKey, PathScenario> = {
  normal_file: {
    title: '1. Fichier Légitime dans le Répertoire (/var/www/uploads/avatar.png)',
    badge: 'Accès Normal',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    inputFilename: 'avatar.png',
    naiveResolvedPath: '/var/www/uploads/avatar.png',
    naiveStatus: 'SAFE_ACCESS',
    naiveMessage: 'HTTP 200 OK — Le fichier est servi normalement à l\'utilisateur.',
    secureResolvedPath: '/var/www/uploads/avatar.png',
    secureStatus: 'SAFE_ACCESS',
    secureMessage: 'HTTP 200 OK — Le chemin reste strictement dans le répertoire de confinement.',
    explanation: 'Le nom de fichier ne contient aucun séparateur de dossier ni séquence de retour arrière. L\'accès est légitime.',
  },
  traversal_passwd: {
    title: '2. Tentative d\'Extraction Système (../../../../etc/passwd)',
    badge: 'Path Traversal Critique',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    inputFilename: '../../../../etc/passwd',
    naiveResolvedPath: '/etc/passwd',
    naiveStatus: 'COMPROMISED_LEAK',
    naiveMessage: '💥 CATASTROPHE : Le serveur renvoie le fichier système /etc/passwd avec la liste de tous les utilisateurs du serveur Linux !',
    secureResolvedPath: '/etc/passwd (Rejeté : Ne commence pas par /var/www/uploads/)',
    secureStatus: 'BLOCKED_403',
    secureMessage: '🛡️ HTTP 403 Forbidden — La tentative d\'évasion du bac à sable (Jailbreak) est détectée et journalisée.',
    explanation: 'Chaque paire de points `..` remonte d\'un niveau dans l\'arborescence du disque dur, permettant d\'atteindre la racine `/` du serveur si aucun contrôle n\'est appliqué.',
  },
  traversal_env: {
    title: '3. Vol des Secrets Applicatifs (../../.env)',
    badge: 'Fuite Clés API / BDD',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    inputFilename: '../../.env',
    naiveResolvedPath: '/var/www/.env',
    naiveStatus: 'COMPROMISED_LEAK',
    naiveMessage: '💥 CATASTROPHE : Le fichier .env contenant le mot de passe root MySQL, la clé Stripe et les secrets JWT est téléchargé en clair !',
    secureResolvedPath: '/var/www/.env (Rejeté : Hors du dossier uploads)',
    secureStatus: 'BLOCKED_403',
    secureMessage: '🛡️ HTTP 403 Forbidden — Accès refusé : Le fichier se situe en dehors du périmètre autorisé.',
    explanation: 'Les applications stockent souvent les variables d\'environnement à la racine du projet. Deux `..` suffisent à sortir du dossier `uploads` pour les dérober.',
  },
  nested_safe: {
    title: '4. Fichier dans un Sous-Dossier Légitime (2026/invoices/report.pdf)',
    badge: 'Sous-Dossier Valide',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    inputFilename: '2026/invoices/report.pdf',
    naiveResolvedPath: '/var/www/uploads/2026/invoices/report.pdf',
    naiveStatus: 'SAFE_ACCESS',
    naiveMessage: 'HTTP 200 OK — Le fichier imbriqué est servi.',
    secureResolvedPath: '/var/www/uploads/2026/invoices/report.pdf',
    secureStatus: 'SAFE_ACCESS',
    secureMessage: 'HTTP 200 OK — Le chemin reste sous /var/www/uploads/ et est validé avec succès.',
    explanation: 'Le sous-dossier fait partie de l\'espace de stockage autorisé. La validation canonique autorise la consultation car il commence toujours par le préfixe sécurisé.',
  },
};

export const Chapitre10Content: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<PathTestKey>('normal_file');
  const [isSecureEngineActive, setIsSecureEngineActive] = useState<boolean>(true);
  const activeScenario = PATH_SCENARIOS[selectedKey];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="folder" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 10 — Permissions Fichiers (EACCES/ENOENT) & Neutralisation du Path Traversal
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Déchiffrer les erreurs POSIX système, configurer des permissions sécurisées sous Linux/Windows sans jamais faire de <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">chmod 777</code>, et barricader vos téléchargements contre les failles de traversée de répertoire.
        </p>
      </div>

      {/* Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Identifier immédiatement la cause des erreurs système Node.js : <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">EACCES</code>, <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">ENOENT</code>, <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">EMFILE</code>.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Maîtriser les droits d&apos;accès POSIX (UGO / rwx) et configurer <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">chown</code> / <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">chmod</code> selon le principe du moindre privilège.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Comprendre le mécanisme d&apos;attaque du Path Traversal (CWE-22) et pourquoi <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">path.join()</code> ne suffit pas.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Implémenter l&apos;algorithme de confinement canonique inviolable avec <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">path.resolve()</code> et <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">path.sep</code>.</span>
          </div>
        </div>
      </section>

      {/* 1. Les Codes d'Erreur Fichiers POSIX dans Node.js */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-indigo-600" />
          1. Anatomie des Erreurs de Fichiers Node.js (POSIX Codes)
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Lorsque le module <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">node:fs</code> échoue à manipuler un fichier, il renvoie un objet <code className="font-mono text-xs">NodeJS.ErrnoException</code> contenant un code d&apos;erreur standard du système d&apos;exploitation :
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Code POSIX</th>
                <th className="px-4 py-3">Signification</th>
                <th className="px-4 py-3">Cause racine typique</th>
                <th className="px-4 py-3">Méthode de résolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-rose-700">EACCES</td>
                <td className="px-4 py-2.5 font-medium">Permission Denied (Accès refusé)</td>
                <td className="px-4 py-2.5 font-medium">L&apos;utilisateur système exécutant Node.js n&apos;a pas les droits r/w sur le dossier</td>
                <td className="px-4 py-2.5 font-medium">Modifier le propriétaire avec <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">chown nodejs:nodejs</code> ou les droits (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">chmod 750</code>)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-amber-700">ENOENT</td>
                <td className="px-4 py-2.5 font-medium">No Such File or Directory</td>
                <td className="px-4 py-2.5 font-medium">Chemin relatif calculé depuis <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">process.cwd()</code> au lieu du dossier du script</td>
                <td className="px-4 py-2.5 font-medium">Utiliser systématiquement <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">path.join(__dirname, ...)</code> ou <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">import.meta.dirname</code></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-indigo-700">EISDIR</td>
                <td className="px-4 py-2.5 font-medium">Is a Directory</td>
                <td className="px-4 py-2.5 font-medium">Tentative d&apos;ouverture d&apos;un dossier avec <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">fs.readFile()</code> comme si c&apos;était un fichier</td>
                <td className="px-4 py-2.5 font-medium">Vérifier avec <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">fs.statSync(path).isFile()</code> avant d&apos;ouvrir</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-purple-700">EMFILE</td>
                <td className="px-4 py-2.5 font-medium">Too Many Open Files</td>
                <td className="px-4 py-2.5 font-medium">Fuite de descripteurs de fichiers (streams ou sockets ouverts non fermés)</td>
                <td className="px-4 py-2.5 font-medium">Fermer les streams avec <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">stream.destroy()</code> et augmenter <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">ulimit -n 65535</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Permissions Système : Windows vs Linux */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="lock" className="w-5 h-5 text-emerald-600" />
          2. Permissions Système : Windows NTFS vs Linux POSIX
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Sous Windows et Linux, la gestion des droits repose sur des mécanismes différents mais poursuit le même objectif : restreindre l&apos;accès au compte de service de l&apos;application.
        </p>

        {/* Figure 6.10.A - Preserving image13.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image13.jpeg"
              alt="Onglet Sécurité des propriétés de dossier sous Windows permettant de configurer les listes de contrôle d'accès NTFS (Figure 6.10.A)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.10.A — Configuration des listes de contrôle d&apos;accès (ACL NTFS) sous Windows : Attribution des droits stricts au compte de service.
          </div>
        </div>

        {/* Figure 6.10.B - Preserving image14.jpeg */}
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/cours/debugging/module-5/image14.jpeg"
              alt="Permissions de fichiers sous Linux affichées dans le terminal avec la commande ls -la montrant les droits rwxr-xr-x (Figure 6.10.B)"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center text-xs font-semibold text-slate-600">
            Figure 6.10.B — Permissions POSIX sous Linux : Lecture, écriture et exécution pour Utilisateur, Groupe et Autres (rwxr-xr-x).
          </div>
        </div>

        <Callout type="warning" title="Pourquoi 'chmod 777' est formellement interdit en entreprise">
          <p className="text-xs sm:text-sm">
            Appliquer un <code className="font-mono text-xs font-bold text-slate-900">chmod -R 777 /var/www</code> pour résoudre une erreur EACCES est une hérésie de sécurité. 
            Le chiffre 7 accorde tous les droits (<code className="font-mono text-xs font-bold">Lecture + Écriture + Exécution</code>) à <strong>TOUS les utilisateurs de la machine</strong>. 
            Si un pirate réussit à uploader un script shell ou PHP, le système lui permettra de l&apos;exécuter directement et de prendre le contrôle du serveur.
          </p>
        </Callout>
      </section>

      {/* 3. La Faille Path Traversal (Directory Traversal) */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          3. La Faille Critique du Path Traversal (CWE-22)
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Considérons un endpoint classique de téléchargement de documents ou de factures :
        </p>

        <CodeBlock
          code={`// ❌ ANTI-PATTERN VULNÉRABLE AU PATH TRAVERSAL :
app.get('/api/download', (req, res) => {
  const filename = req.query.file as string; // Ex: "../../../../etc/passwd"
  
  // ⚠️ DANGER MORTEL : path.join() résout les séquences ".." sans vérifier la sortie du bac à sable !
  const targetPath = path.join('/var/www/uploads', filename);
  
  // Le serveur lit et transmet le fichier /etc/passwd à l'attaquant !
  res.sendFile(targetPath);
});`}
          language="typescript"
        />

        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Voici l&apos;algorithme d&apos;ingénierie sécurisé (Confinement Canonique) que tout développeur backend doit implémenter :
        </p>

        <CodeBlock
          code={`// ✅ ALGORITHME DE CONFINEMENT CANONIQUE INVIOLABLE :
import path from 'node:path';
import fs from 'node:fs';

const UPLOADS_ROOT = path.resolve('/var/www/uploads');

app.get('/api/download', (req, res) => {
  const userFilename = req.query.file as string;
  if (!userFilename) return res.status(400).json({ error: 'Fichier manquant' });

  // 1. Résolution du chemin absolu normalisé
  const safePath = path.resolve(UPLOADS_ROOT, userFilename);

  // 2. Vérification mathématique du préfixe de confinement :
  // Le chemin résolu DOIT obligatoirement commencer par "/var/www/uploads/"
  const isInsideJail = safePath.startsWith(UPLOADS_ROOT + path.sep);

  if (!isInsideJail) {
    console.warn(\`🚨 [TENTATIVE DE PATH TRAVERSAL BLOQUÉE] : \${userFilename} -> \${safePath}\`);
    return res.status(403).json({ error: 'Accès interdit : Sortie du bac à sable détectée' });
  }

  // 3. Vérification de l'existence physique du fichier
  if (!fs.existsSync(safePath) || !fs.statSync(safePath).isFile()) {
    return res.status(404).json({ error: 'Fichier introuvable' });
  }

  // 4. Envoi sécurisé
  res.sendFile(safePath);
});`}
          language="typescript"
        />
      </section>

      {/* 4. Simulateur Interactif : PathTraversalSandboxSimulator */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          4. Simulateur Interactif : Bac à Sable Path Traversal
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Testez différentes charges utiles de chemin de fichiers et observez la réaction du serveur avec et sans le bouclier de confinement :
        </p>

        {/* Boutons de sélection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(PATH_SCENARIOS) as PathTestKey[]).map((key) => {
            const sc = PATH_SCENARIOS[key];
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-lime-500 bg-lime-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${sc.badgeColor} inline-block mb-1`}>
                    {sc.badge}
                  </span>
                  <div className="text-xs font-bold text-slate-950 leading-tight">
                    {sc.title.split('(')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500 truncate">
                  {sc.inputFilename}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de test */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scénario de Chemin</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{activeScenario.title}</h3>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsSecureEngineActive(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !isSecureEngineActive ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                path.join() Naïf (Vulnérable)
              </button>
              <button
                type="button"
                onClick={() => setIsSecureEngineActive(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSecureEngineActive ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Confinement Canonique (Sécurisé)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Paramètre Reçu (?file=) :</span>
              <div className="text-xs text-indigo-200">{activeScenario.inputFilename}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Chemin Physique Résolu :</span>
              <div className="text-xs text-slate-900 font-bold">
                {isSecureEngineActive ? activeScenario.secureResolvedPath : activeScenario.naiveResolvedPath}
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium ${
            isSecureEngineActive
              ? activeScenario.secureStatus === 'BLOCKED_403'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-slate-50 border-slate-200 text-slate-900'
              : activeScenario.naiveStatus === 'COMPROMISED_LEAK'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}>
            <div className="font-bold mb-1">
              {isSecureEngineActive ? 'Résultat avec Protection Canonique :' : 'Résultat sans Protection :'}
            </div>
            <div>
              {isSecureEngineActive ? activeScenario.secureMessage : activeScenario.naiveMessage}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>Explication technique : </strong> {activeScenario.explanation}
          </div>
        </div>
      </section>

      {/* 5. Cas Réel Entreprise : L'Incident de la Clé SSH Privée */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          5. Étude de Cas Réelle : Le Vol de la Clé SSH chez CloudFacture
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Compromission Totale d&apos;Infrastructure
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Temps de détection : 14 jours</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>L&apos;Intrusion :</strong> La startup CloudFacture proposait un endpoint <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">/api/invoices/download?pdf=facture-09.pdf</code>. Un attaquant a remarqué que l&apos;URL acceptait des chemins relatifs. En testant <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">?pdf=../../../../root/.ssh/id_rsa</code>, le serveur a renvoyé en téléchargement direct <strong>la clé privée SSH du serveur</strong> !
            </p>
            <p>
              <strong>Le Facteur Aggravant :</strong> Non seulement le code utilisait un <code className="font-mono text-xs">path.join()</code> sans validation de préfixe, mais le processus Node.js était lancé avec les droits super-utilisateur <strong>root</strong> ! Si Node.js avait tourné sous un compte restreint <code className="font-mono text-xs">www-data</code>, Linux aurait bloqué la lecture de la clé avec une erreur <code className="font-mono text-xs text-rose-700 font-bold">EACCES</code>.
            </p>
            <p>
              <strong>Le Double Correctif :</strong> Création d&apos;un utilisateur non-root dédié pour le conteneur Docker (<code className="font-mono text-xs text-emerald-800 font-bold">USER node</code>) et blindage du routeur avec l&apos;algorithme de confinement <code className="font-mono text-xs text-emerald-800 font-bold">safePath.startsWith(UPLOADS_ROOT + path.sep)</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Permissions Fichiers & Path Traversal (Chapitre 5.10)"
          questions={[
            {
              id: 1,
              question: "Pourquoi la fonction path.join('/var/www/uploads', req.query.file) ne protège-t-elle PAS contre une attaque de Path Traversal ?",
              options: [
                "Parce que path.join() est une fonction réservée à Windows qui ne fonctionne pas sous Linux.",
                "Parce que path.join() résout mathématiquement les séquences '../', ce qui permet à une valeur comme '../../etc/passwd' de remonter l'arborescence et de sortir du dossier prévu.",
                "Parce que path.join() supprime tous les fichiers du disque dur.",
                "Parce que path.join() convertit toutes les minuscules en majuscules."
              ],
              correctIndex: 1,
              explanation: "path.join() se contente de concaténer et de normaliser les segments de chemin. Si l'entrée contient des '../../', elle remonte les répertoires sans vérifier si le résultat final reste confiné dans le dossier parent.",
            },
            {
              id: 2,
              question: "Quelle condition mathématique garantit qu'un chemin résolu reste strictement confiné dans son répertoire autorisé (Jailbreak protection) ?",
              options: [
                "resolvedPath.includes('uploads')",
                "resolvedPath.startsWith(safeRootDirectory + path.sep)",
                "resolvedPath.endsWith('.pdf')",
                "resolvedPath.length < 50"
              ],
              correctIndex: 1,
              explanation: "Vérifier que le chemin absolu résolu commence strictement par la racine autorisée suivie du séparateur de chemin (path.sep) garantit qu'aucun fichier hors du bac à sable ne peut être accédé.",
            },
            {
              id: 3,
              question: "Que signifie le code d'erreur Node.js 'EACCES' lors d'une tentative d'écriture de fichier ?",
              options: [
                "Le fichier n'existe pas sur le disque dur.",
                "Le système d'exploitation a refusé l'accès car le compte utilisateur exécutant le processus Node.js ne dispose pas des droits d'écriture sur le fichier ou son dossier parent.",
                "La mémoire vive est saturée.",
                "Le réseau Internet est déconnecté."
              ],
              correctIndex: 1,
              explanation: "EACCES (Permission Denied) indique une violation des permissions de sécurité du système de fichiers (droits NTFS sous Windows ou permissions POSIX sous Linux).",
            },
            {
              id: 4,
              question: "Pourquoi est-il dangereux d'exécuter une commande 'chmod -R 777' sur le répertoire des uploads de votre serveur ?",
              options: [
                "Parce que cela supprime les fichiers temporaires de Node.js.",
                "Parce que le chiffre 7 accorde les droits complets (Lecture, Écriture ET Exécution) à absolument tout le monde sur la machine, permettant d'exécuter des scripts malveillants uploadés.",
                "Parce que MySQL refuse de démarrer si un dossier a les droits 777.",
                "Parce que cela désactive la connexion Wi-Fi."
              ],
              correctIndex: 1,
              explanation: "777 donne tous les privilèges à tous les utilisateurs. Pour des uploads web, des droits comme 750 (dossiers) et 640 (fichiers) sont recommandés, en retirant obligatoirement le droit d'exécution (x).",
            },
            {
              id: 5,
              question: "Quelle est la cause la plus fréquente d'une erreur 'ENOENT' (No such file or directory) dans un backend Express ?",
              options: [
                "Un mot de passe de base de données erroné.",
                "L'utilisation d'un chemin relatif (ex: './data.json') calculé par rapport au répertoire de lancement de la commande terminal (process.cwd()) plutôt que par rapport à l'emplacement du fichier source.",
                "Une tentative d'injection SQL.",
                "Un dépassement de pile (Stack Overflow)."
              ],
              correctIndex: 1,
              explanation: "Les chemins relatifs sont résolus par rapport au répertoire courant d'exécution du terminal. Si vous lancez le serveur depuis un autre sous-dossier, le chemin devient introuvable. Utilisez path.join(__dirname, 'data.json').",
            },
            {
              id: 6,
              question: "Quelle mesure de sécurité au niveau du conteneur Docker empêche un attaquant de lire les fichiers système même en cas de faille Path Traversal ?",
              options: [
                "Exécuter l'application sous l'utilisateur 'root'.",
                "Exécuter le conteneur avec un utilisateur non-privilégié (USER node) et monter le système de fichiers racine en lecture seule (read-only root filesystem).",
                "Augmenter la RAM allouée au conteneur.",
                "Changer le port 3000 en port 8080."
              ],
              correctIndex: 1,
              explanation: "Selon le principe du moindre privilège, si le processus Node.js s'exécute avec un compte sans privilèges et que les dossiers sensibles (comme /etc ou /root) ne lui sont pas accessibles, les erreurs EACCES bloqueront l'intrusion.",
            },
          ]}
        />
      </div>
    </div>
  );
};
