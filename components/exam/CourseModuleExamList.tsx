'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { CourseModule } from '@/types/course';
import { Icon } from '@/components/common/Icon';
import { EXAM_THEMES, ExamTheme } from '@/components/exam/examThemes';
import { ModulePassedBadge } from '@/components/courses/ModulePassedBadge';

interface CourseModuleExamListProps {
  modules: CourseModule[];
  availableExamIds: string[];
  theme?: ExamTheme;
  courseTitle?: string;
  courseHref?: string;
}

export const CourseModuleExamList: React.FC<CourseModuleExamListProps> = ({
  modules,
  availableExamIds,
  theme = 'blue',
}) => {
  const availableSet = useMemo(() => new Set(availableExamIds), [availableExamIds]);
  const currentTheme = EXAM_THEMES[theme] || EXAM_THEMES.blue;

  const defaultIcon =
    theme === 'amber'
      ? 'server'
      : theme === 'purple'
        ? 'bot'
        : theme === 'lime' || theme === 'emerald'
          ? 'bug'
          : 'sparkles';

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      {modules.map((m) => {
        const isAvailable = availableSet.has(m.id);
        const courseSlug =
          m.courseId ||
          (m.id.startsWith('prompt-engineering')
            ? 'prompt-engineering-ide'
            : m.id.startsWith('backend-ia')
              ? 'backend-ia'
              : m.id.startsWith('debugging')
                ? 'debugging'
                : 'ai-engineering');
        const examHref = `/examens/${courseSlug}/module-${m.order}`;

        return (
          <div
            key={m.id}
            className={`flex flex-col justify-between rounded-2xl border-2 ${currentTheme.cardBorder} ${currentTheme.cardBg} p-4 sm:p-6 shadow-sm ${currentTheme.borderHover} transition space-y-4 min-w-0`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span
                    className={`inline-flex items-center rounded-lg bg-white px-2.5 sm:px-3 py-1 text-xs font-black ${currentTheme.badgeText} border ${currentTheme.cardBorder} shadow-sm`}
                  >
                    Module {m.order}
                  </span>
                  <Icon
                    name={m.iconName || defaultIcon}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme.iconText}`}
                  />
                  <ModulePassedBadge courseId={courseSlug} moduleOrder={m.order} />
                </div>

                {isAvailable ? (
                  <Link
                    href={examHref}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold transition shadow-sm shrink-0 cursor-pointer ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText}`}
                  >
                    <span>Passer l&apos;examen</span>
                    <Icon name="arrow-right" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/70 border border-slate-300 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold text-slate-600 shadow-2xs">
                    Bientôt disponible
                  </span>
                )}
              </div>

              <div className="space-y-2 min-w-0">
                <h2
                  className="text-lg sm:text-xl font-black text-slate-950 leading-snug truncate"
                  title={m.title}
                >
                  {m.title}
                </h2>

                <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
