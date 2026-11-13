'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { ChapterCompleteButton } from '@/components/courses/ChapterCompleteButton';

export interface NavChapter {
  slug: string;
  title: string;
}

interface ChapterNavigationProps {
  prev?: NavChapter | null;
  next?: NavChapter | null;
  moduleId: string;
  chapterSlug?: string;
  courseId?: string;
  baseHref?: string;
  theme?: 'blue' | 'amber' | 'purple' | 'indigo' | 'emerald' | 'lime';
}

interface NavThemeConfig {
  buttonBg: string;
  buttonHover: string;
  buttonText: string;
  prevHoverBorder: string;
}

const NAV_THEMES: Record<string, NavThemeConfig> = {
  blue: {
    buttonBg: 'bg-blue-300/70',
    buttonHover: 'hover:bg-blue-400/80',
    buttonText: 'text-blue-950 font-bold',
    prevHoverBorder: 'hover:border-blue-400 hover:text-blue-900',
  },
  amber: {
    buttonBg: 'bg-amber-300/70',
    buttonHover: 'hover:bg-amber-400/80',
    buttonText: 'text-amber-950 font-bold',
    prevHoverBorder: 'hover:border-amber-400 hover:text-amber-900',
  },
  purple: {
    buttonBg: 'bg-purple-300/70',
    buttonHover: 'hover:bg-purple-400/80',
    buttonText: 'text-purple-950 font-bold',
    prevHoverBorder: 'hover:border-purple-400 hover:text-purple-900',
  },
  indigo: {
    buttonBg: 'bg-indigo-700',
    buttonHover: 'hover:bg-indigo-800',
    buttonText: 'text-white font-black',
    prevHoverBorder: 'hover:border-indigo-400 hover:text-indigo-900',
  },
  emerald: {
    buttonBg: 'bg-lime-300/70',
    buttonHover: 'hover:bg-lime-400/80',
    buttonText: 'text-lime-950 font-bold',
    prevHoverBorder: 'hover:border-lime-400 hover:text-lime-900',
  },
  lime: {
    buttonBg: 'bg-lime-300/70',
    buttonHover: 'hover:bg-lime-400/80',
    buttonText: 'text-lime-950 font-bold',
    prevHoverBorder: 'hover:border-lime-400 hover:text-lime-900',
  },
};

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  prev,
  next,
  moduleId,
  chapterSlug,
  courseId,
  baseHref,
  theme,
}) => {
  const pathname = usePathname();

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

  const resolvedCourseId = React.useMemo(() => {
    if (courseId) return courseId;
    const path = `${basePath} ${moduleId}`;
    if (path.includes('prompt-engineering')) return 'prompt-engineering-ide';
    if (path.includes('backend-ia')) return 'backend-ia';
    if (path.includes('debugging')) return 'debugging';
    return 'ai-engineering';
  }, [courseId, basePath, moduleId]);

  const resolvedSlug = React.useMemo(() => {
    if (chapterSlug) return chapterSlug;
    if (!pathname) return '';
    const parts = pathname.split('/').filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : '';
  }, [chapterSlug, pathname]);

  const resolvedTheme = React.useMemo(() => {
    if (theme) return theme;
    const path = `${basePath} ${moduleId}`;
    if (path.includes('prompt-engineering')) return 'purple';
    if (path.includes('backend-ia')) return 'amber';
    if (path.includes('debugging')) return 'lime';
    if (path.includes('ai-engineering') || moduleId.startsWith('module-')) return 'blue';
    return 'indigo';
  }, [theme, basePath, moduleId]);

  const currentTheme = NAV_THEMES[resolvedTheme] || NAV_THEMES.indigo;

  return (
    <div className="mt-12 pt-8 border-t-2 border-slate-200 space-y-5">
      {/* Bouton de validation manuelle du chapitre */}
      {resolvedSlug && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-2xs">
          <div className="space-y-0.5">
            <span className="text-xs font-black text-slate-900 block">
              Validation du chapitre
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Marquez ce chapitre comme terminé pour enregistrer votre progression de lecture.
            </span>
          </div>
          <ChapterCompleteButton
            courseId={resolvedCourseId}
            moduleId={moduleId}
            chapterSlug={resolvedSlug}
            nextChapterHref={next ? `${basePath}/${next.slug}` : null}
            chapterTitle={next ? undefined : undefined}
          />
        </div>
      )}

      {/* Liens Précédent / Suivant */}
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`${basePath}/${prev.slug}`}
            title={prev.title}
            className={cn(
              'group inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-2.5 text-base font-bold text-slate-800 shadow-sm transition hover:bg-slate-100 cursor-pointer',
              currentTheme.prevHoverBorder
            )}
          >
            <Icon name="arrow-left" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Précédent</span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`${basePath}/${next.slug}`}
            title={next.title}
            className={cn(
              'group inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-base shadow-sm transition cursor-pointer',
              currentTheme.buttonBg,
              currentTheme.buttonHover,
              currentTheme.buttonText
            )}
          >
            <span>Suivant</span>
            <Icon name="arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
