'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { DebuggingConsoleSimulator } from '@/components/interactive/DebuggingConsoleSimulator';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  // State for Log Sanitizer Lab
  const [maskSecrets, setMaskSecrets] = useState<boolean>(false);
  const [addCorrelationId, setAddCorrelationId] = useState<boolean>(false);
  const [structuredJson, setStructuredJson] = useState<boolean>(false);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 2 — Boîte à Outils Fondamentale</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Utilisation professionnelle de console.log(), error() et table()
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Poser un log est le premier geste de tout programmeur. Mais entre un log d&apos;amateur qui pollue la console, gèle le navigateur ou fait fuiter des mots de passe en production, et une stratégie de journalisation propre, structurée et sécurisée digne d&apos;un ingénieur senior, il y a un monde. Apprenez les règles de l&apos;art du logging moderne.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          <span>1. Objectifs d&apos;apprentissage opérationnels</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-800">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Éviter le piège &quot;[object Object]&quot; :</strong>
              <span>Comprendre la concaténation de chaînes vs le passage d&apos;arguments multiples dans la console.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Formatage tabulaire chirurgical :</strong>
              <span>Utiliser <code className="font-mono text-emerald-800">console.table()</code> avec filtrage strict des colonnes pour éviter de saturer DevTools.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Hiérarchie &amp; Accordéons logiques :</strong>
              <span>Structurer les transactions complexes grâce à <code className="font-mono text-indigo-800">console.groupCollapsed()</code>.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <span className="text-emerald-700 font-black text-base">✓</span>
            <div>
              <strong className="text-slate-950 block">Sécurité &amp; Confidentialité (RGPD) :</strong>
              <span>Assainir systématiquement les journaux pour ne jamais faire fuiter de mots de passe, tokens ou cartes bancaires.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Les 3 gaffes classiques du débutant avec console.log() */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Les 3 gaffes classiques du débutant avec console.log()
        </h2>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          Avant de maîtriser les outils avancés, éliminons immédiatement les trois habitudes qui trahissent un manque de méthode :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Gaffe 1 */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-xs font-bold">Gaffe 1</span>
              <strong className="text-rose-950 text-sm">Le &quot;[object Object]&quot;</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-rose-200 font-mono text-[11px] text-rose-800">
              console.log(&quot;User: &quot; + user);<br />
              👉 &quot;User: [object Object]&quot;
            </div>
            <p className="text-xs text-slate-700 font-medium">
              L&apos;opérateur <code className="font-mono font-bold">+</code> force la conversion en chaîne de caractères via <code className="font-mono">.toString()</code>. 
              <strong>Remède :</strong> séparez par une virgule : <code className="font-mono text-emerald-700 font-bold">console.log(&quot;User:&quot;, user)</code> !
            </p>
          </div>

          {/* Gaffe 2 */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-mono text-xs font-bold">Gaffe 2</span>
              <strong className="text-amber-950 text-sm">Le dump géant de 10 000 lignes</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-amber-200 font-mono text-[11px] text-amber-800">
              console.log(hugeDatabaseList);<br />
              👉 Navigateur Chrome figé 5s !
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Vouloir afficher une liste massive avec 80 propriétés par objet sature la mémoire du DevTools.
              <strong>Remède :</strong> tranchez avec <code className="font-mono text-emerald-700 font-bold">.slice(0, 5)</code> et ciblez 2 colonnes avec <code className="font-mono text-emerald-700 font-bold">console.table()</code>.
            </p>
          </div>

          {/* Gaffe 3 */}
          <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-xs font-bold">Gaffe 3</span>
              <strong className="text-indigo-950 text-sm">Les logs anonymes &quot;test 1&quot;</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-indigo-200 font-mono text-[11px] text-indigo-800">
              console.log(&quot;ici&quot;);<br />
              console.log(&quot;11111&quot;);<br />
              👉 Impossible de savoir qui parle !
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Après 3 semaines, personne (pas même vous) ne sait d&apos;où proviennent ces logs dans le terminal.
              <strong>Remède :</strong> préfixez toujours par le module : <code className="font-mono text-emerald-700 font-bold">&quot;[PanierService]&quot;</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. console.error */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Signaler des erreurs avec console.error()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Contrairement à un simple message informatif, <code className="font-mono text-emerald-700">console.error()</code> attire immédiatement l&apos;œil du développeur avec une coloration rouge distinctive et génère automatiquement une trace d&apos;exécution complète :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image20.jpeg"
            alt="Affichage d'un message d'erreur rouge avec console.error dans Chrome DevTools"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.5.1 — Rendu visuel d&apos;un appel console.error() dans la console de développement : fond rouge distinctif et lien direct vers le fichier source.
          </div>
        </div>

        <Callout type="tip" title="Bon réflexe : Toujours transmettre l'objet Error complet">
          <p className="text-sm leading-relaxed">
            Ne faites pas <code className="font-mono text-rose-700">console.error(error.message)</code> ! En ne logguant que le message texte, vous perdez toute la Stack Trace. 
            Écrivez toujours <code className="font-mono text-emerald-700">console.error(&quot;[Paiement] Échec :&quot;, error)</code> : Chrome affichera le message ET la pile d&apos;appels dépliable en rouge.
          </p>
        </Callout>
      </section>

      {/* 4. console.table */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Analyser les collections d&apos;objets avec console.table()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Lorsque vous recevez une liste d&apos;utilisateurs ou un panier de produits depuis une API, développer un à un chaque objet est fastidieux. <code className="font-mono text-emerald-700">console.table()</code> génère une grille interactive triable en colonnes :
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-300 shadow-md">
          <Image
            src="/images/cours/debugging/module-2/image21.jpeg"
            alt="Tableau tabulaire généré par console.table montrant id, name, price et inStock"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="bg-slate-100 p-2.5 text-center text-xs font-mono text-slate-600 border-t border-slate-200">
            Figure 2.5.2 — Visualisation avec console.table() : colonnes index, id, name, price et inStock triables d&apos;un clic.
          </div>
        </div>

        {/* Filtrage des colonnes avec CodeBlock */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-700">Exemple d&apos;ingénierie : Cibler les colonnes clés</span>
          <CodeBlock
            language="javascript"
            code={`const products = [
  { id: 1, name: "Clavier Mécanique", price: 129.99, stock: 15, supplierId: "sup_88", internalNote: "Secret marge" },
  { id: 2, name: "Souris Sans-Fil", price: 59.50, stock: 0, supplierId: "sup_88", internalNote: "En réappro" },
  { id: 3, name: "Écran 4K 144Hz", price: 449.00, stock: 4, supplierId: "sup_12", internalNote: "Stock limité" }
];

// ❌ Déconseillé : affiche les 6 colonnes, encombre l'écran
console.table(products);

// ✓ Pratique pro : Ne cibler que les 3 colonnes utiles à l'investigation
console.table(products, ["name", "price", "stock"]);`}
          />
        </div>
      </section>

      {/* 5. Organisation hiérarchique avec console.group */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          5. Structuration hiérarchique avec console.groupCollapsed()
        </h2>
        <p className="text-base text-slate-800 font-medium">
          Sur un tunnel d&apos;achat ou une initialisation d&apos;application, 15 logs se mélangent souvent. L&apos;astuce professionnelle consiste à les enfermer dans un dossier replié :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-700">Code structuré avec accordéon :</span>
            <CodeBlock
              language="javascript"
              code={`function traiterCommande(cmd) {
  // Ouvre un dossier accordéon replié par défaut :
  console.groupCollapsed(\`📦 Commande #\${cmd.id} [\${cmd.client}]\`);
  
  console.log("Date :", new Date().toISOString());
  console.log("Montant HT :", cmd.totalHT, "€");
  console.table(cmd.articles, ["nom", "qte", "prix"]);
  
  if (cmd.totalHT > 500) {
    console.warn("⚠️ Commande à fort montant : vérification 3D-Secure requise !");
  }

  // N'oubliez JAMAIS de fermer le groupe :
  console.groupEnd();
}`}
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3">
            <div className="text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Rendu dans Chrome DevTools :</span>
              <span className="text-[10px] text-emerald-400">Propre &amp; Rétractable</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-indigo-300 font-bold cursor-pointer hover:text-indigo-200">
                ▶ 📦 Commande #9812 [Société ACME]
              </div>
              <div className="text-slate-500 pl-4 text-[11px]">
                (Cliquez sur la flèche pour déplier les 5 lignes et la table sans polluer l&apos;écran)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sécurité absolue et RGPD */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          6. Sécurité des logs et conformité RGPD / PCI-DSS
        </h2>
        <Callout type="warning" title="Règle d'or absolue de cybersécurité">
          <p className="text-sm leading-relaxed">
            Dans un environnement d&apos;entreprise, les logs ne restent pas uniquement sur votre écran : ils sont envoyés et sauvegardés sur des serveurs centralisés (Datadog, AWS CloudWatch, Sentry, ElasticSearch). 
            <strong>Y inscrire un mot de passe en clair ou un numéro de carte bancaire est une faute professionnelle grave et une violation de la loi RGPD.</strong>
          </p>
        </Callout>

        {/* Le pattern de déstructuration assainie */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-emerald-700">Le réflexe de déstructuration assainie (Sanitization Pattern) :</span>
          <CodeBlock
            language="javascript"
            code={`// ❌ DANGEREUX : req.body contient le mot de passe saisi en clair !
console.log("Tentative de connexion :", req.body);

// ✓ PROFESSIONNEL : On extrait le mot de passe pour ne logguer QUE le reste
const { password, creditCard, ...safeData } = req.body;
console.log("[AuthService] Tentative de connexion pour :", safeData);
// Résultat dans les logs : { email: "alice@test.com", ip: "192.168.1.1" }`}
          />
        </div>
      </section>

      {/* 7. Simulateur interactif : Log Sanitizer Lab */}
      <section className="space-y-6 pt-6 border-t-2 border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon name="shield-check" className="w-3.5 h-3.5" />
            <span>Laboratoire Cybersécurité &amp; Hygiène</span>
          </div>
          <h2 className="text-[22px] font-black text-slate-950 tracking-tight">
            7. Atelier interactif : Assainir un log avant production
          </h2>
          <p className="text-sm text-slate-700 font-medium mt-1">
            Activez les filtres ci-dessous pour transformer un log sauvage dangereux en un journal de production conforme aux standards industriels :
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setMaskSecrets(!maskSecrets)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              maskSecrets
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{maskSecrets ? '✓' : '○'}</span>
            <span>1. Masquer les données sensibles (Password &amp; Carte)</span>
          </button>

          <button
            onClick={() => setAddCorrelationId(!addCorrelationId)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              addCorrelationId
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{addCorrelationId ? '✓' : '○'}</span>
            <span>2. Ajouter un Correlation ID (Traçabilité)</span>
          </button>

          <button
            onClick={() => setStructuredJson(!structuredJson)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              structuredJson
                ? 'bg-cyan-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{structuredJson ? '✓' : '○'}</span>
            <span>3. Format JSON structuré (pour Datadog/CloudWatch)</span>
          </button>
        </div>

        {/* Log Viewer Display */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-slate-100 p-5 font-mono text-xs space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-300">Journal d&apos;audit serveur (stdout)</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              maskSecrets ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
            }`}>
              {maskSecrets ? 'CONFORME RGPD' : '⚠️ VIOLE LA SÉCURITÉ'}
            </span>
          </div>

          <div className="whitespace-pre-wrap text-slate-200 overflow-x-auto">
            {structuredJson ? (
              <span className="text-emerald-400">
                {JSON.stringify(
                  {
                    timestamp: '2026-11-09T08:30:15.124Z',
                    level: 'info',
                    module: 'PaymentGateway',
                    ...(addCorrelationId && { correlationId: 'req_98b71-ac24' }),
                    user: {
                      id: 42,
                      email: 'client@example.com',
                      password: maskSecrets ? '***REDACTED***' : 'P@ssw0rdSuperSecret!',
                      creditCard: maskSecrets ? '4970-XXXX-XXXX-1234' : '4970-1234-5678-1234',
                    },
                    amount: 99.99,
                    status: 'PENDING_AUTHORIZATION',
                  },
                  null,
                  2
                )}
              </span>
            ) : (
              <div>
                <span className="text-slate-500">[2026-11-09 08:30:15] </span>
                <span className="text-blue-400">[INFO] </span>
                <span className="text-purple-400">[PaymentGateway] </span>
                {addCorrelationId && <span className="text-amber-400">[corr:req_98b71-ac24] </span>}
                <span>Paiement initié pour client@example.com | </span>
                <span className={maskSecrets ? 'text-slate-400' : 'text-rose-400 font-bold'}>
                  MDP: {maskSecrets ? '***REDACTED***' : 'P@ssw0rdSuperSecret!'} | 
                  CB: {maskSecrets ? '4970-XXXX-XXXX-1234' : '4970-1234-5678-1234'}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. Simulateur Interactif de Console */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <Icon name="code" className="w-6 h-6 text-emerald-600" />
          <h2 className="text-[20px] font-bold text-slate-900">
            8. Simulateur pratique : Console DevTools &amp; Formatage Tabulaire
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Manipulez directement la console émulée ci-dessous pour observer la différence entre un affichage brut, un tableau structuré avec <code className="text-emerald-700 font-mono font-bold">console.table()</code>, et l&apos;inspection d&apos;une stack trace en cas d&apos;exception :
        </p>
        <DebuggingConsoleSimulator />
      </section>

      {/* 9. Quiz de validation */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-6 h-6 text-emerald-600" />
          <span>9. Quiz de validation — Chapitre 5</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'instruction console.log('Utilisateur: ' + user) affiche-t-elle souvent 'Utilisateur: [object Object]' ?",
              options: [
                "Parce que la variable user est vide",
                "Parce que l'opérateur '+' force la concaténation de chaînes et appelle user.toString()",
                "Parce qu'il y a un bogue dans le navigateur Chrome",
                "Parce que TypeScript n'est pas activé"
              ],
              correctIndex: 1,
              explanation: "L'opérateur '+' convertit l'objet en chaîne primitive. Pour inspecter l'objet réel dans DevTools, il faut séparer par une virgule : console.log('Utilisateur:', user)."
            },
            {
              id: 2,
              question: "Quelle méthode permet de restreindre l'affichage d'un tableau à certaines propriétés spécifiques avec console.table ?",
              options: [
                "En passant un second paramètre contenant un tableau des noms de clés (ex: console.table(users, ['name', 'stock']))",
                "Ce n'est pas possible, toutes les colonnes s'affichent toujours",
                "En utilisant un fichier CSS externe",
                "En supprimant les propriétés de l'objet en mémoire"
              ],
              correctIndex: 0,
              explanation: "Le second argument optionnel de console.table(data, columns) permet de spécifier un tableau de chaînes désignant les colonnes à afficher."
            },
            {
              id: 3,
              question: "Quel est l'avantage majeur de console.groupCollapsed() par rapport à console.group() ?",
              options: [
                "Il chiffre les logs en AES-256",
                "Il crée un dossier d'accordéon fermé par défaut, évitant d'encombrer la console sauf si on clique dessus",
                "Il supprime automatiquement les logs au bout de 5 secondes",
                "Il envoie les logs par email"
              ],
              correctIndex: 1,
              explanation: "groupCollapsed() garde le dossier replié sur une seule ligne. Le développeur ne déplie que la transaction qui l'intéresse."
            },
            {
              id: 4,
              question: "Quelle pratique de journalisation représente un risque critique de sécurité et une infraction au RGPD ?",
              options: [
                "Ajouter des messages contextuels explicites avec le nom du module",
                "Inscrire des mots de passe en clair, des tokens JWT ou des numéros de carte bancaire dans les logs",
                "Utiliser console.table pour examiner des paniers d'achat",
                "Regrouper les logs avec console.group"
              ],
              correctIndex: 1,
              explanation: "Les logs serveurs et applicatifs sont souvent persistés dans des bases centralisées (Datadog, CloudWatch). Y consigner des données secrètes viole le RGPD et expose à des fuites majeures."
            },
            {
              id: 5,
              question: "Pourquoi est-il déconseillé d'écrire console.error(error.message) dans un bloc catch(error) ?",
              options: [
                "Parce que cela provoque une erreur de syntaxe",
                "Parce que cela n'imprime que le texte et supprime toute la Stack Trace d'origine de l'erreur",
                "Parce que cela bloque le navigateur",
                "Parce que la méthode n'existe pas"
              ],
              correctIndex: 1,
              explanation: "En passant l'objet d'erreur entier console.error('Contexte', error), DevTools conserve la stack trace cliquable complète."
            },
            {
              id: 6,
              question: "Comment un ingénieur assainit-il (redact) les données sensibles d'un formulaire avant de les journaliser ?",
              options: [
                "En supprimant le mot de passe de la base de données",
                "En déstructurant l'objet pour exclure les champs secrets (const { password, ...safe } = req.body)",
                "En désactivant la console DevTools",
                "En renommant la variable"
              ],
              correctIndex: 1,
              explanation: "La déstructuration (rest operator) permet d'extraire les champs sensibles pour ne logguer que l'objet 'safe' dépourvu de mot de passe."
            }
          ]}
        />
      </section>
    </div>
  );
};
