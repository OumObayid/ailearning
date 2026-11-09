'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import type { UserChapterProgressSummary, CourseChapterProgress } from '@/services/chapterProgressService';
import { ChapterHistoryTable } from './ChapterHistoryTable';

interface ReadingProgressSectionProps {
  readingProgress?: UserChapterProgressSummary;
  isAdminView?: boolean;
}

const COURSE_STYLES: Record<
  string,
  { label: string; badge: string; border: string; bg: string; bar: string; icon: string }
> = {
  'ai-engineering': {
    label: 'AI Engineering',
    badge: 'bg-blue-100 text-blue-900 border-blue-300',
    border: 'border-blue-300',
    bg: 'bg-blue-50/70',
    bar: 'bg-blue-600',
    icon: 'sparkles',
  },
  'backend-ia': {
    label: 'Backend IA',
    badge: 'bg-amber-100 text-amber-950 border-amber-300',
    border: 'border-amber-300',
    bg: 'bg-amber-50/70',
    bar: 'bg-amber-600',
    icon: 'server',
  },
  'prompt-engineering-ide': {
    label: 'Prompt Engineering IDE',
    badge: 'bg-purple-100 text-purple-950 border-purple-300',
    border: 'border-purple-300',
    bg: 'bg-purple-50/70',
    bar: 'bg-purple-600',
    icon: 'bot',
  },
  debugging: {
    label: 'Ingénierie du Débogage',
    badge: 'bg-lime-100 text-lime-950 border-lime-300',
    border: 'border-lime-300',
    bg: 'bg-lime-50/70',
    bar: 'bg-lime-600',
    icon: 'bug',
  },
};

export const ReadingProgressSection: React.FC<ReadingProgressSectionProps> = ({
  readingProgress,
  isAdminView = false,
}) => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const courses = readingProgress?.courses || [];
  const history = readingProgress?.history || [];

  return (
    <div className="space-y-8">
      {/* 1. Barres de progression par formation */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
              <Icon name="book-open" className="w-5 h-5 text-indigo-600" />
              <span>Avancement de lecture par cursus</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Suivi détaillé de l&apos;ensemble des chapitres validés pour chaque programme.
            </p>
          </div>
          <div className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
            {readingProgress?.totalCompletedAllCourses ?? 0} / {readingProgress?.totalChaptersAllCourses ?? 310} chapitres lus
          </div>
        </div>

        {/* Grille des 4 Cursus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course: CourseChapterProgress) => {
            const style = COURSE_STYLES[course.courseId] || {
              label: course.title,
              badge: 'bg-slate-100 text-slate-800 border-slate-300',
              border: 'border-slate-300',
              bg: 'bg-slate-50',
              bar: 'bg-indigo-600',
              icon: 'folder',
            };

            const isExpanded = expandedCourse === course.courseId;

            return (
              <div
                key={course.courseId}
                className={cn(
                  'rounded-3xl border-2 p-5 transition-all shadow-xs space-y-4 bg-white',
                  style.border
                )}
              >
                {/* Header Carte Cursus */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black border',
                        style.badge
                      )}
                    >
                      <Icon name={style.icon} className="w-3.5 h-3.5" />
                      <span>{style.label}</span>
                    </span>
                    <h4 className="text-base font-black text-slate-950 truncate" title={course.title}>
                      {course.title}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-slate-950">
                      {course.progressPercent}%
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">
                      {course.completedChaptersCount} / {course.totalChaptersCount} ch.
                    </span>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={cn('h-2.5 rounded-full transition-all duration-500', style.bar)}
                    style={{ width: `${course.progressPercent}%` }}
                  />
                </div>

                {/* Bouton pour afficher/masquer le détail des modules */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                  <button
                    type="button"
                    onClick={() => setExpandedCourse(isExpanded ? null : course.courseId)}
                    className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-slate-950 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Masquer les modules' : `Voir les ${course.modules.length} modules`}</span>
                    <Icon
                      name={isExpanded ? 'chevron-down' : 'chevron-right'}
                      className="w-3.5 h-3.5"
                    />
                  </button>

                  {!isAdminView && (
                    <Link
                      href={`/cours/${course.courseId}`}
                      className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Accéder au cours</span>
                      <Icon name="arrow-right" className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                {/* Accordéon : Détail des modules */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs animate-in fade-in duration-200">
                    {course.modules.map((mod) => (
                      <div
                        key={mod.moduleId}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] whitespace-nowrap">
                            {mod.moduleId.replace('-', ' ')} :
                          </span>
                          <span className="text-slate-600 font-medium truncate">
                            {mod.completedChaptersCount} / {mod.totalChaptersCount} terminés
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={cn('h-1.5 rounded-full', style.bar)}
                              style={{ width: `${mod.progressPercent}%` }}
                            />
                          </div>
                          <span className="font-black text-[11px] text-slate-800 w-8 text-right">
                            {mod.progressPercent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Tableau chronologique des chapitres validés */}
      <ChapterHistoryTable history={history} />
    </div>
  );
};

