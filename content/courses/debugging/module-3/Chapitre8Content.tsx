'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type FlowScenarioKey = 'clean_success' | 'caught_error' | 'rethrow_flow' | 'finally_overwrite' | 'async_escape';

interface FlowScenario {
  title: string;
  badge: string;
  badgeColor: string;
  codeSnippet: string;
  steps: { step: string; status: 'ok' | 'error' | 'cleanup' }[];
  returnedValue: string;
  explanation: string;
}

const FLOW_SCENARIOS: Record<FlowScenarioKey, FlowScenario> = {
  clean_success: {
    title: '1. Flux nominal sans exception (try -> finally)',
    badge: 'Succès nominal',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    codeSnippet: `function performQuery() {
  try {
    console.log("1. Ouverture connexion SQL");
    return "Données reçues";
  } catch (err) {
    console.log("2. Erreur (ignorée ici)");
  } finally {
    console.log("3. Fermeture connexion SQL");
  }
}`,
    steps: [
      { step: 'Entrée dans try : Ouverture connexion SQL', status: 'ok' },
      { step: 'Calcul réussi, return préparé ("Données reçues")', status: 'ok' },
      { step: 'Le catch est ignoré (aucune exception)', status: 'ok' },
      { step: 'Exécution impérative de finally : Fermeture connexion SQL', status: 'cleanup' },
      { step: 'Valeur retournée : "Données reçues"', status: 'ok' }
    ],
    returnedValue: '"Données reçues"',
    explanation: 'Le flux nominal exécute le bloc try de bout en bout. Même lorsqu\'un return est rencontré, l\'instruction finally est garantie de s\'exécuter avant que la fonction ne rende la main à l\'appelant.'
  },
  caught_error: {
    title: '2. Exception interceptée et réparée (try -> catch -> finally)',
    badge: 'Erreur Gérée',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    codeSnippet: `function parseUserData(rawJson) {
  try {
    const data = JSON.parse(rawJson); // 💥 Lève SyntaxError si invalide
    return data;
  } catch (err) {
    console.warn("JSON corrompu, fallback par défaut activé");
    return { isGuest: true };
  } finally {
    console.log("Audit log terminé");
  }
}`,
    steps: [
      { step: 'Entrée dans try : Tentative de parse d\'un JSON corrompu', status: 'ok' },
      { step: '💥 Exception levée : Déroulement immédiat de la pile vers catch', status: 'error' },
      { step: 'Entrée dans catch : Log de warning et return de repli ({ isGuest: true })', status: 'ok' },
      { step: 'Exécution garantie de finally : Audit log terminé', status: 'cleanup' },
      { step: 'Valeur retournée à l\'appelant : { isGuest: true }', status: 'ok' }
    ],
    returnedValue: '{ isGuest: true }',
    explanation: 'Dès que JSON.parse échoue, V8 interrompt le bloc try et transfère l\'exécution au catch le plus proche. Le catch répare l\'anomalie en retournant une valeur de repli (fallback).'
  },
  rethrow_flow: {
    title: '3. Propagation après journalisation (Rethrow)',
    badge: 'Rethrow',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    codeSnippet: `function processPayment(card) {
  try {
    chargeStripe(card); // 💥 StripeError
  } catch (err) {
    auditTelemetry.log(err); // Enregistrement technique
    throw new PaymentError("Paiement refusé", { cause: err }); // Repropagation !
  } finally {
    clearCardNumberFromRam(); // Nettoyage mémoire PII
  }
}`,
    steps: [
      { step: 'Entrée dans try : Appel passerelle de paiement', status: 'ok' },
      { step: '💥 Échec réseau ou carte refusée', status: 'error' },
      { step: 'Entrée dans catch : Enregistrement de télémétrie', status: 'ok' },
      { step: 'throw new PaymentError : L\'erreur est repropagée vers l\'étage supérieur', status: 'error' },
      { step: 'Exécution garantie de finally : Nettoyage des données bancaires en RAM', status: 'cleanup' },
      { step: 'L\'appelant reçoit l\'exception PaymentError', status: 'error' }
    ],
    returnedValue: '💥 Exception PaymentError (rejetée vers l\'appelant)',
    explanation: 'Le patron de "Rethrow" consiste à intercepter une erreur pour la journaliser ou nettoyer un état, puis à relancer une erreur métier typée (idéalement enrichie via error.cause).'
  },
  finally_overwrite: {
    title: '4. Le piège fatal du return dans finally (Exception étouffée)',
    badge: 'Anti-Pattern Dangereux',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    codeSnippet: `function dangerousFunction() {
  try {
    throw new Error("💥 CRASH SERVEUR CRITIQUE !");
  } catch (err) {
    throw err; // On relance l'erreur...
  } finally {
    return "Oups, tout va bien !"; // 💥 SUPPRIME ET ÉTOUFFE L'EXCEPTION !
  }
}`,
    steps: [
      { step: 'Entrée dans try : Exception critique levée', status: 'error' },
      { step: 'Entrée dans catch : L\'erreur est relancée vers l\'appelant', status: 'error' },
      { step: '💥 finally exécute son propre return : L\'EXCEPTION EST ÉCRASÉE ET DISPARAÎT !', status: 'error' },
      { step: 'Valeur retournée à l\'appelant : "Oups, tout va bien !"', status: 'ok' }
    ],
    returnedValue: '"Oups, tout va bien !" (L\'erreur a totalement disparu !)',
    explanation: 'En ECMAScript, une instruction return ou throw située à l\'intérieur d\'un bloc finally écrase et supprime TOUT return ou exception préalablement levée dans try ou catch. Ne mettez JAMAIS de return dans un bloc finally !'
  },
  async_escape: {
    title: '5. L\'exception qui s\'échappe d\'un setTimeout synchrone',
    badge: 'Crash Non Intercepté',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    codeSnippet: `try {
  setTimeout(() => {
    // 💥 Cette exception est exécutée dans un tick futur de l'Event Loop !
    throw new Error("Crash dans timer");
  }, 100);
} catch (err) {
  // 💥 CE CATCH NE CAPTURERA JAMAIS CETTE ERREUR !
  console.log("Erreur capturée");
}`,
    steps: [
      { step: 'Entrée dans try : Enregistrement du timer auprès de l\'API Web/Node', status: 'ok' },
      { step: 'Sortie immédiate du bloc try/catch : Le bloc est dépilé de la Call Stack', status: 'ok' },
      { step: '100ms plus tard : L\'Event Loop dépile le callback du timer', status: 'ok' },
      { step: '💥 throw new Error : Aucun bloc try/catch n\'englobe ce frame sur la pile !', status: 'error' },
      { step: 'Résultat : Crash Uncaught Exception au niveau global du processus', status: 'error' }
    ],
    returnedValue: '💥 Uncaught Exception globale (Crash Node.js ou window.onerror)',
    explanation: 'Un try/catch est purement synchrone vis-à-vis de sa pile d\'appels. Pour capturer les erreurs asynchrones d\'une fonction, celle-ci doit renvoyer une Promise et être précédée de await.'
  }
};

