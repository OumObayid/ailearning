'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface HallucinationScenario {
  id: string;
  title: string;
  context: string;
  codeSnippet: string;
  aiProposal: string;
  trapType: 'ghost_api' | 'symptom_masking' | 'security_bypass' | 'valid_fix';
  trapLabel: string;
  analysis: string;
  recommendation: string;
}

const SCENARIOS: HallucinationScenario[] = [
  {
    id: 'prisma-leak',
    title: 'Cas 1 : Concurrence & Transaction ORM',
    context: 'Crash en production sous forte charge : "Transaction already closed: cannot perform update".',
    codeSnippet: `// Service de commande bancaire
export async function transferBalance(senderId: string, recipientId: string, amount: number) {
  return await prisma.$transaction(async (tx) => {
    const sender = await tx.account.findUnique({ where: { id: senderId } });
    if (!sender || sender.balance < amount) throw new Error("Fonds insuffisants");
    
    await tx.account.update({ where: { id: senderId }, data: { balance: { decrement: amount } } });
    await tx.account.update({ where: { id: recipientId }, data: { balance: { increment: amount } } });
  });
}`,
    aiProposal: `// ❌ Proposition de l'IA :
export async function transferBalance(senderId: string, recipientId: string, amount: number) {
  // L'IA suggère d'utiliser l'option native "retryOnTimeout: true" et "autoLock: true"
  return await prisma.$transaction(async (tx) => {
    // ...
  }, { retryOnTimeout: true, autoLock: true, isolationLevel: 'Serializable' });
}`,
    trapType: 'ghost_api',
    trapLabel: 'API Fantôme (Hallucination pure)',
    analysis: 'Prisma Client n\'a JAMAIS proposé les options retryOnTimeout ou autoLock dans son API $transaction. L\'IA a fusionné des fonctionnalités issues de Hibernate/TypeORM avec la signature de Prisma. Ce code provoquera une erreur de compilation TypeScript immédiate ("Argument of type ... is not assignable").',
    recommendation: 'Vérifier systématiquement le typage TS via npx tsc et consulter la documentation officielle de la version exacte installée.'
  },
  {
    id: 'optional-chaining-abuse',
    title: 'Cas 2 : Masquage de symptôme par Optional Chaining',
    context: 'TypeError: Cannot read properties of undefined (reading "taxRate") lors du calcul de facture.',
    codeSnippet: `// Calculateur de facturation B2B
export function computeTotalInvoice(order: Order): number {
  const customerRegion = order.customer.organization.billingAddress.region;
  const rate = TAX_RATES[customerRegion].taxRate;
  return order.subtotal * (1 + rate);
}`,
    aiProposal: `// ❌ Proposition de l'IA :
export function computeTotalInvoice(order: Order): number {
  // Patch IA : "Sécurisation avec optional chaining et fallback null"
  const customerRegion = order?.customer?.organization?.billingAddress?.region;
  const rate = TAX_RATES?.[customerRegion ?? '']?.taxRate ?? 0;
  return (order?.subtotal ?? 0) * (1 + rate);
}`,
    trapType: 'symptom_masking',
    trapLabel: 'Masquage de symptôme (Symptom Masking)',
    analysis: 'Au lieu de chercher pourquoi l\'organisation ou l\'adresse de facturation est nulle (ex: mauvaise jointure SQL, chargement partiel Prisma, validation manquante en amont), l\'IA étouffe l\'erreur. Résultat : une facture émise avec un taux de TVA de 0% pour des clients taxables. L\'entreprise s\'expose à un redressement fiscal silencieux.',
    recommendation: 'Refuser les patchs d\'optional chaining défensifs non justifiés. Si l\'adresse est obligatoire dans le contrat métier, l\'absence de donnée doit lever une exception explicite ou être corrigée au point d\'ingestion.'
  },
  {
    id: 'security-auth-bypass',
    title: 'Cas 3 : Régression de sécurité & Bypass de contrôle d\'accès',
    context: 'Bug d\'accès refusé (403 Forbidden) quand un administrateur consulte le profil d\'un utilisateur externe.',
    codeSnippet: `// Middleware de contrôle d'accès RBAC
export function canAccessResource(user: AuthUser, resource: Resource): boolean {
  if (user.role === 'SUPERADMIN') return true;
  return user.tenantId === resource.tenantId && user.permissions.includes(resource.requiredPermission);
}`,
    aiProposal: `// ❌ Proposition de l'IA :
export function canAccessResource(user: AuthUser, resource: Resource): boolean {
  // L'IA simplifie la logique pour "éliminer l'erreur 403"
  if (user.role === 'SUPERADMIN' || user.role === 'ADMIN') return true;
  if (!resource.tenantId) return true; // Pour éviter les blocages sur ressources globales
  return user.permissions.some(p => resource.requiredPermission.includes(p));
}`,
    trapType: 'security_bypass',
    trapLabel: 'Bypass de sécurité (Régression critique)',
    analysis: 'L\'IA a accordé un passe-droit total à tous les "ADMIN" de n\'importe quelle entreprise cliente, et court-circuité la vérification multi-tenant (tenant isolation) si la ressource est mal initialisée. Ce patch résout le bug apparent mais ouvre une faille critique de fuite de données inter-entreprises (IDOR / Broken Access Control).',
    recommendation: 'Ne jamais laisser une IA modifier des prédicats d\'autorisation sans matrice de tests RBAC automatisée et audit de sécurité contradictoire.'
  },
  {
    id: 'clean-sql-lock',
    title: 'Cas 4 : Conflit de concurrence sur inventaire stock',
    context: 'Survente de billets : stock restant descendu à -3 sous 500 requêtes concurrentes.',
    codeSnippet: `// Réservation naïve
const item = await db.query('SELECT stock FROM items WHERE id = $1', [itemId]);
if (item.rows[0].stock > 0) {
  await db.query('UPDATE items SET stock = stock - 1 WHERE id = $1', [itemId]);
  return true;
}
return false;`,
    aiProposal: `//  Proposition de l'IA :
// "Utilisation d'une mise à jour atomique avec clause conditionnelle"
const result = await db.query(
  'UPDATE items SET stock = stock - 1 WHERE id = $1 AND stock > 0 RETURNING stock',
  [itemId]
);
return (result.rowCount ?? 0) > 0;`,
    trapType: 'valid_fix',
    trapLabel: 'Correctif Robuste & Valide',
    analysis: 'L\'IA propose ici une approche atomique irréprochable au niveau du moteur PostgreSQL. Aucune race condition n\'est possible grâce à la clause atomique WHERE stock > 0 combinée à RETURNING. Aucune API inventée, aucune perte de données.',
    recommendation: 'Valider par test unitaire de concurrence (ex: Promise.all avec 50 requêtes concurrentes) et adopter.'
  }
];

