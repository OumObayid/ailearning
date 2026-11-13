'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import type { CourseProgression, ExamItem } from '@/services/progressionService';

interface ExamProgressSectionProps {
  courses: CourseProgression[];
  exams: ExamItem[];
  isAdminView?: boolean;
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '< 1 min';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins} min`;
  return `${mins}m ${secs}s`;
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export const ExamProgressSection: React.FC<ExamProgressSectionProps> = ({
  courses,
  exams,
  isAdminView = false,
}) => {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');

  const filteredExams = exams.filter((ex) => {
    return selectedCourseFilter === 'all' || ex.courseId === selectedCourseFilter;
  });

  return (
    <div className="space-y-4">
      {/* 1. Grille d'évaluation par cursus */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-2">
              <Icon name="academic-cap" className="w-4 h-4 text-emerald-600" />
              <span>Évaluations &amp; Certifications par formation</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Chaque épreuve exige un score minimum de 80% pour débloquer le badge certifiant du module.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {courses.map((course) => {
            const isFullPass = course.passedCount === course.modulesCount && course.modulesCount > 0;

            return (
              <div
                key={course.id}
                className={cn(
                  'rounded-2xl border-2 p-3.5 sm:p-4 bg-white shadow-2xs space-y-3',
                  isFullPass ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
                )}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="space-y-0.5 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-black bg-slate-100 text-slate-800 border border-slate-200">
                      <span>{course.modulesCount} modules au total</span>
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-950 truncate" title={course.title}>
                      {course.title}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xl sm:text-2xl font-black text-slate-950">
                      {course.averageScore > 0 ? `${course.averageScore}%` : '—'}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">Moyenne</span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all duration-500',
                      isFullPass ? 'bg-emerald-500' : 'bg-indigo-600'
                    )}
                    style={{
                      width: `${Math.round((course.passedCount / Math.max(1, course.modulesCount)) * 100)}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="font-bold text-slate-600 text-[11px]">
                    {course.passedCount} / {course.modulesCount} modules certifiés
                  </span>

                  {!isAdminView && (
                    <Link
                      href={`/examens/${course.slug}`}
                      className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 text-[11px]"
                    >
                      <span>Passer un examen</span>
                      <Icon name="arrow-right" className="w-2.5 h-2.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Historique des tentatives d'examens */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-950 flex items-center gap-2">
              <Icon name="clock" className="w-4 h-4 text-indigo-600" />
              <span>Historique des épreuves passées</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {filteredExams.length} tentative{filteredExams.length > 1 ? 's' : ''} enregistrée{filteredExams.length > 1 ? 's' : ''}
            </p>
          </div>

          <div>
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Toutes les formations</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredExams.length === 0 ? (
          <div className="py-6 text-center space-y-2">
            <span className="text-2xl">🎓</span>
            <p className="text-xs font-bold text-slate-600">Aucune épreuve passée pour le moment.</p>
            {!isAdminView && (
              <Link
                href="/examens"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
              >
                <span>Accéder aux examens</span>
                <Icon name="arrow-right" className="w-3 h-3" />
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="py-2 px-2.5">Épreuve &amp; Module</th>
                  <th className="py-2 px-2.5 text-center">Score</th>
                  <th className="py-2 px-2.5 text-center">Questions</th>
                  <th className="py-2 px-2.5 text-center">Durée</th>
                  <th className="py-2 px-2.5">Date</th>
                  <th className="py-2 px-2.5 text-right">Résultat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExams.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-2 px-2.5 font-semibold text-slate-900">
                      <div className="font-bold text-slate-950 truncate max-w-[280px]">
                        {ex.moduleTitle}
                      </div>
                      <div className="text-[10px] font-medium text-slate-500 capitalize">
                        {ex.courseId.replace('-', ' ')}
                      </div>
                    </td>

                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-md font-black text-[11px]',
                          ex.passed
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        )}
                      >
                        {ex.score}%
                      </span>
                    </td>

                    <td className="py-2 px-2.5 text-center font-bold text-slate-700 whitespace-nowrap text-[11px]">
                      {ex.correctAnswersCount} / {ex.totalQuestions}
                    </td>

                    <td className="py-2 px-2.5 text-center text-slate-500 font-medium whitespace-nowrap text-[11px]">
                      {formatDuration(ex.timeSpentSeconds)}
                    </td>

                    <td className="py-2 px-2.5 text-slate-500 font-medium whitespace-nowrap text-[11px]">
                      {formatDate(ex.createdAt)}
                    </td>

                    <td className="py-2 px-2.5 text-right whitespace-nowrap">
                      {ex.passed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-black text-[11px]">
                          <Icon name="check" className="w-3 h-3" />
                          <span>Certifié</span>
                        </span>
                      ) : !isAdminView ? (
                        <Link
                          href={`/examens/${ex.courseId}/${ex.moduleId}`}
                          className="inline-flex items-center gap-1 text-rose-700 hover:text-rose-900 font-bold text-[11px]"
                        >
                          <span>Repasser</span>
                          <Icon name="arrow-right" className="w-2.5 h-2.5" />
                        </Link>
                      ) : (
                        <span className="text-rose-700 font-bold text-[11px]">Non validé</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

