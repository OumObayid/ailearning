'use client';

import React from 'react';
import { useExamProgress } from '@/context/ExamProgressContext';
import { cn } from '@/lib/utils';

interface ModulePassedBadgeProps {
  courseId: string;
  moduleOrder: number | string;
  className?: string;
  showScore?: boolean;
}

export const ModulePassedBadge: React.FC<ModulePassedBadgeProps> = ({
  courseId,
  moduleOrder,
  className = '',
  showScore = false,
}) => {
  const { getModuleBadgeType, moduleScores } = useExamProgress();
  const badgeType = getModuleBadgeType(courseId, moduleOrder);

  if (!badgeType) return null;

  const orderStr = String(moduleOrder).startsWith('module-')
    ? String(moduleOrder)
    : `module-${moduleOrder}`;
  const score = moduleScores[courseId]?.[orderStr];

  // 1. Badge Royal (Score Parfait 40/40 ou 100%) — Graphique vectoriel professionnel
  if (badgeType === 'royal') {
    return (
      <span
        title={
          score !== undefined
            ? `Score Parfait (${score}%) — Badge Royal d'Excellence`
            : "Score Parfait (40/40 • 100%) — Badge Royal d'Excellence"
        }
        aria-label="Badge Royal d'Excellence (Score Parfait)"
        className={cn(
          'relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border border-amber-600/70 shadow-sm shadow-amber-500/30 ring-2 ring-white/70 hover:ring-amber-300 hover:scale-110 hover:shadow-md hover:shadow-amber-500/40 transition-all duration-200 select-none cursor-help shrink-0',
          className
        )}
      >
        <svg
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Couronne royale élégante avec 3 sommets ornés et base orfèvre */}
          <path d="M3.5 16.5L2 6.5l5.5 4 4.5-7 4.5 7 5.5-4-1.5 10h-17z" />
          <path d="M4 18.5h16a1 1 0 011 1v.2a.8.8 0 01-.8.8H3.8a.8.8 0 01-.8-.8v-.2a1 1 0 011-1z" />
          <circle cx="2" cy="5.5" r="1.2" />
          <circle cx="12" cy="2.2" r="1.3" />
          <circle cx="22" cy="5.5" r="1.2" />
        </svg>
      </span>
    );
  }

  // 2. Badge Réussite (Score >= 80%) — Médaillon graphique professionnel
  return (
    <span
      title={
        score !== undefined
          ? `Module Validé avec Succès — Score ${score}% (Badge de Réussite)`
          : "Module Validé avec Succès (Score ≥ 80%) — Badge de Réussite"
      }
      aria-label={
        score !== undefined
          ? `Module Validé — Score ${score}%`
          : "Module Validé avec Succès"
      }
      className={cn(
        'relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 border border-emerald-600/70 shadow-sm shadow-emerald-500/30 ring-2 ring-white/70 hover:ring-emerald-300 hover:scale-110 hover:shadow-md hover:shadow-emerald-500/40 transition-all duration-200 select-none cursor-help shrink-0',
        className
      )}
    >
      <svg
        className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
};

