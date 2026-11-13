'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface RcaNode {
  level: number;
  question: string;
  answer: string;
  stage: 'Symptôme' | 'Cause Immédiate' | 'Cause Intermédiaire' | 'Cause Racine';
}

interface RcaCase {
  id: string;
  title: string;
  badBandagePatch: string;
  trueRootFix: string;
  steps: RcaNode[];
}

const RCA_CASES: RcaCase[] = [
  {
    id: 'rca-order-crash',
    title: 'Cas 1 : Crash HTTP 500 sur Commande Inexistante',
    badBandagePatch: `// ❌ Pansement superficiel (Symptom Masking) :
return res.json({ total: order?.totalAmount ?? 0 });
// Renvoie 200 OK avec 0€ pour une commande qui n'existe pas !`,
    trueRootFix: `//  Résolution de la cause racine :
const order = await orderRepository.findById(orderId);
if (!order) {
  return res.status(404).json({
    error: "Commande introuvable",
    code: "ORDER_NOT_FOUND"
  });
}
return res.json({ total: order.totalAmount });`,
    steps: [
      {
        level: 1,
        question: 'Pourquoi le client reçoit-il une erreur HTTP 500 dans son navigateur ?',
        answer: 'Parce que le serveur Express a intercepté une exception non gérée (Unhandled Exception) dans order.controller.ts.',
        stage: 'Symptôme'
      },
      {
        level: 2,
        question: 'Pourquoi une exception non gérée a-t-elle été levée ?',
        answer: 'Parce que le moteur V8 a exécuté "TypeError: Cannot read properties of undefined (reading totalAmount)".',
        stage: 'Cause Immédiate'
      },
      {
        level: 3,
        question: 'Pourquoi la variable "order" valait-elle undefined ?',
        answer: 'Parce que la méthode orderRepository.findById(999999) a retourné undefined suite à une requête SQL sans résultat.',
        stage: 'Cause Intermédiaire'
      },
      {
        level: 4,
        question: 'Pourquoi le contrôleur a-t-il tenté d\'accéder aux propriétés d\'un résultat sans vérification ?',
        answer: 'Parce que le contrôleur supposait implicitement que l\'identifiant reçu existait toujours en base de données.',
        stage: 'Cause Intermédiaire'
      },
      {
        level: 5,
        question: 'Quelle est la cause racine de cette défaillance ?',
        answer: 'Absence d\'implémentation du contrat d\'erreur HTTP 404 Not Found dans le contrôleur lorsqu\'une ressource est absente de la couche de données.',
        stage: 'Cause Racine'
      }
    ]
  },
  {
    id: 'rca-auth-failure',
    title: 'Cas 2 : Échec de Connexion Frontend/Backend (HTTP 400)',
    badBandagePatch: `// ❌ Pansement bricolé côté backend :
const password = req.body.password || req.body.passwordUser || req.body.pwd;
// Masque la désynchronisation de contrat sans harmoniser les schémas`,
    trueRootFix: `//  Alignement strict du contrat avec validation Zod :
export const LoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
// Harmonisation côté React dans useAuth.ts :
body: JSON.stringify({ email, password })`,
    steps: [
      {
        level: 1,
        question: 'Pourquoi l\'utilisateur ne peut-il pas se connecter alors que ses identifiants sont exacts ?',
        answer: 'Parce que le backend renvoie systématiquement HTTP 400 Bad Request avec "Champs obligatoires manquants".',
        stage: 'Symptôme'
      },
      {
        level: 2,
        question: 'Pourquoi le backend considère-t-il qu\'un champ est manquant ?',
        answer: 'Parce que la condition (!email || !password) est vraie : password vaut undefined.',
        stage: 'Cause Immédiate'
      },
      {
        level: 3,
        question: 'Pourquoi password vaut-il undefined dans req.body ?',
        answer: 'Parce que le formulaire React transmet la propriété sous le nom "passwordUser" au lieu de "password".',
        stage: 'Cause Intermédiaire'
      },
      {
        level: 4,
        question: 'Pourquoi les deux équipes ont-elles utilisé des noms de clés différents ?',
        answer: 'Parce qu\'aucun schéma d\'interface partagé (Zod / OpenAPI) n\'a été validé entre le frontend et le backend.',
        stage: 'Cause Intermédiaire'
      },
      {
        level: 5,
        question: 'Quelle est la cause racine de cette divergence ?',
        answer: 'Absence de contrat d\'interface unique et typé de bout en bout (Single Source of Truth) validé lors du cycle de build.',
        stage: 'Cause Racine'
      }
    ]
  }
];

