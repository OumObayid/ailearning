'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Gestion des exceptions avec try / catch / finally
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs d&apos;apprentissage
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comprendre le flux d&apos;interruption immédiat déclenché par l&apos;instruction throw.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser le bloc finally pour garantir la libération des ressources système.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Créer une hiérarchie de classes d&apos;erreurs typées (NotFoundError, ValidationError).</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place un middleware d&apos;erreur centralisé à 4 arguments dans Express.</span>
          </li>
        </ul>
      </section>

      {/* 2. Le mécanisme try/catch/finally */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Anatomie de la gestion d&apos;exception synchrone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-950 font-mono text-sm">Bloc try</h3>
            <p className="text-xs text-slate-700">
              Contient le code risqué. Dès qu&apos;une exception survient, l&apos;exécution s&apos;arrête immédiatement à cette ligne et saute au catch.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-950 font-mono text-sm">Bloc catch (err)</h3>
            <p className="text-xs text-slate-700">
              Capture l&apos;objet d&apos;erreur levé. Permet de logger, d&apos;adapter la réponse HTTP ou de propager l&apos;exception via <code className="font-mono">throw</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-950 font-mono text-sm">Bloc finally</h3>
            <p className="text-xs text-slate-700">
              S&apos;exécute <strong>toujours</strong>, que le bloc try ait réussi ou qu&apos;une exception ait été levée. Idéal pour fermer des descripteurs de fichiers ou connexions SQL.
            </p>
          </div>
        </div>

        <Callout type="warning">
          <strong>Le piège de setTimeout dans un try/catch :</strong> Un bloc <code className="font-mono font-bold">try/catch</code> autour d&apos;un <code className="font-mono font-bold">setTimeout</code> ne capturera <em>JAMAIS</em> une exception levée dans son callback, car le bloc try s&apos;est déjà terminé lorsque le callback est dépilé de la file des Timers !
        </Callout>
      </section>

      {/* 3. Erreurs Métier Personnalisées */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Concevoir des erreurs métier personnalisées (Custom Errors)
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          En ingénierie logicielle, lancer un simple <code className="font-mono">throw new Error(&quot;Invalide&quot;)</code> est insuffisant. Dérivez la classe <code className="font-mono font-bold">Error</code> native pour enrichir vos exceptions d&apos;un code HTTP et d&apos;un nom typé :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-emerald-400 font-bold">{`// Hiérarchie d'erreurs standardisée :`}</div>
          <div>{`class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Ressource introuvable") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Données invalides") {
    super(message, 400);
  }
}`}</div>
        </div>
      </section>

      {/* 4. Middleware centralisé Express */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Gestion centralisée des erreurs dans Express.js
        </h2>
        <p className="text-sm sm:text-base text-slate-800">
          Évitez de dupliquer des blocs <code className="font-mono">res.status(500).json(...)</code> dans chaque route. Déléguez toutes les exceptions au gestionnaire centralisé via <code className="font-mono font-bold">next(error)</code> :
        </p>

        <div className="p-4 bg-slate-950 text-white rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <div className="text-cyan-400 font-bold">{`// Middleware global d'erreur (exactement 4 arguments requis par Express) :`}</div>
          <div>{`app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  
  // Journalisation technique complète pour les développeurs :
  console.error("[ERROR API]", {
    path: req.path,
    message: error.message,
    statusCode,
    stack: error.stack
  });

  // Réponse assainie pour les clients (ne jamais exposer la stack trace en prod !) :
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Erreur interne du serveur" : error.message
  });
});`}</div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Quiz de validation — Chapitre 3.8
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quel mot-clé JavaScript permet de déclencher volontairement une exception ?",
              options: [
                "catch",
                "throw",
                "finally",
                "raise"
              ],
              correctIndex: 1,
              explanation: "throw permet d'interrompre le cours normal de l'exécution et de propager une exception."
            },
            {
              id: 2,
              question: "Dans quelles circonstances le bloc finally est-il exécuté ?",
              options: [
                "Uniquement lorsqu'une exception a été levée",
                "Uniquement si aucune erreur ne s'est produite",
                "Toujours, à l'issue de l'exécution de try ou de catch",
                "Uniquement si l'utilisateur annule la requête"
              ],
              correctIndex: 2,
              explanation: "Le bloc finally est garanti de s'exécuter dans tous les cas, ce qui en fait l'emplacement idéal pour le nettoyage des ressources."
            },
            {
              id: 3,
              question: "Pourquoi est-il crucial qu'un middleware d'erreur Express possède exactement 4 arguments (err, req, res, next) ?",
              options: [
                "Pour respecter la norme HTTP",
                "Parce qu'Express examine fn.length pour distinguer les middlewares normaux des gestionnaires d'erreurs",
                "Pour accélérer le parsing JSON",
                "Pour se connecter à MySQL"
              ],
              correctIndex: 1,
              explanation: "Express inspecte la propriété .length de la fonction : un gestionnaire à 4 arguments signale au routeur qu'il s'agit du receveur d'erreurs."
            }
          ]}
        />
      </section>
    </div>
  );
};
