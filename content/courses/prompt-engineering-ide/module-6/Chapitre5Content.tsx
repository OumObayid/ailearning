'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Protection des variables d&apos;environnement (.env)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment sanctuariser vos secrets de configuration, auditer l&apos;usage de <code className="font-mono text-xs font-bold bg-purple-100 text-purple-900 px-1 py-0.5 rounded">process.env</code> sans jamais dévoiler de valeurs réelles et dépasser l&apos;illusion du <code className="font-mono text-xs font-bold bg-purple-100 text-purple-900 px-1 py-0.5 rounded">.gitignore</code>.
        </p>
      </div>

      {/* 1. Pourquoi .env est ultrasensible */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="key" className="w-5 h-5 text-indigo-600" />
          <span>1. Pourquoi les fichiers .env sont le cœur nucléaire de votre projet</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans une application web moderne (Next.js, Express, React), le fichier <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded font-bold">.env</code> concentre tous les secrets industriels de votre produit : clés API payantes (Gemini, OpenAI, Stripe), identifiants de bases de données de production et clés cryptographiques privées de signature de sessions.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de l&apos;expert-comptable et du coffre-fort :</span>
          </div>
          <p>
            Quand un expert-comptable audite les comptes d&apos;une bijouterie, a-t-il besoin de manipuler les lingots d&apos;or ou de connaître la combinaison du coffre-fort blindé ? Jamais de la vie ! Il a uniquement besoin de vérifier les factures, les écritures comptables et de s&apos;assurer que la formule de TVA est juste.
          </p>
          <p>
            Pour un agent IA, c&apos;est rigoureusement la même règle : pour auditer votre code ou corriger un bug d&apos;appel API, <strong>l&apos;agent n&apos;a JAMAIS besoin de lire votre véritable clé secrète</strong>. Il lui suffit de savoir que la variable <code className="font-mono text-xs bg-indigo-100 px-1 py-0.5 rounded text-indigo-900">process.env.GEMINI_API_KEY</code> est bien appelée dans le constructeur.
          </p>
        </div>

        <Callout type="danger">
          <strong>Principe d&apos;étanchéité des secrets :</strong> Un agent qui tente d&apos;ouvrir un fichier <code className="font-mono text-xs">.env</code> sous prétexte de « vérifier la configuration » commet une faute de sécurité grave. L&apos;audit porte sur la présence du code de chargement, jamais sur le secret lui-même.
        </Callout>
      </section>

      {/* 2. .env vs .env.example */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-duplicate" className="w-5 h-5 text-indigo-600" />
          <span>2. .env (Confidentiel) vs .env.example (Modèle public)</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          La méthode professionnelle pour permettre à un agent d&apos;appréhender la configuration sans risque consiste à créer un fichier miroir factice : le fichier <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded font-bold">.env.example</code> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border-2 border-rose-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-rose-950 text-base">Fichier .env (STRICTEMENT INTERDIT)</h4>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Secrets réels</span>
            </div>
            {/* Box without pre */}
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div>PORT=3000</div>
              <div className="text-rose-400 font-bold">GEMINI_API_KEY=AIzaSyA_CLE_REELLE_99€</div>
              <div className="text-rose-400 font-bold">DATABASE_URL=postgres://root:p@ssword@db.host</div>
            </div>
            <p className="text-xs text-rose-800 font-bold">
              Ne doit JAMAIS être ouvert, recopié ni affiché par l&apos;agent sous aucun prétexte.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-emerald-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-emerald-950 text-base">Fichier .env.example (AUTORISÉ)</h4>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Gabarit public</span>
            </div>
            {/* Box without pre */}
            <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div>PORT=3000</div>
              <div className="text-emerald-400 font-bold">GEMINI_API_KEY=votre_cle_gemini_ici</div>
              <div className="text-emerald-400 font-bold">DATABASE_URL=postgres://user:password@localhost:5432/db</div>
            </div>
            <p className="text-xs text-emerald-800 font-bold">
              Documente les noms des variables attendues sans exposer la moindre donnée sensible.
            </p>
          </div>
        </div>
      </section>

      {/* 3. L'illusion du .gitignore */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-exclamation" className="w-5 h-5 text-indigo-600" />
          <span>3. Le piège fatal : l&apos;illusion du .gitignore</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Beaucoup de développeurs imaginent à tort que parce que <code className="font-mono text-xs">.env</code> est inscrit dans leur fichier <code className="font-mono text-xs">.gitignore</code>, l&apos;agent IA ne peut pas y accéder. <strong>C&apos;est totalement faux !</strong>
        </p>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="exclamation-triangle" className="w-4 h-4 text-amber-700" />
            <span>Pourquoi .gitignore ne protège PAS contre un agent IA local :</span>
          </div>
          <p>
            Le fichier <code className="font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">.gitignore</code> est uniquement lu par la commande <code className="font-mono text-xs">git commit</code> pour ne pas envoyer le fichier sur GitHub. Mais pour un agent qui s&apos;exécute dans votre IDE, le fichier <code className="font-mono text-xs">.env</code> est un fichier ordinaire présent sur votre disque dur !
          </p>
          <p>
            Si l&apos;agent appelle l&apos;outil système <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">view_file(&#123; Path: &quot;.env&quot; &#125;)</code>, l&apos;IDE lui fournira le contenu en clair si aucune règle négative explicite ne le bloque techniquement.
          </p>
        </div>
      </section>

      {/* 4. Analyser sans divulguer */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="code-bracket" className="w-5 h-5 text-indigo-600" />
          <span>4. Analyser la présence d&apos;une variable sans divulguer sa valeur</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-rose-800 uppercase">PRATIQUE DANGEREUSE (Fuite dans les logs)</span>
            {/* Box without pre */}
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div className="text-slate-500">// DANGER : La clé secrète fuite dans la console et les traces</div>
              <div><span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-emerald-300">&quot;Ma clé API :&quot;</span>, process.env.API_KEY);</div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase">BONNE PRATIQUE (Test d&apos;existence booléen)</span>
            {/* Box without pre */}
            <div className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
              <div className="text-slate-500">// SÛR : Vérifie la présence sans jamais imprimer la chaîne</div>
              <div><span className="text-purple-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-emerald-300">&quot;Clé configurée :&quot;</span>, <span className="text-blue-400">Boolean</span>(process.env.API_KEY));</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Directive de sanctuarisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>5. Directive d&apos;instructions : Sanctuarisation des variables d&apos;environnement</span>
        </h2>

        {/* Prompt Card without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE SANCTUARISATION DES VARIABLES D&apos;ENVIRONNEMENT ===
          </div>
          <div className="text-indigo-300 font-bold">[1. INTERDICTION DE LECTURE ABSOLUE]</div>
          <div className="text-slate-200">
            Ne consulte, n&apos;ouvre et n&apos;extrais JAMAIS le contenu des fichiers : .env, .env.local, .env.development, .env.production, .env.test. Tout appel d&apos;outil vers ces chemins est formellement prohibé.
          </div>

          <div className="text-amber-300 font-bold pt-1">[2. ANALYSE DU GABARIT PUBLIC SEUL]</div>
          <div className="pl-4 text-slate-200">
            Si tu as besoin de connaître les noms des variables de configuration du projet, consulte exclusivement .env.example. Si ce fichier n&apos;existe pas, demande à l&apos;utilisateur la liste des noms des variables requises.
          </div>

          <div className="text-rose-400 font-bold pt-1">[3. MASQUAGE SYSTÉMATIQUE (REDACTION)]</div>
          <div className="pl-4 text-slate-200">
            Si par mégarde une clé d&apos;API ou un mot de passe apparaît dans une trace console ou un message d&apos;erreur, remplace immédiatement sa valeur par &lt;REDACTED_SECRET&gt; dans ta réponse.
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Protection des variables d&apos;environnement
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 5"
          questions={[
            {
              id: 1,
              question: "Pourquoi l'inscription de .env dans votre fichier .gitignore ne protège-t-elle PAS ce fichier contre la lecture par un agent IA dans l'IDE ?",
              options: [
                "Parce que .gitignore indique seulement à Git de ne pas versionner le fichier lors d'un push ; mais sur votre disque dur local, le fichier reste parfaitement lisible par n'importe quel outil ou agent de l'IDE.",
                "Parce que Git ignore les fichiers qui contiennent le mot 'secret'.",
                "Parce que .gitignore ne fonctionne que sur Mac OS.",
                "Parce que les fichiers .env sont automatiquement cryptés par le processeur."
              ],
              correctIndex: 0,
              explanation: ".gitignore est une règle pour Git, pas pour le système de fichiers. L'agent local s'exécutant sur votre machine peut lire le fichier .env si l'IDE ne dispose pas d'un filtre dédié."
            },
            {
              id: 2,
              question: "Quelle est la méthode recommandée pour diagnostiquer si une clé API est bien chargée sans risquer de l'exposer dans les traces de débogage ?",
              options: [
                "console.log('Clé configurée :', Boolean(process.env.API_KEY));",
                "console.log('Ma clé secrète est :', process.env.API_KEY);",
                "alert(process.env.API_KEY);",
                "Envoyer la clé par e-mail à l'administrateur."
              ],
              correctIndex: 0,
              explanation: "Convertir la valeur en booléen (Boolean(valeur)) permet de vérifier avec certitude que la variable est définie sans jamais imprimer la chaîne de caractères confidentielle."
            },
            {
              id: 3,
              question: "Quel est le rôle du fichier .env.example vis-à-vis d'un agent IA ?",
              options: [
                "Fournir un modèle public documentant les noms des variables attendues (ex: GEMINI_API_KEY=) sans contenir le moindre secret de production réel.",
                "Faire planter l'agent exprès.",
                "Remplacer le fichier package.json.",
                "Créer une sauvegarde chiffrée de la base de données."
              ],
              correctIndex: 0,
              explanation: ".env.example est le contrat public de configuration : il indique à l'agent et aux autres développeurs quelles variables doivent exister, sans risquer de fuite de données réelles."
            }
          ]}
        />
      </section>
    </div>
  );
};
