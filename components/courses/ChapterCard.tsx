import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

export interface ChapterCardProps {
  number?: number;
  title: string;
  href: string;
  duration?: string;
  description?: string;
  theme?: 'blue' | 'amber' | 'purple' | 'emerald' | 'lime' | 'indigo';
}

interface ChapterThemeStyle {
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  badgeBg: string;
  labelColor: string;
  titleHover: string;
  buttonBg: string;
  buttonHover: string;
  buttonText: string;
  chapterBadge: string;
  durationBadge: string;
  pulseDot: string;
}

const THEME_STYLES: Record<string, ChapterThemeStyle> = {
  blue: {
    cardBg: 'bg-blue-50/80 hover:bg-blue-100/60',
    cardBorder: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400 hover:shadow-blue-500/10 hover:shadow-md',
    badgeBg: 'bg-blue-400 text-blue-950 font-black',
    labelColor: 'text-blue-700',
    titleHover: 'group-hover:text-blue-700',
    buttonBg: 'bg-blue-300/70',
    buttonHover: 'hover:bg-blue-400/80',
    buttonText: 'text-blue-950 font-bold',
    chapterBadge: 'bg-blue-100/90 text-blue-900 border-blue-200',
    durationBadge: 'bg-white/95 text-blue-950 border-blue-200',
    pulseDot: 'bg-blue-600',
  },
  amber: {
    cardBg: 'bg-amber-50/80 hover:bg-amber-100/60',
    cardBorder: 'border-amber-200',
    hoverBorder: 'hover:border-amber-400 hover:shadow-amber-500/10 hover:shadow-md',
    badgeBg: 'bg-amber-400 text-amber-950 font-black',
    labelColor: 'text-amber-800',
    titleHover: 'group-hover:text-amber-800',
    buttonBg: 'bg-amber-300/70',
    buttonHover: 'hover:bg-amber-400/80',
    buttonText: 'text-amber-950 font-bold',
    chapterBadge: 'bg-amber-100/90 text-amber-950 border-amber-200',
    durationBadge: 'bg-white/95 text-amber-950 border-amber-200',
    pulseDot: 'bg-amber-600',
  },
  purple: {
    cardBg: 'bg-purple-50/80 hover:bg-purple-100/60',
    cardBorder: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400 hover:shadow-purple-500/10 hover:shadow-md',
    badgeBg: 'bg-purple-400 text-purple-950 font-black',
    labelColor: 'text-purple-700',
    titleHover: 'group-hover:text-purple-700',
    buttonBg: 'bg-purple-300/70',
    buttonHover: 'hover:bg-purple-400/80',
    buttonText: 'text-purple-950 font-bold',
    chapterBadge: 'bg-purple-100/90 text-purple-950 border-purple-200',
    durationBadge: 'bg-white/95 text-purple-950 border-purple-200',
    pulseDot: 'bg-purple-600',
  },
  emerald: {
    cardBg: 'bg-lime-50/80 hover:bg-lime-100/60',
    cardBorder: 'border-lime-200',
    hoverBorder: 'hover:border-lime-400 hover:shadow-lime-500/10 hover:shadow-md',
    badgeBg: 'bg-lime-400 text-lime-950 font-black',
    labelColor: 'text-lime-800',
    titleHover: 'group-hover:text-lime-800',
    buttonBg: 'bg-lime-300/70',
    buttonHover: 'hover:bg-lime-400/80',
    buttonText: 'text-lime-950 font-bold',
    chapterBadge: 'bg-lime-100/90 text-lime-950 border-lime-200',
    durationBadge: 'bg-white/95 text-lime-950 border-lime-200',
    pulseDot: 'bg-lime-600',
  },
  lime: {
    cardBg: 'bg-lime-50/80 hover:bg-lime-100/60',
    cardBorder: 'border-lime-200',
    hoverBorder: 'hover:border-lime-400 hover:shadow-lime-500/10 hover:shadow-md',
    badgeBg: 'bg-lime-400 text-lime-950 font-black',
    labelColor: 'text-lime-800',
    titleHover: 'group-hover:text-lime-800',
    buttonBg: 'bg-lime-300/70',
    buttonHover: 'hover:bg-lime-400/80',
    buttonText: 'text-lime-950 font-bold',
    chapterBadge: 'bg-lime-100/90 text-lime-950 border-lime-200',
    durationBadge: 'bg-white/95 text-lime-950 border-lime-200',
    pulseDot: 'bg-lime-600',
  },
  indigo: {
    cardBg: 'bg-indigo-50/80 hover:bg-indigo-100/60',
    cardBorder: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-400 hover:shadow-indigo-500/10 hover:shadow-md',
    badgeBg: 'bg-indigo-400 text-indigo-950 font-black',
    labelColor: 'text-indigo-800',
    titleHover: 'group-hover:text-indigo-800',
    buttonBg: 'bg-indigo-300/70',
    buttonHover: 'hover:bg-indigo-400/80',
    buttonText: 'text-indigo-950 font-bold',
    chapterBadge: 'bg-indigo-100/90 text-indigo-950 border-indigo-200',
    durationBadge: 'bg-white/95 text-indigo-950 border-indigo-200',
    pulseDot: 'bg-indigo-600',
  },
};

