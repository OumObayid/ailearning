'use client';

import React from 'react';
import { useChapterProgress } from '@/context/ChapterProgressContext';
import { cn } from '@/lib/utils';

interface ModuleReadingProgressBarProps {
  courseId: string;
  moduleId: string | number;
  className?: string;
  compact?: boolean;
}

export function ModuleReadingProgressBar({
  courseId,
  moduleId,
  className,
  compact = false,
}: ModuleReadingProgressBarProps) {
  const { getModuleProgress } = useChapterProgress();
  const normalizedModuleId = typeof moduleId === 'number' ? `module-${moduleId}` : moduleId;
  const progress = getModuleProgress(courseId, normalizedModuleId);

  if (progress.totalCount === 0) return null;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className={cn("flex items-center justify-between font-bold", compact ? "text-[11px]" : "text-xs")}>
        <span className="text-slate-600">Lecture :</span>
        <span className="font-mono font-black text-emerald-700">
          {progress.completedCount} / {progress.totalCount} ({progress.percent}%)
        </span>
      </div>
      <div className={cn("w-full rounded-full bg-slate-200/80 overflow-hidden", compact ? "h-1.5" : "h-2")}>
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}

