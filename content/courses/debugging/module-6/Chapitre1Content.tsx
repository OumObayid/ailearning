'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';
import { AiAssistedDebuggingLab } from '@/components/interactive/AiAssistedDebuggingLab';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 6 • Chapitre 1 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Intelligence Artificielle & Diagnostic Système
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Comprendre le rôle de l&apos;IA dans le diagnostic logiciel : Copilote d&apos;analyse, corrélation causale et validation des hypothèses
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Le diagnostic assisté par intelligence artificielle s&apos;apparente au rôle d&apos;un <strong>officier de navigation et de télémétrie dans un cockpit d&apos;avion de ligne</strong> :
          lorsqu&apos;une alarme retentit à 10 000 mètres d&apos;altitude, l&apos;ordinateur analyse instantanément des milliers de paramètres de vol,
          croise les fluctuations de pression et propose des scénarios explicatifs. Cependant, le système automatique <strong>ne coupe jamais un réacteur de son propre chef</strong>.
          C&apos;est le commandant de bord (l&apos;ingénieur logiciel) qui vérifie les instruments physiques, confirme la cause racine et prend la décision d&apos;intervention.
        </p>
      </div>

      {/* 1. Objectifs pédagogiques */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Objectifs d&apos;apprentissage du chapitre
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre précisément comment les modèles de langage (LLM) accélèrent la corrélation et l&apos;analyse d&apos;incidents.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier la liste exhaustive des artefacts exploitables par l&apos;IA (Stack traces, logs structurés, schémas SQL, git diffs).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer avec rigueur scientifique la triade : <strong>Symptôme</strong>, <strong>Hypothèse</strong> et <strong>Cause racine confirmée</strong>.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déjouer les 5 pièges majeurs de l&apos;IA : hallucinations d&apos;APIs fictives, faux patchs de contournement et fuites de secrets.</span>
          </li>
        </ul>
      </section>

      {/* 2. Changement de paradigme : Débogage classique vs Débogage assisté */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Changement de paradigme : Du débogage empirique à l&apos;investigation augmentée
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Dans le flux traditionnel, lorsqu&apos;une anomalie survient en production (ex: une exception non interceptée dans un microservice Express),
          le développeur adopte une démarche manuelle et séquentielle : il scrute des milliers de lignes de fichiers journaux, place des <code>console.log</code> ou des points d&apos;arrêt conditionnels,
          reconstitue mentalement l&apos;état de la mémoire et tente de deviner la chaîne d&apos;exécution ayant conduit à l&apos;incident.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Avec un modèle de fondation spécialisé en ingénierie logicielle (Google Gemini, Claude, GPT-4o), le paradigme change radicalement :
          l&apos;IA agit comme un <strong>moteur d&apos;inférence sémantique à haut débit</strong>. Elle est capable de lire instantanément 200 lignes de Stack Trace,
          d&apos;isoler le frame exact de votre code applicatif parmi les dépendances <code>node_modules</code>, de repérer une incohérence entre la signature d&apos;une fonction et ses arguments,
          et d&apos;émettre des hypothèses de travail documentées en quelques secondes.
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Dimension</th>
                <th className="px-4 py-3">Débogage Manuel Traditionnel</th>
                <th className="px-4 py-3">Diagnostic Assisté par IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Vitesse d&apos;analyse initiale</td>
                <td className="px-4 py-2.5">Lente (15 à 60 minutes de fouille de logs et de traçage de code).</td>
                <td className="px-4 py-2.5 font-semibold text-emerald-800">Ultra-rapide (5 à 20 secondes pour synthétiser l&apos;erreur et son contexte).</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Reconnaissance de motifs</td>
                <td className="px-4 py-2.5">Limitée à l&apos;expérience passée et à la mémoire du développeur.</td>
                <td className="px-4 py-2.5 font-semibold text-emerald-800">Vaste catalogue de patterns connus (anti-patterns V8, failles OWASP, pièges ORM).</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Accès à l&apos;environnement réel</td>
                <td className="px-4 py-2.5 font-semibold text-emerald-800">Direct (accès à la RAM, aux sockets réseau, aux tables MySQL en live).</td>
                <td className="px-4 py-2.5 text-rose-700 font-semibold">Nul (l&apos;IA ne connaît que le texte fourni dans le prompt ou ses outils de sandbox).</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Statut de la conclusion</td>
                <td className="px-4 py-2.5">Constat vérifié expérimentalement par le débogueur ou les tests.</td>
                <td className="px-4 py-2.5 text-amber-800 font-semibold">Hypothèse probabiliste nécessitant impérativement une vérification humaine.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="L'Axiome fondamental du débogage par IA">
          <p className="text-xs sm:text-sm">
            <strong>Une réponse plausible, élégante et syntaxiquement parfaite fournie par un LLM ne constitue en aucun cas une preuve technique.</strong>
            L&apos;IA prédit la séquence de tokens la plus probable dans son espace latent ; elle n&apos;exécute pas physiquement votre code dans son cerveau.
            Tout diagnostic émis par l&apos;IA doit rester au statut d&apos;<em>hypothèse à réfuter ou à confirmer</em> jusqu&apos;à ce qu&apos;un log ou un test automatisé apporte la preuve formelle.
          </p>
        </Callout>
      </section>

      {/* 3. Les artefacts exploitables par le modèle */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 6 artefacts techniques qu&apos;un modèle IA peut analyser efficacement
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Pour qu&apos;un modèle de langage puisse poser un diagnostic pertinent, vous devez alimenter sa fenêtre de contexte avec des artefacts techniques ciblés.
          Voici les 6 éléments qui offrent la plus forte valeur ajoutée en ingénierie d&apos;investigation :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs">
              <Icon name="terminal" className="w-4 h-4 text-lime-700" />
              <span>1. Stack Traces & Exceptions</span>
            </div>
            <p className="text-xs text-slate-600">
              Type d&apos;erreur (TypeError, RangeError, AxiosError), message exact et chaîne de frames d&apos;appels pour localiser la ligne de rupture.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs">
              <Icon name="server" className="w-4 h-4 text-lime-700" />
              <span>2. Journaux structurés (Logs JSON)</span>
            </div>
            <p className="text-xs text-slate-600">
              Événements chronologiques, Correlation ID, statuts HTTP, latences de requêtes et charges utiles (payloads) anonymisées.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs">
              <Icon name="code" className="w-4 h-4 text-lime-700" />
              <span>3. Code source ciblé</span>
            </div>
            <p className="text-xs text-slate-600">
              Contrôleur, service métier et repository directement impliqués, avec leurs interfaces TypeScript et types de retour.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs">
              <Icon name="database" className="w-4 h-4 text-lime-700" />
              <span>4. Schémas de données SQL/ORM</span>
            </div>
            <p className="text-xs text-slate-600">
              Définitions DDL (CREATE TABLE), contraintes de nullabilité (NOT NULL), clés primaires/étrangères et index disponibles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs">
              <Icon name="shield-check" className="w-4 h-4 text-lime-700" />
              <span>5. Contrats d&apos;API & Spécifications</span>
            </div>
            <p className="text-xs text-slate-600">
              Schémas Zod, spécifications OpenAPI/Swagger, codes de statut HTTP attendus (400, 401, 404, 500) et formats de réponse.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs">
              <Icon name="sparkles" className="w-4 h-4 text-lime-700" />
              <span>6. Git Diffs & Historique de commits</span>
            </div>
            <p className="text-xs text-slate-600">
              Dernières modifications introduites (`git diff HEAD~1`), régressions de typage ou changements de dépendances dans `package.json`.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Démonstration pratique : Cas réel d'une exception Node.js / Express */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Démonstration pratique : Anatomie d&apos;un crash et diagnostic pas à pas
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Considérons un scénario courant en entreprise : une route API Express <code>GET /api/v1/users/:id/profile</code> renvoie subitement une erreur HTTP 500
          lorsqu&apos;un utilisateur fraîchement supprimé ou dont l&apos;identifiant est erroné consulte son tableau de bord.
        </p>

        <CodeBlock
          filename="src/services/userService.ts"
          language="typescript"
          code={`export interface UserProfileDto {
  id: number;
  email: string;
  fullName: string;
}

// Service de recherche utilisateur
export async function getUserProfile(userId: number): Promise<UserProfileDto> {
  // Lorsque l'utilisateur n'existe pas en base de données, findById retourne null
  const user = await userRepository.findById(userId);

  // LIGNE 15 : Crash à l'exécution si user vaut null !
  return {
    id: user.id,
    email: user.email,
    fullName: \`\${user.firstName} \${user.lastName}\`,
  };
}`}
        />

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Dans le terminal de production et le système de monitoring, l&apos;incident se matérialise par la Stack Trace suivante :
        </p>

        <CodeBlock
          filename="logs/error.log (Node.js runtime exception)"
          language="bash"
          code={`TypeError: Cannot read properties of null (reading 'id')
    at getUserProfile (/app/src/services/userService.ts:15:15)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async getUserProfileController (/app/src/controllers/userController.ts:28:21)`}
        />

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Icon name="bot" className="w-4 h-4 text-emerald-700" />
            <span>Ce que l&apos;IA analyse et déduit avec précision :</span>
          </h3>
          <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
            <li><strong>Localisation immédiate</strong> : L&apos;erreur survient à la ligne 15 de <code>userService.ts</code> lors de l&apos;évaluation de <code>user.id</code>.</li>
            <li><strong>Origine de la valeur nulle</strong> : L&apos;appel <code>userRepository.findById(userId)</code> a retourné <code>null</code>, indiquant que l&apos;identifiant fourni n&apos;a aucune correspondance en base de données.</li>
            <li><strong>Défaut de contrat d&apos;interface</strong> : La signature de <code>getUserProfile</code> promet de retourner un <code>Promise&lt;UserProfileDto&gt;</code> mais ne gère pas le cas d&apos;absence d&apos;enregistrement (absence de cas 404).</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <span>❌ Mauvais réflexe : Le patch d&apos;anesthésie superficiel</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Un LLM sollicité avec un prompt simpliste (&quot;corrige cette erreur&quot;) proposera souvent du chaînage optionnel :
            </p>
            <div className="text-xs font-mono bg-white p-2.5 rounded-lg border border-rose-300 text-slate-800">
              id: user?.id, email: user?.email
            </div>
            <p className="text-xs text-rose-900 font-semibold mt-1">
              Piège : L&apos;API répondra en HTTP 200 OK avec des champs nulls, ce qui fera crasher l&apos;application mobile cliente plus tard !
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span>✅ Réflexe d&apos;Ingénieur : Remédiation architecturale</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              L&apos;ingénieur guide l&apos;IA pour produire une gestion d&apos;erreur explicite et conforme au standard HTTP :
            </p>
            <div className="text-xs font-mono bg-white p-2.5 rounded-lg border border-emerald-300 text-slate-800">
              if (!user) throw new NotFoundException(&apos;Utilisateur introuvable&apos;);
            </div>
            <p className="text-xs text-emerald-900 font-semibold mt-1">
              Résultat : Le contrôleur intercepte l&apos;exception et renvoie un statut HTTP 404 Not Found propre et documenté.
            </p>
          </div>
        </div>
      </section>

      {/* 5. La matrice causale : Symptôme vs Hypothèse vs Cause Racine */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            La matrice causale : Différencier Symptôme, Hypothèse et Cause Racine
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Dans tout diagnostic mené avec une IA, le risque numéro un est de confondre ce que l&apos;on observe (le symptôme) avec la raison fondamentale du problème (la cause racine).
          L&apos;ingénieur doit exiger de l&apos;IA une catégorisation stricte :
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Niveau d&apos;analyse</th>
                <th className="px-4 py-3">Définition technique</th>
                <th className="px-4 py-3">Exemple concret d&apos;incident</th>
                <th className="px-4 py-3">Action de l&apos;ingénieur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-rose-700">1. Symptôme</td>
                <td className="px-4 py-2.5">Manifestation extérieure observable de la panne.</td>
                <td className="px-4 py-2.5 font-mono text-xs">HTTP 500 &quot;Internal Server Error&quot; sur GET /orders.</td>
                <td className="px-4 py-2.5">Mesurer l&apos;impact utilisateur et collecter les logs bruts.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-amber-700">2. Hypothèse</td>
                <td className="px-4 py-2.5">Explication plausible formulée par l&apos;IA ou l&apos;humain.</td>
                <td className="px-4 py-2.5 italic">&quot;Le pool de connexions MySQL est épuisé à cause de fuites de sockets.&quot;</td>
                <td className="px-4 py-2.5">Concevoir un test ou vérifier une métrique pour prouver ou réfuter.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-emerald-700">3. Cause Racine (RCA)</td>
                <td className="px-4 py-2.5">Origine fondamentale prouvée ; si on la supprime, le bug ne réapparaît jamais.</td>
                <td className="px-4 py-2.5 font-mono text-xs">Omission du bloc finally &#123; connection.release(); &#125; dans le middleware d&apos;authentification.</td>
                <td className="px-4 py-2.5">Implémenter la correction structurelle et rédiger un test de non-régression.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Les 5 limites et garde-fous stricts */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            6
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Les 5 limites critiques de l&apos;IA et garde-fous de sécurité
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">1</span>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Absence d&apos;état dynamique (Pas d&apos;accès à la mémoire runtime)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Le LLM analyse un instantané statique (du texte). Il ne peut pas inspecter la valeur réelle d&apos;une variable en mémoire à l&apos;instant $t$
                ni observer le Garbage Collector de V8 sans que vous ne lui fournissiez un dump mémoire ou des logs d&apos;allocation.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">2</span>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Hallucination d&apos;APIs, de méthodes ou d&apos;options de bibliothèques</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Un modèle peut vous proposer avec aplomb une méthode séduisante mais totalement inventée (ex: <code>mysqlPool.findAndLock()</code> au lieu de <code>SELECT ... FOR UPDATE</code>).
                Vérifiez toujours l&apos;existence d&apos;une API dans la documentation officielle ou le typage <code>.d.ts</code> de votre IDE.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">3</span>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Inadéquation de version et obsolescence de bibliothèques</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                L&apos;IA peut suggérer des patterns valides en Express 4 qui génèrent des erreurs subtiles en Express 5 (ex: gestion native des promesses rejetées sans <code>next(err)</code>),
                ou utiliser des options dépréciées de TypeORM ou Sequelize.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">4</span>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Fuite de données sensibles (Secrets Leaks & PII)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Il est formellement interdit de copier-coller dans un prompt des clés privées JWT, des chaînes de connexion MySQL avec mot de passe en clair,
                des clés d&apos;API ou des données personnelles d&apos;utilisateurs (RGPD). Anonymisez systématiquement avant soumission.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">5</span>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Biais de confirmation et complaisance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si vous demandez : <em>&quot;Est-ce que cette erreur vient du serveur Redis ?&quot;</em>, le modèle aura tendance à valider votre intuition
                plutôt qu&apos;à examiner objectivement les indices de la Stack Trace pointant vers PostgreSQL. Formulez toujours des questions ouvertes et neutres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratoire Interactif */}
      <div className="my-8">
        <h2 className="text-[19px] font-bold text-slate-900 mb-2.5 flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-700" />
          <span>Laboratoire interactif : Atelier d&apos;ingénierie du diagnostic assisté par IA</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Expérimentez la construction de prompts d&apos;investigation complets, auditez les pièges et hallucinations d&apos;un modèle IA,
          et observez les garde-fous d&apos;exécution en environnement contrôlé.
        </p>
        <AiAssistedDebuggingLab />
      </div>

      {/* Quiz de révision (6 questions complètes) */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de certification — Chapitre 6.1 : Diagnostic Logiciel Assisté par IA"
          questions={[
            {
              id: 1,
              question: "Quelle est la définition la plus rigoureuse du rôle de l'IA dans l'investigation logicielle en environnement d'ingénierie ?",
              options: [
                "Un système autonome qui applique directement des correctifs en production sans supervision humaine.",
                "Un copilote d'investigation et moteur de corrélation sémantique qui formule des hypothèses probabilistes, dont la vérification finale incombe toujours à l'ingénieur.",
                "Un compilateur statique remplaçant TypeScript et Webpack.",
                "Un outil d'interception réseau matériel remplaçant les pare-feux et les proxys Nginx."
              ],
              correctIndex: 1,
              explanation: "L'IA excelle dans la corrélation sémantique rapide entre logs, traces et code, mais ne dispose pas d'accès direct à l'environnement d'exécution temps réel. Ses déductions restent des hypothèses probabilistes jusqu'à confirmation humaine par des preuves tangibles."
            },
            {
              id: 2,
              question: "Face à une exception 'TypeError: Cannot read properties of null (reading id)', que représente exactement ce message d'erreur ?",
              options: [
                "La cause racine définitive de la défaillance système.",
                "Un bug interne du processeur de la machine serveur.",
                "Le symptôme d'exécution immédiat indiquant qu'une référence nulle a été déréférencée à une ligne précise du code.",
                "Une attaque par injection SQL en cours d'exécution."
              ],
              correctIndex: 2,
              explanation: "Le TypeError est le symptôme direct visible dans la console. La cause racine peut être un utilisateur supprimé, un paramètre de route mal typé ou une transaction annulée ; elle doit être investiguée en amont de la ligne qui a crashé."
            },
            {
              id: 3,
              question: "Pourquoi est-il généralement néfaste d'appliquer sans analyse la suggestion d'un LLM qui propose d'ajouter du chaînage optionnel (ex: user?.id) suite à un crash ?",
              options: [
                "Parce que le chaînage optionnel est interdit par la norme ECMAScript 2020.",
                "Parce que cela masque le problème (patch superficiel) en retournant des valeurs nulles sous statut HTTP 200 OK au lieu de signaler un statut HTTP 404 Not Found conforme aux règles métier.",
                "Parce que le chaînage optionnel consomme 100% du CPU de Node.js.",
                "Parce que les bases de données SQL refusent les objets JavaScript contenant des undefined."
              ],
              correctIndex: 1,
              explanation: "Le chaînage optionnel 'anesthésie' l'erreur immédiate mais propage un état corrompu : l'API répond 200 OK avec des données vides ou nulles, provoquant des bugs en cascade côté frontend ou sur les clients mobiles."
            },
            {
              id: 4,
              question: "Qu'est-ce qu'une 'hallucination technique' dans le contexte d'un modèle IA appliqué au débogage ?",
              options: [
                "Une panne d'alimentation électrique du centre de données hébergeant le LLM.",
                "Une réponse où le modèle invente avec assurance une méthode de bibliothèque, une option de configuration ou un comportement d'API qui n'existe pas dans la réalité.",
                "Un ralentissement temporaire de la vitesse de génération des tokens.",
                "Une incompatibilité entre le navigateur Chrome et les fichiers SVG."
              ],
              correctIndex: 1,
              explanation: "Une hallucination technique survient lorsque le modèle prédit des tokens plausibles (par exemple une méthode 'db.findUserById()' sur un driver mysql2 qui n'expose en réalité que 'db.execute()'). L'ingénieur doit toujours confronter les propositions aux déclarations de types réelles."
            },
            {
              id: 5,
              question: "Pourquoi est-il formellement interdit d'inclure des chaînes de connexion brutes avec mots de passe ou des clés API dans un prompt de diagnostic transmis à un LLM public ?",
              options: [
                "Parce que les mots de passe empêchent le modèle de comprendre la grammaire de la requête.",
                "Pour prévenir les risques de fuites de données sensibles (Secrets Leaks), de compromission d'infrastructure et de violation de conformité réglementaire (RGPD/SOC2).",
                "Parce que les chaînes de connexion dépassent systématiquement la limite de 1 000 caractères.",
                "Parce que les clés API désactivent la coloration syntaxique dans les consoles d'IA."
              ],
              correctIndex: 1,
              explanation: "Les logs et fichiers de configuration contiennent fréquemment des PII ou des secrets d'infrastructure. Tout contenu transmis à des API cloud doit être préalablement purgé ou anonymisé pour garantir la conformité et la sécurité des données."
            },
            {
              id: 6,
              question: "Quelle attitude méthodique l'ingénieur doit-il adopter lorsqu'une IA lui propose une explication convaincante sur l'origine d'un bug complexe ?",
              options: [
                "Pousser immédiatement le correctif en production pour voir si l'erreur disparaît.",
                "Considérer l'explication comme une hypothèse prioritaire, identifier la métrique ou le test permettant de la prouver, puis confirmer la cause racine avec des données factuelles avant d'écrire la moindre ligne de correctif.",
                "Ignorer l'IA et réécrire intégralement le microservice à partir de zéro.",
                "Désactiver temporairement les tests unitaires pour valider plus vite."
              ],
              correctIndex: 1,
              explanation: "La méthode d'ingénierie impose la vérification factuelle préalable : formuler l'hypothèse, concevoir le test qui doit échouer en présence du bug (test rouge), vérifier la preuve technique, puis seulement concevoir la remédiation pérenne."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Chapitre1Content;
