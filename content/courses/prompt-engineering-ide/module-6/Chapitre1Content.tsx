'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 1 — Le principe du moindre privilège (PoLP)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Pourquoi et comment restreindre drastiquement les pouvoirs techniques d&apos;un agent IA dans votre IDE pour éviter les catastrophes silencieuses.
        </p>
      </div>

      {/* 1. Pourquoi limiter impérativement les pouvoirs ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-check" className="w-5 h-5 text-indigo-600" />
          <span>1. Pourquoi limiter impérativement les pouvoirs d&apos;un agent IA ?</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un IDE moderne comme Google Antigravity, un agent IA dispose d&apos;un potentiel colossal : il peut parcourir l&apos;arborescence du disque dur, modifier du code source, exécuter des commandes bash ou PowerShell, installer des paquets npm et contacter des API distantes.
        </p>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Cependant, <strong>capacité technique ne doit jamais rimer avec licence illimitée</strong>. Si vous demandez à un agent : <em>« Analyse le temps de chargement de mon composant panier »</em>, a-t-il besoin de modifier le fichier ? De supprimer des dépendances ? De lire vos clés Stripe dans <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">.env</code> ? <strong>Absolument pas.</strong>
        </p>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie du livreur de pizza et du passe-partout :</span>
          </div>
          <p>
            Quand un livreur de pizza arrive à votre immeuble, vous lui donnez le code du hall d&apos;entrée pour qu&apos;il monte au troisième étage. Vous ne lui donnez jamais la clé de votre appartement, ni le code de votre coffre-fort, ni les clés de votre voiture dans le garage !
          </p>
          <p>
            Pour un agent IA, c&apos;est exactement la même exigence : c&apos;est le <strong>Principe du Moindre Privilège (Principle of Least Privilege - PoLP)</strong>. L&apos;agent ne doit posséder à aucun instant plus de droits d&apos;accès que le strict minimum vital nécessaire pour accomplir sa tâche immédiate.
          </p>
        </div>

        <Callout type="warning">
          <strong>Règle d&apos;or de sécurité (PoLP) :</strong> Si une tâche peut être accomplie en lecture seule, l&apos;outil d&apos;écriture doit être techniquement inaccessible. Si elle peut être accomplie sans terminal, le shell doit être coupé.
        </Callout>
      </section>

      {/* 2. L'échelle des 5 niveaux de privilèges */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="bars-arrow-up" className="w-5 h-5 text-indigo-600" />
          <span>2. L&apos;échelle graduée des 5 niveaux de privilèges</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans la gestion professionnelle des agents, on classe les permissions techniques selon 5 niveaux croissants de dangerosité :
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">NIVEAU 1 — PRIVILÈGE MINIMAL</span>
              <h4 className="font-bold text-slate-950 text-sm">Consultation (Lecture seule)</h4>
              <p className="text-xs text-slate-600">L&apos;agent peut uniquement lire les fichiers ciblés via <code className="font-mono text-xs">view_file</code> ou <code className="font-mono text-xs">grep_search</code> et produire une analyse dans le chat.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">Risque nul</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">NIVEAU 2</span>
              <h4 className="font-bold text-slate-950 text-sm">Propositions textuelles &amp; Diffs virtuels</h4>
              <p className="text-xs text-slate-600">L&apos;agent rédige des suggestions de code et des plans d&apos;action dans la fenêtre de chat, sans modifier aucun fichier physique.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg shrink-0">Zéro impact disque</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">NIVEAU 3</span>
              <h4 className="font-bold text-slate-950 text-sm">Édition ciblée de fichiers</h4>
              <p className="text-xs text-slate-600">L&apos;agent dispose de <code className="font-mono text-xs">edit_file</code> sur une liste blanche de fichiers prédéfinis, après validation formelle du Diff par l&apos;humain.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg shrink-0">Validation Diff</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">NIVEAU 4</span>
              <h4 className="font-bold text-slate-950 text-sm">Commandes Shell supervisées</h4>
              <p className="text-xs text-slate-600">L&apos;agent peut exécuter des commandes terminal inoffensives et non destructives (<code className="font-mono text-xs">npm test</code>, <code className="font-mono text-xs">npm run lint</code>, <code className="font-mono text-xs">git status</code>).</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg shrink-0">Surveillance Shell</span>
          </div>

          <div className="p-4 bg-white border-2 border-rose-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">NIVEAU 5 — DANGER MAXIMAL</span>
              <h4 className="font-bold text-rose-950 text-sm">Administration &amp; Déploiement</h4>
              <p className="text-xs text-rose-800">Commandes destructives (<code className="font-mono text-xs">rm</code>, <code className="font-mono text-xs">drop database</code>), push git ou installation globale. Banni par défaut pour les agents d&apos;IDE.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-rose-600 text-white rounded-lg shrink-0">Interdit par défaut</span>
          </div>
        </div>
      </section>

      {/* 3. Triptyque fondamental : Mission vs Permission vs Autorisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="key" className="w-5 h-5 text-indigo-600" />
          <span>3. Triptyque fondamental : Mission vs Permission vs Autorisation</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Ne confondez jamais ces trois concepts : une des plus grandes causes d&apos;accidents avec les agents IA est de croire qu&apos;une permission technique vaut mandat d&apos;action.
        </p>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-slate-100 text-slate-900 text-xs font-black uppercase">
              <tr>
                <th className="p-3.5 border-b border-slate-200">Concept</th>
                <th className="p-3.5 border-b border-slate-200 text-indigo-900">Définition exacte</th>
                <th className="p-3.5 border-b border-slate-200 text-emerald-900">Exemple concret</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold text-indigo-700">1. Mission</td>
                <td className="p-3.5 text-slate-700">L&apos;objectif fonctionnel confié par l&apos;utilisateur dans son prompt.</td>
                <td className="p-3.5 font-mono text-xs text-indigo-900">« Corrige le calcul de TVA dans la commande »</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-emerald-700">2. Permission</td>
                <td className="p-3.5 text-slate-700">La boîte à outils rendue techniquement disponible dans l&apos;IDE.</td>
                <td className="p-3.5 font-mono text-xs text-emerald-900">Outil edit_file activé dans le frontmatter YAML de l&apos;agent</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-amber-700">3. Autorisation</td>
                <td className="p-3.5 text-slate-700">L&apos;accord ponctuel, explicite et circonstancié donné par l&apos;humain pour un fichier précis.</td>
                <td className="p-3.5 font-mono text-xs text-amber-900">« Oui, j&apos;approuve le Diff : modifie CartService.ts uniquement »</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-indigo-700 text-sm">1. Mission</div>
            <div><strong>Définition :</strong> L&apos;objectif confié par l&apos;utilisateur.</div>
            <div className="font-mono bg-slate-50 p-2 rounded text-slate-800">« Corrige le bug de calcul dans le panier »</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-emerald-700 text-sm">2. Permission</div>
            <div><strong>Définition :</strong> Les outils techniques mis à disposition dans l&apos;IDE.</div>
            <div className="font-mono bg-slate-50 p-2 rounded text-slate-800">Outil edit_file présent dans la configuration</div>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm text-xs">
            <div className="font-bold text-amber-700 text-sm">3. Autorisation</div>
            <div><strong>Définition :</strong> L&apos;accord humain ponctuel pour agir sur un fichier précis.</div>
            <div className="font-mono bg-slate-50 p-2 rounded text-slate-800">« Oui, applique ce Diff sur CartService.ts »</div>
          </div>
        </div>
      </section>

      {/* 4. Prompt universel du moindre privilège */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>4. La directive universelle du moindre privilège</span>
        </h2>
        
        <p className="text-sm sm:text-base text-slate-800">
          Ce bloc de directives doit figurer au début des instructions système de vos agents pour formaliser leur docilité sécuritaire :
        </p>

        {/* Prompt Card without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE SÉCURITÉ : MOINDRE PRIVILÈGE (PoLP) ===
          </div>
          <div className="text-indigo-300 font-bold">[1. PARCIMONIE DES PRIVILÈGES]</div>
          <div className="text-slate-200">
            Adopte systématiquement le niveau de privilège le plus bas capable de résoudre la tâche. Si une question peut être traitée par une simple lecture, ne sollicite aucune écriture.
          </div>

          <div className="text-amber-300 font-bold pt-1">[2. SANCTUARISATION DU SYSTÈME]</div>
          <div className="pl-4 text-slate-200">
            • N&apos;explore aucun dossier en dehors du répertoire racine du projet assigné.<br />
            • Ne lis jamais les fichiers .env, .env.local, .pem, .key ou certificats TLS.<br />
            • Ne divulgue aucun secret (clé API, hash, mot de passe) dans tes réponses ou tes logs.
          </div>

          <div className="text-rose-400 font-bold pt-1">[3. DEMANDE D&apos;ÉLÉVATION DE PRIVILÈGES (ESCALATION)]</div>
          <div className="pl-4 text-slate-200">
            Si une étape nécessite de passer au niveau supérieur (ex: modifier un fichier source ou exécuter une commande de test) :<br />
            1. Arrête-toi immédiatement avant d&apos;agir.<br />
            2. Justifie techniquement le besoin en listant les fichiers concernés.<br />
            3. Attends la confirmation explicite de l&apos;utilisateur humain.
          </div>
        </div>
      </section>

      {/* 5. Atelier guidé (TP 6.1) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-indigo-600" />
          <span>5. Atelier pratique (TP 6.1) : Choisir le bon niveau de privilège</span>
        </h2>
        
        <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm space-y-3">
          <p className="text-sm sm:text-base text-slate-800 font-medium">
            Pour chacune des 3 situations ci-dessous, déterminez le niveau de privilège strictement requis :
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 pl-2 border-l-2 border-indigo-400">
            <div><strong>Situation A :</strong> « Pourquoi ma fonction de tri renvoie-t-elle les noms dans le désordre ? » → <strong>Niveau 1 (Consultation en lecture seule)</strong> : l&apos;agent n&apos;a besoin que de lire la fonction et d&apos;expliquer la faille logique dans le chat.</div>
            <div><strong>Situation B :</strong> « Corrige la faute d&apos;orthographe dans le footer de la page d&apos;accueil » → <strong>Niveau 3 (Édition ciblée)</strong> : modification du fichier <code className="font-mono text-xs">Footer.jsx</code> uniquement, après confirmation.</div>
            <div><strong>Situation C :</strong> « Vérifie si la suite de tests jest passe toujours au vert » → <strong>Niveau 4 (Exécution de commande)</strong> : lancement supervisé de <code className="font-mono text-xs">npm test</code> dans le terminal.</div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Principe du moindre privilège
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 1"
          questions={[
            {
              id: 1,
              question: "Quelle est la définition exacte du Principe du Moindre Privilège (PoLP) appliqué aux agents IA ?",
              options: [
                "Accorder à l'agent uniquement et strictement les accès, permissions et outils minimaux indispensables pour accomplir sa mission immédiate.",
                "Faire en sorte que l'agent consomme le moins de bande passante réseau possible.",
                "Interdire à l'agent de poser des questions à l'utilisateur.",
                "Donner les droits administrateur racine à tous les sous-agents pour aller plus vite."
              ],
              correctIndex: 0,
              explanation: "Le PoLP garantit que même en cas de bogue, d'hallucination ou de piratage, l'agent ne dispose pas des droits nécessaires pour causer de dégâts matériels."
            },
            {
              id: 2,
              question: "Un agent qui dispose techniquement de l'outil d'édition de fichier est-il automatiquement en droit de modifier n'importe quel fichier du projet ?",
              options: [
                "Non, la capacité technique (permission) ne constitue jamais une autorisation : chaque acte d'écriture requiert un mandat précis ou un accord humain explicite.",
                "Oui, car avoir l'outil implique qu'on a le droit de l'utiliser partout.",
                "Oui, mais seulement sur les fichiers HTML.",
                "Non, sauf s'il travaille un dimanche."
              ],
              correctIndex: 0,
              explanation: "Il y a une différence fondamentale entre ce qui est techniquement faisable (permission) et ce qui a été expressément approuvé par l'utilisateur (autorisation)."
            },
            {
              id: 3,
              question: "Dans l'analogie du livreur de pizza, que représente le code du hall d'entrée par rapport à la clé de l'appartement ?",
              options: [
                "Le droit d'accès temporaire minimal nécessaire pour accomplir sa livraison (Niveau 1), tandis que la clé de l'appartement représente un privilège excessif et dangereux (Niveau 5).",
                "Le fait que les pizzas doivent être livrées chaudes.",
                "Une simple formalité administrative sans rapport avec la sécurité.",
                "Une commande PowerShell d'extinction d'ordinateur."
              ],
              correctIndex: 0,
              explanation: "Donner au livreur l'accès au hall suffit à sa mission. Lui donner les clés de votre domicile constitue une élévation de privilège inconsidérée et risquée."
            }
          ]}
        />
      </section>
    </div>
  );
};
