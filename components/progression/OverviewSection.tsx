'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import type { UserProgressionResponse } from '@/services/progressionService';

interface OverviewSectionProps {
  data: UserProgressionResponse;
  isAdminView?: boolean;
  onGoToReading?: () => void;
  onGoToExams?: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  data,
  isAdminView = false,
  onGoToReading,
  onGoToExams,
}) => {
  const reading = data.readingProgress;
  const exams = data.exams || [];

  // Statistiques examens
  const evaluatedCount = data.courses.reduce((acc, c) => acc + c.evaluatedModulesCount, 0);
  const passedCount = data.courses.reduce((acc, c) => acc + c.passedCount, 0);

  // Calcul moyenne générale des examens
  const passedScores = exams.filter((e) => e.passed).map((e) => e.score);
  const averageExamScore =
    passedScores.length > 0
      ? Math.round(passedScores.reduce((a, b) => a + b, 0) / passedScores.length)
      : null;

  // Dernier chapitre validé
  const lastCompletedChapter = reading?.history && reading.history.length > 0 ? reading.history[0] : null;

  return (
    <div className="space-y-6">
      {/* 4 Cartes d'Impact Principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Carte 1 : Taux de Lecture */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Lecture Théorique
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Icon name="book-open" className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-950">
              {reading?.overallPercent ?? 0}%
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              {reading?.totalCompletedAllCourses ?? 0} sur {reading?.totalChaptersAllCourses ?? 310} chapitres
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${reading?.overallPercent ?? 0}%` }}
            />
          </div>
        </div>

        {/* Carte 2 : Validations d'Examens */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Examens Validés
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Icon name="academic-cap" className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-950">
              {passedCount} / {data.courses.reduce((acc, c) => acc + c.modulesCount, 30)}
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Modules certifiés avec succès
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((passedCount / Math.max(1, data.courses.reduce((acc, c) => acc + c.modulesCount, 30))) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Carte 3 : Moyenne Générale */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Moyenne Obtenue
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Icon name="sparkles" className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-950">
              {averageExamScore !== null ? `${averageExamScore}%` : '—'}
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              {evaluatedCount > 0 ? `Sur ${evaluatedCount} épreuve(s) passée(s)` : 'Aucune note enregistrée'}
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            Seuil de certification : 80%
          </span>
        </div>

        {/* Carte 4 : Dernier Chapitre Terminé */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Dernière Activité
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <Icon name="clock" className="w-5 h-5" />
            </div>
          </div>
          <div>
            {lastCompletedChapter ? (
              <>
                <div className="text-xs font-black text-indigo-700 truncate">
                  {lastCompletedChapter.courseTitle}
                </div>
                <p className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-2" title={lastCompletedChapter.chapterTitle}>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-indigo-50 text-indigo-800 border border-indigo-200 mr-1.5 shrink-0">
                    Ch. {lastCompletedChapter.chapterNumber ?? (lastCompletedChapter.chapterSlug?.match(/\d+/)?.[0] || '1')}
                  </span>
                  {lastCompletedChapter.chapterTitle}
                </p>
              </>
            ) : (
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Aucune lecture enregistrée récemment
              </p>
            )}
          </div>
          {lastCompletedChapter && !isAdminView ? (
            <Link
              href={lastCompletedChapter.href || lastCompletedChapter.chapterUrl || '#'}
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Continuer la lecture</span>
              <Icon name="arrow-right" className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-[11px] text-slate-400 font-medium">Activité continue</span>
          )}
        </div>
      </div>

      {/* Raccourcis / Bannières d'action */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Encart vers les Lectures */}
        <div className="rounded-3xl border-2 border-slate-200 bg-linear-to-br from-indigo-50/80 to-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider">
              <Icon name="book-open" className="w-4 h-4 text-indigo-600" />
              <span>Cursus &amp; Lectures Théoriques</span>
            </div>
            <h4 className="text-lg font-black text-slate-950">
              Progression détaillée par formation
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Consultez l&apos;avancement chapitre par chapitre pour chaque module et retrouvez l&apos;historique complet de vos validations.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={onGoToReading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              <span>Voir l&apos;avancement des lectures</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Encart vers les Examens */}
        <div className="rounded-3xl border-2 border-slate-200 bg-linear-to-br from-emerald-50/80 to-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider">
              <Icon name="academic-cap" className="w-4 h-4 text-emerald-600" />
              <span>Certifications &amp; Évaluations</span>
            </div>
            <h4 className="text-lg font-black text-slate-950">
              Résultats et tentatives aux examens
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Suivez vos scores obtenus aux épreuves chronométrées, identifiez vos points d&apos;amélioration et repassez les tests nécessaires.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={onGoToExams}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              <span>Consulter mes notes et épreuves</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

