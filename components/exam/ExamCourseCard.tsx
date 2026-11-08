'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { EXAM_THEMES, ExamTheme } from '@/components/exam/examThemes';
import { useExamProgress } from '@/context/ExamProgressContext';

export interface ExamCourseCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  examsCount: number;
  imageSrc: string;
  href: string;
  theme: ExamTheme;
  iconName: string;
}

export const ExamCourseCard: React.FC<ExamCourseCardProps> = ({
  id,
  title,
  subtitle,
  description,
  examsCount,
  imageSrc,
  href,
  theme,
  iconName,
}) => {
  const { isCoursePassed } = useExamProgress();
  const currentTheme = EXAM_THEMES[theme] || EXAM_THEMES.blue;
  const isPassed = isCoursePassed(id);

  return (
    <div
      className={`group flex flex-col justify-between h-full rounded-3xl border-2 ${currentTheme.cardBorder} ${currentTheme.cardBg} p-6 sm:p-7 shadow-sm transition hover:shadow-xl ${currentTheme.borderHover}`}
    >
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Banner Image */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-950 aspect-[16/9] w-full shadow-inner shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {isPassed && (
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black border backdrop-blur-md bg-white/95 shadow-sm text-emerald-950 border-emerald-300">
                <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
                Réussi
              </span>
            )}
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black border backdrop-blur-md bg-white/95 shadow-sm ${currentTheme.badgeBg}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {examsCount} Examens
            </span>
          </div>
        </div>

        {/* Titles & Icon — Hauteur réservée de 2 lignes pour alignement parfait */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-2.5">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${currentTheme.iconBg} ${currentTheme.iconText} mt-0.5`}>
              <Icon name={iconName} className="w-5 h-5" />
            </div>
            <h2 className={`text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug transition ${currentTheme.titleHover} min-h-[3.5rem]`}>
              {title}
            </h2>
          </div>

          <p className={`text-xs sm:text-sm font-bold leading-snug ${currentTheme.subtitleText}`}>
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-slate-800 font-medium leading-relaxed flex-1">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between gap-4">
        <Link
          href={href}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold shadow-sm transition focus:outline-none cursor-pointer ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText}`}
        >
          <span>Accéder aux {examsCount} examens</span>
          <Icon name="arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
