'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useCourseDisplay } from '@/context/CourseDisplayContext';
import { Icon } from '@/components/common/Icon';
import { CourseThemeKey, resolveCourseTheme } from '@/components/courses/CourseFullWidthToggle';
import { cn } from '@/lib/utils';

interface CourseChapterLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
  theme?: 'emerald' | 'blue' | 'amber' | 'purple' | 'indigo' | 'lime';
}

const EXIT_THEME_STYLES: Record<CourseThemeKey, string> = {
  amber:
    'border-amber-300 bg-amber-50/95 text-amber-950 hover:bg-amber-100 hover:border-amber-400 focus-visible:ring-amber-500',
  blue:
    'border-blue-300 bg-blue-50/95 text-blue-950 hover:bg-blue-100 hover:border-blue-400 focus-visible:ring-blue-500',
  purple:
    'border-purple-300 bg-purple-50/95 text-purple-950 hover:bg-purple-100 hover:border-purple-400 focus-visible:ring-purple-500',
  emerald:
    'border-emerald-300 bg-emerald-50/95 text-emerald-950 hover:bg-emerald-100 hover:border-emerald-400 focus-visible:ring-emerald-500',
  lime:
    'border-lime-300 bg-lime-50/95 text-lime-950 hover:bg-lime-100 hover:border-lime-400 focus-visible:ring-lime-500',
  default:
    'border-slate-300 bg-white/95 text-slate-800 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-400',
};

export const CourseChapterLayout: React.FC<CourseChapterLayoutProps> = ({
  header,
  children,
  sidebar,
  theme,
}) => {
  const { isFullWidth, exitFullWidth } = useCourseDisplay();
  const pathname = usePathname();
  const currentTheme = resolveCourseTheme(pathname, theme);

  return (
    <div className="space-y-6">
      {/* In Full Width: exit button fixed at the top-right */}
      {isFullWidth && (
        <button
          type="button"
          onClick={exitFullWidth}
          title="Quitter la pleine largeur (Échap)"
          aria-label="Quitter la pleine largeur"
          className={cn(
            'fixed top-3 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-md backdrop-blur-sm active:scale-95 cursor-pointer transition-all duration-150 outline-hidden focus-visible:ring-2',
            EXIT_THEME_STYLES[currentTheme]
          )}
        >
          <Icon name="minimize" className="w-5 h-5" />
        </button>
      )}

      {/* Header (Breadcrumbs, Title with toggle button) */}
      {header && <div className="w-full">{header}</div>}

      {/* Layout: Full screen width vs standard 2-column layout */}
      {isFullWidth ? (
        <div className="w-full min-w-0">
          {children}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 min-w-0">
            {children}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-20">
            {sidebar}
          </aside>
        </div>
      )}
    </div>
  );
};