export const Chapitre8Content: React.FC = () => {
  const [activeScenarioKey, setActiveScenarioKey] = useState<FlowScenarioKey>('clean_success');
  const activeScenario = FLOW_SCENARIOS[activeScenarioKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="code" className="w-4 h-4 text-lime-700" />
          <span>Module 3 — Techniques Avancées de Débogage</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 8 — Gestion des exceptions avec try / catch / finally et architecture d&apos;erreurs
        </h1>
        <p className="mt-3 text-base text-slate-700 font-medium">
          Comment fonctionne le mécanisme de <em>Stack Unwinding</em> lors d&apos;un <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">throw</code> ? Pourquoi lancer une simple chaîne de caractères (<code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">throw &quot;Erreur&quot;</code>) est-il une faute d&apos;ingénierie majeure privant vos logs de stack trace ? Pourquoi un <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">return</code> dans un bloc <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">finally</code> étouffe-t-il les pires crashs serveur ? Découvrez l&apos;architecture moderne des exceptions avec <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-emerald-800">error.cause</code> et les middlewares centralisés.
        </p>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maîtriser le déroulement de pile (Stack Unwinding) et l&apos;interdiction formelle de lancer des non-objets (<code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">throw string</code>).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Exploiter le bloc <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">finally</code> pour la libération inconditionnelle de ressources et déjouer le piège du <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">return</code> écrasé.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Concevoir une hiérarchie d&apos;erreurs métier typées (<code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">AppError</code>) chaînées avec le standard moderne <code className="text-xs bg-white px-1 py-0.5 rounded font-mono text-emerald-800">error.cause</code> (ES2022).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-lime-400 transition-colors">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Déployer un middleware d&apos;erreur centralisé robuste à 4 arguments sous Express / Node.js.</span>
          </div>
        </div>
      </section>

      {/* 2. Mécanique interne du throw et Stack Unwinding */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. La mécanique interne du throw : Le déroulement de pile (Stack Unwinding)
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Lorsqu&apos;une instruction <code className="font-mono text-xs font-bold text-rose-700">throw</code> est exécutée par le moteur JavaScript, l&apos;exécution normale de la fonction s&apos;interrompt sur-le-champ. V8 déclenche alors un processus appelé <strong>déroulement de pile</strong> (<em>Stack Unwinding</em>).
        </p>

        {/* Métaphore pédagogique */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 text-sm text-slate-900 space-y-2">
          <div className="flex items-center gap-2 font-black text-amber-900 uppercase text-xs tracking-wider">
            <Icon name="info" className="w-4 h-4 text-amber-700" />
            <span>Métaphore de la fusée d&apos;alarme et de l&apos;escalier de secours</span>
          </div>
          <p className="leading-relaxed text-slate-800">
            Lancer une exception avec <code className="font-mono font-bold">throw</code> équivaut à déclencher une fusée de détresse dans un immeuble. Le moteur inspecte immédiatement la pièce courante : y a-t-il un bloc <code className="font-mono font-bold">catch</code> ? Si non, il descend d&apos;un étage (dépile le frame actuel de la Call Stack) pour vérifier la pièce parente, et ainsi de suite. S&apos;il atteint le rez-de-chaussée (le scope global) sans trouver le moindre <code className="font-mono font-bold">catch</code>, l&apos;alarme générale retentit : en navigateur, l&apos;erreur est loggée dans <code className="font-mono">window.onerror</code> ; en Node.js, l&apos;événement <code className="font-mono">uncaughtException</code> <strong>provoque l&apos;arrêt immédiat et fatal du processus</strong>.
          </p>
        </div>

        {/* Pourquoi throw string est interdit */}
        <Callout type="danger" title="La règle d'or : Ne lancez JAMAIS de primitif (throw 'Erreur')">
          <p className="text-sm leading-relaxed">
            JavaScript autorise techniquement d&apos;écrire <code className="font-mono font-bold">throw &quot;Identifiant introuvable&quot;</code> ou <code className="font-mono font-bold">throw 404</code>. C&apos;est une pratique toxique ! Seules les instances de la classe <code className="font-mono font-bold">Error</code> (ou ses dérivées) capturent une <strong>Stack Trace</strong> (la trace d&apos;appels détaillée indiquant le nom du fichier, le numéro de ligne et de colonne du crash). Si vous lancez une simple chaîne, vos outils de monitoring (Sentry, Datadog) ne pourront jamais vous indiquer où le problème est survenu !
          </p>
        </Callout>
      </section>

      {/* 3. Anatomie de try / catch / finally et le piège du return écrasé */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les mystères de finally : Nettoyage garanti et le piège du return écrasé
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/70 space-y-2">
            <span className="font-mono text-xs font-bold text-slate-700 uppercase px-2 py-0.5 rounded bg-slate-200">Zone 1</span>
            <h3 className="font-black text-slate-950 text-sm">Bloc try</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Englobe la portion de code vulnérable aux défaillances. Dès qu&apos;une exception survient, les lignes restantes de ce bloc sont immédiatement abandonnées.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/70 space-y-2">
            <span className="font-mono text-xs font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-200">Zone 2</span>
            <h3 className="font-black text-amber-950 text-sm">Bloc catch (error)</h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              Capture l&apos;exception levée. Depuis ES2019, la variable <code className="font-mono font-bold">error</code> est facultative (<code className="font-mono">catch &#123; ... &#125;</code>) si son contenu ne vous intéresse pas.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-800 uppercase px-2 py-0.5 rounded bg-emerald-200">Zone 3</span>
            <h3 className="font-black text-emerald-950 text-sm">Bloc finally</h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              S&apos;exécute <strong>absolument toujours</strong>, que le <code className="font-mono">try</code> ait réussi, que le <code className="font-mono">catch</code> ait géré l&apos;erreur ou qu&apos;une nouvelle exception ait été relancée.
            </p>
          </div>
        </div>

        {/* Le piège fatal de return dans finally */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2 mt-4">
          <div className="text-rose-400 font-bold">{`// 💥 DÉSASTRE : return dans un bloc finally étouffe toutes les erreurs !`}</div>
          <div>{`function executeCriticalTransaction() {
  try {
    throw new Error("Base de données corrompue !");
  } catch (err) {
    throw err; // L'erreur est relancée vers l'administrateur
  } finally {
    return true; // 💥 CATASTROPHE : Ce return écrase l'exception et la supprime !
  }
}

const result = executeCriticalTransaction();
console.log(result); // Affiche "true" ! L'erreur fatale a été étouffée en silence !`}</div>
        </div>
      </section>

      {/* 4. Hiérarchie d'erreurs et error.cause */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Architecture d&apos;erreurs d&apos;entreprise et chaînage moderne avec error.cause
        </h2>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Dans une application professionnelle, lancer une instance brute de <code className="font-mono text-xs">new Error(&quot;Erreur&quot;)</code> est insuffisant pour permettre au système de distinguer une faute de saisie utilisateur (HTTP 400), une ressource absente (HTTP 404) ou un crash interne (HTTP 500). Nous créons une <strong>hiérarchie d&apos;exceptions typées</strong>.
        </p>

        <CodeBlock
          language="typescript"
          filename="custom-error-hierarchy.ts"
          code={`// 1. Classe de base d'erreur applicative opérationnelle
export abstract class AppError extends Error {
  public abstract readonly statusCode: number;
  public readonly isOperational: boolean = true;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    // Capture propre de la stack trace excluant le constructeur :
    Error.captureStackTrace?.(this, this.constructor);
  }
}

// 2. Erreur 404 : Ressource introuvable
export class NotFoundError extends AppError {
  public readonly statusCode = 404;
}

// 3. Erreur 400 : Validation de formulaire ou de payload invalide
export class ValidationError extends AppError {
  public readonly statusCode = 400;
  constructor(message: string, public readonly validationErrors?: Record<string, string>) {
    super(message);
  }
}

// 4. Chaînage moderne avec error.cause (ES2022) :
try {
  await databaseDriver.connect();
} catch (dbError) {
  // On emballe l'erreur bas niveau dans une erreur métier de haut niveau
  // tout en préservant l'historique complet grâce à { cause } :
  throw new AppError("Service temporairement indisponible", { cause: dbError });
}`}
        />
      </section>

      {/* 5. Simulateur Interactif : Laboratoire du Flux d'Exceptions */}
      <section className="space-y-4 pt-4 border-t-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
              <Icon name="terminal" className="w-5 h-5 text-lime-700" />
              <span>5. Laboratoire Interactif : Simulateur du Flux try / catch / finally</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sélectionnez un scénario d&apos;exécution pour observer le cheminement pas-à-pas de V8 et la valeur finale reçue par l&apos;appelant.
            </p>
          </div>
        </div>

        {/* Boutons sélecteurs de scénarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
          {(Object.keys(FLOW_SCENARIOS) as FlowScenarioKey[]).map((key) => {
            const scenario = FLOW_SCENARIOS[key];
            const isSelected = activeScenarioKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveScenarioKey(key)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-lime-300 border-slate-900 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border inline-block mb-1 ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
                <div className="text-xs font-mono font-bold truncate">{scenario.title}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'inspection en direct */}
        <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-5 space-y-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">Scénario inspecté :</span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {activeScenario.title}
              </h3>
            </div>
            <div className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300">
              Retour final : <span className="text-lime-300 font-mono font-black">{activeScenario.returnedValue}</span>
            </div>
          </div>

          {/* Grille Code vs Déroulé pas-à-pas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Code source exécuté :
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {activeScenario.codeSnippet}
              </pre>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Chronologie d&apos;exécution du moteur V8 :
              </span>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-sans">
                {activeScenario.steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                      st.status === 'ok' ? 'bg-emerald-900 text-emerald-300' :
                      st.status === 'error' ? 'bg-rose-900 text-rose-300' :
                      'bg-purple-900 text-purple-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={st.status === 'error' ? 'text-rose-300 font-medium' : 'text-slate-300'}>
                      {st.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explication pédagogique */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block font-sans">
              Analyse du mécanisme V8 :
            </span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {activeScenario.explanation}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Travaux Pratiques : Middleware Centralisé Express */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-lime-200 text-lime-900 font-black text-sm flex items-center justify-center">
            TP
          </span>
          <h2 className="text-[19px] font-bold text-slate-900">
            6. Travaux Pratiques — Audit et refactorisation d&apos;une API Express / Node.js
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Le service d&apos;API ci-dessous gère des commandes clients. En cas d&apos;erreur, il fait fuiter les stack traces internes et les mots de passe de la base de données vers le client web, les connexions SQL restent ouvertes en cas de crash (fuite de pool), et les erreurs asynchrones non gérées bloquent les requêtes indéfiniment.
        </p>

        {/* Code source bogué */}
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase text-rose-700 flex items-center gap-2">
            <Icon name="alert" className="w-4 h-4 text-rose-600" />
            <span>Code défaillant (4 failles d&apos;architecture d&apos;exception)</span>
          </h3>
          <CodeBlock
            language="javascript"
            filename="buggy-order-controller.js"
            code={`// ROUTE ASYNCHRONE DÉFAILLANTE :
app.get("/api/orders/:id", async (req, res, next) => {
  const dbClient = await pool.connect();
  try {
    const order = await dbClient.query("SELECT * FROM orders WHERE id = $1", [req.params.id]);
    
    // FAILLE 1 : throw string sans objet Error (zéro stack trace !)
    if (!order.rows[0]) {
      throw "Commande introuvable"; 
    }

    // FAILLE 2 : Libération du client SQL uniquement dans le try !
    // Si une erreur survient au-dessus, dbClient n'est JAMAIS libéré (fuite de pool SQL) !
    dbClient.release();
    res.json(order.rows[0]);
  } catch (err) {
    // FAILLE 3 : Exposition de la stack trace interne aux clients en production !
    res.status(500).json({ error: err, stack: err.stack });
    // FAILLE 4 : Pas de délégation au middleware global via next(err) !
  }
});`}
          />
        </div>

        {/* Code source corrigé */}
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-black uppercase text-emerald-800 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4 text-emerald-600" />
            <span>Solution professionnelle avec finally et Middleware Global Express à 4 arguments</span>
          </h3>
          <CodeBlock
            language="typescript"
            filename="safe-order-controller.ts"
            code={`import { Request, Response, NextFunction } from "express";
import { AppError, NotFoundError } from "./errors";

// 1. Contrôleur sécurisé avec garantie de libération de ressource dans finally
export async function getOrderByIdHandler(req: Request, res: Response, next: NextFunction) {
  const dbClient = await pool.connect();
  try {
    const order = await dbClient.query("SELECT * FROM orders WHERE id = $1", [req.params.id]);

    if (!order.rows[0]) {
      // ✅ Classe d'erreur typée avec code HTTP 404
      throw new NotFoundError(\`Commande numéro \${req.params.id} introuvable.\`);
    }

    res.json({ success: true, data: order.rows[0] });
  } catch (error) {
    // ✅ Délégation immédiate au middleware centralisé
    next(error);
  } finally {
    // ✅ LIBÉRATION GARANTIE : S'exécute toujours, avec ou sans erreur !
    dbClient.release();
  }
}

// 2. Middleware d'erreur global (EXACTEMENT 4 arguments : (err, req, res, next))
export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Journalisation technique complète pour les développeurs
  console.error("[CRASH API]", {
    path: req.path,
    statusCode,
    error: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined
  });

  // Réponse assainie pour l'utilisateur (ne JAMAIS divulguer la stack trace en production)
  res.status(statusCode).json({
    success: false,
    message: isAppError
      ? err.message
      : isProduction
      ? "Une erreur technique interne est survenue."
      : (err as Error).message
  });
}`}
          />
        </div>
      </section>

      {/* 7. Synthèse : La Check-list Anti-Bogue d'Exceptions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Synthèse : Les 4 Règles d&apos;Or de Gestion des Exceptions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #1 : Toujours lancer des instances d&apos;Error</span>
            <p className="text-xs text-slate-700">Bannissez <code className="font-mono">throw &quot;texte&quot;</code> ou <code className="font-mono">throw 404</code>. Seules les instances de <code className="font-mono font-bold">Error</code> capturent la pile d&apos;appels indispensable au diagnostic.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #2 : Jamais de return dans finally</span>
            <p className="text-xs text-slate-700">Le bloc <code className="font-mono font-bold">finally</code> doit servir exclusivement au nettoyage (close, release, clear). Un return à cet endroit étouffe silencieusement toutes les exceptions.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #3 : Chaîner avec error.cause</span>
            <p className="text-xs text-slate-700">Lorsque vous ré-encapsulez une exception bas niveau dans une erreur métier, conservez la cause d&apos;origine via <code className="font-mono font-bold">new AppError(msg, &#123; cause: err &#125;)</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block font-mono text-xs text-lime-900">Règle #4 : 4 arguments pour Express</span>
            <p className="text-xs text-slate-700">Le gestionnaire d&apos;erreurs centralisé d&apos;Express requiert rigoureusement 4 paramètres <code className="font-mono font-bold">(err, req, res, next)</code> pour être reconnu comme tel.</p>
          </div>
        </div>
      </section>

      {/* 8. Quiz interactif */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          8. Quiz de validation — Chapitre 3.8
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il fortement déconseillé de lancer une chaîne de caractères via 'throw \"Mon erreur\";' ?",
              options: [
                "C'est une SyntaxError interdite par ECMAScript",
                "Les chaînes de caractères ne capturent pas de Stack Trace, rendant impossible l'identification du fichier et de la ligne fautive dans les outils de logs",
                "Cela fait planter le Garbage Collector",
                "La chaîne est automatiquement convertie en nombre"
              ],
              correctIndex: 1,
              explanation: "Seules les instances de la classe Error génèrent une trace d'appels (stack trace). Une primitive comme une chaîne ou un nombre empêche tout diagnostic en production."
            },
            {
              id: 2,
              question: "Que se passe-t-il si un bloc finally contient une instruction 'return true;' alors que le bloc try a lancé une exception ?",
              options: [
                "L'exception est levée normalement et le return est ignoré",
                "Le return du bloc finally étouffe et supprime définitivement l'exception, renvoyant true à l'appelant",
                "Une TypeError est déclenchée",
                "Le processus Node.js s'arrête"
              ],
              correctIndex: 1,
              explanation: "L'instruction return dans un bloc finally a la priorité absolue dans la spécification JS : elle annule et étouffe toute exception ou return préalable issu de try ou catch."
            },
            {
              id: 3,
              question: "Pourquoi un bloc try/catch synchrone ne capture-t-il pas une exception levée dans un callback setTimeout ?",
              options: [
                "Parce que setTimeout s'exécute dans un autre processus système",
                "Le bloc try/catch se termine et est dépilé de la Call Stack avant que le timer ne soit déclenché par l'Event Loop",
                "Parce que throw est interdit dans les timers",
                "C'est un bogue propre au navigateur Chrome"
              ],
              correctIndex: 1,
              explanation: "Le try/catch est synchrone. Une fois le timer programmé, le bloc se termine immédiatement. Lorsque le callback s'exécute 100ms plus tard, le bloc catch n'est plus actif."
            },
            {
              id: 4,
              question: "À quoi sert la propriété standard 'error.cause' introduite dans ECMAScript 2022 ?",
              options: [
                "À redémarrer le serveur automatiquement",
                "À conserver une référence vers l'exception d'origine lors de l'encapsulation dans une nouvelle erreur de plus haut niveau",
                "À désactiver la journalisation des erreurs",
                "À crypter les données sensibles de l'erreur"
              ],
              correctIndex: 1,
              explanation: "error.cause permet de chaîner les exceptions en préservant la cause racine (root cause) d'origine, par exemple en reliant une erreur de syntaxe SQL à une DatabaseError métier."
            },
            {
              id: 5,
              question: "Pourquoi le middleware d'erreur centralisé d'Express doit-il obligatoirement déclarer 4 paramètres (err, req, res, next) ?",
              options: [
                "Pour respecter le protocole HTTP/2",
                "Parce qu'Express inspecte la propriété .length de la fonction pour savoir s'il s'agit d'un middleware normal (3 args) ou d'un gestionnaire d'erreur (4 args)",
                "Pour éviter les fuites de mémoire",
                "Pour supporter TypeScript"
              ],
              correctIndex: 1,
              explanation: "Express vérifie fn.length : une fonction à 4 arguments est enregistrée comme le receveur des erreurs déclenchées via next(error)."
            },
            {
              id: 6,
              question: "Dans quel cas le bloc finally est-il garanti de s'exécuter ?",
              options: [
                "Uniquement si le bloc try réussit sans encombre",
                "Uniquement si une exception a été levée",
                "Dans 100% des cas, que le try réussisse, qu'une erreur soit capturée ou qu'elle soit relancée",
                "Uniquement si la fonction est déclarée async"
              ],
              correctIndex: 2,
              explanation: "Le bloc finally est conçu pour garantir le nettoyage absolu des ressources : il s'exécute systématiquement quelle que soit l'issue du try ou du catch."
            }
          ]}
        />
      </section>
    </div>
  );
};
