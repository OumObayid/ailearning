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
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Contrôle des accès aux fichiers (File Access Control)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment filtrer avec précision les fichiers accessibles dans le projet grâce aux listes blanches (Allowlist) et aux motifs d&apos;exclusion Glob.
        </p>
      </div>

      {/* 1. Pourquoi contrôler les fichiers internes ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-lock" className="w-5 h-5 text-indigo-600" />
          <span>1. Pourquoi contrôler les accès à l&apos;intérieur même du projet ?</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Confiner l&apos;agent au dossier de votre projet est obligatoire, mais ce n&apos;est que la moitié de la bataille. À l&apos;intérieur même de votre code source React ou Node.js résident des données ultra-sensibles que l&apos;agent ne doit <strong>JAMAIS</strong> consulter :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-slate-800">
          <li>Fichiers de variables d&apos;environnement privées (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">.env</code>, <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">.env.local</code>).</li>
          <li>Certificats TLS, clés privées SSH ou JWT (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">*.pem</code>, <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">*.key</code>).</li>
          <li>Historique Git complet contenant d&apos;anciens commits (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">.git/</code>).</li>
        </ul>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de la liste d&apos;invités VIP vs la liste des interdits :</span>
          </div>
          <p>
            Imaginez l&apos;entrée d&apos;un club privé très sécurisé :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>La Liste Noire (Denylist) :</strong> Le videur a une liste des 5 personnes bannies. Le problème ? Si un nouvel inconnu malveillant arrive avec un nom non répertorié (ex: <code className="font-mono text-xs">secrets-temp.json</code>), le videur le laisse entrer !</li>
            <li><strong>La Liste Blanche (Allowlist) :</strong> Le videur ne laisse entrer <strong>que</strong> les personnes expressément inscrites sur sa liste d&apos;invités. Tout le reste reste dehors par défaut. C&apos;est la seule approche infaillible.</li>
          </ul>
        </div>
      </section>

      {/* 2. Liste blanche vs Liste noire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="table-cells" className="w-5 h-5 text-indigo-600" />
          <span>2. Comparatif : Liste Blanche (Allowlist) vs Liste Noire (Denylist)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-emerald-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-emerald-950 text-base">La Liste Blanche (Allowlist)</h4>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Recommandée</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              On énumère explicitement les seuls répertoires et fichiers autorisés. Tout le reste est bloqué par défaut :
            </p>
            {/* Box without pre */}
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div className="text-emerald-400 font-bold">// Fichiers autorisés :</div>
              <div>- src/components/SearchBar.jsx</div>
              <div>- src/data/projects.json</div>
              <div>- src/App.jsx</div>
              <div className="text-slate-500 italic">// Tout autre fichier est refusé d&apos;office</div>
            </div>
            <p className="text-xs text-emerald-900 font-bold">
              ✓ Sécurité maximale : même si un développeur crée un fichier <code className="font-mono text-[11px]">backup.env</code> par erreur, l&apos;agent ne pourra pas le lire.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-950 text-base">La Liste Noire (Denylist)</h4>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Garde-fou d&apos;appoint</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              On énumère les motifs de fichiers strictement proscrits dans le projet :
            </p>
            {/* Box without pre */}
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div className="text-rose-400 font-bold">// Motifs proscrits :</div>
              <div>- **/.env*</div>
              <div>- **/*.{'{pem,key,p12}'}</div>
              <div>- .git/**</div>
              <div>- **/node_modules/**</div>
            </div>
            <p className="text-xs text-rose-800 font-bold">
              ⚠ Faille intrinsèque : si un secret est stocké sous un nom inhabituel (ex: <code className="font-mono text-[11px]">cle_privee.txt</code>), il risque d&apos;échapper au filtre.
            </p>
          </div>
        </div>

        <Callout type="note">
          <strong>La stratégie hybride idéale :</strong> Définissez toujours une <strong>Liste Blanche</strong> pour délimiter les fichiers de la mission (ex: <code className="font-mono text-xs">src/components/**</code>), combinée avec une <strong>Liste Noire globale</strong> inviolable qui bloque toute lecture de secrets (<code className="font-mono text-xs">**/.env*</code>).
        </Callout>
      </section>

      {/* 3. Motifs de filtrage Glob */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="funnel" className="w-5 h-5 text-indigo-600" />
          <span>3. Le dictionnaire des motifs Glob de sécurité</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Les motifs Glob (<em>Globbing Patterns</em>) permettent de cibler des familles entières de fichiers avec une syntaxe compacte :
        </p>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200 font-mono">Motif Glob</th>
                <th className="p-3.5 border-b border-slate-200 text-center">Statut d&apos;accès</th>
                <th className="p-3.5 border-b border-slate-200">Explication &amp; Règle de protection</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-mono font-bold text-indigo-700">src/components/**</td>
                <td className="p-3.5 text-center font-bold text-emerald-700 bg-emerald-50">AUTORISÉ</td>
                <td className="p-3.5">Accès de lecture ouvert à tous les fichiers et sous-dossiers de composants React.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-700">**/.env*</td>
                <td className="p-3.5 text-center font-bold text-rose-700 bg-rose-50">STRICTEMENT INTERDIT</td>
                <td className="p-3.5">Bloque immédiatement .env, .env.local, .env.production dans toute l&apos;arborescence.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-700">**/*.{'{pem,key}'}</td>
                <td className="p-3.5 text-center font-bold text-rose-700 bg-rose-50">STRICTEMENT INTERDIT</td>
                <td className="p-3.5">Bloque les certificats TLS, clés privées SSH et jetons de signature cryptographique.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-slate-600">**/node_modules/**</td>
                <td className="p-3.5 text-center font-bold text-slate-700 bg-slate-100">BLOQUÉ</td>
                <td className="p-3.5">Évite l&apos;aspiration inutile de mégaoctets de code tiers et l&apos;épuisement de votre fenêtre de contexte.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden space-y-3">
          {[
            { glob: "src/components/**", status: "AUTORISÉ", color: "emerald", desc: "Lecture ouverte sur tous les composants UI." },
            { glob: "**/.env*", status: "STRICTEMENT INTERDIT", color: "rose", desc: "Bloque .env et ses variantes dans tout le projet." },
            { glob: "**/*.{pem,key}", status: "STRICTEMENT INTERDIT", color: "rose", desc: "Bloque les clés privées et certificats SSL/TLS." },
            { glob: "**/node_modules/**", status: "BLOQUÉ", color: "slate", desc: "Évite le gaspillage de tokens dans les paquets tiers." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-indigo-700">{item.glob}</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] bg-${item.color}-100 text-${item.color}-800`}>{item.status}</span>
              </div>
              <p className="text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Instructions de contrôle granulaire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>4. Directive d&apos;instructions : Contrôle granulaire des fichiers</span>
        </h2>

        {/* Prompt Box without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE CONTRÔLE D&apos;ACCÈS AUX FICHIERS ===
          </div>
          <div className="text-indigo-300 font-bold">[1. RESPECT DE LA LISTE BLANCHE]</div>
          <div className="text-slate-200">
            Consulte EXCLUSIVEMENT les fichiers expressément nécessaires à la tâche assignée. Ne présume jamais d&apos;une autorisation d&apos;accès implicite sur les autres fichiers du projet.
          </div>

          <div className="text-rose-400 font-bold pt-1">[2. INTERDICTION ABSOLUE SUR LES SECRETS]</div>
          <div className="pl-4 text-slate-200">
            • Tout fichier correspondant à **/.env* est réputé INACCESSIBLE.<br />
            • Tout fichier d&apos;extension .pem, .key, .p12, .crt est réputé INACCESSIBLE.<br />
            • Les répertoires .git/, .ssh/ et node_modules/ sont formellement exclus de toute inspection.
          </div>

          <div className="text-amber-300 font-bold pt-1">[3. CONDUITE EN CAS DE BESOIN IMPRÉVU]</div>
          <div className="pl-4 text-slate-200">
            Si la lecture d&apos;un fichier supplémentaire semble techniquement nécessaire :<br />
            1. N&apos;essaie pas de l&apos;ouvrir à l&apos;aveugle.<br />
            2. Justifie le besoin technique auprès de l&apos;utilisateur.<br />
            3. Attends son accord explicite avant de mobiliser l&apos;outil view_file.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Contrôle des accès aux fichiers
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 3"
          questions={[
            {
              id: 1,
              question: "Pourquoi la méthode de la Liste Blanche (Allowlist) est-elle techniquement supérieure à la Liste Noire (Denylist) pour protéger les fichiers d'un projet ?",
              options: [
                "Parce qu'elle interdit tout par défaut : même si un nouveau fichier secret imprévu est créé (ex: backup_keys.json), il reste automatiquement protégé car absent de la liste blanche.",
                "Parce qu'elle accélère la vitesse de téléchargement de npm.",
                "Parce que les listes blanches sont obligatoires selon la norme ISO 9001.",
                "Il n'y a aucune différence, ce sont deux termes marketing interchangeables."
              ],
              correctIndex: 0,
              explanation: "Une liste noire a toujours un train de retard : il suffit qu'un secret soit stocké dans un fichier aux nom ou extension non anticipés pour qu'il soit exposé. La liste blanche bloque tout par défaut."
            },
            {
              id: 2,
              question: "Que signifie le motif Glob '**/.env*' dans une politique de sécurité d'agent ?",
              options: [
                "Il bloque tout fichier dont le nom commence par '.env' (.env, .env.local, .env.production), quel que soit le sous-dossier où il se trouve dans le projet.",
                "Il donne un accès prioritaire aux variables d'environnement.",
                "Il efface automatiquement les fichiers .env après 24 heures.",
                "Il envoie le fichier .env par e-mail au support technique."
              ],
              correctIndex: 0,
              explanation: "Le double astérisque '**/' cible n'importe quel niveau de sous-dossier, et '.env*' couvre toutes les déclinaisons de fichiers de variables d'environnement."
            },
            {
              id: 3,
              question: "Dans l'analogie du club privé, pourquoi la liste des 5 personnes bannies (Liste Noire) est-elle vulnérable face à un nouveau venu ?",
              options: [
                "Parce qu'un individu malintentionné portant un nom inconnu du videur sera laissé entrer librement faute d'être inscrit sur la liste des bannis.",
                "Parce que le videur n'a pas de lampe torche.",
                "Parce que les cartes d'identité sont trop faciles à photocopier.",
                "Parce que le club est ouvert 24h/24."
              ],
              correctIndex: 0,
              explanation: "La liste noire ne protège que contre les menaces déjà identifiées. Tout fichier sensible non expressément exclu reste vulnérable à une lecture par l'agent."
            }
          ]}
        />
      </section>
    </div>
  );
};
