'use client';

import React from 'react';
import { useChapterProgress } from '@/context/ChapterProgressContext';
import { cn } from '@/lib/utils';

interface CourseReadingProgressBarProps {
  courseId: string;
  className?: string;
  showDetails?: boolean;
}

export function CourseReadingProgressBar({
  courseId,
  className,
  showDetails = true,
}: CourseReadingProgressBarProps) {
  const { getCourseProgress } = useChapterProgress();
  const progress = getCourseProgress(courseId);

  if (progress.totalCount === 0) return null;

  return (
    <div className={cn("space-y-2 py-2 px-1", className)}>
      {showDetails && (
        <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs font-bold whitespace-nowrap flex-nowrap pb-1">
          <span className="text-slate-950 whitespace-nowrap">Progression de lecture globale</span>
          <span className="font-mono text-[12px] font-black text-emerald-700 shrink-0 whitespace-nowrap">
            {progress.completedCount}/{progress.totalCount} chap. ({progress.percent}%)
          </span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-slate-200/80 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}

