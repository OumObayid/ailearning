'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

export const Chapitre4Content: React.FC = () => {
  const [rawLogInput, setRawLogInput] = useState<string>(
    '{"level":"error","time":"2026-11-09T08:15:30Z","msg":"DB Auth Failed","db_pass":"SuperSecretPass123!","email":"alice.martin@enterprise.com","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}'
  );

  const cleanLog = (text: string): string => {
    return text
      .replace(/"db_pass":"[^"]+"/g, '"db_pass":"[REDACTED_SECRET]"')
      .replace(/"token":"ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+"/g, '"token":"[REDACTED_JWT]"')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');
  };

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 6 • Chapitre 4 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            Télémétrie d&apos;Incident & Anonymisation Sécurisée
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Transmettre des logs et des Stack Traces à un modèle IA : Anatomie des piles V8, anonymisation des secrets et prompts haute fidélité
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Transmettre des données d&apos;erreur à un modèle de langage s&apos;apparente à <strong>la remise d&apos;une boîte noire d&apos;avion aux enquêteurs du Bureau d&apos;Enquêtes et d&apos;Analyses (BEA)</strong> :
          si vous transmettez 10 000 lignes de logs bruts non filtrés, vous noyez l&apos;enquête sous un bruit statistique assourdissant ;
          si vous coupez la moitié des frames de la pile d&apos;appels, vous supprimez les indices cruciaux ;
          et si vous oubliez d&apos;anonymiser les mots de passe et les jetons JWT, vous transformez une simple session de débogage en faille de sécurité majeure.
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
            <span>Déchiffrer la grammaire exacte d&apos;une Stack Trace V8 (Error Name, Error Message, Call Sites, Frames applicatifs vs internes).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Structurer les journaux au format JSON industriel (Pino, Winston) avec niveaux de sévérité et Correlation IDs (RequestId).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser le protocole d&apos;anonymisation systématique (Redaction) des secrets d&apos;infrastructure, mots de passe et PII (RGPD).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Concevoir des invites de diagnostic calibrées sans dépasser la fenêtre de contexte ni diluer l&apos;attention du LLM.</span>
          </li>
        </ul>
      </section>

      {/* 2. Distinction fondamentale : Logs vs Stack Traces */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Distinction fondamentale : Le journal chronologique (Logs) vs La radiographie d&apos;exception (Stack Trace)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          En ingénierie logicielle, les logs et les Stack Traces ne sont pas interchangeables : ils apportent deux éclairages orthogonaux indispensables à l&apos;IA :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-lime-900 font-bold text-xs uppercase tracking-wider">
              <Icon name="server" className="w-4 h-4 text-lime-700" />
              <span>Les Journaux d&apos;Événements (Logs)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Perspective temporelle continue (Le film) :</strong> Les logs enregistrent les événements séquentiels qui se sont produits <em>avant</em>, <em>pendant</em> et <em>après</em> la transaction.
              Ils fournissent le contexte : l&apos;adresse IP du client, les paramètres de requête, le début de la transaction SQL et le temps de réponse.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800">
              &#123;&quot;level&quot;:&quot;info&quot;,&quot;msg&quot;:&quot;Auth valid&quot;,&quot;userId&quot;:42&#125;<br />
              &#123;&quot;level&quot;:&quot;warn&quot;,&quot;msg&quot;:&quot;Slow query (820ms)&quot;&#125;<br />
              &#123;&quot;level&quot;:&quot;error&quot;,&quot;msg&quot;:&quot;Payment failed&quot;&#125;
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-lime-900 font-bold text-xs uppercase tracking-wider">
              <Icon name="terminal" className="w-4 h-4 text-lime-700" />
              <span>La Pile d&apos;Appels (Stack Trace)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Perspective structurelle instantanée (L&apos;arrêt sur image) :</strong> La Stack Trace capture la chaîne hiérarchique exacte des fonctions en cours d&apos;évaluation au moment précis où le moteur a levé une exception.
              Elle indique le fichier exact, le numéro de ligne et le décalage de colonne de la rupture.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800">
              TypeError: Cannot read properties of null<br />
              &nbsp;&nbsp;at chargeCard (paymentService.ts:38:12)<br />
              &nbsp;&nbsp;at checkout (cartController.ts:85:20)
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomie d'une Stack Trace V8 : Décoder chaque composant */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Anatomie d&apos;une Stack Trace V8 : Filtrer le signal utile face au bruit
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Voici une Stack Trace classique générée par un serveur Node.js lors d&apos;un crash en production :
        </p>

        <CodeBlock
          filename="logs/runtime-exception.log"
          language="bash"
          code={`TypeError: Cannot read properties of null (reading 'balance')
    at processAccountDebit (/app/src/services/walletService.ts:47:19)
    at async transferFunds (/app/src/services/transactionService.ts:112:5)
    at async handleTransferRequest (/app/src/controllers/transferController.ts:34:22)
    at async /app/node_modules/express/lib/router/layer.js:95:5
    at async processTicksAndRejections (node:internal/process/task_queues:95:5)`}
        />

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Composant de la Trace</th>
                <th className="px-4 py-3">Signification pour l&apos;Ingénieur</th>
                <th className="px-4 py-3">Utilité pour le Modèle IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-rose-700">Ligne d&apos;en-tête (Header)</td>
                <td className="px-4 py-2.5"><code>TypeError</code> : tentative d&apos;accès à <code>balance</code> sur une référence <code>null</code>.</td>
                <td className="px-4 py-2.5">Définit la nature de l&apos;invariant violé dans le code JavaScript.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-emerald-700">Premier Frame (Line of Crash)</td>
                <td className="px-4 py-2.5"><code>walletService.ts:47:19</code> : point d&apos;explosion exact dans votre code métier.</td>
                <td className="px-4 py-2.5">Indique au LLM le fichier prioritaire dont le code doit être examiné.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-sky-700">Frames Intermédiaires</td>
                <td className="px-4 py-2.5"><code>transactionService.ts:112</code> $\rightarrow$ <code>transferController.ts:34</code>.</td>
                <td className="px-4 py-2.5">Permet à l&apos;IA de reconstituer la chaîne d&apos;appels et le flux de données en amont.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-400">Bruit système (Runtime Frames)</td>
                <td className="px-4 py-2.5"><code>node_modules/express</code> et <code>node:internal/process/task_queues</code>.</td>
                <td className="px-4 py-2.5">Inutile : peut être élagué pour économiser les tokens sans perdre de signal.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visuel 1 : image5.jpeg */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-3 my-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Icon name="terminal" className="w-4 h-4 text-emerald-700" />
            <span>Inspection visuelle de la chaîne d&apos;appels (Stack Trace)</span>
          </div>
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
            <Image
              src="/images/cours/debugging/module-6/image5.jpeg"
              alt="Analyse détaillée d'une Stack Trace avec chaîne de causalité"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-xs text-slate-600 italic">
            Figure 6.4.1 — Visualisation de la pile d&apos;appels : identification du point de rupture supérieur (ligne fautive) et remontée chronologique des contextes appelants jusqu&apos;au point d&apos;entrée de la requête HTTP.
          </p>
        </div>

        {/* Visuel 2 : image6.jpeg */}
        <div className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-3 my-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Icon name="code" className="w-4 h-4 text-amber-700" />
            <span>Capture de Stack Trace asynchrone dans la console Chrome DevTools</span>
          </div>
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
            <Image
              src="/images/cours/debugging/module-6/image6.jpeg"
              alt="Console Chrome DevTools affichant une exception JavaScript avec pile d'appels asynchrone"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-xs text-slate-600 italic">
            Figure 6.4.2 — Panneau Console de Chrome DevTools : capture complète d&apos;une exception non interceptée avec Async Stack Tracing, permettant de franchir les frontières des micro-tâches de l&apos;Event Loop V8.
          </p>
        </div>
      </section>

      {/* 4. Anonymisation industrielle des secrets (Redaction) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            L&apos;anonymisation obligatoire (Data Scrubbing & Redaction)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Envoyer des logs bruts de production à un modèle d&apos;IA tiers sans nettoyage préalable constitue une violation grave de la sécurité de l&apos;entreprise et des réglementations internationales (RGPD, PCI-DSS, HIPAA).
          Avant d&apos;intégrer un journal dans un prompt, appliquez systématiquement un filtre de masquage :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
            <span className="font-bold text-rose-800">1. Mots de passe & Secrets DB</span>
            <p className="text-slate-600">Remplacer les chaînes de connexion <code>mysql://user:pass@host</code> et les clés de chiffrement par <code>[REDACTED_SECRET]</code>.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
            <span className="font-bold text-rose-800">2. Jetons JWT & Clés d&apos;API</span>
            <p className="text-slate-600">Masquer les en-têtes <code>Authorization: Bearer eyJ...</code> et clés Stripe/OpenAI par <code>[REDACTED_JWT]</code>.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
            <span className="font-bold text-rose-800">3. Données PII Utilisateurs</span>
            <p className="text-slate-600">Substituer les adresses emails, numéros de cartes bancaires et adresses postales par des pseudonymes anonymes.</p>
          </div>
        </div>

        {/* Simulateur d'Anonymisation */}
        <div className="p-5 rounded-3xl border-2 border-emerald-300 bg-emerald-50/40 space-y-4 my-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
              <Icon name="shield-check" className="w-5 h-5 text-emerald-700" />
              <span>Simulateur en direct : Masquage automatique de journal sensible (Redaction Tool)</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 border border-emerald-400">
              Outil Sécurité
            </span>
          </div>

          <p className="text-xs text-slate-700">
            Modifiez le log JSON ci-dessous pour observer en temps réel la neutralisation des identifiants confidentiels avant envoi au LLM :
          </p>

          <textarea
            value={rawLogInput}
            onChange={(e) => setRawLogInput(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Résultat anonymisé et sécurisé pour le prompt :
            </span>
            <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre-wrap border border-slate-800">
              {cleanLog(rawLogInput)}
            </pre>
          </div>
        </div>
      </section>

      {/* 5. Le modèle de prompt de transmission canonique */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le modèle de prompt d&apos;erreur canonique prêt à l&apos;emploi
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Voici le gabarit standard utilisé par les équipes d&apos;ingénierie pour soumettre un incident complexe à un modèle d&apos;IA :
        </p>

        <CodeBlock
          filename="templates/incident-prompt-template.md"
          language="markdown"
          code={`### ROLE
Tu es un ingénieur principal SRE / Backend spécialisé dans l'analyse post-mortem d'incidents distribués.

### OBJECTIVE
Diagnostiquer la cause racine de l'échec de transaction décrit dans les logs et la Stack Trace ci-dessous.

### CONTEXT
- Système : API Microservices Node.js 22 + MySQL 8.0
- Bibliothèques : express 5.0, mysql2 3.11, prisma 6.0
- Environnement : Conteneur Linux Alpine sous Kubernetes

### DATA - LOGS CHRONOLOGIQUES (ANONYMISÉS)
[2026-11-09T08:14:02.110Z] INFO (order-service): Transaction started req_id="req-9841"
[2026-11-09T08:14:02.450Z] WARN (order-service): Inventory check latency high (340ms) req_id="req-9841"
[2026-11-09T08:14:02.455Z] ERROR (order-service): Unhandled rejection during debit req_id="req-9841"

### DATA - STACK TRACE V8
TypeError: Cannot read properties of undefined (reading 'reservedStock')
    at reserveItems (/app/src/services/inventoryService.ts:62:31)
    at async createOrder (/app/src/services/orderService.ts:98:5)
    at async postOrderController (/app/src/controllers/orderController.ts:24:19)

### DATA - CODE PERTINENT (inventoryService.ts:58-65)
\`\`\`typescript
async function reserveItems(productId: number, quantity: number) {
  const stockRecord = await inventoryRepository.findUnique({ where: { id: productId } });
  // Ligne 62 : Crash si stockRecord est null
  if (stockRecord.reservedStock + quantity > stockRecord.totalStock) {
    throw new StockExceededError();
  }
}
\`\`\`

### TASKS
1. Explique pourquoi stockRecord est undefined lors de cette requête.
2. Démontre la défaillance de validation en amont (dans le contrôleur ou le repository).
3. Formule la cause racine confirmée et propose un schéma Zod pour interdire cette condition en entrée.

### CONSTRAINTS
- NE MODIFIE AUCUN FICHIER DIRECTEMENT.
- Ne propose pas de chaînage optionnel superficiel (stockRecord?.reservedStock).
- Identifie le statut HTTP approprié à renvoyer au client.`}
        />

        <Callout type="note" title="Gestion des Correlation IDs">
          <p className="text-xs sm:text-sm">
            Remarquez la présence du champ <code>req_id=&quot;req-9841&quot;</code> dans tous les logs.
            Ce Correlation ID (ou Trace ID) est primordial : il permet au modèle d&apos;IA de filtrer instantanément les événements appartenant à la même transaction au milieu d&apos;un flux de milliers de requêtes concurrentes.
          </p>
        </Callout>
      </section>

      {/* Quiz de certification (6 questions) */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de certification — Chapitre 6.4 : Transmettre des Logs et Stack Traces à l'IA"
          questions={[
            {
              id: 1,
              question: "Quelle est la fonction d'un Correlation ID (ou Request ID) dans les journaux structurés transmis à un modèle IA ?",
              options: [
                "Chiffrer les données pour empêcher le serveur de les lire.",
                "Permettre au modèle de relier de façon certaine tous les logs dispersés appartenant à une seule et même requête HTTP au milieu de milliers d'autres requêtes concurrentes.",
                "Accélérer la fréquence d'horloge du processeur.",
                "Remplacer les adresses IP des serveurs de cache Redis."
              ],
              correctIndex: 1,
              explanation: "Dans un serveur traitant des centaines de requêtes par seconde, les logs sont entrelacés. Le Correlation ID permet d'isoler le fil temporel exact de la transaction défaillante sans la confondre avec le trafic sain."
            },
            {
              id: 2,
              question: "Dans une Stack Trace émise par le moteur V8 de Node.js, que désigne le tout premier frame situé juste sous le message d'erreur ?",
              options: [
                "La fonction la plus ancienne appelée au démarrage du serveur.",
                "Le point de rupture exact (fichier, ligne et colonne) où l'instruction a provoqué la levée de l'exception.",
                "La version du système d'exploitation.",
                "L'adresse mémoire physique du disque SSD."
              ],
              correctIndex: 1,
              explanation: "Le premier frame correspond au sommet de la pile d'exécution (Top of the Stack). C'est là que l'opération illégale (comme lire une propriété sur null) s'est produite."
            },
            {
              id: 3,
              question: "Pourquoi est-il généralement recommandé d'élaguer les frames internes comme 'node:internal/process/task_queues' avant de coller une Stack Trace dans un prompt d'IA ?",
              options: [
                "Parce que ces lignes sont protégées par le droit d'auteur de Google.",
                "Parce qu'elles constituent du bruit système qui n'aide pas au diagnostic applicatif et consomme inutilement des tokens précieux dans la fenêtre de contexte.",
                "Parce que Node.js refuse de démarrer si ces lignes sont copiées.",
                "Parce que les navigateurs Web bloquent les messages contenant le mot 'internal'."
              ],
              correctIndex: 1,
              explanation: "Les frames internes de Node.js (gestionnaires d'Event Loop, tick queues) ne contiennent pas votre code métier. Les supprimer allège le prompt et recentre l'attention du LLM sur vos propres fichiers sources."
            },
            {
              id: 4,
              question: "Pourquoi est-il impératif d'anonymiser systématiquement les adresses e-mails, mots de passe et jetons JWT dans les logs avant transmission à un LLM externe ?",
              options: [
                "Pour empêcher le modèle de saturer sa mémoire vive.",
                "Pour se conformer aux réglementations strictes de sécurité (RGPD, SOC2, PCI-DSS) et éliminer tout risque d'exfiltration ou de persistance de secrets d'infrastructure.",
                "Parce que les modèles d'IA ne comprennent pas les formats de chaînes chiffrées en Base64.",
                "Pour réduire la taille de la police de caractères dans le terminal."
              ],
              correctIndex: 1,
              explanation: "Transmettre des données sensibles non anonymisées à des APIs d'IA tierces constitue une fuite de données (Data Leak) pouvant compromettre les comptes utilisateurs et enfreindre les lois de protection des données."
            },
            {
              id: 5,
              question: "Quelle différence technique majeure sépare un log au format texte brut 'console.log' d'un log structuré JSON émis par Pino ou Winston ?",
              options: [
                "Le log JSON est illisible pour les développeurs humains.",
                "Le log structuré JSON fournit des métadonnées typées (timestamp ISO, niveau de sévérité, correlation ID, statut HTTP) analysables immédiatement par des scripts ou des LLMs sans parsing ambigu.",
                "Le log texte brut est réservé aux langages compilés comme le C++.",
                "Pino refuse d'enregistrer des messages contenant des caractères accentués."
              ],
              correctIndex: 1,
              explanation: "Les logs structurés en JSON transforment les messages en données clé/valeur normalisées, ce qui permet à l'IA de corréler instantanément les variables d'environnement, les niveaux de sévérité et les latences."
            },
            {
              id: 6,
              question: "Dans le cadre d'un diagnostic d'incident, quelle est la meilleure pratique lors de la transmission d'un extrait de code accompagnant la Stack Trace ?",
              options: [
                "Coller l'intégralité du projet (plus de 10 000 lignes) dans le prompt sans indication.",
                "Fournir la fonction incriminée avec ses 10 à 20 lignes environnantes en indiquant clairement les numéros de lignes correspondant au frame de la Stack Trace.",
                "Supprimer tous les types TypeScript pour faire gagner du temps au modèle.",
                "Remplacer les noms de variables par des lettres aléatoires."
              ],
              correctIndex: 1,
              explanation: "Un extrait ciblé avec ses numéros de lignes et son typage strict permet au modèle d'aligner immédiatement la ligne de crash de la Stack Trace avec le code source réel sans ambiguïté."
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Chapitre4Content;
