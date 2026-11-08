import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types/course';
import { Icon } from '@/components/common/Icon';

interface CourseCardProps {
  course: Course;
}

const COURSE_CARD_IMAGES: Record<string, string> = {
  'ai-engineering': '/images/cours/ai-engineering/course-card-blue.jpg',
  'backend-ia': '/images/cours/backend-ia/course-card-amber.jpg',
  'prompt-engineering-ide': '/images/cours/prompt-engineering-ide/course-card-purple.jpg',
  'debugging': '/images/cours/debugging/course-card-emerald.jpg',
};

interface CourseTheme {
  cardBg: string;
  cardBorder: string;
  iconBg: string;
  iconText: string;
  titleHover: string;
  subtitleText: string;
  borderHover: string;
  buttonBg: string;
  buttonHover: string;
  buttonText: string;
}

const COURSE_THEMES: Record<string, CourseTheme> = {
  'ai-engineering': {
    cardBg: 'bg-blue-50/80 hover:bg-blue-100/60',
    cardBorder: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-700',
    titleHover: 'group-hover:text-blue-600',
    subtitleText: 'text-blue-700',
    borderHover: 'hover:border-blue-400 hover:shadow-blue-500/10',
    buttonBg: 'bg-blue-300/70',
    buttonHover: 'hover:bg-blue-400/80',
    buttonText: 'text-blue-950 font-bold',
  },
  'backend-ia': {
    cardBg: 'bg-amber-50/80 hover:bg-amber-100/60',
    cardBorder: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-800',
    titleHover: 'group-hover:text-amber-600',
    subtitleText: 'text-amber-700',
    borderHover: 'hover:border-amber-400 hover:shadow-amber-500/10',
    buttonBg: 'bg-amber-300/70',
    buttonHover: 'hover:bg-amber-400/80',
    buttonText: 'text-amber-950 font-bold',
  },
  'prompt-engineering-ide': {
    cardBg: 'bg-purple-50/80 hover:bg-purple-100/60',
    cardBorder: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-700',
    titleHover: 'group-hover:text-purple-600',
    subtitleText: 'text-purple-700',
    borderHover: 'hover:border-purple-400 hover:shadow-purple-500/10',
    buttonBg: 'bg-purple-300/70',
    buttonHover: 'hover:bg-purple-400/80',
    buttonText: 'text-purple-950 font-bold',
  },
  'debugging': {
    cardBg: 'bg-lime-50/80 hover:bg-lime-100/60',
    cardBorder: 'border-lime-200',
    iconBg: 'bg-lime-100',
    iconText: 'text-lime-800',
    titleHover: 'group-hover:text-lime-700',
    subtitleText: 'text-lime-800',
    borderHover: 'hover:border-lime-400 hover:shadow-lime-500/10',
    buttonBg: 'bg-lime-300/70',
    buttonHover: 'hover:bg-lime-400/80',
    buttonText: 'text-lime-950 font-bold',
  },
};

const DEFAULT_THEME: CourseTheme = {
  cardBg: 'bg-slate-50/80 hover:bg-slate-100/60',
  cardBorder: 'border-slate-200',
  iconBg: 'bg-indigo-100',
  iconText: 'text-indigo-800',
  titleHover: 'group-hover:text-indigo-600',
  subtitleText: 'text-indigo-700',
  borderHover: 'hover:border-indigo-400 hover:shadow-indigo-500/10',
  buttonBg: 'bg-indigo-300/70',
  buttonHover: 'hover:bg-indigo-400/80',
  buttonText: 'text-indigo-950 font-bold',
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const theme = COURSE_THEMES[course.id] || DEFAULT_THEME;
  const cardImage = COURSE_CARD_IMAGES[course.id];

  return (
    <div
      className={`group flex flex-col justify-between h-full rounded-3xl border-2 ${theme.cardBorder} ${theme.cardBg} p-6 sm:p-7 shadow-sm transition hover:shadow-xl ${theme.borderHover}`}
    >
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Banner Image intégrée comme les cartes d'examens */}
        {cardImage && (
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-950 aspect-[16/9] w-full shadow-inner shrink-0">
            <Image
              src={cardImage}
              alt={course.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black border backdrop-blur-md bg-white/95 shadow-sm text-slate-950 border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {course.modulesCount} modules
              </span>
            </div>
          </div>
        )}

        {/* Titles & Icon — Hauteur réservée de 2 lignes pour alignement parfait */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-2.5">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText} mt-0.5`}>
              <Icon name={course.iconName || 'sparkles'} className="w-5 h-5" />
            </div>
            <h2 className={`text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug transition ${theme.titleHover} min-h-[3.5rem]`}>
              {course.title}
            </h2>
          </div>

          <p className={`text-xs sm:text-sm font-bold leading-snug ${theme.subtitleText}`}>
            {course.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-slate-800 font-medium leading-relaxed flex-1">
          {course.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between gap-4">
        {course.isAvailable ? (
          <Link
            href={course.href}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold shadow-sm transition focus:outline-none cursor-pointer ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText}`}
          >
            <span>Accéder au programme</span>
            <Icon name="arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 border-2 border-slate-300 px-6 py-3.5 text-base font-bold text-slate-700 cursor-not-allowed">
            <span>Bientôt disponible</span>
          </div>
        )}
      </div>
    </div>
  );
};