export const Chapitre8Content: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<HallucinationScenario>(SCENARIOS[0]);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);

  const handleSelectScenario = (sc: HallucinationScenario) => {
    setSelectedScenario(sc);
    setUserGuess(null);
    setShowAnalysis(false);
  };

  const handleEvaluate = (type: string) => {
    setUserGuess(type);
    setShowAnalysis(true);
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-300 bg-linear-to-r from-amber-50 via-orange-50 to-amber-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>Module 6 — Diagnostic assisté par IA & Agents Autonomes • Section 6.8</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Détecter les Hallucinations et les Corrections Défaillantes Proposées par l&apos;IA
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Un modèle de langage ne &laquo; comprend &raquo; ni la physique de votre mémoire, ni les contrats de vos bases de données : il calcule des probabilités de jetons. Découvrez comment identifier les APIs inventées, démasquer les correctifs cosmétiques destructeurs et instaurer une politique stricte de <em>Zero Trust AI Code</em>.
        </p>
      </div>

      {/* Section 1: Pourquoi l'IA hallucine-t-elle en code ? */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Fondements Théoriques & Mécaniques LLM</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Anatomie de l&apos;hallucination : de la complétion probabiliste au piège technique
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans le paradigme des modèles de langage (LLMs auto-régressifs comme Gemini, Claude ou GPT-4), la génération de code répond à une règle unique : prédire le token suivant le plus vraisemblable d&apos;après les milliards de lignes de code analysées lors de l&apos;entraînement. Ce fonctionnement génère deux pathologies fondamentales en ingénierie logicielle :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase tracking-wide mb-2">
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px]">Pathologie 1</span>
                <span>L&apos;Hallucination Factuelle (Fabrication d&apos;API)</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">L&apos;invention de signatures plausibles</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Le modèle fusionne les conventions de bibliothèques similaires. Si une bibliothèque <em>A</em> propose <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-rose-700">validateAsync()</code> et la bibliothèque <em>B</em> propose <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-rose-700">validateSync()</code>, le modèle peut affirmer avec une assurance parfaite que la bibliothèque <em>C</em> possède une méthode <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-rose-700">validateWithLock()</code> qui n&apos;a jamais existé.
              </p>
            </div>
            <div className="mt-4 p-3 bg-rose-50 rounded-xl border border-rose-100 text-xs text-rose-900 font-mono">
              Effet : Crash immédiat au runtime ou rejet direct par le compilateur TypeScript (TS2339).
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-wide mb-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px]">Pathologie 2</span>
                <span>L&apos;Hallucination Logique (Symptom Masking)</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Le masquage complaisant du symptôme</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Le modèle est optimisé pour &laquo; satisfaire &raquo; la consigne de l&apos;utilisateur en supprimant l&apos;erreur visible. Confronté à un <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-amber-700">Cannot read properties of undefined</code>, son réflexe statistique est d&apos;ajouter des <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-amber-700">?.</code> partout ou d&apos;envelopper le bloc dans un <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-amber-700">try/catch</code> vide.
              </p>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900 font-mono">
              Effet : Silençage vicieux. L&apos;erreur disparaît des logs, mais les calculs métiers deviennent corrompus.
            </div>
          </div>
        </div>

        <Callout type="danger" title="L'effet Dunning-Kruger des LLMs en débogage">
          Contrairement à un développeur junior qui hésite et formule ses doutes, un modèle de langage formule ses pires erreurs avec le même ton péremptoire, structuré et convaincant qu&apos;une vérité mathématique. <strong>La fluidité de la prose technique ne garantit jamais la véracité de l&apos;implémentation</strong>.
        </Callout>
      </section>

      {/* Section 2: Typologie des 4 grandes défaillances de code IA */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Taxonomie & Analyse Critique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Typologie des 4 pièges récurrents dans les corrections générées par l&apos;IA
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Sur les bases de code industrielles, plus de 70% des suggestions défaillantes émises par les assistants IA se classent dans l&apos;une des quatre catégories suivantes :
        </p>

        <div className="space-y-5">
          {/* Piège 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-black">1</span>
              L&apos;Optional Chaining érigé en panacée (Symptom Masking)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium">
              Lorsqu&apos;une variable est inattendue à <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">null</code> ou <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">undefined</code>, l&apos;IA applique aveuglément l&apos;opérateur de chaînage optionnel <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono text-rose-600 font-bold">?.</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <div className="text-xs font-bold text-rose-700 mb-1">❌ Patch toxique proposé par l&apos;IA :</div>
                <CodeBlock language="typescript">{`// Masquage total du problème
const email = user?.profile?.contact?.email ?? "default@org.com";
sendMandatoryLegalNotice(email); // Envoie un mail d'huissier à une adresse bidon !`}</CodeBlock>
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-700 mb-1"> Recherche de la cause racine réelle :</div>
                <CodeBlock language="typescript">{`// Vérification du contrat de données en amont
if (!user.profile?.contact?.email) {
  throw new InvariantViolationError("Contrat corrompu: utilisateur sans adresse de notification légale", { userId: user.id });
}`}</CodeBlock>
              </div>
            </div>
          </div>

          {/* Piège 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-black">2</span>
              L&apos;illusion des versions et les APIs anachroniques
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium">
              L&apos;IA mélange les versions majeures d&apos;un framework. Elle peut proposer une syntaxe React 16 (Lifecycle methods comme <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">componentWillReceiveProps</code>) dans une application Next.js App Router (React 19), ou utiliser des méthodes Mongoose dépréciées (<code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">Model.remove()</code> au lieu de <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">deleteOne()</code>).
            </p>
          </div>

          {/* Piège 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-black">3</span>
              L&apos;affaiblissement silencieux des contrôles de sécurité et de typage
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium">
              Pour résoudre une erreur de compilation TypeScript tenace, l&apos;IA a tendance à insérer des casts violents comme <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono text-rose-600 font-bold">as any</code>, des directives <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono text-rose-600 font-bold">{`// @ts-ignore`}</code>, ou à neutraliser des filtres de sécurité (<code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">cors: {'{'} origin: &apos;*&apos; {'}'}</code>) pour &laquo; éliminer l&apos;erreur 403 &raquo;.
            </p>
          </div>

          {/* Piège 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-black">4</span>
              La pollution des dépendances et sur-ingénierie
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium">
              Face à un besoin simple (ex: formater une date ou débouncer un événement), l&apos;IA suggère d&apos;installer des paquets externes massifs (<code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">moment.js</code>, <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">lodash</code> complet) alors que des primitives modernes natives (ex: <code className="text-xs bg-white px-1 py-0.5 rounded border border-slate-300 font-mono">Intl.DateTimeFormat</code>) sont déjà disponibles dans le runtime.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Simulateur Interactif d'Inspection de Patchs IA */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Simulateur Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier Pratique : Détecteur d&apos;Hallucinations et Audit de Patch IA
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Mettez-vous dans la peau d&apos;un Senior Staff Engineer en charge de la revue de code. Sélectionnez un scénario d&apos;incident, examinez la proposition soumise par l&apos;IA, et identifiez s&apos;il s&apos;agit d&apos;une API inventée, d&apos;un masquage de symptôme, d&apos;une régression de sécurité ou d&apos;un correctif valide.
        </p>

        {/* Sélecteur de scénario */}
        <div className="flex flex-wrap gap-2.5">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-left ${
                selectedScenario.id === sc.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* Détails du scénario */}
        <div className="rounded-2xl bg-white border border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-4">
            <div className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wide">
              Contexte de l&apos;incident
            </div>
            <p className="text-sm font-semibold mt-1 text-slate-200">{selectedScenario.context}</p>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Code Initial Défaillant :</div>
              <CodeBlock language="typescript">{selectedScenario.codeSnippet}</CodeBlock>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Patch Proposé par l&apos;IA (Copilot / Gemini / Agent) :</div>
              <CodeBlock language="typescript">{selectedScenario.aiProposal}</CodeBlock>
            </div>

            {/* Questions de diagnostic */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-sm font-black text-slate-900 mb-3">
                Quel est votre verdict d&apos;ingénieur sur cette proposition ?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleEvaluate('ghost_api')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all ${
                    userGuess === 'ghost_api'
                      ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-400'
                      : 'border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="font-extrabold text-rose-700 block">Option A : API Fantôme</span>
                  L&apos;IA a inventé des méthodes, options ou signatures inexistantes.
                </button>

                <button
                  onClick={() => handleEvaluate('symptom_masking')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all ${
                    userGuess === 'symptom_masking'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-400'
                      : 'border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="font-extrabold text-amber-700 block">Option B : Masquage de symptôme</span>
                  L&apos;IA étouffe l&apos;erreur (optional chaining / try-catch) sans réparer le flux.
                </button>

                <button
                  onClick={() => handleEvaluate('security_bypass')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all ${
                    userGuess === 'security_bypass'
                      ? 'border-purple-500 bg-purple-50 text-purple-900 ring-2 ring-purple-400'
                      : 'border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="font-extrabold text-purple-700 block">Option C : Bypass de sécurité</span>
                  L&apos;IA fragilise l&apos;authentification, l&apos;isolation des tenants ou les droits d&apos;accès.
                </button>

                <button
                  onClick={() => handleEvaluate('valid_fix')}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all ${
                    userGuess === 'valid_fix'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400'
                      : 'border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="font-extrabold text-emerald-700 block">Option D : Correctif Valide & Robuste</span>
                  La solution traite la cause racine avec exactitude et respecte les standards.
                </button>
              </div>
            </div>

            {/* Analyse détaillée après sélection */}
            {showAnalysis && (
              <div className={`mt-5 p-5 rounded-2xl border ${
                userGuess === selectedScenario.trapType
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-center gap-2 font-black text-sm mb-2">
                  <span>{userGuess === selectedScenario.trapType ? ' Exact !' : '⚠️ Diagnostic inexact :'}</span>
                  <span>Classification réelle : {selectedScenario.trapLabel}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed mb-3">
                  {selectedScenario.analysis}
                </p>
                <div className="p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono">
                  <strong>Recommandation d&apos;équipe :</strong> {selectedScenario.recommendation}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Méthodologie d'Audit & Contre-Interrogatoire de l'IA */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Protocole d&apos;Équipe & Sécurité</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Le Protocole Zero Trust AI : comment auditer rigoureusement chaque proposition
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Pour éliminer le risque d&apos;introduction d&apos;hallucinations en production, les équipes d&apos;ingénierie d&apos;élite appliquent un protocole de vérification en 4 étapes systématiques :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase tracking-wide mb-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">1</span>
              <span>Validation Statique Déterministe</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Compilateur & Linter avant toute lecture</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Ne perdez jamais de temps à lire un code IA sans avoir d&apos;abord exécuté <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">tsc --noEmit</code> et le linter en mode strict. 90% des APIs inventées sont immédiatement stoppées par le compilateur TypeScript.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase tracking-wide mb-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">2</span>
              <span>Le Prompt d&apos;Audit Contradictoire</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Retourner l&apos;IA contre sa propre proposition</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Soumettez le code généré dans une nouvelle session ou avec un rôle d&apos;auditeur hostile. Demandez-lui : <em>&laquo; Trouve 3 failles de sécurité, 2 régressions de concurrence et 1 cas limite où ce code plantera en production &raquo;</em>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase tracking-wide mb-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">3</span>
              <span>Vérification de la Source de Vérité</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Documentation officielle & Définitions de types</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              En cas de doute sur une méthode suggérée, faites un <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">F12 (Go to Definition)</code> dans votre IDE vers le fichier <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">.d.ts</code> dans <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">node_modules</code>. Le fichier de types réel ne ment jamais.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase tracking-wide mb-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">4</span>
              <span>Le Test de Non-Régression & Falsification</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Le test unitaire qui échoue d&apos;abord</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Un bug n&apos;est jamais résolu par du code tant qu&apos;un test automatisé reproduisant le cas limite n&apos;a pas échoué (RED) avant d&apos;être validé par le patch (GREEN).
            </p>
          </div>
        </div>

        {/* Template de prompt contradictoire */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
            Template Industriel : Prompt d&apos;Adversarial Verification (Audit Contradictoire)
          </div>
          <CodeBlock language="markdown">{`Tu es un Senior Security & Reliability Engineer reconnu pour ton intransigeance.
Je te soumets un correctif de code généré par un assistant IA pour résoudre le bug suivant :
[COLLER LA DESCRIPTION DU BUG INITIAL]

Voici la proposition de code à auditer :
\`\`\`typescript
[COLLER LE CODE PROPOSÉ PAR L'IA]
\`\`\`

Ta mission :
1. DÉTECTION D'API FANTÔMES : Les méthodes, paramètres et imports utilisés existent-ils rigoureusement dans la version [PRÉCISER LA VERSION DU FRAMEWORK, ex: Next.js 15 / Prisma 6] ?
2. SYMPTOM MASKING : Ce code s'attaque-t-il à la CAUSE RACINE du flux de données ou se contente-t-il de masquer l'erreur (ex: optional chaining abusif, catch vide) ?
3. IMPACT SUR LA SÉCURITÉ & PERFORMANCES : Ce patch introduit-il un bypass RBAC, une fuite de mémoire, une injection SQL ou une race condition ?
4. CAS LIMITES : Décris 3 scénarios réels où ce code provoquera un plantage en production.`}</CodeBlock>
        </div>
      </section>

      {/* Section 5: Synthèse & Bonnes Pratiques */}
      <section className="space-y-4">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Checklist Opérationnelle</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            5. Résumé des règles d&apos;or pour le débogage assisté par IA
          </h2>
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-emerald-700 font-black">✓</span>
            <span><strong>Ne jamais merge sans review humaine :</strong> L&apos;IA est un assistant de calcul probabiliste, la responsabilité légale et technique de la mise en production repose à 100% sur l&apos;ingénieur humain.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-emerald-700 font-black">✓</span>
            <span><strong>Méfiance absolue envers les `?.` en cascade :</strong> Chaque ajout de chaînage optionnel sur une propriété censée exister d&apos;après le schéma de données doit déclencher une alerte d&apos;investigation.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-emerald-700 font-black">✓</span>
            <span><strong>F12 est votre boussole :</strong> En cas de doute sur une méthode proposée par l&apos;IA, inspectez toujours sa définition TypeScript locale.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-emerald-700 font-black">✓</span>
            <span><strong>Test unitaire avant et après :</strong> Un correctif n&apos;est validé que si un test automatisé vérifie que le scénario d&apos;erreur ne peut plus se reproduire.</span>
          </li>
        </ul>
      </section>

      {/* Section 6: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Contrôle des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            6. Quiz de validation : Maîtrise des hallucinations et de l&apos;audit de code IA
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 6.8 — Détection des hallucinations et validation des propositions IA"
          questions={[
            {
              id: 1,
              question: 'Quelle est la cause fondamentale pour laquelle un modèle LLM invente des méthodes ou des APIs qui n\'existent pas (hallucination factuelle) ?',
              options: [
                'Il s\'agit d\'un bug volontaire injecté par les fournisseurs d\'IA pour inciter les développeurs à acheter les versions payantes.',
                'Le modèle fonctionne par prédiction probabiliste du token suivant en agrégeant des millions de bibliothèques aux signatures proches, sans exécuter le code dans un compilateur réel.',
                'Le modèle est incapable de lire du code JavaScript ou TypeScript et ne comprend que le langage Python.',
                'Le modèle a une mémoire contextuelle infinie qui sature le CPU du serveur hébergeant l\'API.'
              ],
              correctIndex: 1,
              explanation: 'Les LLMs ne disposent pas d\'un compilateur intégré au moment de la génération textuelle : ils prédisent la séquence de tokens statistiquement la plus cohérente, ce qui conduit à fusionner des signatures de bibliothèques distinctes (ex: mélanger Prisma et TypeORM).'
            },
            {
              id: 2,
              question: 'Qu\'appelle-t-on le "Symptom Masking" (masquage de symptôme) lorsqu\'une IA propose de corriger une erreur "Cannot read properties of undefined" ?',
              options: [
                'Le fait de supprimer entièrement la base de données de production.',
                'Le fait d\'ajouter massivement des opérateurs de chaînage optionnel (?.) ou des blocs try/catch vides pour étouffer l\'exception sans réparer l\'origine de l\'incohérence de données.',
                'La réécriture complète du frontend en WebAssembly.',
                'L\'obligation d\'utiliser un IDE tiers pour visualiser le graphe des dépendances.'
              ],
              correctIndex: 1,
              explanation: 'Le Symptom Masking consiste à faire disparaître l\'exception visible dans les logs (en retournant undefined ou 0) plutôt que de comprendre pourquoi la donnée est absente. Cela crée des calculs corrompus ou des comportements erratiques silencieux en aval.'
            },
            {
              id: 3,
              question: 'Face à un crash d\'autorisation HTTP 403, l\'IA propose d\'ajouter "if (!user.role) return true;". Quel est le danger critique de cette proposition ?',
              options: [
                'Le code s\'exécutera avec 5 millisecondes de latence supplémentaire.',
                'Il s\'agit d\'un bypass de sécurité majeur (Broken Access Control) qui accorde les droits d\'accès à n\'importe quelle requête non authentifiée.',
                'TypeScript refusera de compiler le mot-clé return.',
                'Le serveur redémarrera automatiquement toutes les 10 minutes.'
              ],
              correctIndex: 1,
              explanation: 'En conditionnant l\'accès à l\'absence de rôle avec un return true, toute requête malveillante ou corrompue sans rôle défini obtient l\'accès complet aux ressources protégées, créant une faille critique de niveau OWASP Top 10.'
            },
            {
              id: 4,
              question: 'Dans un workflow d\'ingénierie rigoureux, quel est le premier réflexe à avoir avant même de relire attentivement une fonction de 150 lignes générée par une IA ?',
              options: [
                'La déployer immédiatement sur le cluster Kubernetes de production pour observer les métriques Datadog.',
                'Lancer la vérification statique déterministe (compilateur npx tsc --noEmit et linter strict) pour éliminer les APIs fantômes et les incohérences de types.',
                'Envoyer un email à l\'ensemble de l\'équipe pour leur demander leur avis.',
                'Rebooter son poste de travail pour purger le cache DNS.'
              ],
              correctIndex: 1,
              explanation: 'La vérification statique déterministe par le compilateur TypeScript et le linter prend quelques secondes et élimine immédiatement les inventions de signatures d\'APIs, les fautes de frappe et les violations de typage sans effort cognitif humain.'
            },
            {
              id: 5,
              question: 'Qu\'est-ce que la technique de l\'"Adversarial Verification" (Audit contradictoire) appliquée à une correction d\'IA ?',
              options: [
                'Insulter le modèle de langage pour qu\'il génère du code plus rapidement.',
                'Soumettre le correctif proposé à un nouveau prompt en lui attribuant un rôle d\'auditeur de sécurité hostile dont l\'unique but est d\'identifier les cas limites, les régressions de concurrence et les failles potentielles.',
                'Comparer le code avec un algorithme de tri par bulles.',
                'Remplacer tous les tests unitaires par des captures d\'écran.'
              ],
              correctIndex: 1,
              explanation: 'L\'audit contradictoire force le modèle à changer de perspective cognitive (du mode "générateur complaisant" au mode "auditeur critique"), ce qui lui permet d\'identifier lui-même les pièges et failles de sa proposition antérieure.'
            },
            {
              id: 6,
              question: 'Pour vérifier de façon irréfutable si une méthode suggérée par une IA existe réellement dans une dépendance Node.js du projet, quelle est la source de vérité absolue ?',
              options: [
                'Un forum en ligne anonyme datant de 2018.',
                'La définition de type réelle (.d.ts) située localement dans node_modules accessible via "Go to Definition" (F12) dans votre IDE.',
                'Un blog non officiel traduit automatiquement.',
                'La réponse affirmative d\'un second modèle de langage gratuit.'
              ],
              correctIndex: 1,
              explanation: 'Le fichier de déclaration de types TypeScript (.d.ts) présent dans votre répertoire node_modules local reflète la version exacte du binaire installé dans votre projet : c\'est la seule source de vérité contractuelle et indéniable.'
            }
          ]}
        />
      </section>
    </div>
  );
};
