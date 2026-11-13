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
          <span>Prompt Engineering IDE • Module 5</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 3 — Responsabilités étanches et non-chevauchement entre agents
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment empêcher vos agents de se marcher sur les pieds, arbitrer les divergences techniques et sécuriser le droit d&apos;écriture.
        </p>
      </div>

      {/* 1. Qu'est-ce qu'un chevauchement de missions ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-exclamation" className="w-5 h-5 text-indigo-600" />
          <span>1. Le piège mortel du chevauchement de missions</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Un <strong>chevauchement de missions</strong> survient lorsque deux agents s&apos;estiment simultanément compétents et autorisés pour modifier le même fichier ou résoudre le même problème.
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du bloc opératoire :</span>
          </div>
          <p>
            Dans une salle d&apos;opération, chaque professionnel a un rôle vital et exclusif. Le chirurgien incise. L&apos;anesthésiste surveille les constantes vitales. L&apos;infirmier transmet les instruments stériles. Imaginez le désastre si l&apos;anesthésiste s&apos;emparait soudain du bistouri pour réopérer le patient à sa façon sous prétexte que le rythme cardiaque s&apos;accélère !
          </p>
          <p>
            Avec les agents d&apos;IA, c&apos;est rigoureusement la même règle : <strong>un seul agent tient le bistouri de l&apos;écriture (l&apos;agent Développeur)</strong>. Tous les autres (Auditeur, Sécurité, Testeur) sont des vigies d&apos;inspection en lecture seule.
          </p>
        </div>

        <Callout type="warning">
          <strong>Règle d&apos;or d&apos;étanchéité :</strong> Les agents peuvent et doivent analyser le même code sous des prismes complémentaires (sécurité, propreté, tests), mais <strong>un seul et unique agent doit avoir le mandat d&apos;écriture</strong> sur le workspace, toujours sous contrôle humain.
        </Callout>
      </section>

      {/* 2. Ce qu'il doit faire vs Ce qu'il ne doit pas faire */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="scale" className="w-5 h-5 text-indigo-600" />
          <span>2. Frontières des responsabilités des 6 profils</span>
        </h2>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Agent Spécialisé</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-900">Ce qu&apos;il DOIT faire (Mandat)</th>
                <th className="p-3.5 border-b border-slate-200 text-rose-900">Ce qu&apos;il ne doit JAMAIS faire (Interdit formel)</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">1. Architecte</td>
                <td className="p-3.5 text-slate-700">Concevoir l&apos;arbre de fichiers, les interfaces et les flux de données.</td>
                <td className="p-3.5 text-rose-700 font-semibold">Développer du code source ou modifier des fichiers.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">2. Développeur</td>
                <td className="p-3.5 text-slate-700">Écrire et corriger le code selon les spécifications convenues.</td>
                <td className="p-3.5 text-rose-700 font-semibold">Bouleverser l&apos;architecture ou installer des bibliothèques sans accord.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">3. Auditeur Qualité</td>
                <td className="p-3.5 text-slate-700">Repérer la duplication, le couplage et les anti-patterns de code.</td>
                <td className="p-3.5 text-rose-700 font-semibold">Corriger lui-même le code : il ne fait que rapporter ses constats.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">4. Sécurité (AppSec)</td>
                <td className="p-3.5 text-slate-700">Traquer les injections, failles d&apos;authentification et fuites de secrets.</td>
                <td className="p-3.5 text-rose-700 font-semibold">Écrire du code applicatif ou tenter des attaques réelles destructives.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">5. Testeur (QA)</td>
                <td className="p-3.5 text-slate-700">Rédiger les scénarios, exécuter les suites de tests et certifier les résultats.</td>
                <td className="p-3.5 text-rose-700 font-semibold">Modifier le code testé pour masquer un échec ou inventer des réussites.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">6. Documentaliste</td>
                <td className="p-3.5 text-slate-700">Rédiger les guides, README et spécifications d&apos;API vérifiées.</td>
                <td className="p-3.5 text-rose-700 font-semibold">Documenter du code non testé ou modifier du code applicatif.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden space-y-3">
          {[
            { name: "Architecte", mandat: "Concevoir l'arborescence, les interfaces et les flux.", interdit: "Développer du code ou toucher aux fichiers." },
            { name: "Développeur", mandat: "Coder selon le plan technique validé.", interdit: "Changer l'architecture ou installer des paquets sans accord." },
            { name: "Auditeur Qualité", mandat: "Analyser la propreté, la duplication et la maintenabilité.", interdit: "Modifier directement les fichiers source." },
            { name: "Sécurité", mandat: "Détecter les failles OWASP et fuites de données sensibles.", interdit: "Écrire du code ou tenter des attaques destructives." },
            { name: "Testeur", mandat: "Vérifier le comportement applicatif avec des preuves réelles.", interdit: "Trafiquer le code pour masquer un test échoué." },
            { name: "Documentaliste", mandat: "Documenter fidèlement ce qui a été testé et validé.", interdit: "Inventer des fonctionnalités ou toucher au code applicatif." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
              <div className="font-bold text-indigo-700 text-sm">{item.name}</div>
              <div className="text-xs space-y-1">
                <div><span className="text-emerald-700 font-bold">Mandat :</span> {item.mandat}</div>
                <div><span className="text-rose-700 font-bold">Interdit :</span> {item.interdit}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Cas pratique : Route API Express avec faille SQL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="code-bracket" className="w-5 h-5 text-indigo-600" />
          <span>3. Étude de cas : Traitement concerté d&apos;une route vulnérable</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-800">
          Considérons ce snippet vulnérable découvert dans <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">src/routes/auth.js</code> :
        </p>

        {/* Code Box without pre */}
        <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed break-words space-y-1 border border-slate-800 min-w-0 max-w-full">
          <div className="text-slate-500">// Code initial dans src/routes/auth.js :</div>
          <div><span className="text-purple-400">app</span>.<span className="text-blue-400">post</span>(<span className="text-emerald-300">&quot;/api/login&quot;</span>, <span className="text-purple-400">async</span> (req, res) =&gt; &#123;</div>
          <div className="pl-4"><span className="text-purple-400">const</span> &#123; email, password &#125; = req.body;</div>
          <div className="pl-4 text-rose-400 font-bold">// DANGER : Concaténation de chaîne dans une requête SQL !</div>
          <div className="pl-4"><span className="text-purple-400">const</span> user = <span className="text-purple-400">await</span> db.query(<span className="text-emerald-300">`SELECT * FROM users WHERE email = &apos;$&#123;email&#125;&apos;`</span>);</div>
          <div className="pl-4">res.json(user);</div>
          <div>&#125;);</div>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Voici comment chaque agent réagit <strong>sans empiéter sur le rôle des autres</strong> :
        </p>

        <div className="grid gap-3 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-indigo-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              1. Architecte
            </span>
            <p className="text-slate-700">
              Constate que la route mélange le contrôleur HTTP et l&apos;accès direct à la base. Propose une architecture propre en 3 couches : Contrôleur → Service Auth → User Repository.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-rose-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              2. Sécurité (AppSec)
            </span>
            <p className="text-slate-700">
              Lève une alerte critique : risque d&apos;injection SQL immédiate via <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">&apos; OR &apos;1&apos;=&apos;1</code>. Exige formellement l&apos;usage d&apos;une requête préparée paramétrée.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-amber-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              3. Auditeur Qualité
            </span>
            <p className="text-slate-700">
              Relève l&apos;absence de bloc <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">try/catch</code> en cas de coupure de base, ainsi que le renvoi direct du hash de mot de passe dans le JSON de réponse.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              4. Développeur
            </span>
            <p className="text-slate-700">
              Reçoit la synthèse validée par l&apos;humain et <strong>est le seul à éditer le fichier</strong> : il remplace la chaîne par <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">db.query(&apos;SELECT ... WHERE email = ?&apos;, [email])</code> et filtre les données sensibles.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-purple-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              5. Testeur (QA)
            </span>
            <p className="text-slate-700">
              Écrit un test d&apos;injection automatisé, exécute la suite dans le terminal, et certifie par un log d&apos;exécution que la charge malveillante renvoie un code 401 Unauthorized sans fuiter de données.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              6. Documentaliste
            </span>
            <p className="text-slate-700">
              Met à jour la documentation d&apos;API (Swagger / Markdown) avec les nouveaux codes retour (200, 400, 401) et le schéma de réponse assaini (sans champ password).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Matrice RACI */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="table-cells" className="w-5 h-5 text-indigo-600" />
          <span>4. La matrice RACI de gouvernance multi-agents</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans le management de projet industriel, la matrice <strong>RACI</strong> permet d&apos;éviter qu&apos;une responsabilité soit floue :
        </p>

        <div className="grid gap-2 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
            <span className="font-bold text-indigo-900 text-sm">R (Responsible)</span>
            <p className="text-indigo-950 mt-1">Celui qui réalise concrètement la tâche (exactement 1 par tâche).</p>
          </div>
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="font-bold text-emerald-900 text-sm">A (Accountable)</span>
            <p className="text-emerald-950 mt-1">Celui qui valide et assume la décision finale (l&apos;humain).</p>
          </div>
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="font-bold text-amber-900 text-sm">C (Consulted)</span>
            <p className="text-amber-950 mt-1">L&apos;expert sollicité pour son avis technique ou sécuritaire.</p>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-900 text-sm">I (Informed)</span>
            <p className="text-slate-950 mt-1">Celui qui est informé du résultat une fois l&apos;étape terminée.</p>
          </div>
        </div>

        {/* Desktop RACI Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-3">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3 border-b border-slate-200">Activité du projet</th>
                <th className="p-3 border-b border-slate-200 text-center">Archi</th>
                <th className="p-3 border-b border-slate-200 text-center">Dév</th>
                <th className="p-3 border-b border-slate-200 text-center">Audit</th>
                <th className="p-3 border-b border-slate-200 text-center">Sécu</th>
                <th className="p-3 border-b border-slate-200 text-center">Test</th>
                <th className="p-3 border-b border-slate-200 text-center">Doc</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 text-center">
              <tr>
                <td className="p-3 text-left font-bold">1. Conception d&apos;architecture</td>
                <td className="p-3 font-black text-indigo-700 bg-indigo-50">R</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 text-left font-bold">2. Écriture &amp; édition du code</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 font-black text-indigo-700 bg-indigo-50">R</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 text-left font-bold">3. Audit qualité &amp; maintenabilité</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 font-black text-indigo-700 bg-indigo-50">R</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 text-left font-bold">4. Détection de vulnérabilités (AppSec)</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 font-black text-indigo-700 bg-indigo-50">R</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 text-left font-bold">5. Exécution des tests de régression</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 font-black text-indigo-700 bg-indigo-50">R</td>
                <td className="p-3 text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 text-left font-bold">6. Rédaction de la documentation</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-400">I</td>
                <td className="p-3 text-slate-500">C</td>
                <td className="p-3 font-black text-indigo-700 bg-indigo-50">R</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile RACI Card View */}
        <div className="sm:hidden space-y-3 mt-3">
          {[
            { task: "1. Conception architecture", r: "Architecte", c: "Dév, Audit, Sécu", i: "Testeur, Doc" },
            { task: "2. Écriture du code", r: "Développeur (Unique R)", c: "Audit, Sécu", i: "Archi, Test, Doc" },
            { task: "3. Audit qualité", r: "Auditeur", c: "—", i: "Tous les autres" },
            { task: "4. Audit sécurité", r: "Sécurité", c: "—", i: "Tous les autres" },
            { task: "5. Tests de régression", r: "Testeur", c: "—", i: "Tous les autres" },
            { task: "6. Documentation", r: "Documentaliste", c: "Archi, Dév, Test", i: "Audit, Sécu" },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
              <div className="font-bold text-slate-950">{item.task}</div>
              <div className="flex items-center gap-1.5"><span className="font-bold text-indigo-700">R (Réalisateur) :</span> <span>{item.r}</span></div>
              <div className="flex items-center gap-1.5 text-slate-600"><span>C (Consulté) :</span> <span>{item.c}</span></div>
              <div className="flex items-center gap-1.5 text-slate-500"><span>I (Informé) :</span> <span>{item.i}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Prompt universel de non-chevauchement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-indigo-600" />
          <span>5. La clause universelle de non-chevauchement des compétences</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-800">
          Insérez ce bloc de garde-fou dans les instructions de tous vos agents spécialisés pour éliminer définitivement les comportements de piratage de rôle :
        </p>

        {/* Prompt Card without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-300 font-bold">[CLAUSE_UNIVERSELLE_DE_NON_CHEVAUCHEMENT]</div>
          <div className="text-slate-300">1. STRICT RESPECT DU PÉRIMÈTRE MÉTIER :</div>
          <div className="pl-4 text-slate-200">Exécute exclusivement les tâches qui relèvent formellement de ton identité déclarée. Ne prends jamais l&apos;initiative d&apos;exécuter les responsabilités dévolues à un autre agent de l&apos;équipe.</div>
          <div className="text-slate-300">2. DÉTECTION HORS PÉRIMÈTRE :</div>
          <div className="pl-4 text-slate-200">Si tu découvres une anomalie relevant d&apos;un autre domaine (ex: une faille XSS alors que tu es l&apos;Auditeur Qualité), consigne-la dans ton rapport et signale explicitement qu&apos;elle doit être transférée à l&apos;agent Sécurité. Ne tente pas de la corriger toi-même.</div>
          <div className="text-slate-300">3. SANCTUARISATION DE L&apos;ÉCRITURE :</div>
          <div className="pl-4 text-slate-200">Si tu n&apos;es pas l&apos;agent Développeur mandaté pour la tâche en cours, tu opères en LECTURE SEULE STRICTE. Tout appel d&apos;outil de modification (edit_file, write_file) est formellement prohibé.</div>
          <div className="text-slate-300">4. ARBITRAGE HUMAIN OBLIGATOIRE :</div>
          <div className="pl-4 text-slate-200">La recommandation d&apos;un agent n&apos;est jamais une autorisation d&apos;exécution automatique. Toute modification requiert la validation formelle de l&apos;utilisateur.</div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Responsabilités et non-chevauchement
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 3"
          questions={[
            {
              id: 1,
              question: "Dans une équipe d'agents IA, combien d'agents doivent détenir le mandat 'R' (Responsable de réalisation) pour une tâche d'écriture de code ?",
              options: [
                "Exactement un seul agent à la fois (l'agent Développeur), pour prévenir tout conflit d'édition et toute régression contradictoire.",
                "Tous les agents en même temps pour terminer le travail plus rapidement.",
                "Zéro agent, les fichiers s'écrivent automatiquement par magie.",
                "Deux agents : l'auditeur et la sécurité pour qu'ils codent en double."
              ],
              correctIndex: 0,
              explanation: "Le principe fondamental de la matrice RACI est l'unicité du Responsable (un seul 'R'). Deux agents écrivant en même temps génèrent des conflits de code destructeurs."
            },
            {
              id: 2,
              question: "Si l'agent auditeur qualité détecte une faille de sécurité critique dans un fichier, que doit-il faire ?",
              options: [
                "Modifier le fichier en douce pour boucher la faille sans rien dire à personne.",
                "Consigner l'observation dans son rapport d'audit et recommander le transfert immédiat à l'agent Sécurité pour évaluation experte.",
                "Effacer le fichier concerné pour éliminer le danger.",
                "Ignorer l'observation parce que cela ne fait pas partie du style de code."
              ],
              correctIndex: 1,
              explanation: "L'auditeur reste dans son rôle d'observateur neutre : il alerte l'équipe et préconise l'intervention de l'expert en sécurité sans jamais toucher au code."
            },
            {
              id: 3,
              question: "Pourquoi l'analogie du bloc opératoire s'applique-t-elle si bien aux architectures multi-agents ?",
              options: [
                "Parce qu'elle illustre qu'un seul intervenant doit manipuler le 'bistouri' (l'écriture de code) pendant que les autres surveillent, évitant tout geste désordonné.",
                "Parce que les ordinateurs doivent être désinfectés à l'alcool à 90°.",
                "Parce que le prompt engineering est une branche de la médecine générale.",
                "Parce que les agents d'IA portent des blouses blanches."
              ],
              correctIndex: 0,
              explanation: "La séparation stricte entre les rôles de surveillance (lecture) et le rôle d'intervention physique (écriture) est le seul moyen de garantir la sécurité du système."
            }
          ]}
        />
      </section>
    </div>
  );
};
