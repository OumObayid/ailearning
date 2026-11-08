'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Construire une bibliothèque de prompts professionnels réutilisables
        </h1>
      </div>

      {/* 1. Pourquoi une bibliothèque de prompts ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Pourquoi professionnaliser ses prompts sous forme de bibliothèque ?
        </h2>
        <p className="text-slate-700">
          Rédiger chaque demande depuis une page blanche expose au risque d&apos;oublier des restrictions, d&apos;employer des termes vagues ou de changer involontairement le format de sortie. Une bibliothèque de prompts apporte :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-800">Gain de temps</span>
            <p className="text-slate-600">Les gabarits de mission et critères de contrôle sont pré-rédigés et éprouvés.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-800">Cohérence inter-agents</span>
            <p className="text-slate-600">Tous les spécialistes partagent le même formalisme d&apos;entrée et de sortie.</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
            <span className="font-bold text-purple-800">Traçabilité &amp; Versionnage</span>
            <p className="text-slate-600">Chaque prompt porte un numéro de version (v1.0, v1.1) documentant ses améliorations.</p>
          </div>
        </div>
      </section>

      {/* 2. Les 8 composants obligatoires */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. La structure standard d&apos;un prompt réutilisable
        </h2>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner space-y-1.5">
          <div className="text-purple-400 font-bold border-b border-slate-800 pb-1">
            # MODÈLE UNIVERSEL PARAMÉTRABLE DE MISSION PROFESSIONNELLE
          </div>
          <pre>{`IDENTIFIANT : {{MISSION_ID}}
AGENT_DESTINATAIRE : {{AGENT}}
OBJECTIF : {{OBJECTIF}}
CONTEXTE_TECHNIQUE : {{CONTEXTE}}
PÉRIMÈTRE_AUTORISÉ : {{PERIMETRE}}
MÉTHODE_ET_ÉTAPES : {{METHODE}}
RESTRICTIONS_STRICTES : {{RESTRICTIONS}}
DÉPENDANCES_AMONT : {{DEPENDANCES}}
LIVRABLE_ATTENDU : {{LIVRABLE}}
CRITÈRES_DE_VALIDATION : {{CRITERES}}
STATUT_INITIAL : À FAIRE`}</pre>
        </div>

        <Callout type="note" title="Règle d'or des variables">
          Si une variable n&apos;est pas renseignée (par exemple <code>{'{{PERIMETRE}}'}</code> est vide), l&apos;agent <strong>ne doit jamais supposer</strong> un chemin par défaut : il doit immédiatement suspendre sa réponse et demander la précision manquante à l&apos;opérateur.
        </Callout>
      </section>

      {/* 3. Catalogue des gabarits */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Organisation de la bibliothèque par spécialité
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Gabarits Développeur &amp; Sécurité</span>
            <ul className="space-y-1 text-slate-600 font-mono">
              <li>• <code>DEV-ANALYSE</code> : Cadrage technique &amp; identification fichiers</li>
              <li>• <code>DEV-PROPOSITION</code> : Diff unifié et impact architectural</li>
              <li>• <code>SEC-AUDIT-API</code> : Analyse validation, auth &amp; injections SQL</li>
              <li>• <code>SEC-AUDIT-FRONT</code> : XSS, CSRF &amp; exposition de secrets</li>
            </ul>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 text-sm">Gabarits Testeur &amp; Documentaliste</span>
            <ul className="space-y-1 text-slate-600 font-mono">
              <li>• <code>TEST-PLAN</code> : Scénarios normaux, cas d&apos;erreurs &amp; limites</li>
              <li>• <code>TEST-VERIF</code> : Collecte de preuves réelles &amp; matrice de recette</li>
              <li>• <code>DOC-API-SPEC</code> : Documentation endpoints OpenAPI confirmés</li>
              <li>• <code>DOC-GUIDE-INSTALL</code> : Procédure de déploiement vérifiée</li>
            </ul>
          </div>
        </div>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900">
          Validation des acquis : Bibliothèque de prompts
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il avantageux d'utiliser des variables comme '{{PERIMETRE}}' dans un prompt professionnel ?",
              options: [
                "Pour réutiliser le même modèle éprouvé à travers plusieurs missions sans réécrire l'ensemble des consignes",
                "Pour accélérer la connexion Internet",
                "Pour chiffrer le prompt",
                "Pour remplacer le langage JavaScript"
              ],
              correctIndex: 0,
              explanation: "Les variables permettent de standardiser le canevas de mission tout en adaptant précisément le contexte et le périmètre à chaque tâche."
            },
            {
              id: 2,
              question: "Quelle différence distingue une 'Instruction principale' d'un 'Prompt de mission' ?",
              options: [
                "L'instruction principale définit les règles permanentes de l'agent, tandis que le prompt de mission précise la tâche ponctuelle à accomplir",
                "Il n'y a aucune différence",
                "Le prompt de mission est écrit en HTML",
                "L'instruction principale est effacée après chaque réponse"
              ],
              correctIndex: 0,
              explanation: "L'instruction principale forge l'identité et les limites permanentes du rôle ; le prompt de mission détaille la tâche spécifique à réaliser."
            }
          ]}
        />
      </section>
    </div>
  );
};

