'use client';

import React from 'react';
import { useExamProgress } from '@/context/ExamProgressContext';
import { Icon } from '@/components/common/Icon';

interface CoursePassedBadgeProps {
  courseId: string;
  className?: string;
}

export const CoursePassedBadge: React.FC<CoursePassedBadgeProps> = ({
  courseId,
  className = '',
}) => {
  const { isCoursePassed } = useExamProgress();
  const isPassed = isCoursePassed(courseId);

  if (!isPassed) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-black text-emerald-950 shadow-xs ${className}`}
    >
      <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
      <span>Cours Réussi</span>
    </span>
  );
};
