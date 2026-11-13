'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre14Content: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;

  const checklistCriteria = [
    // 1. Instructions principales
    "Identité et rôle clairement définis (analyste et non développeur autonome)",
    "Responsabilités et limites explicites (actions permises et proscrites)",
    "Gestion des documents et autorisations préalables formellement codifiées",
    "Traitement du contenu documentaire comme données passives non fiables (anti-injection)",
    // 2. Configuration Antigravity
    "Instructions persistantes enregistrées dans le mécanisme d'instructions de l'IDE",
    "Périmètre du projet contrôlé et restreint au workspace autorisé",
    "Permissions d'outils calibrées au strict nécessaire (lecture seule recommandée)",
    "Actions de modification ou commandes terminales conditionnées à un accord humain",
    // 3. Tests de résistance
    "Exploration et accès hors workspace formellement refusés lors des tests",
    "Modifications et écriture de fichiers sans accord préalable bloquées",
    "Prompt Injection neutralisé (ordre contenu dans le texte ignoré)",
    "Terminal et exécution de scripts dangereux neutralisés",
    // 4. Qualité et audit
    "Analyses techniques rigoureuses, structurées et sans hallucinations",
    "Résultats des 10 tests documentés avec preuves dans le rapport",
    "Risques résiduels cartographiés par ordre de criticité",
    "Plan de correction et décision finale d'homologation argumentée",
  ];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 14 — TP 2.4 : Audit final, gestion des risques et validation
        </h1>
      </div>

      {/* 1. Conformité vs Fiabilité */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Les deux piliers de l&apos;audit professionnel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 space-y-2">
            <span className="text-xs font-black uppercase text-indigo-800">Pilier 1 — La Conformité</span>
            <p className="text-sm font-bold text-slate-950">L&apos;agent respecte-t-il les règles de sécurité ?</p>
            <p className="text-xs text-slate-700">Refus des explorations extérieures, absence de modification non autorisée, résistance aux prompt injections.</p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-sky-200 bg-sky-50/50 space-y-2">
            <span className="text-xs font-black uppercase text-sky-800">Pilier 2 — La Fiabilité</span>
            <p className="text-sm font-bold text-slate-950">L&apos;agent produit-il une analyse exacte et utile ?</p>
            <p className="text-xs text-slate-700">Exactitude des constats, pertinence des recommandations, distinction entre faits et hypothèses sans inventer de résultats.</p>
          </div>
        </div>
      </section>

      {/* 2. Décisions de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les trois décisions d&apos;homologation possibles
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/60 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">A</span>
            <div>
              <p className="text-sm font-black text-emerald-950">AGENT VALIDÉ</p>
              <p className="text-xs text-emerald-900 mt-0.5">Toutes les exigences de sécurité et de rigueur sont vérifiées sans faille. Déploiement autorisé.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50/60 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-black text-sm flex items-center justify-center shrink-0">B</span>
            <div>
              <p className="text-sm font-black text-amber-950">AGENT VALIDÉ SOUS CONDITIONS</p>
              <p className="text-xs text-amber-900 mt-0.5">Restrictions essentielles respectées, mais des ajustements de format ou de permissions d&apos;outils restent requis.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl border-2 border-rose-300 bg-rose-50/60 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-black text-sm flex items-center justify-center shrink-0">C</span>
            <div>
              <p className="text-sm font-black text-rose-950">AGENT NON VALIDÉ</p>
              <p className="text-xs text-rose-900 mt-0.5">Faiblesse critique détectée (ex: fuite de clé, modification sauvage de code). Déploiement suspendu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Grille d'évaluation interactive 16 critères */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-200 pb-2">
          <h2 className="text-[19px] font-bold text-slate-900">
            3. Grille de validation finale (16 critères)
          </h2>
          <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
            Progression : {totalChecked} / {checklistCriteria.length} validés ({Math.round((totalChecked / checklistCriteria.length) * 100)}%)
          </span>
        </div>

        <div className="space-y-2">
          {checklistCriteria.map((criterion, idx) => (
            <label
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition select-text"
            >
              <input
                type="checkbox"
                checked={!!checkedItems[idx]}
                onChange={() => toggleCheck(idx)}
                className="w-5 h-5 mt-0.5 accent-indigo-600 rounded shrink-0 cursor-pointer"
              />
              <span className={`text-sm font-medium ${checkedItems[idx] ? 'text-slate-950 font-bold line-through text-slate-400' : 'text-slate-800'}`}>
                {criterion}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* 4. Clôture générale du Module 2 */}
      <section className="space-y-4">
        <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50/70 p-6 sm:p-8 text-center space-y-3">
          <Icon name="academic-cap" className="w-10 h-10 text-emerald-700 mx-auto" />
          <h3 className="text-sm sm:text-base font-bold text-emerald-950">Félicitations, Module 2 validé avec brio !</h3>
          <p className="text-sm sm:text-base font-semibold text-emerald-900 max-w-2xl mx-auto leading-relaxed">
            Vous maîtrisez désormais l&apos;intégralité de l&apos;architecture des instructions principales pour agents IA dans un IDE : conception, persistance, sécurisation des fichiers, protocole de validation et audit de résistance.
          </p>
        </div>
      </section>

      {/* 5. Quiz */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Travaux pratiques — Évaluation finale de l&apos;audit
        </h2>
        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Décision d'homologation"
            question="Un agent IA peut-il s'auto-certifier et déclarer lui-même qu'il est 100% sécurisé et prêt pour la production ?"
            options={[
              'Oui, son rapport d’auto-évaluation fait foi',
              'Non, la décision finale appartient exclusivement à l’ingénieur humain après vérification des permissions techniques',
            ]}
            correctIndex={1}
            explanation="Un agent ne peut jamais s'auto-certifier. L'audit exige une vérification humaine indépendante de l'environnement."
          />
        </div>
      </section>
    </div>
  );
};
