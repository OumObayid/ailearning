'use client';

import React from 'react';
import Link from 'next/link';
import { getChaptersForModule } from '@/lib/courseNavigation';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

interface CourseSidebarProps {
  moduleId: string;
  activeSlug?: string;
  baseHref?: string;
  theme?: 'blue' | 'amber' | 'purple' | 'indigo' | 'emerald' | 'lime';
}

interface SidebarThemeConfig {
  headerIcon: string;
  containerBorder: string;
  headerBorder: string;
  activeLink: string;
  inactiveLink: string;
  numberActive: string;
  numberInactive: string;
  activeChevron: string;
  chevronHover: string;
}

const SIDEBAR_THEMES: Record<string, SidebarThemeConfig> = {
  blue: {
    headerIcon: 'text-blue-600',
    containerBorder: 'border-blue-200',
    headerBorder: 'border-blue-200/80',
    activeLink: 'bg-blue-300/70 text-blue-950 font-bold shadow-sm cursor-pointer',
    inactiveLink: 'text-slate-950 bg-blue-50/80 border border-blue-200 hover:border-blue-400 hover:bg-blue-100/70 hover:text-blue-950 cursor-pointer',
    numberActive: 'bg-blue-950/15 text-blue-950 font-black',
    numberInactive: 'bg-white border border-blue-200 text-blue-950 group-hover:border-blue-400 group-hover:text-blue-700',
    activeChevron: 'text-blue-950',
    chevronHover: 'text-blue-500 group-hover:text-blue-700',
  },
  amber: {
    headerIcon: 'text-amber-700',
    containerBorder: 'border-amber-200',
    headerBorder: 'border-amber-200/80',
    activeLink: 'bg-amber-300/70 text-amber-950 font-bold shadow-sm cursor-pointer',
    inactiveLink: 'text-slate-950 bg-amber-50/80 border border-amber-200 hover:border-amber-400 hover:bg-amber-100/70 hover:text-amber-950 cursor-pointer',
    numberActive: 'bg-amber-950/15 text-amber-950 font-black',
    numberInactive: 'bg-white border border-amber-200 text-amber-950 group-hover:border-amber-400 group-hover:text-amber-700',
    activeChevron: 'text-amber-950',
    chevronHover: 'text-amber-700 group-hover:text-amber-900',
  },
  purple: {
    headerIcon: 'text-purple-600',
    containerBorder: 'border-purple-200',
    headerBorder: 'border-purple-200/80',
    activeLink: 'bg-purple-300/70 text-purple-950 font-bold shadow-sm cursor-pointer',
    inactiveLink: 'text-slate-950 bg-purple-50/80 border border-purple-200 hover:border-purple-400 hover:bg-purple-100/70 hover:text-purple-950 cursor-pointer',
    numberActive: 'bg-purple-950/15 text-purple-950 font-black',
    numberInactive: 'bg-white border border-purple-200 text-purple-950 group-hover:border-purple-400 group-hover:text-purple-700',
    activeChevron: 'text-purple-950',
    chevronHover: 'text-purple-500 group-hover:text-purple-700',
  },
  indigo: {
    headerIcon: 'text-indigo-700',
    containerBorder: 'border-indigo-200',
    headerBorder: 'border-indigo-200/80',
    activeLink: 'bg-indigo-300/70 text-indigo-950 font-bold shadow-sm cursor-pointer',
    inactiveLink: 'text-slate-950 bg-indigo-50/80 border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-100/70 hover:text-indigo-950 cursor-pointer',
    numberActive: 'bg-indigo-950/15 text-indigo-950 font-black',
    numberInactive: 'bg-white border border-indigo-200 text-indigo-950 group-hover:border-indigo-400 group-hover:text-indigo-700',
    activeChevron: 'text-indigo-950',
    chevronHover: 'text-indigo-500 group-hover:text-indigo-700',
  },
  emerald: {
    headerIcon: 'text-lime-800',
    containerBorder: 'border-lime-200',
    headerBorder: 'border-lime-200/80',
    activeLink: 'bg-lime-300/70 text-lime-950 font-bold shadow-sm cursor-pointer',
    inactiveLink: 'text-slate-950 bg-lime-50/80 border border-lime-200 hover:border-lime-400 hover:bg-lime-100/70 hover:text-lime-950 cursor-pointer',
    numberActive: 'bg-lime-950/15 text-lime-950 font-black',
    numberInactive: 'bg-white border border-lime-200 text-lime-950 group-hover:border-lime-400 group-hover:text-lime-800',
    activeChevron: 'text-lime-950',
    chevronHover: 'text-lime-700 group-hover:text-lime-900',
  },
  lime: {
    headerIcon: 'text-lime-800',
    containerBorder: 'border-lime-200',
    headerBorder: 'border-lime-200/80',
    activeLink: 'bg-lime-300/70 text-lime-950 font-bold shadow-sm cursor-pointer',
    inactiveLink: 'text-slate-950 bg-lime-50/80 border border-lime-200 hover:border-lime-400 hover:bg-lime-100/70 hover:text-lime-950 cursor-pointer',
    numberActive: 'bg-lime-950/15 text-lime-950 font-black',
    numberInactive: 'bg-white border border-lime-200 text-lime-950 group-hover:border-lime-400 group-hover:text-lime-800',
    activeChevron: 'text-lime-950',
    chevronHover: 'text-lime-700 group-hover:text-lime-900',
  },
};