const cleanTitle = (rawTitle: string): string => {
  return rawTitle
    .replace(/^(chapitres?|parties?|étapes?|etapes?)\s*(\d+|[ivxldcm]+)?\s*[:—–\-•.]?\s*/i, '')
    .replace(/^(\d+|[ivxldcm]+)\s*[:—–\-•.]\s*/i, '')
    .trim();
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  number,
  title,
  href,
  duration,
  description,
  theme = 'blue',
}) => {
  const t = THEME_STYLES[theme] || THEME_STYLES.blue;
  const displayTitle = cleanTitle(title);

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-3xl border-2 p-5 sm:p-6 shadow-sm transition-all duration-200 min-w-0 max-w-full overflow-hidden',
        t.cardBorder,
        t.cardBg,
        t.hoverBorder
      )}
    >
      <div className="space-y-3 min-w-0">
        {/* En-tête : Badges à gauche & Bouton d'action à droite */}
        <div className="flex items-center justify-between gap-3 flex-wrap min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap min-w-0">
            {/* Badge Chapitre avec son numéro */}
            <span
              className={cn(
                'inline-flex items-center text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs whitespace-normal break-words',
                t.chapterBadge
              )}
            >
              Chapitre {number}
            </span>

            {/* Badge Durée */}
            {duration && (
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border shadow-2xs whitespace-normal break-words',
                  t.durationBadge
                )}
              >
                <Icon name="clock" className="w-3.5 h-3.5 opacity-70" />
                <span>{duration}</span>
              </span>
            )}
          </div>

          {/* Bouton d'accès en haut à droite avec style élégant */}
          <Link
            href={href}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all duration-200 shrink-0 cursor-pointer active:scale-95 border border-black/5',
              t.buttonBg,
              t.buttonHover,
              t.buttonText
            )}
          >
            <span>Étudier <span className="hidden sm:inline">le chapitre</span></span>
            <Icon name="arrow-right" className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Titre et description en pleine largeur avec wrapping garanti */}
        <div className="space-y-1.5 pt-1 min-w-0">
          <h3
            className={cn(
              'text-lg sm:text-xl font-black text-slate-950 leading-snug tracking-tight transition-colors whitespace-normal break-words [overflow-wrap:anywhere]',
              t.titleHover
            )}
          >
            <Link href={href} className="hover:underline focus:outline-none break-words [overflow-wrap:anywhere]">
              {displayTitle}
            </Link>
          </h3>

          {description && (
            <p className="text-sm sm:text-base font-normal sm:font-medium text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
