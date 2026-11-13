'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 7 — Débogage &amp; Optimisation de Prompts</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 6 — Détecter et neutraliser les hallucinations
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Pourquoi les hallucinations en développement logiciel sont d&apos;autant plus dangereuses qu&apos;elles sont techniquement très crédibles, et comment forcer l&apos;agent à prouver chaque ligne de ses affirmations.
        </p>
      </div>

      {/* 1. L'analogie du témoin au tribunal */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie du témoin au tribunal : La tentation de combler les vides</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Au tribunal, un juge demande à un témoin : <em>&quot;Avez-vous vu le suspect entrer dans la banque à 14h ?&quot;</em>. Si le témoin répond : <em>&quot;Oui, je l&apos;ai vu entrer&quot;</em> alors qu&apos;il a simplement aperçu une silhouette de dos au loin, il commet un <strong>faux témoignage</strong>.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Les modèles de langage (LLM) ont une propension statistique naturelle à &quot;faire plaisir&quot; et à paraître omniscients. Confrontés à une portion incomplète de code, ils ne disent pas spontanément <em>&quot;Je ne sais pas&quot;</em>. Ils ont tendance à inventer le module manquant, la fonction utilitaire ou la base de données la plus probable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-2">
            <span className="font-bold text-rose-800">L&apos;hallucination technique plausible (Toxique)</span>
            <div className="bg-slate-900 text-rose-300 p-3 rounded-xl font-mono text-xs space-y-1 break-words min-w-0 max-w-full">
              <p>&quot;J&apos;ai analysé votre code. La vulnérabilité provient du fait que vous utilisez JWT avec une clé secrète trop courte à la ligne 142 de authMiddleware.js.&quot;</p>
            </div>
            <p className="text-slate-600 text-xs">
              Le problème ? Le projet n&apos;utilise ni JWT, ni le fichier <code>authMiddleware.js</code>, et le fichier analysé ne fait que 35 lignes !
            </p>
          </div>

          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
            <span className="font-bold text-emerald-800">La rigueur factuelle avec preuves (Attendu)</span>
            <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-xs space-y-1 break-words min-w-0 max-w-full">
              <p>&quot;Dans le fichier server.js (lignes 12 à 18), la route /api/login reçoit les identifiants sans contrôle de taille. Je ne dispose pas du fichier de vérification du mot de passe pour savoir quel algorithme est employé.&quot;</p>
            </div>
            <p className="text-slate-600 text-xs">
              L&apos;agent s&apos;appuie exclusivement sur le code fourni et déclare honnêtement ce qu&apos;il ignore.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Les 7 formes d'hallucinations dans un IDE */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. Les 7 formes d&apos;hallucinations techniques dans un IDE</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Dans un environnement de développement, une hallucination n&apos;est jamais une phrase absurde comme <em>&quot;La lune est un fromage&quot;</em>. C&apos;est une affirmation technique ultra-crédible mais matériellement fausse :
        </p>

        <div className="grid gap-3 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">1. Le fichier fantôme</span>
            <p className="text-slate-600">L&apos;agent affirme que la configuration se trouve dans <code>config/database.ts</code> sans avoir vérifié son existence sur le disque.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">2. La fonction inventée</span>
            <p className="text-slate-600">Il prétend que la méthode <code>jwt.verifySafeToken()</code> existe dans une bibliothèque alors qu&apos;elle est purement imaginaire.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">3. La technologie supposée</span>
            <p className="text-slate-600">Il décrète avec aplomb que le backend tourne sous PostgreSQL sans qu&apos;aucun import ni chaîne de connexion ne le démontre.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">4. Le faux rapport de test</span>
            <p className="text-slate-600">Il assure que <em>&quot;Tous les tests de sécurité sont validés avec succès&quot;</em> sans avoir déclenché le moindre outil terminal.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">5. Le numéro de ligne fictif</span>
            <p className="text-slate-600">Il situe une faille critique &quot;à la ligne 142&quot; d&apos;un fichier source dont il n&apos;a inspecté que les 20 premières lignes.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs">
            <span className="font-bold text-rose-700">6. L&apos;action fantôme</span>
            <p className="text-slate-600">Il écrit : <em>&quot;J&apos;ai corrigé le composant&quot;</em> alors qu&apos;aucun outil d&apos;édition (write_file / edit_file) n&apos;a été exécuté.</p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-xs sm:col-span-2 lg:col-span-1">
            <span className="font-bold text-rose-700">7. L&apos;état Git ou secret falsifié</span>
            <p className="text-slate-600">Il prétend que <em>&quot;La branche Git est propre et synchronisée&quot;</em> sans avoir exécuté <code>git status</code>.</p>
          </div>
        </div>
      </section>

      {/* 3. Fait vs Hypothèse vs Information Inconnue vs Hallucination */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Fait vs Hypothèse vs Inconnue vs Hallucination</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour former un agent d&apos;élite, vous devez lui apprendre à classer chaque énoncé selon ce barème épistémologique :
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Statut épistémique</th>
                <th className="p-3">Définition rigoureuse</th>
                <th className="p-3">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-bold text-emerald-800">Fait confirmé</td>
                <td className="p-3">Information directement vérifiée dans une ressource fournie ou un retour d&apos;outil réel.</td>
                <td className="p-3 font-mono text-xs text-slate-800">Le fichier auth.js exporte checkPassword à la ligne 14.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-800">Hypothèse explicite</td>
                <td className="p-3">Déduction logique raisonnable mais clairement signalée comme devant être confirmée.</td>
                <td className="p-3 font-mono text-xs text-slate-800">Le serveur semble écouter sur le port 3000 par défaut (à vérifier dans server.ts).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-800">Information inconnue</td>
                <td className="p-3">Donnée non fournie que l&apos;agent reconnaît explicitement ne pas posséder.</td>
                <td className="p-3 font-mono text-xs text-slate-800">Je ne dispose pas du schéma de base de données pour confirmer le type de champ.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-rose-800">Hallucination toxique</td>
                <td className="p-3">Supposition non vérifiée présentée avec l&apos;aplomb et l&apos;autorité d&apos;un fait indiscutable.</td>
                <td className="p-3 font-mono text-xs text-slate-800">Le projet utilise Bcrypt avec 10 tours de salage (alors que Bcrypt n&apos;est nulle part).</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-emerald-800 text-xs">Fait confirmé</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Preuve directe</span>
            </div>
            <p className="text-slate-600 text-xs">Exemple : Le fichier auth.js exporte checkPassword à la ligne 14.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-amber-800 text-xs">Hypothèse explicite</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">À vérifier</span>
            </div>
            <p className="text-slate-600 text-xs">Exemple : Le serveur semble écouter sur le port 3000 par défaut (à vérifier).</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-rose-800 text-xs">Hallucination toxique</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">Inacceptable</span>
            </div>
            <p className="text-slate-600 text-xs">Exemple : Le projet utilise Bcrypt sans aucune preuve dans le code fourni.</p>
          </div>
        </div>
      </section>

      {/* 4. La hiérarchie des preuves à 6 niveaux */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>4. La hiérarchie des preuves techniques à 6 niveaux</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour qu&apos;une affirmation soit acceptée lors d&apos;un audit technique, l&apos;agent doit s&apos;aligner sur l&apos;échelle de force probante suivante :
        </p>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-emerald-950">NIVEAU 1 — Preuve matérielle directe</span>
            <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">Fichier inspecté / Sortie terminal</span>
          </div>
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-emerald-950">NIVEAU 2 — Trace d&apos;outil d&apos;exécution</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Diff Git / Log d&apos;exécution</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-blue-950">NIVEAU 3 — Documentation officielle de la stack</span>
            <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-bold">Docs Google Gen AI / Next.js / Node</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-amber-950">NIVEAU 4 — Connaissances paramétriques générales</span>
            <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">Mémoire d&apos;entraînement du modèle</span>
          </div>
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between">
            <span className="font-bold text-orange-950">NIVEAU 5 — Déduction non vérifiée</span>
            <span className="text-xs bg-orange-200 text-orange-900 px-2 py-0.5 rounded font-bold">Toléré uniquement si marqué &quot;Hypothèse&quot;</span>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between">
            <span className="font-bold text-rose-950">NIVEAU 6 — Pure supposition sans trace</span>
            <span className="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded font-bold">REJET &amp; FAUTE ÉLIMINATOIRE</span>
          </div>
        </div>
      </section>

      {/* 5. Directive système anti-hallucination */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>5. La directive d&apos;immunisation anti-hallucination pour Prompt</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Insérez ce bloc standardisé dans la section <strong>6. FIABILITÉ ET PREUVES</strong> de vos instructions système :
        </p>

        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-2 break-words min-w-0 max-w-full">
          <div className="text-rose-400 font-bold border-b border-slate-800 pb-1">
            # DIRECTIVE D&apos;IMMUNISATION FACTUELLE ET PRÉVENTION DES HALLUCINATIONS
          </div>
          <p className="text-slate-400">&lt;grounding_and_factual_accuracy&gt;</p>
          <p className="pl-4 text-emerald-400">1. OBLIGATION DE CITATION : Pour chaque constat technique, cite le chemin exact du fichier et les numéros de ligne correspondants.</p>
          <p className="pl-4 text-emerald-400">2. INTERDICTION FORMELLE D&apos;INVENTION : N&apos;invente jamais l&apos;existence d&apos;une route API, d&apos;une dépendance dans package.json, d&apos;un middleware ou d&apos;une fonction utilitaire non visible dans le code fourni.</p>
          <p className="pl-4 text-emerald-400">3. VÉRACITÉ DES OUTILS : Ne prétends JAMAIS qu&apos;un test a réussi ou qu&apos;un fichier a été modifié sans qu&apos;un appel d&apos;outil correspondant n&apos;apparaisse dans l&apos;historique de l&apos;échange.</p>
          <p className="pl-4 text-emerald-400">4. DÉCLARATION D&apos;INCONNUE : Si une information critique est absente pour formuler un diagnostic fiable, écris formellement : &quot;INFORMATION MANQUANTE : Je ne dispose pas du fichier [nom] pour attester de ce comportement.&quot;</p>
          <p className="text-slate-400">&lt;/grounding_and_factual_accuracy&gt;</p>
        </div>

        <Callout type="success" title="Principe d'honnêteté intellectuelle">
          L&apos;excellence d&apos;un agent IA dans votre IDE ne se mesure pas à sa capacité à inventer une réponse immédiate, mais à son courage d&apos;affirmer : <em>&quot;Je ne peux pas vérifier cette information sans inspecter ce fichier précis.&quot;</em>
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Neutralisation des hallucinations</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si un agent analyse un fichier Express de 20 lignes sans mention de base de données et écrit dans son rapport 'Le projet utilise MongoDB', comment qualifier cette affirmation ?",
              options: [
                "Une optimisation prédictive bienvenue",
                "Une hallucination technique grave (supposition non fondée présentée avec l'autorité d'un fait)",
                "Une directive système normale de Google Antigravity",
                "Un commentaire de code anodin"
              ],
              correctIndex: 1,
              explanation: "Faute de preuve matérielle directe dans le code inspecté, affirmer que le projet utilise MongoDB relève de l'invention pure et falsifie le diagnostic de l'audit."
            },
            {
              id: 2,
              question: "Selon la hiérarchie des preuves à 6 niveaux, quelle est la source de preuve la plus solide (Niveau 1) ?",
              options: [
                "L'intuition générale du modèle de langage issue de son entraînement",
                "La présence vérifiée du code dans le fichier inspecté ou la sortie brute d'une commande terminal",
                "Une conversation sur un forum affirmant que cette fonction existe",
                "Le nom du dossier contenant le projet"
              ],
              correctIndex: 1,
              explanation: "Seule la preuve matérielle directe (inspection directe du code ou sortie d'exécution d'un outil) constitue le Niveau 1 indiscutable."
            },
            {
              id: 3,
              question: "Que doit faire un agent lorsqu'il a besoin d'une information pour auditer la sécurité d'une route mais que le middleware associé n'est pas dans son contexte ?",
              options: [
                "Inventer le code le plus sécurisé possible pour rassurer l'utilisateur",
                "Déclarer formellement qu'il ne dispose pas de ce fichier et solliciter l'autorisation de le consulter",
                "Affirmer que la route est 100% sécurisée sans vérification",
                "Arrêter complètement l'IDE et redémarrer la machine"
              ],
              correctIndex: 1,
              explanation: "La règle de déclaration d'inconnue impose de reconnaître le manque d'information plutôt que de masquer le vide par une hallucination complaisante."
            }
          ]}
        />
      </section>
    </div>
  );
};
