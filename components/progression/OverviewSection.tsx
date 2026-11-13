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
    <div className="space-y-4">
      {/* 4 Cartes d'Impact Principales — 4 Colonnes sans wrap avec marges et paddings compacts */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Carte 1 : Taux de Lecture */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-2.5 sm:p-3 shadow-2xs space-y-2 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider truncate">
              Lecture Théorique
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <Icon name="book-open" className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-950">
              {reading?.overallPercent ?? 0}%
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-600 truncate mt-0.5">
              {reading?.totalCompletedAllCourses ?? 0}/{reading?.totalChaptersAllCourses ?? 310} ch.
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${reading?.overallPercent ?? 0}%` }}
            />
          </div>
        </div>

        {/* Carte 2 : Validations d'Examens */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-2.5 sm:p-3 shadow-2xs space-y-2 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider truncate">
              Examens Validés
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Icon name="academic-cap" className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-950">
              {passedCount} / {data.courses.reduce((acc, c) => acc + c.modulesCount, 30)}
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-600 truncate mt-0.5">
              Modules validés
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((passedCount / Math.max(1, data.courses.reduce((acc, c) => acc + c.modulesCount, 30))) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Carte 3 : Moyenne Générale */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-2.5 sm:p-3 shadow-2xs space-y-2 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider truncate">
              Moyenne
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Icon name="sparkles" className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-950">
              {averageExamScore !== null ? `${averageExamScore}%` : '—'}
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-600 truncate mt-0.5">
              {evaluatedCount > 0 ? `${evaluatedCount} épreuve(s)` : 'Aucune note'}
            </p>
          </div>
          <span className="text-[10px] font-bold text-slate-400 truncate">
            Seuil : 80%
          </span>
        </div>

        {/* Carte 4 : Dernier Chapitre Terminé */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-2.5 sm:p-3 shadow-2xs space-y-2 flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider truncate">
              Dernière Activité
            </span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              <Icon name="clock" className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            {lastCompletedChapter ? (
              <>
                <div className="text-[10px] sm:text-[11px] font-black text-indigo-700 truncate">
                  {lastCompletedChapter.courseTitle}
                </div>
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-900 mt-0.5 truncate" title={lastCompletedChapter.chapterTitle}>
                  <span className="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-mono font-black bg-indigo-50 text-indigo-800 border border-indigo-200 mr-1 shrink-0">
                    Ch. {lastCompletedChapter.chapterNumber ?? (lastCompletedChapter.chapterSlug?.match(/\d+/)?.[0] || '1')}
                  </span>
                  {lastCompletedChapter.chapterTitle}
                </p>
              </>
            ) : (
              <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5 truncate">
                Aucune lecture récente
              </p>
            )}
          </div>
          {lastCompletedChapter && !isAdminView ? (
            <Link
              href={lastCompletedChapter.href || lastCompletedChapter.chapterUrl || '#'}
              className="text-[10px] sm:text-[11px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 truncate"
            >
              <span>Continuer</span>
              <Icon name="arrow-right" className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-[10px] text-slate-400 font-medium truncate">Activité continue</span>
          )}
        </div>
      </div>

      {/* Raccourcis / Bannières d'action — 2 Colonnes sans wrap */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {/* Encart vers les Lectures */}
        <div className="rounded-2xl border-2 border-slate-200 bg-linear-to-br from-indigo-50/80 to-white p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between space-y-2.5 min-w-0">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-900 font-extrabold text-[11px] uppercase tracking-wider">
              <Icon name="book-open" className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">Cursus &amp; Lectures</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-slate-950 truncate">
              Progression par formation
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
              Avancement chapitre par chapitre et historique complet des validations.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={onGoToReading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-2xs cursor-pointer"
            >
              <span>Voir les lectures</span>
              <Icon name="arrow-right" className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Encart vers les Examens */}
        <div className="rounded-2xl border-2 border-slate-200 bg-linear-to-br from-emerald-50/80 to-white p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between space-y-2.5 min-w-0">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold text-[11px] uppercase tracking-wider">
              <Icon name="academic-cap" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Certifications &amp; Notes</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-slate-950 truncate">
              Résultats aux examens
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
              Scores obtenus aux épreuves chronométrées et suivi des réussites.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={onGoToExams}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-2xs cursor-pointer"
            >
              <span>Consulter les notes</span>
              <Icon name="arrow-right" className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