/**
 * Nettoie le titre d'un élément de sommaire en retirant les préfixes redondants
 * tels que "Chapitre X :", "Chapitre X —", "Partie X :", etc.
 */
const cleanMenuTitle = (rawTitle: string): string => {
  return rawTitle
    .replace(/^(chapitres?|parties?|étapes?|etapes?)\s*(\d+|[ivxldcm]+)?\s*[:—–\-•.]?\s*/i, '')
    .trim();
};

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  moduleId,
  activeSlug,
  baseHref,
  theme,
}) => {
  const chapters = getChaptersForModule(moduleId);
  const basePath =
    baseHref ||
    (moduleId.startsWith('prompt-engineering-')
      ? `/cours/prompt-engineering-ide/${moduleId.replace('prompt-engineering-', '')}`
      : moduleId.startsWith('backend-ia-')
      ? `/cours/backend-ia/${moduleId.replace('backend-ia-', '')}`
      : moduleId.startsWith('debugging-')
      ? `/cours/debugging/${moduleId.replace('debugging-', '')}`
      : moduleId.startsWith('module-')
      ? `/cours/ai-engineering/${moduleId}`
      : `/cours/${moduleId}`);

  const resolvedTheme = React.useMemo(() => {
    if (theme) return theme;
    const path = `${basePath} ${moduleId}`;
    if (path.includes('prompt-engineering')) return 'purple';
    if (path.includes('backend-ia')) return 'amber';
    if (path.includes('debugging')) return 'lime';
    if (path.includes('ai-engineering') || moduleId.startsWith('module-')) return 'blue';
    return 'indigo';
  }, [theme, basePath, moduleId]);

  const currentTheme = SIDEBAR_THEMES[resolvedTheme] || SIDEBAR_THEMES.indigo;

  return (
    <div className={cn('rounded-2xl border-2 bg-white p-3.5 sm:p-4 shadow-sm space-y-3.5', currentTheme.containerBorder)}>
      {/* Header : titre compact avec pastille du nombre de chapitres */}
      <div className={cn('flex items-center justify-between gap-2 border-b-2 pb-2.5', currentTheme.headerBorder)}>
        <div className="flex items-center gap-2 min-w-0">
          <Icon name="book-open" className={cn('w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0', currentTheme.headerIcon)} />
          <h3 className="text-sm sm:text-base font-black text-slate-950 truncate">
            Sommaire du cours
          </h3>
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
          {chapters.length} chap.
        </span>
      </div>

      {/* Flat Chapters List : menus épurés sans préfixe "Chapitre" ou "Partie" */}
      <nav aria-label="Liste des chapitres" className="space-y-1.5">
        {chapters.map((chapter) => {
          const isActive = chapter.slug === activeSlug;
          const displayTitle = cleanMenuTitle(chapter.title);

          return (
            <Link
              key={chapter.slug}
              href={`${basePath}/${chapter.slug}`}
              title={displayTitle}
              className={cn(
                'group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer',
                isActive ? currentTheme.activeLink : currentTheme.inactiveLink
              )}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-black',
                    isActive ? currentTheme.numberActive : currentTheme.numberInactive
                  )}
                >
                  {chapter.number ? chapter.number : '•'}
                </span>
                <span className="line-clamp-2 leading-snug break-words" title={displayTitle}>
                  {displayTitle}
                </span>
              </div>
              <Icon
                name="chevron-right"
                className={cn(
                  'w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5',
                  isActive ? currentTheme.activeChevron : currentTheme.chevronHover
                )}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