export const Chapitre5Content: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<RcaCase>(RCA_CASES[0]);
  const [revealedStep, setRevealedStep] = useState<number>(1);

  const handleSelectCase = (c: RcaCase) => {
    setSelectedCase(c);
    setRevealedStep(1);
  };

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.5</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Diagnostic Approfondi des Causes Racines (Root Cause Analysis - RCA)
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Traiter un symptôme avec un <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-mono font-bold">?.</code> ou un fallback aveugle ne résout rien : cela déplace le bug vers un autre module. Apprenez à appliquer la <strong>méthode des 5 Pourquoi</strong> pour traverser les couches d&apos;abstraction et éliminer définitivement la source de défaillance.
        </p>
      </div>

      {/* Section 1: La Triade d'Analyse */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Mécanique d&apos;Investigation</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Décomposition en trois strates : Symptôme, Cause Immédiate et Cause Racine
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Toute défaillance logicielle se manifeste selon une chaîne causale à trois niveaux. Confondre ces niveaux est la première source d&apos;échec des juniors :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-black">Niveau 1 (Visible)</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">Le Symptôme</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ce que l&apos;utilisateur ou le monitoring perçoit : écran rouge, code HTTP 500, requête bloquée pendant 15 secondes.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-rose-700 bg-rose-50 p-2 rounded-lg">Erreur apparente</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">Niveau 2 (Technique)</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">La Cause Immédiate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                L&apos;instruction logicielle exacte qui a provoqué l&apos;exception dans la machine virtuelle (ex: lire une propriété sur <code className="text-xs font-mono">undefined</code>).
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-amber-800 bg-amber-50 p-2 rounded-lg">Point de plantage</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs flex flex-col justify-between ring-2 ring-emerald-500/20">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-black">Niveau 3 (Fondamental)</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">La Cause Racine (RCA)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Le défaut de conception, le contrat d&apos;interface manquant ou l&apos;absence de gestion de cas limite ayant permis à cet état corrompu d&apos;apparaître.
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-emerald-700 bg-emerald-50 p-2 rounded-lg font-bold">Source du problème</div>
          </div>
        </div>

        <Callout type="danger" title="Le danger mortel des pansements superficiels (Band-aid fixes)">
          Si vous appliquez un patch cosmétique sur la cause immédiate (ex: <code className="text-xs font-mono bg-white px-1 py-0.5 rounded border border-rose-300">order?.totalAmount ?? 0</code>), l&apos;erreur 500 disparaît des logs, mais l&apos;utilisateur reçoit une facture de 0€ pour une commande qui n&apos;existe pas. <strong>La cause racine n&apos;a pas été traitée</strong>, créant une corruption silencieuse de données.
        </Callout>
      </section>

      {/* Section 2: Simulateur Interactif des 5 Pourquoi */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Banc d&apos;Essai Interactif</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. Atelier : Pratiquer les 5 Pourquoi sur les Incidents du Capstone
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Sélectionnez un cas d&apos;incident réel de notre projet et déroulez la méthode des 5 Pourquoi pas à pas pour remonter jusqu&apos;à la cause racine démontrable :
        </p>

        {/* Sélecteur de cas */}
        <div className="flex flex-wrap gap-2.5">
          {RCA_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectCase(c)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCase.id === c.id
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Déroulé des étapes RCA */}
        <div className="rounded-2xl bg-white border border-slate-300 p-5 shadow-sm space-y-4">
          <div className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            Progression de l&apos;enquête : Étape {revealedStep} sur {selectedCase.steps.length}
          </div>

          <div className="space-y-3">
            {selectedCase.steps.slice(0, revealedStep).map((step) => (
              <div key={step.level} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-800">
                    Pourquoi #{step.level} : {step.question}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    step.stage === 'Cause Racine'
                      ? 'bg-emerald-600 text-white'
                      : step.stage === 'Symptôme'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {step.stage}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  ↳ <strong>Réponse technique :</strong> {step.answer}
                </p>
              </div>
            ))}
          </div>

          {revealedStep < selectedCase.steps.length ? (
            <button
              onClick={() => setRevealedStep((prev) => prev + 1)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
            >
              Poser le &laquo; Pourquoi ? &raquo; suivant ({revealedStep + 1} / 5) →
            </button>
          ) : (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Comparatif : Pansement superficiel vs Correction de la cause racine
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-rose-700 mb-1">❌ Pansement cosmétique à proscrire :</div>
                  <CodeBlock language="typescript">{selectedCase.badBandagePatch}</CodeBlock>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-700 mb-1"> Correction chirurgicale de la cause racine :</div>
                  <CodeBlock language="typescript">{selectedCase.trueRootFix}</CodeBlock>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Quiz : Maîtrise de l&apos;analyse des causes racines (RCA)
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.5 — Diagnostic de Causes Racines et Méthode des 5 Pourquoi"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence fondamentale entre une cause immédiate et une cause racine ?",
              options: [
                "La cause immédiate est écrite en TypeScript et la cause racine en C.",
                "La cause immédiate est le point de rupture technique où le CPU lève l'exception, tandis que la cause racine est le défaut de contrat ou d'architecture en amont qui a permis à cet état invalide d'exister.",
                "La cause immédiate n'apparaît que le matin.",
                "Il n'existe aucune différence, ce sont deux termes interchangeables."
              ],
              correctIndex: 1,
              explanation: "Régler la cause immédiate revient à poser un pansement sur la douleur ; éliminer la cause racine détruit la source même de la pathologie."
            },
            {
              id: 2,
              question: "Pourquoi l'ajout d'un chaînage optionnel (ex: order?.totalAmount ?? 0) sur une commande absente est-il considéré comme un correctif toxique ?",
              options: [
                "Parce que TypeScript refuse de compiler l'opérateur ?.",
                "Parce qu'il masque l'anomalie sans implémenter le contrat HTTP 404 légitime, renvoyant un faux succès 200 avec des données corrompues (0€).",
                "Parce que le navigateur client refusera d'afficher la page.",
                "Parce que cela consomme 10 fois plus de bande passante réseau."
              ],
              correctIndex: 1,
              explanation: "Le masquage de symptôme transforme une erreur visible et corrigible en un comportement silencieux faux aux conséquences métiers imprévisibles."
            },
            {
              id: 3,
              question: "Dans la méthode des 5 Pourquoi, quel est l'objectif d'itérer 5 fois avec la question 'Pourquoi ?' ?",
              options: [
                "Épuiser l'interlocuteur pour clore la réunion plus vite.",
                "Franchir successivement les couches superficielles (symptôme, erreur de syntaxe, validation manquante) jusqu'au défaut structurel ou de processus.",
                "Vérifier si le serveur supporte 5 requêtes par minute.",
                "Remplir automatiquement les rapports de conformité ISO."
              ],
              correctIndex: 1,
              explanation: "Chaque 'Pourquoi' dépasse l'évidence immédiate pour sonder la chaîne de causalité jusqu'à l'invariant architectural défaillant."
            },
            {
              id: 4,
              question: "Lorsque deux couches (React et Express) utilisent des noms de clés divergents (password vs passwordUser), quelle est la véritable cause racine ?",
              options: [
                "Une panne du routeur WiFi du bureau.",
                "L'absence d'un contrat d'interface partagé et typé (Single Source of Truth comme Zod ou OpenAPI) validé par le compilateur.",
                "L'utilisation d'une version trop récente de React.",
                "Une mauvaise configuration de l'écran de l'ordinateur."
              ],
              correctIndex: 1,
              explanation: "La cause racine n'est pas le nom de la variable lui-même, mais l'absence de contrat d'API unique et contraignant entre les modules."
            },
            {
              id: 5,
              question: "Comment prouver de façon irréfutable qu'une cause racine a été correctement éliminée par un patch ?",
              options: [
                "En affirmant que l'application semble fonctionner normalement.",
                "En constatant qu'un test de reproduction (Red Test) qui échouait systématiquement avant le patch passe désormais au vert (Green) et continue de passer sous forte charge.",
                "En redémarrant la machine trois fois de suite.",
                "En supprimant le dossier des logs du serveur."
              ],
              correctIndex: 1,
              explanation: "Seule la falsification par un test automatisé valide empiriquement qu'une cause racine a été neutralisée sans effet de bord."
            },
            {
              id: 6,
              question: "Quelle consigne stricte doit être donnée à un agent d'IDE lors d'une session de Root Cause Analysis ?",
              options: [
                "Lui ordonner de corriger immédiatement le fichier le plus court.",
                "Lui interdire toute modification de code (mode Read-Only) et lui imposer de formuler la chaîne causale complète avant de proposer la moindre ligne de patch.",
                "Lui demander de réécrire l'application dans un autre langage de programmation.",
                "Lui transmettre les mots de passe de production."
              ],
              correctIndex: 1,
              explanation: "Séparer l'analyse de l'action empêche l'agent d'appliquer des patchs compulsifs superficiels sur la cause immédiate."
            }
          ]}
        />
      </section>
    </div>
  );
};
