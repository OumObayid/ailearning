'use client';

import React from 'react';
import { useExamProgress } from '@/context/ExamProgressContext';
import { Icon } from '@/components/common/Icon';

interface ModulePassedBadgeProps {
  courseId: string;
  moduleOrder: number | string;
  className?: string;
}

export const ModulePassedBadge: React.FC<ModulePassedBadgeProps> = ({
  courseId,
  moduleOrder,
  className = '',
}) => {
  const { isModulePassed } = useExamProgress();
  const isPassed = isModulePassed(courseId, moduleOrder);

  if (!isPassed) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-black text-emerald-950 shadow-xs ${className}`}
    >
      <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
      <span>Réussi</span>
    </span>
  );
};
